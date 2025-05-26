import { UIBookmark } from '@/utils/transformBookmarks';

export interface SemanticSuggestion {
  name: string;
  confidence: number;
  reasoning: string;
  category: 'technology' | 'framework' | 'language' | 'domain' | 'topic' | 'source' | 'mixed';
  keywords: string[];
}

export interface SemanticAnalysisResult {
  suggestions: SemanticSuggestion[];
  patterns: {
    technologies: string[];
    frameworks: string[];
    languages: string[];
    domains: string[];
    sources: string[];
    commonKeywords: string[];
  };
  confidence: number;
}

// Technology and framework patterns
const TECH_PATTERNS = {
  // Frontend Frameworks & Libraries
  react: ['react', 'reactjs', 'jsx', 'hooks', 'component', 'redux', 'next.js', 'nextjs'],
  vue: ['vue', 'vuejs', 'nuxt', 'composition api', 'vue3'],
  angular: ['angular', 'angularjs', 'typescript', 'ng-', 'angular2+'],
  svelte: ['svelte', 'sveltekit'],
  
  // Backend Frameworks
  nodejs: ['node', 'nodejs', 'express', 'fastify', 'koa', 'npm'],
  python: ['python', 'django', 'flask', 'fastapi', 'pandas', 'numpy', 'pytorch', 'tensorflow'],
  php: ['php', 'laravel', 'symfony', 'wordpress', 'composer'],
  ruby: ['ruby', 'rails', 'gem', 'bundler'],
  java: ['java', 'spring', 'maven', 'gradle', 'hibernate'],
  csharp: ['c#', 'csharp', '.net', 'dotnet', 'asp.net', 'nuget'],
  go: ['golang', 'go lang', 'goroutine'],
  rust: ['rust', 'cargo', 'rustc'],
  
  // Databases
  database: ['sql', 'mysql', 'postgresql', 'mongodb', 'redis', 'database', 'db'],
  
  // Cloud & DevOps
  aws: ['aws', 'amazon web services', 'ec2', 's3', 'lambda', 'cloudformation'],
  azure: ['azure', 'microsoft azure'],
  gcp: ['google cloud', 'gcp', 'firebase'],
  docker: ['docker', 'container', 'dockerfile', 'kubernetes', 'k8s'],
  
  // Blockchain & Crypto
  blockchain: ['blockchain', 'crypto', 'bitcoin', 'ethereum', 'web3', 'defi'],
  solidity: ['solidity', 'smart contract', 'ethereum', 'web3'],
  
  // AI & ML
  ai: ['artificial intelligence', 'machine learning', 'deep learning', 'neural network', 'ai'],
  ml: ['tensorflow', 'pytorch', 'scikit-learn', 'keras', 'pandas', 'numpy'],
  
  // Mobile
  mobile: ['ios', 'android', 'react native', 'flutter', 'swift', 'kotlin'],
  
  // Design & UI/UX
  design: ['design', 'ui', 'ux', 'figma', 'sketch', 'adobe', 'css', 'sass', 'tailwind'],
  
  // Data & Analytics
  data: ['data science', 'analytics', 'visualization', 'tableau', 'power bi', 'jupyter'],
  
  // Security
  security: ['security', 'cybersecurity', 'penetration testing', 'vulnerability', 'encryption'],
  
  // Business & Finance
  finance: ['finance', 'fintech', 'trading', 'investment', 'banking', 'quant'],
  business: ['business', 'startup', 'entrepreneurship', 'marketing', 'sales'],
  
  // Content & Media
  journalism: ['journalism', 'news', 'media', 'writing', 'content', 'blog'],
  content: ['content creation', 'video', 'podcast', 'streaming', 'youtube'],
};

// Domain-specific patterns
const DOMAIN_PATTERNS = {
  github: ['github.com', 'repository', 'repo', 'open source', 'code'],
  stackoverflow: ['stackoverflow.com', 'programming', 'coding', 'development'],
  medium: ['medium.com', 'article', 'blog', 'tutorial'],
  dev: ['dev.to', 'developer', 'programming'],
  youtube: ['youtube.com', 'video', 'tutorial', 'course'],
  documentation: ['docs', 'documentation', 'api', 'guide', 'reference'],
  tutorial: ['tutorial', 'how to', 'guide', 'learn', 'course'],
  news: ['news', 'article', 'report', 'analysis'],
  research: ['research', 'paper', 'study', 'academic', 'arxiv'],
};

