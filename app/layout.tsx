import type { Metadata } from 'next';
import { Inter, Hanken_Grotesk, Fira_Code } from 'next/font/google';
import './globals.css';
import BackgroundShader from '@/components/3d/BackgroundShader';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { createClient } from '@/utils/supabase/server';
import type { Profile } from '@/types/database';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const hanken = Hanken_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-hanken',
});

const mono = Fira_Code({ 
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

export const metadata: Metadata = {
  title: 'Yousef | AI Engineer & Full-Stack Developer',
  description: 'Portfolio of Yousef, an AI Engineer and Full-Stack Developer building intelligent applications.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: profile } = await supabase.from('profile').select('*').single();

  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${hanken.variable} ${mono.variable} min-h-screen bg-surface text-slate-200 font-sans`}>
        <BackgroundShader />
        <div className="flex min-h-screen">
          <Sidebar profile={profile as Profile} />
          <main className="lg:ml-64 flex-1">
            <Header profile={profile as Profile} />
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
