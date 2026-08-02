import { createClient } from '@/utils/supabase/server';
import type { Metadata } from 'next';
import type { Profile } from '@/types/database';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Yousef for projects, AI engineering inquiries, or professional collaboration.',
};

export default async function ContactPage() {
  const supabase = await createClient();
  const { data: profile } = await supabase.from('profile').select('*').single() as { data: Profile | null };

  return (
    <main className="px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-black text-white mb-4">Get in Touch</h1>
          <p className="text-slate-400 text-lg">Have a project in mind or just want to say hi? I'd love to hear from you.</p>
        </div>

        <div className="space-y-6">
          {profile?.email && (
            <div className="glass-card p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6 justify-between">
              <div className="flex items-center gap-6 text-left w-full md:w-auto">
                <div className="w-12 h-12 bg-accent-purple/20 rounded-xl flex items-center justify-center text-accent-purple">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Email</h3>
                  <p className="text-slate-400">{profile.email}</p>
                </div>
              </div>
              <a href={`mailto:${profile.email}`} className="px-6 py-3 bg-accent-purple hover:bg-accent-purple/90 text-white font-medium rounded-xl transition-colors w-full md:w-auto text-center">
                Send Email
              </a>
            </div>
          )}

          {profile?.github_url && (
            <div className="glass-card p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6 justify-between">
              <div className="flex items-center gap-6 text-left w-full md:w-auto">
                <div className="w-12 h-12 bg-accent-purple/20 rounded-xl flex items-center justify-center text-accent-purple">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path></svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">GitHub</h3>
                  <p className="text-slate-400">Check out my open source work</p>
                </div>
              </div>
              <a href={profile.github_url} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-surface-low border border-white/10 hover:border-white/20 text-white font-medium rounded-xl transition-colors w-full md:w-auto text-center">
                Follow on GitHub
              </a>
            </div>
          )}

          {profile?.linkedin_url && (
            <div className="glass-card p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6 justify-between">
              <div className="flex items-center gap-6 text-left w-full md:w-auto">
                <div className="w-12 h-12 bg-accent-purple/20 rounded-xl flex items-center justify-center text-accent-purple">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd"></path></svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">LinkedIn</h3>
                  <p className="text-slate-400">Connect with me professionally</p>
                </div>
              </div>
              <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-surface-low border border-white/10 hover:border-white/20 text-white font-medium rounded-xl transition-colors w-full md:w-auto text-center">
                Connect on LinkedIn
              </a>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