// Extract keywords from text
function extractKeywords(text: string): string[] {
  const words = text.toLowerCase()
    .replace(/[^\w\s-]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2)
    .filter(word => !['the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had', 'her', 'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his', 'how', 'its', 'may', 'new', 'now', 'old', 'see', 'two', 'who', 'boy', 'did', 'man', 'way', 'she', 'use', 'her', 'now', 'oil', 'sit', 'set'].includes(word));
  
  return [...new Set(words)];
}

// Analyze technology patterns in bookmarks
function analyzeTechPatterns(bookmarks: UIBookmark[]): { [key: string]: { count: number; confidence: number; examples: string[] } } {
  const results: { [key: string]: { count: number; confidence: number; examples: string[] } } = {};
  
  for (const [tech, patterns] of Object.entries(TECH_PATTERNS)) {
    let count = 0;
    const examples: string[] = [];
    
    bookmarks.forEach(bookmark => {
      const text = `${bookmark.title} ${bookmark.description} ${bookmark.sourceUrl} ${bookmark.tags.join(' ')}`.toLowerCase();
      
      const matches = patterns.filter(pattern => text.includes(pattern));
      if (matches.length > 0) {
        count++;
        examples.push(bookmark.title);
      }
    });
    
    if (count > 0) {
      const confidence = Math.min(count / bookmarks.length, 1);
      results[tech] = { count, confidence, examples: examples.slice(0, 3) };
    }
  }
  
  return results;
}

// Analyze domain patterns
function analyzeDomainPatterns(bookmarks: UIBookmark[]): { [key: string]: { count: number; confidence: number; examples: string[] } } {
  const results: { [key: string]: { count: number; confidence: number; examples: string[] } } = {};
  
  for (const [domain, patterns] of Object.entries(DOMAIN_PATTERNS)) {
    let count = 0;
    const examples: string[] = [];
    
    bookmarks.forEach(bookmark => {
      const text = `${bookmark.title} ${bookmark.description} ${bookmark.sourceUrl} ${bookmark.tags.join(' ')}`.toLowerCase();
      
      const matches = patterns.filter(pattern => text.includes(pattern));
      if (matches.length > 0) {
        count++;
        examples.push(bookmark.title);
      }
    });
    
    if (count > 0) {
      const confidence = Math.min(count / bookmarks.length, 1);
      results[domain] = { count, confidence, examples: examples.slice(0, 3) };
    }
  }
  
  return results;
}

// Find common keywords across bookmarks
function findCommonKeywords(bookmarks: UIBookmark[]): { [key: string]: number } {
  const keywordCounts: { [key: string]: number } = {};
  
  bookmarks.forEach(bookmark => {
    const keywords = extractKeywords(`${bookmark.title} ${bookmark.description} ${bookmark.tags.join(' ')}`);
    keywords.forEach(keyword => {
      keywordCounts[keyword] = (keywordCounts[keyword] || 0) + 1;
    });
  });
  
  // Filter keywords that appear in at least 2 bookmarks or 30% of bookmarks
  const threshold = Math.max(2, Math.ceil(bookmarks.length * 0.3));
  const commonKeywords: { [key: string]: number } = {};
  
  Object.entries(keywordCounts).forEach(([keyword, count]) => {
    if (count >= threshold) {
      commonKeywords[keyword] = count;
    }
  });
  
  return commonKeywords;
}

