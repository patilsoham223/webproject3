# Vertex Glow - Premium Beauty Blog Website

## Overview

Vertex Glow is a modern, full-stack beauty blog application built with React, Express, and PostgreSQL. The application features a sophisticated magazine-style design with smooth animations, comprehensive content management, and interactive user engagement features.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Animations**: Framer Motion for smooth animations and transitions
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js for REST API
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured for Neon Database)
- **Session Management**: connect-pg-simple for PostgreSQL session storage
- **API Structure**: RESTful endpoints with proper error handling

## Key Components

### Database Schema
- **Users**: User accounts with roles, profiles, and authentication
- **Categories**: Content categorization (Makeup, Skincare, Hair Care, Fashion)
- **Posts**: Blog posts with rich content, SEO metadata, and engagement metrics
- **Comments**: User-generated comments on posts
- **Newsletter**: Email subscription management
- **Contact**: Contact form submissions

### Page Structure
- **Home**: Hero section, featured posts, categories grid, newsletter signup
- **Category Pages**: Makeup, Skincare, Hair Care, Fashion with filtered content
- **Blog Post**: Individual post view with comments and social sharing
- **About**: Team information and company details
- **Contact**: Contact form and business information
- **Search**: Advanced search functionality with filters
- **Legal Pages**: Privacy policy and terms of service

### Component Architecture
- **Layout Components**: Header with navigation and search, Footer with links
- **Blog Components**: Post cards, hero sections, comment systems, newsletter forms
- **UI Components**: Reusable design system components from shadcn/ui
- **Animation Components**: Framer Motion integration for smooth interactions

## Data Flow

### Client-Server Communication
1. Frontend makes API requests using TanStack Query
2. Express server handles requests with proper validation using Zod schemas
3. Drizzle ORM manages database operations with type safety
4. Responses are cached and managed by React Query on the client

### Content Management
1. Posts are categorized and tagged for organization
2. Featured posts are highlighted on the homepage
3. View counts and engagement metrics are tracked
4. Comments are associated with posts and moderated
5. Newsletter subscriptions are managed separately

### User Interactions
1. Search functionality with real-time suggestions
2. Comment system for user engagement
3. Newsletter subscription with email validation
4. Contact form for business inquiries
5. Social media sharing integration

## External Dependencies

### Frontend Dependencies
- **React Ecosystem**: React 18, React DOM, React Hook Form
- **UI/UX**: Radix UI components, Framer Motion, Lucide React icons
- **State Management**: TanStack Query for server state
- **Styling**: Tailwind CSS, class-variance-authority for component variants
- **Utilities**: date-fns for date handling, clsx for conditional classes

### Backend Dependencies
- **Server Framework**: Express.js with TypeScript support
- **Database**: Drizzle ORM, @neondatabase/serverless for PostgreSQL
- **Validation**: Zod for schema validation and type safety
- **Session Management**: express-session with connect-pg-simple

### Development Tools
- **Build Tools**: Vite for frontend, esbuild for backend
- **TypeScript**: Full type safety across the stack
- **Database Tools**: Drizzle Kit for migrations and schema management

## Deployment Strategy

### Production Build
- Frontend is built with Vite and served as static files
- Backend is bundled with esbuild for efficient Node.js deployment
- Environment variables configure database connections and settings

### Database Management
- Schema is defined in shared/schema.ts using Drizzle ORM
- Migrations are managed through drizzle-kit
- PostgreSQL database hosted on Neon (or compatible PostgreSQL service)

### Development Workflow
- Hot module replacement for frontend development
- TypeScript compilation with strict mode enabled
- Shared types between frontend and backend ensure consistency
- API routes are co-located with backend logic for maintainability

### Environment Configuration
- Development mode runs both frontend and backend concurrently
- Production mode serves static frontend files through Express
- Database URL and other secrets are managed through environment variables
- Replit-specific configurations for seamless cloud development