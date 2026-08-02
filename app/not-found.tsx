import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-card max-w-md w-full p-12 text-center rounded-3xl border border-white/10 bg-surface/50 backdrop-blur-md flex flex-col items-center">
        <div className="w-20 h-20 bg-accent-purple/10 rounded-full flex items-center justify-center mb-6">
          <AlertCircle className="w-10 h-10 text-accent-purple" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">Page Not Found</h1>
        <p className="text-slate-400 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link 
          href="/"
          className="px-6 py-3 bg-accent-purple hover:bg-accent-purple/90 text-white font-bold rounded-xl transition-all w-full"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
