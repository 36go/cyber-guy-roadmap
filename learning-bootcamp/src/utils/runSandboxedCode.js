const MAX_CODE_LENGTH = 100000;
const MAX_OUTPUTS = 100;
const MAX_OUTPUT_LENGTH = 10000;

function createToken() {
  const cryptoApi = globalThis.crypto;
  if (typeof cryptoApi?.randomUUID === 'function') return cryptoApi.randomUUID();
  if (typeof cryptoApi?.getRandomValues === 'function') {
    const bytes = cryptoApi.getRandomValues(new Uint8Array(16));
    return Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`;
}

function toBase64(value) {
  const bytes = new TextEncoder().encode(value);
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function invalidResult(message = 'خطأ: استجابة غير صالحة من بيئة التنفيذ') {
  return { ok: false, outputs: [message] };
}

function normalizeResult(value) {
  if (!value || typeof value !== 'object' || typeof value.ok !== 'boolean' || !Array.isArray(value.outputs)) {
    return invalidResult();
  }
  if (value.outputs.length > MAX_OUTPUTS || value.outputs.some(output => typeof output !== 'string' || output.length > MAX_OUTPUT_LENGTH)) {
    return invalidResult();
  }
  return { ok: value.ok, outputs: value.outputs };
}

export function runSandboxedCode(code, { timeoutMs = 2000, signal } = {}) {
  if (typeof code !== 'string' || code.length > MAX_CODE_LENGTH) {
    return Promise.resolve(invalidResult('خطأ: الكود أكبر من الحد المسموح'));
  }

  const safeTimeout = Math.min(10000, Math.max(250, Number(timeoutMs) || 2000));

  return new Promise((resolve) => {
    const frameToken = createToken();
    const workerToken = createToken();
    const iframe = document.createElement('iframe');
    iframe.hidden = true;
    iframe.setAttribute('sandbox', 'allow-scripts');

    const workerSource = `(() => {
      const completionToken = ${JSON.stringify(workerToken)};
      const send = globalThis.postMessage.bind(globalThis);
      const output = [];
      const userCode = ${JSON.stringify(code)};
      const append = value => {
        if (output.length < ${MAX_OUTPUTS}) output.push(String(value).slice(0, ${MAX_OUTPUT_LENGTH}));
      };
      const format = value => {
        if (typeof value !== 'object' || value === null) return String(value);
        try { return JSON.stringify(value, null, 2); }
        catch { return String(value); }
      };
      const log = (...args) => append(args.map(format).join(' '));
      const consoleProxy = { log, warn: log, error: (...args) => append('خطأ: ' + args.map(format).join(' ')) };
      const complete = ok => send({ source: 'learning-worker', token: completionToken, ok, outputs: output });

      try {
        Function('console', userCode)(consoleProxy);
        if (output.length === 0) append('(تم تنفيذ الكود بنجاح)');
        complete(true);
      } catch (error) {
        append('خطأ: ' + error.message);
        complete(false);
      }
    })();`;

    const workerBase64 = toBase64(workerSource);
    const frameSource = `<!doctype html>
      <meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline' 'unsafe-eval'; worker-src blob:; connect-src 'none'; form-action 'none'; object-src 'none'; base-uri 'none'">
      <script>
        const workerToken = '${workerToken}';
        const bytes = Uint8Array.from(atob('${workerBase64}'), char => char.charCodeAt(0));
        const source = new TextDecoder().decode(bytes);
        const workerUrl = URL.createObjectURL(new Blob([source], { type: 'text/javascript' }));
        const worker = new Worker(workerUrl);
        let finished = false;
        const finish = payload => {
          if (finished) return;
          finished = true;
          worker.terminate();
          URL.revokeObjectURL(workerUrl);
          parent.postMessage({ source: 'learning-lab', token: '${frameToken}', payload }, '*');
        };
        worker.onmessage = event => {
          const data = event.data;
          if (!data || data.source !== 'learning-worker' || data.token !== workerToken) return;
          finish({ ok: data.ok, outputs: data.outputs });
        };
        worker.onerror = event => finish({ ok: false, outputs: ['خطأ: ' + event.message] });
        setTimeout(() => finish({ ok: false, outputs: ['خطأ: تجاوز التنفيذ المهلة المحددة'] }), ${safeTimeout});
      </script>`;

    let parentTimer;
    let settled = false;
    const cleanup = () => {
      clearTimeout(parentTimer);
      signal?.removeEventListener('abort', handleAbort);
      window.removeEventListener('message', handleMessage);
      iframe.remove();
    };
    const finish = (result) => {
      if (settled) return;
      settled = true;
      cleanup();
      resolve(result);
    };
    const handleAbort = () => finish({ ok: false, outputs: [], cancelled: true });
    const handleMessage = (event) => {
      if (event.source !== iframe.contentWindow || event.data?.source !== 'learning-lab' || event.data.token !== frameToken) return;
      finish(normalizeResult(event.data.payload));
    };

    if (signal?.aborted) {
      finish({ ok: false, outputs: [], cancelled: true });
      return;
    }

    signal?.addEventListener('abort', handleAbort, { once: true });
    window.addEventListener('message', handleMessage);
    parentTimer = setTimeout(() => finish(invalidResult('خطأ: تعذر بدء بيئة التنفيذ المعزولة')), safeTimeout + 1000);
    iframe.srcdoc = frameSource;
    document.body.appendChild(iframe);
  });
}
