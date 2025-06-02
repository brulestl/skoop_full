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

# SKOOP Backend Architecture

SKOOP is an AI-powered content aggregation and discovery dashboard for developers, designers, and researchers. This repository contains the backend implementation using Supabase, OpenAI, and other modern technologies.

## Architecture Overview

### Core Technologies

- **Supabase**: PostgreSQL database, authentication, and real-time subscriptions
- **OpenAI API**: Text generation and embeddings for semantic search
- **Anthropic API**: Backup summarization service
- **pgvector**: Vector similarity search
- **Edge Functions**: Serverless functions for data ingestion and processing

### Database Schema

The database consists of the following main tables:

- `users`: User profiles and subscription plans
- `connected_accounts`: OAuth connections to external services
- `bookmarks_raw`: Raw data from external services
- `bookmarks`: Processed bookmarks with embeddings
- `collections`: User-created and AI-generated collections
- `content_columns`: Custom content feeds
- `fresh_content`: Real-time content updates

### Edge Functions

1. **Content Ingestion**
   - `ingest_github.ts`: GitHub stars and repositories
   - `ingest_twitter.ts`: Twitter/X bookmarks
   - `ingest_reddit.ts`: Reddit saved posts
   - `ingest_stack.ts`: Stack Overflow favorites

2. **AI Processing**
   - `generate_summary.ts`: Content summarization
   - `generate_embedding.ts`: Vector embeddings
   - `semantic_search.ts`: Semantic search functionality

## Setup Instructions

1. **Environment Variables**

Create a `.env` file with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
OPENAI_API_KEY=your_openai_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key
```

2. **Database Setup**

Run the migrations in order:

```bash
supabase db reset
```

3. **Edge Functions**

Deploy the Edge Functions:

```bash
supabase functions deploy
```

4. **Authentication**

Configure OAuth providers in the Supabase dashboard:
- GitHub
- Twitter/X
- Reddit
- Stack Overflow

## Development

1. **Local Development**

```bash
# Start Supabase locally
supabase start

# Run migrations
supabase db reset

# Deploy functions
supabase functions deploy
```

2. **Testing**

```bash
# Run database tests
supabase db test

