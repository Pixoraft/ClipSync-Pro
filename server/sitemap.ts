import { Request, Response } from 'express';

// Static pages configuration
const staticPages = [
  {
    url: '/',
    lastmod: '2025-08-19',
    priority: '1.0',
    changefreq: 'weekly'
  },
  {
    url: '/about',
    lastmod: '2025-08-19',
    priority: '0.8',
    changefreq: 'monthly'
  },
  {
    url: '/pricing',
    lastmod: '2025-08-19',
    priority: '0.9',
    changefreq: 'weekly'
  },
  {
    url: '/downloads',
    lastmod: '2025-08-19',
    priority: '0.9',
    changefreq: 'weekly'
  },
  {
    url: '/contact',
    lastmod: '2025-08-19',
    priority: '0.7',
    changefreq: 'monthly'
  },
  {
    url: '/blog',
    lastmod: '2025-08-19',
    priority: '0.8',
    changefreq: 'daily'
  }
];

// Blog posts - These would typically come from your database
const blogPosts = [
  {
    slug: 'boost-productivity-clipboard-manager',
    lastmod: '2025-08-19',
    priority: '0.7',
    changefreq: 'weekly'
  },
  {
    slug: 'clipboard-history-windows-linux',
    lastmod: '2025-08-19',
    priority: '0.7',
    changefreq: 'weekly'
  },
  {
    slug: 'advanced-clipboard-features',
    lastmod: '2025-08-19',
    priority: '0.7',
    changefreq: 'weekly'
  },
  {
    slug: 'clipboard-security-best-practices',
    lastmod: '2025-08-19',
    priority: '0.7',
    changefreq: 'weekly'
  }
];

function generateSitemap(baseUrl: string): string {
  const allPages = [...staticPages];
  
  // Add blog posts to sitemap
  blogPosts.forEach(post => {
    allPages.push({
      url: `/blog/${post.slug}`,
      lastmod: post.lastmod,
      priority: post.priority,
      changefreq: post.changefreq
    });
  });

  const urls = allPages.map(page => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <priority>${page.priority}</priority>
    <changefreq>${page.changefreq}</changefreq>
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

function generateBlogSitemap(baseUrl: string): string {
  const urls = blogPosts.map(post => `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${post.lastmod}</lastmod>
    <priority>${post.priority}</priority>
    <changefreq>${post.changefreq}</changefreq>
    <news:news>
      <news:publication>
        <news:name>ClipSync Pro Blog</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${post.lastmod}</news:publication_date>
    </news:news>
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urls}
</urlset>`;
}

export function handleSitemap(req: Request, res: Response) {
  const protocol = req.secure ? 'https' : 'http';
  const baseUrl = `${protocol}://${req.get('host')}`;
  
  const sitemap = generateSitemap(baseUrl);
  
  res.set({
    'Content-Type': 'application/xml',
    'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
  });
  
  res.send(sitemap);
}

export function handleBlogSitemap(req: Request, res: Response) {
  const protocol = req.secure ? 'https' : 'http';
  const baseUrl = `${protocol}://${req.get('host')}`;
  
  const sitemap = generateBlogSitemap(baseUrl);
  
  res.set({
    'Content-Type': 'application/xml',
    'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
  });
  
  res.send(sitemap);
}

export function handleSitemapIndex(req: Request, res: Response) {
  const protocol = req.secure ? 'https' : 'http';
  const baseUrl = `${protocol}://${req.get('host')}`;
  
  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap.xml</loc>
    <lastmod>2025-08-19</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/blog-sitemap.xml</loc>
    <lastmod>2025-08-19</lastmod>
  </sitemap>
</sitemapindex>`;

  res.set({
    'Content-Type': 'application/xml',
    'Cache-Control': 'public, max-age=86400',
  });
  
  res.send(sitemapIndex);
}