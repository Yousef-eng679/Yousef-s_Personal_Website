export default function SkeletonCard() {
  return (
    <div className="glass-card p-6 rounded-2xl flex flex-col h-full animate-pulse">
      <div className="w-12 h-12 bg-surface-bright/30 rounded-xl mb-6"></div>
      
      <div className="h-6 bg-surface-bright/30 rounded-md w-3/4 mb-4"></div>
      
      <div className="space-y-2 mb-6 flex-grow">
        <div className="h-3 bg-surface-bright/30 rounded-md w-full"></div>
        <div className="h-3 bg-surface-bright/30 rounded-md w-full"></div>
        <div className="h-3 bg-surface-bright/30 rounded-md w-2/3"></div>
      </div>
      
      <div className="flex gap-2 mb-6">
        <div className="h-6 w-16 bg-surface-bright/30 rounded-md"></div>
        <div className="h-6 w-16 bg-surface-bright/30 rounded-md"></div>
      </div>
      
      <div className="mt-auto pt-4 border-t border-white/5">
        <div className="h-4 w-24 bg-surface-bright/30 rounded-md"></div>
      </div>
    </div>
  );
}
