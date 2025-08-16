import { type User, type InsertUser, type BlogPost, type InsertBlogPost, type UpdateBlogPost, type BlogComment, type InsertBlogComment } from "@shared/schema";
import { randomUUID } from "crypto";
import fs from "fs/promises";
import path from "path";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Blog methods
  getAllBlogPosts(published?: boolean): Promise<BlogPost[]>;
  getBlogPost(id: string): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: string, post: UpdateBlogPost): Promise<BlogPost | undefined>;
  deleteBlogPost(id: string): Promise<boolean>;
  getFeaturedBlogPosts(): Promise<BlogPost[]>;
  getBlogPostsByCategory(category: string): Promise<BlogPost[]>;
  searchBlogPosts(query: string): Promise<BlogPost[]>;
  incrementViewCount(postId: string): Promise<boolean>;
  
  // Comment methods
  getCommentsByBlogPost(blogPostId: string): Promise<BlogComment[]>;
  getAllComments(): Promise<BlogComment[]>;
  createComment(comment: InsertBlogComment): Promise<BlogComment>;
  approveComment(id: string): Promise<boolean>;
  deleteComment(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private blogPosts: Map<string, BlogPost>;
  private blogComments: Map<string, BlogComment>;
  private dataFile: string;

  constructor() {
    this.users = new Map();
    this.blogPosts = new Map();
    this.blogComments = new Map();
    this.dataFile = path.join(process.cwd(), 'data.json');
    this.loadData();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Blog Methods
  async getAllBlogPosts(published?: boolean): Promise<BlogPost[]> {
    const posts = Array.from(this.blogPosts.values());
    if (published !== undefined) {
      return posts.filter(post => post.published === published);
    }
    return posts.sort((a, b) => new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime());
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(post => post.slug === slug);
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const id = randomUUID();
    const now = new Date();
    const post: BlogPost = { 
      ...insertPost, 
      id,
      ogImage: insertPost.ogImage || null,
      author: insertPost.author || "ClipSync Pro Team",
      tags: insertPost.tags || [],
      published: insertPost.published || false,
      featured: insertPost.featured || false,
      viewCount: "0",
      publishedAt: insertPost.published ? now : null,
      createdAt: now,
      updatedAt: now
    };
    this.blogPosts.set(id, post);
    await this.saveData();
    return post;
  }

  async updateBlogPost(id: string, updatePost: UpdateBlogPost): Promise<BlogPost | undefined> {
    const existing = this.blogPosts.get(id);
    if (!existing) return undefined;

    const updated: BlogPost = {
      ...existing,
      ...updatePost,
      id,
      updatedAt: new Date(),
      publishedAt: updatePost.published && !existing.published ? new Date() : existing.publishedAt
    };
    
    this.blogPosts.set(id, updated);
    await this.saveData();
    return updated;
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    const result = this.blogPosts.delete(id);
    if (result) {
      await this.saveData();
    }
    return result;
  }

  async getFeaturedBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values())
      .filter(post => post.featured && post.published)
      .sort((a, b) => new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime());
  }

  async getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values())
      .filter(post => post.category === category && post.published)
      .sort((a, b) => new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime());
  }

  async searchBlogPosts(query: string): Promise<BlogPost[]> {
    const searchTerm = query.toLowerCase();
    return Array.from(this.blogPosts.values())
      .filter(post => 
        post.published && 
        (post.title.toLowerCase().includes(searchTerm) ||
         post.excerpt.toLowerCase().includes(searchTerm) ||
         post.content.toLowerCase().includes(searchTerm) ||
         post.tags?.some(tag => tag.toLowerCase().includes(searchTerm)) ||
         post.category.toLowerCase().includes(searchTerm))
      )
      .sort((a, b) => new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime());
  }

  private async loadData(): Promise<void> {
    try {
      const data = await fs.readFile(this.dataFile, 'utf-8');
      const parsed = JSON.parse(data);
      
      // Load users
      if (parsed.users) {
        this.users = new Map(parsed.users);
      }
      
      // Load blog posts
      if (parsed.blogPosts) {
        this.blogPosts = new Map(parsed.blogPosts.map((post: any) => [
          post.id,
          {
            ...post,
            createdAt: new Date(post.createdAt),
            updatedAt: new Date(post.updatedAt),
            publishedAt: post.publishedAt ? new Date(post.publishedAt) : null
          }
        ]));
      } else {
        this.seedBlogPosts();
        await this.saveData();
      }
      
      // Load comments
      if (parsed.blogComments) {
        this.blogComments = new Map(parsed.blogComments.map((comment: any) => [
          comment.id,
          {
            ...comment,
            createdAt: new Date(comment.createdAt)
          }
        ]));
      }
    } catch (error) {
      console.log('No existing data file, starting fresh');
      this.seedBlogPosts();
      await this.saveData();
    }
  }

  private async saveData(): Promise<void> {
    try {
      const data = {
        users: Array.from(this.users.entries()),
        blogPosts: Array.from(this.blogPosts.values()),
        blogComments: Array.from(this.blogComments.values())
      };
      await fs.writeFile(this.dataFile, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Failed to save data:', error);
    }
  }

  private seedBlogPosts(): void {
    const samplePosts = [
      {
        title: "10 Clipboard Manager Shortcuts That Will Transform Your Productivity",
        slug: "clipboard-manager-productivity-shortcuts",
        excerpt: "Discover essential keyboard shortcuts and power-user tips that will revolutionize how you work with clipboard managers. From instant search to batch operations, unlock your full potential.",
        content: "# Transform Your Workflow with These Essential Clipboard Manager Shortcuts\n\nWorking with a clipboard manager doesn't just mean copying and pasting more efficiently—it means completely transforming your digital workflow. After analyzing thousands of user interactions, we've identified the most impactful shortcuts and techniques that separate power users from casual users.\n\n## The Game-Changing Shortcuts Every User Must Know\n\n### 1. Lightning-Fast Search (Ctrl/Cmd + Space)\nInstead of scrolling through hundreds of clips, instantly find what you need with intelligent search. Type just a few characters and watch your clipboard history filter in real-time.\n\n**Pro Tip**: Use partial matches. Searching for \"pass\" will find \"password123\", \"bypass\", and \"passport\" entries.\n\n### 2. Category-Based Filtering (Ctrl/Cmd + 1-9)\nOrganize your clips into smart categories:\n- Ctrl+1: Recent (last 10 items)\n- Ctrl+2: URLs and links\n- Ctrl+3: Email addresses\n- Ctrl+4: Phone numbers\n- Ctrl+5: Code snippets\n\n### 3. Bulk Operations (Shift + Select)\nSelect multiple clips simultaneously to:\n- Delete unused entries in batches\n- Export multiple clips to files\n- Merge text entries with custom separators\n- Share collections with team members\n\n## Advanced Techniques for Power Users\n\n### Smart Auto-Capture Rules\nConfigure your clipboard manager to automatically:\n- Ignore duplicate entries within 5 minutes\n- Skip sensitive data patterns (SSNs, credit cards)\n- Auto-categorize based on content type\n- Create temporary clips that expire after set time\n\n### Workspace-Specific Histories\nMaintain separate clipboard histories for different projects:\n- Development work (code, git commands, error messages)\n- Content creation (headlines, quotes, research notes)\n- Communication (email templates, signatures, common responses)\n\n## Integration with Popular Tools\n\n### Developer Workflows\n- **VS Code**: Install clipboard manager extensions for seamless integration\n- **Terminal**: Use clipboard sync for command history across sessions\n- **Git**: Store frequently used commands and commit messages\n\n### Content Creation\n- **Writing**: Maintain snippet libraries for common phrases, signatures, bio information\n- **Design**: Store color codes, font specifications, and style guidelines\n- **Marketing**: Keep campaign copy, hashtag sets, and call-to-action templates\n\n## Security Best Practices\n\nNever compromise security for convenience:\n\n1. **Sensitive Data Handling**: Configure auto-clear for financial information\n2. **Encryption**: Enable local encryption for all stored clips\n3. **Access Control**: Set up workspace isolation for different security levels\n4. **Audit Trails**: Review clipboard history regularly for unauthorized access\n\n## Measuring Your Productivity Gains\n\nTrack these metrics to quantify your improvement:\n- **Time saved per day**: Average 45 minutes for active users\n- **Error reduction**: 73% fewer copy-paste mistakes\n- **Context switching**: 60% less time hunting for previously copied content\n- **Workflow efficiency**: 89% faster repetitive task completion\n\n## Getting Started Today\n\n1. **Set up categories** that match your workflow\n2. **Configure smart shortcuts** for your most common tasks\n3. **Enable auto-capture rules** to reduce manual management\n4. **Practice the essential shortcuts** until they become muscle memory\n\nRemember: The best clipboard manager is the one that disappears into your workflow, making you more productive without thinking about it.\n\n*Ready to supercharge your productivity? Download ClipSync Pro and start implementing these shortcuts today.*",
        metaDescription: "Master these 10 essential clipboard manager shortcuts and productivity tips to save 45+ minutes daily. Learn power-user techniques, automation tricks, and workflow optimization strategies.",
        keywords: "clipboard manager shortcuts, productivity tips, workflow automation, keyboard shortcuts, clipboard productivity, power user tips, digital efficiency, copy paste optimization",
        author: "ClipSync Pro Team",
        category: "Productivity",
        tags: ["shortcuts", "productivity", "automation", "workflow", "power-user"],
        published: true,
        featured: true,
        publishedAt: new Date('2024-08-10'),
        createdAt: new Date('2024-08-10'),
        updatedAt: new Date('2024-08-10')
      },
      {
        title: "Why Linux Users Are Switching to ClipSync Pro: Complete Review",
        slug: "linux-clipboard-manager-clipsync-pro-review",
        excerpt: "An in-depth analysis of why ClipSync Pro has become the go-to clipboard manager for Linux users. Performance benchmarks, feature comparisons, and real user testimonials.",
        content: "# The Ultimate Linux Clipboard Manager: ClipSync Pro Complete Review\n\nThe Linux ecosystem has always prioritized efficiency and customization, but clipboard management has remained surprisingly fragmented. After extensive testing and community feedback, ClipSync Pro has emerged as the definitive solution for Linux users seeking professional-grade clipboard management.\n\n## Performance That Matches Linux Standards\n\n### Lightning-Fast Operation\nOur benchmarks show ClipSync Pro operating at native speeds:\n- **Startup time**: 0.3 seconds (67% faster than alternatives)\n- **Search response**: <50ms for 10,000+ clips\n- **Memory footprint**: 45MB average (comparable to text editor)\n- **CPU usage**: <1% during normal operation\n\n### Resource Efficiency\nUnlike bloated alternatives, ClipSync Pro respects Linux philosophy:\n- Minimal system resource consumption\n- No background processes when idle\n- Efficient database indexing for large clip histories\n- Optional daemon mode for ultra-low latency\n\n## Feature-Complete for Professional Use\n\n### Advanced Search Capabilities\n- **Regex support**: Use powerful pattern matching for complex searches\n- **Content-type filtering**: Instantly find images, URLs, or code snippets\n- **Date-based queries**: Find clips from last Tuesday's debugging session\n- **Fuzzy matching**: Find content even with typos or partial matches\n\n### Developer-Focused Features\n- **Code syntax highlighting**: Automatic language detection for 200+ languages\n- **Git integration**: Store and replay commit messages, branch names\n- **Terminal enhancement**: Seamless clipboard sync across tmux/screen sessions\n- **SSH clipboard sync**: Maintain clipboard continuity across remote sessions\n\n### Privacy and Security\n- **Local-only storage**: Never syncs to external servers\n- **Encryption at rest**: AES-256 encryption for sensitive content\n- **Auto-expire rules**: Automatically purge sensitive data after set time\n- **Permission controls**: Fine-grained access control per application\n\n## Distribution Compatibility\n\n### Tested and Optimized For:\n- **Ubuntu** 18.04+ (LTS and standard releases)\n- **Debian** 10+ (stable, testing, unstable)\n- **Fedora** 32+ (including Silverblue)\n- **Arch Linux** (and Manjaro)\n- **openSUSE** Leap and Tumbleweed\n- **Pop!_OS** 20.04+\n- **Linux Mint** 20+\n\n## Community Feedback and Results\n\n### User Testimonials\n\n**Sarah M., DevOps Engineer:**\n\"Switched from 3 different clipboard tools to ClipSync Pro. The Kubernetes YAML snippet management alone saves me 2 hours per week.\"\n\n**Marcus L., Content Creator:**\n\"The automated categorization is incredible. It knows the difference between code, copy, and URLs without any configuration.\"\n\n**Team at Canonical:**\n\"We've standardized on ClipSync Pro across our Ubuntu development team. The shared snippet libraries are a game-changer for documentation.\"\n\n### Productivity Metrics\n- **94% user retention** after 30 days\n- **Average 47 minutes daily time savings**\n- **89% reduction** in copy-paste related errors\n- **4.8/5 star rating** across all Linux distributions\n\n## Getting Started Guide\n\n### Initial Setup (5 minutes)\n1. **Download and install** using your preferred method\n2. **Run initial configuration**: Run setup wizard\n3. **Import existing clipboard**: Migrate from other tools automatically\n4. **Configure shortcuts**: Set up your preferred key combinations\n5. **Enable system integration**: Add to startup applications\n\n## Why ClipSync Pro is the Right Choice\n\nIn the crowded field of Linux clipboard managers, ClipSync Pro stands out by actually understanding how Linux professionals work. It's not just another utility—it's a productivity multiplier designed by Linux users, for Linux users.\n\nThe combination of performance, features, and respect for system resources makes ClipSync Pro the obvious choice for anyone serious about their Linux workflow.\n\n*Ready to transform your clipboard management? Download ClipSync Pro today and join thousands of Linux users who have already made the switch.*",
        metaDescription: "Comprehensive review of ClipSync Pro clipboard manager for Linux users. Performance benchmarks, feature analysis, user testimonials, and comparison with alternatives like Parcellite and GPaste.",
        keywords: "linux clipboard manager, clipsync pro review, linux productivity tools, clipboard manager comparison, parcellite alternative, gpaste alternative, linux workflow optimization",
        author: "ClipSync Pro Team",
        category: "Reviews",
        tags: ["linux", "review", "comparison", "performance", "productivity"],
        published: true,
        featured: true,
        publishedAt: new Date('2024-08-12'),
        createdAt: new Date('2024-08-12'),
        updatedAt: new Date('2024-08-12')
      },
      {
        title: "The Complete Guide to Clipboard Security: Protecting Your Sensitive Data",
        slug: "clipboard-security-guide-protect-sensitive-data",
        excerpt: "Learn essential clipboard security practices to protect passwords, financial data, and sensitive information. Complete guide with practical tips and security configurations.",
        content: "# The Complete Guide to Clipboard Security: Protecting Your Digital Life\n\nYour clipboard is one of the most overlooked security vulnerabilities in your digital workflow. Every day, sensitive information flows through this temporary storage space—passwords, financial data, personal information, and confidential documents. Understanding and securing your clipboard isn't just good practice; it's essential for modern digital security.\n\n## Understanding Clipboard Vulnerabilities\n\n### Common Security Risks\nYour clipboard faces multiple attack vectors:\n\n1. **Malicious software** can monitor and steal clipboard contents\n2. **Shared computers** retain clipboard history accessible to other users\n3. **Cloud sync services** may inadvertently backup sensitive clipboard data\n4. **Screenshot tools** might capture clipboard contents in system notifications\n5. **Remote access tools** can expose clipboard data across network connections\n\n### Real-World Attack Scenarios\n\n**Scenario 1: The Password Leak**\nA user copies their banking password to log into their account. Unknown to them, malware has been monitoring clipboard activity for months, building a database of their most sensitive credentials.\n\n**Scenario 2: The Corporate Data Breach**\nAn employee copies confidential financial data from a spreadsheet. The company's clipboard manager automatically syncs this data to their personal device, where it remains accessible to family members.\n\n**Scenario 3: The Remote Work Exposure**\nDuring a screen sharing session, a developer copies API keys and database credentials. The remote collaboration tool logs this information, creating an audit trail of sensitive access credentials.\n\n## Essential Security Practices\n\n### 1. Implement Auto-Clear Policies\n\nConfigure your clipboard manager to automatically clear sensitive data:\n\n- Auto-clear financial data after 5 minutes\n- Clear password-like entries immediately after use\n- Purge all clipboard data on system lock\n\n### 2. Enable Content-Aware Filtering\n\nModern clipboard managers can identify and handle sensitive content automatically:\n\n- **Financial data detection**: Credit cards, SSNs, bank account numbers\n- **Authentication patterns**: Passwords, API keys, security tokens\n- **Personal information**: Email addresses, phone numbers, addresses\n- **Corporate data**: Employee IDs, project codes, internal URLs\n\n### 3. Use Temporary Clipboard Modes\n\nFor ultra-sensitive operations, enable temporary mode:\n- Clipboard history disabled\n- Auto-clear after single use\n- No persistence across sessions\n- Encrypted in-memory storage only\n\n## Advanced Security Configurations\n\n### Encryption at Rest\nAll clipboard data should be encrypted when stored:\n\n- Enable AES-256 encryption for all stored clips\n- Configure master password for encryption key\n- Enable secure key derivation\n\n### Network Security\nProtect clipboard data during network operations:\n\n- **Disable cloud sync** for sensitive environments\n- **Use VPN tunneling** for remote clipboard access\n- **Enable certificate pinning** for encrypted transmissions\n- **Audit network connections** regularly\n\n### Access Control\nImplement granular access controls:\n\n- Restrict clipboard access by application\n- Enable administrator approval for sensitive operations\n- Log all clipboard access for audit purposes\n\n## Security Assessment Checklist\n\n### Daily Security Practices\n- Review clipboard history for sensitive data\n- Clear clipboard before sharing screens\n- Use temporary mode for sensitive operations\n- Verify encryption status regularly\n\n### Weekly Security Tasks\n- Audit clipboard access logs\n- Update security policies and filters\n- Review auto-clear configuration\n- Test disaster recovery procedures\n\n### Monthly Security Reviews\n- Assess new security threats and vulnerabilities\n- Update encryption keys and passwords\n- Review employee security training needs\n- Evaluate clipboard manager security updates\n\n## Emergency Response Procedures\n\n### Data Breach Response\nIf you suspect clipboard data has been compromised:\n\n1. **Immediate actions**: Clear all clipboard history, revoke affected credentials\n2. **Assessment**: Determine scope and timeline of potential exposure\n3. **Notification**: Alert relevant stakeholders and compliance officers\n4. **Remediation**: Implement additional security controls and monitoring\n\n### Recovery Planning\n- **Backup procedures**: Secure backup of configuration and policies\n- **Restoration process**: Step-by-step recovery from security incidents\n- **Communication plans**: Internal and external notification procedures\n- **Lessons learned**: Post-incident analysis and improvement recommendations\n\n## Taking Action Today\n\nSecurity isn't a destination—it's an ongoing process. Start implementing these clipboard security practices immediately:\n\n1. **Assess your current risk** using our security checklist\n2. **Configure auto-clear policies** for sensitive data patterns\n3. **Enable encryption** for all stored clipboard data\n4. **Establish regular security reviews** and audit procedures\n5. **Train your team** on clipboard security best practices\n\nRemember: The cost of implementing proper clipboard security is always less than the cost of a data breach.\n\n*Ready to secure your clipboard? Download ClipSync Pro with enterprise-grade security features and protect your most sensitive information.*",
        metaDescription: "Complete guide to clipboard security best practices. Learn how to protect passwords, financial data, and sensitive information from clipboard-based attacks and data breaches.",
        keywords: "clipboard security, data protection, password security, sensitive data protection, clipboard encryption, security best practices, data breach prevention, digital security",
        author: "Security Team",
        category: "Security",
        tags: ["security", "privacy", "encryption", "data-protection", "best-practices"],
        published: true,
        featured: false,
        publishedAt: new Date('2024-08-13'),
        createdAt: new Date('2024-08-13'),
        updatedAt: new Date('2024-08-13')
      }
    ];

    samplePosts.forEach(post => {
      const id = randomUUID();
      const blogPost: BlogPost = {
        ...post,
        id,
        ogImage: null,
        published: post.published,
        featured: post.featured,
        viewCount: "0"
      };
      this.blogPosts.set(id, blogPost);
    });
  }
  
  // Comment Methods
  async getCommentsByBlogPost(blogPostId: string): Promise<BlogComment[]> {
    return Array.from(this.blogComments.values())
      .filter(comment => comment.blogPostId === blogPostId && comment.approved)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async createComment(insertComment: InsertBlogComment): Promise<BlogComment> {
    const id = randomUUID();
    const now = new Date();
    const comment: BlogComment = {
      ...insertComment,
      id,
      rating: insertComment.rating || "5",
      approved: false, // Comments need approval
      createdAt: now
    };
    this.blogComments.set(id, comment);
    await this.saveData();
    return comment;
  }

  async approveComment(id: string): Promise<boolean> {
    const comment = this.blogComments.get(id);
    if (!comment) return false;
    
    const updated = { ...comment, approved: true };
    this.blogComments.set(id, updated);
    await this.saveData();
    return true;
  }

  async deleteComment(id: string): Promise<boolean> {
    const result = this.blogComments.delete(id);
    if (result) {
      await this.saveData();
    }
    return result;
  }

  async getAllComments(): Promise<BlogComment[]> {
    return Array.from(this.blogComments.values())
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async incrementViewCount(postId: string): Promise<boolean> {
    const post = this.blogPosts.get(postId);
    if (!post) return false;
    
    const currentViews = parseInt(post.viewCount) || 0;
    const updated: BlogPost = {
      ...post,
      viewCount: (currentViews + 1).toString()
    };
    
    this.blogPosts.set(postId, updated);
    await this.saveData();
    return true;
  }
}

export const storage = new MemStorage();