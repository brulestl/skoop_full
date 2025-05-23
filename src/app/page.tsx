import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import Image from "next/image";
import { 
  Search, 
  Github, 
  Twitter, 
  StackOverflow, 
  Bookmark, 
  Collection, 
  CheckCircle2, 
  ChevronRight, 
  ArrowRight
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border">
        <div className="skoop-container flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-primary">SKOOP</div>
            <nav className="hidden ml-12 space-x-6 lg:flex">
              <Link href="#features" className="text-foreground hover:text-primary transition-colors">Features</Link>
              <Link href="#pricing" className="text-foreground hover:text-primary transition-colors">Pricing</Link>
              <Link href="#faq" className="text-foreground hover:text-primary transition-colors">FAQ</Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <a href="/login" className="text-foreground hover:text-primary transition-colors">Log in</a>
            <Button className="skoop-button-accent">Sign Up Free</Button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="skoop-section bg-gradient-to-b from-background to-secondary/20">
          <div className="skoop-container">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-24 items-center">
              <div>
                <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl mb-6">
                  Collect, search and <span className="text-primary">rediscover</span> your saved content
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  One calm space for all your saved tweets, GitHub stars, Reddit posts, and Stack Overflow favorites.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="skoop-button-accent" size="lg">Get Started</Button>
                  <Button variant="outline" size="lg" className="group">
                    How It Works
                    <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
                <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>No credit card required</span>
                </div>
              </div>
              <div className="relative">
                <div className="skoop-card overflow-hidden">
                  <Image 
                    src="https://images.unsplash.com/photo-1508921340878-ba53e1f016ec?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3" 
                    alt="SKOOP Dashboard" 
                    width={600} 
                    height={400} 
                    className="w-full h-auto rounded-t-[var(--radius)]" 
                  />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="font-semibold">Recent Saves</div>
                      <Search className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="space-y-3">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-md bg-secondary/50">
                          {i === 1 && <Github className="h-5 w-5 text-foreground" />}
                          {i === 2 && <Twitter className="h-5 w-5 text-foreground" />}
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
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute -left-8 top-1/2 bg-card p-3 rounded-full shadow-lg border border-border hidden lg:block">
                  <Github className="h-6 w-6 text-primary" />
                </div>
                <div className="absolute -right-8 bottom-1/3 bg-card p-3 rounded-full shadow-lg border border-border hidden lg:block">
                  <Twitter className="h-6 w-6 text-accent" />
                </div>
              </div>
            </div>

            {/* Logos */}
            <div className="mt-20">
              <p className="text-center text-sm text-muted-foreground mb-6">
                Connect with your favorite platforms
              </p>
              <div className="flex justify-center items-center flex-wrap gap-8 md:gap-12">
                <Github className="h-8 w-8 text-muted-foreground" />
                <Twitter className="h-8 w-8 text-muted-foreground" />
                <StackOverflow className="h-8 w-8 text-muted-foreground" />
                <div className="text-muted-foreground text-xl font-semibold">Reddit</div>
                <div className="text-muted-foreground text-xl font-semibold">DEV</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="skoop-section">
          <div className="skoop-container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Finally, a place for all your saved content</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                SKOOP solves the problem of fragmented saves and makes it easy to find what you need when you need it.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3">
              {/* Feature 1 */}
              <div className="skoop-card p-6">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary bg-opacity-10 mb-4">
                  <Bookmark className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Unified Collection</h3>
                <p className="text-muted-foreground mb-4">
                  Import and sync all your saved content from GitHub, Twitter, Reddit, and Stack Overflow in one place.
                </p>
                <div className="pt-4 border-t border-border mt-auto">
                  <Link href="#" className="inline-flex items-center text-primary hover:underline">
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="skoop-card p-6">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-accent bg-opacity-10 mb-4">
                  <Search className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Semantic Search</h3>
                <p className="text-muted-foreground mb-4">
                  Find what you're looking for with powerful semantic search that understands the meaning behind your queries.
                </p>
                <div className="pt-4 border-t border-border mt-auto">
                  <Link href="#" className="inline-flex items-center text-primary hover:underline">
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="skoop-card p-6">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-destructive bg-opacity-10 mb-4">
                  <Collection className="h-6 w-6 text-destructive" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Smart Collections</h3>
                <p className="text-muted-foreground mb-4">
                  Organize your content with automated collections that group similar items together and surface the best content.
                </p>
                <div className="pt-4 border-t border-border mt-auto">
                  <Link href="#" className="inline-flex items-center text-primary hover:underline">
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="skoop-section bg-secondary bg-opacity-30">
          <div className="skoop-container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Simple, transparent pricing</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Choose the plan that fits your needs. All plans include our core features.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
              {/* Free Plan */}
              <div className="skoop-card p-6 flex flex-col h-full border border-border">
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">Free</h3>
                  <div className="text-3xl font-bold">$0<span className="text-muted-foreground text-sm font-normal">/month</span></div>
                  <p className="text-muted-foreground text-sm mt-3">Perfect for getting started</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span>500 saved items</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span>2 connected platforms</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span>Basic search</span>
                  </li>
                </ul>
                <div className="mt-auto">
                  <Button className="w-full skoop-button-primary">Get Started</Button>
                </div>
              </div>

              {/* Pro Plan */}
              <div className="skoop-card p-6 flex flex-col h-full border-2 border-primary relative">
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-sm font-medium rounded-bl-lg rounded-tr-[calc(var(--radius)-1px)]">
                  Popular
                </div>
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">Pro</h3>
                  <div className="text-3xl font-bold">$9<span className="text-muted-foreground text-sm font-normal">/month</span></div>
                  <p className="text-muted-foreground text-sm mt-3">For power users</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span>Unlimited saved items</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span>All platforms</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span>Advanced semantic search</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span>Smart collections</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span>15-minute sync</span>
                  </li>
                </ul>
                <div className="mt-auto">
                  <Button className="w-full skoop-button-accent">Choose Pro</Button>
                </div>
              </div>

              {/* Team Plan */}
              <div className="skoop-card p-6 flex flex-col h-full border border-border">
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">Team</h3>
                  <div className="text-3xl font-bold">$19<span className="text-muted-foreground text-sm font-normal">/month</span></div>
                  <p className="text-muted-foreground text-sm mt-3">Collaborate with your team</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span>Everything in Pro</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span>5 team members</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span>Shared collections</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span>Collaboration tools</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span>Advanced analytics</span>
                  </li>
                </ul>
                <div className="mt-auto">
                  <Button className="w-full skoop-button-primary">Choose Team</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="skoop-section">
          <div className="skoop-container max-w-4xl">
            <div className="skoop-card p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to organize your digital knowledge?</h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Join thousands of developers, designers, and researchers who are using SKOOP to make the most of their saved content.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button className="skoop-button-accent" size="lg">Get Started for Free</Button>
                <Button variant="outline" size="lg">
                  Request Demo
                </Button>
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
              <div className="text-2xl font-bold text-primary mb-4">SKOOP</div>
              <p className="text-muted-foreground text-sm">
                The all-in-one platform for collecting, searching and rediscovering your saved content.
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#features" className="hover:text-primary transition-colors">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Integrations</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Changelog</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-primary transition-colors">Documentation</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">API</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Guides</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Help Center</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-primary transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} SKOOP. All rights reserved.
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <span className="sr-only">GitHub</span>
                <Github className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
