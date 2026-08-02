import { cache } from 'react';
import { createClient } from '@/utils/supabase/server';
import type { Article, Project } from '@/types/database';

export const getArticleBySlug = cache(async (slug: string): Promise<Article | null> => {
  const supabase = await createClient();
  const { data: article } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();
  return article as Article | null;
});

export const getProjectById = cache(async (id: string): Promise<Project | null> => {
  const supabase = await createClient();
  const { data: project } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();
  return project as Project | null;
});
