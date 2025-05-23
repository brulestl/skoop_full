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
  }} data-unique-id="df13c664-886a-43a0-a536-662d6f6b31d9" data-file-name="components/landing/summaries-demo.tsx">
      <div className="skoop-container" data-unique-id="4f79e2e0-0fab-493e-9f75-5ff1da864765" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">
        <div className="text-center mb-12" data-unique-id="46d4c615-3829-499f-90d3-8ffa1605adb3" data-file-name="components/landing/summaries-demo.tsx">
          <h2 className="section-title-sm mb-4 text-gray-900" data-unique-id="ef9d23f8-d302-4138-a906-c31a25a6e984" data-file-name="components/landing/summaries-demo.tsx"><span className="editable-text" data-unique-id="817cef36-6135-42b8-9356-b52b543f2c9e" data-file-name="components/landing/summaries-demo.tsx">Experience AI-Powered Summaries</span></h2>
          <p className="text-gray-700 max-w-2xl mx-auto" data-unique-id="28045630-4fc9-4902-99b9-e5da35078e8f" data-file-name="components/landing/summaries-demo.tsx"><span className="editable-text" data-unique-id="47782763-5521-48f2-8638-e1235a95031e" data-file-name="components/landing/summaries-demo.tsx">
            SKOOP automatically generates concise, intelligent summaries of your saved content.
            Tap on a card below to see it in action.
          </span></p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-[340px] md:max-w-none mx-auto" data-unique-id="a9176fbc-2953-426a-beca-25726fd0a918" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">
          {demoCards.map(card => <motion.div key={card.id} className="skoop-card overflow-hidden flex flex-col h-full" whileHover={{
          y: -5,
          transition: {
            duration: 0.2
          }
        }} role="button" aria-expanded={selectedCard === card.id} onClick={() => handleCardClick(card.id)} data-unique-id="b0367c74-af97-4c49-b82d-c430e2718d55" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">
              {/* Card header with platform info */}
              <div className="p-4 border-b border-border flex items-center" data-unique-id="45bd2091-e4cc-43a1-b23a-a797ad2a85ca" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center mr-2" data-unique-id="e1bf501a-36dd-4c31-b613-a55856a0832f" data-file-name="components/landing/summaries-demo.tsx">
                  <card.icon className={`h-4 w-4 ${card.platformColor}`} />
                </div>
                
                {card.platform === 'twitter' && <div data-unique-id="d9e52c90-5325-429c-be6e-27e74713a594" data-file-name="components/landing/summaries-demo.tsx">
                    <div className="flex items-center" data-unique-id="2765d6f2-194e-4737-8f0f-232b4784f603" data-file-name="components/landing/summaries-demo.tsx">
                      <span className="font-medium text-sm" data-unique-id="73e1bd04-0551-4fa2-b14f-738c672c3283" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">{card.author}</span>
                      <span className="text-muted-foreground ml-1 text-sm" data-unique-id="73caf0d5-0a63-4a89-82c4-32da7b24c1f3" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">{card.handle}</span>
                    </div>
                    <span className="text-xs text-muted-foreground" data-unique-id="a90eab3e-7d39-498e-862b-aa5a1ebfe399" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">{card.timestamp}</span>
                  </div>}
                
                {card.platform === 'github' && <div data-unique-id="56ccc7a8-559a-4801-b802-d0136696c211" data-file-name="components/landing/summaries-demo.tsx">
                    <div className="font-medium text-sm" data-unique-id="1d2fe5d4-2f59-49b5-9669-af5051ec4fc2" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">{card.repo}</div>
                    <div className="flex items-center text-xs text-muted-foreground" data-unique-id="01111ee3-90a9-4c73-a604-447d6d29ff0d" data-file-name="components/landing/summaries-demo.tsx">
                      <span className="mr-2" data-unique-id="4985a3e7-d1c6-434d-a179-c21b6333d577" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">{card.language}</span>
                      <span data-unique-id="c706bcb4-86f5-497f-989c-66e672887be2" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">{card.timestamp}</span>
                    </div>
                  </div>}
                
                {card.platform === 'reddit' && <div data-unique-id="5c24eaf6-237d-4ea0-8a64-a9312782cc19" data-file-name="components/landing/summaries-demo.tsx">
                    <div className="font-medium text-sm" data-unique-id="624fecd2-9ce6-47a5-b489-e7c48d27a82b" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">{card.subreddit}</div>
                    <div className="flex items-center text-xs text-muted-foreground" data-unique-id="dab68cbc-ee84-440a-a08e-f0d7c29df550" data-file-name="components/landing/summaries-demo.tsx">
                      <span className="mr-2" data-unique-id="e4c3d17b-a893-42ce-82cd-a51b91b81ec7" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="05fcfc3d-a343-42b1-88bd-14676a61897f" data-file-name="components/landing/summaries-demo.tsx">u/</span>{card.author}</span>
                      <span data-unique-id="c753d190-8821-4412-a4fd-181f831a5957" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">{card.timestamp}</span>
                    </div>
                  </div>}
              </div>
              
              {/* Card content */}
              <div className="p-4 flex-1" data-unique-id="e6a6db60-0b68-4603-9034-bf10109ef47b" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">
                <h3 className="font-medium text-gray-900 mb-2 line-clamp-2" data-unique-id="768fa2e5-fd5c-48b7-aded-8af0d0ac4b8d" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">{card.title}</h3>
                <p className="text-sm text-gray-700 line-clamp-3" data-unique-id="751abfcf-ea26-428f-be25-5a7f633a9966" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">{card.content}</p>
                
                {card.platform === 'twitter' && card.image && <div className="mt-3 rounded-md overflow-hidden" data-unique-id="de7ccfac-9f4c-4e4b-8336-0f75a29035c8" data-file-name="components/landing/summaries-demo.tsx">
                    <Image src={card.image} alt={`Image related to ${card.title}`} width={300} height={200} className="object-cover w-full" data-unique-id="0ac58b62-47b1-4f77-a0f5-5687564177cb" data-file-name="components/landing/summaries-demo.tsx" />
                  </div>}
              </div>
              
              {/* Card footer with engagement metrics */}
              <div className="border-t border-border p-4 flex justify-between items-center" data-unique-id="9508dc61-a0a8-4325-a16b-1452958eb56f" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">
                {card.platform === 'twitter' && <div className="flex text-xs text-muted-foreground" data-unique-id="d04ce0dc-122e-4802-a4f0-77d29b92eb6f" data-file-name="components/landing/summaries-demo.tsx">
                    <span className="mr-3" data-unique-id="e77e7555-eb41-448f-afe3-8ace8fe747c3" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">{card.engagement.likes}<span className="editable-text" data-unique-id="2a09f374-62f3-448e-b672-dc5106794681" data-file-name="components/landing/summaries-demo.tsx"> likes</span></span>
                    <span data-unique-id="fcfd6ada-d334-4604-a60b-5f7a4bd14843" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">{card.engagement.replies}<span className="editable-text" data-unique-id="107c33f6-ac8e-418b-a463-bb9d3ef0c9ae" data-file-name="components/landing/summaries-demo.tsx"> replies</span></span>
                  </div>}
                
                {card.platform === 'github' && <div className="flex text-xs text-muted-foreground" data-unique-id="3bd2b6b5-692f-4591-a7fa-0019e577cbc5" data-file-name="components/landing/summaries-demo.tsx">
                    <span data-unique-id="e6eda1ba-564e-4364-b802-42b9a6f13131" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">{card.stars}<span className="editable-text" data-unique-id="7cb8554b-cf33-4748-a5f2-6c83c76fa1c4" data-file-name="components/landing/summaries-demo.tsx"> stars</span></span>
                  </div>}
                
                {card.platform === 'reddit' && <div className="flex text-xs text-muted-foreground" data-unique-id="ea2b8de5-70a2-4e5c-ba73-30b55e6a960b" data-file-name="components/landing/summaries-demo.tsx">
                    <span className="mr-3" data-unique-id="0550588c-0467-4e97-8884-7b864b0066c1" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">{card.engagement.upvotes}<span className="editable-text" data-unique-id="fcac5477-f158-49e2-8a9e-38cff073ea9e" data-file-name="components/landing/summaries-demo.tsx"> upvotes</span></span>
                    <span data-unique-id="740b73d4-0d85-4378-a273-215c2be3136b" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">{card.engagement.comments}<span className="editable-text" data-unique-id="536cf192-bdc5-41fd-b3d4-5d58e70eff72" data-file-name="components/landing/summaries-demo.tsx"> comments</span></span>
                  </div>}
                
                <Button size="sm" variant="ghost" className="text-primary flex items-center" data-unique-id="3c3d47ac-9235-45de-8eed-cf921ea6fb29" data-file-name="components/landing/summaries-demo.tsx">
                  <FileText className="h-3.5 w-3.5 mr-1.5" /><span className="editable-text" data-unique-id="daba8633-fd5e-4a8b-997c-f4f5ad1efe81" data-file-name="components/landing/summaries-demo.tsx">
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
      }} onClick={() => setShowSummary(false)} data-unique-id="72768bf6-9116-4bfd-a077-4e903a147112" data-file-name="components/landing/summaries-demo.tsx">
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
        }} onClick={e => e.stopPropagation()} data-unique-id="8f2675ce-d48e-46ec-9bcd-240562f6f7dc" data-file-name="components/landing/summaries-demo.tsx">
              <div className="p-6 border-b border-border flex justify-between items-center" data-unique-id="ee7ea430-c5d7-4e50-b7f2-ad6bbc598cc7" data-file-name="components/landing/summaries-demo.tsx">
                <h3 className="font-semibold" data-unique-id="b9554ffd-9b71-4050-9bf9-66d091f80c91" data-file-name="components/landing/summaries-demo.tsx"><span className="editable-text" data-unique-id="fefc7ddd-b5e8-493d-a427-0d00e08e7b1d" data-file-name="components/landing/summaries-demo.tsx">AI Summary</span></h3>
                <Button variant="ghost" size="sm" onClick={() => setShowSummary(false)} data-unique-id="c7e09520-8647-44a1-8dd7-16ee83380071" data-file-name="components/landing/summaries-demo.tsx"><span className="editable-text" data-unique-id="066bd97b-754f-4a69-9305-d5dec1042647" data-file-name="components/landing/summaries-demo.tsx">
                  Close
                </span></Button>
              </div>
              
              <div className="p-6" data-unique-id="726c68e5-50a2-4d25-847e-104a4bc10251" data-file-name="components/landing/summaries-demo.tsx">
                <div className="prose prose-sm dark:prose-invert" data-unique-id="20952468-a991-41d8-9b94-1550d34c90b2" data-file-name="components/landing/summaries-demo.tsx">
                  <p className="font-medium" data-unique-id="8dfca769-2e8d-49bb-9a7f-d9103be609e7" data-file-name="components/landing/summaries-demo.tsx"><span className="editable-text" data-unique-id="72c53346-7fae-466f-b07c-5da8ff912d4b" data-file-name="components/landing/summaries-demo.tsx">Key takeaways:</span></p>
                  <ul data-unique-id="f16601a9-deb5-4e32-98c4-cddbd153aaa5" data-file-name="components/landing/summaries-demo.tsx">
                    <li data-unique-id="4a5d4dcd-70ee-4bea-bc32-5a8e7b7ccb0f" data-file-name="components/landing/summaries-demo.tsx"><span className="editable-text" data-unique-id="7e82043d-bb72-42e8-bfc0-dfad2e38ba63" data-file-name="components/landing/summaries-demo.tsx">Content discusses advancements in the field of artificial intelligence and its applications</span></li>
                    <li data-unique-id="8c0d72a7-8593-408a-8df3-e0e04bf556d8" data-file-name="components/landing/summaries-demo.tsx"><span className="editable-text" data-unique-id="78de8554-d9e4-4e7d-b229-6e885ff24e9c" data-file-name="components/landing/summaries-demo.tsx">Research findings highlight practical implementations in modern software development</span></li>
                    <li data-unique-id="e2851b09-81cc-431f-bb6c-748515e014ac" data-file-name="components/landing/summaries-demo.tsx"><span className="editable-text" data-unique-id="304e896b-803f-4582-be3c-f85d4b5725de" data-file-name="components/landing/summaries-demo.tsx">Author provides evidence-based analysis of current technology trends</span></li>
                    <li data-unique-id="0922bcd9-3867-4877-ad0a-91ac41f4deda" data-file-name="components/landing/summaries-demo.tsx"><span className="editable-text" data-unique-id="0b980684-b0d1-4676-9509-f010ed1dffd5" data-file-name="components/landing/summaries-demo.tsx">The post received significant engagement from the community</span></li>
                  </ul>
                  <p data-unique-id="ad33af69-dcd5-46b2-b933-79c2e98e2b84" data-file-name="components/landing/summaries-demo.tsx"><span className="editable-text" data-unique-id="65c9a0cc-475c-4d8e-929e-439d36338430" data-file-name="components/landing/summaries-demo.tsx">
                    This content examines how recent developments in AI technology are changing software 
                    architecture patterns. The author presents empirical data showing improved performance 
                    metrics across various test scenarios. Community response indicates strong interest in 
                    the practical applications described, particularly in enterprise contexts.
                  </span></p>
                  <p data-unique-id="ab6c421b-9467-4c2f-a492-20668285c312" data-file-name="components/landing/summaries-demo.tsx"><span className="editable-text" data-unique-id="3ffd67e6-7c92-4498-a4fa-a3952cb87cd3" data-file-name="components/landing/summaries-demo.tsx">
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