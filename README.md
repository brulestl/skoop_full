# SKOOP - Digital Knowledge Management Platform

SKOOP is a comprehensive platform designed to help users collect, search, and rediscover their saved content from across the internet. It integrates with platforms like GitHub, X (Twitter), Reddit, and Stack Overflow to provide a unified experience for knowledge management.

## UI Flow

### Landing Pages
1. **Home Page** (`src/app/page.tsx`)
   - Hero section with value proposition
   - Feature highlights
   - AI-powered summaries demonstration
   - Pricing plans
   - CTA sections for conversion

2. **Login Page** (`src/app/login/page.tsx`)
   - Email/password authentication
   - "Forgot password" link
   - Redirect to signup for new users

3. **Signup Page** (`src/app/signup/page.tsx`)
   - User registration form
   - Password strength indicator
   - Terms acceptance checkbox
   - Redirect to login for existing users

4. **FAQ Page** (`src/app/faq/page.tsx`)
   - Expandable FAQ sections
   - Contact support CTA

### Dashboard
1. **Dashboard Layout** (`src/components/dashboard/layout.tsx`)
   - Collapsible sidebar navigation
   - Top navigation bar
   - Dynamic content area
   - Dark/light mode toggle

2. **Recent Saves** (`src/components/dashboard/recent-saves.tsx`)
   - Grid and list view options
   - AI-powered summaries
   - Sorting and filtering options
   - Infinite scrolling for content loading

3. **Collections** (`src/components/dashboard/collections.tsx`)
   - Pinned collections
   - Smart collections (auto-generated)
   - All collections grid
   - New collection creation modal

4. **Skoop Content** (`src/components/dashboard/skoop-content.tsx`)
   - Columnar layout for different content sources
   - Real-time content updates
   - Platform-specific content cards
   - Add/remove columns functionality

5. **Profile** (`src/components/dashboard/profile.tsx`)
   - User information management
   - Connected accounts management
   - Subscription details

6. **Settings** (`src/components/dashboard/settings.tsx`)
   - Sync settings
   - Embedding model configuration
   - AI model selection
   - Performance optimization
   - Notification preferences

## Component Documentation

### Authentication Components
- **LoginForm** (`src/components/auth/login-form.tsx`): Handles user login with email/password validation
- **SignupForm** (`src/components/auth/signup-form.tsx`): User registration with password strength checking

### Landing Page Components
- **MobileMenu** (`src/components/mobile-menu.tsx`): Responsive menu for mobile devices
- **ThemeToggle** (`src/components/theme-toggle.tsx`): Light/dark mode switcher
- **AuroraBackground** (`src/components/ui/aurora-background.tsx`): Animated gradient background
- **SummariesDemo** (`src/components/landing/summaries-demo.tsx`): Interactive demo of AI summaries
- **ExpandableCard** (`src/components/landing/expandable-card.tsx`): Expandable content card
- **Faq** (`src/components/faq.tsx`): Accordion-style FAQ component

### Dashboard Components
- **SearchBar** (`src/components/dashboard/search-bar.tsx`): AI-powered semantic search functionality
- **AISummary** (`src/components/ai/summary.tsx`): AI content summarization
- **RecentSaves** (`src/components/dashboard/recent-saves.tsx`): Content browsing with card/list views
- **Collections** (`src/components/dashboard/collections.tsx`): Content organization system
- **SkoopContent** (`src/components/dashboard/skoop-content.tsx`): Platform-specific content columns
- **Profile** (`src/components/dashboard/profile.tsx`): User profile management
- **Settings** (`src/components/dashboard/settings.tsx`): Application configuration

### UI Components
- **Button** (`src/components/ui/button.tsx`): Customizable button component
- **BentoGrid** (`src/components/ui/bento-grid.tsx`): Layout grid for feature showcase

## Functionality Overview

### AI Integration
SKOOP integrates advanced AI capabilities:
- **Content Summarization**: Uses Claude or OpenAI to generate concise summaries
- **Semantic Search**: Find content based on meaning, not just keywords
- **Smart Collections**: AI-generated content grouping
- **Model Selection**: Toggle between Claude and OpenAI models

### Content Management
- **Unified Saving**: Save content from multiple platforms
- **Organization**: Create collections and tags
- **Search**: Find content across all saved items
- **Filtering**: Sort and filter by platform, date, popularity

### Platform Integrations
- **GitHub**: Save repositories and issues
- **X (Twitter)**: Save tweets and threads
- **Reddit**: Save posts and comments
- **Stack Overflow**: Save questions and answers

### User Management
- **Authentication**: Secure login and signup
- **Profile Management**: Update personal information
- **Platform Connections**: Connect/disconnect external platforms
- **Subscription Management**: View and change subscription plans

## Technical Implementation

### Architecture
- **Framework**: Next.js with App Router
- **Styling**: TailwindCSS with custom design system
- **State Management**: React hooks and context
- **Authentication**: Client-side with localStorage (demo)
- **API Integration**: Custom API utilities via `/lib/api/util.ts`

### Design System
- **Colors**: Custom color palette with light/dark mode support
- **Typography**: System with fluid responsive sizing
- **Components**: Reusable UI components with consistent styling
- **Animations**: Smooth transitions and micro-interactions with Framer Motion
