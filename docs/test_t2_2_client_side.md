# T2.2 Client-Side Testing Guide: Cross-User Data Isolation

## Overview
This guide provides comprehensive client-side tests to verify that all tables properly prevent cross-user data access using the Supabase client with anon key.

## Test Setup

### 1. Create Test Users
Create two test users in your application:

```typescript
// Test users for T2.2
const testUser1 = {
  email: 'testuser1-t2@example.com',
  password: 'testpassword123'
};

const testUser2 = {
  email: 'testuser2-t2@example.com', 
  password: 'testpassword123'
};
```

### 2. Test Data Setup
For each test user, create sample data in each table to test isolation.

## Test Scripts

### Test 1: Bookmarks Table Isolation

```typescript
// test-bookmarks-isolation.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function testBookmarksIsolation() {
  console.log('🔖 Testing Bookmarks Table Isolation...');

  // Sign in as User 1
  const { data: user1Auth } = await supabase.auth.signInWithPassword({
    email: 'testuser1-t2@example.com',
    password: 'testpassword123'
  });

  // Create a bookmark as User 1
  const { data: bookmark1, error: createError } = await supabase
    .from('bookmarks')
    .insert({
      url: 'https://example.com/user1-bookmark',
      title: 'User 1 Test Bookmark',
      description: 'This should only be visible to User 1'
    })
    .select()
    .single();

  if (createError) {
    console.error('❌ Failed to create bookmark:', createError);
    return;
  }

  console.log('✅ User 1 created bookmark:', bookmark1.id);

  // Sign out and sign in as User 2
  await supabase.auth.signOut();
  const { data: user2Auth } = await supabase.auth.signInWithPassword({
    email: 'testuser2-t2@example.com',
    password: 'testpassword123'
  });

  // Try to access User 1's bookmark
  const { data: bookmarks, error } = await supabase
    .from('bookmarks')
    .select('*')
    .eq('id', bookmark1.id);

  if (error) {
    console.error('❌ Error accessing bookmarks:', error);
  } else if (bookmarks.length === 0) {
    console.log('✅ SUCCESS: User 2 cannot see User 1\'s bookmark');
  } else {
    console.log('❌ FAILURE: User 2 can see User 1\'s bookmark');
  }

  // Try to update User 1's bookmark
  const { error: updateError } = await supabase
    .from('bookmarks')
    .update({ title: 'Hacked by User 2' })
    .eq('id', bookmark1.id);

  if (updateError) {
    console.log('✅ SUCCESS: User 2 blocked from updating User 1\'s bookmark');
  } else {
    console.log('❌ FAILURE: User 2 was able to update User 1\'s bookmark');
  }

  // Try to delete User 1's bookmark
  const { error: deleteError } = await supabase
    .from('bookmarks')
    .delete()
    .eq('id', bookmark1.id);

  if (deleteError) {
    console.log('✅ SUCCESS: User 2 blocked from deleting User 1\'s bookmark');
  } else {
    console.log('❌ FAILURE: User 2 was able to delete User 1\'s bookmark');
  }

  await supabase.auth.signOut();
}

testBookmarksIsolation();
```

### Test 2: Collections Table Isolation

```typescript
// test-collections-isolation.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function testCollectionsIsolation() {
  console.log('📁 Testing Collections Table Isolation...');

  // Sign in as User 1
  await supabase.auth.signInWithPassword({
    email: 'testuser1-t2@example.com',
    password: 'testpassword123'
  });

  // Create a collection as User 1
  const { data: collection1, error: createError } = await supabase
    .from('collections')
    .insert({
      name: 'User 1 Private Collection',
      type: 'manual',
      description: 'This should only be visible to User 1'
    })
    .select()
    .single();

  if (createError) {
    console.error('❌ Failed to create collection:', createError);
    return;
  }

  console.log('✅ User 1 created collection:', collection1.id);

  // Sign out and sign in as User 2
  await supabase.auth.signOut();
  await supabase.auth.signInWithPassword({
    email: 'testuser2-t2@example.com',
    password: 'testpassword123'
  });

  // Try to access User 1's collection
  const { data: collections, error } = await supabase
    .from('collections')
    .select('*')
    .eq('id', collection1.id);

  if (error) {
    console.error('❌ Error accessing collections:', error);
  } else if (collections.length === 0) {
    console.log('✅ SUCCESS: User 2 cannot see User 1\'s collection');
  } else {
    console.log('❌ FAILURE: User 2 can see User 1\'s collection');
  }

  // Test malicious operations
  const { error: updateError } = await supabase
    .from('collections')
    .update({ name: 'Hacked Collection' })
    .eq('id', collection1.id);

  if (updateError) {
    console.log('✅ SUCCESS: User 2 blocked from updating User 1\'s collection');
  } else {
    console.log('❌ FAILURE: User 2 was able to update User 1\'s collection');
  }

  await supabase.auth.signOut();
}

testCollectionsIsolation();
```

### Test 3: Bookmarks Raw Table Isolation

