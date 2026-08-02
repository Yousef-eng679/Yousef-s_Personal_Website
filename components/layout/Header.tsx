'use client';

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
      </div>
    </header>
  );
}
