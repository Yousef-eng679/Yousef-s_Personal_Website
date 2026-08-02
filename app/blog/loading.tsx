export default function Loading() {
  return (
    <main className="px-8 py-12">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="space-y-3 animate-pulse">
          <div className="h-10 w-32 bg-surface-low/80 rounded-2xl"></div>
          <div className="h-5 w-64 bg-surface-low/60 rounded-lg"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-card rounded-2xl h-80 p-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="aspect-video w-full bg-surface-low/80 rounded-xl"></div>
                <div className="h-6 w-3/4 bg-surface-low/80 rounded-lg"></div>
                <div className="h-4 w-full bg-surface-low/60 rounded-md"></div>
              </div>
              <div className="h-4 w-1/4 bg-surface-low/60 rounded-md pt-4"></div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
