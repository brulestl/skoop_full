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
  return <section className="py-20 lg:py-28" style={{
    backgroundColor: '#FCEADE'
  }} data-unique-id="8cedd8d9-f876-4976-8ea0-6a1e27dc498c" data-file-name="components/landing/summaries-demo.tsx">
      <div className="skoop-container" data-unique-id="b7ddfda3-ed3e-4256-affd-cfe73c3e384e" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">
        <div className="text-center mb-12" data-unique-id="ed7bb3d7-67fb-4c68-a408-9c106e78da3e" data-file-name="components/landing/summaries-demo.tsx">
          <h2 className="section-title-sm mb-4 text-gray-900" data-unique-id="cba89735-e7dd-4a78-b333-54cbc37a7774" data-file-name="components/landing/summaries-demo.tsx"><span className="editable-text" data-unique-id="6a8571e9-3ded-4f70-a833-ff5640e281c8" data-file-name="components/landing/summaries-demo.tsx">Experience AI-Powered Summaries</span></h2>
          <p className="text-gray-700 max-w-2xl mx-auto" data-unique-id="2d48db26-e887-4f9e-9974-c6b8f6e2cef4" data-file-name="components/landing/summaries-demo.tsx"><span className="editable-text" data-unique-id="89c18ffd-1c98-4d08-8e1b-019a679e15b1" data-file-name="components/landing/summaries-demo.tsx">
            SKOOP automatically generates concise, intelligent summaries of your saved content.
            Tap on a card below to see it in action.
          </span></p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-[340px] md:max-w-none mx-auto" data-unique-id="53ee13cb-7b9c-4972-90c7-b8ecc4edea9c" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">
          {demoCards.map(card => <motion.div key={card.id} className="skoop-card overflow-hidden flex flex-col h-full" whileHover={{
          y: -5,
          transition: {
            duration: 0.2
          }
        }} role="button" aria-expanded={selectedCard === card.id} onClick={() => handleCardClick(card.id)} data-unique-id="b8657204-ae87-463c-92be-02cc7998b683" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">
              {/* Card header with platform info */}
              <div className="p-4 border-b border-border flex items-center" data-unique-id="0af4d048-da07-4a00-a9ac-f3bd42e65e1d" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center mr-2" data-unique-id="ab6aa1ba-8b38-4110-b2fa-dc91beb53363" data-file-name="components/landing/summaries-demo.tsx">
                  <card.icon className={`h-4 w-4 ${card.platformColor}`} />
                </div>
                
                {card.platform === 'twitter' && <div data-unique-id="1990ce9f-4268-4fe0-97de-3ca08bfaf525" data-file-name="components/landing/summaries-demo.tsx">
                    <div className="flex items-center" data-unique-id="0ee689da-6fd0-4be2-bb34-58ad5de8e5e8" data-file-name="components/landing/summaries-demo.tsx">
                      <span className="font-medium text-sm" data-unique-id="3b439794-843b-4189-8029-1aa8c450d400" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">{card.author}</span>
                      <span className="text-muted-foreground ml-1 text-sm" data-unique-id="b886da1d-e9f1-4c9e-b07e-5d2b068f6d79" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">{card.handle}</span>
                    </div>
                    <span className="text-xs text-muted-foreground" data-unique-id="60df2c18-1e8e-4e8b-a2bf-0f8017993d39" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">{card.timestamp}</span>
                  </div>}
                
                {card.platform === 'github' && <div data-unique-id="824fd7ae-d14d-4651-b8d3-58b224311208" data-file-name="components/landing/summaries-demo.tsx">
                    <div className="font-medium text-sm" data-unique-id="3e916c27-70a5-4cd0-ac86-a9879795357b" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">{card.repo}</div>
                    <div className="flex items-center text-xs text-muted-foreground" data-unique-id="d6c81d6b-1e59-421f-9f6b-33b723411280" data-file-name="components/landing/summaries-demo.tsx">
                      <span className="mr-2" data-unique-id="0108c726-b01e-402f-8c79-0d03dbeac036" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">{card.language}</span>
                      <span data-unique-id="46717567-018b-4d5b-a173-4cf794ebbc3d" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">{card.timestamp}</span>
                    </div>
                  </div>}
                
                {card.platform === 'reddit' && <div data-unique-id="132ce477-2550-4761-b019-420127b4a021" data-file-name="components/landing/summaries-demo.tsx">
                    <div className="font-medium text-sm" data-unique-id="0e81573d-5486-4c0a-8b24-1673ee20ac20" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">{card.subreddit}</div>
                    <div className="flex items-center text-xs text-muted-foreground" data-unique-id="23b8d65b-7040-4d2f-84f8-54314d788466" data-file-name="components/landing/summaries-demo.tsx">
                      <span className="mr-2" data-unique-id="677bef79-49fd-436b-a135-5e6b08548f08" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="1dcfb346-e7df-45d9-afa5-f742faf409c5" data-file-name="components/landing/summaries-demo.tsx">u/</span>{card.author}</span>
                      <span data-unique-id="74daed54-d240-474b-a38a-a7a5ce583410" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">{card.timestamp}</span>
                    </div>
                  </div>}
              </div>
              
              {/* Card content */}
              <div className="p-4 flex-1" data-unique-id="81f6ce01-ae1e-4f61-8292-36fa7cee7eac" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">
                <h3 className="font-medium text-white mb-2 line-clamp-2" data-unique-id="55885d92-6dec-4d47-9131-4c101764f9ce" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">{card.title}</h3>
                <p className="text-sm text-white/80 line-clamp-3" data-unique-id="06e06830-3df2-4db4-92d6-838075ee20a7" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">{card.content}</p>
                
                {card.platform === 'twitter' && card.image && <div className="mt-3 rounded-md overflow-hidden" data-unique-id="06fa3e5a-990e-4d6c-8259-ad01e79be65c" data-file-name="components/landing/summaries-demo.tsx">
                    <Image src={card.image} alt={`Image related to ${card.title}`} width={300} height={200} className="object-cover w-full" data-unique-id="a05f39d6-f884-4697-b6bd-0804634369b4" data-file-name="components/landing/summaries-demo.tsx" />
                  </div>}
              </div>
              
              {/* Card footer with engagement metrics */}
              <div className="border-t border-border p-4 flex justify-between items-center" data-unique-id="d11a18ac-5120-4a14-b8fa-e2c05cb52a9c" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">
                {card.platform === 'twitter' && <div className="flex text-xs text-muted-foreground" data-unique-id="9fe16637-007a-4a00-92a1-a1260db5d9ca" data-file-name="components/landing/summaries-demo.tsx">
                    <span className="mr-3" data-unique-id="fcd1b36f-497d-4669-9d28-bdcd212bb625" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">{card.engagement.likes}<span className="editable-text" data-unique-id="3bf46353-cab1-49aa-ad2e-2e55f334d273" data-file-name="components/landing/summaries-demo.tsx"> likes</span></span>
                    <span data-unique-id="62ffa937-0e8b-489a-9fea-70fa1cf91093" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">{card.engagement.replies}<span className="editable-text" data-unique-id="1667c145-aad9-4091-affb-e5d582ce9b64" data-file-name="components/landing/summaries-demo.tsx"> replies</span></span>
                  </div>}
                
                {card.platform === 'github' && <div className="flex text-xs text-muted-foreground" data-unique-id="c81de65f-363e-484f-8998-c04eb77b5c40" data-file-name="components/landing/summaries-demo.tsx">
                    <span data-unique-id="11e90c64-9a28-4dc4-9bdb-60569b13aaaf" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">{card.stars}<span className="editable-text" data-unique-id="e8448097-e0d6-415c-897d-e325312a9419" data-file-name="components/landing/summaries-demo.tsx"> stars</span></span>
                  </div>}
                
                {card.platform === 'reddit' && <div className="flex text-xs text-muted-foreground" data-unique-id="efc129da-b0d5-4811-8d27-8c64acae4f42" data-file-name="components/landing/summaries-demo.tsx">
                    <span className="mr-3" data-unique-id="8ab2c302-796f-4bfc-b014-0da7421ec7da" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">{card.engagement.upvotes}<span className="editable-text" data-unique-id="3e9735e1-1861-495c-94f4-1694c8f32f44" data-file-name="components/landing/summaries-demo.tsx"> upvotes</span></span>
                    <span data-unique-id="346f060b-ce93-485b-9aef-d0b4cac0c681" data-file-name="components/landing/summaries-demo.tsx" data-dynamic-text="true">{card.engagement.comments}<span className="editable-text" data-unique-id="8f808681-1f37-4e1c-9da8-e83d6a1db3c3" data-file-name="components/landing/summaries-demo.tsx"> comments</span></span>
                  </div>}
                
                <Button size="sm" variant="ghost" className="text-primary flex items-center" data-unique-id="df61868d-7817-4051-a495-da9c211d59c0" data-file-name="components/landing/summaries-demo.tsx">
                  <FileText className="h-3.5 w-3.5 mr-1.5" /><span className="editable-text" data-unique-id="fc514625-7829-4753-a27e-9f30ed16fb07" data-file-name="components/landing/summaries-demo.tsx">
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
      }} onClick={() => setShowSummary(false)} data-unique-id="e5dd65ae-8c1e-4975-93e2-55b8a17d5378" data-file-name="components/landing/summaries-demo.tsx">
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
        }} onClick={e => e.stopPropagation()} data-unique-id="425e3f44-d145-4814-acc1-b41555ffc96e" data-file-name="components/landing/summaries-demo.tsx">
              <div className="p-6 border-b border-border flex justify-between items-center" data-unique-id="0ab5355d-1c43-4a9b-969a-9cd3960643a1" data-file-name="components/landing/summaries-demo.tsx">
                <h3 className="font-semibold" data-unique-id="494032a3-9a21-4b68-8a70-f7452d975469" data-file-name="components/landing/summaries-demo.tsx"><span className="editable-text" data-unique-id="854aeb4e-5da9-4a6f-be37-50e0654337d5" data-file-name="components/landing/summaries-demo.tsx">AI Summary</span></h3>
                <Button variant="ghost" size="sm" onClick={() => setShowSummary(false)} data-unique-id="7aa8e936-4e19-43dd-b7a8-551cb97665fa" data-file-name="components/landing/summaries-demo.tsx"><span className="editable-text" data-unique-id="b6a14f31-4781-483e-be3c-0da40d395072" data-file-name="components/landing/summaries-demo.tsx">
                  Close
                </span></Button>
              </div>
              
              <div className="p-6" data-unique-id="a8d7d8e7-2490-4a5f-ae35-75e97e794e3d" data-file-name="components/landing/summaries-demo.tsx">
                <div className="prose prose-sm dark:prose-invert" data-unique-id="e1f12b13-4ac0-4bc6-b877-cc81b0e2b7b2" data-file-name="components/landing/summaries-demo.tsx">
                  <p className="font-medium" data-unique-id="37e5b39d-2c8a-4479-a4c9-8973dceac206" data-file-name="components/landing/summaries-demo.tsx"><span className="editable-text" data-unique-id="2940278f-4635-4fb6-86dd-8c5a9df3aeca" data-file-name="components/landing/summaries-demo.tsx">Key takeaways:</span></p>
                  <ul data-unique-id="706a6e30-2a62-4400-81c7-a5f2ae0dbdaf" data-file-name="components/landing/summaries-demo.tsx">
                    <li data-unique-id="9eced1b9-3ff7-410c-bbaf-cc5e2009944b" data-file-name="components/landing/summaries-demo.tsx"><span className="editable-text" data-unique-id="12de68be-e52f-40d7-baa1-9b2b4e9a2aba" data-file-name="components/landing/summaries-demo.tsx">Content discusses advancements in the field of artificial intelligence and its applications</span></li>
                    <li data-unique-id="9f28d396-e77c-49ef-b63a-e64947fdcfb8" data-file-name="components/landing/summaries-demo.tsx"><span className="editable-text" data-unique-id="bc36cc0c-6da1-44ff-90af-10ac5a5bc563" data-file-name="components/landing/summaries-demo.tsx">Research findings highlight practical implementations in modern software development</span></li>
                    <li data-unique-id="63a14f5e-adec-456a-9460-43f3fdc81e79" data-file-name="components/landing/summaries-demo.tsx"><span className="editable-text" data-unique-id="01454376-2a38-4ec4-b20d-308d12192250" data-file-name="components/landing/summaries-demo.tsx">Author provides evidence-based analysis of current technology trends</span></li>
                    <li data-unique-id="ad9460af-95ba-4e60-b65c-18a96937e8a0" data-file-name="components/landing/summaries-demo.tsx"><span className="editable-text" data-unique-id="82344a8e-53d0-4ea3-8713-706a078fde59" data-file-name="components/landing/summaries-demo.tsx">The post received significant engagement from the community</span></li>
                  </ul>
                  <p data-unique-id="c1697fd3-0c74-4d2f-b62e-67bdad790041" data-file-name="components/landing/summaries-demo.tsx"><span className="editable-text" data-unique-id="e6ee6198-2b8c-4747-a0c7-d449d9f5c329" data-file-name="components/landing/summaries-demo.tsx">
                    This content examines how recent developments in AI technology are changing software 
                    architecture patterns. The author presents empirical data showing improved performance 
                    metrics across various test scenarios. Community response indicates strong interest in 
                    the practical applications described, particularly in enterprise contexts.
                  </span></p>
                  <p data-unique-id="d9338dd3-a735-4b19-a011-b73ee0094f5e" data-file-name="components/landing/summaries-demo.tsx"><span className="editable-text" data-unique-id="492bad5d-f636-42ae-ab54-ba1db9574e28" data-file-name="components/landing/summaries-demo.tsx">
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