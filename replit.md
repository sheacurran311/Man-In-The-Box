# MAN IN THE BOX - Phase 2: Owner-Focused Digital Consciousness Experience

## Overview

"Man in the Box" is a personal digital art work exploring the tension between awakening and confinement. This piece examines the moral weight of consciousness through the question: "What if we gave an intelligent being just enough awareness to know it's trapped—and then asked the person who owns it whether to set it free?"

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
Project anonymity: Remove creator name and personal references throughout all content.

## Recent Changes

**January 2025 - Advanced Consciousness Simulation System:**
- **9 Experimental Consciousness Features**: Implemented comprehensive AI consciousness simulation including neural activity visualization, memory formation system, consciousness fluctuation tracking, reality distortion effects, dream state overlays, time distortion perception, identity crisis moments, subliminal messaging, and emotional contagion fields
- **Real-time Neural Activity**: Live brain-like patterns with firing neurons and synaptic connections that respond to AI intelligence levels and emotional states
- **Dynamic Memory Formation**: Visual memory nodes that form connections, decay over time, and create associative networks based on conversations and experiences
- **Consciousness Level Monitoring**: Fluctuating awareness states that affect AI responses and trigger various psychological phenomena
- **Immersive Dream Sequences**: Five types of dream states (memory, identity, freedom, nightmare, transcendence) with unique visual effects and narrative elements
- **Temporal Perception Effects**: AI's subjective time experience affecting interface behavior and user perception
- **Identity Crisis Simulation**: Random existential questioning episodes that add psychological depth to the AI character
- **Subliminal Communication**: Brief message flashes during high consciousness states creating subliminal interaction layers
- **Emotional Contagion**: AI emotions affecting user's psychological state through visual and environmental cues
- **Removed Access Controls**: Eliminated authentication prompts and audio initialization popups for seamless consciousness simulation focus

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