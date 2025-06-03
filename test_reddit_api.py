#!/usr/bin/env python3
"""
Reddit API Scope Testing Script
This script helps debug Reddit OAuth scope issues by testing API endpoints directly.
"""

import requests
import sys

def test_reddit_endpoint(access_token, endpoint, description):
    """Test a Reddit API endpoint with the given access token."""
    print(f"\n🔍 Testing: {description}")
    print(f"📡 Endpoint: {endpoint}")
    
    headers = {
        'Authorization': f'Bearer {access_token}',
        'User-Agent': 'web:com.skoop.app:v1.0.0 (by /u/skoop_support)'
    }
    
    try:
        response = requests.get(endpoint, headers=headers)
        print(f"📊 Status: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Success! Response keys: {list(data.keys())}")
            if 'data' in data and 'children' in data['data']:
                print(f"📈 Items found: {len(data['data']['children'])}")
        else:
            print(f"❌ Error: {response.status_code}")
            try:
                error_data = response.json()
                print(f"🔍 Error details: {error_data}")
            except:
                print(f"🔍 Error text: {response.text}")
                
    except Exception as e:
        print(f"💥 Exception: {e}")

def main():
    if len(sys.argv) != 2:
        print("Usage: python test_reddit_api.py <ACCESS_TOKEN>")
        print("\nGet your access token from the connected_accounts table in Supabase")
        sys.exit(1)
    
    access_token = sys.argv[1]
    
    print("🔴 Reddit API Scope Testing")
    print("="*50)
    
    # Test 1: User info (should work with 'identity' scope)
    test_reddit_endpoint(
        access_token,
        "https://oauth.reddit.com/api/v1/me",
        "User Info (identity scope)"
    )
    
    # Test 2: User overview (requires 'history' scope)
    test_reddit_endpoint(
        access_token,
        "https://oauth.reddit.com/user/me/overview",
        "User Overview (history scope)"
    )
    
    # Test 3: Saved items - various endpoints
    endpoints_to_test = [
        ("https://oauth.reddit.com/user/me/saved", "Saved Items - /user/me/saved"),
        ("https://oauth.reddit.com/user/me/saved.json", "Saved Items - /user/me/saved.json"),
        ("https://oauth.reddit.com/u/me/saved", "Saved Items - /u/me/saved"),
        ("https://oauth.reddit.com/u/me/saved.json", "Saved Items - /u/me/saved.json"),
    ]
    
    for endpoint, description in endpoints_to_test:
        test_reddit_endpoint(access_token, endpoint, description)
    
    print("\n" + "="*50)
    print("🎯 Diagnosis Guide:")
    print("- If user info works but saved items fail: Missing 'history' or 'save' scopes")
    print("- If all endpoints fail: Token expired or invalid")
    print("- If 403 errors: App doesn't have required permissions")
    print("- If 400 errors: Wrong endpoint or scope issues")

if __name__ == "__main__":
    main() 