-- Create function for semantic search
CREATE OR REPLACE FUNCTION match_bookmarks(
  query_embedding vector(1536),
  match_threshold float,
  match_count int,
  p_user_id uuid
)
RETURNS TABLE (
  id uuid,
  url text,
  title text,
  description text,
  summary text,
  tags text[],
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    bookmarks.id,
    bookmarks.url,
    bookmarks.title,
    bookmarks.description,
    bookmarks.summary,
    bookmarks.tags,
    1 - (bookmarks.vector <=> query_embedding) as similarity
  FROM bookmarks
  WHERE bookmarks.user_id = p_user_id
  AND 1 - (bookmarks.vector <=> query_embedding) > match_threshold
  ORDER BY bookmarks.vector <=> query_embedding
  LIMIT match_count;
END;
$$; 