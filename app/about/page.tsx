import { createClient } from '@/utils/supabase/server';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import type { Metadata } from 'next';
import type { AboutSection, Profile } from '@/types/database';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'About Me',
  description: 'Learn more about Yousef, background in AI engineering and full-stack software development.',
};

export default async function AboutPage() {
  const supabase = await createClient();

  const [sectionsRes, profileRes] = await Promise.all([
    supabase.from('about_sections').select('*').order('sort_order'),
    supabase.from('profile').select('*').single(),
  ]);

  const sections = sectionsRes.data as AboutSection[] | null;
  const profile = profileRes.data as Profile | null;

  return (
    <main className="px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-black text-white mb-4">About Me</h1>
        </div>

        {!sections || sections.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center text-slate-400">
            No about sections found.
          </div>
        ) : (
          <div>
            {sections.map((section: AboutSection) => (
              <div key={section.id} className="glass-card rounded-2xl p-8 mb-6">
                <h2 className="text-2xl font-bold text-white mb-4">{section.title}</h2>
                <div className={`flex flex-col ${section.image_url ? 'md:flex-row' : ''} gap-8`}>
                  <div className={`prose-nocturnal ${section.image_url ? 'md:w-2/3' : 'w-full'}`}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{section.content || ''}</ReactMarkdown>
                  </div>
                  {section.image_url && (
                    <div className="md:w-1/3 relative min-h-[200px]">
                      <Image 
                        src={section.image_url} 
                        alt={section.title} 
                        fill
                        className="rounded-xl object-cover" 
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
