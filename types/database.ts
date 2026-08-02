export interface Project {
  id: string;
  title: string;
  description: string;
  long_description: string | null;
  content: string | null;
  icon_emoji: string;
  icon_color: string;
  category: string;
  image_url: string | null;
  video_url: string | null;
  github_url: string | null;
  live_url: string | null;
  tech_stack: string[];
  gallery_urls: string[];
  is_featured: boolean;
  sort_order: number;
  created_at: string;
}

export interface ProjectFormData {
  title: string;
  description: string;
  long_description: string;
  content: string;
  icon_emoji: string;
  icon_color: string;
  category: string;
  image_url: string;
  video_url: string;
  github_url: string;
  live_url: string;
  tech_stack: string[];
  gallery_urls: string[];
  is_featured: boolean;
  sort_order: number;
}

export interface Article {
  id: string;
  title: string;
  summary: string | null;
  content: string | null;
  slug: string;
  cover_image_url: string | null;
  read_time: number;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
}

export interface ArticleFormData {
  title: string;
  slug: string;
  summary: string;
  content: string;
  cover_image_url: string;
  read_time: number;
  is_published: boolean;
}

export interface AboutSection {
  id: string;
  title: string;
  content: string | null;
  image_url: string | null;
  sort_order: number;
  created_at: string;
}

export interface AboutSectionFormData {
  title: string;
  content: string;
  image_url: string;
  sort_order: number;
}

export interface Profile {
  id: string;
  full_name: string;
  title: string;
  bio: string | null;
  headline: string | null;
  available_for_work: boolean;
  cv_url: string | null;
  github_url: string | null;
  linkedin_url: string | null;
  email: string | null;
}
