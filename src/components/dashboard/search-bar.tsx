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
      <div className={cn("relative", minimal ? "w-full" : "max-w-2xl mx-auto w-full")} data-unique-id="9760974f-1bb9-4262-8a59-0f03c4bace58" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true">
        <div className={cn("flex items-center rounded-lg border border-input bg-background px-3 py-2 text-sm transition-all", focused ? "border-primary ring-2 ring-primary ring-opacity-30" : "", minimal ? "" : "shadow-sm")} data-unique-id="e6533f8e-1349-4742-85b8-dd79a30f5d05" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true">
          <Search className="h-4 w-4 text-muted-foreground mr-2" />
          <input ref={inputRef} type="text" placeholder={placeholder} className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground" value={query} onChange={e => setQuery(e.target.value)} onFocus={handleInputFocus} onBlur={() => setFocused(false)} data-unique-id="35a38512-f1f8-4db8-8256-4415bed5bdac" data-file-name="components/dashboard/search-bar.tsx" />
          
          {query && <Button variant="ghost" size="icon" className="h-5 w-5 text-muted-foreground hover:text-foreground" onClick={() => setQuery("")} data-unique-id="3274a606-acba-42dd-897c-f12ed1093434" data-file-name="components/dashboard/search-bar.tsx">
              <X className="h-3 w-3" />
              <span className="sr-only" data-unique-id="229d3015-930d-4cea-b194-52346ea0519c" data-file-name="components/dashboard/search-bar.tsx"><span className="editable-text" data-unique-id="a5a0bf3a-2520-47ef-9527-7906c85d86b1" data-file-name="components/dashboard/search-bar.tsx">Clear search</span></span>
            </Button>}
        </div>
        
        {!minimal && <div className="absolute right-3 top-2 text-xs text-muted-foreground pointer-events-none" data-unique-id="5a45f611-9f4c-404f-bbbc-063d7604fba4" data-file-name="components/dashboard/search-bar.tsx">
            <kbd className="px-1.5 py-0.5 rounded border border-border bg-muted font-mono" data-unique-id="87ea8ae6-09c9-4892-8298-e7d8c9f4f7cf" data-file-name="components/dashboard/search-bar.tsx"><span className="editable-text" data-unique-id="abb5b4c8-3c89-49ef-8959-7dbb28934eb6" data-file-name="components/dashboard/search-bar.tsx">
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
        }} data-unique-id="50fdb2f9-a26c-43c1-af27-b93df33c781f" data-file-name="components/dashboard/search-bar.tsx">
            <div className="flex items-start justify-center pt-20" data-unique-id="675f477b-c081-4357-9407-8024be1ba52c" data-file-name="components/dashboard/search-bar.tsx">
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
            }} data-unique-id="887a97fc-4232-4fa6-9802-e7de60e26ab0" data-file-name="components/dashboard/search-bar.tsx">
                <div className="p-4 border-b border-border" data-unique-id="ef6903b7-87d8-40b2-9578-4a4dc444673b" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true">
                  <div className="flex items-center" data-unique-id="6d1005c1-88bb-4ebb-809a-43db4e1166a1" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true">
                    <Search className="h-5 w-5 text-muted-foreground mr-3" />
                    <input autoFocus type="text" placeholder="Search by meaning, not just keywords..." className="flex-1 bg-transparent outline-none text-base" value={query} onChange={e => setQuery(e.target.value)} data-unique-id="74928485-c940-48a1-9117-8492ab51121f" data-file-name="components/dashboard/search-bar.tsx" />
                    {query && <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" onClick={() => setQuery("")} data-unique-id="82d5b290-3e50-45f0-ac30-ff569a70cffc" data-file-name="components/dashboard/search-bar.tsx">
                        <X className="h-4 w-4" />
                        <span className="sr-only" data-unique-id="9c53b0c8-c90b-4f8a-a45e-a3b27d4625fc" data-file-name="components/dashboard/search-bar.tsx"><span className="editable-text" data-unique-id="70403526-2679-4214-801c-2fb3b4c32c07" data-file-name="components/dashboard/search-bar.tsx">Clear search</span></span>
                      </Button>}
                  </div>
                  
                  {/* AI model selection */}
                  <div className="mt-2 flex justify-between items-center" data-unique-id="c3d3a037-6fd4-4cdd-adf2-a7180a83a5cd" data-file-name="components/dashboard/search-bar.tsx">
                    <div className="text-xs text-muted-foreground" data-unique-id="bba64b63-5ab6-4d6a-9d7b-68245f749c5c" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="97f2da4d-f77b-4346-b95d-f5fee862b7bc" data-file-name="components/dashboard/search-bar.tsx">
                      Semantic Search powered by </span>{selectedModel === 'claude-bedrock' ? 'Claude' : 'OpenAI'}
                    </div>
                    <Button variant="outline" size="sm" className="text-xs h-7" onClick={toggleModel} data-unique-id="49cd4982-d578-432d-aab1-e7c3257023e8" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="2ad522cd-7fe7-4ae3-8b97-99c97c2c802b" data-file-name="components/dashboard/search-bar.tsx">
                      Switch to </span>{selectedModel === 'claude-bedrock' ? 'OpenAI' : 'Claude'}
                    </Button>
                  </div>
                </div>
                
                <div className="max-h-[60vh] overflow-y-auto" data-unique-id="5c26a3aa-1211-40ce-96db-8cb6e6530c72" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true">
                  {loading ? <div className="py-8 flex justify-center items-center" data-unique-id="27b45991-577d-4f05-bd99-b42bc786af8b" data-file-name="components/dashboard/search-bar.tsx">
                      <Loader2 className="h-6 w-6 text-primary animate-spin" />
                      <span className="ml-2 text-sm text-muted-foreground" data-unique-id="96e12b41-5234-40b2-9cc1-795a7ac29b0e" data-file-name="components/dashboard/search-bar.tsx"><span className="editable-text" data-unique-id="7fc8a34d-a0f9-4345-bdcc-335a76c5ff63" data-file-name="components/dashboard/search-bar.tsx">Searching with AI...</span></span>
                    </div> : results.length > 0 ? <div className="divide-y divide-border" data-unique-id="75683821-1f53-4ea3-a382-ab8094ba7255" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true">
                      {results.map(result => <div key={result.id} className="p-4 hover:bg-secondary/50 transition-colors cursor-pointer" onClick={() => {
                    window.open(result.url, '_blank');
                    setShowModal(false);
                  }} data-unique-id="373e47e9-7f6e-462a-97a6-43da083ba790" data-file-name="components/dashboard/search-bar.tsx">
                          <div className="flex items-center gap-3" data-unique-id="19ec35ca-26f5-410a-92fd-9369e3c97c2f" data-file-name="components/dashboard/search-bar.tsx">
                            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground" data-unique-id="65fbfbfe-99ac-4232-a53f-e53888497a9b" data-file-name="components/dashboard/search-bar.tsx">
                              <SourceIcon source={result.source} />
                            </div>
                            <div className="flex-1 min-w-0" data-unique-id="2d40db25-0b7b-4726-a641-9bddb807c763" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true">
                              <h3 className="font-medium line-clamp-1" data-unique-id="2dcabb18-9264-427e-84a6-77b1497b59c0" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true">{result.title}</h3>
                              {result.description && <p className="text-sm text-muted-foreground line-clamp-2" data-unique-id="41ba9884-1629-4a98-84c5-800c69882970" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true">
                                  {result.description}
                                </p>}
                            </div>
                            <div className="ml-2" data-unique-id="13208fb2-48f2-4273-9fc4-3e58dc074d1a" data-file-name="components/dashboard/search-bar.tsx">
                              <ArrowRight className="h-4 w-4 text-muted-foreground" />
                            </div>
                          </div>
                        </div>)}
                    </div> : query ? <div className="py-8 px-4 text-center text-muted-foreground" data-unique-id="46b3067d-a5e2-4f76-a528-5344a8f01b8c" data-file-name="components/dashboard/search-bar.tsx">
                      <p data-unique-id="a94375c8-74e3-417d-bf21-96a2a93c26f0" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="dd092a48-898e-4027-aed4-07075332e802" data-file-name="components/dashboard/search-bar.tsx">No results found for "</span>{query}<span className="editable-text" data-unique-id="fd3c02b9-26c0-4d3b-8840-785477ce6a61" data-file-name="components/dashboard/search-bar.tsx">"</span></p>
                      <p className="text-sm mt-1" data-unique-id="a9eb7c77-fc9b-4be7-b925-f0b40b9105f2" data-file-name="components/dashboard/search-bar.tsx"><span className="editable-text" data-unique-id="e31b5fcd-80bd-44bb-81d8-9163f6b828d0" data-file-name="components/dashboard/search-bar.tsx">Try using different keywords or browse your collections</span></p>
                    </div> : <div className="py-8 px-4 text-center text-muted-foreground" data-unique-id="71e2c276-2af7-4d2b-a29b-45e9a6b53394" data-file-name="components/dashboard/search-bar.tsx">
                      <p data-unique-id="afdb1f48-313b-4ac0-8dcf-8d6092e87c37" data-file-name="components/dashboard/search-bar.tsx"><span className="editable-text" data-unique-id="313bc5e0-ef79-44f0-a4dc-023e3a32cfbc" data-file-name="components/dashboard/search-bar.tsx">Start typing to search semantically across all saved content</span></p>
                      <p className="text-sm mt-1" data-unique-id="4517a493-a0ca-4681-a124-d0baf0ea63e6" data-file-name="components/dashboard/search-bar.tsx"><span className="editable-text" data-unique-id="d2e59dd9-746e-4d82-a1ae-26574ae89abb" data-file-name="components/dashboard/search-bar.tsx">Try "GraphQL auth pattern" or "React optimization"</span></p>
                    </div>}
                </div>
                
                <div className="px-4 py-3 bg-muted/30 border-t border-border text-xs text-muted-foreground flex justify-between" data-unique-id="9fc12566-dabe-4543-8859-e6056f64186d" data-file-name="components/dashboard/search-bar.tsx">
                  <div data-unique-id="188a82b2-4000-4074-8624-54664b6b6d2d" data-file-name="components/dashboard/search-bar.tsx"><span className="editable-text" data-unique-id="a6040b3e-b326-421c-b5e9-9b043aca34eb" data-file-name="components/dashboard/search-bar.tsx">
                    Press </span><kbd className="px-1 py-0.5 rounded border border-border bg-muted font-mono" data-unique-id="3cbf3e30-4986-4113-9499-5d3fd8ac1ffd" data-file-name="components/dashboard/search-bar.tsx"><span className="editable-text" data-unique-id="309788a5-9a4b-462f-bcd6-69b1cdf511f3" data-file-name="components/dashboard/search-bar.tsx">ESC</span></kbd><span className="editable-text" data-unique-id="ccb02466-6d3c-4d38-874d-955d14d5724b" data-file-name="components/dashboard/search-bar.tsx"> to close
                  </span></div>
                  <div data-unique-id="65088e7f-0846-4b33-8201-905be6d39c8d" data-file-name="components/dashboard/search-bar.tsx" data-dynamic-text="true">
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