import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import { getSiteUrl } from '@/lib/siteUrl';

export async function GET() {
  const baseUrl = getSiteUrl();
  const supabase = await createClient();

  const [projectsRes, articlesRes] = await Promise.all([
    supabase.from('projects').select('id, updated_at'),
    supabase.from('articles').select('slug, published_at').eq('is_published', true),
  ]);

  const projects = projectsRes.data || [];
  const articles = articlesRes.data || [];

  const staticUrls = ['', '/about', '/projects', '/blog', '/contact'];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  staticUrls.forEach((urlPath) => {
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}${urlPath}</loc>\n`;
    xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>${urlPath === '' ? '1.0' : '0.8'}</priority>\n`;
    xml += `  </url>\n`;
  });

  projects.forEach((p) => {
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}/projects/${p.id}</loc>\n`;
    xml += `    <lastmod>${p.updated_at ? new Date(p.updated_at).toISOString() : new Date().toISOString()}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.7</priority>\n`;
    xml += `  </url>\n`;
  });

  articles.forEach((a) => {
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}/blog/${a.slug}</loc>\n`;
    xml += `    <lastmod>${a.published_at ? new Date(a.published_at).toISOString() : new Date().toISOString()}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.7</priority>\n`;
    xml += `  </url>\n`;
  });

  xml += `</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
