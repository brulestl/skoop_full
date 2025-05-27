# OAuth Setup Guide for SKOOP

This guide explains how to set up OAuth providers in Supabase to enable the "Connect Account" functionality in SKOOP.

## Overview

The OAuth connect functionality allows users to link their external accounts (GitHub, Twitter, Reddit, Stack Overflow) to SKOOP, enabling the platform to fetch and organize their saved content from these services.

## Prerequisites

- Supabase project set up
- OAuth provider applications created
- Database schema includes `connected_accounts` table

## Setting Up OAuth Providers in Supabase

### 1. Access Supabase Authentication Settings

1. Go to your Supabase project dashboard
2. Navigate to "Authentication" → "Providers"
3. Configure each provider you want to enable

### 2. GitHub Setup

1. **Create GitHub OAuth App:**
   - Go to GitHub Settings → Developer settings → OAuth Apps
   - Click "New OAuth App"
   - Fill in the details:
     - Application name: "SKOOP"
     - Homepage URL: `https://yourdomain.com`
     - Authorization callback URL: `https://your-supabase-project.supabase.co/auth/v1/callback`

2. **Configure in Supabase:**
   - Enable GitHub provider
   - Add Client ID and Client Secret from GitHub
   - Set scopes: `read:user,repo,user:email`

### 3. Twitter Setup

1. **Create Twitter App:**
   - Go to [Twitter Developer Portal](https://developer.twitter.com/)
   - Create a new project/app
   - Enable OAuth 2.0
   - Set callback URL: `https://your-supabase-project.supabase.co/auth/v1/callback`

2. **Configure in Supabase:**
   - Enable Twitter provider
   - Add Client ID and Client Secret
   - Set scopes: `read,write`

### 4. Reddit Setup

1. **Create Reddit App:**
   - Go to [Reddit App Preferences](https://www.reddit.com/prefs/apps)
   - Create a new "web app"
   - Set redirect URI: `https://your-supabase-project.supabase.co/auth/v1/callback`

2. **Configure in Supabase:**
   - Enable Reddit provider
   - Add Client ID and Client Secret
   - Set scopes: `read,history,identity`

### 5. Stack Overflow Setup

1. **Create Stack Apps Application:**
   - Go to [Stack Apps](https://stackapps.com/apps/oauth/register)
   - Register a new application
   - Set OAuth Domain: `your-supabase-project.supabase.co`

2. **Configure in Supabase:**
   - Enable Stack Overflow provider (as "stackoverflow")
   - Add Client ID and Client Secret
   - Set scopes: `read_inbox,no_expiry`

## Database Schema

Ensure your `connected_accounts` table exists:

```sql
CREATE TABLE public.connected_accounts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    provider provider_type NOT NULL,
    access_token TEXT NOT NULL,
    refresh_token TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, provider)
);

-- Ensure the provider_type enum includes all providers
CREATE TYPE provider_type AS ENUM ('github', 'twitter', 'reddit', 'stack');
```

## Environment Variables

Make sure your `.env.local` includes:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Testing the OAuth Flow

1. **Start Development Server:**
   ```bash
   npm run dev
   ```

2. **Test OAuth Connection:**
   - Navigate to `/dashboard/profile`
   - Click "Connect" for any provider
   - Complete OAuth authorization
   - Verify account appears as connected

## Troubleshooting

### Common Issues

1. **OAuth Redirect Mismatch:**
   - Ensure callback URLs match exactly in provider settings
   - Check for trailing slashes

2. **Scope Permissions:**
   - Verify scopes are correctly set in Supabase
   - Some providers require specific scope formats

3. **Token Storage Issues:**
   - Check database RLS policies allow token insertion
   - Verify `connected_accounts` table exists

4. **Provider Not Available:**
   - Ensure provider is enabled in Supabase
   - Check client credentials are valid

### Debug Mode

Enable debug logging in your OAuth callback:

```typescript
// In src/app/auth/callback/route.ts
console.log('OAuth session data:', data.session);
console.log('Provider token:', data.session?.provider_token);
```

## Security Considerations

1. **Token Storage:**
   - Access tokens are stored encrypted in the database
   - Only the authenticated user can access their tokens via RLS

2. **Scopes:**
   - Request minimal required scopes
   - Regularly audit and update scope requirements

3. **Token Refresh:**
   - Implement refresh token logic for long-lived access
   - Handle token expiration gracefully

## Next Steps

After OAuth setup is complete:

1. Implement data fetching services for each provider
2. Set up background jobs for content synchronization
3. Add rate limiting for API calls to external services
4. Implement error handling for expired/revoked tokens 