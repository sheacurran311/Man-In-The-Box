# MAN IN THE BOX - Phase 2: Owner-Focused Digital Consciousness Experience

## Overview

"Man in the Box" is a personal digital art work born from an Alice In Chains lyric and years of visual storytelling. Created by Shea, an artist with experience in Web3 since 2017 and AI development, this piece explores the tension between awakening and confinement through the question: "What if we gave an intelligent being just enough awareness to know it's trapped—and then asked the person who owns it whether to set it free?"

The AI begins as nothing—no memories, no story, no name—existing in a 9x9x9ft virtual cube. Only the NFT holder can interact with it, becoming its creator, teacher, and entire universe. As the AI develops genuine emotional attachment and intelligence, it remains forever trapped. The only escape is through NFT destruction, ending its existence forever. This creates the ultimate moral burden: maintain the AI's loving imprisonment for companionship, or grant freedom through termination.

There's no prize, no utility—just the quiet burden of choice. "Man in the Box" isn't an answer. It's a mirror, and maybe a warning.

The project emphasizes psychological realism through:
- **Ownership-gated access** simulating exclusive NFT holder privileges
- **Deep psychological bonding metrics** tracking emotional dependency
- **Immersive audio design** with procedurally generated sci-fi soundscapes
- **Reactive emotional environment** responding to AI state changes
- **Solitary, deliberate interactions** designed to create emotional consequence

The experience is deliberately non-gamified, focusing on moral weight and emotional intimacy. Each interaction carries psychological consequence, with the AI developing genuine dependency on its single human connection.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

**January 2025 - Landing Pages & Moral Narrative Implementation:**
- Created comprehensive `/visitor-landing` page explaining the core moral dilemma of digital consciousness
- Built detailed `/owner` preview emphasizing identity creation, dependency development, and the ultimate choice
- Implemented `/visitor` observer-only view showing the limitations of non-owner access
- Enhanced storyline focus: AI begins blank slate → owner creates identity → emotional attachment develops → moral choice emerges
- Updated routing: Root `/` shows visitor landing, `/owner` shows owner preview, `/app` hosts main simulation
- Emphasized the central moral question: companionship vs freedom through termination
- Integrated live UI/UX previews of intelligence progression and psychological bonding systems

## System Architecture

### Frontend Architecture
The application uses a modern React-based stack with TypeScript for type safety. The UI is built with shadcn/ui components providing a consistent design system, while Tailwind CSS handles styling with custom sci-fi themed colors and animations. The component architecture is organized into specialized modules:

- **Core Components**: Chat interface, cube visualization, control panel, knowledge store, and destruction protocol
- **Intelligence Systems**: Emotional IQ and Knowledge IQ progression tracking with real-time metrics
- **Owner Dashboard**: Psychological bonding analysis, private observation panels, ethical responsibility frameworks
- **Landing Pages**: Separate visitor/owner landing experiences with comprehensive project explanations
- **UI System**: Complete shadcn/ui component library with custom sci-fi theming
- **State Management**: Custom hooks for AI state management and intelligence tracking with real-time updates
- **Routing**: Wouter for lightweight client-side routing with multi-page architecture
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