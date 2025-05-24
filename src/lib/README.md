# Supabase Client Configuration

This directory contains the unified Supabase client configuration for the SKOOP application.

## Files

- **`supabase.ts`** - Main client-side Supabase client with session persistence
- **`supabase-server.ts`** - Server-side Supabase client for SSR/SSG
- **`index.ts`** - Convenient re-exports for all Supabase functionality
- **`../types/database.types.ts`** - Generated TypeScript types from Supabase schema

## Usage

### Client-Side Usage

```typescript
import { supabase, getCurrentUser, signOut } from '@/lib/supabase'

// Use the configured client
const { data, error } = await supabase
  .from('your_table')
  .select('*')

// Get current user
const user = await getCurrentUser()

// Sign out
await signOut()
```

### Server-Side Usage (App Router)

```typescript
import { createClient } from '@/lib/supabase-server'

export default async function ServerComponent() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('your_table')
    .select('*')
  
  return <div>{/* Your component */}</div>
}
```

### Middleware Usage

```typescript
import { createMiddlewareClient } from '@/lib/supabase-server'
import { NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const supabase = createMiddlewareClient()
  const { data: { session } } = await supabase.auth.getSession()
  
  // Your middleware logic
  return NextResponse.next()
}
```

### Type Safety

All clients are fully typed with your database schema:

```typescript
import type { Database, Tables } from '@/lib/supabase'

// Tables type gives you full type safety for your database tables
type User = Tables<'users'>
type Bookmark = Tables<'bookmarks'>
```

## Environment Variables

Make sure to set these environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key # Optional
```

## Generating Database Types

To generate/update your database types:

```bash
npx supabase gen types typescript --local > src/types/database.types.ts
```

Or for production:

```bash
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/database.types.ts
```

## Features

- ✅ **Session Persistence** - Sessions are automatically persisted in localStorage
- ✅ **Auto-refresh** - Tokens are automatically refreshed
- ✅ **SSR/SSG Support** - Server-side rendering with proper cookie handling
- ✅ **Type Safety** - Full TypeScript support with generated database types
- ✅ **Real-time** - Configured for Supabase real-time subscriptions
- ✅ **Helper Functions** - Convenient functions for common auth operations 