import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBlogPostSchema, updateBlogPostSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Blog Routes
  
  // Get all blog posts (published only for public, all for admin)
  app.get("/api/blog/posts", async (req, res) => {
    try {
      const { published, category, search } = req.query;
      
      let posts;
      if (search) {
        posts = await storage.searchBlogPosts(search as string);
      } else if (category) {
        posts = await storage.getBlogPostsByCategory(category as string);
      } else {
        const publishedOnly = published === undefined ? true : published === 'true';
        posts = await storage.getAllBlogPosts(publishedOnly);
      }
      
      res.json(posts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  // Get featured blog posts
  app.get("/api/blog/featured", async (req, res) => {
    try {
      const posts = await storage.getFeaturedBlogPosts();
      res.json(posts);
    } catch (error) {
      console.error("Error fetching featured posts:", error);
      res.status(500).json({ error: "Failed to fetch featured posts" });
    }
  });

  // Get single blog post by slug
  app.get("/api/blog/post/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const post = await storage.getBlogPostBySlug(slug);
      
      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      
      if (!post.published) {
        return res.status(404).json({ error: "Blog post not published" });
      }
      
      res.json(post);
    } catch (error) {
      console.error("Error fetching blog post:", error);
      res.status(500).json({ error: "Failed to fetch blog post" });
    }
  });

  // Get blog post by ID (admin)
  app.get("/api/blog/admin/post/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const post = await storage.getBlogPost(id);
      
      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      
      res.json(post);
    } catch (error) {
      console.error("Error fetching blog post:", error);
      res.status(500).json({ error: "Failed to fetch blog post" });
    }
  });

  // Create new blog post (admin)
  app.post("/api/blog/posts", async (req, res) => {
    try {
      const validationResult = insertBlogPostSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        const readableError = fromZodError(validationResult.error);
        return res.status(400).json({ 
          error: "Validation failed", 
          details: readableError.message 
        });
      }

      const post = await storage.createBlogPost(validationResult.data);
      res.status(201).json(post);
    } catch (error) {
      console.error("Error creating blog post:", error);
      if ((error as Error).message.includes('slug')) {
        res.status(400).json({ error: "Blog post with this slug already exists" });
      } else {
        res.status(500).json({ error: "Failed to create blog post" });
      }
    }
  });

  // Update blog post (admin)
  app.put("/api/blog/posts/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validationResult = updateBlogPostSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        const readableError = fromZodError(validationResult.error);
        return res.status(400).json({ 
          error: "Validation failed", 
          details: readableError.message 
        });
      }

      const post = await storage.updateBlogPost(id, validationResult.data);
      
      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      
      res.json(post);
    } catch (error) {
      console.error("Error updating blog post:", error);
      res.status(500).json({ error: "Failed to update blog post" });
    }
  });

  // Delete blog post (admin)
  app.delete("/api/blog/posts/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteBlogPost(id);
      
      if (!deleted) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      
      res.json({ message: "Blog post deleted successfully" });
    } catch (error) {
      console.error("Error deleting blog post:", error);
      res.status(500).json({ error: "Failed to delete blog post" });
    }
  });

  // Get blog categories
  app.get("/api/blog/categories", async (req, res) => {
    try {
      const posts = await storage.getAllBlogPosts(true);
      const categories = [...new Set(posts.map(post => post.category))];
      res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
