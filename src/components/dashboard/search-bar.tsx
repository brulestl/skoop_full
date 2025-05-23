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
  const [placeholder, setPlaceholder] = useState("Search across all your saved content...");

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
      const filteredResults = mockResults.filter(result => result.title.toLowerCase().includes(q.toLowerCase()) || result.description && result.description.toLowerCase().includes(q.toLowerCase()));
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
  return <>
      <div className={cn("relative", minimal ? "w-full" : "max-w-2xl mx-auto w-full")} data-unique-id="7912032c-5a7a-4694-b525-ea78d89de88e" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true">
        <div className={cn("flex items-center rounded-lg border border-input bg-background px-3 py-2 text-sm transition-all", focused ? "border-primary ring-2 ring-primary ring-opacity-30" : "", minimal ? "" : "shadow-sm")} data-unique-id="d207b5b6-2d51-45ad-bef4-13d659f2e45d" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true">
          <Search className="h-4 w-4 text-muted-foreground mr-2" />
          <input ref={inputRef} type="text" placeholder={placeholder} className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground" value={query} onChange={e => setQuery(e.target.value)} onFocus={handleInputFocus} onBlur={() => setFocused(false)} data-unique-id="a404a0d5-4262-4a7d-90e1-52f8932220d3" data-file-name="components/dashboard/search-bar.tsx" />
          
          {query && <Button variant="ghost" size="icon" className="h-5 w-5 text-muted-foreground hover:text-foreground" onClick={() => setQuery("")} data-unique-id="507042ee-a468-4014-b31b-b720181efe7c" data-file-name="components/dashboard/search-bar.tsx">
              <X className="h-3 w-3" />
              <span className="sr-only" data-unique-id="4ca1abc9-a7d8-44c1-8d6a-3e7ea3186f24" data-file-name="components/dashboard/search-bar.tsx"><span className="editable-text" data-unique-id="30406cf0-53fa-471c-b9b7-34221b1e58f1" data-file-name="components/dashboard/search-bar.tsx">Clear search</span></span>
            </Button>}
        </div>
        
        {!minimal && <div className="absolute right-3 top-2 text-xs text-muted-foreground pointer-events-none" data-unique-id="2a5dfcb6-6d31-4c28-a731-822a17de9aff" data-file-name="components/dashboard/search-bar.tsx">
            <kbd className="px-1.5 py-0.5 rounded border border-border bg-muted font-mono" data-unique-id="9bfbb04d-8ea4-4190-80f5-5d5dbd1c0361" data-file-name="components/dashboard/search-bar.tsx"><span className="editable-text" data-unique-id="548a2b44-2f03-4e52-a8f6-12d6f65d4f6f" data-file-name="components/dashboard/search-bar.tsx">
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
        }} data-unique-id="9e6fd101-aeff-4eda-a4d7-0918e2661356" data-file-name="components/dashboard/search-bar.tsx">
            <div className="flex items-start justify-center pt-20" data-unique-id="f3ecfccf-cf33-4e61-be1f-d4a563476679" data-file-name="components/dashboard/search-bar.tsx">
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
            }} data-unique-id="3cf789ab-bc23-40e0-85b6-935dffbd4815" data-file-name="components/dashboard/search-bar.tsx">
                <div className="p-4 border-b border-border" data-unique-id="24f5ce2c-5cb2-460a-b455-5e4c643f6da3" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true">
                  <div className="flex items-center" data-unique-id="79d7e1f6-dbc2-4340-b027-90d5af33d6df" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true">
                    <Search className="h-5 w-5 text-muted-foreground mr-3" />
                    <input autoFocus type="text" placeholder="Search by meaning, not just keywords..." className="flex-1 bg-transparent outline-none text-base" value={query} onChange={e => setQuery(e.target.value)} data-unique-id="15b92a7e-ee1e-4748-9e7f-e2edbef847dd" data-file-name="components/dashboard/search-bar.tsx" />
                    {query && <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" onClick={() => setQuery("")} data-unique-id="a57b34d6-21f2-438e-b51f-737b4c69ef4f" data-file-name="components/dashboard/search-bar.tsx">
                        <X className="h-4 w-4" />
                        <span className="sr-only" data-unique-id="fddc4554-6427-44e6-87e8-f1c708274c90" data-file-name="components/dashboard/search-bar.tsx"><span className="editable-text" data-unique-id="a117a818-423a-4af8-8bfd-b5f2efa0c3d1" data-file-name="components/dashboard/search-bar.tsx">Clear search</span></span>
                      </Button>}
                  </div>
                  
                  {/* AI model selection */}
                  <div className="mt-2 flex justify-between items-center" data-unique-id="e2fc7bf4-91bd-4eef-aa5b-983f3f22e5fb" data-file-name="components/dashboard/search-bar.tsx">
                    <div className="text-xs text-muted-foreground" data-unique-id="e95b8295-3c8f-4373-b82e-47b0430ad2fb" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="245a507a-7c63-4216-b9e2-0f2a4f66603a" data-file-name="components/dashboard/search-bar.tsx">
                      Semantic Search powered by </span>{selectedModel === 'claude-bedrock' ? 'Claude' : 'OpenAI'}
                    </div>
                    <Button variant="outline" size="sm" className="text-xs h-7" onClick={toggleModel} data-unique-id="5ad373ec-86c6-43a7-851b-4062d8c856f2" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="817c3100-c092-49b5-862d-c49c16633c0b" data-file-name="components/dashboard/search-bar.tsx">
                      Switch to </span>{selectedModel === 'claude-bedrock' ? 'OpenAI' : 'Claude'}
                    </Button>
                  </div>
                </div>
                
                <div className="max-h-[60vh] overflow-y-auto" data-unique-id="adfceee2-9ea2-4bdd-95d8-17c3713f8d50" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true">
                  {loading ? <div className="py-8 flex justify-center items-center" data-unique-id="af839290-e8e1-415e-b31d-6bac5e23596b" data-file-name="components/dashboard/search-bar.tsx">
                      <Loader2 className="h-6 w-6 text-primary animate-spin" />
                      <span className="ml-2 text-sm text-muted-foreground" data-unique-id="906e6e59-2761-43cb-80aa-cdc370b61138" data-file-name="components/dashboard/search-bar.tsx"><span className="editable-text" data-unique-id="22a6da10-f7c7-4934-94f7-bed5e274fc62" data-file-name="components/dashboard/search-bar.tsx">Searching with AI...</span></span>
                    </div> : results.length > 0 ? <div className="divide-y divide-border" data-unique-id="f3d06efa-4a4f-4178-9ad7-6ce2d06eab3d" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true">
                      {results.map(result => <div key={result.id} className="p-4 hover:bg-secondary/50 transition-colors cursor-pointer" onClick={() => {
                    window.open(result.url, '_blank');
                    setShowModal(false);
                  }} data-unique-id="c826348f-78c6-47f4-b5d3-7b810cde7fcc" data-file-name="components/dashboard/search-bar.tsx">
                          <div className="flex items-center gap-3" data-unique-id="115cb398-9a88-427d-a85f-4c67e4cbfe4b" data-file-name="components/dashboard/search-bar.tsx">
                            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground" data-unique-id="a66e0f65-e887-41a8-94f3-ea4afea3344d" data-file-name="components/dashboard/search-bar.tsx">
                              <SourceIcon source={result.source} />
                            </div>
                            <div className="flex-1 min-w-0" data-unique-id="36350c8e-07c3-49f9-9518-1cdcda512af0" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true">
                              <h3 className="font-medium line-clamp-1" data-unique-id="3b22d817-0f5d-42f4-90fd-2578d4decb49" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true">{result.title}</h3>
                              {result.description && <p className="text-sm text-muted-foreground line-clamp-2" data-unique-id="f2f96129-58a2-4b7b-b4c0-98f6a03b16cb" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true">
                                  {result.description}
                                </p>}
                            </div>
                            <div className="ml-2" data-unique-id="84089ccd-c3a9-40ca-98da-16f36c9b0cbb" data-file-name="components/dashboard/search-bar.tsx">
                              <ArrowRight className="h-4 w-4 text-muted-foreground" />
                            </div>
                          </div>
                        </div>)}
                    </div> : query ? <div className="py-8 px-4 text-center text-muted-foreground" data-unique-id="688418c1-237c-47f3-8f3f-3492b8fb7c30" data-file-name="components/dashboard/search-bar.tsx">
                      <p data-unique-id="5f391706-6db1-49f5-b3d9-147680addc30" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="3f3d7e0a-2903-4fc3-846c-afbe906e61a2" data-file-name="components/dashboard/search-bar.tsx">No results found for "</span>{query}<span className="editable-text" data-unique-id="9f24c2f4-d33e-4f8a-8b7f-cf44cf0db051" data-file-name="components/dashboard/search-bar.tsx">"</span></p>
                      <p className="text-sm mt-1" data-unique-id="c71bfc84-1e1e-4ccf-8d8a-d9c1647640ad" data-file-name="components/dashboard/search-bar.tsx"><span className="editable-text" data-unique-id="ce67e050-072b-4c25-83d8-847dc09c66af" data-file-name="components/dashboard/search-bar.tsx">Try using different keywords or browse your collections</span></p>
                    </div> : <div className="py-8 px-4 text-center text-muted-foreground" data-unique-id="c8eb0680-a6bd-4eb0-9b9c-f26664acd1d6" data-file-name="components/dashboard/search-bar.tsx">
                      <p data-unique-id="eb8c363c-405d-48e7-a2e2-aeed7a584e15" data-file-name="components/dashboard/search-bar.tsx"><span className="editable-text" data-unique-id="f6871f56-207a-40c1-bb93-9f948416bda6" data-file-name="components/dashboard/search-bar.tsx">Start typing to search semantically across all saved content</span></p>
                      <p className="text-sm mt-1" data-unique-id="bce913ae-cdc6-4db9-8c04-176915a75167" data-file-name="components/dashboard/search-bar.tsx"><span className="editable-text" data-unique-id="40972f2a-b353-44af-946b-61295e53cdc2" data-file-name="components/dashboard/search-bar.tsx">Try "GraphQL auth pattern" or "React optimization"</span></p>
                    </div>}
                </div>
                
                <div className="px-4 py-3 bg-muted/30 border-t border-border text-xs text-muted-foreground flex justify-between" data-unique-id="d53aa685-5f40-4ea1-bf9f-1aa120de94bd" data-file-name="components/dashboard/search-bar.tsx">
                  <div data-unique-id="f767db7f-f27f-455f-aac6-c465c1fc8c63" data-file-name="components/dashboard/search-bar.tsx"><span className="editable-text" data-unique-id="7cbc45e7-ec80-491b-936e-8e26888b4743" data-file-name="components/dashboard/search-bar.tsx">
                    Press </span><kbd className="px-1 py-0.5 rounded border border-border bg-muted font-mono" data-unique-id="bfe466db-1091-43e7-aa64-c7b1c776c7bc" data-file-name="components/dashboard/search-bar.tsx"><span className="editable-text" data-unique-id="f552f8b1-9c58-4218-b02d-b17ee8cfd154" data-file-name="components/dashboard/search-bar.tsx">ESC</span></kbd><span className="editable-text" data-unique-id="0199d06a-d235-4f7b-b735-fba60bbcc84a" data-file-name="components/dashboard/search-bar.tsx"> to close
                  </span></div>
                  <div data-unique-id="910f9e85-cd14-407c-adc1-f6d5bd29effa" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true">
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