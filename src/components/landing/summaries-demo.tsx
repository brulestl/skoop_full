'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Github, Twitter, MessageSquare as Reddit, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Demo content from various platforms
const demoCards = [{
  id: 'twitter-1',
  platform: 'twitter',
  icon: Twitter,
  platformColor: 'text-blue-500',
  author: 'Sarah Chen',
  handle: '@sarahchen_ai',
  avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=200&h=200&q=80&fit=crop',
  title: 'Thread: Looking at the future of UX with AI assistance',
  content: 'Just launched a new study examining how AI interfaces are changing the way designers approach information architecture. Here are 5 key findings from our research team...',
  timestamp: '2h ago',
  engagement: {
    likes: 432,
    replies: 54
  },
  image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=400&q=80&fit=crop'
}, {
  id: 'github-1',
  platform: 'github',
  icon: Github,
  platformColor: 'text-gray-800',
  repo: 'vector-db/pgvector-js',
  title: 'High-performance vector database for Node.js applications',
  content: 'This library provides a simple API for storing and querying high-dimensional vectors in PostgreSQL with the pgvector extension. Built for production AI applications with a focus on performance and scalability.',
  stars: 2854,
  language: 'TypeScript',
  timestamp: '1d ago'
}, {
  id: 'reddit-1',
  platform: 'reddit',
  icon: Reddit,
  platformColor: 'text-orange-600',
  subreddit: 'r/MachineLearning',
  title: 'Understanding the limitations of current LLM context windows',
  content: "I've been experimenting with different methods to optimize context window usage across various models. Here are some benchmarks comparing the effective recall across window positions...",
  author: 'ml_researcher',
  timestamp: '3d ago',
  engagement: {
    upvotes: 876,
    comments: 124
  }
}];
export function SummariesDemo() {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const handleCardClick = (id: string) => {
    setSelectedCard(id);
    setShowSummary(true);
  };
  return <section className="py-20 lg:py-28" style={{
    backgroundColor: '#FCEADE'
  }}>
      <div className="skoop-container">
        <div className="text-center mb-12">
          <h2 className="section-title-sm mb-4 text-gray-900"><span className="editable-text">Experience AI-Powered Summaries</span></h2>
          <p className="text-gray-700 max-w-2xl mx-auto"><span className="editable-text">
            SKOOP automatically generates concise, intelligent summaries of your saved content.
            Tap on a card below to see it in action.
          </span></p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-[340px] md:max-w-none mx-auto">
          {demoCards.map(card => <motion.div key={card.id} className="skoop-card overflow-hidden flex flex-col h-full" whileHover={{
          y: -5,
          transition: {
            duration: 0.2
          }
        }} role="button" aria-expanded={selectedCard === card.id} onClick={() => handleCardClick(card.id)}>
              {/* Card header with platform info */}
              <div className="p-4 border-b border-border flex items-center">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center mr-2">
                  <card.icon className={`h-4 w-4 ${card.platformColor}`} />
                </div>
                
                {card.platform === 'twitter' && <div>
                    <div className="flex items-center">
                      <span className="font-medium text-sm">{card.author}</span>
                      <span className="text-muted-foreground ml-1 text-sm">{card.handle}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{card.timestamp}</span>
                  </div>}
                
                {card.platform === 'github' && <div>
                    <div className="font-medium text-sm">{card.repo}</div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <span className="mr-2">{card.language}</span>
                      <span>{card.timestamp}</span>
                    </div>
                  </div>}
                
                {card.platform === 'reddit' && <div>
                    <div className="font-medium text-sm">{card.subreddit}</div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <span className="mr-2"><span className="editable-text">u/</span>{card.author}</span>
                      <span>{card.timestamp}</span>
                    </div>
                  </div>}
              </div>
              
              {/* Card content */}
              <div className="p-4 flex-1">
                <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{card.title}</h3>
                <p className="text-sm text-gray-700 line-clamp-3">{card.content}</p>
                
                {card.platform === 'twitter' && card.image && <div className="mt-3 rounded-md overflow-hidden">
                    <Image src={card.image} alt={`Image related to ${card.title}`} width={300} height={200} className="object-cover w-full" />
                  </div>}
              </div>
              
              {/* Card footer with engagement metrics */}
              <div className="border-t border-border p-4 flex justify-between items-center">
                {card.platform === 'twitter' && <div className="flex text-xs text-muted-foreground">
                    <span className="mr-3">{card.engagement.likes}<span className="editable-text"> likes</span></span>
                    <span>{card.engagement.replies}<span className="editable-text"> replies</span></span>
                  </div>}
                
                {card.platform === 'github' && <div className="flex text-xs text-muted-foreground">
                    <span>{card.stars}<span className="editable-text"> stars</span></span>
                  </div>}
                
                {card.platform === 'reddit' && <div className="flex text-xs text-muted-foreground">
                    <span className="mr-3">{card.engagement.upvotes}<span className="editable-text"> upvotes</span></span>
                    <span>{card.engagement.comments}<span className="editable-text"> comments</span></span>
                  </div>}
                
                <Button size="sm" variant="ghost" className="text-primary flex items-center">
                  <FileText className="h-3.5 w-3.5 mr-1.5" /><span className="editable-text">
                  AI Summary
                </span></Button>
              </div>
            </motion.div>)}
        </div>
        
        {/* Summary slide-over panel */}
        {showSummary && selectedCard && <motion.div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-end" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} onClick={() => setShowSummary(false)}>
            <motion.div className="w-full max-w-md bg-card h-full overflow-y-auto" initial={{
          x: '100%'
        }} animate={{
          x: 0
        }} exit={{
          x: '100%'
        }} transition={{
          type: 'spring',
          bounce: 0,
          duration: 0.4
        }} onClick={e => e.stopPropagation()}>
              <div className="p-6 border-b border-border flex justify-between items-center">
                <h3 className="font-semibold"><span className="editable-text">AI Summary</span></h3>
                <Button variant="ghost" size="sm" onClick={() => setShowSummary(false)}><span className="editable-text">
                  Close
                </span></Button>
              </div>
              
              <div className="p-6">
                <div className="prose prose-sm dark:prose-invert">
                  <p className="font-medium"><span className="editable-text">Key takeaways:</span></p>
                  <ul>
                    <li><span className="editable-text">Content discusses advancements in the field of artificial intelligence and its applications</span></li>
                    <li><span className="editable-text">Research findings highlight practical implementations in modern software development</span></li>
                    <li><span className="editable-text">Author provides evidence-based analysis of current technology trends</span></li>
                    <li><span className="editable-text">The post received significant engagement from the community</span></li>
                  </ul>
                  <p><span className="editable-text">
                    This content examines how recent developments in AI technology are changing software 
                    architecture patterns. The author presents empirical data showing improved performance 
                    metrics across various test scenarios. Community response indicates strong interest in 
                    the practical applications described, particularly in enterprise contexts.
                  </span></p>
                  <p><span className="editable-text">
                    Several implementation approaches are compared, with a focus on scalability and 
                    maintainability. The discussion includes considerations for both traditional and 
                    cloud-native deployment strategies.
                  </span></p>
                </div>
              </div>
            </motion.div>
          </motion.div>}
      </div>
    </section>;
}