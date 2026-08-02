'use client';

import { Search, Shield } from 'lucide-react';
import Link from 'next/link';
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
        <Link 
          href="/admin" 
          title="Admin Control Center"
          className="w-9 h-9 rounded-full bg-accent-purple/20 border border-accent-purple/30 hover:border-accent-purple/60 flex items-center justify-center transition-all hover:scale-105 group"
        >
          <Shield className="w-4 h-4 text-accent-purple group-hover:text-white transition-colors" />
        </Link>
      </div>
    </header>
  );
}
