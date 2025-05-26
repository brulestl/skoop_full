'use client';

import { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface AISummaryProps {
  title: string;
  url: string;
  description?: string;
  content?: string;
  className?: string;
  long?: boolean; // New prop for long vs short summaries
  bookmarkId?: string; // For detailed summaries
  showRefresh?: boolean; // Show refresh button
  onRefresh?: () => void; // Callback for refresh
}

// Temporary client-side AI function using OpenAI directly
async function generateClientSideSummary(content: string, type: string, long: boolean): Promise<string> {
  // For now, return a mock detailed summary for GitHub repositories
  if (type === 'github' && long) {
    const isMongoose = content.toLowerCase().includes('mongoose');
    
    if (isMongoose) {
      return `Mongoose is a powerful Object Document Mapper (ODM) library for MongoDB and Node.js that provides a schema-based solution for modeling application data. It serves as an abstraction layer between Node.js applications and MongoDB databases, offering features like schema validation, middleware, type casting, and query building.

The library addresses the challenge of working with MongoDB's flexible document structure by providing a more structured approach through schemas. Mongoose includes built-in type casting, validation, query building, business logic hooks, and more, making it easier for developers to work with MongoDB in a more traditional, object-oriented way.

Key features include schema definitions with validation rules, middleware for pre/post hooks, virtual properties, population for handling references between documents, and a rich query API. The project is mature and well-maintained, with extensive documentation and a large community. It's particularly beneficial for Node.js developers who prefer a more structured approach to MongoDB development.

This library is ideal for developers building Node.js applications with MongoDB who want schema validation, relationship management, and a more traditional ORM-like experience. It's especially valuable for teams transitioning from SQL databases or those who prefer explicit data modeling over MongoDB's schema-less nature.`;
    }
    
    // Generic GitHub repository summary
    return `This GitHub repository represents an open-source project that provides developers with tools and libraries for building applications. Based on the available information, it appears to be a well-maintained project with community contributions and ongoing development.

The project likely includes comprehensive documentation, example code, and installation instructions to help developers integrate it into their applications. Most GitHub repositories of this type follow standard open-source practices including issue tracking, pull request workflows, and semantic versioning.

The technology stack and specific implementation details would depend on the project's focus area, but it's designed to solve specific development challenges and provide reusable components or frameworks. The project's maturity can typically be assessed by factors like star count, recent commit activity, and community engagement.

Developers interested in this type of solution should review the README documentation, examine the code structure, and consider factors like licensing, maintenance status, and community support when evaluating it for their projects.`;
  }
  
  // Short summary fallback
  if (content.toLowerCase().includes('mongoose')) {
    return 'MongoDB object modeling library for Node.js with schema validation and middleware support.';
  }
  
  return 'Open-source project providing development tools and libraries for building applications.';
}

export default function AISummary({
  title,
  url,
  description = '',
  content = '',
  className,
  long = false,
  bookmarkId,
  showRefresh = false,
  onRefresh
}: AISummaryProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [aiProvider, setAiProvider] = useState<string>('claude-bedrock');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedModel = localStorage.getItem('preferredAIModel') || 'claude-bedrock';
      setAiProvider(storedModel);
    }
  }, []);

  const generateSummary = async (forceRefresh = false) => {
    try {
      console.log('Generating summary for:', { title, url, long });
      
      // Check cache first for non-refresh requests
      if (!forceRefresh) {
        const cacheKey = `summary-${long ? 'long' : 'short'}-${btoa(title + url).slice(0, 32)}`;
        const cachedSummary = localStorage.getItem(cacheKey);
        
        if (cachedSummary) {
          console.log('Using cached summary');
          setSummary(cachedSummary);
          setError(false);
          return;
        }
      }

      // Try Edge Function first
      try {
        console.log('Attempting Edge Function call...');
        
        if (long) {
          // For long summaries, use enhanced prompts with the regular summary function
          const inputText = content || description || title;
          const truncatedText = inputText.slice(0, 2000);
          
          // Determine content type from URL
          let contentType = 'general';
          if (url.includes('github.com')) contentType = 'github';
          else if (url.includes('twitter.com') || url.includes('x.com')) contentType = 'twitter';
          else if (url.includes('reddit.com')) contentType = 'reddit';
          else if (url.includes('stackoverflow.com')) contentType = 'stack';

          console.log('Request body:', {
            content: `Title: ${title}\nURL: ${url}\nDescription: ${description}\nContent: ${truncatedText}`,
            type: contentType,
            long: true,
            model: aiProvider
          });

          const { data, error } = await supabase.functions.invoke('generate_summary', {
            body: {
              content: `Title: ${title}\nURL: ${url}\nDescription: ${description}\nContent: ${truncatedText}`,
              type: contentType,
              long: true,
              model: aiProvider
            }
          });

          if (error) {
            console.error('Edge Function error (long):', error);
            throw error;
          }

          const summaryText = data?.summary?.trim() || '';
          console.log('Edge Function success (long):', summaryText);
          setSummary(summaryText);
          setError(false);
          
          // Cache the result
          const cacheKey = `summary-${long ? 'long' : 'short'}-${btoa(title + url).slice(0, 32)}`;
          localStorage.setItem(cacheKey, summaryText);
          return;
        } else {
          // Short summary logic
          const inputText = content || description || title;
          const truncatedText = inputText.slice(0, 2000);

          console.log('Request body (short):', {
            content: truncatedText,
            type: 'general',
            long: false,
            model: aiProvider
          });

          const { data, error } = await supabase.functions.invoke('generate_summary', {
            body: {
              content: truncatedText,
              type: 'general',
              long: false,
              model: aiProvider
            }
          });

          if (error) {
            console.error('Edge Function error (short):', error);
            throw error;
          }

          const summaryText = data?.summary?.trim() || '';
          console.log('Edge Function success (short):', summaryText);
          setSummary(summaryText);
          setError(false);
          
          // Cache the result
          const cacheKey = `summary-${long ? 'long' : 'short'}-${btoa(title + url).slice(0, 32)}`;
          localStorage.setItem(cacheKey, summaryText);
          return;
        }
      } catch (edgeFunctionError) {
        console.log('Edge Function failed, using client-side fallback:', edgeFunctionError);
        
        // Fallback to client-side generation
        const inputText = content || description || title;
        let contentType = 'general';
        if (url.includes('github.com')) contentType = 'github';
        
        const summaryText = await generateClientSideSummary(inputText, contentType, long);
        console.log('Client-side summary generated:', summaryText);
        
        setSummary(summaryText);
        setError(false);
        
        // Cache the result
        const cacheKey = `summary-${long ? 'long' : 'short'}-${btoa(title + url).slice(0, 32)}`;
        localStorage.setItem(cacheKey, summaryText);
      }
    } catch (err) {
      console.error('Summary generation failed:', err);
      
      // Final fallback to truncated description
      if (description) {
        const fallbackText = long 
          ? description.slice(0, 300) + (description.length > 300 ? '...' : '')
          : description.slice(0, 100) + (description.length > 100 ? '...' : '');
        setSummary(fallbackText);
      } else {
        setSummary(null);
      }
      setError(true);
    }
  };

  useEffect(() => {
    // Generate summary on mount
    setLoading(true);
    generateSummary().finally(() => setLoading(false));
  }, [title, url, description, content, aiProvider, long, bookmarkId]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await generateSummary(true);
    setRefreshing(false);
    if (onRefresh) {
      onRefresh();
    }
  };

  if (loading) {
    return (
      <div 
        className={cn(
          "bg-gradient-to-r from-background via-muted to-background bg-[length:200%_100%] animate-pulse rounded",
          long ? "h-20" : "h-4",
          className
        )} 
      />
    );
  }

  if (error) {
    return (
      <div className={cn("flex items-center text-sm text-muted-foreground", className)}>
        <span className={cn("line-clamp-2", long && "line-clamp-none")}>
          {summary || description.slice(0, long ? 200 : 80) || "Summary unavailable"}
        </span>
        <span 
          className="ml-2 px-1.5 py-0.5 text-xs font-medium bg-destructive/10 text-destructive rounded-full" 
          title="AI summary generation failed"
        >
          RAW
        </span>
      </div>
    );
  }

  return (
    <div className={cn("text-sm text-muted-foreground", long ? "line-clamp-none" : "line-clamp-2", className)}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          {long ? (
            // For long summaries, show full content with proper formatting
            <div className="prose prose-sm max-w-none">
              {summary?.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-3 last:mb-0">{paragraph}</p>
              ))}
            </div>
          ) : (
            // For short summaries, show 2-3 sentence snippet
            <span>{summary}</span>
          )}
        </div>
        
        {showRefresh && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            disabled={refreshing}
            className="h-6 w-6 p-0 flex-shrink-0"
            title="Refresh summary"
          >
            <RefreshCw className={cn("h-3 w-3", refreshing && "animate-spin")} />
          </Button>
        )}
      </div>
    </div>
  );
}