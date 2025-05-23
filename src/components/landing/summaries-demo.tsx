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
  }} data-unique-id="f8ce2e2b-0dcc-461d-96d3-a43bced7d3f4" data-file-name="components/landing/summaries-demo.tsx">
      <div className="skoop-container" data-unique-id="809701ae-a353-42f3-8ee5-847f81b5ba0d" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">
        <div className="text-center mb-12" data-unique-id="9e1d9a12-06df-466e-81f7-2ef74e27c99a" data-file-name="components/landing/summaries-demo.tsx">
          <h2 className="section-title-sm mb-4 text-gray-900" data-unique-id="e07e7593-daca-4d7a-8dc1-53eeb549144e" data-file-name="components/landing/summaries-demo.tsx"><span className="editable-text" data-unique-id="58914263-022b-4bef-a0ee-7ae68d4962e5" data-file-name="components/landing/summaries-demo.tsx">Experience AI-Powered Summaries</span></h2>
          <p className="text-gray-700 max-w-2xl mx-auto" data-unique-id="992f492f-49dd-4cc3-b0ed-05dfcff85a19" data-file-name="components/landing/summaries-demo.tsx"><span className="editable-text" data-unique-id="1c3fbdbc-5901-4b96-8d11-d35c19f5bcd9" data-file-name="components/landing/summaries-demo.tsx">
            SKOOP automatically generates concise, intelligent summaries of your saved content.
            Tap on a card below to see it in action.
          </span></p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-[340px] md:max-w-none mx-auto" data-unique-id="e2fab0c3-f613-4cf0-8ad7-7fefbcb587e4" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">
          {demoCards.map(card => <motion.div key={card.id} className="skoop-card overflow-hidden flex flex-col h-full" whileHover={{
          y: -5,
          transition: {
            duration: 0.2
          }
        }} role="button" aria-expanded={selectedCard === card.id} onClick={() => handleCardClick(card.id)} data-unique-id="eca97bc1-d451-400f-9aed-3114cdf1d952" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">
              {/* Card header with platform info */}
              <div className="p-4 border-b border-border flex items-center" data-unique-id="403013c1-0859-488d-98ce-d68eaf68ab26" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center mr-2" data-unique-id="c3c882d5-4921-4201-b753-c44426642577" data-file-name="components/landing/summaries-demo.tsx">
                  <card.icon className={`h-4 w-4 ${card.platformColor}`} />
                </div>
                
                {card.platform === 'twitter' && <div data-unique-id="b8f6b688-87cc-4e43-82cf-909499bbf154" data-file-name="components/landing/summaries-demo.tsx">
                    <div className="flex items-center" data-unique-id="6f296ec3-8f42-4f75-a834-46b6ee344f95" data-file-name="components/landing/summaries-demo.tsx">
                      <span className="font-medium text-sm" data-unique-id="e69663ca-b2a6-4558-bec4-324ce920fa82" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">{card.author}</span>
                      <span className="text-muted-foreground ml-1 text-sm" data-unique-id="1c9789d6-3a5b-4b35-b607-46857e12e670" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">{card.handle}</span>
                    </div>
                    <span className="text-xs text-muted-foreground" data-unique-id="a7a165aa-d4a2-41bc-bb25-00ec60687ce2" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">{card.timestamp}</span>
                  </div>}
                
                {card.platform === 'github' && <div data-unique-id="e2d3cb55-ae47-4e44-8166-c2711ab5dabf" data-file-name="components/landing/summaries-demo.tsx">
                    <div className="font-medium text-sm" data-unique-id="eb76caa0-d110-4001-83b4-b3e267538fb8" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">{card.repo}</div>
                    <div className="flex items-center text-xs text-muted-foreground" data-unique-id="30967a74-fd33-4522-82d8-d3a446057b76" data-file-name="components/landing/summaries-demo.tsx">
                      <span className="mr-2" data-unique-id="887a8f7f-9cf9-4ab8-b0e7-00f52e0a5f87" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">{card.language}</span>
                      <span data-unique-id="7bd3afc6-9bfd-4542-b773-8cf33d2dc9a8" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">{card.timestamp}</span>
                    </div>
                  </div>}
                
                {card.platform === 'reddit' && <div data-unique-id="6c1de2bb-d491-401b-a7cd-d3dc7213eef3" data-file-name="components/landing/summaries-demo.tsx">
                    <div className="font-medium text-sm" data-unique-id="a826bccd-38b1-482d-a787-90c298d16f0f" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">{card.subreddit}</div>
                    <div className="flex items-center text-xs text-muted-foreground" data-unique-id="3bbfea76-3870-4dd0-9ef2-0bc660c50cdb" data-file-name="components/landing/summaries-demo.tsx">
                      <span className="mr-2" data-unique-id="f2b6f1ba-4c88-42bd-9f82-4d06575980d1" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="3c29f275-cd8a-4481-a519-1a5bc093e8b9" data-file-name="components/landing/summaries-demo.tsx">u/</span>{card.author}</span>
                      <span data-unique-id="4599ca85-a626-41b0-993d-575fe3266d4d" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">{card.timestamp}</span>
                    </div>
                  </div>}
              </div>
              
              {/* Card content */}
              <div className="p-4 flex-1" data-unique-id="3f30eda9-22a8-460e-96b4-02c8dc9128d1" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">
                <h3 className="font-medium text-white mb-2 line-clamp-2" data-unique-id="b9c8d064-64a6-4581-9667-61875bc4a801" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">{card.title}</h3>
                <p className="text-sm text-white/80 line-clamp-3" data-unique-id="8a2c42fd-5afe-45cb-8b49-577be79d8aa2" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">{card.content}</p>
                
                {card.platform === 'twitter' && card.image && <div className="mt-3 rounded-md overflow-hidden" data-unique-id="064e871a-b621-494a-8b6c-53c52a7584e0" data-file-name="components/landing/summaries-demo.tsx">
                    <Image src={card.image} alt={`Image related to ${card.title}`} width={300} height={200} className="object-cover w-full" data-unique-id="b84c4615-d385-491e-849e-3924ab9e9279" data-file-name="components/landing/summaries-demo.tsx" />
                  </div>}
              </div>
              
              {/* Card footer with engagement metrics */}
              <div className="border-t border-border p-4 flex justify-between items-center" data-unique-id="f17b8bec-db3f-4b6a-9dfc-1840bd213705" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">
                {card.platform === 'twitter' && <div className="flex text-xs text-muted-foreground" data-unique-id="180537c5-2433-4045-81f3-103ac8aec0f4" data-file-name="components/landing/summaries-demo.tsx">
                    <span className="mr-3" data-unique-id="f04fadba-c27c-4cab-bd95-ef6cf1a462ce" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">{card.engagement.likes}<span className="editable-text" data-unique-id="952c378f-5132-4f5a-9bc8-6820ec9f5717" data-file-name="components/landing/summaries-demo.tsx"> likes</span></span>
                    <span data-unique-id="581b6a65-73fa-4569-bb5f-173a4be67cab" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">{card.engagement.replies}<span className="editable-text" data-unique-id="525bed9a-e67f-4369-a25e-038091c10a6a" data-file-name="components/landing/summaries-demo.tsx"> replies</span></span>
                  </div>}
                
                {card.platform === 'github' && <div className="flex text-xs text-muted-foreground" data-unique-id="c0ad9d75-dad0-49de-a107-37c38d3ba42f" data-file-name="components/landing/summaries-demo.tsx">
                    <span data-unique-id="5c33ddb0-5ddc-4cf7-a74e-3ae69c40e137" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">{card.stars}<span className="editable-text" data-unique-id="7cd772c2-74c9-4767-816d-0e0820317eb3" data-file-name="components/landing/summaries-demo.tsx"> stars</span></span>
                  </div>}
                
                {card.platform === 'reddit' && <div className="flex text-xs text-muted-foreground" data-unique-id="20a09d81-73b7-4050-9f60-0cc81b12baa5" data-file-name="components/landing/summaries-demo.tsx">
                    <span className="mr-3" data-unique-id="8a1a7303-c857-443c-a031-66f4776a64a6" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">{card.engagement.upvotes}<span className="editable-text" data-unique-id="d607fa27-c57f-4813-abac-5e252b3fb629" data-file-name="components/landing/summaries-demo.tsx"> upvotes</span></span>
                    <span data-unique-id="281a6e63-0160-43aa-8fee-11ce9ae46157" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">{card.engagement.comments}<span className="editable-text" data-unique-id="83678f0d-ba7b-4f07-bd0c-02b2bed0a753" data-file-name="components/landing/summaries-demo.tsx"> comments</span></span>
                  </div>}
                
                <Button size="sm" variant="ghost" className="text-primary flex items-center" data-unique-id="7fae50af-7812-40d7-890e-a88a0fcd617d" data-file-name="components/landing/summaries-demo.tsx">
                  <FileText className="h-3.5 w-3.5 mr-1.5" /><span className="editable-text" data-unique-id="1f802911-ac69-42db-a9c9-9e9e80f4c16d" data-file-name="components/landing/summaries-demo.tsx">
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
      }} onClick={() => setShowSummary(false)} data-unique-id="7bee4ebd-c05b-43a9-b7db-bd986b86f566" data-file-name="components/landing/summaries-demo.tsx">
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
        }} onClick={e => e.stopPropagation()} data-unique-id="b11d1143-0c1f-4820-9284-dc809f3121b3" data-file-name="components/landing/summaries-demo.tsx">
              <div className="p-6 border-b border-border flex justify-between items-center" data-unique-id="c022f477-1b88-4f1c-92a1-ba589e8dd3d0" data-file-name="components/landing/summaries-demo.tsx">
                <h3 className="font-semibold" data-unique-id="0ea7bb04-a712-4226-954d-710ba1fd2b46" data-file-name="components/landing/summaries-demo.tsx"><span className="editable-text" data-unique-id="39df01e7-fee2-43e6-8f5e-9e1a67982f6c" data-file-name="components/landing/summaries-demo.tsx">AI Summary</span></h3>
                <Button variant="ghost" size="sm" onClick={() => setShowSummary(false)} data-unique-id="e384240e-f5e3-48cb-9239-0fa357b57a2d" data-file-name="components/landing/summaries-demo.tsx"><span className="editable-text" data-unique-id="f2dbef8a-783b-498f-9abc-a790e2e2a17f" data-file-name="components/landing/summaries-demo.tsx">
                  Close
                </span></Button>
              </div>
              
              <div className="p-6" data-unique-id="7db9bf61-a2d6-487b-a5f7-d13199cc0aee" data-file-name="components/landing/summaries-demo.tsx">
                <div className="prose prose-sm dark:prose-invert" data-unique-id="093780be-83db-4557-80f4-8a19fd575ef7" data-file-name="components/landing/summaries-demo.tsx">
                  <p className="font-medium" data-unique-id="b550dd8e-617b-4489-a9d8-d698231dbbff" data-file-name="components/landing/summaries-demo.tsx"><span className="editable-text" data-unique-id="58a7dbd4-906d-4283-bf7e-404b1e8131ca" data-file-name="components/landing/summaries-demo.tsx">Key takeaways:</span></p>
                  <ul data-unique-id="e9498f45-eff2-436c-aa14-839bcbfdadf2" data-file-name="components/landing/summaries-demo.tsx">
                    <li data-unique-id="ef218e77-3ccd-41dc-bf43-140816ddab01" data-file-name="components/landing/summaries-demo.tsx"><span className="editable-text" data-unique-id="66391fa1-dda8-4dde-9f51-88608721268b" data-file-name="components/landing/summaries-demo.tsx">Content discusses advancements in the field of artificial intelligence and its applications</span></li>
                    <li data-unique-id="8b98e174-908c-48ad-b973-4baa1c5353a0" data-file-name="components/landing/summaries-demo.tsx"><span className="editable-text" data-unique-id="f5c84de0-e77f-46d2-ad9a-913cf49d117f" data-file-name="components/landing/summaries-demo.tsx">Research findings highlight practical implementations in modern software development</span></li>
                    <li data-unique-id="42155aa2-2e54-457d-ad4a-58d7b89f1bd5" data-file-name="components/landing/summaries-demo.tsx"><span className="editable-text" data-unique-id="e5eeaa10-4d9e-407f-b2a1-88d8af7d7a60" data-file-name="components/landing/summaries-demo.tsx">Author provides evidence-based analysis of current technology trends</span></li>
                    <li data-unique-id="a0a9c125-2452-4c3c-8057-c13a73c9a08c" data-file-name="components/landing/summaries-demo.tsx"><span className="editable-text" data-unique-id="e7f48a72-de72-4bac-b238-0fdbe8a6c30d" data-file-name="components/landing/summaries-demo.tsx">The post received significant engagement from the community</span></li>
                  </ul>
                  <p data-unique-id="3003cc8e-3ea0-4513-b03e-47bb923a721d" data-file-name="components/landing/summaries-demo.tsx"><span className="editable-text" data-unique-id="c3cc6a61-6b04-45ce-90ad-738df758fab6" data-file-name="components/landing/summaries-demo.tsx">
                    This content examines how recent developments in AI technology are changing software 
                    architecture patterns. The author presents empirical data showing improved performance 
                    metrics across various test scenarios. Community response indicates strong interest in 
                    the practical applications described, particularly in enterprise contexts.
                  </span></p>
                  <p data-unique-id="aa5dd872-7184-4661-b6bd-109e5cb69e65" data-file-name="components/landing/summaries-demo.tsx"><span className="editable-text" data-unique-id="2d9435c0-1f4f-4bbd-88be-aa6159ef0e37" data-file-name="components/landing/summaries-demo.tsx">
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