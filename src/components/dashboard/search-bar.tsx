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
      <div className={cn("relative", minimal ? "w-full" : "max-w-2xl mx-auto w-full")} data-unique-id="d60dc509-f3c2-4794-b042-b742e77418b5" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true">
        <div className={cn("flex items-center rounded-lg border border-input bg-background px-3 py-2 text-sm transition-all", focused ? "border-primary ring-2 ring-primary ring-opacity-30" : "", minimal ? "" : "shadow-sm")} data-unique-id="2d1bd50a-edf9-41f2-bc7b-5db955aafa21" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true">
          <Search className="h-4 w-4 text-muted-foreground mr-2" />
          <input ref={inputRef} type="text" placeholder="Search across all your saved content..." className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground" value={query} onChange={e => setQuery(e.target.value)} onFocus={handleInputFocus} onBlur={() => setFocused(false)} data-unique-id="f80a48ec-e512-4f12-869d-6b10aeb80e42" data-file-name="components/dashboard/search-bar.tsx" />
          
          {query && <Button variant="ghost" size="icon" className="h-5 w-5 text-muted-foreground hover:text-foreground" onClick={() => setQuery("")} data-unique-id="8e43f8d0-3c50-451f-b995-b422f4809037" data-file-name="components/dashboard/search-bar.tsx">
              <X className="h-3 w-3" />
              <span className="sr-only" data-unique-id="e1f23916-9141-4fcb-b671-62f63b170d4f" data-file-name="components/dashboard/search-bar.tsx"><span className="editable-text" data-unique-id="9ebc4381-0479-4ad8-bec8-1599de48aec2" data-file-name="components/dashboard/search-bar.tsx">Clear search</span></span>
            </Button>}
        </div>
        
        {!minimal && <div className="absolute right-3 top-2 text-xs text-muted-foreground pointer-events-none" data-unique-id="9f57af2e-6930-4f42-9bdf-64a60bb4c7d7" data-file-name="components/dashboard/search-bar.tsx">
            <kbd className="px-1.5 py-0.5 rounded border border-border bg-muted font-mono" data-unique-id="402527bf-8454-4c6e-81fb-92ade613cc7d" data-file-name="components/dashboard/search-bar.tsx"><span className="editable-text" data-unique-id="600b2c6b-1e85-4231-b0c6-8cf059109468" data-file-name="components/dashboard/search-bar.tsx">
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
        }} data-unique-id="24665325-91e5-43a1-b0cc-78f42f5a4451" data-file-name="components/dashboard/search-bar.tsx">
            <div className="flex items-start justify-center pt-20" data-unique-id="6fc5ecd6-9f0d-4128-9d91-be1dcdda8965" data-file-name="components/dashboard/search-bar.tsx">
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
            }} data-unique-id="17a0d156-0085-4020-a6da-db53de610ae9" data-file-name="components/dashboard/search-bar.tsx">
                <div className="p-4 border-b border-border" data-unique-id="0cdacfe8-5a0d-4e43-a06c-38eb2d42d210" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true">
                  <div className="flex items-center" data-unique-id="f8a95ffa-6378-434f-ab4a-3084bc239ff9" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true">
                    <Search className="h-5 w-5 text-muted-foreground mr-3" />
                    <input autoFocus type="text" placeholder="Search by meaning, not just keywords..." className="flex-1 bg-transparent outline-none text-base" value={query} onChange={e => setQuery(e.target.value)} data-unique-id="c0cc4f09-e864-4b05-879f-e812407dd26f" data-file-name="components/dashboard/search-bar.tsx" />
                    {query && <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" onClick={() => setQuery("")} data-unique-id="58959c0b-df42-443b-807b-4a361c7ffc76" data-file-name="components/dashboard/search-bar.tsx">
                        <X className="h-4 w-4" />
                        <span className="sr-only" data-unique-id="8063d2cd-20d4-421b-972b-b6495955a86c" data-file-name="components/dashboard/search-bar.tsx"><span className="editable-text" data-unique-id="7d083307-dc2e-4900-a47e-9b1d94057541" data-file-name="components/dashboard/search-bar.tsx">Clear search</span></span>
                      </Button>}
                  </div>
                  
                  {/* AI model selection */}
                  <div className="mt-2 flex justify-between items-center" data-unique-id="cc4ca8f6-a842-44c5-b1c6-a81c90ce93b7" data-file-name="components/dashboard/search-bar.tsx">
                    <div className="text-xs text-muted-foreground" data-unique-id="348681b2-2d83-4c67-936d-944d7135d5fc" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="b69ecc93-afe7-4a21-bac5-2e35111781fe" data-file-name="components/dashboard/search-bar.tsx">
                      Semantic Search powered by </span>{selectedModel === 'claude-bedrock' ? 'Claude' : 'OpenAI'}
                    </div>
                    <Button variant="outline" size="sm" className="text-xs h-7" onClick={toggleModel} data-unique-id="d3ac803a-90ba-4cbe-bcf7-2cd213b2c6f7" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="d7c75d17-2c05-4289-9a89-ee6e06b4b2dd" data-file-name="components/dashboard/search-bar.tsx">
                      Switch to </span>{selectedModel === 'claude-bedrock' ? 'OpenAI' : 'Claude'}
                    </Button>
                  </div>
                </div>
                
                <div className="max-h-[60vh] overflow-y-auto" data-unique-id="6691f79d-4bd4-460a-bff6-bf031b99380a" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true">
                  {loading ? <div className="py-8 flex justify-center items-center" data-unique-id="05329bc8-e5a2-41a6-929f-ba1c063fdcf4" data-file-name="components/dashboard/search-bar.tsx">
                      <Loader2 className="h-6 w-6 text-primary animate-spin" />
                      <span className="ml-2 text-sm text-muted-foreground" data-unique-id="1fc385a5-ded3-4ef5-80f1-6d0fc3a880ff" data-file-name="components/dashboard/search-bar.tsx"><span className="editable-text" data-unique-id="2a15fb87-2da8-4854-894b-001210a2bb00" data-file-name="components/dashboard/search-bar.tsx">Searching with AI...</span></span>
                    </div> : results.length > 0 ? <div className="divide-y divide-border" data-unique-id="66334270-1e9d-4ae4-a2bf-12702a2dd46c" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true">
                      {results.map(result => <div key={result.id} className="p-4 hover:bg-secondary/50 transition-colors cursor-pointer" onClick={() => {
                    window.open(result.url, '_blank');
                    setShowModal(false);
                  }} data-unique-id="b7fbe731-91c0-4d79-905d-445fb59171cc" data-file-name="components/dashboard/search-bar.tsx">
                          <div className="flex items-center gap-3" data-unique-id="633110ca-5e61-41ff-8f93-d4e9a5897eb3" data-file-name="components/dashboard/search-bar.tsx">
                            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground" data-unique-id="23b905db-54d8-467b-839e-c046a094b731" data-file-name="components/dashboard/search-bar.tsx">
                              <SourceIcon source={result.source} />
                            </div>
                            <div className="flex-1 min-w-0" data-unique-id="7a7dbc3d-e4d7-4ce0-85e9-d20b4e82ea57" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true">
                              <h3 className="font-medium line-clamp-1" data-unique-id="e9a1ffe4-c038-42db-ae28-05c9104f4061" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true">{result.title}</h3>
                              {result.description && <p className="text-sm text-muted-foreground line-clamp-2" data-unique-id="03ab1c53-dfe4-46d1-84c3-161518852ea8" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true">
                                  {result.description}
                                </p>}
                            </div>
                            <div className="ml-2" data-unique-id="ae149e3b-4c04-4e7d-b2bb-ed7d9154888f" data-file-name="components/dashboard/search-bar.tsx">
                              <ArrowRight className="h-4 w-4 text-muted-foreground" />
                            </div>
                          </div>
                        </div>)}
                    </div> : query ? <div className="py-8 px-4 text-center text-muted-foreground" data-unique-id="6c72ba22-c7eb-4931-a2be-12a8bcd1709d" data-file-name="components/dashboard/search-bar.tsx">
                      <p data-unique-id="4a6f526f-2b1c-4dcc-8854-fe7ddbcbd55e" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="8562bdf9-2d7f-4a74-a69e-0edb50009bae" data-file-name="components/dashboard/search-bar.tsx">No results found for "</span>{query}<span className="editable-text" data-unique-id="d3f6d334-5e8b-4aea-bdf3-cae7dec6e824" data-file-name="components/dashboard/search-bar.tsx">"</span></p>
                      <p className="text-sm mt-1" data-unique-id="aee2b17c-64eb-4439-9ef2-a777761b51f3" data-file-name="components/dashboard/search-bar.tsx"><span className="editable-text" data-unique-id="6912735b-3fc8-4d2b-b2a8-d6c2bd512dab" data-file-name="components/dashboard/search-bar.tsx">Try using different keywords or browse your collections</span></p>
                    </div> : <div className="py-8 px-4 text-center text-muted-foreground" data-unique-id="cac8f46c-8a39-4427-b707-69bd22abad51" data-file-name="components/dashboard/search-bar.tsx">
                      <p data-unique-id="aba4114f-3832-48e9-bbfc-2a199ae24c27" data-file-name="components/dashboard/search-bar.tsx"><span className="editable-text" data-unique-id="5f4c73cc-aa82-48ac-ae60-04ee53646e40" data-file-name="components/dashboard/search-bar.tsx">Start typing to search semantically across all saved content</span></p>
                      <p className="text-sm mt-1" data-unique-id="13826b5b-ee1e-4c96-a560-848a2f58c58d" data-file-name="components/dashboard/search-bar.tsx"><span className="editable-text" data-unique-id="a702dfbc-f70e-4b97-ab7a-182a07d31641" data-file-name="components/dashboard/search-bar.tsx">Try "GraphQL auth pattern" or "React optimization"</span></p>
                    </div>}
                </div>
                
                <div className="px-4 py-3 bg-muted/30 border-t border-border text-xs text-muted-foreground flex justify-between" data-unique-id="9a13136e-4ea7-4c01-a1c0-35eec57cbc1a" data-file-name="components/dashboard/search-bar.tsx">
                  <div data-unique-id="fe3ddf35-d5f6-41aa-b8f3-d1b15324b981" data-file-name="components/dashboard/search-bar.tsx"><span className="editable-text" data-unique-id="233eb190-3cc7-4bb3-afa3-61d19a5ec2d8" data-file-name="components/dashboard/search-bar.tsx">
                    Press </span><kbd className="px-1 py-0.5 rounded border border-border bg-muted font-mono" data-unique-id="8cc2a5d8-1764-477f-a067-5d519b2a0b96" data-file-name="components/dashboard/search-bar.tsx"><span className="editable-text" data-unique-id="6c9600e2-3d7b-41ed-9a44-1b52b461278c" data-file-name="components/dashboard/search-bar.tsx">ESC</span></kbd><span className="editable-text" data-unique-id="fbc55270-148a-4b9d-950a-01989d121827" data-file-name="components/dashboard/search-bar.tsx"> to close
                  </span></div>
                  <div data-unique-id="439a1647-9bc7-47a2-b0b1-fbac3a752062" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true">
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