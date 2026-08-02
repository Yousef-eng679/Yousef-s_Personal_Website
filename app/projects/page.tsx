import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import type { Project } from '@/types/database';

export const revalidate = 0;

export default async function ProjectsPage() {
  const supabase = await createClient();
  const { data: projects } = await supabase.from('projects').select('*').order('sort_order');

  return (
    <div className="px-8 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-black text-white mb-4">All Projects</h1>
          <p className="text-slate-500">Everything I've built</p>
        </div>
        
        <div className="flex gap-3 mb-10">
          <div className="px-4 py-2 rounded-full text-sm font-medium bg-accent-purple/20 text-accent-purple border border-accent-purple/30">All</div>
          <div className="px-4 py-2 rounded-full text-sm font-medium bg-surface-low border border-white/5 text-slate-400">Projects</div>
          <div className="px-4 py-2 rounded-full text-sm font-medium bg-surface-low border border-white/5 text-slate-400">Research</div>
          <div className="px-4 py-2 rounded-full text-sm font-medium bg-surface-low border border-white/5 text-slate-400">Tools</div>
        </div>

        {!projects || projects.length === 0 ? (
          <div className="text-slate-400">No projects found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project: Project) => (
              <div key={project.id} className="glass-card rounded-2xl overflow-hidden w-full">
                {project.image_url ? (
                  <img src={project.image_url} alt={project.title} className="aspect-video w-full object-cover" />
                ) : project.video_url ? (
                  <video src={project.video_url} className="aspect-video w-full object-cover" />
                ) : null}
                <div className="p-8">
                  <h2 className="text-2xl font-bold mb-3">{project.icon_emoji || '🚀'} {project.title}</h2>
                  <p className="text-slate-400 mb-6">{project.description}</p>
                  
                  {project.tech_stack && project.tech_stack.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech_stack.map(tech => (
                        <span key={tech} className="px-3 py-1 bg-surface-lowest rounded-md text-xs text-slate-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <Link href={`/projects/${project.id}`} className="text-accent-purple font-medium hover:underline">
                    View Details &rarr;
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
