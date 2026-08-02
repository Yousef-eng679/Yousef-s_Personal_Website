'use client';

import dynamic from 'next/dynamic';

const BackgroundShader = dynamic(() => import('./BackgroundShader'), { ssr: false });

export default function ClientBackgroundShader() {
  return <BackgroundShader />;
}
