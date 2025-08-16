import { useEffect } from "react";
import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import SEOHead from "@/components/seo/SEOHead";
import CommentsSection from "@/components/blog/comments-section";
import { BlogPost } from "@shared/schema";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading, error } = useQuery<BlogPost>({
    queryKey: ['/api/blog/post', slug],
    queryFn: async () => {
      const response = await fetch(`/api/blog/post/${slug}`);
      if (!response.ok) {
        throw new Error('Post not found');
      }
      return response.json();
    }
  });

  const { data: relatedPosts } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog/posts', post?.category],
    queryFn: async () => {
      if (!post?.category) return [];
      const response = await fetch(`/api/blog/posts?category=${post.category}`);
      const posts = await response.json();
      return posts.filter((p: BlogPost) => p.id !== post?.id).slice(0, 3);
    },
    enabled: !!post
  });

  useEffect(() => {}, []);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatContent = (content: string) => {
    // Convert markdown-like formatting to HTML
    return content
      .replace(/^# (.*$)/gm, '<h1 class="text-4xl font-bold mb-6 text-glow">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-3xl font-bold mb-4 text-white mt-8">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-2xl font-bold mb-3 text-white mt-6">$1</h3>')
      .replace(/^\*\*(.*)\*\*/gm, '<strong class="text-electric font-semibold">$1</strong>')
      .replace(/^\*(.*)\*/gm, '<em class="text-gray-300 italic">$1</em>')
      .replace(/^- (.*$)/gm, '<li class="text-gray-300 ml-4 mb-2">• $1</li>')
      .replace(/^\d+\. (.*$)/gm, '<li class="text-gray-300 ml-4 mb-2 list-decimal">$1</li>')
      .replace(/\n\n/g, '</p><p class="text-gray-300 leading-relaxed mb-4">')
      .replace(/\n/g, '<br>');
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
  };

  if (error) {
    return (
      <div className="relative pt-20 min-h-screen flex items-center justify-center">
        <SEOHead
          title="Article Not Found - ClipSync Pro Blog"
          description="The requested blog article could not be found. Explore other productivity tips and clipboard management tutorials on ClipSync Pro Blog."
          keywords="blog, articles, clipboard manager, productivity tips"
        />
        <div className="glass-morphism rounded-3xl p-12 max-w-md mx-auto text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-exclamation-triangle text-white text-xl"></i>
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">Article Not Found</h1>
          <p className="text-gray-400 mb-6">
            The article you're looking for doesn't exist or has been moved.
          </p>
          <Link href="/blog">
            <Button className="bg-gradient-to-r from-electric to-cyber hover:scale-105 transition-transform">
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading || !post) {
    return (
      <div className="relative pt-20 min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <Skeleton className="h-12 w-3/4 bg-gray-700 mb-4" />
          <Skeleton className="h-6 w-1/2 bg-gray-700 mb-8" />
          <Skeleton className="h-32 w-full bg-gray-700 mb-6" />
          <Skeleton className="h-6 w-full bg-gray-700 mb-2" />
          <Skeleton className="h-6 w-full bg-gray-700 mb-2" />
          <Skeleton className="h-6 w-3/4 bg-gray-700" />
        </div>
      </div>
    );
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.metaDescription,
    "image": post.ogImage ? `${window.location.origin}${post.ogImage}` : `${window.location.origin}/og-image.png`,
    "url": `${window.location.origin}/blog/${post.slug}`,
    "datePublished": post.publishedAt,
    "dateModified": post.updatedAt,
    "author": {
      "@type": "Organization",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "ClipSync Pro",
      "logo": {
        "@type": "ImageObject",
        "url": `${window.location.origin}/logo.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${window.location.origin}/blog/${post.slug}`
    },
    "keywords": post.keywords,
    "articleSection": post.category,
    "wordCount": post.content.split(' ').length
  };

  return (
    <div className="relative pt-20 min-h-screen">
      <SEOHead
        title={`${post.title} - ClipSync Pro Blog`}
        description={post.metaDescription}
        keywords={post.keywords}
        ogType="article"
        ogImage={post.ogImage || undefined}
        articleAuthor={post.author}
        articlePublishedTime={typeof post.publishedAt === 'string' ? post.publishedAt : post.publishedAt?.toISOString()}
        structuredData={structuredData}
      />

      {/* Breadcrumb */}
      <section className="py-6 bg-midnight border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-6">
          <nav className="flex text-sm text-gray-400">
            <Link href="/" className="hover:text-electric transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-electric transition-colors">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{post.title}</span>
          </nav>
        </div>
      </section>

      {/* Article Header */}
      <section className="py-16 premium-gradient">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge variant="outline" className="border-electric text-electric">
              {post.category}
            </Badge>
            {post.featured && (
              <Badge variant="secondary" className="bg-electric text-black">
                Featured
              </Badge>
            )}
            {post.tags?.slice(0, 3).map(tag => (
              <Badge key={tag} variant="outline" className="border-gray-600 text-gray-300">
                {tag}
              </Badge>
            ))}
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-black mb-6 text-glow leading-tight">
            {post.title}
          </h1>
          
          <div className="flex items-center gap-4 text-gray-300">
            <span>By {post.author}</span>
            <span>•</span>
            <span>{formatDate(typeof post.publishedAt === 'string' ? post.publishedAt : post.publishedAt?.toISOString() || null)}</span>
            <span>•</span>
            <span>{Math.ceil(post.content.split(' ').length / 200)} min read</span>
          </div>
          
          <p className="text-xl text-gray-300 mt-6 leading-relaxed">
            {post.excerpt}
          </p>
        </div>
      </section>

      {/* Featured Image */}
      {post.ogImage && (
        <section className="py-8 bg-gradient-to-b from-navy to-midnight">
          <div className="max-w-4xl mx-auto px-6">
            <div className="glass-morphism rounded-3xl p-4 md:p-6 premium-glass-hover" onMouseMove={handleMouseMove}>
              <img 
                src={post.ogImage} 
                alt={post.title} 
                className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-2xl"
                data-testid="img-blog-featured"
              />
            </div>
          </div>
        </section>
      )}

      {/* Article Content */}
      <section className="py-16 bg-gradient-to-b from-navy to-midnight">
        <div className="max-w-4xl mx-auto px-6">
          <article className="glass-morphism rounded-3xl p-8 md:p-12 premium-glass-hover" onMouseMove={handleMouseMove}>
            <div 
              className="prose prose-lg max-w-none prose-invert"
              dangerouslySetInnerHTML={{ 
                __html: `<p class="text-gray-300 leading-relaxed mb-4">${formatContent(post.content)}</p>` 
              }}
            />
          </article>

          {/* Comments Section */}
          <CommentsSection blogPostId={post.id} />

          {/* Social Share */}
          <div className="mt-12 text-center">
            <div className="glass-morphism rounded-2xl p-6 inline-block">
              <h3 className="text-lg font-bold text-white mb-4">Share this article</h3>
              <div className="flex gap-3 justify-center">
                <Button
                  variant="ghost"
                  size="sm"
                  className="glass-morphism hover:bg-blue-600"
                  onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`, '_blank')}
                >
                  <i className="fab fa-twitter mr-2"></i>
                  Twitter
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="glass-morphism hover:bg-blue-800"
                  onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')}
                >
                  <i className="fab fa-linkedin mr-2"></i>
                  LinkedIn
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="glass-morphism hover:bg-green-600"
                  onClick={() => navigator.clipboard.writeText(window.location.href)}
                >
                  <i className="fas fa-link mr-2"></i>
                  Copy Link
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="py-16 bg-midnight border-t border-gray-800">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-glow mb-8 text-center">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Card
                  key={relatedPost.id}
                  className="glass-morphism premium-glass-hover cursor-pointer h-full transition-all duration-300 hover:scale-105"
                  onMouseMove={handleMouseMove}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline" className="border-gray-600 text-gray-300 text-xs">
                        {relatedPost.category}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 leading-tight hover:text-glow transition-colors">
                      <Link href={`/blog/${relatedPost.slug}`}>
                        {relatedPost.title}
                      </Link>
                    </h3>
                    <p className="text-gray-400 text-sm mb-3 leading-relaxed">
                      {relatedPost.excerpt.length > 100 
                        ? `${relatedPost.excerpt.substring(0, 100)}...`
                        : relatedPost.excerpt
                      }
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(typeof relatedPost.publishedAt === 'string' ? relatedPost.publishedAt : relatedPost.publishedAt?.toISOString() || null)} • By {relatedPost.author}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-midnight via-navy to-midnight relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-electric/10 to-cyber/10"></div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="glass-morphism rounded-3xl p-8 md:p-12 premium-glass-hover backdrop-blur-xl border border-electric/20" onMouseMove={handleMouseMove}>
            <div className="w-20 h-20 bg-gradient-to-br from-electric to-cyber rounded-full flex items-center justify-center mx-auto mb-8 glow-effect animate-pulse">
              <i className="fas fa-rocket text-white text-2xl"></i>
            </div>
            <h2 className="text-4xl font-bold text-glow mb-6 leading-tight">
              Ready to Transform Your Clipboard Management?
            </h2>
            <p className="text-gray-300 mb-10 text-xl leading-relaxed max-w-2xl mx-auto">
              Join thousands of professionals who've supercharged their productivity with ClipSync Pro.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/downloads">
                <Button className="bg-gradient-to-r from-electric to-cyber text-black font-bold hover:scale-110 transform transition-all duration-300 px-10 py-4 text-lg rounded-2xl shadow-2xl hover:shadow-electric/50">
                  <i className="fas fa-download mr-3"></i>
                  Download Free
                </Button>
              </Link>
              <Link href="/blog">
                <Button className="glass-morphism border-2 border-electric text-electric hover:bg-electric hover:text-black font-bold px-10 py-4 text-lg rounded-2xl transition-all duration-300 hover:scale-110 transform">
                  <i className="fas fa-book-open mr-3"></i>
                  Read More Articles
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <i className="fas fa-check-circle text-electric"></i>
                <span>Free Forever</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-shield-alt text-electric"></i>
                <span>Secure & Private</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-bolt text-electric"></i>
                <span>Lightning Fast</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}