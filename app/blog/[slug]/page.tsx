import { notFound } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Article } from '@/types/database';

export const revalidate = 0;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: article } = await supabase.from('articles').select('*').eq('slug', slug).eq('is_published', true).single();
  return {
    title: article?.title || 'Blog Post'
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: article } = await supabase.from('articles').select('*').eq('slug', slug).eq('is_published', true).single() as { data: Article | null };
  
  if (!article) notFound();

  return (
    <div className="px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <Link href="/blog" className="text-accent-purple hover:underline">
            &larr; Back to Blog
          </Link>
        </div>

        {article.cover_image_url && (
          <img src={article.cover_image_url} alt={article.title} className="w-full rounded-2xl aspect-video object-cover mb-10" />
        )}

        <h1 className="text-4xl font-black text-white mb-6 leading-tight">{article.title}</h1>

        <div className="flex items-center gap-4 text-sm mb-12">
          {article.published_at && (
            <span className="text-slate-400">{new Date(article.published_at).toLocaleDateString()}</span>
          )}
          {article.read_time && (
            <span className="px-3 py-1 bg-surface-low border border-white/5 text-accent-purple rounded-full">{article.read_time} min read</span>
          )}
        </div>

        <div className="prose-nocturnal">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.content || ''}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
