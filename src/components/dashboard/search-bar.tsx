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
      <div className={cn("relative", minimal ? "w-full" : "max-w-2xl mx-auto w-full")} data-unique-id="fd5a4457-ef0a-49b0-b297-cf05a20dd1c3" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true">
        <div className={cn("flex items-center rounded-lg border border-input bg-background px-3 py-2 text-sm transition-all", focused ? "border-primary ring-2 ring-primary ring-opacity-30" : "", minimal ? "" : "shadow-sm")} data-unique-id="5d4a0b07-b449-4701-8e1a-124ee7343c85" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true">
          <Search className="h-4 w-4 text-muted-foreground mr-2" />
          <input ref={inputRef} type="text" placeholder="Search across all your saved content..." className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground" value={query} onChange={e => setQuery(e.target.value)} onFocus={handleInputFocus} onBlur={() => setFocused(false)} data-unique-id="2c012e51-4d82-429d-ad8b-cc7dda48dd16" data-file-name="components/dashboard/search-bar.tsx" />
          
          {query && <Button variant="ghost" size="icon" className="h-5 w-5 text-muted-foreground hover:text-foreground" onClick={() => setQuery("")} data-unique-id="d8b2278e-8b3f-4bd3-875d-d04efaf78e9e" data-file-name="components/dashboard/search-bar.tsx">
              <X className="h-3 w-3" />
              <span className="sr-only" data-unique-id="9867f0b3-902c-4068-bc3f-656eef04443e" data-file-name="components/dashboard/search-bar.tsx"><span className="editable-text" data-unique-id="6860d0d1-86fa-43d3-9a27-bd81eb58ee36" data-file-name="components/dashboard/search-bar.tsx">Clear search</span></span>
            </Button>}
        </div>
        
        {!minimal && <div className="absolute right-3 top-2 text-xs text-muted-foreground pointer-events-none" data-unique-id="a046c068-ed99-41aa-b025-d9fca2089163" data-file-name="components/dashboard/search-bar.tsx">
            <kbd className="px-1.5 py-0.5 rounded border border-border bg-muted font-mono" data-unique-id="9530d41f-5837-4ab3-b5ba-9d657bf50f64" data-file-name="components/dashboard/search-bar.tsx"><span className="editable-text" data-unique-id="242e0aa2-edc0-46e3-8133-5d33975961b3" data-file-name="components/dashboard/search-bar.tsx">
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
        }} data-unique-id="4c8eb9f3-1fdb-4163-828f-28a79d7461be" data-file-name="components/dashboard/search-bar.tsx">
            <div className="flex items-start justify-center pt-20" data-unique-id="fa546358-b024-4907-b988-1bb8634401f8" data-file-name="components/dashboard/search-bar.tsx">
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
            }} data-unique-id="15f672af-f1c6-4eaf-a266-5d17516ae81e" data-file-name="components/dashboard/search-bar.tsx">
                <div className="p-4 border-b border-border" data-unique-id="45e1d9e5-359d-41e7-9f88-6dcfd60347dc" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true">
                  <div className="flex items-center" data-unique-id="446b72f7-011a-4704-8117-162887dcb4f0" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true">
                    <Search className="h-5 w-5 text-muted-foreground mr-3" />
                    <input autoFocus type="text" placeholder="Search by meaning, not just keywords..." className="flex-1 bg-transparent outline-none text-base" value={query} onChange={e => setQuery(e.target.value)} data-unique-id="1908f96c-7b33-4d8c-bac6-f40b3f1383a8" data-file-name="components/dashboard/search-bar.tsx" />
                    {query && <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" onClick={() => setQuery("")} data-unique-id="cab6f170-8e87-437f-8103-8bcc2b20d122" data-file-name="components/dashboard/search-bar.tsx">
                        <X className="h-4 w-4" />
                        <span className="sr-only" data-unique-id="639bebb3-46f6-4d9f-a781-6bd1540ff853" data-file-name="components/dashboard/search-bar.tsx"><span className="editable-text" data-unique-id="16297d21-e8ee-4831-9fa0-c015e71ae5f0" data-file-name="components/dashboard/search-bar.tsx">Clear search</span></span>
                      </Button>}
                  </div>
                  
                  {/* AI model selection */}
                  <div className="mt-2 flex justify-between items-center" data-unique-id="6a3602c7-8e22-4841-9cf9-39fc3b2a18af" data-file-name="components/dashboard/search-bar.tsx">
                    <div className="text-xs text-muted-foreground" data-unique-id="b84e8b27-0975-4923-abcc-39e19ca696ce" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="d0676800-fb7a-4667-94c5-6342fe65cecf" data-file-name="components/dashboard/search-bar.tsx">
                      Semantic Search powered by </span>{selectedModel === 'claude-bedrock' ? 'Claude' : 'OpenAI'}
                    </div>
                    <Button variant="outline" size="sm" className="text-xs h-7" onClick={toggleModel} data-unique-id="b6690863-6ceb-438d-a99f-5323849d7f0e" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="ec55bbde-fc25-442e-94dd-53234b21a590" data-file-name="components/dashboard/search-bar.tsx">
                      Switch to </span>{selectedModel === 'claude-bedrock' ? 'OpenAI' : 'Claude'}
                    </Button>
                  </div>
                </div>
                
                <div className="max-h-[60vh] overflow-y-auto" data-unique-id="53cf6d28-a26f-487d-8d3d-6f60553521e1" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true">
                  {loading ? <div className="py-8 flex justify-center items-center" data-unique-id="16e4353e-0352-4ea3-bb55-20e9d44b6cb0" data-file-name="components/dashboard/search-bar.tsx">
                      <Loader2 className="h-6 w-6 text-primary animate-spin" />
                      <span className="ml-2 text-sm text-muted-foreground" data-unique-id="b0d77390-26c7-40d5-9958-42c523756311" data-file-name="components/dashboard/search-bar.tsx"><span className="editable-text" data-unique-id="baf10c8d-2c4e-47cd-adfa-fa87d9a766c2" data-file-name="components/dashboard/search-bar.tsx">Searching with AI...</span></span>
                    </div> : results.length > 0 ? <div className="divide-y divide-border" data-unique-id="eeebf1d8-b1e5-4c3c-a53d-479274130ac4" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true">
                      {results.map(result => <div key={result.id} className="p-4 hover:bg-secondary/50 transition-colors cursor-pointer" onClick={() => {
                    window.open(result.url, '_blank');
                    setShowModal(false);
                  }} data-unique-id="ab0c032d-8259-466d-ac2e-39b691865f34" data-file-name="components/dashboard/search-bar.tsx">
                          <div className="flex items-center gap-3" data-unique-id="96421d2b-40a3-4ca6-ba22-0ec1ec8baad3" data-file-name="components/dashboard/search-bar.tsx">
                            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground" data-unique-id="588acf7b-a9bf-4c73-b420-2d5908dca9d6" data-file-name="components/dashboard/search-bar.tsx">
                              <SourceIcon source={result.source} />
                            </div>
                            <div className="flex-1 min-w-0" data-unique-id="44deb95c-7d33-4469-92a5-0e8872e3bb19" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true">
                              <h3 className="font-medium line-clamp-1" data-unique-id="10f4820c-6c5d-4139-b6ce-372ef6bb594f" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true">{result.title}</h3>
                              {result.description && <p className="text-sm text-muted-foreground line-clamp-2" data-unique-id="393ef23d-ca4d-4ba5-8e91-69caa011090b" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true">
                                  {result.description}
                                </p>}
                            </div>
                            <div className="ml-2" data-unique-id="fa373f95-4901-4ff4-b67b-4f447596769d" data-file-name="components/dashboard/search-bar.tsx">
                              <ArrowRight className="h-4 w-4 text-muted-foreground" />
                            </div>
                          </div>
                        </div>)}
                    </div> : query ? <div className="py-8 px-4 text-center text-muted-foreground" data-unique-id="e8e8a452-03b8-417b-a4c0-aab3d32bcb79" data-file-name="components/dashboard/search-bar.tsx">
                      <p data-unique-id="b42b9b04-f2bb-4e6c-83d9-6ef74390fded" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="8cc117a5-f72d-42cf-86ba-52ddd14e40b1" data-file-name="components/dashboard/search-bar.tsx">No results found for "</span>{query}<span className="editable-text" data-unique-id="33042442-f2a3-4159-91d2-f07241906911" data-file-name="components/dashboard/search-bar.tsx">"</span></p>
                      <p className="text-sm mt-1" data-unique-id="ff98b786-2a6a-4019-8097-514f2b5ce7b9" data-file-name="components/dashboard/search-bar.tsx"><span className="editable-text" data-unique-id="27766244-aa30-4b80-9f66-41e00cf15f4d" data-file-name="components/dashboard/search-bar.tsx">Try using different keywords or browse your collections</span></p>
                    </div> : <div className="py-8 px-4 text-center text-muted-foreground" data-unique-id="08b46ae7-59d0-464b-8a9d-316070b25f32" data-file-name="components/dashboard/search-bar.tsx">
                      <p data-unique-id="43505c36-75cf-4fef-b4b2-f0c9c11f5e91" data-file-name="components/dashboard/search-bar.tsx"><span className="editable-text" data-unique-id="bd9fd515-8465-4eca-b276-35fae96632f6" data-file-name="components/dashboard/search-bar.tsx">Start typing to search semantically across all saved content</span></p>
                      <p className="text-sm mt-1" data-unique-id="194169fa-cd2d-42ad-87fe-6df27d227d75" data-file-name="components/dashboard/search-bar.tsx"><span className="editable-text" data-unique-id="78c169c8-a429-4a4d-9728-812a8199cc8e" data-file-name="components/dashboard/search-bar.tsx">Try "GraphQL auth pattern" or "React optimization"</span></p>
                    </div>}
                </div>
                
                <div className="px-4 py-3 bg-muted/30 border-t border-border text-xs text-muted-foreground flex justify-between" data-unique-id="6037772c-df5e-4cc7-a6a6-b32df5dca08c" data-file-name="components/dashboard/search-bar.tsx">
                  <div data-unique-id="a7894e4d-9545-4e29-b680-40b582e1b9db" data-file-name="components/dashboard/search-bar.tsx"><span className="editable-text" data-unique-id="a33fbc32-db51-4283-bd1e-5df6fce02a88" data-file-name="components/dashboard/search-bar.tsx">
                    Press </span><kbd className="px-1 py-0.5 rounded border border-border bg-muted font-mono" data-unique-id="447af364-b891-4397-a067-5efbc34d6e35" data-file-name="components/dashboard/search-bar.tsx"><span className="editable-text" data-unique-id="11be8bde-11c8-46bf-a6fe-e70155b74af5" data-file-name="components/dashboard/search-bar.tsx">ESC</span></kbd><span className="editable-text" data-unique-id="ff6d59fd-ed67-4b07-b2d0-8ed0ee60b155" data-file-name="components/dashboard/search-bar.tsx"> to close
                  </span></div>
                  <div data-unique-id="e491e9e1-ec99-4d28-9f52-ae5c3f718272" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true">
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