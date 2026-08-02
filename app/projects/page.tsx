import { createClient } from '@/utils/supabase/server';
import ProjectsGallery from '@/components/projects/ProjectsGallery';
import type { Project } from '@/types/database';

export const revalidate = 0;

export default async function ProjectsPage() {
  const supabase = await createClient();
  const { data: projects } = await supabase.from('projects').select('*').order('sort_order');

  return (
    <div className="px-8 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-black text-white mb-4">All Projects</h1>
          <p className="text-slate-500">Everything I've built</p>
        </div>

        <ProjectsGallery initialProjects={(projects || []) as Project[]} />
      </div>
    </div>
  );
}
