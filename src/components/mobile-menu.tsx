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
  return <div className="md:hidden" data-unique-id="19de793e-df7e-4789-a9b4-60625a8d8d3b" data-file-name="components/mobile-menu.tsx">
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)} aria-label="Open menu" data-unique-id="65010929-6466-44e0-b816-0417950c5ecf" data-file-name="components/mobile-menu.tsx">
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
      }} data-unique-id="fb07d4af-656a-4589-b374-cce145243ef6" data-file-name="components/mobile-menu.tsx">
            <div className="flex justify-between items-center px-4 h-14 border-b border-border" data-unique-id="487330b2-105d-4b37-afe5-52e8533fdc63" data-file-name="components/mobile-menu.tsx">
              <Link href="/" className="logo text-2xl font-bold text-primary" data-unique-id="d2fb1980-b5c5-48c8-993a-ac7a7c55c739" data-file-name="components/mobile-menu.tsx"><span className="editable-text" data-unique-id="ce4f37cc-4f11-443b-9ac6-05955de19f57" data-file-name="components/mobile-menu.tsx">SKOOP</span></Link>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} aria-label="Close menu" data-unique-id="94130841-905f-4363-80f7-1f041e827ae1" data-file-name="components/mobile-menu.tsx">
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <nav className="flex flex-col p-6 space-y-6" data-unique-id="99c0d361-ca57-4dad-ad33-8a2687ac5d8d" data-file-name="components/mobile-menu.tsx" data-dynamic-text="true">
              {links.map(link => <Link key={link.href} href={link.href} className="text-xl font-medium hover:text-primary transition-colors" onClick={() => setIsOpen(false)} data-unique-id="6f2ad310-a32f-44b7-b882-481ca234ec37" data-file-name="components/mobile-menu.tsx" data-dynamic-text="true">
                  {link.label}
                </Link>)}
            </nav>
            
            <div className="mt-auto p-6 border-t border-border flex flex-col space-y-4" data-unique-id="97f917a0-0e88-4067-8e43-92fd23213e4a" data-file-name="components/mobile-menu.tsx">
              <Link href="/dashboard" className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors w-full text-center py-2 rounded-md" onClick={() => setIsOpen(false)} data-unique-id="a89bd190-70f9-49cd-807a-b897aadf8487" data-file-name="components/mobile-menu.tsx"><span className="editable-text" data-unique-id="161f88df-86ef-4a87-902d-0ca2d4a7144b" data-file-name="components/mobile-menu.tsx">
                Dashboard
              </span></Link>
              <Link href="/login" onClick={() => setIsOpen(false)} data-unique-id="663b96ad-b444-4fc4-a3b3-84dfdcfe2f44" data-file-name="components/mobile-menu.tsx">
                <Button variant="outline" className="w-full" data-unique-id="98e2af06-b28d-4fb1-ab4b-ea296158aff6" data-file-name="components/mobile-menu.tsx"><span className="editable-text" data-unique-id="6065ab10-af06-41ed-9be1-4a81cf082bce" data-file-name="components/mobile-menu.tsx">Log in</span></Button>
              </Link>
              <Link href="/signup" onClick={() => setIsOpen(false)} data-unique-id="1687b274-460d-4fe7-9dc1-b296dcdc81bc" data-file-name="components/mobile-menu.tsx">
                <Button className="skoop-button-accent w-full" data-unique-id="5d7e0ae3-20eb-4ed0-92cd-deb18ef261ee" data-file-name="components/mobile-menu.tsx"><span className="editable-text" data-unique-id="3acb8bed-4399-4aa3-85de-642b0c362a02" data-file-name="components/mobile-menu.tsx">Sign Up Free</span></Button>
              </Link>
            </div>
          </motion.div>}
      </AnimatePresence>
    </div>;
}