'use client';

import { useState, useRef } from 'react';
import type { Project } from '@/types/database';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const getIconColorClass = (colorStr: string) => {
    switch (colorStr) {
      case 'purple': return 'bg-accent-purple/20 text-accent-purple border-accent-purple/30';
      case 'emerald': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'blue': return 'bg-accent-blue/20 text-accent-blue border-accent-blue/30';
      case 'amber': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'rose': return 'bg-rose-500/20 text-rose-400 border-rose-500/30';
      default: return 'bg-white/10 text-white border-white/10';
    }
  };

  const colorClass = getIconColorClass(project.icon_color || 'purple');

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <Link 
      href={`/projects/${project.id}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="glass-card p-6 rounded-2xl flex flex-col h-full animate-fade-in-up relative group cursor-pointer block transition-all duration-300 hover:border-accent-purple/50"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Video Hover Layer or Media Preview */}
      {project.video_url ? (
        <div className="relative aspect-video w-full mb-6 rounded-xl overflow-hidden bg-surface-lowest border border-white/5 group-hover:border-accent-purple/40 transition-colors">
          <video 
            ref={videoRef}
            src={project.video_url} 
            muted 
            loop 
            playsInline
            preload="metadata"
            className={`w-full h-full object-cover transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-60'}`}
          />
          {!isHovered && (
            <div className="absolute inset-0 bg-surface-lowest/40 backdrop-blur-[2px] flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-accent-purple/80 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                <Play className="w-4 h-4 ml-0.5" />
              </div>
            </div>
          )}
          <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-slate-300 border border-white/10 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-accent-purple animate-pulse" /> Video Demo
          </span>
        </div>
      ) : project.image_url ? (
        <div className="relative aspect-video w-full mb-6 rounded-xl overflow-hidden bg-surface-lowest border border-white/5 group-hover:border-accent-purple/40 transition-colors">
          <img 
            src={project.image_url} 
            alt={project.title}
            className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-700 ease-out" 
          />
        </div>
      ) : null}

      {/* Header Badge */}
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${colorClass} border rounded-xl flex items-center justify-center shadow-inner transform group-hover:scale-110 transition-transform duration-300`}>
          <span className="text-2xl">{project.icon_emoji || '🚀'}</span>
        </div>
        {project.category && (
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400">
            {project.category}
          </span>
        )}
      </div>
      
      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent-purple transition-colors">{project.title}</h3>
      <p className="text-sm text-slate-400 mb-6 flex-grow leading-relaxed line-clamp-3">
        {project.description}
      </p>
      
      {project.tech_stack && project.tech_stack.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tech_stack.map((tech: string, i: number) => (
            <span key={i} className="px-2.5 py-1 bg-surface-lowest/80 border border-white/5 rounded-md text-[10px] font-bold text-slate-300 uppercase tracking-wider group-hover:border-accent-purple/20 transition-colors">
              {tech}
            </span>
          ))}
        </div>
      )}
      
      <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
        <span className="text-xs font-bold text-white flex items-center gap-2 group-hover:text-accent-purple transition-colors">
          <span>View project</span>
          <ArrowRight className="w-3.5 h-3.5 text-accent-purple transition-transform group-hover:translate-x-1.5" />
        </span>
      </div>
    </Link>
  );
}
