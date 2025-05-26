"use client";

import { useState } from 'react';
import { analyzeBookmarksForCollection, SemanticAnalysisResult } from '@/services/semanticAnalysis';
import { UIBookmark } from '@/utils/transformBookmarks';
import { Button } from '@/components/ui/button';
import { Sparkles, Code, Database, Smartphone, Brain, FolderPlus } from 'lucide-react';

// Example bookmark sets for different scenarios
const EXAMPLE_BOOKMARK_SETS = {
  react: [
    {
      id: 1,
      title: "React Hooks Tutorial - Complete Guide",
      description: "Learn React hooks with useState, useEffect, and custom hooks",
      content: "React hooks tutorial covering useState, useEffect, useContext, and building custom hooks",
      sourceUrl: "https://reactjs.org/docs/hooks-intro.html",
      image: null,
      source: "github",
      tags: ["react", "hooks", "javascript", "frontend"],
      savedAt: new Date(),
      starred: false,
      engagement: { saves: 0, stars: 1250, likes: 0, votes: 0, upvotes: 0 }
    },
    {
      id: 2,
      title: "Next.js 13 App Router Guide",
      description: "Complete guide to Next.js 13 app router and server components",
      content: "Next.js 13 introduces the new app router with server components and improved performance",
      sourceUrl: "https://nextjs.org/docs/app",
      image: null,
      source: "github",
      tags: ["nextjs", "react", "ssr", "app-router"],
      savedAt: new Date(),
      starred: true,
      engagement: { saves: 0, stars: 890, likes: 0, votes: 0, upvotes: 0 }
    },
    {
      id: 3,
      title: "React Component Testing with Jest",
      description: "Best practices for testing React components using Jest and React Testing Library",
      content: "Testing React components with Jest, React Testing Library, and modern testing patterns",
      sourceUrl: "https://testing-library.com/docs/react-testing-library/intro/",
      image: null,
      source: "github",
      tags: ["react", "testing", "jest", "javascript"],
      savedAt: new Date(),
      starred: false,
      engagement: { saves: 0, stars: 567, likes: 0, votes: 0, upvotes: 0 }
    }
  ] as UIBookmark[],
  
  python: [
    {
      id: 4,
      title: "Python Data Science with Pandas",
      description: "Complete guide to data analysis using pandas and numpy",
      content: "Learn data science with Python using pandas for data manipulation and numpy for numerical computing",
      sourceUrl: "https://pandas.pydata.org/docs/",
      image: null,
      source: "github",
      tags: ["python", "pandas", "data-science", "numpy"],
      savedAt: new Date(),
      starred: true,
      engagement: { saves: 0, stars: 2100, likes: 0, votes: 0, upvotes: 0 }
    },
    {
      id: 5,
      title: "FastAPI Modern Python Web Framework",
      description: "Build high-performance APIs with FastAPI and Python type hints",
      content: "FastAPI is a modern, fast web framework for building APIs with Python 3.6+ based on standard Python type hints",
      sourceUrl: "https://fastapi.tiangolo.com/",
      image: null,
      source: "github",
      tags: ["python", "fastapi", "api", "web-framework"],
      savedAt: new Date(),
      starred: false,
      engagement: { saves: 0, stars: 1800, likes: 0, votes: 0, upvotes: 0 }
    },
    {
      id: 6,
      title: "Machine Learning with PyTorch",
      description: "Deep learning and neural networks using PyTorch framework",
      content: "PyTorch tutorial for machine learning, deep learning, and building neural networks",
      sourceUrl: "https://pytorch.org/tutorials/",
      image: null,
      source: "github",
      tags: ["python", "pytorch", "machine-learning", "deep-learning"],
      savedAt: new Date(),
      starred: true,
      engagement: { saves: 0, stars: 3200, likes: 0, votes: 0, upvotes: 0 }
    }
  ] as UIBookmark[],
  
  blockchain: [
    {
      id: 7,
      title: "Solidity Smart Contract Development",
      description: "Learn to build smart contracts on Ethereum using Solidity",
      content: "Complete guide to Solidity programming for Ethereum smart contract development",
      sourceUrl: "https://docs.soliditylang.org/",
      image: null,
      source: "github",
      tags: ["solidity", "ethereum", "smart-contracts", "blockchain"],
      savedAt: new Date(),
      starred: true,
      engagement: { saves: 0, stars: 1500, likes: 0, votes: 0, upvotes: 0 }
    },
    {
      id: 8,
      title: "Web3.js Ethereum JavaScript API",
      description: "Interact with Ethereum blockchain using Web3.js library",
      content: "Web3.js is a collection of libraries that allow you to interact with a local or remote ethereum node",
      sourceUrl: "https://web3js.readthedocs.io/",
      image: null,
      source: "github",
      tags: ["web3", "ethereum", "javascript", "blockchain"],
      savedAt: new Date(),
      starred: false,
      engagement: { saves: 0, stars: 980, likes: 0, votes: 0, upvotes: 0 }
    },
    {
      id: 9,
      title: "DeFi Protocol Development Guide",
      description: "Building decentralized finance protocols on Ethereum",
      content: "Learn to build DeFi protocols, yield farming, and decentralized exchanges on Ethereum",
      sourceUrl: "https://ethereum.org/en/defi/",
      image: null,
      source: "github",
      tags: ["defi", "ethereum", "protocol", "blockchain"],
      savedAt: new Date(),
      starred: true,
      engagement: { saves: 0, stars: 750, likes: 0, votes: 0, upvotes: 0 }
    }
  ] as UIBookmark[],
  
  mixed: [
    {
      id: 10,
      title: "React Native Mobile Development",
      description: "Build cross-platform mobile apps with React Native",
      content: "React Native tutorial for building iOS and Android apps using JavaScript and React",
      sourceUrl: "https://reactnative.dev/docs/getting-started",
      image: null,
      source: "github",
      tags: ["react-native", "mobile", "ios", "android"],
      savedAt: new Date(),
      starred: false,
      engagement: { saves: 0, stars: 1200, likes: 0, votes: 0, upvotes: 0 }
    },
    {
      id: 11,
      title: "PostgreSQL Database Optimization",
      description: "Advanced PostgreSQL performance tuning and optimization techniques",
      content: "Learn PostgreSQL optimization, indexing strategies, and query performance tuning",
      sourceUrl: "https://www.postgresql.org/docs/",
      image: null,
      source: "stackoverflow",
      tags: ["postgresql", "database", "optimization", "sql"],
      savedAt: new Date(),
      starred: true,
      engagement: { saves: 0, stars: 0, likes: 0, votes: 450, upvotes: 0 }
    },
    {
      id: 12,
      title: "Financial Markets Analysis with Python",
      description: "Quantitative finance and algorithmic trading using Python",
      content: "Python for quantitative finance, algorithmic trading, and financial market analysis",
      sourceUrl: "https://github.com/quantopian/zipline",
      image: null,
      source: "github",
      tags: ["python", "finance", "quant", "trading"],
      savedAt: new Date(),
      starred: false,
      engagement: { saves: 0, stars: 890, likes: 0, votes: 0, upvotes: 0 }
    }
  ] as UIBookmark[]
};

