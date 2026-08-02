'use client';

import { AlertCircle, RotateCcw } from 'lucide-react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="glass-card max-w-md w-full p-8 text-center rounded-3xl border border-white/10 bg-surface/80 backdrop-blur-md flex flex-col items-center">
        <div className="w-16 h-16 bg-rose-500/10 rounded-2xl flex items-center justify-center mb-6 text-rose-400">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Something Went Wrong</h2>
        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
          {error?.message || 'An unexpected application error occurred while loading this page.'}
        </p>
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-accent-purple hover:bg-accent-purple/90 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 w-full shadow-[0_0_20px_rgba(139,92,246,0.3)]"
        >
          <RotateCcw className="w-4 h-4" />
          Try Again
        </button>
      </div>
    </div>
  );
}
