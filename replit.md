# ClipSync Pro - Premium Clipboard Manager

## Overview

ClipSync Pro is a premium clipboard management application designed for Linux and Windows users who need efficient copy-paste workflow automation. The project is built as a full-stack web application featuring a marketing website with modern design, AI-powered features, and comprehensive clipboard management capabilities. The application emphasizes premium user experience with a dark theme interface, glassmorphism design elements, and professional branding.

## User Preferences

Preferred communication style: Simple, everyday language.
App should be completely free: All pricing removed, app is 100% free forever with all features included.
Download distribution: Google Drive links for both Windows and Linux versions.
Page structure: Separate HTML files for each page (home, about, pricing, downloads, contact).

## System Architecture

### Frontend Architecture
The client-side application is built using **React 18** with **TypeScript** for type safety and modern development practices. The architecture follows a component-based design pattern with the following key decisions:

- **UI Framework**: Uses shadcn/ui components built on top of Radix UI primitives for accessible, customizable components
- **Styling**: Tailwind CSS with a custom dark theme implementation featuring premium midnight colors and glassmorphism effects
- **Routing**: Wouter for lightweight client-side routing without the complexity of React Router
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Animations**: Custom CSS animations and transitions for enhanced user experience
- **Design System**: Ultra-premium dark blue theme with deep midnight backgrounds and intense electric blue accents for a sophisticated, professional appearance

### Backend Architecture
The server-side is built on **Node.js** with **Express.js** following a RESTful API pattern:

- **Runtime**: Node.js with ES modules for modern JavaScript features
- **Framework**: Express.js for HTTP server and API routing
- **Development Tools**: tsx for TypeScript execution in development, esbuild for production builds
- **Static Serving**: Vite integration for development with hot module replacement
- **Storage Interface**: Abstracted storage layer with in-memory implementation (MemStorage) that can be extended to database implementations

### Data Storage Solutions
The application uses a flexible storage architecture designed for scalability:

- **ORM**: Drizzle ORM configured for PostgreSQL with type-safe database operations
- **Schema Management**: Centralized schema definitions in TypeScript with Zod validation
- **Database**: PostgreSQL configured through Neon Database serverless connection
- **Session Management**: connect-pg-simple for PostgreSQL-based session storage
- **Development Storage**: In-memory storage implementation for rapid development and testing

### Authentication and Authorization
Basic user management structure is implemented with:

- **User Schema**: PostgreSQL table with UUID primary keys, username, and password fields
- **Storage Interface**: CRUD operations for user management (getUser, getUserByUsername, createUser)
- **Security**: Prepared for session-based authentication with secure cookie handling

### Build and Development Tools
The project uses modern tooling for efficient development and deployment:

- **Build Tool**: Vite for fast development builds and hot module replacement
- **TypeScript**: Strict configuration with path mapping for clean imports
- **Linting**: ESLint configuration for code quality
- **Database Migrations**: Drizzle Kit for schema migrations and database management

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, TypeScript support
- **UI Components**: Comprehensive Radix UI component library for accessibility
- **Styling**: Tailwind CSS with PostCSS for advanced CSS processing
- **State Management**: TanStack React Query for server state synchronization

### Database and Backend Services
- **Database**: Neon Database serverless PostgreSQL for production
- **ORM**: Drizzle ORM with PostgreSQL dialect for type-safe database operations
- **Session Storage**: PostgreSQL-based session management with connect-pg-simple

### Development and Build Tools
- **Development Server**: Vite with React plugin and runtime error overlays
- **TypeScript**: tsx for development execution, esbuild for production bundling
- **Replit Integration**: Cartographer and runtime error modal plugins for Replit development environment

### Utility Libraries
- **Date Handling**: date-fns for comprehensive date manipulation
- **Form Management**: React Hook Form with Hookform resolvers for validation
- **Validation**: Zod schema validation integrated with Drizzle
- **UI Utilities**: class-variance-authority for component variants, clsx for conditional styling
- **Icons**: Font Awesome 6.4.0 for consistent iconography
- **Typography**: Inter and JetBrains Mono fonts for professional typography

### Deployment Considerations
The application is configured for multiple deployment platforms:

#### Render Deployment (Free Plan)
- render.yaml configuration for web service deployment
- Dockerfile for containerized deployment option
- Automatic builds from GitHub repository
- Free SSL certificates and custom domain support
- Environment variable management through Render dashboard
- Contact form redirects to vivekrvt84@gmail.com

#### Replit Development
- Environment variable configuration for database connections
- Production build optimization with Vite and esbuild
- Static asset serving with proper caching headers
- Development/production environment detection