// Generate semantic suggestions
function generateSuggestions(
  techPatterns: { [key: string]: { count: number; confidence: number; examples: string[] } },
  domainPatterns: { [key: string]: { count: number; confidence: number; examples: string[] } },
  commonKeywords: { [key: string]: number },
  bookmarks: UIBookmark[]
): SemanticSuggestion[] {
  const suggestions: SemanticSuggestion[] = [];
  
  // Categorize technologies for better suggestions
  const frontendTechs = ['react', 'vue', 'angular', 'svelte'];
  const backendTechs = ['nodejs', 'python', 'php', 'ruby', 'java', 'csharp', 'go', 'rust'];
  const mobileTechs = ['mobile'];
  const aiTechs = ['ai', 'ml'];
  const blockchainTechs = ['blockchain', 'solidity'];
  const designTechs = ['design'];
  const dataTechs = ['data', 'database'];
  
  const detectedTechs = Object.keys(techPatterns);
  
  // Generate contextual category-based suggestions
  const frontendCount = detectedTechs.filter(tech => frontendTechs.includes(tech)).length;
  const backendCount = detectedTechs.filter(tech => backendTechs.includes(tech)).length;
  const mobileCount = detectedTechs.filter(tech => mobileTechs.includes(tech)).length;
  const aiCount = detectedTechs.filter(tech => aiTechs.includes(tech)).length;
  const blockchainCount = detectedTechs.filter(tech => blockchainTechs.includes(tech)).length;
  const designCount = detectedTechs.filter(tech => designTechs.includes(tech)).length;
  const dataCount = detectedTechs.filter(tech => dataTechs.includes(tech)).length;
  
  // Frontend Development suggestions
  if (frontendCount > 0) {
    const confidence = frontendCount / detectedTechs.length;
    suggestions.push({
      name: 'Frontend Development',
      confidence: Math.min(confidence * 1.2, 1),
      reasoning: `Contains ${frontendCount} frontend framework${frontendCount > 1 ? 's' : ''}`,
      category: 'framework',
      keywords: detectedTechs.filter(tech => frontendTechs.includes(tech))
    });
  }
  
  // Backend Development suggestions
  if (backendCount > 0) {
    const confidence = backendCount / detectedTechs.length;
    suggestions.push({
      name: 'Backend Development',
      confidence: Math.min(confidence * 1.2, 1),
      reasoning: `Contains ${backendCount} backend technolog${backendCount > 1 ? 'ies' : 'y'}`,
      category: 'framework',
      keywords: detectedTechs.filter(tech => backendTechs.includes(tech))
    });
  }
  
  // Mobile Development suggestions
  if (mobileCount > 0) {
    const confidence = mobileCount / detectedTechs.length;
    suggestions.push({
      name: 'Mobile Development',
      confidence: Math.min(confidence * 1.5, 1),
      reasoning: `Contains mobile development resources`,
      category: 'framework',
      keywords: detectedTechs.filter(tech => mobileTechs.includes(tech))
    });
  }
  
  // AI/ML suggestions
  if (aiCount > 0) {
    const confidence = aiCount / detectedTechs.length;
    suggestions.push({
      name: 'AI & Machine Learning',
      confidence: Math.min(confidence * 1.3, 1),
      reasoning: `Contains AI/ML related content`,
      category: 'technology',
      keywords: detectedTechs.filter(tech => aiTechs.includes(tech))
    });
  }
  
  // Blockchain suggestions
  if (blockchainCount > 0) {
    const confidence = blockchainCount / detectedTechs.length;
    suggestions.push({
      name: 'Blockchain & Web3',
      confidence: Math.min(confidence * 1.3, 1),
      reasoning: `Contains blockchain/Web3 resources`,
      category: 'technology',
      keywords: detectedTechs.filter(tech => blockchainTechs.includes(tech))
    });
  }
  
  // Design & UI/UX suggestions
  if (designCount > 0) {
    const confidence = designCount / detectedTechs.length;
    suggestions.push({
      name: 'Design & UI/UX',
      confidence: Math.min(confidence * 1.4, 1),
      reasoning: `Contains design and UI/UX resources`,
      category: 'topic',
      keywords: detectedTechs.filter(tech => designTechs.includes(tech))
    });
  }
  
  // Data & Analytics suggestions
  if (dataCount > 0) {
    const confidence = dataCount / detectedTechs.length;
    suggestions.push({
      name: 'Data & Analytics',
      confidence: Math.min(confidence * 1.3, 1),
      reasoning: `Contains data science and analytics resources`,
      category: 'topic',
      keywords: detectedTechs.filter(tech => dataTechs.includes(tech))
    });
  }
  
  // Specific technology suggestions (only for high confidence)
  Object.entries(techPatterns)
    .sort(([,a], [,b]) => b.confidence - a.confidence)
    .slice(0, 2)
    .forEach(([tech, data]) => {
      if (data.confidence >= 0.5) {
        const techName = tech === 'nodejs' ? 'Node.js' : 
                        tech === 'csharp' ? 'C#' : 
                        tech.charAt(0).toUpperCase() + tech.slice(1);
        suggestions.push({
          name: `${techName} Resources`,
          confidence: data.confidence,
          reasoning: `${Math.round(data.confidence * 100)}% of bookmarks focus on ${techName}`,
          category: 'technology',
          keywords: TECH_PATTERNS[tech as keyof typeof TECH_PATTERNS] || []
        });
      }
    });
  
  // API Development suggestions
  const apiKeywords = ['api', 'rest', 'graphql', 'endpoint'];
  const apiCount = Object.keys(commonKeywords).filter(keyword => 
    apiKeywords.some(api => keyword.toLowerCase().includes(api))
  ).length;
  
  if (apiCount > 0) {
    suggestions.push({
      name: 'API Development',
      confidence: Math.min(apiCount / Object.keys(commonKeywords).length * 2, 1),
      reasoning: `Contains API development resources`,
      category: 'topic',
      keywords: apiKeywords
    });
  }
  
  // Tutorial/Learning suggestions
  const learningKeywords = ['tutorial', 'guide', 'learn', 'course', 'documentation'];
  const learningCount = Object.keys(commonKeywords).filter(keyword => 
    learningKeywords.some(learn => keyword.toLowerCase().includes(learn))
  ).length;
  
  if (learningCount > 0 && bookmarks.length >= 3) {
    suggestions.push({
      name: 'Learning Resources',
      confidence: Math.min(learningCount / Object.keys(commonKeywords).length * 1.5, 1),
      reasoning: `Contains tutorials and learning materials`,
      category: 'topic',
      keywords: learningKeywords
    });
  }
  
  // Fallback suggestions
  if (suggestions.length === 0) {
    suggestions.push({
      name: 'My Collection',
      confidence: 0.5,
      reasoning: 'Generic collection name for mixed content',
      category: 'mixed',
      keywords: []
    });
  }
  
  return suggestions
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 5);
}