```typescript
// test-bookmarks-raw-isolation.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function testBookmarksRawIsolation() {
  console.log('📄 Testing Bookmarks Raw Table Isolation...');

  // Sign in as User 1
  await supabase.auth.signInWithPassword({
    email: 'testuser1-t2@example.com',
    password: 'testpassword123'
  });

  // Create raw bookmark data as User 1
  const { data: rawBookmark1, error: createError } = await supabase
    .from('bookmarks_raw')
    .insert({
      source: 'github',
      raw_json: { repo: 'user1/secret-repo', stars: 100 }
    })
    .select()
    .single();

  if (createError) {
    console.error('❌ Failed to create raw bookmark:', createError);
    return;
  }

  console.log('✅ User 1 created raw bookmark:', rawBookmark1.id);

  // Sign out and sign in as User 2
  await supabase.auth.signOut();
  await supabase.auth.signInWithPassword({
    email: 'testuser2-t2@example.com',
    password: 'testpassword123'
  });

  // Try to access User 1's raw bookmark data
  const { data: rawBookmarks, error } = await supabase
    .from('bookmarks_raw')
    .select('*')
    .eq('id', rawBookmark1.id);

  if (error) {
    console.error('❌ Error accessing raw bookmarks:', error);
  } else if (rawBookmarks.length === 0) {
    console.log('✅ SUCCESS: User 2 cannot see User 1\'s raw bookmark data');
  } else {
    console.log('❌ FAILURE: User 2 can see User 1\'s raw bookmark data');
  }

  await supabase.auth.signOut();
}

testBookmarksRawIsolation();
```

### Test 4: Content Columns & Fresh Content Isolation

```typescript
// test-content-isolation.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function testContentIsolation() {
  console.log('📊 Testing Content Tables Isolation...');

  // Sign in as User 1
  await supabase.auth.signInWithPassword({
    email: 'testuser1-t2@example.com',
    password: 'testpassword123'
  });

  // Create content column as User 1
  const { data: contentColumn1, error: createColumnError } = await supabase
    .from('content_columns')
    .insert({
      provider: 'github',
      query: 'javascript frameworks',
      label: 'User 1 JS Frameworks',
      config: { private: true }
    })
    .select()
    .single();

  if (createColumnError) {
    console.error('❌ Failed to create content column:', createColumnError);
    return;
  }

  // Create fresh content as User 1
  const { data: freshContent1, error: createContentError } = await supabase
    .from('fresh_content')
    .insert({
      column_id: contentColumn1.id,
      payload: { title: 'Secret Framework', url: 'https://secret.com' },
      summary: 'User 1 private content'
    })
    .select()
    .single();

  if (createContentError) {
    console.error('❌ Failed to create fresh content:', createContentError);
    return;
  }

  console.log('✅ User 1 created content column and fresh content');

  // Sign out and sign in as User 2
  await supabase.auth.signOut();
  await supabase.auth.signInWithPassword({
    email: 'testuser2-t2@example.com',
    password: 'testpassword123'
  });

  // Try to access User 1's content columns
  const { data: contentColumns, error: columnError } = await supabase
    .from('content_columns')
    .select('*')
    .eq('id', contentColumn1.id);

  if (columnError) {
    console.error('❌ Error accessing content columns:', columnError);
  } else if (contentColumns.length === 0) {
    console.log('✅ SUCCESS: User 2 cannot see User 1\'s content columns');
  } else {
    console.log('❌ FAILURE: User 2 can see User 1\'s content columns');
  }

  // Try to access User 1's fresh content
  const { data: freshContent, error: contentError } = await supabase
    .from('fresh_content')
    .select('*')
    .eq('id', freshContent1.id);

  if (contentError) {
    console.error('❌ Error accessing fresh content:', contentError);
  } else if (freshContent.length === 0) {
    console.log('✅ SUCCESS: User 2 cannot see User 1\'s fresh content');
  } else {
    console.log('❌ FAILURE: User 2 can see User 1\'s fresh content');
  }

  await supabase.auth.signOut();
}

testContentIsolation();
```

### Test 5: Collection Items JOIN-based Policy

```typescript
// test-collection-items-isolation.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function testCollectionItemsIsolation() {
  console.log('🔗 Testing Collection Items JOIN-based Policy...');

  // Sign in as User 1
  await supabase.auth.signInWithPassword({
    email: 'testuser1-t2@example.com',
    password: 'testpassword123'
  });

  // Create collection and bookmark as User 1
  const { data: collection } = await supabase
    .from('collections')
    .insert({ name: 'Test Collection', type: 'manual' })
    .select()
    .single();

  const { data: bookmark } = await supabase
    .from('bookmarks')
    .insert({ url: 'https://test.com', title: 'Test Bookmark' })
    .select()
    .single();

  // Add bookmark to collection
  const { data: collectionItem, error: createError } = await supabase
    .from('collection_items')
    .insert({
      collection_id: collection.id,
      bookmark_id: bookmark.id
    })
    .select()
    .single();

  if (createError) {
    console.error('❌ Failed to create collection item:', createError);
    return;
  }

  console.log('✅ User 1 created collection item');

  // Sign out and sign in as User 2
  await supabase.auth.signOut();
  await supabase.auth.signInWithPassword({
    email: 'testuser2-t2@example.com',
    password: 'testpassword123'
  });

  // Try to access User 1's collection items
  const { data: collectionItems, error } = await supabase
    .from('collection_items')
    .select('*')
    .eq('collection_id', collection.id);

  if (error) {
    console.error('❌ Error accessing collection items:', error);
  } else if (collectionItems.length === 0) {
    console.log('✅ SUCCESS: User 2 cannot see User 1\'s collection items');
  } else {
    console.log('❌ FAILURE: User 2 can see User 1\'s collection items');
  }

  // Try to add item to User 1's collection (should fail)
  const { error: insertError } = await supabase
    .from('collection_items')
    .insert({
      collection_id: collection.id,
      bookmark_id: bookmark.id
    });

  if (insertError) {
    console.log('✅ SUCCESS: User 2 blocked from adding to User 1\'s collection');
  } else {
    console.log('❌ FAILURE: User 2 was able to add to User 1\'s collection');
  }

  await supabase.auth.signOut();
}

testCollectionItemsIsolation();
```

