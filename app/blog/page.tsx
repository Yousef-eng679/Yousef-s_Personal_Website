import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import type { Article } from '@/types/database';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Articles, insights, and technical writeups on AI engineering and modern web architecture.',
};

export default async function BlogPage() {
  const supabase = await createClient();
  const { data: articles } = await supabase.from('articles').select('*').eq('is_published', true).order('published_at', { ascending: false });

  return (
    <main className="px-8 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-black text-white mb-4">Blog</h1>
          <p className="text-slate-500">Thoughts, learnings, and updates</p>
        </div>

        {!articles || articles.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center text-slate-400">
            No articles published yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article: Article) => (
              <Link
                key={article.id}
                href={`/blog/${article.slug}`}
                className="glass-card rounded-2xl overflow-hidden flex flex-col group cursor-pointer transition-all duration-300 hover:border-accent-purple/50"
              >
                {article.cover_image_url && (
                  <div className="aspect-video w-full overflow-hidden bg-surface-lowest relative">
                    <Image
                      src={article.cover_image_url}
                      alt={article.title}
                      fill
                      className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-6 flex-1 flex flex-col">
                  <h2 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-accent-purple transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-sm text-slate-400 mb-6 flex-1 line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>

                  <div className="flex items-center justify-between text-xs mt-auto pt-4 border-t border-white/5">
                    {article.read_time && (
                      <span className="px-2 py-1 bg-surface-lowest text-accent-purple rounded-md font-semibold">
                        {article.read_time} min read
                      </span>
                    )}
                    {article.published_at && (
                      <span className="text-slate-500">
                        {new Date(article.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
