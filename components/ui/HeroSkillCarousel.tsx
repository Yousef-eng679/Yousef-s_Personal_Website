'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const skills = [
  'AI-Augmented Developer & Vibe Coder',
  'C++ & Python Software Engineer',
  'Independent AI Researcher & Builder',
  'Designing Next-Gen Software Systems',
];

export default function HeroSkillCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % skills.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-12 relative overflow-hidden flex items-center">
      <AnimatePresence mode="wait">
        <motion.span
          key={skills[index]}
          initial={{ y: 24, opacity: 0, scale: 0.96 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -24, opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="absolute text-2xl lg:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-accent-purple via-violet-400 to-accent-blue tracking-tight"
        >
          {skills[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
