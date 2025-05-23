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
  return <div className="md:hidden" data-unique-id="7f8731d1-a844-4997-b038-095bf7498f74" data-file-name="components/mobile-menu.tsx">
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)} aria-label="Open menu" data-unique-id="99695f55-a886-43ff-a273-2e7bccfe061f" data-file-name="components/mobile-menu.tsx">
        <Menu className="h-5 w-5" />
      </Button>
      
      <AnimatePresence>
        {isOpen && <motion.div className="fixed inset-0 bg-background z-50 flex flex-col" initial={{
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
      }} data-unique-id="10640e8e-82ad-4a6d-bcc4-049bd7e5083e" data-file-name="components/mobile-menu.tsx">
            <div className="flex justify-between items-center px-4 h-14 border-b border-border" data-unique-id="2c710a66-5f75-49ce-a236-1659a722b33e" data-file-name="components/mobile-menu.tsx">
              <Link href="/" className="logo text-2xl font-bold text-primary" data-unique-id="301645eb-f5b9-487e-8eba-59b6767fd340" data-file-name="components/mobile-menu.tsx"><span className="editable-text" data-unique-id="ac613d3a-3804-4408-b006-2a82aea980f3" data-file-name="components/mobile-menu.tsx">SKOOP</span></Link>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} aria-label="Close menu" data-unique-id="3d811019-3c63-44b8-8f62-aae700e09ded" data-file-name="components/mobile-menu.tsx">
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <nav className="flex flex-col p-6 space-y-6" data-unique-id="1e805669-9195-4626-9f48-4013a61741c3" data-file-name="components/mobile-menu.tsx" data-dynamic-text="true">
              {links.map(link => <Link key={link.href} href={link.href} className="text-xl font-medium hover:text-primary transition-colors" onClick={() => setIsOpen(false)} data-unique-id="7b8fd897-e6ca-4de4-aecf-6385fa6cfeb2" data-file-name="components/mobile-menu.tsx" data-dynamic-text="true">
                  {link.label}
                </Link>)}
            </nav>
            
            <div className="mt-auto p-6 border-t border-border flex flex-col space-y-4" data-unique-id="15990c9f-fcb4-4943-afd8-5c4f599e4f5a" data-file-name="components/mobile-menu.tsx">
              <Link href="/dashboard" className="text-foreground hover:text-primary transition-colors w-full text-center py-2" onClick={() => setIsOpen(false)} data-unique-id="a0382ccb-b383-4726-8baf-7dc0e05ece49" data-file-name="components/mobile-menu.tsx"><span className="editable-text" data-unique-id="d0f9caad-485b-4aaf-932d-bb6909f1f848" data-file-name="components/mobile-menu.tsx">
                Dashboard
              </span></Link>
              <Link href="/login" onClick={() => setIsOpen(false)} data-unique-id="f32b4381-09ee-45e0-8d3d-bd4ee8b04058" data-file-name="components/mobile-menu.tsx">
                <Button variant="outline" className="w-full" data-unique-id="90ebe4fc-d51c-4e0f-bf53-46ff2c281b9b" data-file-name="components/mobile-menu.tsx"><span className="editable-text" data-unique-id="fdc09d09-561e-4b38-a79b-b876abcc4054" data-file-name="components/mobile-menu.tsx">Log in</span></Button>
              </Link>
              <Link href="/signup" onClick={() => setIsOpen(false)} data-unique-id="8077fbda-c626-43a7-a15d-37a5003988a5" data-file-name="components/mobile-menu.tsx">
                <Button className="skoop-button-accent w-full" data-unique-id="f3ef1ab3-35fe-4bb6-a561-cf9de8104077" data-file-name="components/mobile-menu.tsx"><span className="editable-text" data-unique-id="c96e0ba8-1a4d-46ea-9914-a85bc77e2c8c" data-file-name="components/mobile-menu.tsx">Sign Up Free</span></Button>
              </Link>
            </div>
          </motion.div>}
      </AnimatePresence>
    </div>;
}