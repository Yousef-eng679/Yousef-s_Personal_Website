import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import type { Article } from '@/types/database';

export const revalidate = 0;

export default async function BlogPage() {
  const supabase = await createClient();
  const { data: articles } = await supabase.from('articles').select('*').eq('is_published', true).order('published_at', { ascending: false });

  return (
    <div className="px-8 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-black text-white mb-4">Blog</h1>
          <p className="text-slate-500">Thoughts, learnings, and updates</p>
        </div>

        {!articles || articles.length === 0 ? (
          <div className="text-slate-400">No articles published yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article: Article) => (
              <div key={article.id} className="glass-card rounded-2xl overflow-hidden flex flex-col">
                {article.cover_image_url && (
                  <img src={article.cover_image_url} alt={article.title} className="aspect-video w-full object-cover" />
                )}
                <div className="p-6 flex-1 flex flex-col">
                  <h2 className="text-xl font-bold text-white mb-3 leading-tight">{article.title}</h2>
                  <p className="text-sm text-slate-400 mb-6 flex-1">{article.summary}</p>
                  
                  <div className="flex items-center gap-3 text-xs mb-4">
                    {article.read_time && (
                      <span className="px-2 py-1 bg-surface-lowest text-accent-purple rounded-md">{article.read_time} min read</span>
                    )}
                    {article.published_at && (
                      <span className="text-slate-500">{new Date(article.published_at).toLocaleDateString()}</span>
                    )}
                  </div>
                  
                  <Link href={`/blog/${article.slug}`} className="text-accent-purple text-sm font-medium hover:underline mt-auto">
                    Read Article &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
