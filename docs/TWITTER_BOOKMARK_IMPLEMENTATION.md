# Twitter Bookmark Implementation Guide

This document outlines the implementation of Twitter bookmark functionality following tasks T-TW-BOOK-1, T-TW-BOOK-2, and T-TW-BOOK-3.

## Overview

The Twitter API requires the `bookmark.read` scope and **Elevated** access to fetch user bookmarks via the `/users/:id/bookmarks` endpoint. This implementation adds the necessary scope, forces users to re-authenticate, and updates the edge function to fetch bookmarks.

## Task T-TW-BOOK-1: Add "bookmark.read" Scope to Twitter App

### Changes Made

1. **Updated OAuth Start Route** (`src/app/api/oauth/twitter/start/route.ts`):
   ```typescript
   twitterAuthUrl.searchParams.set('scope', 'tweet.read users.read offline.access bookmark.read');
   ```

2. **Updated Scope Configuration** (`src/hooks/useConnectedAccounts.ts`):
   ```typescript
   twitter: 'tweet.read,users.read,like.read,bookmark.read,offline.access',
   ```

### Twitter Developer Portal Setup Required

1. Go to [Twitter Developer Portal](https://developer.twitter.com/)
2. Navigate to your app → "User authentication settings"
3. Enable the following scopes:
   - ✅ `tweet.read`
   - ✅ `users.read` 
   - ✅ `offline.access`
   - ✅ `bookmark.read` ← **NEW**
4. Ensure your app has **Elevated** access (required for bookmarks API)
5. Save settings and regenerate OAuth 2.0 Client Secret if prompted
6. Update Vercel environment variable: `TWITTER_CLIENT_SECRET=<new_secret>`

### Testing the Scope

```bash
# Test that the user endpoint works with new token
curl -H "Authorization: Bearer $ACCESS_TOKEN" \
     https://api.twitter.com/2/users/me?user.fields=id

# Verify the JWT token includes bookmark.read in scope claim
# (Use JWT decoder to inspect the token)
```

## Task T-TW-BOOK-2: Force Users to Re-link Twitter with New Scopes

### Problem
Existing tokens lack the new `bookmark.read` scope and will fail when trying to access the bookmarks endpoint.

### Solution
Run the SQL script to expire all existing Twitter connections:

```sql
-- File: scripts/expire_twitter_tokens.sql
UPDATE connected_accounts
SET 
  status = 'expired',
  last_error = 'scope_upgrade',
  updated_at = NOW()
WHERE provider = 'twitter'
  AND status = 'active';
```

### User Experience
1. Users with expired Twitter connections see "Reconnect" button in Profile UI
2. Clicking "Reconnect" initiates new OAuth flow with updated scopes
3. New consent screen shows the additional `bookmark.read` permission
4. After re-authentication, `connected_accounts.status` becomes `'active'`

### Testing
```sql
-- Verify expired accounts
SELECT user_id, provider, status, last_error, updated_at
FROM connected_accounts 
WHERE provider = 'twitter'
ORDER BY updated_at DESC;

-- After user re-connects, verify active status
SELECT user_id, provider, status, scope, updated_at
FROM connected_accounts 
WHERE provider = 'twitter' AND status = 'active';
```

## Task T-TW-BOOK-3: Update Edge Function to Fetch Bookmarks

### Implementation Details

The updated `supabase/functions/ingest_twitter/index.ts` now:

1. **Fetches User ID**: Calls `/users/me` to get the authenticated user's Twitter ID
2. **Fetches Bookmarks**: Uses `/users/:id/bookmarks` with comprehensive tweet fields
3. **Processes Data**: Stores both raw and processed bookmark data
4. **Error Handling**: Distinguishes between auth errors (401) and other API errors

### API Endpoints Used

```typescript
// Get authenticated user info
GET https://api.twitter.com/2/users/me

// Fetch user bookmarks (requires Elevated access + bookmark.read scope)
GET https://api.twitter.com/2/users/{id}/bookmarks
  ?tweet.fields=id,text,author_id,created_at,public_metrics,context_annotations
  &user.fields=id,name,username
  &expansions=author_id
  &max_results=100
```

### Data Storage

**Raw Data** (`bookmarks_raw` table):
```json
{
  "id": "1234567890",
  "text": "This is an amazing tweet!",
  "author_id": "987654321",
  "author_name": "John Doe",
  "author_username": "johndoe",
  "created_at": "2024-01-15T10:30:00.000Z",
  "public_metrics": { "like_count": 42, "retweet_count": 7 },
  "url": "https://twitter.com/johndoe/status/1234567890",
  "fetched_at": "2024-01-15T12:00:00.000Z"
}
```

**Processed Data** (`bookmarks` table):
- `url`: Direct link to the tweet
- `title`: First 100 characters of tweet text
- `description`: Full tweet text
- `summary`: Formatted as "Tweet by @username: text"
- `tags`: `['twitter', 'bookmark']`

### Error Handling

The function handles various error scenarios:

1. **401 Unauthorized**: Token expired or lacks scope → `status = 'expired'`
2. **403 Forbidden**: App lacks Elevated access → `status = 'error'`
3. **Other API Errors**: Network/rate limit issues → `status = 'error'`

### Testing the Edge Function

```bash
# Test the edge function directly
curl -X POST https://your-project.supabase.co/functions/v1/ingest_twitter \
  -H "Authorization: Bearer $USER_JWT_TOKEN" \
  -H "Content-Type: application/json"

# Expected success response:
{
  "count": 25,
  "message": "Successfully synced 25 Twitter bookmarks"
}

# Expected error responses:
{
  "error": "Twitter access token expired or lacks bookmark.read scope",
  "count": 0
}
```

## Integration with UI

The bookmark sync integrates with the existing UI components:

1. **Profile Page**: Shows Twitter connection status and "Reconnect" for expired accounts
2. **Sync Button**: Triggers the edge function via `/api/sync/twitter` endpoint
3. **Dashboard**: Displays fetched bookmarks in the Twitter column

### UI Flow
1. User clicks "Sync" button for Twitter
2. Frontend calls `/api/sync/twitter` 
3. Backend invokes the edge function
4. Success: Shows "✅ Synced X bookmarks from twitter!"
5. Error: Shows specific error message and updates account status

## Troubleshooting

### Common Issues

1. **"Twitter API access denied"**
   - Ensure app has **Elevated** access in Twitter Developer Portal
   - Verify `bookmark.read` scope is enabled

2. **"Token expired or lacks scope"**
   - User needs to reconnect their Twitter account
   - Check that new tokens include `bookmark.read` scope

3. **"No bookmarks found"**
   - User may not have any bookmarks
   - Verify the user has bookmarked tweets in their Twitter account

### Verification Steps

```sql
-- Check connection status
SELECT user_id, provider, status, last_error, last_sync_at
FROM connected_accounts 
WHERE provider = 'twitter';

-- Check fetched bookmarks
SELECT user_id, source, COUNT(*) as bookmark_count
FROM bookmarks_raw 
WHERE source = 'twitter'
GROUP BY user_id, source;

-- Check processed bookmarks
SELECT user_id, url, title, tags
FROM bookmarks 
WHERE tags @> ARRAY['twitter']
ORDER BY created_at DESC
LIMIT 10;
```

## Security Considerations

1. **Scope Minimization**: Only request necessary permissions
2. **Token Storage**: Supabase handles encryption of access tokens
3. **Error Logging**: Sensitive token data is not logged
4. **Rate Limiting**: Twitter API has rate limits (300 requests per 15 minutes for bookmarks)

## Future Enhancements

1. **Pagination**: Handle users with >100 bookmarks
2. **Incremental Sync**: Only fetch new bookmarks since last sync
3. **Real-time Updates**: Webhook integration for immediate bookmark sync
4. **Bookmark Management**: Allow users to remove/organize synced bookmarks 