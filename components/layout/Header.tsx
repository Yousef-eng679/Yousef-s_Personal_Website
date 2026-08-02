'use client';

import { Search, Bell, Sun } from 'lucide-react';
import MobileSidebar from './MobileSidebar';
import type { Profile } from '@/types/database';

interface HeaderProps {
  profile: Profile | null;
}

export default function Header({ profile }: HeaderProps) {
  return (
    <header className="h-16 border-b border-white/5 flex items-center justify-between px-4 lg:px-8 bg-surface-lowest/40 backdrop-blur-md sticky top-0 z-40">
      <div className="flex items-center gap-4 flex-1">
        <MobileSidebar profile={profile} />
        
        <div className="relative w-full max-w-sm hidden sm:block lg:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search projects, skills, or articles... (⌘K)"
            className="w-full h-9 pl-10 pr-4 bg-surface-low/50 border border-white/10 rounded-lg text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-accent-purple focus:border-accent-purple transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button className="p-2 text-slate-400 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
        </button>
        <button className="p-2 text-slate-400 hover:text-white transition-colors">
          <Sun className="w-5 h-5" />
        </button>
        <div className="w-8 h-8 rounded-full bg-accent-blue/20 border border-accent-blue/30 flex items-center justify-center ml-2 cursor-pointer">
          <span className="text-xs font-bold text-accent-blue">Y</span>
        </div>
      </div>
    </header>
  );
}
