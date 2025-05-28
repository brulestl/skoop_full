# OAuth Callback URL Setup for Production

## GitHub OAuth App Configuration

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click on your OAuth App (or create a new one if needed)
3. Update the **Authorization callback URL** to include both:
   - `http://localhost:3001/api/oauth/github/callback` (for development)
   - `https://skoop.pro/api/oauth/github/callback` (for production)

### GitHub OAuth App Settings:
- **Application name**: Skoop
- **Homepage URL**: `https://skoop.pro`
- **Authorization callback URL**: 
  ```
  http://localhost:3001/api/oauth/github/callback
  https://skoop.pro/api/oauth/github/callback
  ```

## Twitter/X OAuth App Configuration

1. Go to [X Developer Portal](https://developer.twitter.com/en/portal/dashboard)
2. Navigate to your app settings
3. Go to **Authentication settings**
4. Update the **Callback URLs** to include both:
   - `http://localhost:3001/api/oauth/twitter/callback` (for development)
   - `https://skoop.pro/api/oauth/twitter/callback` (for production)

### Twitter/X OAuth App Settings:
- **App permissions**: Read users, Read tweets (or as needed)
- **Type of App**: Web App
- **Callback URLs**:
  ```
  http://localhost:3001/api/oauth/twitter/callback
  https://skoop.pro/api/oauth/twitter/callback
  ```
- **Website URL**: `https://skoop.pro`

## Environment Variables

Make sure these are set in your Vercel dashboard:

### Required for GitHub OAuth:
- `GITHUB_CLIENT_ID` - Your GitHub OAuth app client ID
- `GITHUB_CLIENT_SECRET` - Your GitHub OAuth app client secret
- `NEXT_PUBLIC_GITHUB_CLIENT_ID` - Same as GITHUB_CLIENT_ID (for client-side)

### Required for Twitter OAuth:
- `TWITTER_CLIENT_ID` - Your Twitter OAuth app client ID  
- `TWITTER_CLIENT_SECRET` - Your Twitter OAuth app client secret
- `NEXT_PUBLIC_TWITTER_CLIENT_ID` - Same as TWITTER_CLIENT_ID (for client-side)

### General:
- `NEXT_PUBLIC_SITE_URL=https://skoop.pro`

## Testing

After updating the callback URLs:

1. **Local Development**: Test OAuth flows on `http://localhost:3001`
2. **Production**: Test OAuth flows on `https://skoop.pro`

The code will automatically detect the environment and use the correct callback URL.

## Notes

- GitHub allows multiple callback URLs in a single OAuth app
- Twitter/X supports up to 10 callback URLs per app
- The code automatically detects if running on `skoop.pro` and uses the production callback URL
- For any other domain (localhost, ngrok, etc.), it uses the current host as the callback URL 