# OAuth Callback URL Setup Guide

## GitHub OAuth App Configuration

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click on your OAuth App (or create a new one)
3. Set the **Authorization callback URL** to BOTH:
   - `https://skoop.pro/api/oauth/github/callback`
   - `https://skoop-full.vercel.app/api/oauth/github/callback`

**Note**: GitHub allows multiple callback URLs separated by newlines.

## Twitter OAuth App Configuration

1. Go to [Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard)
2. Select your app and go to "App settings" → "Authentication settings"
3. Set **Callback URI / Redirect URL** to BOTH:
   - `https://skoop.pro/api/oauth/twitter/callback`
   - `https://skoop-full.vercel.app/api/oauth/twitter/callback`

**Note**: Twitter allows multiple callback URLs in the same field, separated by commas.

## Environment Variables Required

Make sure these are set in your Vercel dashboard:

```
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
TWITTER_CLIENT_ID=your_twitter_client_id  
TWITTER_CLIENT_SECRET=your_twitter_client_secret
NEXT_PUBLIC_GITHUB_CLIENT_ID=your_github_client_id
NEXT_PUBLIC_TWITTER_CLIENT_ID=your_twitter_client_id
```

## Testing URLs

- Production: `https://skoop.pro`
- Vercel: `https://skoop-full.vercel.app`
- Local: `http://localhost:3000` (for development)

Both production URLs should work with the same OAuth app configuration.

## Notes

- GitHub allows multiple callback URLs in a single OAuth app
- Twitter/X supports up to 10 callback URLs per app
- The code automatically detects if running on `skoop.pro` and uses the production callback URL
- For any other domain (localhost, ngrok, etc.), it uses the current host as the callback URL 