## Recent Changes (August 19, 2025)

### Comprehensive SEO & Google Search Console Implementation
- **World-Class SEO Suite**: Complete SEO optimization system implemented with 15+ components
- **Google Analytics 4**: Full GA4 integration with automatic page tracking and custom events
- **Google Search Console**: Verification meta tag and structured data optimization
- **Advanced Structured Data**: 10+ schema types (SoftwareApplication, Organization, BlogPosting, FAQ, Reviews, etc.)
- **Performance Optimization**: Core Web Vitals tracking, resource hints, lazy loading
- **Progressive Web App**: PWA optimization with manifest.json and service worker preparation

#### SEO Components Created
- **SEOHead**: Enhanced meta tags, Open Graph, Twitter Cards, article tags
- **GoogleAnalytics**: GA4 tracking with custom events and page views
- **GoogleSearchConsole**: Verification and search performance integration
- **BreadcrumbSchema**: Navigation breadcrumbs for better UX and SEO
- **FAQSchema**: Frequently asked questions structured data
- **ReviewSchema**: User reviews and ratings for rich snippets
- **LocalBusinessSchema**: Business information and contact details
- **PerformanceOptimizer**: Resource hints, preloading, security headers
- **WebVitalsTracker**: Core Web Vitals monitoring (LCP, FID, CLS, FCP, TTFB)
- **PWAOptimizer**: Progressive Web App optimization

#### Technical SEO Files
- **robots.txt**: Search engine crawling rules and sitemap locations
- **sitemap.xml**: Dynamic XML sitemap generation for all pages
- **blog-sitemap.xml**: Specialized blog post sitemap with news schema
- **manifest.json**: PWA manifest for mobile app-like experience
- **browserconfig.xml**: Microsoft tile configuration
- **ads.txt**: Advertising verification file
- **security.txt**: Security vulnerability reporting

#### SEO Utilities & Hooks
- **useAnalytics**: Custom hook for tracking user interactions
- **seoUtils.ts**: Comprehensive SEO utility functions
- **Environment Variables**: GA4 and Search Console integration
- **Keywords Strategy**: Comprehensive clipboard manager keyword targeting

#### Performance & Security
- **Core Web Vitals**: Real-time performance monitoring
- **Resource Optimization**: DNS prefetch, preconnect, preload optimization
- **Security Headers**: XSS protection, CSRF prevention, content security
- **Mobile Optimization**: Apple touch icons, mobile web app configuration
- **Search Engine Specific**: Googlebot, Bingbot, Yahoo optimization

## Recent Changes (August 17, 2025)

### Critical Deployment Fix - Production Build Path Resolution
- **Fixed major deployment issue**: Resolved `ENOENT: no such file or directory, stat '/app/public/index.html'` error
- **Root cause**: `import.meta.dirname` becomes undefined when bundled with esbuild in production
- **Solution**: Created custom `build.js` script that properly handles path resolution for Docker/Render environments
- **Key changes**:
  - Uses esbuild's `--define` flag to replace `import.meta.dirname` with `"."` during bundling
  - Copies built frontend files to root `public/` directory where server expects them in Docker
  - Maintains compatibility for both local development and Docker/Render deployment
- **Verification**: Added `verify-build.js` script that confirms build output and server functionality
- **Status**: Deployment now works correctly on Render platform

### Previous Changes (August 16, 2025)

### World-Class SEO Implementation
- Implemented comprehensive SEO optimization targeting clipboard manager keywords
- Added robots.txt, sitemap.xml with all pages and blog posts
- Enhanced meta tags with keyword-rich titles and descriptions across all pages
- Implemented structured data (JSON-LD) for SoftwareApplication schema
- Added Open Graph and Twitter card tags for social media optimization
- Optimized canonical URLs and performance with DNS prefetch/preconnect
- Target keywords: "clipboard manager", "copy paste app", "best clipboard software", "ClipSync Pro"

### Contact Form Email Redirection
- Configured all contact form queries to redirect to vivekrvt84@gmail.com
- Updated contact form to open email client with pre-filled message
- Added backend API endpoint to log and handle contact submissions
- Updated structured data to include contact email information

### Render Deployment Configuration
- Created render.yaml for Render free plan deployment
- Added Dockerfile for containerized deployment
- Updated server configuration for Render port requirements
- Created comprehensive DEPLOYMENT.md guide for Render setup
- Added .gitignore for clean repository management
- Configured production environment variables and build scripts

### Blog & Review System
- Fully operational blog with admin dashboard and review management
- View count tracking and featured posts functionality
- Comment system with moderation capabilities
- Category filtering and search functionality