"use client";

import { useState, useEffect, useRef, KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { Search, X, Github, Twitter, MessageSquare as Reddit, Code as StackOverflow, ArrowRight, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { generateText } from '@/lib/api/util';
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  minimal?: boolean;
}

interface SearchResult {
  id: string | number;
  title: string;
  description?: string;
  source: string;
  url: string;
  score: number;
}

// Sample results for demo - in production would be replaced with real search API call
const mockResults: SearchResult[] = [
  {
    id: 1,
    title: "Advanced GraphQL Authentication Patterns",
    description: "Complete guide to JWT-based authentication in GraphQL APIs with detailed code examples.",
    source: "github",
    url: "https://github.com/username/jwt-guards",
    score: 0.95
  },
  {
    id: 2,
    title: "How I implemented user authentication with GraphQL",
    description: "My approach to securing GraphQL APIs using JWTs and auth guards.",
    source: "twitter",
    url: "https://twitter.com/username/status/123456789",
    score: 0.89
  },
  {
    id: 3, 
    title: "Best practices for GraphQL security",
    description: "Comprehensive guide to securing your GraphQL APIs with multiple authentication methods.",
    source: "stackoverflow",
    url: "https://stackoverflow.com/questions/12345678",
    score: 0.82
  },
  {
    id: 4,
    title: "JWT vs Session-based auth for GraphQL",
    description: "Comparing different authentication mechanisms for GraphQL APIs",
    source: "reddit",
    url: "https://reddit.com/r/graphql/comments/12345",
    score: 0.78
  }
];

// Source icon mapping
const SourceIcon = ({ source }: { source: string }) => {
  switch (source) {
    case "github":
      return <Github className="h-4 w-4" />;
    case "twitter":
      return <Twitter className="h-4 w-4" />;
    case "stackoverflow":
      return <StackOverflow className="h-4 w-4" />;
    case "reddit":
      return <Reddit className="h-4 w-4" />;
    default:
      return <Search className="h-4 w-4" />;
  }
};

export default function SearchBar({
  minimal = false
}: SearchBarProps) {
  const [focused, setFocused] = useState(false);
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>('claude-bedrock');
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Handle keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent<Document>) => {
      // Command+K or Control+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowModal(true);
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }, 100);
      }
      
      // Escape key to close
      if (e.key === 'Escape') {
        setShowModal(false);
      }
    };
    
    document.addEventListener('keydown', handleKeyDown as any);
    return () => {
      document.removeEventListener('keydown', handleKeyDown as any);
    };
  }, []);

  // Handle clicks outside the modal to close it
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setShowModal(false);
      }
    };
    
    if (showModal) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showModal]);

  // Semantic search function
  const handleSearch = async (q: string) => {
    if (!q.trim()) {
      setResults([]);
      return;
    }
    
    setLoading(true);
    
    try {
      // In a real implementation, this would call your semantic search endpoint
      // For now, we'll use the AI model to simulate semantic search for demo purposes
      const prompt = `Given the search query: "${q}", return the most relevant results from a bookmark collection focused on developer content. Analyze the semantic meaning beyond keywords.`;
      
      // Simulating semantic search with AI
      await generateText(prompt, selectedModel);
      
      // For demo, we'll use our mock results filtered by query terms
      const filteredResults = mockResults.filter(result => 
        result.title.toLowerCase().includes(q.toLowerCase()) ||
        (result.description && result.description.toLowerCase().includes(q.toLowerCase()))
      );
      
      setResults(filteredResults);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) {
        handleSearch(query);
      } else {
        setResults([]);
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, [query, selectedModel]);

  // Handle model toggle
  const toggleModel = () => {
    setSelectedModel(selectedModel === 'claude-bedrock' ? 'azure-gpt-4o' : 'claude-bedrock');
  };

  const handleInputFocus = () => {
    setFocused(true);
    if (!minimal) {
      setShowModal(true);
    }
  };

  return (
    <>
      <div className={cn("relative", minimal ? "w-full" : "max-w-2xl mx-auto w-full")}>
        <div className={cn(
          "flex items-center rounded-lg border border-input bg-background px-3 py-2 text-sm transition-all",
          focused ? "border-primary ring-2 ring-primary ring-opacity-30" : "",
          minimal ? "" : "shadow-sm"
        )}>
          <Search className="h-4 w-4 text-muted-foreground mr-2" />
          <input 
            ref={inputRef}
            type="text" 
            placeholder="Search across all your saved content..."
            className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={handleInputFocus} 
            onBlur={() => setFocused(false)} 
          />
          
          {query && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-5 w-5 text-muted-foreground hover:text-foreground"
              onClick={() => setQuery("")}
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Clear search</span>
            </Button>
          )}
        </div>
        
        {!minimal && (
          <div className="absolute right-3 top-2 text-xs text-muted-foreground pointer-events-none">
            <kbd className="px-1.5 py-0.5 rounded border border-border bg-muted font-mono">
              ⌘K
            </kbd>
          </div>
        )}
      </div>

      {/* Full-screen search modal */}
      {typeof window === 'object' && showModal && (() => {
        // Access document only when in browser environment
        const portalContainer = document.body;
        return createPortal(
          <AnimatePresence>
            <motion.div 
              className="fixed inset-0 bg-background/60 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
            <div className="flex items-start justify-center pt-20">
              <motion.div 
                ref={modalRef}
                className="w-full max-w-2xl bg-card border border-border rounded-xl shadow-lg overflow-hidden"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              >
                <div className="p-4 border-b border-border">
                  <div className="flex items-center">
                    <Search className="h-5 w-5 text-muted-foreground mr-3" />
                    <input
                      autoFocus
                      type="text"
                      placeholder="Search by meaning, not just keywords..."
                      className="flex-1 bg-transparent outline-none text-base"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                    {query && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-muted-foreground hover:text-foreground"
                        onClick={() => setQuery("")}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Clear search</span>
                      </Button>
                    )}
                  </div>
                  
                  {/* AI model selection */}
                  <div className="mt-2 flex justify-between items-center">
                    <div className="text-xs text-muted-foreground">
                      Semantic Search powered by {selectedModel === 'claude-bedrock' ? 'Claude' : 'OpenAI'}
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-xs h-7"
                      onClick={toggleModel}
                    >
                      Switch to {selectedModel === 'claude-bedrock' ? 'OpenAI' : 'Claude'}
                    </Button>
                  </div>
                </div>
                
                <div className="max-h-[60vh] overflow-y-auto">
                  {loading ? (
                    <div className="py-8 flex justify-center items-center">
                      <Loader2 className="h-6 w-6 text-primary animate-spin" />
                      <span className="ml-2 text-sm text-muted-foreground">Searching with AI...</span>
                    </div>
                  ) : results.length > 0 ? (
                    <div className="divide-y divide-border">
                      {results.map((result) => (
                        <div 
                          key={result.id} 
                          className="p-4 hover:bg-secondary/50 transition-colors cursor-pointer"
                          onClick={() => {
                            window.open(result.url, '_blank');
                            setShowModal(false);
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground">
                              <SourceIcon source={result.source} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium line-clamp-1">{result.title}</h3>
                              {result.description && (
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                  {result.description}
                                </p>
                              )}
                            </div>
                            <div className="ml-2">
                              <ArrowRight className="h-4 w-4 text-muted-foreground" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : query ? (
                    <div className="py-8 px-4 text-center text-muted-foreground">
                      <p>No results found for "{query}"</p>
                      <p className="text-sm mt-1">Try using different keywords or browse your collections</p>
                    </div>
                  ) : (
                    <div className="py-8 px-4 text-center text-muted-foreground">
                      <p>Start typing to search semantically across all saved content</p>
                      <p className="text-sm mt-1">Try "GraphQL auth pattern" or "React optimization"</p>
                    </div>
                  )}
                </div>
                
                <div className="px-4 py-3 bg-muted/30 border-t border-border text-xs text-muted-foreground flex justify-between">
                  <div>
                    Press <kbd className="px-1 py-0.5 rounded border border-border bg-muted font-mono">ESC</kbd> to close
                  </div>
                  <div>
                    {results.length > 0 && `${results.length} results`}
                  </div>
                </div>
              </motion.div>
            </div>
            </motion.div>
          </AnimatePresence>,
          portalContainer
        );
      })()}
    </>
  );
}
