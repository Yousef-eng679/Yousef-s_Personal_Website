import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getArticleBySlug } from '@/lib/queries';
import type { Metadata } from 'next';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  
  if (!article) {
    return { title: 'Article Not Found' };
  }

  return {
    title: article.title,
    description: article.summary || `Read ${article.title} on Yousef.Dev`,
    openGraph: {
      title: article.title,
      description: article.summary || undefined,
      images: article.cover_image_url ? [article.cover_image_url] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  
  if (!article) notFound();

  return (
    <main className="px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <Link href="/blog" className="text-accent-purple hover:underline">
            &larr; Back to Blog
          </Link>
        </div>

        {article.cover_image_url && (
          <div className="aspect-video w-full relative mb-10 overflow-hidden rounded-2xl">
            <Image 
              src={article.cover_image_url} 
              alt={article.title} 
              fill
              className="object-cover" 
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
        )}

        <h1 className="text-4xl font-black text-white mb-6 leading-tight">{article.title}</h1>

        <div className="flex items-center gap-4 text-sm mb-12">
          {article.published_at && (
            <span className="text-slate-400">
              {new Date(article.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          )}
          {article.read_time && (
            <span className="px-3 py-1 bg-surface-low border border-white/5 text-accent-purple rounded-full">{article.read_time} min read</span>
          )}
        </div>

        <div className="prose-nocturnal">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.content || ''}</ReactMarkdown>
        </div>
      </div>
    </main>
  );
}
