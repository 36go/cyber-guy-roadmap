import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, ChevronDown, ChevronUp, FileCode } from 'lucide-react';

const TOKEN_PATTERN = /\/\*[\s\S]*?\*\/|\/\/[^\n]*|<\/?[\w-]+(?:\s+[^<>]*?)?\/?>|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`|\b(?:import|from|export|default|const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|new|try|catch|finally|throw|async|await|yield|class|extends|super|this|typeof|instanceof|void|delete|in|of)\b|\b(?:true|false|null|undefined|NaN|Infinity)\b|\b\d+(?:\.\d+)?\b/g;

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function getTokenClass(token) {
  if (token.startsWith('//') || token.startsWith('/*')) return 'comment';
  if (token.startsWith('<')) return 'tag';
  if (/^["'`]/.test(token)) return 'string';
  if (/^\d/.test(token)) return 'number';
  if (/^(?:true|false|null|undefined|NaN|Infinity)$/.test(token)) return 'literal';
  return 'keyword';
}

function highlightSyntax(code) {
  let result = '';
  let lastIndex = 0;

  for (const match of code.matchAll(TOKEN_PATTERN)) {
    result += escapeHtml(code.slice(lastIndex, match.index));
    result += `<span class="code-${getTokenClass(match[0])}">${escapeHtml(match[0])}</span>`;
    lastIndex = match.index + match[0].length;
  }

  return result + escapeHtml(code.slice(lastIndex));
}

function getLineCount(code) {
  return code.split('\n').length;
}

export default function CodeViewer({ code, language = 'javascript', title = 'code.js', maxLines = 15 }) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const preRef = useRef(null);
  const lineCount = getLineCount(code);
  const isLong = lineCount > maxLines;
  const displayCode = expanded || !isLong ? code : code.split('\n').slice(0, maxLines).join('\n');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = code;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlighted = highlightSyntax(displayCode);
  const displayLines = getLineCount(displayCode);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-xl overflow-hidden border border-dark-border bg-[#1a1b2e]"
    >
      <div className="flex items-center justify-between px-4 py-3 bg-[#16172b] border-b border-dark-border">
        <div className="flex items-center gap-2">
          <FileCode size={16} className="text-muted-text" />
          <span className="text-sm text-muted-text font-mono">{title}</span>
          <span className="px-1.5 py-0.5 rounded text-xs font-mono bg-dark-border/30 text-muted-text">
            {language}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-muted-text hover:text-accent hover:bg-dark-border/30 transition-all duration-200"
        >
          {copied ? (
            <>
              <Check size={14} className="text-success" />
              تم النسخ
            </>
          ) : (
            <>
              <Copy size={14} />
              نسخ
            </>
          )}
        </button>
      </div>

      <div className="overflow-x-auto" dir="ltr">
        <table className="w-full">
          <tbody>
            <tr>
              <td className="select-none text-left align-top py-3 pl-3 pr-4 text-xs text-muted-text/40 font-mono border-l border-dark-border/30">
                {Array.from({ length: displayLines }, (_, i) => (
                  <div key={i} className="leading-6">{i + 1}</div>
                ))}
              </td>
              <td className="align-top py-3 px-4">
                <pre
                  ref={preRef}
                  className="text-sm leading-6 font-mono text-[#e2e8f0] whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: highlighted }}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center gap-2 py-3 text-sm text-muted-text hover:text-accent bg-dark-bg/30 border-t border-dark-border transition-colors"
        >
          {expanded ? (
            <>
              <ChevronUp size={16} />
              طي الكود
            </>
          ) : (
            <>
              <ChevronDown size={16} />
              عرض الكود كاملاً ({lineCount - maxLines} سطر إضافي)
            </>
          )}
        </button>
      )}
    </motion.div>
  );
}