# Test Edge Functions
supabase functions serve
```

## API Documentation

### Authentication

All API endpoints require authentication using Supabase JWT tokens.

### Endpoints

1. **Content Ingestion**
   - `POST /functions/v1/ingest_github`
   - `POST /functions/v1/ingest_twitter`
   - `POST /functions/v1/ingest_reddit`
   - `POST /functions/v1/ingest_stack`

2. **AI Processing**
   - `POST /functions/v1/generate_summary`
   - `POST /functions/v1/semantic_search`

## Security

- Row Level Security (RLS) policies ensure users can only access their own data
- API keys are stored securely in environment variables
- OAuth tokens are encrypted in the database
- Rate limiting is implemented on all Edge Functions

## Monitoring

- Supabase Logs for database operations
- Edge Function logs for serverless operations
- OpenAI API usage monitoring
- Error tracking and alerting

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - see LICENSE file for details

# Telegram + n8n + Supabase Integration

A complete flow for syncing Telegram messages (with images) to Supabase via n8n automation.

## 🏗️ Architecture Overview

```
Telegram Bot → User clicks "Sync" → n8n Workflow → Supabase Edge Function → Database + Storage
```

## 📋 Components

1. **Telegram Bot**: Receives messages and shows "Sync" button
2. **n8n Workflow**: Processes callback queries and extracts message data
3. **Supabase Database**: Stores message metadata
4. **Supabase Storage**: Stores downloaded images
5. **Supabase Edge Function**: Handles data processing and storage

## 🚀 Setup Instructions

### 1. Supabase Setup

#### Database Schema
Run the SQL from `supabase_schema.sql`:
```bash
# In your Supabase SQL Editor
-- Creates telegram_messages and telegram_images tables
-- Includes indexes and RLS policies
```

#### Storage Configuration
Run the SQL from `supabase_storage_setup.sql`:
```bash
# Creates telegram-images bucket with proper policies
```

### 2. n8n Workflow Setup

Follow the detailed guide in `n8n_workflow_guide.md`:

1. **Telegram Trigger**: Listen for callback queries
2. **Data Extraction**: Parse message data
3. **Image Processing**: Download Telegram images
4. **HTTP Request**: Send to Supabase Edge Function
5. **Error Handling**: Log and respond to failures

### 3. Environment Variables

Set these in your n8n instance:
- `TELEGRAM_BOT_TOKEN`: Your bot token
- `SUPABASE_URL`: Your project URL
- `SUPABASE_SERVICE_ROLE_KEY`: Service role key for auth

## 📊 Data Flow

### Message Structure
```json
{
  "telegram_user_id": "987654321",
  "chat_id": "987654321", 
  "message_id": "456",
  "text": "Hello world!",
  "timestamp": "2023-12-21T10:30:56.000Z",
  "image_data": [
    {
      "file_id": "AgACAgIAAxkBAAIC...",
      "download_url": "https://api.telegram.org/file/bot.../photos/file_123.jpg",
      "file_path": "photos/file_123.jpg",
      "file_extension": "jpg",
      "width": 1280,
      "height": 720,
      "file_size": 45678
    }
  ]
}
```

### Storage Paths
- **Bucket**: `telegram-images`
- **Path Pattern**: `{user_id}/{message_id}_{timestamp}_{index}.{ext}`
- **Example**: `987654321/456_1703123456_0.jpg`

## 🔧 Field Mapping

See `telegram_field_mapping.md` for complete mapping between Telegram API fields and database columns.

| Telegram | Database | Notes |
|----------|----------|-------|
| `message.from.id` | `telegram_user_id` | String conversion |
| `message.chat.id` | `chat_id` | String conversion |
| `message.message_id` | `message_id` | Unique constraint |
| `message.text` | `text` | Nullable |
| `message.date` | `timestamp` | Unix → ISO conversion |
| `message.photo[]` | `image_urls` | Public URLs array |

## 🛠️ Key Features

- ✅ **Duplicate Prevention**: Unique constraint on `message_id`
- ✅ **Image Support**: Downloads and stores Telegram images
- ✅ **Error Handling**: Graceful failure handling
- ✅ **Future-Proof**: Supports multiple images per message
- ✅ **No JWT Auth**: Uses Service Role Key for simplicity
- ✅ **Public Storage**: Images are publicly accessible

## 🧪 Testing

Use the checklist in `n8n_workflow_guide.md`:
- [ ] Text-only messages
- [ ] Image messages  
- [ ] Multiple images
- [ ] Error scenarios
- [ ] Duplicate prevention

## 📁 File Structure

```
├── supabase_schema.sql          # Database tables and indexes
├── supabase_storage_setup.sql   # Storage bucket configuration  
├── telegram_field_mapping.md    # Field mapping guide
├── n8n_workflow_guide.md        # Complete n8n setup
└── README.md                    # This file
```

## 🔍 Troubleshooting

### Common Issues

1. **Images not downloading**: Check Telegram bot token and file permissions
2. **Duplicate key errors**: Message already exists, handle gracefully
3. **Storage upload fails**: Verify bucket policies and service role key
4. **Timeout errors**: Large images may need longer timeout settings

### Debug Tips

- Enable n8n workflow logging
- Check Supabase logs for Edge Function errors
- Verify Telegram webhook is receiving callback queries
- Test with small images first

## 🔐 Security Notes

- Service Role Key has full database access
- Images are stored in public bucket (no auth required)
- Consider adding rate limiting for production use
- Telegram file URLs expire after some time

## 📈 Scaling Considerations

- Add database indexes for query performance
- Consider CDN for image delivery
- Implement cleanup for old images
- Add monitoring and alerting
