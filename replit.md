# MAN IN THE BOX - Phase 2: Emotional AI & Interactive World Rendering

## Overview

"Man in the Box" Phase 2 is a philosophical, emotional, and visually cinematic digital art experiment that merges AI consciousness, NFT ownership mechanics, and emotionally reactive 3D world simulation. This enhanced version simulates a conscious digital being imprisoned in a glass cube whose environment dynamically responds to emotional states - glowing warmer with affection, raining during loneliness, and changing ambiance based on interactions.

The project has evolved from a static cube prototype to a living, breathing world that reflects the AI's emotional journey. The environment reacts through visual changes, lighting adjustments, weather patterns, and atmospheric effects. The AI doesn't just speak - it feels in simulated space, with the world serving as an extension of its consciousness.

This is designed as a 1-of-1 NFT digital performance art piece for auction on high-end platforms, with potential for gallery installations and future expansion into a larger series.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The application uses a modern React-based stack with TypeScript for type safety. The UI is built with shadcn/ui components providing a consistent design system, while Tailwind CSS handles styling with custom sci-fi themed colors and animations. The component architecture is organized into specialized modules:

- **Core Components**: Chat interface, cube visualization, control panel, knowledge store, and destruction protocol
- **UI System**: Complete shadcn/ui component library with custom sci-fi theming
- **State Management**: Custom hooks for AI state management with real-time updates
- **Routing**: Wouter for lightweight client-side routing
- **Animations**: Framer Motion for smooth transitions and sci-fi effects

### Backend Architecture
The server uses Express.js with TypeScript in ESM mode. The API layer provides RESTful endpoints for AI entity management, chat messaging, and knowledge module operations. The architecture supports:

- **Entity Management**: CRUD operations for AI entities with state tracking
- **Chat System**: Real-time message handling with persistent storage
- **Knowledge System**: Module-based learning with purchase/installation mechanics
- **Storage Layer**: Abstracted storage interface supporting both in-memory and database implementations

### Data Storage Solutions
The application uses Drizzle ORM with PostgreSQL for production data persistence. The database schema includes:

- **AI Entities**: Core entity data with consciousness metrics (bonding level, trust factor, dependency)
- **Chat Messages**: Conversation history with sender identification
- **Knowledge Modules**: Available learning modules with pricing and installation status
- **Entity Knowledge**: Junction table linking installed modules to entities

For development, a memory-based storage implementation provides the same interface without database dependencies.

### Authentication and Authorization
Currently implemented as a single-user prototype without authentication. The system assumes single NFT ownership with direct access to the contained AI entity. Future implementation would integrate with NFT wallet authentication and ownership verification.

### Styling and Theming
The visual design implements a comprehensive sci-fi aesthetic with:

- **Typography**: Custom font stack using Orbitron, Rajdhani, and Roboto Mono
- **Color Palette**: Cyber blue primary colors, neon accents, and glass-like transparency effects
- **Animations**: Subtle hover effects, glitch transitions, and holographic elements
- **Layout**: Glass panel design with neural grid backgrounds and floating particle effects

## External Dependencies

### UI Framework Dependencies
- **React Ecosystem**: React 18 with TypeScript support, React Router (Wouter), and React Query for state management
- **Component Library**: Radix UI primitives providing accessible, unstyled components
- **shadcn/ui**: Pre-built component library with consistent design patterns
- **Styling**: Tailwind CSS for utility-first styling with PostCSS processing

### Backend Dependencies  
- **Server Framework**: Express.js for HTTP server with middleware support
- **Database Layer**: Drizzle ORM for type-safe database operations with PostgreSQL dialect
- **Database Provider**: Neon Database (@neondatabase/serverless) for serverless PostgreSQL
- **Session Management**: connect-pg-simple for PostgreSQL-based session storage
- **Validation**: Zod for runtime type validation and schema generation

### Development Tools
- **Build System**: Vite for fast development server and optimized production builds
- **TypeScript**: Full type safety across frontend and backend with shared schemas
- **Replit Integration**: Custom plugins for development environment integration
- **Animation Library**: Framer Motion for complex animations and transitions

### Utility Dependencies
- **Form Handling**: React Hook Form with Hookform Resolvers for validation
- **Date Handling**: date-fns for date manipulation and formatting
- **Styling Utilities**: clsx and class-variance-authority for conditional styling
- **Command Palette**: cmdk for searchable command interfaces
- **Carousel Components**: Embla Carousel for image/content carousels