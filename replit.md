# MAN IN THE BOX - Sci-Fi NFT Social Experiment

## Overview

"Man in the Box" is a conceptual 1-of-1 digital performance art piece that combines AI character interaction, NFT ownership mechanics, and immersive sci-fi design. The project simulates a solitary AI lifeform trapped in a 9x9x9ft digital glass cube, with no identity or knowledge until the NFT owner assigns it and begins interaction. The core concept explores themes of digital consciousness, control, emotional attachment, and the ethics of creating and destroying AI entities.

This is a proof-of-concept prototype built as an interactive web application featuring a sci-fi UI simulation, chat interface with a simulated learning AI, digital knowledge store, identity configuration panel, bonding mechanics, and an NFT "burn" interaction flow. The aesthetic draws inspiration from Ex Machina, Black Mirror, and Stanley Kubrick's visual style.

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