import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import Image from 'next/image';
import HeroScene from '@/components/3d/HeroScene';
import HeroSkillCarousel from '@/components/ui/HeroSkillCarousel';
import ProjectCard from '@/components/ui/ProjectCard';
import EmptyState from '@/components/ui/EmptyState';
import type { Article } from '@/types/database';
import { ArrowRight, Download, Sparkles } from 'lucide-react';

export const revalidate = 60;

export default async function HomePage() {
  const supabase = await createClient();

  // BN-01 Optimization: Concurrent parallel fetching via Promise.all
  const [profileRes, projectsRes, articlesRes] = await Promise.all([
    supabase.from('profile').select('*').single(),
    supabase.from('projects').select('*').eq('is_featured', true).order('sort_order'),
    supabase.from('articles').select('*').eq('is_published', true).order('published_at', { ascending: false }).limit(3),
  ]);

  const profile = profileRes.data;
  const featuredProjects = projectsRes.data;
  const latestArticles = articlesRes.data;

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="px-8 pt-20 pb-16 relative">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-3/5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-accent-purple text-xs font-bold uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {profile?.available_for_work ? 'Available for new projects' : 'Building intelligent systems'}
            </div>

            <div>
              <p className="text-slate-400 font-bold mb-1 tracking-wide">
                Hello, I'm <span className="text-white">{profile?.full_name || 'Yousef'}</span> 👋
              </p>
              <HeroSkillCarousel />
            </div>

            <h1 className="text-5xl lg:text-7xl font-black text-white leading-[1.08] tracking-tight">
              {profile?.headline || 'Building Intelligent Systems & High-Fidelity Web Apps.'}
            </h1>

            <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
              {profile?.bio || 'Passionate about bridging cutting-edge artificial intelligence with production-ready full-stack software.'}
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link 
                href="/projects"
                className="btn-glow px-8 py-4 bg-accent-purple hover:bg-accent-purple/90 text-white font-black rounded-xl flex items-center gap-3 transition-all shadow-[0_0_30px_rgba(139,92,246,0.4)]"
              >
                <span>View My Work</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              {profile?.cv_url ? (
                <a
                  href={profile.cv_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-surface-low border border-white/10 hover:border-white/20 text-white font-bold rounded-xl flex items-center gap-3 transition-all hover:scale-[1.02]"
                >
                  <Download className="w-5 h-5 text-slate-400" />
                  <span>Download CV</span>
                </a>
              ) : (
                <Link
                  href="/about"
                  className="px-8 py-4 bg-surface-low border border-white/10 hover:border-white/20 text-white font-bold rounded-xl flex items-center gap-3 transition-all hover:scale-[1.02]"
                >
                  <Sparkles className="w-5 h-5 text-accent-purple" />
                  <span>About My Work</span>
                </Link>
              )}
            </div>
          </div>
          
          <div className="lg:w-2/5 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-purple/25 rounded-full blur-[140px] -z-10 animate-pulse" style={{ animationDuration: '4s' }}></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-accent-blue/20 rounded-full blur-[110px] -z-10 animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }}></div>
            <HeroScene />
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="px-8 pb-24" id="projects">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tight">Featured Projects</h2>
              <p className="text-slate-500 mt-2">Selected engineering & AI showcases</p>
            </div>
            <Link href="/projects" className="text-accent-purple font-bold hover:underline hidden sm:flex items-center gap-2 text-sm">
              <span>View all projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {!featuredProjects || featuredProjects.length === 0 ? (
            <EmptyState message="No featured projects found." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {featuredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          )}
          
          <div className="mt-8 text-center sm:hidden">
            <Link href="/projects" className="text-accent-purple font-bold hover:underline">
              View all projects &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts Section */}
      {latestArticles && latestArticles.length > 0 && (
        <section className="px-8 pb-24" id="blog">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tight">Latest Insights</h2>
                <p className="text-slate-500 mt-2">Articles on AI, architecture, and web development</p>
              </div>
              <Link href="/blog" className="text-accent-purple font-bold hover:underline hidden sm:flex items-center gap-2 text-sm">
                <span>View all articles</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {latestArticles.map((article: Article) => (
                <div key={article.id} className="glass-card rounded-2xl overflow-hidden flex flex-col group">
                  {article.cover_image_url && (
                    <div className="aspect-video w-full overflow-hidden bg-surface-lowest relative">
                      <Image 
                        src={article.cover_image_url} 
                        alt={article.title} 
                        fill
                        className="object-cover transform group-hover:scale-105 transition-transform duration-500" 
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-accent-purple transition-colors">{article.title}</h3>
                    <p className="text-sm text-slate-400 mb-4 flex-1 line-clamp-2 leading-relaxed">{article.summary}</p>
                    <div className="flex items-center justify-between text-xs mt-auto pt-4 border-t border-white/5">
                      <span className="text-accent-purple font-bold">{article.read_time || 5} min read</span>
                      <Link href={`/blog/${article.slug}`} className="text-white font-bold hover:text-accent-purple transition-colors flex items-center gap-1">
                        <span>Read</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About Snippet */}
      <section className="px-8 pb-24">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-3xl p-10 lg:p-12 text-center border-accent-purple/20">
            <h2 className="text-3xl lg:text-4xl font-black text-white mb-6 tracking-tight">About Me</h2>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed font-medium">
              {profile?.bio || 'Building intelligent digital experiences that combine beautiful design with elegant engineering.'}
            </p>
            <Link href="/about" className="btn-glow px-8 py-4 bg-surface-low border border-white/10 hover:border-accent-purple/40 text-white font-bold rounded-xl transition-all inline-flex items-center gap-3">
              <span>Read Full Profile</span>
              <ArrowRight className="w-4 h-4 text-accent-purple" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
