import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { insertBlogPostSchema, updateBlogPostSchema, BlogPost, InsertBlogPost } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import SEOHead from "@/components/seo/SEOHead";

export default function BlogAdmin() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog/posts', 'all'],
    queryFn: async () => {
      const response = await fetch('/api/blog/posts?published=false');
      return response.json();
    }
  });

  const createForm = useForm<InsertBlogPost>({
    resolver: zodResolver(insertBlogPostSchema),
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      metaDescription: "",
      keywords: "",
      author: "ClipSync Pro Team",
      category: "Productivity",
      tags: [],
      published: false,
      featured: false
    }
  });

  const editForm = useForm<InsertBlogPost>({
    resolver: zodResolver(updateBlogPostSchema),
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      metaDescription: "",
      keywords: "",
      author: "ClipSync Pro Team",
      category: "Productivity",
      tags: [],
      published: false,
      featured: false
    }
  });

  const createMutation = useMutation({
    mutationFn: (data: InsertBlogPost) => apiRequest('/api/blog/posts', 'POST', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/blog/posts'] });
      setIsCreateOpen(false);
      createForm.reset();
      toast({
        title: "Success",
        description: "Blog post created successfully!"
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create blog post",
        variant: "destructive"
      });
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string, data: InsertBlogPost }) => 
      apiRequest(`/api/blog/posts/${id}`, 'PUT', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/blog/posts'] });
      setEditingPost(null);
      editForm.reset();
      toast({
        title: "Success",
        description: "Blog post updated successfully!"
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update blog post",
        variant: "destructive"
      });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest(`/api/blog/posts/${id}`, 'DELETE'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/blog/posts'] });
      toast({
        title: "Success",
        description: "Blog post deleted successfully!"
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete blog post",
        variant: "destructive"
      });
    }
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  };

  const onCreateSubmit = (data: InsertBlogPost) => {
    if (!data.slug) {
      data.slug = generateSlug(data.title);
    }
    createMutation.mutate(data);
  };

  const onEditSubmit = (data: InsertBlogPost) => {
    if (!editingPost) return;
    if (!data.slug) {
      data.slug = generateSlug(data.title);
    }
    updateMutation.mutate({ id: editingPost.id, data });
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    editForm.reset({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      metaDescription: post.metaDescription,
      keywords: post.keywords,
      author: post.author,
      category: post.category,
      tags: post.tags || [],
      published: post.published,
      featured: post.featured
    });
  };

  const handleDelete = (post: BlogPost) => {
    if (confirm(`Are you sure you want to delete "${post.title}"?`)) {
      deleteMutation.mutate(post.id);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not published";
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const categories = ["Productivity", "Security", "Reviews", "Tutorials", "Updates", "Tips"];

  useEffect(() => {}, []);

  return (
    <div className="relative pt-20 min-h-screen">
      <SEOHead
        title="Blog Admin - ClipSync Pro"
        description="Manage blog posts and content for ClipSync Pro blog."
        keywords="blog admin, content management, clipsync pro admin"
      />

      <section className="py-20 premium-gradient">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-5xl font-black mb-4 text-glow">
                Blog Admin
              </h1>
              <p className="text-xl text-gray-300">
                Manage and publish blog posts
              </p>
            </div>
            
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-electric to-cyber hover:scale-105 transition-transform">
                  <i className="fas fa-plus mr-2"></i>
                  New Post
                </Button>
              </DialogTrigger>
              <DialogContent className="glass-morphism border-gray-700 max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-white">Create New Blog Post</DialogTitle>
                  <DialogDescription className="text-gray-300">
                    Fill in the details to create a new blog post.
                  </DialogDescription>
                </DialogHeader>
                
                <Form {...createForm}>
                  <form onSubmit={createForm.handleSubmit(onCreateSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={createForm.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Title</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                className="glass-morphism border-gray-600 text-white"
                                onChange={(e) => {
                                  field.onChange(e);
                                  if (!createForm.getValues('slug')) {
                                    createForm.setValue('slug', generateSlug(e.target.value));
                                  }
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={createForm.control}
                        name="slug"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Slug (URL)</FormLabel>
                            <FormControl>
                              <Input {...field} className="glass-morphism border-gray-600 text-white" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={createForm.control}
                      name="excerpt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Excerpt</FormLabel>
                          <FormControl>
                            <Textarea 
                              {...field} 
                              className="glass-morphism border-gray-600 text-white" 
                              rows={3}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={createForm.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Content (Markdown)</FormLabel>
                          <FormControl>
                            <Textarea 
                              {...field} 
                              className="glass-morphism border-gray-600 text-white font-mono" 
                              rows={12}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={createForm.control}
                        name="metaDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Meta Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                {...field} 
                                className="glass-morphism border-gray-600 text-white" 
                                rows={2}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={createForm.control}
                        name="keywords"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Keywords (comma-separated)</FormLabel>
                            <FormControl>
                              <Textarea 
                                {...field} 
                                className="glass-morphism border-gray-600 text-white" 
                                rows={2}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <FormField
                        control={createForm.control}
                        name="author"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Author</FormLabel>
                            <FormControl>
                              <Input {...field} className="glass-morphism border-gray-600 text-white" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={createForm.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Category</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="glass-morphism border-gray-600 text-white">
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {categories.map(cat => (
                                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={createForm.control}
                        name="tags"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Tags (comma-separated)</FormLabel>
                            <FormControl>
                              <Input 
                                value={Array.isArray(field.value) ? field.value.join(', ') : field.value}
                                onChange={(e) => field.onChange(e.target.value.split(',').map(s => s.trim()))}
                                className="glass-morphism border-gray-600 text-white" 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex items-center gap-6">
                      <FormField
                        control={createForm.control}
                        name="published"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="text-white">Published</FormLabel>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={createForm.control}
                        name="featured"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="text-white">Featured</FormLabel>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex gap-4">
                      <Button 
                        type="submit" 
                        disabled={createMutation.isPending}
                        className="bg-gradient-to-r from-electric to-cyber hover:scale-105 transition-transform"
                      >
                        {createMutation.isPending ? "Creating..." : "Create Post"}
                      </Button>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        onClick={() => setIsCreateOpen(false)}
                        className="text-gray-300"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-navy to-midnight">
        <div className="max-w-7xl mx-auto px-6">
          {isLoading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-electric mx-auto"></div>
              <p className="text-gray-300 mt-4">Loading posts...</p>
            </div>
          ) : posts && posts.length > 0 ? (
            <div className="grid gap-6">
              {posts.map((post) => (
                <Card key={post.id} className="glass-morphism">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant={post.published ? "default" : "secondary"}>
                            {post.published ? "Published" : "Draft"}
                          </Badge>
                          {post.featured && (
                            <Badge variant="outline" className="border-electric text-electric">
                              Featured
                            </Badge>
                          )}
                          <Badge variant="outline" className="border-gray-600 text-gray-300">
                            {post.category}
                          </Badge>
                        </div>
                        <CardTitle className="text-white text-xl mb-1">{post.title}</CardTitle>
                        <CardDescription className="text-gray-400">
                          By {post.author} • {formatDate(post.publishedAt)} • Updated {formatDate(post.updatedAt)}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(post)}
                          className="text-electric hover:bg-electric/20"
                        >
                          <i className="fas fa-edit mr-1"></i>
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(post)}
                          className="text-red-400 hover:bg-red-400/20"
                        >
                          <i className="fas fa-trash mr-1"></i>
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-3">{post.excerpt}</p>
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs border-gray-700 text-gray-400">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="glass-morphism rounded-3xl p-12 max-w-md mx-auto">
                <div className="w-16 h-16 bg-gradient-to-br from-electric to-cyber rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-blog text-white text-xl"></i>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">No Posts Yet</h3>
                <p className="text-gray-400 mb-6">
                  Create your first blog post to get started.
                </p>
                <Button 
                  onClick={() => setIsCreateOpen(true)}
                  className="bg-gradient-to-r from-electric to-cyber hover:scale-105 transition-transform"
                >
                  Create First Post
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Edit Dialog */}
      <Dialog open={!!editingPost} onOpenChange={() => setEditingPost(null)}>
        <DialogContent className="glass-morphism border-gray-700 max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white">Edit Blog Post</DialogTitle>
            <DialogDescription className="text-gray-300">
              Update the blog post details.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-6">
              {/* Same form fields as create form but using editForm */}
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={editForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Title</FormLabel>
                      <FormControl>
                        <Input {...field} className="glass-morphism border-gray-600 text-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={editForm.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Slug (URL)</FormLabel>
                      <FormControl>
                        <Input {...field} className="glass-morphism border-gray-600 text-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-center gap-6">
                <FormField
                  control={editForm.control}
                  name="published"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-white">Published</FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={editForm.control}
                  name="featured"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-white">Featured</FormLabel>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-4">
                <Button 
                  type="submit" 
                  disabled={updateMutation.isPending}
                  className="bg-gradient-to-r from-electric to-cyber hover:scale-105 transition-transform"
                >
                  {updateMutation.isPending ? "Updating..." : "Update Post"}
                </Button>
                <Button 
                  type="button" 
                  variant="ghost" 
                  onClick={() => setEditingPost(null)}
                  className="text-gray-300"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}