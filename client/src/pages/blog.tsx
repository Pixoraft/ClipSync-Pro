import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import SEOHead from "@/components/seo/SEOHead";
import { BlogPost } from "@shared/schema";

export default function Blog() {
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog/posts', selectedCategory, searchQuery],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (selectedCategory !== "all") {
        params.append("category", selectedCategory);
      }
      if (searchQuery) {
        params.append("search", searchQuery);
      }
      const response = await fetch(`/api/blog/posts?${params}`);
      return response.json();
    }
  });

  const { data: categories } = useQuery<string[]>({
    queryKey: ['/api/blog/categories'],
    queryFn: async () => {
      const response = await fetch('/api/blog/categories');
      return response.json();
    }
  });

  const { data: featuredPosts } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog/featured'],
    queryFn: async () => {
      const response = await fetch('/api/blog/featured');
      return response.json();
    }
  });

  useEffect(() => {}, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "ClipSync Pro Blog",
    "description": "Latest insights, tutorials, and updates about clipboard management, productivity tools, and workflow optimization. Learn how to maximize your efficiency with professional tips.",
    "url": `${window.location.origin}/blog`,
    "publisher": {
      "@type": "Organization",
      "name": "ClipSync Pro",
      "logo": {
        "@type": "ImageObject",
        "url": `${window.location.origin}/logo.png`
      }
    },
    "blogPost": featuredPosts?.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "url": `${window.location.origin}/blog/${post.slug}`,
      "datePublished": post.publishedAt,
      "dateModified": post.updatedAt,
      "author": {
        "@type": "Organization",
        "name": post.author
      }
    }))
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
  };

  return (
    <div className="relative pt-20 min-h-screen">
      <SEOHead
        title="ClipSync Pro Blog - Productivity Tips, Tutorials & Clipboard Management Insights"
        description="Discover the latest productivity tips, clipboard management tutorials, and workflow optimization strategies. Learn from experts and maximize your efficiency with ClipSync Pro."
        keywords="clipboard manager blog, productivity tips, workflow optimization, tutorials, clipboard management, efficiency tips, power user guides, digital productivity"
        structuredData={structuredData}
      />

      {/* Hero Section */}
      <section className="py-20 premium-gradient">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl lg:text-6xl font-black mb-6 text-glow animate-fade-in">
            ClipSync Pro Blog
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed animate-slide-up delay-200 max-w-3xl mx-auto">
            Master clipboard management with expert insights, productivity tutorials, and the latest 
            workflow optimization strategies from the ClipSync Pro team.
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-gradient-to-b from-midnight to-navy">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="flex-1 max-w-md">
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="glass-morphism border-gray-600 text-white placeholder-gray-400"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === "all" ? "default" : "ghost"}
                onClick={() => setSelectedCategory("all")}
                className="glass-morphism"
              >
                All
              </Button>
              {categories?.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "ghost"}
                  onClick={() => setSelectedCategory(category)}
                  className="glass-morphism"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts Section */}
      {featuredPosts && featuredPosts.length > 0 && (
        <section className="py-16 bg-navy">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-glow mb-8">Featured Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPosts.slice(0, 3).map((post) => (
                <Card
                  key={post.id}
                  className="glass-morphism premium-glass-hover cursor-pointer h-full"
                  onMouseMove={handleMouseMove}
                >
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="bg-electric text-black">
                        Featured
                      </Badge>
                      <Badge variant="outline" className="border-gray-600 text-gray-300">
                        {post.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl leading-tight text-white hover:text-glow transition-colors">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="text-gray-300 text-sm">
                      {formatDate(typeof post.publishedAt === 'string' ? post.publishedAt : post.publishedAt?.toISOString() || null)} • By {post.author} • {parseInt(post.viewCount || '0').toLocaleString()} views
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {post.tags?.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs border-gray-700 text-gray-400">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts Section */}
      <section className="py-16 bg-gradient-to-b from-navy to-midnight">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-glow mb-8">
            {searchQuery ? `Search Results for "${searchQuery}"` : 
             selectedCategory !== "all" ? `${selectedCategory} Articles` : "All Articles"}
          </h2>
          
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="glass-morphism">
                  <CardHeader>
                    <Skeleton className="h-4 w-full bg-gray-700" />
                    <Skeleton className="h-6 w-3/4 bg-gray-700" />
                    <Skeleton className="h-3 w-1/2 bg-gray-700" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-20 w-full bg-gray-700" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : posts && posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Card
                  key={post.id}
                  className="glass-morphism premium-glass-hover cursor-pointer h-full transition-all duration-300 hover:scale-105"
                  onMouseMove={handleMouseMove}
                >
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="border-gray-600 text-gray-300">
                        {post.category}
                      </Badge>
                      {post.featured && (
                        <Badge variant="secondary" className="bg-electric text-black text-xs">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg leading-tight text-white hover:text-glow transition-colors">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="text-gray-300 text-sm">
                      {formatDate(typeof post.publishedAt === 'string' ? post.publishedAt : post.publishedAt?.toISOString() || null)} • By {post.author} • {parseInt(post.viewCount || '0').toLocaleString()} views
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {post.tags?.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs border-gray-700 text-gray-400">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-4">
                      <Link href={`/blog/${post.slug}`}>
                        <Button variant="ghost" className="text-electric hover:text-cyber p-0">
                          Read More →
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="glass-morphism rounded-3xl p-12 max-w-md mx-auto">
                <div className="w-16 h-16 bg-gradient-to-br from-electric to-cyber rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-search text-white text-xl"></i>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">No Articles Found</h3>
                <p className="text-gray-400 mb-6">
                  {searchQuery 
                    ? `No articles found matching "${searchQuery}". Try different keywords.`
                    : `No articles found in the ${selectedCategory} category.`
                  }
                </p>
                <Button 
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                  className="bg-gradient-to-r from-electric to-cyber hover:scale-105 transition-transform"
                >
                  View All Articles
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-midnight border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="glass-morphism rounded-3xl p-8 md:p-12 premium-glass-hover" onMouseMove={handleMouseMove}>
            <div className="w-16 h-16 bg-gradient-to-br from-electric to-cyber rounded-full flex items-center justify-center mx-auto mb-6 glow-effect">
              <i className="fas fa-envelope text-white text-xl"></i>
            </div>
            <h2 className="text-3xl font-bold text-glow mb-4">Stay Updated</h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Get the latest productivity tips, clipboard management tutorials, and ClipSync Pro updates 
              delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="glass-morphism border-gray-600 text-white placeholder-gray-400 flex-1"
              />
              <Button className="bg-gradient-to-r from-electric to-cyber hover:scale-105 transition-transform">
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              No spam, unsubscribe anytime. Privacy policy applies.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}