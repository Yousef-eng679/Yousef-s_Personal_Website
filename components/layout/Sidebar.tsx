'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, User, FolderKanban, FileText, Mail, ExternalLink } from 'lucide-react';
import type { Profile } from '@/types/database';

interface SidebarProps {
  profile: Profile | null;
}

export default function Sidebar({ profile }: SidebarProps) {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/about', label: 'About', icon: User },
    { href: '/projects', label: 'Projects', icon: FolderKanban },
    { href: '/blog', label: 'Blog', icon: FileText },
    { href: '/contact', label: 'Contact', icon: Mail },
  ];

  const getActiveState = (href: string) => {
    if (href === '/' && pathname === '/') return true;
    if (href !== '/' && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <aside className="fixed left-0 top-0 w-64 h-full bg-surface-lowest/80 backdrop-blur-xl border-r border-white/5 hidden lg:flex flex-col z-50">
      <div className="p-8 pb-4">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-10 h-10 rounded-lg bg-accent-purple flex items-center justify-center">
            <span className="font-bold text-white text-lg">Y</span>
          </div>
          <div>
            <h1 className="text-sm font-bold text-white">{profile?.full_name || 'Yousef'}</h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest">{profile?.title || 'AI Engineer'}</p>
          </div>
        </div>

        <nav className="space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = getActiveState(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`sidebar-link group flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 ${isActive ? 'active bg-white/5 text-white' : 'hover:bg-white/5 hover:text-white transition-colors'}`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-8 pt-8 border-t border-white/5">
        <h3 className="text-[10px] text-slate-500 uppercase tracking-widest mb-4">Integrations</h3>
        <div className="space-y-3 mb-8">
          {profile?.github_url && (
            <a href={profile.github_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between group">
              <span className="text-xs text-slate-400 group-hover:text-white transition-colors">GitHub</span>
              <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-white transition-colors" />
            </a>
          )}
          {profile?.linkedin_url && (
            <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between group">
              <span className="text-xs text-slate-400 group-hover:text-white transition-colors">LinkedIn</span>
              <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-white transition-colors" />
            </a>
          )}
        </div>

        <div className="flex items-center gap-3 p-3 bg-surface-low rounded-lg border border-white/5">
          <div className="relative">
            <div className={`w-2 h-2 rounded-full ${profile?.available_for_work ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></div>
          </div>
          <span className="text-xs text-slate-400">{profile?.available_for_work ? 'Available for work' : 'Not available'}</span>
        </div>
      </div>
    </aside>
  );
}
