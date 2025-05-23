'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
interface FaqItem {
  question: string;
  answer: string;
}
interface FaqProps {
  items: FaqItem[];
}
export function Faq({
  items
}: FaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return <div className="space-y-4" data-unique-id="76fd8d28-9719-4368-9400-8b0d4c610f0d" data-file-name="components/faq.tsx" data-dynamic-text="true">
      {items.map((item, index) => <motion.div key={index} initial={{
      opacity: 0,
      y: 10
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.3,
      delay: index * 0.1
    }} className="border border-border rounded-lg overflow-hidden" data-unique-id="33137e8f-67aa-4e66-83e4-548d1608618f" data-file-name="components/faq.tsx">
          <button className={cn("flex items-center justify-between w-full p-4 text-left", openIndex === index ? "bg-secondary/50" : "")} onClick={() => toggleItem(index)} aria-expanded={openIndex === index} data-unique-id="a2ba2ee6-0d25-4047-b993-97e1158bc217" data-file-name="components/faq.tsx">
            <span className="font-medium" data-unique-id="aa76d5d1-88ad-426a-8f61-dcaafde92309" data-file-name="components/faq.tsx" data-dynamic-text="true">{item.question}</span>
            <motion.div animate={{
          rotate: openIndex === index ? 180 : 0
        }} transition={{
          duration: 0.3
        }} data-unique-id="55b3b5fb-361f-4043-bb40-adcf4e0ce221" data-file-name="components/faq.tsx">
              <ChevronDown className="h-5 w-5 text-muted-foreground" data-unique-id="faae5d16-4182-4bc3-ab4f-323d594b1e60" data-file-name="components/faq.tsx" data-dynamic-text="true" />
            </motion.div>
          </button>
          
          <AnimatePresence data-unique-id="f4601e67-9b6b-42e5-af90-f3d82dc0be48" data-file-name="components/faq.tsx" data-dynamic-text="true">
            {openIndex === index && <motion.div initial={{
          height: 0,
          opacity: 0
        }} animate={{
          height: 'auto',
          opacity: 1
        }} exit={{
          height: 0,
          opacity: 0
        }} transition={{
          duration: 0.3
        }} data-unique-id="d5c8a5bb-0a36-4d52-9099-8677b19d7a76" data-file-name="components/faq.tsx">
                <div className="p-4 pt-0 border-t border-border" data-unique-id="b4abaa4b-4729-4e29-866e-008364f66192" data-file-name="components/faq.tsx">
                  <p className="text-muted-foreground" data-unique-id="9ef0d065-5e8d-4e15-af4f-1a996854ad85" data-file-name="components/faq.tsx" data-dynamic-text="true">{item.answer}</p>
                </div>
              </motion.div>}
          </AnimatePresence>
        </motion.div>)}
    </div>;
}