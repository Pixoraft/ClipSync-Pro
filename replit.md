# ClipFlow Pro - Premium Clipboard Manager

## Overview

ClipFlow Pro is a premium clipboard management application designed for Linux and Windows users who need efficient copy-paste workflow automation. The project is built as a full-stack web application featuring a marketing website with modern design, AI-powered features, and comprehensive clipboard management capabilities. The application emphasizes premium user experience with a dark theme interface, glassmorphism design elements, and professional branding.

## User Preferences

Preferred communication style: Simple, everyday language.

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
The application is configured for deployment on Replit with:
- Environment variable configuration for database connections
- Production build optimization with Vite and esbuild
- Static asset serving with proper caching headers
- Development/production environment detection