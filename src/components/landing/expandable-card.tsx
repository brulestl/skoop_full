'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Check, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
export default function ExpandableCard() {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

  // Handle escape key to collapse
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isExpanded) {
        setIsExpanded(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isExpanded]);

  // Handle focus management on expansion
  useEffect(() => {
    if (isExpanded && contentRef.current) {
      contentRef.current.focus();
    }
  }, [isExpanded]);
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  return <div className="w-full max-w-[640px] mx-auto" data-unique-id="e8a1f652-d85a-4e93-b902-3562b46ba61c" data-file-name="components/landing/expandable-card.tsx">
      <motion.div className={cn("bg-white dark:bg-card border border-[#E5E7EB] dark:border-border rounded-xl shadow-sm", "transition-all hover:shadow-md hover:scale-[1.01]")} layout={!prefersReducedMotion} transition={{
      duration: 0.4,
      ease: 'easeInOut'
    }} data-unique-id="6e18a121-c711-4ba2-ba0e-487c053113fe" data-file-name="components/landing/expandable-card.tsx" data-dynamic-text="true">
        {/* Card Header - Always visible */}
        <div className="p-4 flex items-center cursor-pointer" onClick={toggleExpand} data-unique-id="eb0e072b-484d-4e3b-8fe4-6f136a0aa58f" data-file-name="components/landing/expandable-card.tsx">
          <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center mr-3" data-unique-id="5dd539cd-7178-4060-9a12-f537b7205234" data-file-name="components/landing/expandable-card.tsx">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-unique-id="c0433b0a-c697-4c97-a6f9-dcf8dc8659ff" data-file-name="components/landing/expandable-card.tsx">
              <path d="M12 4C10.8954 4 10 4.89543 10 6H14C14 4.89543 13.1046 4 12 4Z" fill="#25CED1" />
              <path d="M9 8C9 9.10457 9.89543 10 11 10H13C14.1046 10 15 9.10457 15 8H9Z" fill="#25CED1" />
              <path d="M8.5 11C6.567 11 5 12.567 5 14.5C5 16.433 6.567 18 8.5 18C9.60729 18 10.5954 17.5 11.2929 16.7071L13.5858 14.4142C13.9609 14.0391 14.4696 13.8284 15 13.8284C15.5304 13.8284 16.0391 14.0391 16.4142 14.4142L19 17V14.5L16.4142 11.9142C16.0391 11.5391 15.5304 11.3284 15 11.3284C14.4696 11.3284 13.9609 11.5391 13.5858 11.9142L11.2929 14.2071C10.5954 13.5 9.60729 13 8.5 13C7.67157 13 7 13.6716 7 14.5C7 15.3284 7.67157 16 8.5 16C9.32843 16 10 15.3284 10 14.5C10 14.1521 9.85785 13.8372 9.62254 13.6007L12 11.2233L13.7929 13.0162C13.2735 13.1257 12.8158 13.4348 12.5 13.866C12.1843 13.4348 11.7265 13.1257 11.2071 13.0162L9.37746 14.8458C9.1421 14.6093 9 14.2944 9 13.9465C9 13.1181 9.67157 12.4465 10.5 12.4465C11.3284 12.4465 12 13.1181 12 13.9465C12 14.1325 11.9648 14.3101 11.9 14.4751C12.065 14.4104 12.2427 14.3752 12.4286 14.3752C12.8063 14.3752 13.1631 14.5325 13.4142 14.7835L14.7071 16.0764C13.9196 16.8641 12.8282 17.3302 11.6464 17.3302C10.4647 17.3302 9.37325 16.8641 8.58579 16.0764C7.79832 15.2887 7.33232 14.197 7.33232 13.0152C7.33232 11.8334 7.79832 10.7417 8.58579 9.95402L13.2322 5.30761C13.7011 4.83869 14.2687 4.5 14.9059 4.5H15.0941C15.7313 4.5 16.2989 4.83869 16.7678 5.30761L18.2929 6.83279C18.6834 7.22332 19.3166 7.22332 19.7071 6.83279C20.0976 6.44227 20.0976 5.8091 19.7071 5.41858L18.182 3.8934C17.3399 3.05124 16.2095 2.5 15.0941 2.5H14.9059C13.7905 2.5 12.6601 3.05124 11.818 3.8934L7.17157 8.53979C6.41892 9.29245 5.87316 10.2287 5.58602 11.25H4.5C3.67157 11.25 3 11.9216 3 12.75C3 13.5784 3.67157 14.25 4.5 14.25H5.58602C5.87316 15.2713 6.41892 16.2075 7.17157 16.9602C7.92422 17.7129 8.86048 18.2586 9.88175 18.5458V19.5C9.88175 20.3284 10.5533 21 11.3818 21H12.6182C13.4467 21 14.1182 20.3284 14.1182 19.5V18.5458C15.1395 18.2586 16.0758 17.7129 16.8284 16.9602L19.7071 14.0815C20.0976 13.691 20.0976 13.0578 19.7071 12.6673C19.3166 12.2768 18.6834 12.2768 18.2929 12.6673L15.4142 15.546C14.6316 16.3285 13.5401 16.75 12.4286 16.75C11.317 16.75 10.2256 16.3285 9.44298 15.546C8.6604 14.7634 8.23884 13.672 8.23884 12.5604C8.23884 11.4489 8.6604 10.3574 9.44298 9.57486L10.7071 8.31066C10.8946 8.12318 11 7.86055 11 7.58579C11 7.31102 10.8946 7.0484 10.7071 6.86092L9.44298 5.59672C8.6604 4.81414 8.23884 3.72271 8.23884 2.61116C8.23884 2.3364 8.34425 2.07377 8.53173 1.88629L8.88522 1.5328C9.07269 1.34532 9.33532 1.23991 9.61008 1.23991C10.7216 1.23991 11.813 1.66147 12.5956 2.44405C12.7831 2.63153 13.0457 2.73694 13.3205 2.73694C13.5953 2.73694 13.8579 2.63153 14.0454 2.44405L15.4142 1.07527C15.8047 0.684747 15.8047 0.0515766 15.4142 -0.339441C15.0237 -0.730459 14.3905 -0.730459 14 -0.339441L12.6313 1.02939C12.037 0.64671 11.3417 0.400982 10.5939 0.324196C10.1598 0.279771 9.71948 0.339034 9.31177 0.497724C8.90406 0.656414 8.53921 0.910119 8.24918 1.23991L7.89569 1.5934C7.566 1.88343 7.31229 2.24827 7.1536 2.65598C6.99491 3.0637 6.93565 3.50403 6.98007 3.93811C7.05686 4.68596 7.30259 5.38121 7.68527 5.97549L7.17157 6.48979C5.99816 7.66321 5.3338 9.28598 5.3338 10.9731C5.3338 11.0688 5.33658 11.1644 5.3421 11.2599C4.89859 11.3902 4.49552 11.624 4.17037 11.9445C3.62687 12.4773 3.3338 13.2033 3.3338 13.9731C3.3338 14.7428 3.62687 15.4688 4.17037 16.0016C4.49552 16.3221 4.89859 16.5559 5.3421 16.6862C5.33658 16.7818 5.3338 16.8773 5.3338 16.973C5.3338 18.6602 5.99816 20.2829 7.17157 21.4564C8.34499 22.6298 9.96776 23.2941 11.6549 23.2941H12.3451C14.0323 23.2941 15.655 22.6298 16.8285 21.4564C18.0019 20.2829 18.6662 18.6602 18.6662 16.973C18.6662 16.872 18.6631 16.771 18.6569 16.6699C19.1058 16.5414 19.5137 16.3069 19.8421 15.984C20.3809 15.4529 20.6717 14.7326 20.6717 13.9686C20.6717 13.2046 20.3809 12.4842 19.8421 11.9531C19.5137 11.6302 19.1058 11.3957 18.6569 11.2672C18.6631 11.1661 18.6662 11.0651 18.6662 10.9641C18.6662 9.27694 18.0019 7.65417 16.8285 6.48076C15.655 5.30734 14.0323 4.64298 12.3451 4.64298C11.3837 4.64298 10.4482 4.88072 9.61658 5.32573C9.40236 5.45183 9.26358 5.67726 9.24095 5.93121C9.21832 6.18516 9.31438 6.4334 9.50366 6.59821C9.69295 6.76302 9.95216 6.8329 10.2081 6.78429C10.4641 6.73569 10.684 6.57544 10.8009 6.34962C11.2675 5.85742 11.8539 5.53924 12.5 5.45108V5.25C12.5 4.83579 12.8358 4.5 13.25 4.5H14.75C15.1642 4.5 15.5 4.83579 15.5 5.25V5.45108C16.1461 5.53924 16.7325 5.85742 17.1991 6.34962C17.4374 6.59826 17.6924 6.59826 17.9196 6.45108C18.1468 6.3039 18.25 6.0578 18.25 5.75C18.25 5.44219 18.1468 5.19609 17.9196 5.04891C17.0685 4.3685 16 4 14.75 4H13.25C12 4 10.9315 4.3685 10.0804 5.04891C9.8532 5.19609 9.75 5.44219 9.75 5.75C9.75 6.0578 9.8532 6.3039 10.0804 6.45108C10.3076 6.59826 10.5626 6.59826 10.8009 6.34962L11.2929 5.85769C11.6834 5.46716 12.3166 5.46716 12.7071 5.85769C13.0976 6.24821 13.0976 6.88138 12.7071 7.2719L12.2151 7.76403C11.9668 8.01229 11.9668 8.41788 12.2151 8.66614C12.4633 8.91441 12.8689 8.91441 13.1172 8.66614C13.7073 8.07607 14.0121 7.26037 14.0121 6.40243C14.0121 5.54449 13.7073 4.72879 13.1172 4.13871C12.5271 3.54864 11.7114 3.24379 10.8535 3.24379C9.99555 3.24379 9.17985 3.54864 8.58978 4.13871C7.9997 4.72879 7.69485 5.54449 7.69485 6.40243C7.69485 7.26037 7.9997 8.07607 8.58978 8.66614L9.08191 9.15827C8.58978 9.65041 8.29456 10.3037 8.29456 10.9824C8.29456 11.6611 8.58978 12.3144 9.08191 12.8065L9.57405 13.2986C9.82231 13.5469 10.2279 13.5469 10.4762 13.2986C10.7245 13.0504 10.7245 12.6448 10.4762 12.3965L9.98404 11.9043C9.7357 11.6561 9.59913 11.3269 9.59913 10.9824C9.59913 10.6378 9.7357 10.3087 9.98404 10.0604L11.3485 8.69599C11.5966 8.44787 11.5966 8.04253 11.3485 7.79441C11.1004 7.54628 10.695 7.54628 10.4469 7.79441L9.08248 9.15882C8.49204 9.7492 8.1872 10.5653 8.1872 11.4238C8.1872 12.2822 8.49204 13.0983 9.08248 13.6887L10.4469 15.0531C10.695 15.3013 11.1004 15.3013 11.3485 15.0531C11.5966 14.805 11.5966 14.3997 11.3485 14.1515L9.98404 12.7871C9.7357 12.5388 9.59913 12.2096 9.59913 11.8651C9.59913 11.5205 9.7357 11.1914 9.98404 10.9431L10.4762 10.451C10.7245 10.2027 10.7245 9.79714 10.4762 9.54888C10.2279 9.30062 9.82231 9.30062 9.57405 9.54888L9.08191 10.041C8.58978 9.54888 8.29456 8.89556 8.29456 8.21686C8.29456 7.53816 8.58978 6.88484 9.08191 6.39271L10.8009 4.67376C11.2675 4.18157 11.8539 3.86339 12.5 3.77523V3.575C12.5 3.16079 12.8358 2.825 13.25 2.825H14.75C15.1642 2.825 15.5 3.16079 15.5 3.575V3.77523C16.1461 3.86339 16.7325 4.18157 17.1991 4.67376C17.4374 4.9224 17.6924 4.9224 17.9196 4.77523C18.1468 4.62805 18.25 4.38195 18.25 4.07414C18.25 3.76633 18.1468 3.52023 17.9196 3.37305C17.0685 2.69264 16 2.32414 14.75 2.32414H13.25C12 2.32414 10.9315 2.69264 10.0804 3.37305C9.8532 3.52023 9.75 3.76633 9.75 4.07414C9.75 4.38195 9.8532 4.62805 10.0804 4.77523C10.3076 4.9224 10.5626 4.9224 10.8009 4.67376C11.2675 4.18157 11.8539 3.86339 12.5 3.77523C12.1839 3.91559 11.9196 4.16705 11.7499 4.5H10.5C10.2239 4.5 10 4.72386 10 5C10 5.27614 10.2239 5.5 10.5 5.5H13.5C13.7761 5.5 14 5.27614 14 5C14 4.72386 13.7761 4.5 13.5 4.5H12.2501C12.4198 4.16705 12.6841 3.91559 13.0002 3.77523" fill="#25CED1" />
            </svg>
          </div>
          
          <div className="flex-1 min-w-0" data-unique-id="bfe77e79-7349-41b8-b21a-5834b022fb08" data-file-name="components/landing/expandable-card.tsx">
            <div className="flex items-center text-sm text-muted-foreground" data-unique-id="84445df1-970d-4cf7-9630-2e74688223f9" data-file-name="components/landing/expandable-card.tsx">
              <span className="font-medium" data-unique-id="8b5c3fd3-1b0e-4760-b5e8-8a18fe0462b1" data-file-name="components/landing/expandable-card.tsx"><span className="editable-text" data-unique-id="51cb95ed-4cd7-4b1e-968c-57f467455f9e" data-file-name="components/landing/expandable-card.tsx">@VectorGuru</span></span>
              <span className="mx-1" data-unique-id="db824f2d-618b-4e5d-a16c-e60c21ea3393" data-file-name="components/landing/expandable-card.tsx"><span className="editable-text" data-unique-id="abd0d0bd-d89c-430e-b5e7-2f578e4a55ce" data-file-name="components/landing/expandable-card.tsx">·</span></span>
              <span data-unique-id="068aac6b-074a-40de-a6be-65299cd640ca" data-file-name="components/landing/expandable-card.tsx"><span className="editable-text" data-unique-id="b7f827dc-61a6-46fc-bd7a-2f6919e1ccd1" data-file-name="components/landing/expandable-card.tsx">2h ago</span></span>
            </div>
            <p className="text-foreground font-medium mt-1 line-clamp-1" data-unique-id="0a98f999-be93-431e-a6a2-00b28973f2a4" data-file-name="components/landing/expandable-card.tsx"><span className="editable-text" data-unique-id="33450768-dc82-44bc-8832-7552129206e4" data-file-name="components/landing/expandable-card.tsx">
              🧵 Starting a deep-dive on vector search pitfalls you probably run into…
            </span></p>
          </div>

          <div className="flex items-center ml-4" data-unique-id="20837926-52d2-427f-97b3-96643988d943" data-file-name="components/landing/expandable-card.tsx">
            <span className="px-2 py-1 text-xs rounded-full border border-primary text-primary mr-2" data-unique-id="6cf9e689-7087-4eca-af2e-c89191c64824" data-file-name="components/landing/expandable-card.tsx"><span className="editable-text" data-unique-id="6e52bca3-85df-4b64-8a15-c22c54f4a769" data-file-name="components/landing/expandable-card.tsx">
              Saved to SKOOP
            </span></span>
            <button ref={buttonRef} onClick={e => {
            e.stopPropagation();
            toggleExpand();
          }} className="p-1 rounded-full hover:bg-muted transition-colors" aria-expanded={isExpanded} aria-controls="expandable-content" data-unique-id="6b536dcb-35fa-4748-bcda-5a701bb11d27" data-file-name="components/landing/expandable-card.tsx">
              <motion.div animate={{
              rotate: isExpanded ? 180 : 0
            }} transition={{
              duration: 0.3
            }} data-unique-id="d8a695fa-efa4-41be-a625-7c33fa13d372" data-file-name="components/landing/expandable-card.tsx">
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              </motion.div>
            </button>
          </div>
        </div>

        {/* Expandable Content */}
        <AnimatePresence>
          {isExpanded && <motion.div id="expandable-content" ref={contentRef} initial={prefersReducedMotion ? {
          opacity: 1
        } : {
          opacity: 0,
          height: 0
        }} animate={prefersReducedMotion ? {
          opacity: 1
        } : {
          opacity: 1,
          height: 'auto'
        }} exit={prefersReducedMotion ? {
          opacity: 0
        } : {
          opacity: 0,
          height: 0
        }} transition={{
          duration: 0.4,
          ease: 'easeInOut'
        }} className="px-4 pb-4" tabIndex={-1} role="region" aria-labelledby="expandable-card-title" data-unique-id="c909f21c-7e65-4b2b-99b6-6515aabcd010" data-file-name="components/landing/expandable-card.tsx" data-dynamic-text="true">
              {/* AI Summary */}
              <div className="border-l-4 border-primary pl-4 py-2 mb-4 bg-primary/5 rounded-r" data-unique-id="e53187ae-a5b9-4fc6-9267-7f7751193cd9" data-file-name="components/landing/expandable-card.tsx">
                <p className="text-gray-700 dark:text-gray-300 font-medium" data-unique-id="9fde11ef-a3cf-42aa-a9d5-f072d67f6db6" data-file-name="components/landing/expandable-card.tsx"><span className="editable-text" data-unique-id="55a3abf6-92d4-40f3-b975-6192cea5f71b" data-file-name="components/landing/expandable-card.tsx">
                  TL;DR – Vector search can mis-rank results if your index lacks domain-specific
                  training data, ignores token overlap, or uses a cosine cutoff that's too low.
                  Always combine semantic vectors with keyword or metadata filters for precision.
                </span></p>
              </div>

              {/* Key Points */}
              <div className="mb-6" data-unique-id="cefbff98-a45f-458c-b786-0678f1333243" data-file-name="components/landing/expandable-card.tsx">
                <h3 className="text-sm font-medium mb-2" data-unique-id="8bfb2dc4-be05-426f-9159-c04ebc24466d" data-file-name="components/landing/expandable-card.tsx"><span className="editable-text" data-unique-id="072ce8c0-3643-44c1-a8a3-a4708bf2b6ee" data-file-name="components/landing/expandable-card.tsx">Key Points</span></h3>
                <ul className="space-y-2" data-unique-id="fc56b4f5-3a2e-4c85-9628-c95ac7ae1432" data-file-name="components/landing/expandable-card.tsx">
                  <li className="flex items-start" data-unique-id="91b98b93-f63e-4289-af06-943cf271c8ac" data-file-name="components/landing/expandable-card.tsx">
                    <div className="mt-1 mr-2 p-1 rounded-full bg-primary/10" data-unique-id="69bb8896-4a0e-4c3c-a5ce-23a137d0fd8f" data-file-name="components/landing/expandable-card.tsx">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-[#4B5563]" data-unique-id="57b41022-fbb9-4c40-aa7c-9d1b7a08c10b" data-file-name="components/landing/expandable-card.tsx"><span className="editable-text" data-unique-id="f865f7f9-03d9-489e-ac72-ddb847645440" data-file-name="components/landing/expandable-card.tsx">Fine-tune embeddings when domain jargon is heavy.</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="4e3dfeb2-6d13-4b8c-b097-eb3119be93e8" data-file-name="components/landing/expandable-card.tsx">
                    <div className="mt-1 mr-2 p-1 rounded-full bg-primary/10" data-unique-id="afdb088c-8c3a-483a-a715-89bfa3e0b64e" data-file-name="components/landing/expandable-card.tsx">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-[#4B5563]" data-unique-id="1dde7122-b5df-4a33-85a6-692127629d89" data-file-name="components/landing/expandable-card.tsx"><span className="editable-text" data-unique-id="35ba1856-88cd-4a4c-a18a-f8c0b06d6a2e" data-file-name="components/landing/expandable-card.tsx">Normalize vectors and text metadata before similarity calc.</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="eed78fd5-dfb1-4a91-9cd9-29667b70e4ae" data-file-name="components/landing/expandable-card.tsx">
                    <div className="mt-1 mr-2 p-1 rounded-full bg-primary/10" data-unique-id="4dcfcad4-c12e-4c48-9ba0-1145596b20f1" data-file-name="components/landing/expandable-card.tsx">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-[#4B5563]" data-unique-id="cd3edf31-a01f-4f3f-b6d7-7c29318ff518" data-file-name="components/landing/expandable-card.tsx"><span className="editable-text" data-unique-id="e6fb3ec0-3d8d-4df9-af51-18e900e178b9" data-file-name="components/landing/expandable-card.tsx">Post-filter with recency or popularity signals.</span></span>
                  </li>
                </ul>
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-border" data-unique-id="f379452d-374f-4336-89f9-e7af5a55a68e" data-file-name="components/landing/expandable-card.tsx">
                <div className="flex items-center gap-2" data-unique-id="04be5de9-3308-424a-b061-9de9a45f375f" data-file-name="components/landing/expandable-card.tsx">
                  <Button className="bg-gradient-to-r from-primary to-accent text-white" onClick={() => window.open('https://twitter.com/VectorGuru/status/123456', '_blank')} data-unique-id="16206cef-c428-4d59-930e-49f7dd966ff8" data-file-name="components/landing/expandable-card.tsx"><span className="editable-text" data-unique-id="690fa6ff-d93f-40fb-b9b8-ff0ea6b9ee2b" data-file-name="components/landing/expandable-card.tsx">
                    Open Full Thread
                  </span></Button>
                  
                  <Button variant="ghost" size="icon" data-unique-id="92c7f0c5-05ff-460d-aba6-666770be2c5c" data-file-name="components/landing/expandable-card.tsx">
                    <Share2 className="h-4 w-4" />
                    <span className="sr-only" data-unique-id="36268ba3-2306-49d7-9b6d-c6bded1dc443" data-file-name="components/landing/expandable-card.tsx"><span className="editable-text" data-unique-id="0247d7fc-db46-4d61-8752-d26cf13ffaa1" data-file-name="components/landing/expandable-card.tsx">Share</span></span>
                  </Button>
                </div>
                
                <Button variant="ghost" size="sm" onClick={e => {
              e.stopPropagation();
              toggleExpand();
            }} data-unique-id="d795b637-5b0c-40ea-adf2-6e1cb03092d1" data-file-name="components/landing/expandable-card.tsx">
                  <ChevronUp className="h-4 w-4 mr-1" /><span className="editable-text" data-unique-id="c0a3f5c1-0dda-4176-b286-9d769eda2343" data-file-name="components/landing/expandable-card.tsx">
                  Collapse
                </span></Button>
              </div>
            </motion.div>}
        </AnimatePresence>
      </motion.div>
    </div>;
}