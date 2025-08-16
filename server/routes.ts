import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBlogPostSchema, updateBlogPostSchema, insertBlogCommentSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import multer from "multer";
import path from "path";
import fs from "fs/promises";

export async function registerRoutes(app: Express): Promise<Server> {
  // Ensure uploads directory exists
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  try {
    await fs.mkdir(uploadsDir, { recursive: true });
  } catch (error) {
    console.log('Uploads directory already exists or cannot be created');
  }

  // Configure multer for image uploads
  const storage_multer = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  });

  const upload = multer({ 
    storage: storage_multer,
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter: function (req, file, cb) {
      // Accept images only
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
        return cb(new Error('Only image files are allowed!'));
      }
      cb(null, true);
    }
  });

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
      
      // Increment view count
      await storage.incrementViewCount(post.id);
      
      // Get updated post with new view count
      const updatedPost = await storage.getBlogPost(post.id);
      
      res.json(updatedPost || post);
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
      const categories = Array.from(new Set(posts.map(post => post.category)));
      res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });

  // Image upload endpoint
  app.post("/api/upload/image", upload.single('image'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No image file uploaded" });
      }
      
      const imageUrl = `/uploads/${req.file.filename}`;
      res.json({ imageUrl });
    } catch (error) {
      console.error("Error uploading image:", error);
      res.status(500).json({ error: "Failed to upload image" });
    }
  });

  // Comment Routes
  
  // Get comments for a blog post
  app.get("/api/blog/posts/:id/comments", async (req, res) => {
    try {
      const { id } = req.params;
      const comments = await storage.getCommentsByBlogPost(id);
      res.json(comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
      res.status(500).json({ error: "Failed to fetch comments" });
    }
  });

  // Create new comment
  app.post("/api/blog/posts/:id/comments", async (req, res) => {
    try {
      const { id } = req.params;
      const validationResult = insertBlogCommentSchema.safeParse({
        ...req.body,
        blogPostId: id
      });
      
      if (!validationResult.success) {
        const readableError = fromZodError(validationResult.error);
        return res.status(400).json({ 
          error: "Validation failed", 
          details: readableError.message 
        });
      }

      const comment = await storage.createComment(validationResult.data);
      res.status(201).json({ 
        message: "Comment submitted successfully! It will be reviewed before being published.",
        comment: comment
      });
    } catch (error) {
      console.error("Error creating comment:", error);
      res.status(500).json({ error: "Failed to create comment" });
    }
  });

  // Admin: Approve comment
  app.put("/api/blog/comments/:id/approve", async (req, res) => {
    try {
      const { id } = req.params;
      const approved = await storage.approveComment(id);
      
      if (!approved) {
        return res.status(404).json({ error: "Comment not found" });
      }
      
      res.json({ message: "Comment approved successfully" });
    } catch (error) {
      console.error("Error approving comment:", error);
      res.status(500).json({ error: "Failed to approve comment" });
    }
  });

  // Admin: Get all comments
  app.get("/api/blog/admin/comments", async (req, res) => {
    try {
      const comments = await storage.getAllComments();
      res.json(comments);
    } catch (error) {
      console.error("Error fetching all comments:", error);
      res.status(500).json({ error: "Failed to fetch comments" });
    }
  });

  // Admin: Delete comment
  app.delete("/api/blog/comments/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteComment(id);
      
      if (!deleted) {
        return res.status(404).json({ error: "Comment not found" });
      }
      
      res.json({ message: "Comment deleted successfully" });
    } catch (error) {
      console.error("Error deleting comment:", error);
      res.status(500).json({ error: "Failed to delete comment" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
