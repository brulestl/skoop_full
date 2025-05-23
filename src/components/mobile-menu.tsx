'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
interface NavLink {
  href: string;
  label: string;
}
interface MobileMenuProps {
  links: NavLink[];
}
export function MobileMenu({
  links
}: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Close menu when resizing to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  return <div className="md:hidden" data-unique-id="6e9c00a6-12b6-4f08-b408-66ffce099512" data-file-name="components/mobile-menu.tsx">
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)} aria-label="Open menu" data-unique-id="2b580222-e2c0-463c-ad3d-21d40a5a5110" data-file-name="components/mobile-menu.tsx">
        <Menu className="h-5 w-5" />
      </Button>
      
      <AnimatePresence>
        {isOpen && <motion.div className="fixed inset-0 bg-card dark:bg-card z-50 flex flex-col" initial={{
        opacity: 0,
        x: '100%'
      }} animate={{
        opacity: 1,
        x: 0
      }} exit={{
        opacity: 0,
        x: '100%'
      }} transition={{
        type: 'spring',
        bounce: 0,
        duration: 0.4
      }} data-unique-id="93bf7ab7-f6ba-40b2-b89f-c44a4fb59ac1" data-file-name="components/mobile-menu.tsx">
            <div className="flex justify-between items-center px-4 h-14 border-b border-border" data-unique-id="6fa14812-c2c6-47ef-b20e-d72b87e9e4b1" data-file-name="components/mobile-menu.tsx">
              <Link href="/" className="logo text-2xl font-bold text-primary" data-unique-id="f57f909c-db3f-4e80-a904-1e71ecd5a0c2" data-file-name="components/mobile-menu.tsx"><span className="editable-text" data-unique-id="98656bfc-1cc4-4267-b723-35e40a138582" data-file-name="components/mobile-menu.tsx">SKOOP</span></Link>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} aria-label="Close menu" data-unique-id="174b5243-c885-46f0-a6c3-394197156a05" data-file-name="components/mobile-menu.tsx">
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <nav className="flex flex-col p-6 space-y-6" data-unique-id="286a59ce-29c8-42ad-a878-0d85035aaab6" data-file-name="components/mobile-menu.tsx" data-dynamic-text="true">
              {links.map(link => <Link key={link.href} href={link.href} className="text-xl font-medium hover:text-primary transition-colors" onClick={() => setIsOpen(false)} data-unique-id="95c37ed0-1c22-4742-8e50-d1c410aaf0e4" data-file-name="components/mobile-menu.tsx" data-dynamic-text="true">
                  {link.label}
                </Link>)}
            </nav>
            
            <div className="mt-auto p-6 border-t border-border flex flex-col space-y-4" data-unique-id="a47f4754-9859-475a-8252-67bd910b9d1b" data-file-name="components/mobile-menu.tsx">
              <Link href="/dashboard" className="text-foreground hover:text-primary transition-colors w-full text-center py-2" onClick={() => setIsOpen(false)} data-unique-id="fa895ea6-1b7e-48ac-9177-ebacc926ed2e" data-file-name="components/mobile-menu.tsx"><span className="editable-text" data-unique-id="e409391a-b9b0-44d8-96b9-411dc25202f6" data-file-name="components/mobile-menu.tsx">
                Dashboard
              </span></Link>
              <Link href="/login" onClick={() => setIsOpen(false)} data-unique-id="4cfd84a9-d776-464c-9ba7-0f6ebd70dc32" data-file-name="components/mobile-menu.tsx">
                <Button variant="outline" className="w-full" data-unique-id="730b0152-4a8a-449a-98c2-5aaf91198dee" data-file-name="components/mobile-menu.tsx"><span className="editable-text" data-unique-id="f953da9a-4724-4ad1-bdd3-73044b3e7da0" data-file-name="components/mobile-menu.tsx">Log in</span></Button>
              </Link>
              <Link href="/signup" onClick={() => setIsOpen(false)} data-unique-id="8cbb123f-d089-4fa6-96a6-1fcad7a85bb6" data-file-name="components/mobile-menu.tsx">
                <Button className="skoop-button-accent w-full" data-unique-id="c92922e9-3ff2-4a11-be44-e55be2c3f39f" data-file-name="components/mobile-menu.tsx"><span className="editable-text" data-unique-id="9bf58f9c-f190-4814-ab89-1f9d871b8661" data-file-name="components/mobile-menu.tsx">Sign Up Free</span></Button>
              </Link>
            </div>
          </motion.div>}
      </AnimatePresence>
    </div>;
}