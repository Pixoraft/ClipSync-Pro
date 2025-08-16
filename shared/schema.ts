import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const blogPosts = pgTable("blog_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  metaDescription: text("meta_description").notNull(),
  keywords: text("keywords").notNull(),
  ogImage: text("og_image"),
  author: text("author").notNull().default("ClipSync Pro Team"),
  category: text("category").notNull(),
  tags: text("tags").array(),
  published: boolean("published").notNull().default(false),
  featured: boolean("featured").notNull().default(false),
  publishedAt: timestamp("published_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const blogComments = pgTable("blog_comments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  blogPostId: varchar("blog_post_id").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  comment: text("comment").notNull(),
  rating: varchar("rating").notNull().default("5"),
  approved: boolean("approved").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).pick({
  title: true,
  slug: true,
  excerpt: true,
  content: true,
  metaDescription: true,
  keywords: true,
  ogImage: true,
  author: true,
  category: true,
  tags: true,
  published: true,
  featured: true,
});

export const updateBlogPostSchema = insertBlogPostSchema.extend({
  updatedAt: z.date().optional(),
});

export const insertBlogCommentSchema = createInsertSchema(blogComments).pick({
  blogPostId: true,
  name: true,
  email: true,
  comment: true,
  rating: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type UpdateBlogPost = z.infer<typeof updateBlogPostSchema>;
export type BlogComment = typeof blogComments.$inferSelect;
export type InsertBlogComment = z.infer<typeof insertBlogCommentSchema>;
