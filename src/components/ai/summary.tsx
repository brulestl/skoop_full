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
  const [aiProvider, setAiProvider] = useState<string>('claude-bedrock');
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedModel = localStorage.getItem('preferredAIModel') || 'claude-bedrock';
      setAiProvider(storedModel);
    }
  }, []);
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
    return <div className={cn("h-4 bg-gradient-to-r from-background via-muted to-background bg-[length:200%_100%] animate-pulse rounded", className)} data-unique-id="9eddfb0d-93d5-48b4-a1ed-7a286c78463d" data-file-name="components/ai/summary.tsx" />;
  }
  if (error) {
    return <div className={cn("flex items-center text-sm text-muted-foreground", className)} data-unique-id="c69330c8-60a7-44d5-b0a6-46d0b93ddb5d" data-file-name="components/ai/summary.tsx">
        <span className="line-clamp-2" data-unique-id="1bb888a5-76ec-42d7-8d0e-102bc4c767bb" data-file-name="components/ai/summary.tsx" data-dynamic-text="true">
          {summary || description.slice(0, 80) || "No summary available"}
        </span>
        <span className="ml-2 px-1.5 py-0.5 text-xs font-medium bg-destructive/10 text-destructive rounded-full" title="AI summary generation failed" data-unique-id="af0dafdd-2ce6-445a-abbf-cd97a0f95bec" data-file-name="components/ai/summary.tsx"><span className="editable-text" data-unique-id="421dc6f1-0490-42f8-ba2b-57feed13cb35" data-file-name="components/ai/summary.tsx">
          RAW
        </span></span>
      </div>;
  }
  return <div className={cn("text-sm text-muted-foreground line-clamp-2", className)} data-unique-id="b0aa85c5-1f7d-44c3-b068-ac65b127a8d4" data-file-name="components/ai/summary.tsx" data-dynamic-text="true">
      {summary}
    </div>;
}