### Test 6: Public Sharing Functionality

```typescript
// test-public-sharing.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function testPublicSharing() {
  console.log('🌐 Testing Public Sharing Functionality...');

  // Sign in as User 1
  await supabase.auth.signInWithPassword({
    email: 'testuser1-t2@example.com',
    password: 'testpassword123'
  });

  // Create a public bookmark
  const { data: publicBookmark } = await supabase
    .from('bookmarks')
    .insert({
      url: 'https://public-example.com',
      title: 'Public Bookmark',
      is_public: true
    })
    .select()
    .single();

  // Create a public collection
  const { data: publicCollection } = await supabase
    .from('collections')
    .insert({
      name: 'Public Collection',
      type: 'manual',
      is_public: true
    })
    .select()
    .single();

  console.log('✅ User 1 created public bookmark and collection');

  // Sign out and sign in as User 2
  await supabase.auth.signOut();
  await supabase.auth.signInWithPassword({
    email: 'testuser2-t2@example.com',
    password: 'testpassword123'
  });

  // User 2 should be able to see public items
  const { data: publicBookmarks } = await supabase
    .from('bookmarks')
    .select('*')
    .eq('is_public', true);

  const { data: publicCollections } = await supabase
    .from('collections')
    .select('*')
    .eq('is_public', true);

  console.log(`✅ User 2 can see ${publicBookmarks.length} public bookmarks`);
  console.log(`✅ User 2 can see ${publicCollections.length} public collections`);

  // Sign out completely
  await supabase.auth.signOut();

  // Unauthenticated users should also see public items
  const { data: unauthBookmarks } = await supabase
    .from('bookmarks')
    .select('*')
    .eq('is_public', true);

  const { data: unauthCollections } = await supabase
    .from('collections')
    .select('*')
    .eq('is_public', true);

  console.log(`✅ Unauthenticated users can see ${unauthBookmarks.length} public bookmarks`);
  console.log(`✅ Unauthenticated users can see ${unauthCollections.length} public collections`);
}

testPublicSharing();
```

## Running All Tests

### Master Test Runner

```typescript
// run-all-t2-2-tests.ts
import { createClient } from '@supabase/supabase-js';

async function runAllT22Tests() {
  console.log('🚀 Starting T2.2 Comprehensive RLS Tests...\n');

  const tests = [
    () => import('./test-bookmarks-isolation'),
    () => import('./test-collections-isolation'),
    () => import('./test-bookmarks-raw-isolation'),
    () => import('./test-content-isolation'),
    () => import('./test-collection-items-isolation'),
    () => import('./test-public-sharing')
  ];

  for (let i = 0; i < tests.length; i++) {
    try {
      console.log(`\n--- Running Test ${i + 1}/${tests.length} ---`);
      await tests[i]();
      console.log(`✅ Test ${i + 1} completed`);
    } catch (error) {
      console.error(`❌ Test ${i + 1} failed:`, error);
    }
  }

  console.log('\n🎉 T2.2 Testing Complete!');
}

runAllT22Tests();
```

## Expected Results Summary

| Test | Expected Result |
|------|----------------|
| Bookmarks Isolation | ✅ Users only see own bookmarks |
| Collections Isolation | ✅ Users only see own collections |
| Bookmarks Raw Isolation | ✅ Users only see own raw data |
| Content Tables Isolation | ✅ Users only see own content |
| Collection Items JOIN Policy | ✅ Users only see items from own collections |
| Public Sharing | ✅ Public items visible to all, private items isolated |
| Malicious Operations | ✅ All unauthorized operations blocked |

## Running the Tests

```bash
# Install dependencies
npm install @supabase/supabase-js

# Set environment variables
export NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
export NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"

# Run individual tests
npx tsx test-bookmarks-isolation.ts
npx tsx test-collections-isolation.ts
# ... etc

# Or run all tests
npx tsx run-all-t2-2-tests.ts
```

This comprehensive test suite will verify that T2.2 implementation properly isolates user data across all tables while maintaining public sharing functionality where intended. 