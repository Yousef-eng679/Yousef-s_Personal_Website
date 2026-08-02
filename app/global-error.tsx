'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#0a0812] text-slate-200 flex items-center justify-center p-4 font-sans">
        <div className="max-w-md w-full p-8 text-center rounded-3xl border border-white/10 bg-[#15121b] flex flex-col items-center">
          <h1 className="text-2xl font-bold text-white mb-3">Critical Application Error</h1>
          <p className="text-slate-400 text-sm mb-6">
            A fatal layout error occurred. Click below to reload.
          </p>
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-all w-full"
          >
            Reload Application
          </button>
        </div>
      </body>
    </html>
  );
}
