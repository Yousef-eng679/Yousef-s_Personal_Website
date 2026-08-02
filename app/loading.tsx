import SkeletonCard from '@/components/ui/SkeletonCard';

export default function Loading() {
  return (
    <main className="min-h-screen px-8 py-12">
      <div className="max-w-7xl mx-auto space-y-12 animate-pulse">
        <div className="space-y-4 max-w-2xl">
          <div className="h-4 w-32 bg-surface-low/80 rounded-full"></div>
          <div className="h-12 w-3/4 bg-surface-low/80 rounded-2xl"></div>
          <div className="h-6 w-full bg-surface-low/60 rounded-xl"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    </main>
  );
}
