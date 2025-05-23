import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { AuroraBackground } from "@/components/ui/aurora-background";
import Link from "next/link";
import Image from "next/image";
import { MobileMenu } from "@/components/mobile-menu";
import { Search, Github, X, Code as StackOverflow, Bookmark, FolderPlus as Collection, CheckCircle2, ChevronRight, ArrowRight } from "lucide-react";
import { SummariesDemo } from "@/components/landing/summaries-demo";
import dynamic from 'next/dynamic';

// Dynamically import the ExpandableCard component with client-side only rendering
const ExpandableCard = dynamic(() => import('@/components/landing/expandable-card'), {
  ssr: true,
  loading: () => <div className="w-full max-w-[640px] mx-auto h-[100px] bg-white dark:bg-card rounded-xl border border-[#E5E7EB] dark:border-border animate-pulse"></div>
});
export default function HomePage() {
  return <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border relative z-10">
        <div className="skoop-container flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="text-2xl logo font-bold text-primary"><span className="editable-text">SKOOP</span></div>
            <nav className="hidden ml-12 space-x-6 md:flex">
              <Link href="#features" className="text-foreground hover:text-primary transition-colors"><span className="editable-text">Features</span></Link>
              <Link href="#pricing" className="text-foreground hover:text-primary transition-colors"><span className="editable-text">Pricing</span></Link>
              <Link href="#faq" className="text-foreground hover:text-primary transition-colors"><span className="editable-text">FAQ</span></Link>
            </nav>
          </div>
          <div className="flex items-center">
            <ThemeToggle />
            <div className="hidden md:flex items-center space-x-4 ml-4">
              <a href="/dashboard" className="text-foreground hover:text-primary transition-colors"><span className="editable-text">Dashboard</span></a>
              <a href="/login" className="text-foreground hover:text-primary transition-colors"><span className="editable-text">Log in</span></a>
              <Button className="skoop-button-accent"><span className="editable-text">Sign Up Free</span></Button>
            </div>
            <MobileMenu links={[{
            href: "#features",
            label: "Features"
          }, {
            href: "#pricing",
            label: "Pricing"
          }, {
            href: "#faq",
            label: "FAQ"
          }]} />
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section with Aurora Background */}
        <section className="relative overflow-hidden">
          <AuroraBackground className="absolute inset-0">
            <div className="absolute inset-0 bg-background/40 backdrop-blur-sm" />
          </AuroraBackground>
          
          <div className="skoop-section relative z-10">
          <div className="skoop-container">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-24 items-center">
              <div className="max-w-[100%] px-4 sm:px-0">
                <h1 className="text-3xl font-bold leading-tight md:text-5xl lg:text-6xl mb-6 max-w-full break-words"><span className="editable-text">
                  Collect, search and </span><span className="text-primary"><span className="editable-text">rediscover</span></span><span className="editable-text"> your saved content
                </span></h1>
                <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-full"><span className="editable-text">
                  One calm space for all your saved X posts, GitHub stars, Reddit posts, and Stack Overflow favorites.
                </span></p>
                <div className="flex flex-col sm:flex-row gap-3 w-full max-w-full">
                  <Button className="skoop-button-accent" size="lg"><span className="editable-text">Get Started</span></Button>
                  <Button variant="outline" size="lg" className="group"><span className="editable-text">
                    How It Works
                    </span><ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
                <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span><span className="editable-text">No credit card required</span></span>
                </div>
              </div>
              <div className="relative">
                <div className="skoop-card overflow-hidden">
                  <Image src="https://images.unsplash.com/photo-1508921340878-ba53e1f016ec?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3" alt="SKOOP Dashboard" width={600} height={400} className="w-full h-auto rounded-t-[var(--radius)]" />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="font-semibold"><span className="editable-text">Recent Saves</span></div>
                      <Search className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="space-y-3">
                      {[1, 2, 3].map(i => <div key={i} className="flex items-center gap-3 p-3 rounded-md bg-secondary/50">
                          {i === 1 && <Github className="h-5 w-5 text-foreground" />}
                          {i === 2 && <X className="h-5 w-5 text-foreground" />}
                          {i === 3 && <StackOverflow className="h-5 w-5 text-foreground" />}
                          <div className="flex-grow">
                            <div className="text-sm font-medium truncate">
                              {i === 1 && "Interesting open source project for data visualization"}
                              {i === 2 && "Thread: 10 tips for better React performance"}
                              {i === 3 && "How to optimize PostgreSQL queries for large datasets"}
                            </div>
                            <div className="text-xs text-muted-foreground mt-0.5">
                              {i === 1 && "Saved 2 hours ago"}
                              {i === 2 && "Saved yesterday"}
                              {i === 3 && "Saved 3 days ago"}
                            </div>
                          </div>
                        </div>)}
                    </div>
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute -left-8 top-1/2 bg-card p-3 rounded-full shadow-lg border border-border hidden lg:block">
                  <Github className="h-6 w-6 text-primary" />
                </div>
                <div className="absolute -right-8 bottom-1/3 bg-card p-3 rounded-full shadow-lg border border-border hidden lg:block">
                  <X className="h-6 w-6 text-accent" />
                </div>
              </div>
            </div>

            {/* Logos */}
            <div className="mt-20 px-4 sm:px-0">
              <p className="text-center text-sm text-muted-foreground mb-6"><span className="editable-text">
                Connect with your favorite platforms
              </span></p>
              <div className="flex justify-center items-center flex-wrap gap-8 md:gap-12">
                <Github className="h-8 w-8 text-muted-foreground" />
                <X className="h-8 w-8 text-muted-foreground" />
                <StackOverflow className="h-8 w-8 text-muted-foreground" />
                <div className="text-muted-foreground text-xl font-semibold"><span className="editable-text">Reddit</span></div>
                <div className="text-muted-foreground text-xl font-semibold"><span className="editable-text">DEV</span></div>
              </div>
            </div>
          </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="skoop-section">
          <div className="skoop-container">
            <div className="text-center mb-16">
              <h2 className="section-title-sm mb-4"><span className="editable-text">Finally, a place for all your saved content</span></h2>
              <p className="text-muted-foreground max-w-2xl mx-auto"><span className="editable-text">
                SKOOP solves the problem of fragmented saves and makes it easy to find what you need when you need it.
              </span></p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3">
              {/* Feature 1 */}
              <div className="skoop-card p-6">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary bg-opacity-10 mb-4">
                  <Bookmark className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3"><span className="editable-text">Unified Collection</span></h3>
                <p className="text-muted-foreground mb-4"><span className="editable-text">
                  Import and sync all your saved content from GitHub, Twitter, Reddit, and Stack Overflow in one place.
                </span></p>
                <div className="pt-4 border-t border-border mt-auto">
                  <Link href="#" className="inline-flex items-center text-primary hover:underline"><span className="editable-text">
                    Learn more </span><ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="skoop-card p-6">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-accent bg-opacity-10 mb-4">
                  <Search className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3"><span className="editable-text">Semantic Search</span></h3>
                <p className="text-muted-foreground mb-4"><span className="editable-text">
                  Find what you're looking for with powerful semantic search that understands the meaning behind your queries.
                </span></p>
                <div className="pt-4 border-t border-border mt-auto">
                  <Link href="#" className="inline-flex items-center text-primary hover:underline"><span className="editable-text">
                    Learn more </span><ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="skoop-card p-6">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-destructive bg-opacity-10 mb-4">
                  <Collection className="h-6 w-6 text-destructive" />
                </div>
                <h3 className="text-xl font-semibold mb-3"><span className="editable-text">Smart Collections</span></h3>
                <p className="text-muted-foreground mb-4"><span className="editable-text">
                  Organize your content with automated collections that group similar items together and surface the best content.
                </span></p>
                <div className="pt-4 border-t border-border mt-auto">
                  <Link href="#" className="inline-flex items-center text-primary hover:underline"><span className="editable-text">
                    Learn more </span><ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI-Powered Summaries Demo Section */}
        <SummariesDemo />

        {/* Pricing Section */}
        <section id="pricing" className="skoop-section bg-secondary bg-opacity-30">
          <div className="skoop-container">
            <div className="text-center mb-16">
              <h2 className="section-title-sm mb-4"><span className="editable-text">Simple, transparent pricing</span></h2>
              <p className="text-muted-foreground max-w-2xl mx-auto"><span className="editable-text">
                Choose the plan that fits your needs. All plans include our core features.
              </span></p>
            </div>

            <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
              {/* Free Plan */}
              <div className="skoop-card p-6 flex flex-col h-full border border-border">
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2"><span className="editable-text">Free</span></h3>
                  <div className="text-3xl font-bold"><span className="editable-text">$0</span><span className="text-muted-foreground text-sm font-normal"><span className="editable-text">/month</span></span></div>
                  <p className="text-muted-foreground text-sm mt-3"><span className="editable-text">Perfect for getting started</span></p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span><span className="editable-text">72h free bookmark storage</span></span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span><span className="editable-text">2 connected platforms</span></span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span><span className="editable-text">Basic search</span></span>
                  </li>
                </ul>
                <div className="mt-auto">
                  <Button className="w-full skoop-button-primary"><span className="editable-text">Get Started</span></Button>
                </div>
              </div>

              {/* Pro Plan */}
              <div className="skoop-card p-6 flex flex-col h-full border-2 border-primary relative">
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-sm font-medium rounded-bl-lg rounded-tr-[calc(var(--radius)-1px)]"><span className="editable-text">
                  Popular
                </span></div>
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2"><span className="editable-text">Pro</span></h3>
                  <div className="text-3xl font-bold"><span className="editable-text">$12</span><span className="text-muted-foreground text-sm font-normal"><span className="editable-text">/month</span></span></div>
                  <p className="text-muted-foreground text-sm mt-3"><span className="editable-text">For power users</span></p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span><span className="editable-text">Unlimited saved items</span></span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span><span className="editable-text">All platforms</span></span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span><span className="editable-text">Advanced semantic search</span></span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span><span className="editable-text">AI summary</span></span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span><span className="editable-text">Smart collections</span></span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span><span className="editable-text">15-minute sync</span></span>
                  </li>
                </ul>
                <div className="mt-auto">
                  <Button className="w-full skoop-button-accent"><span className="editable-text">Choose Pro</span></Button>
                </div>
              </div>

              {/* Power Plan (formerly Team) */}
              <div className="skoop-card p-6 flex flex-col h-full border border-border">
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2"><span className="editable-text">Power</span></h3>
                  <div className="text-3xl font-bold"><span className="editable-text">$19</span><span className="text-muted-foreground text-sm font-normal"><span className="editable-text">/month</span></span></div>
                  <p className="text-muted-foreground text-sm mt-3"><span className="editable-text">Collaborate with your team</span></p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span><span className="editable-text">Everything in Pro</span></span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span><span className="editable-text">5 team members</span></span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span><span className="editable-text">Shared collections</span></span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span><span className="editable-text">Skoop Content columns</span></span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span><span className="editable-text">Collaboration tools</span></span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span><span className="editable-text">Advanced analytics</span></span>
                  </li>
                </ul>
                <div className="mt-auto">
                  <Button className="w-full skoop-button-primary"><span className="editable-text">Choose Power</span></Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="skoop-section">
          <div className="skoop-container max-w-4xl">
            <div className="skoop-card p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4"><span className="editable-text">Ready to organize your digital knowledge?</span></h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto"><span className="editable-text">
                Join thousands of developers, designers, and researchers who are using SKOOP to make the most of their saved content.
              </span></p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button className="skoop-button-accent" size="lg"><span className="editable-text">Get Started for Free</span></Button>
                <Button variant="outline" size="lg"><span className="editable-text">
                  Request Demo
                </span></Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-secondary bg-opacity-30 border-t border-border py-12">
        <div className="skoop-container">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="text-2xl font-bold text-primary mb-4"><span className="editable-text">SKOOP</span></div>
              <p className="text-muted-foreground text-sm"><span className="editable-text">
                The all-in-one platform for collecting, searching and rediscovering your saved content.
              </span></p>
            </div>

            <div>
              <h4 className="font-medium mb-4"><span className="editable-text">Product</span></h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#features" className="hover:text-primary transition-colors"><span className="editable-text">Features</span></Link></li>
                <li><Link href="#pricing" className="hover:text-primary transition-colors"><span className="editable-text">Pricing</span></Link></li>
                <li><Link href="/dashboard" className="hover:text-primary transition-colors"><span className="editable-text">Dashboard</span></Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors"><span className="editable-text">Integrations</span></Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors"><span className="editable-text">Changelog</span></Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-4"><span className="editable-text">Resources</span></h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-primary transition-colors"><span className="editable-text">Documentation</span></Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors"><span className="editable-text">API</span></Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors"><span className="editable-text">Guides</span></Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors"><span className="editable-text">Help Center</span></Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-4"><span className="editable-text">Company</span></h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-primary transition-colors"><span className="editable-text">About</span></Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors"><span className="editable-text">Blog</span></Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors"><span className="editable-text">Careers</span></Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors"><span className="editable-text">Contact</span></Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center">
              <div className="text-xl logo font-bold text-primary mr-2"><span className="editable-text">SKOOP</span></div>
              <div className="text-sm text-muted-foreground"><span className="editable-text">
                © </span>{new Date().getFullYear()}<span className="editable-text"> All rights reserved.
              </span></div>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <span className="sr-only"><span className="editable-text">X</span></span>
                <X className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <span className="sr-only"><span className="editable-text">GitHub</span></span>
                <Github className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>;
}