export default function SemanticAnalysisDemo() {
  const [selectedSet, setSelectedSet] = useState<keyof typeof EXAMPLE_BOOKMARK_SETS>('react');
  const [analysis, setAnalysis] = useState<SemanticAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const runAnalysis = async (bookmarkSet: keyof typeof EXAMPLE_BOOKMARK_SETS) => {
    setIsAnalyzing(true);
    setSelectedSet(bookmarkSet);
    
    // Simulate analysis delay for demo effect
    setTimeout(() => {
      const result = analyzeBookmarksForCollection(EXAMPLE_BOOKMARK_SETS[bookmarkSet]);
      setAnalysis(result);
      setIsAnalyzing(false);
    }, 1000);
  };

  const getSetIcon = (set: keyof typeof EXAMPLE_BOOKMARK_SETS) => {
    switch (set) {
      case 'react': return <Code className="h-5 w-5" />;
      case 'python': return <Brain className="h-5 w-5" />;
      case 'blockchain': return <Database className="h-5 w-5" />;
      case 'mixed': return <Smartphone className="h-5 w-5" />;
    }
  };

  const getSetDescription = (set: keyof typeof EXAMPLE_BOOKMARK_SETS) => {
    switch (set) {
      case 'react': return 'React & Frontend Development';
      case 'python': return 'Python & Data Science';
      case 'blockchain': return 'Blockchain & Web3';
      case 'mixed': return 'Mixed Technologies';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Smart Collection Analysis Demo</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Experience how our AI-powered semantic analysis examines bookmark content, identifies patterns, 
          and suggests intelligent collection names based on technologies, frameworks, and topics.
        </p>
      </div>

      {/* Bookmark Set Selection */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.keys(EXAMPLE_BOOKMARK_SETS).map((set) => (
          <Button
            key={set}
            variant={selectedSet === set ? "default" : "outline"}
            className="h-20 flex flex-col items-center justify-center space-y-2"
            onClick={() => runAnalysis(set as keyof typeof EXAMPLE_BOOKMARK_SETS)}
            disabled={isAnalyzing}
          >
            {getSetIcon(set as keyof typeof EXAMPLE_BOOKMARK_SETS)}
            <span className="text-sm font-medium">
              {getSetDescription(set as keyof typeof EXAMPLE_BOOKMARK_SETS)}
            </span>
          </Button>
        ))}
      </div>

      {/* Selected Bookmarks Preview */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold mb-3">Selected Bookmarks ({EXAMPLE_BOOKMARK_SETS[selectedSet].length})</h3>
        <div className="space-y-2">
          {EXAMPLE_BOOKMARK_SETS[selectedSet].map((bookmark) => (
            <div key={bookmark.id} className="flex items-center space-x-3 p-2 bg-muted/30 rounded">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <div className="flex-1">
                <p className="font-medium text-sm">{bookmark.title}</p>
                <p className="text-xs text-muted-foreground">{bookmark.description}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {bookmark.tags.map((tag, i) => (
                    <span key={i} className="px-1.5 py-0.5 bg-secondary text-secondary-foreground text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Analysis Results */}
      {isAnalyzing ? (
        <div className="bg-card border border-border rounded-lg p-8 text-center">
          <Sparkles className="h-8 w-8 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-lg font-medium">Analyzing bookmark content...</p>
          <div className="mt-4 space-y-2 text-sm text-muted-foreground">
            <p>🔍 Extracting keywords from titles and descriptions</p>
            <p>🏷️ Identifying technology patterns and frameworks</p>
            <p>🎯 Analyzing content domains and sources</p>
            <p>🧠 Generating intelligent collection suggestions</p>
          </div>
        </div>
      ) : analysis ? (
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Sparkles className="h-6 w-6 text-primary" />
            <h3 className="text-xl font-semibold">Smart Analysis Results</h3>
            <span className="px-2 py-1 bg-primary/10 text-primary text-sm rounded-full">
              {Math.round(analysis.confidence * 100)}% confidence
            </span>
          </div>

          {/* Suggestions */}
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-3">Suggested Collection Names</h4>
              <div className="grid gap-3">
                {analysis.suggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <p className="font-semibold">{suggestion.name}</p>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          suggestion.confidence > 0.8 ? "bg-green-100 text-green-700" :
                          suggestion.confidence > 0.6 ? "bg-yellow-100 text-yellow-700" :
                          "bg-gray-100 text-gray-700"
                        }`}>
                          {Math.round(suggestion.confidence * 100)}% match
                        </span>
                        <span className="px-2 py-0.5 bg-secondary text-secondary-foreground text-xs rounded">
                          {suggestion.category}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{suggestion.reasoning}</p>
                      {suggestion.keywords.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {suggestion.keywords.slice(0, 5).map((keyword, i) => (
                            <span key={i} className="px-1.5 py-0.5 bg-primary/10 text-primary text-xs rounded">
                              {keyword}
                            </span>
                          ))}
                          {suggestion.keywords.length > 5 && (
                            <span className="text-xs text-muted-foreground">+{suggestion.keywords.length - 5} more</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Detected Patterns */}
            <div className="pt-4 border-t border-border">
              <h4 className="font-medium mb-3">Detected Patterns & Analysis</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {analysis.patterns.technologies.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">🔧 Technologies</p>
                    <div className="flex flex-wrap gap-1">
                      {analysis.patterns.technologies.map((tech, i) => (
                        <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {analysis.patterns.sources.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">📍 Sources</p>
                    <div className="flex flex-wrap gap-1">
                      {analysis.patterns.sources.map((source, i) => (
                        <span key={i} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                          {source}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {analysis.patterns.frameworks.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">🏗️ Frameworks</p>
                    <div className="flex flex-wrap gap-1">
                      {analysis.patterns.frameworks.map((framework, i) => (
                        <span key={i} className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded">
                          {framework}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {analysis.patterns.languages.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">💻 Languages</p>
                    <div className="flex flex-wrap gap-1">
                      {analysis.patterns.languages.map((language, i) => (
                        <span key={i} className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded">
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {analysis.patterns.commonKeywords.length > 0 && (
                  <div className="md:col-span-2">
                    <p className="text-sm font-medium text-muted-foreground mb-2">🔑 Common Keywords</p>
                    <div className="flex flex-wrap gap-1">
                      {analysis.patterns.commonKeywords.slice(0, 12).map((keyword, i) => (
                        <span key={i} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">
                          {keyword}
                        </span>
                      ))}
                      {analysis.patterns.commonKeywords.length > 12 && (
                        <span className="text-xs text-muted-foreground">+{analysis.patterns.commonKeywords.length - 12} more</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Analysis Methodology */}
              <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                <h5 className="font-medium mb-2 text-sm">How the Analysis Works</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-muted-foreground">
                  <div>
                    <p><strong>Pattern Recognition:</strong> Identifies technology stacks, frameworks, and programming languages</p>
                  </div>
                  <div>
                    <p><strong>Contextual Analysis:</strong> Examines URLs, titles, and descriptions for domain-specific patterns</p>
                  </div>
                  <div>
                    <p><strong>Confidence Scoring:</strong> Calculates suggestion confidence based on pattern frequency and relevance</p>
                  </div>
                  <div>
                    <p><strong>Smart Categorization:</strong> Groups related technologies and suggests meaningful collection names</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-lg p-8 text-center">
          <Sparkles className="h-8 w-8 text-muted-foreground mx-auto mb-4" />
          <p className="text-lg font-medium text-muted-foreground">
            Select a bookmark set above to see smart analysis in action
          </p>
        </div>
      )}

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg p-6 text-center">
        <h3 className="text-lg font-semibold mb-2">Ready to organize your bookmarks?</h3>
        <p className="text-muted-foreground mb-4">
          This smart analysis is built into Skoop's collection system. Connect your accounts and let AI help organize your bookmarks automatically.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button className="skoop-button-primary">
            <FolderPlus className="h-4 w-4 mr-2" />
            Try with Your Bookmarks
          </Button>
          <Button variant="outline">
            <Sparkles className="h-4 w-4 mr-2" />
            Learn More About Collections
          </Button>
        </div>
      </div>
    </div>
  );
} 