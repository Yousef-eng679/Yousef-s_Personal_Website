import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getProjectById } from '@/lib/queries';
import EpicMediaShowcase from '@/components/projects/EpicMediaShowcase';
import type { Metadata } from 'next';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    return { title: 'Project Not Found' };
  }

  return {
    title: project.title,
    description: project.description || `View details for ${project.title} on Yousef.Dev`,
    openGraph: {
      title: project.title,
      description: project.description || undefined,
      images: project.image_url ? [project.image_url] : undefined,
    },
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProjectById(id);
  
  if (!project) notFound();

  return (
    <main className="px-8 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Link href="/projects" className="text-accent-purple hover:underline text-sm font-semibold flex items-center gap-2">
            <span>&larr; Back to Projects</span>
          </Link>
        </div>

        {/* Epic Games Store Style Media Showcase & Action Sidebar */}
        <EpicMediaShowcase project={project} />

        {/* Long Overview & Technical Documentation */}
        <div className="max-w-4xl space-y-8 border-t border-white/5 pt-12">
          {project.long_description && (
            <div className="text-xl text-slate-200 leading-relaxed font-medium">
              {project.long_description}
            </div>
          )}

          {project.content && (
            <div className="prose-nocturnal">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{project.content}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
