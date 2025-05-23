'use client';

import { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { generateText } from '@/lib/api/util';
import { cn } from '@/lib/utils';
interface AISummaryProps {
  title: string;
  url: string;
  description?: string;
  content?: string;
  className?: string;
}
export default function AISummary({
  title,
  url,
  description = '',
  content = '',
  className
}: AISummaryProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [aiProvider, setAiProvider] = useState<string>('claude-bedrock'); // Default provider

  useEffect(() => {
    // Check cache first (localStorage as a simple cache mechanism)
    const cacheKey = `summary-${btoa(title + url).slice(0, 32)}`;
    const cachedSummary = localStorage.getItem(cacheKey);
    if (cachedSummary) {
      setSummary(cachedSummary);
      setLoading(false);
      return;
    }

    // Generate summary if not cached
    const generateSummary = async () => {
      try {
        const inputText = content || description || title;
        const truncatedText = inputText.slice(0, 1000); // Limit to 1000 chars

        const prompt = `Summarize in ≤ 20 words for a busy developer. No emojis. Return plain text only:\n\n${truncatedText}`;
        const result = await generateText(prompt, aiProvider);
        const summaryText = result.text.trim();

        // Cache the result
        localStorage.setItem(cacheKey, summaryText);
        setSummary(summaryText);
        setError(false);
      } catch (err) {
        console.error('Error generating summary:', err);
        // Fallback to truncated description
        if (description) {
          setSummary(description.slice(0, 100) + (description.length > 100 ? '...' : ''));
        } else {
          setSummary(null);
        }
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    generateSummary();
  }, [title, url, description, content, aiProvider]);

  // Toggle between AI providers
  const toggleProvider = () => {
    const newProvider = aiProvider === 'claude-bedrock' ? 'azure-gpt-4o' : 'claude-bedrock';
    setAiProvider(newProvider);
    setLoading(true); // Restart generation with new provider
  };
  if (loading) {
    return <div className={cn("h-4 bg-gradient-to-r from-background via-muted to-background bg-[length:200%_100%] animate-pulse rounded", className)} data-unique-id="55a29b96-22fd-438e-ad12-4bd1cadccdf9" data-file-name="components/ai/summary.tsx" />;
  }
  if (error) {
    return <div className={cn("flex items-center text-sm text-muted-foreground", className)} data-unique-id="183530ba-29b0-4d17-aaf7-6923cd81f8d5" data-file-name="components/ai/summary.tsx">
        <span className="line-clamp-2" data-unique-id="85a87611-da99-45bb-a3e2-b27284724243" data-file-name="components/ai/summary.tsx" data-dynamic-text="true">
          {summary || description.slice(0, 80) || "No summary available"}
        </span>
        <span className="ml-2 px-1.5 py-0.5 text-xs font-medium bg-destructive/10 text-destructive rounded-full" title="AI summary generation failed" data-unique-id="0a222065-0757-4cba-8c57-bc243bf2d030" data-file-name="components/ai/summary.tsx"><span className="editable-text" data-unique-id="b1a58736-7b54-4f2f-91c7-9e00f7d3cc77" data-file-name="components/ai/summary.tsx">
          RAW
        </span></span>
      </div>;
  }
  return <div className={cn("text-sm text-muted-foreground line-clamp-2", className)} data-unique-id="5cbaadc5-1872-4f40-bc9a-11660e9077f0" data-file-name="components/ai/summary.tsx" data-dynamic-text="true">
      {summary}
    </div>;
}