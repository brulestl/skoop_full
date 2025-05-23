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
  return <div className="md:hidden" data-unique-id="a6a592bb-97d1-4232-9391-067b8daa8da0" data-file-name="components/mobile-menu.tsx">
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)} aria-label="Open menu" data-unique-id="948fcd65-a5ec-4e35-8654-ef1f6f29db9a" data-file-name="components/mobile-menu.tsx">
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
      }} data-unique-id="598640e4-943f-4da1-bad9-250f5c313fe0" data-file-name="components/mobile-menu.tsx">
            <div className="flex justify-between items-center px-4 h-14 border-b border-border" data-unique-id="33875559-cbb3-4ce2-9514-ce32d67acc12" data-file-name="components/mobile-menu.tsx">
              <Link href="/" className="logo text-2xl font-bold text-primary" data-unique-id="fb9d8e70-4b7f-4e71-bf9f-2c89b810197d" data-file-name="components/mobile-menu.tsx"><span className="editable-text" data-unique-id="553cc723-13fd-4c40-9d6e-ad08b5ae4d15" data-file-name="components/mobile-menu.tsx">SKOOP</span></Link>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} aria-label="Close menu" data-unique-id="e1e14e59-62c9-4ecd-ba12-00c5df06fcf0" data-file-name="components/mobile-menu.tsx">
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <nav className="flex flex-col p-6 space-y-6" data-unique-id="dd145c16-30bc-4334-b3d8-8c984f57717f" data-file-name="components/mobile-menu.tsx" data-dynamic-text="true">
              {links.map(link => <Link key={link.href} href={link.href} className="text-xl font-medium hover:text-primary transition-colors" onClick={() => setIsOpen(false)} data-unique-id="2f9b0088-df89-45b9-bb34-0e4a4b6cbe9e" data-file-name="components/mobile-menu.tsx" data-dynamic-text="true">
                  {link.label}
                </Link>)}
            </nav>
            
            <div className="mt-auto p-6 border-t border-border flex flex-col space-y-4" data-unique-id="5d68489f-323c-4d7b-afda-236c3c476c32" data-file-name="components/mobile-menu.tsx">
              <Link href="/dashboard" className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors w-full text-center py-2 rounded-md" onClick={() => setIsOpen(false)} data-unique-id="77280241-fd31-4d77-b029-a1eead46a580" data-file-name="components/mobile-menu.tsx"><span className="editable-text" data-unique-id="f8c841bd-9aec-45d7-8b4c-d9e60201f3e5" data-file-name="components/mobile-menu.tsx">
                Dashboard
              </span></Link>
              <Link href="/login" onClick={() => setIsOpen(false)} data-unique-id="c62a47cd-578a-4c4f-a5e8-986dc68434e4" data-file-name="components/mobile-menu.tsx">
                <Button variant="outline" className="w-full" data-unique-id="c4f7bfd2-434e-448d-b7b2-45016a0b4740" data-file-name="components/mobile-menu.tsx"><span className="editable-text" data-unique-id="10f42896-a6d7-4019-bf2e-94b85bfd56e0" data-file-name="components/mobile-menu.tsx">Log in</span></Button>
              </Link>
              <Link href="/signup" onClick={() => setIsOpen(false)} data-unique-id="d0c6a052-a56a-4265-b424-e9495c1b325a" data-file-name="components/mobile-menu.tsx">
                <Button className="skoop-button-accent w-full" data-unique-id="ffc7657b-aef2-43a6-8ae3-1685439251e2" data-file-name="components/mobile-menu.tsx"><span className="editable-text" data-unique-id="fedccbff-ab81-42af-93fd-2476660d5fa5" data-file-name="components/mobile-menu.tsx">Sign Up Free</span></Button>
              </Link>
            </div>
          </motion.div>}
      </AnimatePresence>
    </div>;
}