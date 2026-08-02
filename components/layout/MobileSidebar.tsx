'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from './Sidebar';
import type { Profile } from '@/types/database';

interface MobileSidebarProps {
  profile: Profile | null;
}

export default function MobileSidebar({ profile }: MobileSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 -ml-2 text-slate-400 hover:text-white lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-surface-lowest/80 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="fixed inset-y-0 left-0 w-64 bg-surface z-50 lg:hidden flex flex-col"
            >
              <div className="absolute top-4 right-4 z-[60]">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-slate-400 hover:text-white bg-surface-low rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div 
                className="relative w-full h-full [&>aside]:static [&>aside]:w-full [&>aside]:flex [&>aside]:border-r-0"
                onClick={(e) => {
                  if ((e.target as HTMLElement).closest('a')) {
                    setIsOpen(false);
                  }
                }}
              >
                  <Sidebar profile={profile} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
