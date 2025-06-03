-- Function to migrate Reddit posts from reddit_posts table to bookmarks table
-- This bridges the data so Reddit posts appear in the UI

CREATE OR REPLACE FUNCTION migrate_reddit_posts_to_bookmarks(user_uuid UUID)
RETURNS TABLE (
    migrated_count INTEGER,
    skipped_count INTEGER,
    error_count INTEGER
) AS $$
DECLARE
    reddit_post RECORD;
    migrated_count INTEGER := 0;
    skipped_count INTEGER := 0;
    error_count INTEGER := 0;
BEGIN
    -- Loop through all Reddit posts for this user
    FOR reddit_post IN 
        SELECT * FROM reddit_posts 
        WHERE user_id = user_uuid
    LOOP
        BEGIN
            -- Try to insert into bookmarks table
            INSERT INTO bookmarks (
                user_id,
                source,
                url,
                title,
                description,
                created_at,
                updated_at,
                metadata
            ) VALUES (
                reddit_post.user_id,
                'reddit',
                reddit_post.url,
                reddit_post.title,
                COALESCE(reddit_post.selftext, ''),
                reddit_post.created_at,
                reddit_post.updated_at,
                jsonb_build_object(
                    'reddit_id', reddit_post.reddit_id,
                    'reddit_kind', reddit_post.reddit_kind,
                    'author', reddit_post.author,
                    'subreddit', reddit_post.subreddit,
                    'score', reddit_post.score,
                    'ups', reddit_post.ups,
                    'num_comments', reddit_post.num_comments,
                    'upvote_ratio', reddit_post.upvote_ratio,
                    'permalink', reddit_post.permalink,
                    'link_flair_text', reddit_post.link_flair_text,
                    'is_self', reddit_post.is_self,
                    'created_utc', reddit_post.created_utc,
                    'engagement', jsonb_build_object(
                        'upvotes', reddit_post.ups,
                        'score', reddit_post.score,
                        'comments', reddit_post.num_comments
                    )
                )
            );
            
            migrated_count := migrated_count + 1;
            
        EXCEPTION
            WHEN unique_violation THEN
                -- Skip duplicates (URL already exists for this user)
                skipped_count := skipped_count + 1;
            WHEN OTHERS THEN
                -- Log other errors and continue
                error_count := error_count + 1;
        END;
    END LOOP;
    
    RETURN QUERY SELECT migrated_count, skipped_count, error_count;
END;
$$ LANGUAGE plpgsql;

-- Execute the migration for your user
SELECT * FROM migrate_reddit_posts_to_bookmarks('e3ef0830-5658-445e-8193-17b28703ebf2'::uuid);

-- Verify the migration worked
SELECT 
    source,
    COUNT(*) as count,
    MIN(created_at) as oldest,
    MAX(created_at) as newest
FROM bookmarks 
WHERE user_id = 'e3ef0830-5658-445e-8193-17b28703ebf2'::uuid
GROUP BY source
ORDER BY source; 