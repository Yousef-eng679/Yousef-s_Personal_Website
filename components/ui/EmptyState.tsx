import { SearchX } from 'lucide-react';

interface EmptyStateProps {
  message?: string;
}

export default function EmptyState({ message = "No items found." }: EmptyStateProps) {
  return (
    <div className="glass-card p-12 rounded-2xl flex flex-col items-center justify-center text-center w-full">
      <div className="w-16 h-16 bg-surface-bright/20 rounded-full flex items-center justify-center mb-4">
        <SearchX className="w-8 h-8 text-slate-500" />
      </div>
      <h3 className="text-lg font-medium text-white mb-2">Nothing to see here</h3>
      <p className="text-sm text-slate-400 max-w-sm">
        {message}
      </p>
    </div>
  );
}
