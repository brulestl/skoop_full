#!/bin/bash

# Test script for Twitter bookmark implementation
# Usage: ./test_twitter_bookmarks.sh [ACCESS_TOKEN]

set -e

echo "🐦 Testing Twitter Bookmark Implementation"
echo "=========================================="

# Check if access token is provided
if [ -z "$1" ]; then
    echo "❌ Error: Please provide a Twitter access token"
    echo "Usage: $0 <ACCESS_TOKEN>"
    exit 1
fi

ACCESS_TOKEN="$1"
echo "✅ Using provided access token"

# Test 1: Verify user endpoint works
echo ""
echo "📋 Test 1: Checking user endpoint access..."
USER_RESPONSE=$(curl -s -w "%{http_code}" -H "Authorization: Bearer $ACCESS_TOKEN" \
    "https://api.twitter.com/2/users/me?user.fields=id" -o /tmp/user_response.json)

HTTP_CODE="${USER_RESPONSE: -3}"
if [ "$HTTP_CODE" = "200" ]; then
    echo "✅ User endpoint accessible (HTTP $HTTP_CODE)"
    USER_ID=$(cat /tmp/user_response.json | grep -o '"id":"[^"]*"' | cut -d'"' -f4)
    echo "   User ID: $USER_ID"
else
    echo "❌ User endpoint failed (HTTP $HTTP_CODE)"
    cat /tmp/user_response.json
    exit 1
fi

# Test 2: Check bookmark endpoint access
echo ""
echo "📚 Test 2: Checking bookmark endpoint access..."
BOOKMARK_RESPONSE=$(curl -s -w "%{http_code}" -H "Authorization: Bearer $ACCESS_TOKEN" \
    "https://api.twitter.com/2/users/$USER_ID/bookmarks?max_results=5" -o /tmp/bookmark_response.json)

HTTP_CODE="${BOOKMARK_RESPONSE: -3}"
if [ "$HTTP_CODE" = "200" ]; then
    echo "✅ Bookmark endpoint accessible (HTTP $HTTP_CODE)"
    BOOKMARK_COUNT=$(cat /tmp/bookmark_response.json | grep -o '"data":\[' | wc -l)
    if [ "$BOOKMARK_COUNT" -gt 0 ]; then
        echo "   Found bookmarks in response"
    else
        echo "   No bookmarks found (user may not have any bookmarks)"
    fi
elif [ "$HTTP_CODE" = "401" ]; then
    echo "❌ Bookmark endpoint unauthorized (HTTP $HTTP_CODE)"
    echo "   This likely means the token lacks 'bookmark.read' scope"
    cat /tmp/bookmark_response.json
    exit 1
elif [ "$HTTP_CODE" = "403" ]; then
    echo "❌ Bookmark endpoint forbidden (HTTP $HTTP_CODE)"
    echo "   This likely means the app lacks Elevated access"
    cat /tmp/bookmark_response.json
    exit 1
else
    echo "❌ Bookmark endpoint failed (HTTP $HTTP_CODE)"
    cat /tmp/bookmark_response.json
    exit 1
fi

# Test 3: Verify scope in token (if JWT)
echo ""
echo "🔍 Test 3: Checking token scope..."
if [[ "$ACCESS_TOKEN" == *.* ]]; then
    echo "   Token appears to be JWT format"
    # Extract payload (second part of JWT)
    PAYLOAD=$(echo "$ACCESS_TOKEN" | cut -d'.' -f2)
    # Add padding if needed
    PADDED_PAYLOAD="$PAYLOAD$(printf '%*s' $((4 - ${#PAYLOAD} % 4)) '' | tr ' ' '=')"
    # Decode base64
    DECODED=$(echo "$PADDED_PAYLOAD" | base64 -d 2>/dev/null || echo "Failed to decode")
    
    if echo "$DECODED" | grep -q "bookmark.read"; then
        echo "✅ Token contains 'bookmark.read' scope"
    else
        echo "⚠️  Could not verify 'bookmark.read' scope in token"
        echo "   This might be expected for opaque tokens"
    fi
else
    echo "   Token appears to be opaque (not JWT)"
    echo "   Scope verification not possible with opaque tokens"
fi

# Cleanup
rm -f /tmp/user_response.json /tmp/bookmark_response.json

echo ""
echo "🎉 Twitter bookmark implementation test completed!"
echo ""
echo "Next steps:"
echo "1. Update Twitter Developer Portal with bookmark.read scope"
echo "2. Run SQL script to expire existing tokens: scripts/expire_twitter_tokens.sql"
echo "3. Test the edge function with a real user token"
echo "4. Verify UI shows 'Reconnect' for expired Twitter accounts" 