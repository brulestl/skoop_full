import Link from 'next/link';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Faq } from '@/components/faq';

export const metadata = {
  title: "FAQ | SKOOP",
  description: "Frequently asked questions about using SKOOP to manage your saved content"
};

export default function FaqPage() {
  // FAQ data
  const faqs = [
    {
      question: "What is SKOOP?",
      answer: "SKOOP is a unified platform that helps you collect, search, and rediscover content you've saved across the internet. It connects with platforms like GitHub, X (formerly Twitter), Reddit, and Stack Overflow to bring all your saved items into one searchable space."
    },
    {
      question: "How do I get started with SKOOP?",
      answer: "Getting started is easy! Just sign up for a free account, connect your favorite platforms like GitHub or X, and SKOOP will automatically start importing your saved content. Our AI will organize and summarize your content, making it easy to find and use later."
    },
    {
      question: "Is my data safe with SKOOP?",
      answer: "Yes, we take data security seriously. All your data is encrypted, and we never share your information with third parties. You can delete your data at any time, and we offer regular data exports so you always have control over your content."
    },
    {
      question: "What platforms does SKOOP integrate with?",
      answer: "Currently, SKOOP integrates with GitHub, X (formerly Twitter), Reddit, and Stack Overflow. We're constantly working on adding new integrations based on user feedback."
    },
    {
      question: "How does SKOOP's AI summarization work?",
      answer: "Our AI technology analyzes your saved content and generates concise summaries that capture the key points. This makes it easier to quickly understand and recall information without having to re-read the entire content. You can choose between our default Claude AI or switch to OpenAI for summaries."
    },
    {
      question: "What's the difference between the free and paid plans?",
      answer: "The free plan lets you save limited content for up to 72 hours and connect 2 platforms. Paid plans offer unlimited saved items, more integrations, advanced semantic search, AI-powered summaries, smart collections, and more frequent syncing. The Power plan adds team collaboration features."
    },
    {
      question: "Can I export my data from SKOOP?",
      answer: "Absolutely! SKOOP makes it easy to export your data in common formats like CSV or JSON. You're never locked in, and you can take your organized content with you anytime."
    },
    {
      question: "How often does SKOOP sync with connected platforms?",
      answer: "Free accounts sync once daily, Pro accounts sync every 15 minutes, and Power accounts have continuous syncing. You can also manually trigger a sync anytime you want the latest updates."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border relative">
        <div className="skoop-container flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="logo text-2xl font-bold text-primary">SKOOP</Link>
            <nav className="hidden ml-12 space-x-6 md:flex">
              <Link href="/#features" className="text-foreground hover:text-primary transition-colors">Features</Link>
              <Link href="/#pricing" className="text-foreground hover:text-primary transition-colors">Pricing</Link>
              <Link href="/faq" className="text-primary font-medium">FAQ</Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-foreground hover:text-primary transition-colors">Log in</Link>
            <Button className="skoop-button-accent">Sign Up Free</Button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-12 bg-secondary bg-opacity-30">
          <div className="skoop-container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>
              <p className="text-lg text-muted-foreground">
                Find answers to common questions about SKOOP and how it can help you manage your digital knowledge.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Content Section */}
        <section className="py-16">
          <div className="skoop-container">
            <div className="max-w-3xl mx-auto">
              <Faq items={faqs} />
              
              <div className="mt-16 bg-muted/30 border border-border rounded-lg p-6 text-center">
                <h2 className="text-xl font-semibold mb-2">Still have questions?</h2>
                <p className="text-muted-foreground mb-4">
                  Our support team is ready to help you with any other questions you might have.
                </p>
                <Button className="skoop-button-primary">
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-secondary bg-opacity-30 border-t border-border py-12">
        <div className="skoop-container">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="text-2xl font-bold text-primary mb-4">SKOOP</div>
              <p className="text-muted-foreground text-sm">
                The all-in-one platform for collecting, searching and rediscovering your saved content.
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/#features" className="hover:text-primary transition-colors">Features</Link></li>
                <li><Link href="/#pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
                <li><Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link></li>
                <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                <li><Link href="/cookies" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                <li><Link href="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} SKOOP. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
