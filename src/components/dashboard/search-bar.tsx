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
      <div className={cn("relative", minimal ? "w-full" : "max-w-2xl mx-auto w-full")} data-unique-id="754506c8-88e2-4f08-a63c-837a981b89f7" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true">
        <div className={cn("flex items-center rounded-lg border border-input bg-background px-3 py-2 text-sm transition-all", focused ? "border-primary ring-2 ring-primary ring-opacity-30" : "", minimal ? "" : "shadow-sm")} data-unique-id="a82c6c0d-b7f9-4609-8aa6-69884df11dc8" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true">
          <Search className="h-4 w-4 text-muted-foreground mr-2" />
          <input ref={inputRef} type="text" placeholder="Search across all your saved content..." className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground" value={query} onChange={e => setQuery(e.target.value)} onFocus={handleInputFocus} onBlur={() => setFocused(false)} data-unique-id="5c3fb976-3027-4d49-8879-334b836ec404" data-file-name="components/dashboard/search-bar.tsx" />
          
          {query && <Button variant="ghost" size="icon" className="h-5 w-5 text-muted-foreground hover:text-foreground" onClick={() => setQuery("")} data-unique-id="59f1eb90-4d1b-4748-82fb-c613ec07202d" data-file-name="components/dashboard/search-bar.tsx">
              <X className="h-3 w-3" />
              <span className="sr-only" data-unique-id="eb345c07-df2b-42c2-a707-8fd6a5e43ce1" data-file-name="components/dashboard/search-bar.tsx"><span className="editable-text" data-unique-id="44c359b7-c06a-452e-84fb-ead9116dece9" data-file-name="components/dashboard/search-bar.tsx">Clear search</span></span>
            </Button>}
        </div>
        
        {!minimal && <div className="absolute right-3 top-2 text-xs text-muted-foreground pointer-events-none" data-unique-id="dcd2b3d4-313a-4202-ab89-32a3d9051a34" data-file-name="components/dashboard/search-bar.tsx">
            <kbd className="px-1.5 py-0.5 rounded border border-border bg-muted font-mono" data-unique-id="351f2402-cd01-4e2f-ad19-961118ca2ba1" data-file-name="components/dashboard/search-bar.tsx"><span className="editable-text" data-unique-id="b45c4c74-f6d9-4c64-8e80-b1f5df86d16f" data-file-name="components/dashboard/search-bar.tsx">
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
        }} data-unique-id="745cceec-62d0-4641-82ae-2d5f7ddf277e" data-file-name="components/dashboard/search-bar.tsx">
            <div className="flex items-start justify-center pt-20" data-unique-id="9e79aa22-02d5-40ff-a541-4d26111cd464" data-file-name="components/dashboard/search-bar.tsx">
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
            }} data-unique-id="709e2e99-669f-4db7-abcc-2894bf7976b1" data-file-name="components/dashboard/search-bar.tsx">
                <div className="p-4 border-b border-border" data-unique-id="9d824ce6-97fc-4c8e-b961-155d0b0e172b" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true">
                  <div className="flex items-center" data-unique-id="c8eada02-ff2b-489e-a8c8-3202e1415a23" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true">
                    <Search className="h-5 w-5 text-muted-foreground mr-3" />
                    <input autoFocus type="text" placeholder="Search by meaning, not just keywords..." className="flex-1 bg-transparent outline-none text-base" value={query} onChange={e => setQuery(e.target.value)} data-unique-id="8087f876-97c6-4628-b13b-71414df4c90a" data-file-name="components/dashboard/search-bar.tsx" />
                    {query && <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" onClick={() => setQuery("")} data-unique-id="f09c5d9a-4bc8-452b-94e2-f692d0ec4429" data-file-name="components/dashboard/search-bar.tsx">
                        <X className="h-4 w-4" />
                        <span className="sr-only" data-unique-id="46119fd9-f838-42d7-bae3-ca70237a59d4" data-file-name="components/dashboard/search-bar.tsx"><span className="editable-text" data-unique-id="f004579e-b59c-4688-bb71-ede81d72e366" data-file-name="components/dashboard/search-bar.tsx">Clear search</span></span>
                      </Button>}
                  </div>
                  
                  {/* AI model selection */}
                  <div className="mt-2 flex justify-between items-center" data-unique-id="7762fe5d-c1f2-47a3-b4d1-47168b661296" data-file-name="components/dashboard/search-bar.tsx">
                    <div className="text-xs text-muted-foreground" data-unique-id="1dabdfc4-0a1b-4815-bb4e-d71fe400739a" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="6e261611-55a8-41ef-a2ea-2f013280192c" data-file-name="components/dashboard/search-bar.tsx">
                      Semantic Search powered by </span>{selectedModel === 'claude-bedrock' ? 'Claude' : 'OpenAI'}
                    </div>
                    <Button variant="outline" size="sm" className="text-xs h-7" onClick={toggleModel} data-unique-id="262e964e-ce27-459d-9d6f-d55b3d83440c" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="bc2c7ecd-acf6-4bad-a14f-c3cf21ce54a2" data-file-name="components/dashboard/search-bar.tsx">
                      Switch to </span>{selectedModel === 'claude-bedrock' ? 'OpenAI' : 'Claude'}
                    </Button>
                  </div>
                </div>
                
                <div className="max-h-[60vh] overflow-y-auto" data-unique-id="16f15d8d-3e69-417c-ad34-1b1e764d7400" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true">
                  {loading ? <div className="py-8 flex justify-center items-center" data-unique-id="9bf39b44-4329-4387-9728-10d35e3da022" data-file-name="components/dashboard/search-bar.tsx">
                      <Loader2 className="h-6 w-6 text-primary animate-spin" />
                      <span className="ml-2 text-sm text-muted-foreground" data-unique-id="0a1ebb28-6020-4297-afc9-2720de8447ce" data-file-name="components/dashboard/search-bar.tsx"><span className="editable-text" data-unique-id="3bf11363-c338-4d50-85ec-1eb67617abe8" data-file-name="components/dashboard/search-bar.tsx">Searching with AI...</span></span>
                    </div> : results.length > 0 ? <div className="divide-y divide-border" data-unique-id="038f9d21-f8fc-46e3-b83c-6986a4ca2cfc" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true">
                      {results.map(result => <div key={result.id} className="p-4 hover:bg-secondary/50 transition-colors cursor-pointer" onClick={() => {
                    window.open(result.url, '_blank');
                    setShowModal(false);
                  }} data-unique-id="e83a6497-b025-4e93-ad23-5b0e4c7da1f5" data-file-name="components/dashboard/search-bar.tsx">
                          <div className="flex items-center gap-3" data-unique-id="691c40ea-d95c-4c64-8d3e-272069d386d7" data-file-name="components/dashboard/search-bar.tsx">
                            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground" data-unique-id="ee52d0cb-5c25-4d3c-833c-4d4aecd9af63" data-file-name="components/dashboard/search-bar.tsx">
                              <SourceIcon source={result.source} />
                            </div>
                            <div className="flex-1 min-w-0" data-unique-id="4dccd02d-90b1-40f0-811e-199a0b827cb6" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true">
                              <h3 className="font-medium line-clamp-1" data-unique-id="fa463d59-54b1-4881-890e-8f402e2b24d9" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true">{result.title}</h3>
                              {result.description && <p className="text-sm text-muted-foreground line-clamp-2" data-unique-id="261805a5-f36d-429e-99f8-de5a94b1623f" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true">
                                  {result.description}
                                </p>}
                            </div>
                            <div className="ml-2" data-unique-id="e6e99be9-9794-45f6-b61a-fcdc523af10d" data-file-name="components/dashboard/search-bar.tsx">
                              <ArrowRight className="h-4 w-4 text-muted-foreground" />
                            </div>
                          </div>
                        </div>)}
                    </div> : query ? <div className="py-8 px-4 text-center text-muted-foreground" data-unique-id="ff0b74c1-b59d-427a-a041-ebf9a2695226" data-file-name="components/dashboard/search-bar.tsx">
                      <p data-unique-id="a925eefe-8127-4bf1-9ad7-76f431057e1a" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="982eaa9c-448f-4ca5-b9d3-ccb24931d55d" data-file-name="components/dashboard/search-bar.tsx">No results found for "</span>{query}<span className="editable-text" data-unique-id="dc7b310c-f6d2-4f47-80e8-49a0dd647e9d" data-file-name="components/dashboard/search-bar.tsx">"</span></p>
                      <p className="text-sm mt-1" data-unique-id="c3ba0f22-39ea-4579-9f34-8d26f774232d" data-file-name="components/dashboard/search-bar.tsx"><span className="editable-text" data-unique-id="9636083d-47d7-41d6-9cb1-3be691589da2" data-file-name="components/dashboard/search-bar.tsx">Try using different keywords or browse your collections</span></p>
                    </div> : <div className="py-8 px-4 text-center text-muted-foreground" data-unique-id="ab543282-6f5b-4b1b-b445-434c58022a17" data-file-name="components/dashboard/search-bar.tsx">
                      <p data-unique-id="bcbf9420-aebc-460f-b80b-a392da751583" data-file-name="components/dashboard/search-bar.tsx"><span className="editable-text" data-unique-id="ffcf9f7a-2aee-492d-a396-6005f8f3ccb3" data-file-name="components/dashboard/search-bar.tsx">Start typing to search semantically across all saved content</span></p>
                      <p className="text-sm mt-1" data-unique-id="cccd58ec-c9a7-4e18-9486-b1cb73c1a090" data-file-name="components/dashboard/search-bar.tsx"><span className="editable-text" data-unique-id="c858c2df-509e-4df3-822b-7bfa982c3e28" data-file-name="components/dashboard/search-bar.tsx">Try "GraphQL auth pattern" or "React optimization"</span></p>
                    </div>}
                </div>
                
                <div className="px-4 py-3 bg-muted/30 border-t border-border text-xs text-muted-foreground flex justify-between" data-unique-id="c7069987-bc21-4647-bf99-6627ce6be070" data-file-name="components/dashboard/search-bar.tsx">
                  <div data-unique-id="a47543b1-3806-42e3-943c-9c7f8672a105" data-file-name="components/dashboard/search-bar.tsx"><span className="editable-text" data-unique-id="456ee1e4-363c-41ce-a8c2-98c7195ef3e4" data-file-name="components/dashboard/search-bar.tsx">
                    Press </span><kbd className="px-1 py-0.5 rounded border border-border bg-muted font-mono" data-unique-id="48d5f6a3-92c4-4546-862f-51195d6dc505" data-file-name="components/dashboard/search-bar.tsx"><span className="editable-text" data-unique-id="2c28de12-d544-4521-80b4-560527f5661f" data-file-name="components/dashboard/search-bar.tsx">ESC</span></kbd><span className="editable-text" data-unique-id="8f74e39b-35b4-4654-b6af-95917fa414b4" data-file-name="components/dashboard/search-bar.tsx"> to close
                  </span></div>
                  <div data-unique-id="9f33ef64-701a-4742-834a-4951ea8b6cab" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true">
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