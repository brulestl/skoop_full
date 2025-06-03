-- Manual insert of Reddit posts for testing
-- Replace 'YOUR_USER_ID' with your actual user ID: e3ef0830-5658-445e-8193-17b28703ebf2

-- First Reddit Post: "Vibe coding" is just AI startup marketing
INSERT INTO public.reddit_posts (
    user_id,
    reddit_id,
    reddit_kind,
    title,
    selftext,
    author,
    subreddit,
    subreddit_name_prefixed,
    url,
    permalink,
    score,
    ups,
    downs,
    num_comments,
    upvote_ratio,
    is_self,
    is_video,
    over_18,
    spoiler,
    locked,
    archived,
    created_utc,
    edited_utc,
    link_flair_text,
    link_flair_css_class,
    link_flair_background_color,
    author_flair_text,
    thumbnail,
    domain,
    raw_json
) VALUES (
    'e3ef0830-5658-445e-8193-17b28703ebf2'::uuid,
    't3_1kwaes6',
    't3',
    '"Vibe coding" is just AI startup marketing',
    'I work at an AI agent startup and know several folks behind these "vibe coding" platforms. The truth? Most of it is just hype - slick marketing to attract investors and charge users $200/month.

The "I vibe coded my dream app in 12 hours" posts? Mostly bots or exaggerated founder content. Reddit is flooded with it now. Just be cautious - don''t confuse marketing with actual PMF.',
    'Eastern_Ticket2157',
    'ChatGPTCoding',
    'r/ChatGPTCoding',
    'https://www.reddit.com/r/ChatGPTCoding/comments/1kwaes6/vibe_coding_is_just_ai_startup_marketing/',
    '/r/ChatGPTCoding/comments/1kwaes6/vibe_coding_is_just_ai_startup_marketing/',
    381,
    381,
    0,
    85,
    0.89,
    true,
    false,
    false,
    false,
    false,
    false,
    1748307046,
    null,
    'Discussion',
    '',
    '#0079d3',
    null,
    'self',
    'self.ChatGPTCoding',
    '{
        "kind": "t3",
        "data": {
            "subreddit": "ChatGPTCoding",
            "selftext": "I work at an AI agent startup and know several folks behind these "vibe coding" platforms. The truth? Most of it is just hype - slick marketing to attract investors and charge users $200/month.\n\nThe "I vibe coded my dream app in 12 hours" posts? Mostly bots or exaggerated founder content. Reddit is flooded with it now. Just be cautious - don''t confuse marketing with actual PMF.",
            "title": ""Vibe coding" is just AI startup marketing",
            "name": "t3_1kwaes6",
            "upvote_ratio": 0.89,
            "ups": 381,
            "score": 381,
            "author": "Eastern_Ticket2157",
            "num_comments": 85,
            "permalink": "/r/ChatGPTCoding/comments/1kwaes6/vibe_coding_is_just_ai_startup_marketing/",
            "url": "https://www.reddit.com/r/ChatGPTCoding/comments/1kwaes6/vibe_coding_is_just_ai_startup_marketing/",
            "created_utc": 1748307046,
            "is_self": true,
            "link_flair_text": "Discussion"
        }
    }'::jsonb
);

-- Second Reddit Post: If you are vibe coding, read this
INSERT INTO public.reddit_posts (
    user_id,
    reddit_id,
    reddit_kind,
    title,
    selftext,
    author,
    subreddit,
    subreddit_name_prefixed,
    url,
    permalink,
    score,
    ups,
    downs,
    num_comments,
    upvote_ratio,
    is_self,
    is_video,
    over_18,
    spoiler,
    locked,
    archived,
    created_utc,
    edited_utc,
    link_flair_text,
    link_flair_css_class,
    link_flair_background_color,
    author_flair_text,
    thumbnail,
    domain,
    raw_json
) VALUES (
    'e3ef0830-5658-445e-8193-17b28703ebf2'::uuid,
    't3_1jfacpu',
    't3',
    'If you are vibe coding, read this. It might save you!',
    'This viral vibe coding trend/approach is great an i''m all for it, but it''s bringing in a lot more no coders creating full applications/websites and i''m seeing a lot of people getting burnt. I am a non coder myself, but i had to painstakingly work through so many errors which actually led to a lot of learning over the last 3 years. I started with ChatGPT 3.5.  
  
If you are a vibe coder, once you have finished building, take your code and pass it through a leading reasoning model with the following prompt:

Please review for production readiness: check for common vulnerabilities, secure headers, forms, input validation, authentication, error handling, debug statements, dependency security, and ensure adherence to industry best practices.

P.s if your codebase is to large, pass it through in sections, don''t be lazy, it will make your product better

**Edit:** wowzer, vibe coding is a hot topic right now. Heres my portfolio as a none coder:

[The Prompt Index](https://www.thepromptindex.com): Popular Prompt Database (ChatGPT 3.5, with a recent facelift by Sonnet 3.7)

[AI T-Shirt Design](https://www.thepromptindex.com/store.php) addition by Claude Sonnnet 

[Chrome Extension](https://chromewebstore.google.com/detail/the-prompt-index/ofaehlaoggbboahmpogkfhedgdeekekk) - Prompt toolbox V1 created by ChatGPT 3.5 current V3 Claude 3.7',
    'Officiallabrador',
    'ChatGPTCoding',
    'r/ChatGPTCoding',
    'https://www.reddit.com/r/ChatGPTCoding/comments/1jfacpu/if_you_are_vibe_coding_read_this_it_might_save_you/',
    '/r/ChatGPTCoding/comments/1jfacpu/if_you_are_vibe_coding_read_this_it_might_save_you/',
    996,
    996,
    0,
    296,
    0.9,
    true,
    false,
    false,
    false,
    false,
    false,
    1742424946,
    1742503344,
    'Resources And Tips',
    '',
    '#ea0027',
    null,
    'self',
    'self.ChatGPTCoding',
    '{
        "kind": "t3",
        "data": {
            "subreddit": "ChatGPTCoding",
            "selftext": "This viral vibe coding trend/approach is great an i''m all for it, but it''s bringing in a lot more no coders creating full applications/websites and i''m seeing a lot of people getting burnt...",
            "title": "If you are vibe coding, read this. It might save you!",
            "name": "t3_1jfacpu",
            "upvote_ratio": 0.9,
            "ups": 996,
            "score": 996,
            "author": "Officiallabrador",
            "num_comments": 296,
            "permalink": "/r/ChatGPTCoding/comments/1jfacpu/if_you_are_vibe_coding_read_this_it_might_save_you/",
            "url": "https://www.reddit.com/r/ChatGPTCoding/comments/1jfacpu/if_you_are_vibe_coding_read_this_it_might_save_you/",
            "created_utc": 1742424946,
            "edited": 1742503344,
            "is_self": true,
            "link_flair_text": "Resources And Tips"
        }
    }'::jsonb
);

-- Verify the inserts worked
SELECT 
    reddit_id,
    reddit_kind,
    title,
    author,
    subreddit,
    score,
    num_comments,
    created_at
FROM reddit_posts 
WHERE user_id = 'e3ef0830-5658-445e-8193-17b28703ebf2'::uuid
ORDER BY created_at DESC; 