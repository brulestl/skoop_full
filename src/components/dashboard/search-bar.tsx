"use client";

import { useState, useEffect, useRef, KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { Search, X, Github, Twitter, MessageSquare as Reddit, Code as StackOverflow, ArrowRight, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { generateText } from '@/lib/api/util';
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";

interface SearchBarProps {
  minimal?: boolean;
  onSearchResults?: (results: any[]) => void;
  onClearSearch?: () => void;
  isSearchActive?: boolean;
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
const mockResults: SearchResult[] = [{
  id: 1,
  title: "Advanced GraphQL Authentication Patterns",
  description: "Complete guide to JWT-based authentication in GraphQL APIs with detailed code examples.",
  source: "github",
  url: "https://github.com/username/jwt-guards",
  score: 0.95
}, {
  id: 2,
  title: "How I implemented user authentication with GraphQL",
  description: "My approach to securing GraphQL APIs using JWTs and auth guards.",
  source: "twitter",
  url: "https://twitter.com/username/status/123456789",
  score: 0.89
}, {
  id: 3,
  title: "Best practices for GraphQL security",
  description: "Comprehensive guide to securing your GraphQL APIs with multiple authentication methods.",
  source: "stackoverflow",
  url: "https://stackoverflow.com/questions/12345678",
  score: 0.82
}, {
  id: 4,
  title: "JWT vs Session-based auth for GraphQL",
  description: "Comparing different authentication mechanisms for GraphQL APIs",
  source: "reddit",
  url: "https://reddit.com/r/graphql/comments/12345",
  score: 0.78
}];

// Source icon mapping
const SourceIcon = ({
  source
}: {
  source: string;
}) => {
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
  minimal = false,
  onSearchResults,
  onClearSearch,
  isSearchActive
}: SearchBarProps) {
  const [focused, setFocused] = useState(false);
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>('claude-bedrock');
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [placeholder, setPlaceholder] = useState("Search across all your saved content...");
  const { user } = useAuth();

  // Update placeholder based on window width
  useEffect(() => {
    const updatePlaceholder = () => {
      if (window.innerWidth <= 360) {
        setPlaceholder("Search...");
      } else {
        setPlaceholder("Search across all your saved content...");
      }
    };
    updatePlaceholder();
    window.addEventListener('resize', updatePlaceholder);
    return () => window.removeEventListener('resize', updatePlaceholder);
  }, []);

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
      if (onSearchResults) {
        onSearchResults([]);
      }
      return;
    }
    
    if (!user) {
      console.error('User not authenticated');
      return;
    }

    setLoading(true);
    try {
      // Call the semantic search Supabase function
      const { data, error } = await supabase.functions.invoke('semantic_search', {
        body: {
          query: q,
          userId: user.id
        }
      });

      if (error) {
        throw error;
      }

      const searchResults = data?.results || [];
      
      // Transform results to match our SearchResult interface
      const transformedResults = searchResults.map((result: any) => ({
        id: result.id,
        title: result.title || 'Untitled',
        description: result.description || result.summary || '',
        source: 'bookmark', // Default source since these are from bookmarks
        url: result.url,
        score: result.similarity || 0
      }));

      setResults(transformedResults);
      
      // Pass results to parent component if callback provided
      if (onSearchResults) {
        onSearchResults(searchResults);
      }
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
      
      // Fallback to mock results for demo purposes
      const filteredResults = mockResults.filter(result => result.title.toLowerCase().includes(q.toLowerCase()) || result.description && result.description.toLowerCase().includes(q.toLowerCase()));
      setResults(filteredResults);
      
      if (onSearchResults) {
        onSearchResults([]);
      }
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

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      handleSearch(query);
    }
  };

  // Handle clear search
  const handleClearSearch = () => {
    setQuery("");
    setResults([]);
    if (onClearSearch) {
      onClearSearch();
    }
  };

  const handleInputFocus = () => {
    setFocused(true);
    if (!minimal) {
      setShowModal(true);
    }
  };
  return <>
      <div className={cn("relative", minimal ? "w-full" : "max-w-2xl mx-auto w-full")} data-unique-id="249380aa-6d99-4645-ab12-049bd402d5a9" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true">
        <form onSubmit={handleSubmit}>
          <div className={cn("flex items-center rounded-lg border border-input bg-background px-3 py-2 text-sm transition-all", focused ? "border-primary ring-2 ring-primary ring-opacity-30" : "", minimal ? "" : "shadow-sm")} data-unique-id="aa9c88fb-82db-4e7d-86f6-a9bdfe9b4e96" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true">
            <Search className="h-4 w-4 text-muted-foreground mr-2" />
            <input ref={inputRef} type="text" placeholder={placeholder} className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground" value={query} onChange={e => setQuery(e.target.value)} onFocus={handleInputFocus} onBlur={() => setFocused(false)} data-unique-id="4c16ffa5-01d3-414d-8670-10f282cbba23" data-file-name="components/dashboard/search-bar.tsx" />
            
            {query && <Button type="button" variant="ghost" size="icon" className="h-5 w-5 text-muted-foreground hover:text-foreground" onClick={handleClearSearch} data-unique-id="95ddf0ef-08bc-43bd-8793-2544c64380bd" data-file-name="components/dashboard/search-bar.tsx">
                <X className="h-3 w-3" />
                <span className="sr-only" data-unique-id="5fde97af-f4dc-428a-8305-be01f10b7649" data-file-name="components/dashboard/search-bar.tsx"><span className="editable-text" data-unique-id="42541189-2228-4a9d-b0d9-c5a0271bbc9d" data-file-name="components/dashboard/search-bar.tsx">Clear search</span></span>
              </Button>}
          </div>
        </form>
        
        {!minimal && <div className="absolute right-3 top-2 text-xs text-muted-foreground pointer-events-none" data-unique-id="719e7efc-0063-4bab-8107-3c9cc8baa76e" data-file-name="components/dashboard/search-bar.tsx">
            <kbd className="px-1.5 py-0.5 rounded border border-border bg-muted font-mono" data-unique-id="0a5e0ec7-4378-4218-9e83-52c23f2d4f7a" data-file-name="components/dashboard/search-bar.tsx"><span className="editable-text" data-unique-id="8a81079f-c220-426d-8aef-d8226086db0c" data-file-name="components/dashboard/search-bar.tsx">
              ⌘K
            </span></kbd>
          </div>}
      </div>

      {/* Full-screen search modal */}
      {typeof window === 'object' && showModal && (() => {
      // Access document only when in browser environment
      let portalContainer: Element;

      // Additional check to ensure document is available
      if (typeof document !== 'undefined') {
        portalContainer = document.body;
      } else {
        return null; // Return null if document is not available
      }
      return createPortal(<AnimatePresence>
            <motion.div className="fixed inset-0 bg-background/60 backdrop-blur-sm z-50" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} data-unique-id="35124589-6351-4c25-85e5-7b67f5f621e2" data-file-name="components/dashboard/search-bar.tsx">
            <div className="flex items-start justify-center pt-20" data-unique-id="ca1b0cc2-0afb-4a24-a348-91247daf0203" data-file-name="components/dashboard/search-bar.tsx">
              <motion.div ref={modalRef} className="w-full max-w-2xl bg-card border border-border rounded-xl shadow-lg overflow-hidden" initial={{
              y: -20,
              opacity: 0
            }} animate={{
              y: 0,
              opacity: 1
            }} exit={{
              y: -20,
              opacity: 0
            }} transition={{
              type: 'spring',
              damping: 25,
              stiffness: 300
            }} data-unique-id="b7974a59-5f05-47cf-ab58-572e2aa3b7a0" data-file-name="components/dashboard/search-bar.tsx">
                <div className="p-4 border-b border-border" data-unique-id="79195c0a-8b91-46ae-8807-9c8884c0ef89" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true">
                  <form onSubmit={handleSubmit}>
                    <div className="flex items-center" data-unique-id="75682ce6-ec66-40ab-b8ba-3423d2221e96" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true">
                      <Search className="h-5 w-5 text-muted-foreground mr-3" />
                      <input autoFocus type="text" placeholder="Search by meaning, not just keywords..." className="flex-1 bg-transparent outline-none text-base" value={query} onChange={e => setQuery(e.target.value)} data-unique-id="afe36756-7209-4d8b-a404-826a0b56258a" data-file-name="components/dashboard/search-bar.tsx" />
                      {query && <Button type="button" variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" onClick={handleClearSearch} data-unique-id="71b8e715-ab29-4ef0-a505-4cd11c41be60" data-file-name="components/dashboard/search-bar.tsx">
                          <X className="h-4 w-4" />
                          <span className="sr-only" data-unique-id="1ccac888-0dfe-4944-84a9-75e7448403be" data-file-name="components/dashboard/search-bar.tsx"><span className="editable-text" data-unique-id="61b29437-3c95-492d-907a-a15f2178f3f5" data-file-name="components/dashboard/search-bar.tsx">Clear search</span></span>
                        </Button>}
                    </div>
                  </form>
                  
                  {/* AI model selection */}
                  <div className="mt-2 flex justify-between items-center" data-unique-id="e4bba721-29f0-43c3-aa67-95863dbcc2d1" data-file-name="components/dashboard/search-bar.tsx">
                    <div className="text-xs text-muted-foreground" data-unique-id="a8dcded9-0bbd-49d2-bee6-745d736ee327" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="e73c5492-bcba-400d-a1e7-28f426b297fd" data-file-name="components/dashboard/search-bar.tsx">
                      Semantic Search powered by </span>{selectedModel === 'claude-bedrock' ? 'Claude' : 'OpenAI'}
                    </div>
                    <Button variant="outline" size="sm" className="text-xs h-7" onClick={toggleModel} data-unique-id="5a410b5b-dad5-4159-bcf6-d27609ff9c32" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="a0c2eaf0-0120-46aa-8388-8f6455b5b378" data-file-name="components/dashboard/search-bar.tsx">
                      Switch to </span>{selectedModel === 'claude-bedrock' ? 'OpenAI' : 'Claude'}
                    </Button>
                  </div>
                </div>
                
                <div className="max-h-[60vh] overflow-y-auto" data-unique-id="cc721aa6-5c39-466f-ae4f-3dc4bf3bc553" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true">
                  {loading ? <div className="py-8 flex justify-center items-center" data-unique-id="b54fe68e-7628-4750-b776-15744c418e49" data-file-name="components/dashboard/search-bar.tsx">
                      <Loader2 className="h-6 w-6 text-primary animate-spin" />
                      <span className="ml-2 text-sm text-muted-foreground" data-unique-id="dd3a63ab-7b86-4884-9be0-82ea63635252" data-file-name="components/dashboard/search-bar.tsx"><span className="editable-text" data-unique-id="fd13cbac-ee33-4ab4-aac0-2ee14fc114c2" data-file-name="components/dashboard/search-bar.tsx">Searching with AI...</span></span>
                    </div> : results.length > 0 ? <div className="divide-y divide-border" data-unique-id="1178accc-3efd-42c6-a782-9c99cca7b3ca" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true">
                      {results.map(result => <div key={result.id} className="p-4 hover:bg-secondary/50 transition-colors cursor-pointer" onClick={() => {
                    window.open(result.url, '_blank');
                    setShowModal(false);
                  }} data-unique-id="b7d3f22b-b8ae-498f-9b6e-2289af0c4b39" data-file-name="components/dashboard/search-bar.tsx">
                          <div className="flex items-center gap-3" data-unique-id="dd62ca7f-ae2c-4c78-8cf5-83bb3d7c3d75" data-file-name="components/dashboard/search-bar.tsx">
                            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground" data-unique-id="5a415afe-23e7-4f9e-b630-9f2ec6986ae4" data-file-name="components/dashboard/search-bar.tsx">
                              <SourceIcon source={result.source} />
                            </div>
                            <div className="flex-1 min-w-0" data-unique-id="d3f3121d-5f60-41ac-85f5-6b6ed58aac9b" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true">
                              <h3 className="font-medium line-clamp-1" data-unique-id="e8bb5cf1-610f-45d4-8c0f-d89e3dd8deb1" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true">{result.title}</h3>
                              {result.description && <p className="text-sm text-muted-foreground line-clamp-2" data-unique-id="cc44b08b-7f3b-415c-aa53-d17832b8532a" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true">
                                  {result.description}
                                </p>}
                            </div>
                            <div className="ml-2" data-unique-id="17c3b1ee-2e0c-4941-a420-a6eb4cdc8c17" data-file-name="components/dashboard/search-bar.tsx">
                              <ArrowRight className="h-4 w-4 text-muted-foreground" />
                            </div>
                          </div>
                        </div>)}
                    </div> : query ? <div className="py-8 px-4 text-center text-muted-foreground" data-unique-id="b03a68cf-358f-403b-98a2-e53f566e06bf" data-file-name="components/dashboard/search-bar.tsx">
                      <p data-unique-id="6c9b9ea3-3124-4bfc-983d-e73b05aaa0cd" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="42fabf84-3c82-4c37-88a7-69b886a01c09" data-file-name="components/dashboard/search-bar.tsx">No results found for "</span>{query}<span className="editable-text" data-unique-id="cc80871f-b5e8-4466-80f3-f083c455b6ab" data-file-name="components/dashboard/search-bar.tsx">"</span></p>
                      <p className="text-sm mt-1" data-unique-id="7799beec-9401-45d9-b3ff-9505a27cd48e" data-file-name="components/dashboard/search-bar.tsx"><span className="editable-text" data-unique-id="3e0c96f5-f446-4139-bfac-6da3b3b0c5a7" data-file-name="components/dashboard/search-bar.tsx">Try using different keywords or browse your collections</span></p>
                    </div> : <div className="py-8 px-4 text-center text-muted-foreground" data-unique-id="9eb5fb47-9421-4b90-a10d-5ec37efefefb" data-file-name="components/dashboard/search-bar.tsx">
                      <p data-unique-id="23a85c32-228b-48d9-8f49-8815c14d30f5" data-file-name="components/dashboard/search-bar.tsx"><span className="editable-text" data-unique-id="6f354a0e-10d4-4dad-81c5-e999de283cb6" data-file-name="components/dashboard/search-bar.tsx">Start typing to search semantically across all saved content</span></p>
                      <p className="text-sm mt-1" data-unique-id="0e0bd52b-80a7-4ffe-b5fe-547cd9c43320" data-file-name="components/dashboard/search-bar.tsx"><span className="editable-text" data-unique-id="6b55a5bb-b5e0-4541-8482-c0f8bd305e28" data-file-name="components/dashboard/search-bar.tsx">Try "GraphQL auth pattern" or "React optimization"</span></p>
                    </div>}
                </div>
                
                <div className="px-4 py-3 bg-muted/30 border-t border-border text-xs text-muted-foreground flex justify-between" data-unique-id="758c5c52-25cb-481c-a6dd-9ccc0a254a09" data-file-name="components/dashboard/search-bar.tsx">
                  <div data-unique-id="07e92971-df4f-48bd-a69c-9cbf2b8c6f29" data-file-name="components/dashboard/search-bar.tsx"><span className="editable-text" data-unique-id="742c6e74-a3a6-4358-a911-807399ab1391" data-file-name="components/dashboard/search-bar.tsx">
                    Press </span><kbd className="px-1 py-0.5 rounded border border-border bg-muted font-mono" data-unique-id="c759de97-f1d4-4c58-8172-c454510b6904" data-file-name="components/dashboard/search-bar.tsx"><span className="editable-text" data-unique-id="08d1a547-e38d-4970-bed5-5ac1ca6524ac" data-file-name="components/dashboard/search-bar.tsx">ESC</span></kbd><span className="editable-text" data-unique-id="b81d8266-bc52-45fc-ac65-0f77fb777fdd" data-file-name="components/dashboard/search-bar.tsx"> to close
                  </span></div>
                  <div data-unique-id="672cd88a-f09b-43a3-9797-1a26d73daefa" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true">
                    {results.length > 0 && `${results.length} results`}
                  </div>
                </div>
              </motion.div>
            </div>
            </motion.div>
          </AnimatePresence>, portalContainer);
    })()}
    </>;
}