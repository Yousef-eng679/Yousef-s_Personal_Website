'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Play, ExternalLink, Github, Image as ImageIcon } from 'lucide-react';
import type { Project } from '@/types/database';

interface EpicMediaShowcaseProps {
  project: Project;
}

type MediaItem = 
  | { type: 'video'; url: string; poster?: string }
  | { type: 'image'; url: string; label?: string };

export default function EpicMediaShowcase({ project }: EpicMediaShowcaseProps) {
  // Collect all media items: video first (if exists), then hero image, then gallery images
  const mediaItems: MediaItem[] = [];

  if (project.video_url) {
    mediaItems.push({
      type: 'video',
      url: project.video_url,
      poster: project.image_url || undefined,
    });
  }

  if (project.image_url) {
    mediaItems.push({
      type: 'image',
      url: project.image_url,
      label: 'Main Cover',
    });
  }

  if (project.gallery_urls && project.gallery_urls.length > 0) {
    project.gallery_urls.forEach((url, idx) => {
      // Don't duplicate main cover if it's in gallery
      if (url && url !== project.image_url) {
        mediaItems.push({
          type: 'image',
          url,
          label: `Screenshot ${idx + 1}`,
        });
      }
    });
  }

  const [activeIndex, setActiveIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});

  const activeMedia = mediaItems[activeIndex] || (mediaItems.length > 0 ? mediaItems[0] : null);

  const handleImageError = (index: number) => {
    setFailedImages((prev) => ({ ...prev, [index]: true }));
  };

  // Helper for rendering icon if present or leaving blank
  const renderIcon = () => {
    if (!project.icon_emoji || !project.icon_emoji.trim()) return null;
    const isUrl = project.icon_emoji.startsWith('http://') || project.icon_emoji.startsWith('https://') || project.icon_emoji.startsWith('/');
    
    if (isUrl) {
      return (
        <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-white/10 shrink-0">
          <img src={project.icon_emoji} alt="" className="w-full h-full object-cover" />
        </div>
      );
    }
    
    return (
      <div className="w-12 h-12 rounded-xl bg-accent-purple/20 border border-accent-purple/30 flex items-center justify-center shrink-0">
        <span className="text-2xl">{project.icon_emoji}</span>
      </div>
    );
  };

  return (
    <div className="space-y-8 mb-16">
      {/* Main Showcase Layout: Left Media Stage + Right Epic Action Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left 2 Columns: Main Stage Player & Thumbnail Strip */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Main Media Stage (16:9 Player) */}
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-surface-lowest border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] group">
            {activeMedia ? (
              activeMedia.type === 'video' ? (
                <video
                  key={activeMedia.url}
                  src={activeMedia.url}
                  poster={activeMedia.poster}
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : failedImages[activeIndex] ? (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 bg-surface-low gap-2">
                  <ImageIcon className="w-10 h-10 text-slate-600" />
                  <span className="text-xs">Image unavailable</span>
                </div>
              ) : (
                <img
                  key={activeMedia.url}
                  src={activeMedia.url}
                  alt={project.title}
                  onError={() => handleImageError(activeIndex)}
                  className="w-full h-full object-cover transition-opacity duration-300"
                />
              )
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-500">
                No preview media available
              </div>
            )}
          </div>

          {/* Thumbnail Strip (Epic Games Style Carousel Below Player) */}
          {mediaItems.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2 pt-1 scrollbar-thin scrollbar-thumb-accent-purple/30">
              {mediaItems.map((item, idx) => {
                const isActive = idx === activeIndex;
                const isFailed = failedImages[idx];

                return (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`relative w-28 aspect-video rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer bg-surface-lowest ${
                      isActive
                        ? 'border-accent-purple ring-2 ring-accent-purple/40 scale-105 shadow-[0_0_15px_rgba(139,92,246,0.5)]'
                        : 'border-white/10 opacity-70 hover:opacity-100 hover:border-white/30'
                    }`}
                  >
                    {item.type === 'video' ? (
                      <div className="w-full h-full bg-surface-lowest relative flex items-center justify-center">
                        {item.poster ? (
                          <img src={item.poster} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-surface-low" />
                        )}
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <div className="w-7 h-7 rounded-full bg-accent-purple/90 text-white flex items-center justify-center shadow-md">
                            <Play className="w-3.5 h-3.5 ml-0.5" />
                          </div>
                        </div>
                      </div>
                    ) : isFailed ? (
                      <div className="w-full h-full bg-surface-low flex flex-col items-center justify-center text-slate-600 gap-1">
                        <ImageIcon className="w-4 h-4" />
                        <span className="text-[9px] font-bold">Image {idx + 1}</span>
                      </div>
                    ) : (
                      <img
                        src={item.url}
                        alt=""
                        onError={() => handleImageError(idx)}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right 1 Column: Epic Games Style Action Card */}
        <div className="glass-card p-6 lg:p-8 rounded-2xl border border-white/10 bg-surface-low/60 backdrop-blur-xl flex flex-col gap-6 sticky top-24">
          
          {/* Logo / Header & Title */}
          <div className="flex items-center gap-4">
            {renderIcon()}
            <div>
              <h1 className="text-2xl lg:text-3xl font-black text-white leading-tight tracking-tight">
                {project.title}
              </h1>
              {project.category && (
                <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-400">
                  {project.category}
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 bg-accent-purple hover:bg-accent-purple/90 text-white font-black rounded-xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] shadow-[0_0_25px_rgba(139,92,246,0.4)] group"
              >
                <span>Launch App</span>
                <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            )}

            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 bg-surface-lowest hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-bold rounded-xl flex items-center justify-center gap-3 transition-all"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Repository</span>
              </a>
            )}
          </div>

          {/* Key Specs / Metadata Panel */}
          <div className="pt-6 border-t border-white/5 space-y-4 text-xs">
            <div className="flex justify-between items-center py-1.5 border-b border-white/5">
              <span className="text-slate-400">Developer</span>
              <span className="font-bold text-white">Yousef</span>
            </div>
            
            <div className="flex justify-between items-center py-1.5 border-b border-white/5">
              <span className="text-slate-400">Category</span>
              <span className="font-bold text-white capitalize">{project.category || 'Engineering'}</span>
            </div>

            {project.tech_stack && project.tech_stack.length > 0 && (
              <div className="py-1.5 space-y-2">
                <span className="text-slate-400 block">Tech Stack</span>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech_stack.map((tech) => (
                    <span key={tech} className="px-2.5 py-1 bg-surface-lowest border border-white/10 rounded-md text-[10px] font-bold text-slate-300 uppercase tracking-wider">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