// Main analysis function
export function analyzeBookmarksForCollection(bookmarks: UIBookmark[]): SemanticAnalysisResult {
  if (bookmarks.length === 0) {
    return {
      suggestions: [{
        name: 'My Collection',
        confidence: 0.5,
        reasoning: 'No bookmarks to analyze',
        category: 'mixed',
        keywords: []
      }],
      patterns: {
        technologies: [],
        frameworks: [],
        languages: [],
        domains: [],
        sources: [],
        commonKeywords: []
      },
      confidence: 0
    };
  }
  
  const techPatterns = analyzeTechPatterns(bookmarks);
  const domainPatterns = analyzeDomainPatterns(bookmarks);
  const commonKeywords = findCommonKeywords(bookmarks);
  
  const suggestions = generateSuggestions(techPatterns, domainPatterns, commonKeywords, bookmarks);
  
  // Calculate overall confidence
  const overallConfidence = suggestions.length > 0 
    ? suggestions.reduce((sum, s) => sum + s.confidence, 0) / suggestions.length 
    : 0;
  
  return {
    suggestions,
    patterns: {
      technologies: Object.keys(techPatterns),
      frameworks: Object.keys(techPatterns).filter(tech => 
        ['react', 'vue', 'angular', 'svelte', 'django', 'flask', 'laravel', 'spring'].includes(tech)
      ),
      languages: Object.keys(techPatterns).filter(tech => 
        ['python', 'javascript', 'typescript', 'java', 'csharp', 'go', 'rust', 'php', 'ruby'].includes(tech)
      ),
      domains: Object.keys(domainPatterns),
      sources: [...new Set(bookmarks.map(b => b.source))],
      commonKeywords: Object.keys(commonKeywords)
    },
    confidence: overallConfidence
  };
} 