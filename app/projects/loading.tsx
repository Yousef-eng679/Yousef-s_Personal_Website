import SkeletonCard from '@/components/ui/SkeletonCard';

export default function Loading() {
  return (
    <main className="px-8 py-12">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="space-y-3 animate-pulse">
          <div className="h-10 w-48 bg-surface-low/80 rounded-2xl"></div>
          <div className="h-5 w-36 bg-surface-low/60 rounded-lg"></div>
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
