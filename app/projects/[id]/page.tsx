import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getProjectById } from '@/lib/queries';
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
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <Link href="/projects" className="text-accent-purple hover:underline">
            &larr; Back to Projects
          </Link>
        </div>

        {project.video_url ? (
          <video src={project.video_url} controls className="w-full rounded-2xl aspect-video object-cover mb-8" />
        ) : project.image_url ? (
          <div className="aspect-video w-full relative mb-8 overflow-hidden rounded-2xl">
            <Image 
              src={project.image_url} 
              alt={project.title} 
              fill
              className="object-cover" 
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
            />
          </div>
        ) : null}

        <h1 className="text-4xl font-black text-white mb-6">{project.title}</h1>
        
        <div className="flex flex-wrap gap-3 items-center mb-8">
          {project.category && (
            <span className="px-4 py-1.5 bg-accent-purple/20 text-accent-purple rounded-full text-sm font-medium">
              {project.category}
            </span>
          )}
          {project.tech_stack && project.tech_stack.map(tech => (
            <span key={tech} className="px-3 py-1.5 bg-surface-low border border-white/5 rounded-full text-sm text-slate-300">
              {tech}
            </span>
          ))}
        </div>

        <div className="text-lg text-slate-300 leading-relaxed mb-8">
          {project.long_description || project.description}
        </div>

        <div className="flex gap-4 mb-12">
          {project.github_url && (
            <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-xl font-medium flex items-center gap-2 bg-surface-low border border-white/10 hover:border-white/20 text-white transition-colors">
              GitHub
            </a>
          )}
          {project.live_url && (
            <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-xl font-medium flex items-center gap-2 bg-accent-purple hover:bg-accent-purple/90 text-white transition-colors">
              Live Demo
            </a>
          )}
        </div>

        {project.content && (
          <div className="prose-nocturnal mb-12">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{project.content}</ReactMarkdown>
          </div>
        )}

        {project.gallery_urls && project.gallery_urls.length > 0 && (
          <div className="grid grid-cols-2 gap-4">
            {project.gallery_urls.map((url, i) => (
              <div key={i} className="aspect-video relative overflow-hidden rounded-xl">
                <Image 
                  src={url} 
                  alt={`${project.title} gallery image ${i + 1}`} 
                  fill
                  className="object-cover" 
                  sizes="(max-width: 1024px) 50vw, 500px"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
