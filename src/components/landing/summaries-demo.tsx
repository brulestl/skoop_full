'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Github, X, MessageSquare as Reddit, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Demo content from various platforms
const demoCards = [{
  id: 'twitter-1',
  platform: 'twitter',
  icon: X,
  platformColor: 'text-black',
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
  return <section className="py-20 lg:py-28 bg-secondary" data-unique-id="f498b369-288b-45b0-a6f1-9049cf91e1e8" data-file-name="components/landing/summaries-demo.tsx">
      <div className="skoop-container" data-unique-id="d780ae6b-9141-44f1-9a46-35f2f76913a3" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">
        <div className="text-center mb-12" data-unique-id="40381a29-7954-4916-818b-ffbcd1178e98" data-file-name="components/landing/summaries-demo.tsx">
          <h2 className="section-title-sm mb-4 text-gray-900" data-unique-id="06bab3e1-3b8b-4c9c-abde-ed6ce890fea8" data-file-name="components/landing/summaries-demo.tsx"><span className="editable-text" data-unique-id="163c35c2-7855-43b0-920d-4cb94ab6acdb" data-file-name="components/landing/summaries-demo.tsx">Experience AI-Powered Summaries</span></h2>
          <p className="text-gray-700 max-w-2xl mx-auto" data-unique-id="971c42b3-e991-4a33-b9a5-a62b74bad3ca" data-file-name="components/landing/summaries-demo.tsx"><span className="editable-text" data-unique-id="7836673d-6174-4c28-9841-a49c0d220b07" data-file-name="components/landing/summaries-demo.tsx">
            SKOOP automatically generates concise, intelligent summaries of your saved content.
            Tap on a card below to see it in action.
          </span></p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-[340px] md:max-w-none mx-auto" data-unique-id="21279ce2-fbc2-4b64-ab76-fbc8e4761677" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">
          {demoCards.map(card => <motion.div key={card.id} className="skoop-card overflow-hidden flex flex-col h-full bg-card dark:bg-card/90" whileHover={{
          y: -5,
          transition: {
            duration: 0.2
          }
        }} role="button" aria-expanded={selectedCard === card.id} onClick={() => handleCardClick(card.id)} data-unique-id="7b05fd7f-089f-4767-b9a9-a2635e930209" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">
              {/* Card header with platform info */}
              <div className="p-4 border-b border-border flex items-center" data-unique-id="7870b8bd-69fe-4495-8d6c-c1303c64ab32" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center mr-2" data-unique-id="7b535500-6c7b-4cbc-9ee8-c0041711818d" data-file-name="components/landing/summaries-demo.tsx">
                  <card.icon className={`h-4 w-4 ${card.platformColor}`} />
                </div>
                
                {card.platform === 'twitter' && <div data-unique-id="2712a678-5815-4f2a-9f5f-e01aa8818915" data-file-name="components/landing/summaries-demo.tsx">
                    <div className="flex items-center" data-unique-id="12d649b2-c5b4-440b-9d29-2f63f45120b6" data-file-name="components/landing/summaries-demo.tsx">
                      <span className="font-medium text-sm" data-unique-id="31aefff9-ad4e-4ad8-88b1-5ac4dea39fed" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">{card.author}</span>
                      <span className="text-muted-foreground ml-1 text-sm" data-unique-id="ce35c4ae-91d4-44a6-8004-5e0d2a4e26c4" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">{card.handle}</span>
                    </div>
                    <span className="text-xs text-muted-foreground" data-unique-id="c9d4e896-3b56-45ee-bf82-aa7cd0eb98ba" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">{card.timestamp}</span>
                  </div>}
                
                {card.platform === 'github' && <div data-unique-id="9c4e5745-30c8-4d36-a14f-26ef162e4818" data-file-name="components/landing/summaries-demo.tsx">
                    <div className="font-medium text-sm" data-unique-id="320173a5-82d9-4f7e-acca-a56487034e93" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">{card.repo}</div>
                    <div className="flex items-center text-xs text-muted-foreground" data-unique-id="3dbd42fb-a355-4c40-a440-73086baef386" data-file-name="components/landing/summaries-demo.tsx">
                      <span className="mr-2" data-unique-id="e758c9f4-be2e-4dd8-9d14-e4c61abb3810" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">{card.language}</span>
                      <span data-unique-id="a4e8ba84-1a67-4c49-b5ab-22e408206409" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">{card.timestamp}</span>
                    </div>
                  </div>}
                
                {card.platform === 'reddit' && <div data-unique-id="12f68f1f-9f01-4db1-a8c6-0a070eb54d46" data-file-name="components/landing/summaries-demo.tsx">
                    <div className="font-medium text-sm" data-unique-id="34214305-d27c-4d50-82c5-6b64a643d449" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">{card.subreddit}</div>
                    <div className="flex items-center text-xs text-muted-foreground" data-unique-id="a27e646f-918c-4e18-af9d-885e8f4fbea1" data-file-name="components/landing/summaries-demo.tsx">
                      <span className="mr-2" data-unique-id="93422afb-f627-4aa3-b146-2575c7daaaef" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="5acf20b5-9f37-407f-927a-456600ea0d78" data-file-name="components/landing/summaries-demo.tsx">u/</span>{card.author}</span>
                      <span data-unique-id="4b4e154e-2f87-4814-895c-5dd9862fa75f" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">{card.timestamp}</span>
                    </div>
                  </div>}
              </div>
              
              {/* Card content */}
              <div className="p-4 flex-1" data-unique-id="74358139-7280-4c27-be43-decb4c3c39cd" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">
                <h3 className="font-medium text-foreground mb-2 line-clamp-2" data-unique-id="5ada07dd-ede9-4776-8225-13c6a378848c" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">{card.title}</h3>
                <p className="text-sm text-foreground/80 line-clamp-3" data-unique-id="8cbd6334-9532-48d3-b483-1e27244fe9e7" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">{card.content}</p>
                
                {card.platform === 'twitter' && card.image && <div className="mt-3 rounded-md overflow-hidden" data-unique-id="c7d45b93-c8d0-435f-a9e2-1bea6ef7d457" data-file-name="components/landing/summaries-demo.tsx">
                    <Image src={card.image} alt={`Image related to ${card.title}`} width={300} height={200} className="object-cover w-full" data-unique-id="33b55245-127f-467b-830f-ca761e3084f0" data-file-name="components/landing/summaries-demo.tsx" />
                  </div>}
              </div>
              
              {/* Card footer with engagement metrics */}
              <div className="border-t border-border p-4 flex justify-between items-center" data-unique-id="5b724d14-1e39-46ce-8b9c-6cd701e3a2e8" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">
                {card.platform === 'twitter' && <div className="flex text-xs text-muted-foreground" data-unique-id="292948f5-fb63-4164-9b5a-4cc54c83187e" data-file-name="components/landing/summaries-demo.tsx">
                    <span className="mr-3" data-unique-id="bcca66a4-6cda-4624-9532-f757383f9f49" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">{card.engagement.likes}<span className="editable-text" data-unique-id="8568a23c-dd57-4768-abd0-7d14967145b3" data-file-name="components/landing/summaries-demo.tsx"> likes</span></span>
                    <span data-unique-id="5ed9b145-c227-4a5d-a73b-2b0105086c80" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">{card.engagement.replies}<span className="editable-text" data-unique-id="d5dda571-3e67-466f-a380-ec2299aebd26" data-file-name="components/landing/summaries-demo.tsx"> replies</span></span>
                  </div>}
                
                {card.platform === 'github' && <div className="flex text-xs text-muted-foreground" data-unique-id="30dcc0d3-b774-4f5d-b7d7-0c2b864d3336" data-file-name="components/landing/summaries-demo.tsx">
                    <span data-unique-id="c22d20b1-0ce5-4fb8-bda2-3ea4bf0e9c53" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">{card.stars}<span className="editable-text" data-unique-id="5813aa84-9f41-40d9-aa86-309b8628653c" data-file-name="components/landing/summaries-demo.tsx"> stars</span></span>
                  </div>}
                
                {card.platform === 'reddit' && <div className="flex text-xs text-muted-foreground" data-unique-id="ba96fb78-9718-4574-80e2-46c60e00d7d2" data-file-name="components/landing/summaries-demo.tsx">
                    <span className="mr-3" data-unique-id="3f6f8b0a-4628-4631-af32-ec74d1d4e031" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">{card.engagement.upvotes}<span className="editable-text" data-unique-id="35cb2f72-ba18-4d96-a8bf-ee8725e36eb6" data-file-name="components/landing/summaries-demo.tsx"> upvotes</span></span>
                    <span data-unique-id="e258ab9b-bf36-472c-9c31-f8da910b28c7" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">{card.engagement.comments}<span className="editable-text" data-unique-id="de1e19bb-2e71-4b2c-b35a-2e849239ba81" data-file-name="components/landing/summaries-demo.tsx"> comments</span></span>
                  </div>}
                
                <Button size="sm" variant="ghost" className="text-primary flex items-center" data-unique-id="96404c6d-dc95-498d-8117-bfec7cf86cf1" data-file-name="components/landing/summaries-demo.tsx">
                  <FileText className="h-3.5 w-3.5 mr-1.5" /><span className="editable-text" data-unique-id="217b066f-6d43-4ef1-a83d-8b9d13220243" data-file-name="components/landing/summaries-demo.tsx">
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
      }} onClick={() => setShowSummary(false)} data-unique-id="9cdaf7e2-32c9-4ebd-9daa-249e96ddde18" data-file-name="components/landing/summaries-demo.tsx">
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
        }} onClick={e => e.stopPropagation()} data-unique-id="950accd2-bc99-4355-8e4e-795115aaedcb" data-file-name="components/landing/summaries-demo.tsx">
              <div className="p-6 border-b border-border flex justify-between items-center" data-unique-id="b00ea8fb-d69a-431e-81f8-2c84f17eaad5" data-file-name="components/landing/summaries-demo.tsx">
                <h3 className="font-semibold" data-unique-id="48355051-9135-43d1-8442-0eb26aaa7b97" data-file-name="components/landing/summaries-demo.tsx"><span className="editable-text" data-unique-id="8bd2f26f-5ea2-4897-8761-80f95667c83f" data-file-name="components/landing/summaries-demo.tsx">AI Summary</span></h3>
                <Button variant="ghost" size="sm" onClick={() => setShowSummary(false)} data-unique-id="c949f53e-487b-4e83-9886-24415dfabd0d" data-file-name="components/landing/summaries-demo.tsx"><span className="editable-text" data-unique-id="b15c9588-0c54-4043-9530-1a111c36bee0" data-file-name="components/landing/summaries-demo.tsx">
                  Close
                </span></Button>
              </div>
              
              <div className="p-6" data-unique-id="eb4d3aee-b423-474a-9b62-d05e41c8192d" data-file-name="components/landing/summaries-demo.tsx">
                <div className="prose prose-sm dark:prose-invert" data-unique-id="98f2a10c-af2c-4da7-b0fc-952cc51919b5" data-file-name="components/landing/summaries-demo.tsx">
                  <p className="font-medium" data-unique-id="36bd8b06-0a2e-44be-ae40-17706f30eacd" data-file-name="components/landing/summaries-demo.tsx"><span className="editable-text" data-unique-id="629aef98-120a-440b-8f2b-2c144add7897" data-file-name="components/landing/summaries-demo.tsx">Key takeaways:</span></p>
                  <ul data-unique-id="f22ada67-f038-471b-b879-ae1a1f74a07b" data-file-name="components/landing/summaries-demo.tsx">
                    <li data-unique-id="958754b9-6171-4b7b-bfdd-ee7c1b9a2ec0" data-file-name="components/landing/summaries-demo.tsx"><span className="editable-text" data-unique-id="a36c922c-2e6c-49db-9bd7-ef0b3f4be7c1" data-file-name="components/landing/summaries-demo.tsx">Content discusses advancements in the field of artificial intelligence and its applications</span></li>
                    <li data-unique-id="035bd8fd-32f1-4a69-9a72-76543e86c425" data-file-name="components/landing/summaries-demo.tsx"><span className="editable-text" data-unique-id="b1417a3e-75fc-405d-b7be-579cd86b0517" data-file-name="components/landing/summaries-demo.tsx">Research findings highlight practical implementations in modern software development</span></li>
                    <li data-unique-id="2b150516-873f-4f6a-a426-6bf5719d9196" data-file-name="components/landing/summaries-demo.tsx"><span className="editable-text" data-unique-id="d2b0b280-6ec5-44fe-9721-68c53cabaf1a" data-file-name="components/landing/summaries-demo.tsx">Author provides evidence-based analysis of current technology trends</span></li>
                    <li data-unique-id="0d1ee1a4-abb2-4898-9976-2435b82f4a4a" data-file-name="components/landing/summaries-demo.tsx"><span className="editable-text" data-unique-id="6f9eb9ac-242f-40ed-92d2-748968073139" data-file-name="components/landing/summaries-demo.tsx">The post received significant engagement from the community</span></li>
                  </ul>
                  <p data-unique-id="82423f6a-41cc-4353-accc-ec8426eca15f" data-file-name="components/landing/summaries-demo.tsx"><span className="editable-text" data-unique-id="1862dcac-590e-4afd-9d93-c5077017c0fb" data-file-name="components/landing/summaries-demo.tsx">
                    This content examines how recent developments in AI technology are changing software 
                    architecture patterns. The author presents empirical data showing improved performance 
                    metrics across various test scenarios. Community response indicates strong interest in 
                    the practical applications described, particularly in enterprise contexts.
                  </span></p>
                  <p data-unique-id="69c3b243-ba9b-42c5-8e96-ac03d66a54ba" data-file-name="components/landing/summaries-demo.tsx"><span className="editable-text" data-unique-id="d8c4d69c-bf81-4925-9c96-f39855e23c7b" data-file-name="components/landing/summaries-demo.tsx">
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