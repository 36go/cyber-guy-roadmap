import { Loader2 } from 'lucide-react';

function FullPageLoader({ text }) {
  return (
    <div className="fixed inset-0 z-[150] flex flex-col items-center justify-center bg-dark-bg/80 backdrop-blur-sm">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-dark-border border-t-accent animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-gradient-accent animate-pulse" />
        </div>
      </div>
      {text && (
        <p className="mt-4 text-muted-text text-sm font-medium">{text}</p>
      )}
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-xl border border-dark-border bg-dark-card p-5 space-y-4 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-dark-border" />
        <div className="h-5 w-2/3 rounded bg-dark-border" />
      </div>
      <div className="space-y-2">
        <div className="h-3 w-full rounded bg-dark-border" />
        <div className="h-3 w-5/6 rounded bg-dark-border" />
        <div className="h-3 w-4/6 rounded bg-dark-border" />
      </div>
      <div className="h-9 w-24 rounded-lg bg-dark-border" />
    </div>
  );
}

function InlineSpinner() {
  return (
    <Loader2 size={20} className="animate-spin text-accent" />
  );
}

export default function Loading({ type = 'full', text = 'جارٍ التحميل...' }) {
  if (type === 'full') return <FullPageLoader text={text} />;
  if (type === 'card') return <SkeletonCard />;
  return <InlineSpinner />;
}

export { FullPageLoader, SkeletonCard, InlineSpinner };
