import { useEffect, useState, useRef } from "react";
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      setIsAuthenticated(true);
      toast({
        title: "Success",
        description: "Welcome to the admin panel!"
      });
    } else {
      toast({
        title: "Error",
        description: "Invalid password. Please try again.",
        variant: "destructive"
      });
    }
  };

  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog/posts', 'all'],
    queryFn: async () => {
      const response = await fetch('/api/blog/posts');
      return response.json();
    },
    enabled: isAuthenticated
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

  const createMutation = useMutation({
    mutationFn: (data: InsertBlogPost) => apiRequest('POST', '/api/blog/posts', data),
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

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest('DELETE', `/api/blog/posts/${id}`),
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

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string, data: Partial<InsertBlogPost> }) => 
      apiRequest('PUT', `/api/blog/posts/${id}`, data),
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

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleImageUpload = async (file: File) => {
    if (!file) return;
    
    setUploadingImage(true);
    try {
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
      
      toast({
        title: "Image Ready",
        description: "Image preview generated. You can use this for the OG image URL."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process image",
        variant: "destructive"
      });
    } finally {
      setUploadingImage(false);
    }
  };

  const onCreateSubmit = (data: InsertBlogPost) => {
    if (!data.slug) {
      data.slug = generateSlug(data.title);
    }
    if (previewImage) {
      data.ogImage = previewImage;
    }
    createMutation.mutate(data);
  };

  const handleDelete = (post: BlogPost) => {
    if (confirm(`Are you sure you want to delete "${post.title}"?`)) {
      deleteMutation.mutate(post.id);
    }
  };

  const onEditSubmit = (data: InsertBlogPost) => {
    if (editingPost) {
      updateMutation.mutate({ id: editingPost.id, data });
    }
  };

  // Populate edit form when editing post is set
  useEffect(() => {
    if (editingPost) {
      editForm.reset({
        title: editingPost.title,
        slug: editingPost.slug,
        excerpt: editingPost.excerpt || "",
        content: editingPost.content,
        metaDescription: editingPost.metaDescription || "",
        keywords: editingPost.keywords || "",
        author: editingPost.author,
        category: editingPost.category,
        tags: editingPost.tags || [],
        published: editingPost.published,
        featured: editingPost.featured
      });
    }
  }, [editingPost, editForm]);

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

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return (
      <>
        <SEOHead
          title="Admin Login | ClipSync Pro Blog"
          description="Admin access for ClipSync Pro blog management"
          keywords="admin, login, blog management"
        />
        
        <div className="min-h-screen bg-gradient-to-br from-midnight via-navy to-navy flex items-center justify-center px-6">
          <Card className="w-full max-w-md bg-gray-900 border-gray-700">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-white mb-2">
                Admin Access
              </CardTitle>
              <CardDescription className="text-gray-300">
                Enter your password to access the blog admin panel
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Input
                    type="password"
                    placeholder="Enter admin password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                    data-testid="input-admin-password"
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-electric to-cyber text-black font-bold hover:scale-105 transition-all duration-300"
                  data-testid="button-admin-login"
                >
                  Login
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-midnight via-navy to-midnight">
      <SEOHead
        title="Blog Admin - ClipSync Pro"
        description="Manage blog posts and content for ClipSync Pro blog."
        keywords="blog admin, content management, clipsync pro admin"
      />
      
      {/* Logout button */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={() => {
            setIsAuthenticated(false);
            setPassword("");
            toast({
              title: "Logged out",
              description: "You have been logged out successfully."
            });
          }}
          variant="outline"
          className="bg-gray-800 text-white border-gray-600 hover:bg-gray-700"
          data-testid="button-admin-logout"
        >
          Logout
        </Button>
      </div>

      <section className="py-20 bg-gradient-to-br from-midnight via-navy to-navy">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-5xl font-black mb-4 text-glow">
                Blog Admin
              </h1>
              <p className="text-xl text-gray-300">
                Create and manage blog posts easily
              </p>
            </div>
            
            <div className="flex gap-4">
              <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-electric to-cyber text-black font-bold hover:scale-105 transition-all duration-300 px-8 py-3 rounded-2xl shadow-2xl hover:shadow-electric/50">
                    <i className="fas fa-plus mr-2"></i>
                    New Post
                  </Button>
                </DialogTrigger>
                
                <DialogContent className="bg-gray-900 border-gray-700 max-w-4xl max-h-[90vh] overflow-y-auto text-white">
                  <DialogHeader>
                    <DialogTitle className="text-white text-2xl">Create New Blog Post</DialogTitle>
                    <DialogDescription className="text-gray-300">
                      Fill in the details to create a new SEO-optimized blog post.
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
                              <FormLabel className="text-white font-semibold">Title *</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Enter blog post title..."
                                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
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
                              <FormLabel className="text-white font-semibold">URL Slug *</FormLabel>
                              <FormControl>
                                <Input 
                                  {...field} 
                                  placeholder="url-slug-format"
                                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400" 
                                />
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
                            <FormLabel className="text-white font-semibold">Excerpt *</FormLabel>
                            <FormControl>
                              <Textarea 
                                {...field} 
                                placeholder="Short description for the blog post..."
                                className="bg-gray-800 border-gray-600 text-white placeholder-gray-400" 
                                rows={3}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <FormLabel className="text-white font-semibold">Featured Image (Optional)</FormLabel>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploadingImage}
                            className="bg-gray-800 border-electric text-electric hover:bg-electric/20"
                          >
                            <i className="fas fa-upload mr-2"></i>
                            {uploadingImage ? "Uploading..." : "Upload Image"}
                          </Button>
                        </div>
                        {previewImage && (
                          <div className="bg-gray-800 p-4 rounded-2xl border border-gray-600">
                            <img 
                              src={previewImage} 
                              alt="Preview" 
                              className="w-full h-48 object-cover rounded-xl"
                            />
                            <p className="text-gray-400 text-sm mt-2">Image preview - this will be used as the OG image</p>
                          </div>
                        )}
                      </div>

                      <FormField
                        control={createForm.control}
                        name="content"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white font-semibold">Content (Markdown) *</FormLabel>
                            <FormControl>
                              <Textarea 
                                {...field} 
                                placeholder="Write your blog content in markdown format..."
                                className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 font-mono" 
                                rows={12}
                              />
                            </FormControl>
                            <FormDescription className="text-gray-400">
                              Use markdown formatting (# for headers, ** for bold, etc.)
                            </FormDescription>
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
                              <FormLabel className="text-white font-semibold">Meta Description *</FormLabel>
                              <FormControl>
                                <Textarea 
                                  {...field} 
                                  placeholder="SEO description for search engines..."
                                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400" 
                                  rows={3}
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
                              <FormLabel className="text-white font-semibold">SEO Keywords *</FormLabel>
                              <FormControl>
                                <Textarea 
                                  {...field} 
                                  placeholder="keyword1, keyword2, keyword3..."
                                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400" 
                                  rows={3}
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
                              <FormLabel className="text-white font-semibold">Author</FormLabel>
                              <FormControl>
                                <Input 
                                  {...field} 
                                  className="bg-gray-800 border-gray-600 text-white" 
                                />
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
                              <FormLabel className="text-white font-semibold">Category</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
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
                              <FormLabel className="text-white font-semibold">Tags</FormLabel>
                              <FormControl>
                                <Input 
                                  value={Array.isArray(field.value) ? field.value.join(', ') : (field.value || '')}
                                  onChange={(e) => field.onChange(e.target.value.split(',').map(s => s.trim()))}
                                  placeholder="tag1, tag2, tag3"
                                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400" 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="flex items-center gap-8 p-4 bg-gray-800 rounded-2xl border border-gray-600">
                        <FormField
                          control={createForm.control}
                          name="published"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-3">
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel className="text-white font-semibold">Publish Now</FormLabel>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={createForm.control}
                          name="featured"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-3">
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel className="text-white font-semibold">Feature Post</FormLabel>
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="flex gap-4 pt-4">
                        <Button 
                          type="submit" 
                          disabled={createMutation.isPending}
                          className="bg-gradient-to-r from-electric to-cyber text-black font-bold hover:scale-105 transition-all duration-300 px-8 py-3 flex-1"
                        >
                          {createMutation.isPending ? (
                            <>
                              <i className="fas fa-spinner animate-spin mr-2"></i>
                              Creating...
                            </>
                          ) : (
                            <>
                              <i className="fas fa-save mr-2"></i>
                              Create Post
                            </>
                          )}
                        </Button>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          onClick={() => setIsCreateOpen(false)}
                          className="text-gray-300 hover:bg-gray-800 px-8 py-3"
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>

              {/* Edit Blog Post Dialog */}
              <Dialog open={!!editingPost} onOpenChange={() => setEditingPost(null)}>
                <DialogContent className="bg-gray-900 border-gray-700 max-w-4xl max-h-[90vh] overflow-y-auto text-white">
                  <DialogHeader>
                    <DialogTitle className="text-white text-2xl">Edit Blog Post</DialogTitle>
                    <DialogDescription className="text-gray-300">
                      Update the blog post details.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <Form {...editForm}>
                    <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={editForm.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white font-semibold">Title *</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Enter blog post title..."
                                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                                  onChange={(e) => {
                                    field.onChange(e);
                                    if (!editForm.getValues('slug')) {
                                      editForm.setValue('slug', generateSlug(e.target.value));
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormMessage className="text-red-400" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={editForm.control}
                          name="slug"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white font-semibold">Slug *</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="url-friendly-slug"
                                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                                />
                              </FormControl>
                              <FormMessage className="text-red-400" />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={editForm.control}
                        name="excerpt"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white font-semibold">Excerpt</FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                placeholder="Brief description of the blog post..."
                                className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 min-h-[80px]"
                              />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={editForm.control}
                        name="content"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white font-semibold">Content *</FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                placeholder="Write your blog post content here..."
                                className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 min-h-[200px]"
                              />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />

                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={editForm.control}
                          name="category"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white font-semibold">Category</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                                    <SelectValue placeholder="Select a category" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-gray-800 border-gray-600">
                                  {categories.map(category => (
                                    <SelectItem key={category} value={category} className="text-white hover:bg-gray-700">
                                      {category}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage className="text-red-400" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={editForm.control}
                          name="author"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white font-semibold">Author</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                                />
                              </FormControl>
                              <FormMessage className="text-red-400" />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="flex items-center justify-between gap-4 p-4 bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-6">
                          <FormField
                            control={editForm.control}
                            name="published"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-3">
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="data-[state=checked]:bg-green-600"
                                  />
                                </FormControl>
                                <FormLabel className="text-white font-medium cursor-pointer">
                                  Published
                                </FormLabel>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={editForm.control}
                            name="featured"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-3">
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="data-[state=checked]:bg-yellow-600"
                                  />
                                </FormControl>
                                <FormLabel className="text-white font-medium cursor-pointer">
                                  Featured
                                </FormLabel>
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="flex gap-3">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setEditingPost(null)}
                            className="border-gray-600 text-gray-300 hover:bg-gray-700"
                          >
                            Cancel
                          </Button>
                          <Button 
                            type="submit" 
                            disabled={updateMutation.isPending}
                            className="bg-gradient-to-r from-electric to-cyber text-black font-bold hover:scale-105 transition-all duration-300"
                          >
                            {updateMutation.isPending ? "Updating..." : "Update Post"}
                          </Button>
                        </div>
                      </div>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
              
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-navy to-midnight min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-glow mb-8">Manage Posts</h2>
          
          {isLoading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-electric mx-auto mb-4"></div>
              <p className="text-gray-300">Loading posts...</p>
            </div>
          ) : posts && posts.length > 0 ? (
            <div className="grid gap-6">
              {posts.map((post) => (
                <Card key={post.id} className="glass-morphism hover:scale-[1.02] transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <Badge variant={post.published ? "default" : "secondary"} className="bg-gradient-to-r from-electric to-cyber text-black font-bold">
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
                        <CardTitle className="text-white text-xl mb-2 leading-tight hover:text-glow transition-colors">
                          {post.title}
                        </CardTitle>
                        <CardDescription className="text-gray-400 mb-3">
                          By {post.author} • {formatDate(typeof post.publishedAt === 'string' ? post.publishedAt : post.publishedAt?.toISOString() || null)} • Updated {formatDate(typeof post.updatedAt === 'string' ? post.updatedAt : post.updatedAt?.toISOString() || null)}
                        </CardDescription>
                      </div>
                      <div className="flex gap-3 ml-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingPost(post)}
                          className="text-blue-400 hover:bg-blue-400/20 px-4 py-2"
                          data-testid={`button-edit-${post.id}`}
                        >
                          <i className="fas fa-edit mr-2"></i>
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(post)}
                          className="text-red-400 hover:bg-red-400/20 px-4 py-2"
                          data-testid={`button-delete-${post.id}`}
                        >
                          <i className="fas fa-trash mr-2"></i>
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge 
                        variant={post.published ? "default" : "secondary"} 
                        className={post.published ? "bg-green-600 text-white" : "bg-gray-600 text-gray-200"}
                      >
                        {post.published ? "Published" : "Draft"}
                      </Badge>
                      {post.featured && (
                        <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-300 mb-4 leading-relaxed">{post.excerpt}</p>
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs border-gray-700 text-gray-400">
                            #{tag}
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
                <h3 className="text-2xl font-bold text-white mb-4">No Posts Yet</h3>
                <p className="text-gray-400 mb-6">
                  Create your first blog post to get started with content creation.
                </p>
                <Button 
                  onClick={() => setIsCreateOpen(true)}
                  className="bg-gradient-to-r from-electric to-cyber text-black font-bold hover:scale-105 transition-all duration-300 px-8 py-3 rounded-2xl"
                >
                  <i className="fas fa-plus mr-2"></i>
                  Create First Post
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Quick Start Guide */}
      <section className="py-16 bg-midnight border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-glow mb-8">Creating SEO-Optimized Content</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-morphism p-6 rounded-2xl">
              <div className="w-12 h-12 bg-gradient-to-br from-electric to-cyber rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-lightbulb text-white"></i>
              </div>
              <h3 className="text-lg font-bold text-white mb-3">1. Choose a Great Title</h3>
              <p className="text-gray-400 text-sm">
                Include your target keywords naturally in the title for better SEO rankings.
              </p>
            </div>
            <div className="glass-morphism p-6 rounded-2xl">
              <div className="w-12 h-12 bg-gradient-to-br from-electric to-cyber rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-search text-white"></i>
              </div>
              <h3 className="text-lg font-bold text-white mb-3">2. Optimize Meta Data</h3>
              <p className="text-gray-400 text-sm">
                Write compelling meta descriptions and use relevant keywords for search engines.
              </p>
            </div>
            <div className="glass-morphism p-6 rounded-2xl">
              <div className="w-12 h-12 bg-gradient-to-br from-electric to-cyber rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-rocket text-white"></i>
              </div>
              <h3 className="text-lg font-bold text-white mb-3">3. Publish & Share</h3>
              <p className="text-gray-400 text-sm">
                Feature important posts and share them across social media platforms.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}