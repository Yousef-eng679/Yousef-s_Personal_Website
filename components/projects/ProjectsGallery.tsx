'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Project } from '@/types/database';
import { ArrowRight, Sparkles } from 'lucide-react';

interface ProjectsGalleryProps {
  initialProjects: Project[];
}

export default function ProjectsGallery({ initialProjects }: ProjectsGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'project' | 'research' | 'tool'>('all');

  const categories = [
    { key: 'all', label: 'All' },
    { key: 'project', label: 'Projects' },
    { key: 'research', label: 'Research' },
    { key: 'tool', label: 'Tools' },
  ] as const;

  const filteredProjects = initialProjects.filter((project) => {
    if (activeCategory === 'all') return true;
    return project.category?.toLowerCase() === activeCategory;
  });

  const renderIcon = (project: Project) => {
    if (!project.icon_emoji || !project.icon_emoji.trim()) return null;
    const isUrl = project.icon_emoji.startsWith('http://') || project.icon_emoji.startsWith('https://') || project.icon_emoji.startsWith('/');

    if (isUrl) {
      return (
        <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-white/10 shrink-0">
          <Image src={project.icon_emoji} alt={project.title} fill className="object-cover" />
        </div>
      );
    }

    return <span>{project.icon_emoji}</span>;
  };

  return (
    <div>
      {/* Category Filter Pills (Fully Functional) */}
      <div className="flex flex-wrap gap-3 mb-10">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                isActive
                  ? 'bg-accent-purple/20 text-accent-purple border border-accent-purple/40 shadow-lg shadow-accent-purple/10 scale-105'
                  : 'bg-surface-low border border-white/5 text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center text-slate-400">
          No projects found in this category.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project: Project) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="glass-card rounded-2xl overflow-hidden w-full group cursor-pointer block transition-all duration-300 hover:border-accent-purple/50"
            >
              {project.image_url ? (
                <div className="aspect-video w-full overflow-hidden bg-surface-lowest relative">
                  <Image
                    src={project.image_url}
                    alt={project.title}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {project.video_url && (
                    <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-1 rounded-md bg-black/70 backdrop-blur-md text-slate-200 border border-white/10 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-accent-purple animate-pulse" /> Video Demo
                    </span>
                  )}
                </div>
              ) : project.video_url ? (
                <div className="aspect-video w-full overflow-hidden bg-surface-lowest relative">
                  <video
                    src={project.video_url}
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : null}

              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-white group-hover:text-accent-purple transition-colors flex items-center gap-2">
                    {renderIcon(project)}
                    <span>{project.title}</span>
                  </h2>
                  {project.category && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400">
                      {project.category}
                    </span>
                  )}
                </div>

                <p className="text-slate-400 mb-6 leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {project.tech_stack && project.tech_stack.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech_stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-surface-lowest border border-white/5 rounded-md text-xs font-semibold text-slate-300 uppercase tracking-wider group-hover:border-accent-purple/20 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-sm font-bold text-accent-purple flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
