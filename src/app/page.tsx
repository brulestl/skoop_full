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
  loading: () => <div className="w-full max-w-[640px] mx-auto h-[100px] bg-white dark:bg-card rounded-xl border border-[#E5E7EB] dark:border-border animate-pulse" data-unique-id="d1487e75-2090-4b14-a3ad-cdc35dddd75f" data-file-name="app/page.tsx"></div>
});
export default function HomePage() {
  return <div className="min-h-screen flex flex-col" data-unique-id="3427adf1-c055-48fe-a8a5-ba24aa3e41f8" data-file-name="app/page.tsx" data-dynamic-text="true">
      {/* Header */}
      <header className="border-b border-border relative z-10" data-unique-id="88a36eb9-43de-4bc2-b13e-c99b801d9fc4" data-file-name="app/page.tsx">
        <div className="skoop-container flex items-center justify-between h-16" data-unique-id="d0d8e541-50ab-4dc8-9f88-923f92905c95" data-file-name="app/page.tsx">
          <div className="flex items-center" data-unique-id="b7d1ccb1-6bd9-4f45-9c81-e5c9da4de2a4" data-file-name="app/page.tsx">
            <div className="text-2xl logo font-bold text-primary" data-unique-id="aca550d0-d31c-492c-8a6b-50c64d02ade9" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="8ce70206-0a64-4568-b55e-10f4b9dde9d1" data-file-name="app/page.tsx">SKOOP</span></div>
            <nav className="hidden ml-12 space-x-6 md:flex" data-unique-id="8336e518-41a5-4980-adf6-28578c47c626" data-file-name="app/page.tsx">
              <Link href="#features" className="text-foreground hover:text-primary transition-colors" data-unique-id="de33b0f8-bbb4-4e7a-8b25-608d97ae6310" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="88ee9302-9212-46fd-9815-2dd49128b561" data-file-name="app/page.tsx">Features</span></Link>
              <Link href="#pricing" className="text-foreground hover:text-primary transition-colors" data-unique-id="ea8571de-933b-4c3f-94fe-1c8512e85c45" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="e32917d0-0452-4de3-bb9d-d94557708891" data-file-name="app/page.tsx">Pricing</span></Link>
              <Link href="#faq" className="text-foreground hover:text-primary transition-colors" data-unique-id="ea3651ac-37d5-4932-afdc-2bf2d4c185e8" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="6a21adbc-fac0-4319-a3b5-6f6a1dde4217" data-file-name="app/page.tsx">FAQ</span></Link>
            </nav>
          </div>
          <div className="flex items-center" data-unique-id="3fb56978-2b4b-45ae-84a9-cd09112e721f" data-file-name="app/page.tsx">
            <ThemeToggle />
            <div className="hidden md:flex items-center space-x-4 ml-4" data-unique-id="0f35e584-7f1a-45f8-b602-f64b9a53bb26" data-file-name="app/page.tsx">
              <a href="/dashboard" className="text-foreground hover:text-primary transition-colors" data-unique-id="e67593b9-6171-42e6-9d63-6f3e9fad5663" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="7ee995a4-adfe-4e1f-9c85-dd21700884b5" data-file-name="app/page.tsx">Dashboard</span></a>
              <a href="/login" className="text-foreground hover:text-primary transition-colors" data-unique-id="92f8df49-12e9-4c20-b0ac-342f6f552f45" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="35dd28db-db37-4de7-9f5f-69612a2c9ef6" data-file-name="app/page.tsx">Log in</span></a>
              <Button className="skoop-button-accent" data-unique-id="4e19b956-155e-4d4f-96e1-7fa3a1537895" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="e3a2be99-278b-4574-bab3-86ae9db4f094" data-file-name="app/page.tsx">Sign Up Free</span></Button>
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

      <main className="flex-grow" data-unique-id="ad06d653-dbe0-42e9-97e9-a530f5adae91" data-file-name="app/page.tsx" data-dynamic-text="true">
        {/* Hero Section with Aurora Background */}
        <section className="relative overflow-hidden" data-unique-id="50d7e5eb-03fd-4c41-b523-4de50672daa4" data-file-name="app/page.tsx">
          <AuroraBackground className="absolute inset-0">
            <div className="absolute inset-0 bg-background/40 backdrop-blur-sm" data-unique-id="8c0a2fa6-c713-49aa-b20e-d369470a67af" data-file-name="app/page.tsx" />
          </AuroraBackground>
          
          <div className="skoop-section relative z-10" data-unique-id="7fa36cca-9672-4666-9c53-0e04ee73cba9" data-file-name="app/page.tsx">
          <div className="skoop-container" data-unique-id="3a8d12ee-75f1-49f4-84a5-04770f54c9d4" data-file-name="app/page.tsx" data-dynamic-text="true">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-24 items-center" data-unique-id="c3b011ef-22af-4204-b216-ec89bdeaef60" data-file-name="app/page.tsx">
              <div className="max-w-[100%] px-4 sm:px-0" data-unique-id="542378c9-9b40-4b3d-a61b-2ba3b3d6d665" data-file-name="app/page.tsx">
                <h1 className="text-3xl font-bold leading-tight md:text-5xl lg:text-6xl mb-6 max-w-full break-words" data-unique-id="80703a7d-1623-4e95-b8e8-5104782a61c1" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="407c82de-319d-4de8-976d-97b72cfa8bd4" data-file-name="app/page.tsx">
                  Collect, search and </span><span className="text-primary" data-unique-id="2a9dce82-83b4-4785-81af-f06343e1a73a" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="9a5b1d26-0766-4b88-b272-835d21622311" data-file-name="app/page.tsx">rediscover</span></span><span className="editable-text" data-unique-id="dcab9f21-afb4-443f-9081-e3c565a2f427" data-file-name="app/page.tsx"> your saved content
                </span></h1>
                <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-full" data-unique-id="a678ffea-3090-4b95-bdd3-46e45549a93f" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="8964a1e5-e563-4927-b3ef-bc0f0e90b29a" data-file-name="app/page.tsx">
                  One calm space for all your saved X posts, GitHub stars, Reddit posts, and Stack Overflow favorites.
                </span></p>
                <div className="flex flex-col sm:flex-row gap-3 w-full max-w-full" data-unique-id="98c5369f-fba9-4dff-8d4b-a402a722a083" data-file-name="app/page.tsx">
                  <Button className="skoop-button-accent" size="lg" data-unique-id="f55fe9f8-3a66-4ddb-8113-4ba6102164ec" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="f1655576-ddab-4241-b2a1-c4b69b7a971c" data-file-name="app/page.tsx">Get Started</span></Button>
                  <Button variant="outline" size="lg" className="group" data-unique-id="5ef0f527-bd6e-45fa-a8a0-5431326c5e44" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="3cebd2f5-a118-4d6d-a059-90c9f2c7779a" data-file-name="app/page.tsx">
                    How It Works
                    </span><ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
                <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground" data-unique-id="d1cd61db-3242-403a-935c-9afacadc93ea" data-file-name="app/page.tsx">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span data-unique-id="20a6858b-73e9-49e7-9a4b-eeea01d59369" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="9cb57c03-940e-4897-a4ce-3616af2103fa" data-file-name="app/page.tsx">No credit card required</span></span>
                </div>
              </div>
              <div className="relative" data-unique-id="91c716e0-fb92-4075-9a00-e4b0d16b20ca" data-file-name="app/page.tsx" data-dynamic-text="true">
                <div className="skoop-card overflow-hidden" data-unique-id="8a64e523-2341-40d2-a84d-236d74b2e4ca" data-file-name="app/page.tsx">
                  <Image src="https://images.unsplash.com/photo-1508921340878-ba53e1f016ec?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3" alt="SKOOP Dashboard" width={600} height={400} className="w-full h-auto rounded-t-[var(--radius)]" data-unique-id="8d5fb293-573b-475a-8ff7-1d1bf2ab3781" data-file-name="app/page.tsx" />
                  <div className="p-6" data-unique-id="8099c53b-6f2e-4466-b9b3-cafe11d8d1bd" data-file-name="app/page.tsx">
                    <div className="flex items-center justify-between mb-4" data-unique-id="12adef73-e467-41fc-85bd-b9742723aa09" data-file-name="app/page.tsx">
                      <div className="font-semibold" data-unique-id="56b03354-8b4d-40bf-abef-1382248161ef" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="ac7be25e-baf2-4cd5-a17b-bac87dba1f08" data-file-name="app/page.tsx">Recent Saves</span></div>
                      <Search className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="space-y-3" data-unique-id="436c4a27-dd6a-427f-b303-91f88fadf31c" data-file-name="app/page.tsx" data-dynamic-text="true">
                      {[1, 2, 3].map(i => <div key={i} className="flex items-center gap-3 p-3 rounded-md bg-secondary/50" data-unique-id="4729d9a8-10a0-4bff-818c-924127af2573" data-file-name="app/page.tsx" data-dynamic-text="true">
                          {i === 1 && <Github className="h-5 w-5 text-foreground" />}
                          {i === 2 && <X className="h-5 w-5 text-foreground" />}
                          {i === 3 && <StackOverflow className="h-5 w-5 text-foreground" />}
                          <div className="flex-grow" data-unique-id="b4a471b4-36e9-4bbd-99e2-27c5d304a17c" data-file-name="app/page.tsx">
                            <div className="text-sm font-medium truncate" data-unique-id="27c5117e-dfa3-4343-9940-0cb000dfea7e" data-file-name="app/page.tsx" data-dynamic-text="true">
                              {i === 1 && "Interesting open source project for data visualization"}
                              {i === 2 && "Thread: 10 tips for better React performance"}
                              {i === 3 && "How to optimize PostgreSQL queries for large datasets"}
                            </div>
                            <div className="text-xs text-muted-foreground mt-0.5" data-unique-id="2a4165e7-ff47-4098-89f5-5097644396ca" data-file-name="app/page.tsx" data-dynamic-text="true">
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
                <div className="absolute -left-8 top-1/2 bg-card p-3 rounded-full shadow-lg border border-border hidden lg:block" data-unique-id="0107fab6-71f1-450b-9f03-ab322fe1b62f" data-file-name="app/page.tsx">
                  <Github className="h-6 w-6 text-primary" />
                </div>
                <div className="absolute -right-8 bottom-1/3 bg-card p-3 rounded-full shadow-lg border border-border hidden lg:block" data-unique-id="af2bc384-0998-470e-8c1f-7fddbece2a4d" data-file-name="app/page.tsx">
                  <X className="h-6 w-6 text-accent" />
                </div>
              </div>
            </div>

            {/* Logos */}
            <div className="mt-20 px-4 sm:px-0" data-unique-id="aba4344b-70a7-4444-9f71-776ee00fa2eb" data-file-name="app/page.tsx">
              <p className="text-center text-sm text-muted-foreground mb-6" data-unique-id="f8ab704f-75b9-4cb9-afb9-bd1a33877afe" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="4e622392-1818-468b-9e55-fffb420e2f75" data-file-name="app/page.tsx">
                Connect with your favorite platforms
              </span></p>
              <div className="flex justify-center items-center flex-wrap gap-8 md:gap-12" data-unique-id="fb972e10-0054-4490-9bf3-3ebe855f8c6e" data-file-name="app/page.tsx">
                <Github className="h-8 w-8 text-muted-foreground" />
                <X className="h-8 w-8 text-muted-foreground" />
                <StackOverflow className="h-8 w-8 text-muted-foreground" />
                <div className="text-muted-foreground text-xl font-semibold" data-unique-id="e148dc47-d84d-49ef-81a2-2de626b2400f" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="bb0396d9-7600-4444-90dc-df4eaac45892" data-file-name="app/page.tsx">Reddit</span></div>
                <div className="text-muted-foreground text-xl font-semibold" data-unique-id="61a2d584-3405-4f32-aa42-a48601fb4cf7" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="7e355173-0669-4bfa-b0af-a7dc5cfea272" data-file-name="app/page.tsx">DEV</span></div>
              </div>
            </div>
          </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="skoop-section" data-unique-id="55ab93d1-2294-4d77-a818-b763dbb6f880" data-file-name="app/page.tsx">
          <div className="skoop-container" data-unique-id="56a941ed-7fad-489c-9306-41307ccff550" data-file-name="app/page.tsx">
            <div className="text-center mb-16" data-unique-id="3ccda434-6ecf-4ae8-90fe-2574927b8fcf" data-file-name="app/page.tsx">
              <h2 className="section-title-sm mb-4" data-unique-id="374b9f83-14b7-4306-89c4-0fe2532b31dd" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="4347e18d-992f-483f-bee1-00fe1c73edcf" data-file-name="app/page.tsx">Finally, a place for all your saved content</span></h2>
              <p className="text-muted-foreground max-w-2xl mx-auto" data-unique-id="dd7807e7-1724-4f46-8b72-a9c8a52eea81" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="6d4cf5b3-e1d9-44df-8c64-816240497b5a" data-file-name="app/page.tsx">
                SKOOP solves the problem of fragmented saves and makes it easy to find what you need when you need it.
              </span></p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3" data-unique-id="e83665f1-a999-413b-a898-5448f73fad36" data-file-name="app/page.tsx" data-dynamic-text="true">
              {/* Feature 1 */}
              <div className="skoop-card p-6" data-unique-id="8afd9862-060d-41b2-9701-41e3d8dd3b0e" data-file-name="app/page.tsx">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary bg-opacity-10 mb-4" data-unique-id="997083b8-4691-48ae-94d3-88c9d1ea564c" data-file-name="app/page.tsx">
                  <Bookmark className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3" data-unique-id="35bf0804-a2f8-43db-a996-41b567762c27" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="d23f5ea3-9480-4f0c-b529-df361a5a474b" data-file-name="app/page.tsx">Unified Collection</span></h3>
                <p className="text-muted-foreground mb-4" data-unique-id="99fbeeee-843f-4f2b-8e32-067882cd1a50" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="b9db7dd5-e2c3-451c-ab0d-18da8ddf6ae0" data-file-name="app/page.tsx">
                  Import and sync all your saved content from GitHub, Twitter, Reddit, and Stack Overflow in one place.
                </span></p>
                <div className="pt-4 border-t border-border mt-auto" data-unique-id="6f03a6c1-d322-42a6-bcae-6ecceaaf5c7b" data-file-name="app/page.tsx">
                  <Link href="#" className="inline-flex items-center text-primary hover:underline" data-unique-id="3a702874-9fde-4187-9343-fad54e9fbdc0" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="9dd52563-6389-4be7-acd6-742a1aaae452" data-file-name="app/page.tsx">
                    Learn more </span><ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="skoop-card p-6" data-unique-id="4c1d1a81-e7c8-4ef1-acd5-1e25502e5c30" data-file-name="app/page.tsx">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-accent bg-opacity-10 mb-4" data-unique-id="58cc188a-c52b-4a44-88a9-87a5b3256957" data-file-name="app/page.tsx">
                  <Search className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3" data-unique-id="6f3c37b8-668d-4c1f-88a8-8352faa54e1b" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="1d337d8a-ccea-4d5d-b7aa-bc63d17e5f2c" data-file-name="app/page.tsx">Semantic Search</span></h3>
                <p className="text-muted-foreground mb-4" data-unique-id="5833c8bb-9fd3-4291-a370-b2ec85436e53" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="4363aee2-547d-40ce-832c-3071b439047d" data-file-name="app/page.tsx">
                  Find what you're looking for with powerful semantic search that understands the meaning behind your queries.
                </span></p>
                <div className="pt-4 border-t border-border mt-auto" data-unique-id="36eb7584-9047-4af1-9e39-3a5ba462fbe6" data-file-name="app/page.tsx">
                  <Link href="#" className="inline-flex items-center text-primary hover:underline" data-unique-id="a675b0de-ff06-4cab-8af1-1b38919095bf" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="b5353f41-8f8d-4b71-b907-0d73f6a94e35" data-file-name="app/page.tsx">
                    Learn more </span><ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="skoop-card p-6" data-unique-id="b7c9ed98-91ac-4c05-a8a8-bac0038bfc92" data-file-name="app/page.tsx">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-destructive bg-opacity-10 mb-4" data-unique-id="32543fb8-ef7f-41d2-a46a-2527e382b156" data-file-name="app/page.tsx">
                  <Collection className="h-6 w-6 text-destructive" />
                </div>
                <h3 className="text-xl font-semibold mb-3" data-unique-id="0ef1e1e8-2d50-47a5-b9ae-333aee5f46a6" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="46c0e3f0-18fe-446c-a3af-27a1c5f3222c" data-file-name="app/page.tsx">Smart Collections</span></h3>
                <p className="text-muted-foreground mb-4" data-unique-id="539c9ed3-b250-49d9-9f11-495d6b12f078" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="324e1b3b-79eb-421a-96c9-8e77187a503e" data-file-name="app/page.tsx">
                  Organize your content with automated collections that group similar items together and surface the best content.
                </span></p>
                <div className="pt-4 border-t border-border mt-auto" data-unique-id="11f9cbf2-c184-4cfb-a51c-13fbf983a707" data-file-name="app/page.tsx">
                  <Link href="#" className="inline-flex items-center text-primary hover:underline" data-unique-id="3859223e-f027-404c-80e0-112676cf92bd" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="56ed002b-229e-4362-ad48-12074d3cf748" data-file-name="app/page.tsx">
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
        <section id="pricing" className="skoop-section bg-secondary bg-opacity-30" data-unique-id="4fa682d6-ab2e-4f3c-a760-7a788d62e132" data-file-name="app/page.tsx">
          <div className="skoop-container" data-unique-id="8956f4f8-b012-4a05-b25c-903470db003e" data-file-name="app/page.tsx">
            <div className="text-center mb-16" data-unique-id="315add5e-7804-4d09-90ba-bef3e6051e32" data-file-name="app/page.tsx">
              <h2 className="section-title-sm mb-4" data-unique-id="e941341a-0bc4-4470-8fa1-a37244f3f02a" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="3c3dc47f-030f-4f39-84a5-ec4000e31fc9" data-file-name="app/page.tsx">Simple, transparent pricing</span></h2>
              <p className="text-muted-foreground max-w-2xl mx-auto" data-unique-id="3319475c-74aa-4915-953d-48130a979fda" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="e20dc65b-fef5-4b77-9565-b91166bf5de8" data-file-name="app/page.tsx">
                Choose the plan that fits your needs. All plans include our core features.
              </span></p>
            </div>

            <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto" data-unique-id="8a1ceec1-5434-40e2-bbeb-250a8ea04c0d" data-file-name="app/page.tsx" data-dynamic-text="true">
              {/* Free Plan */}
              <div className="skoop-card p-6 flex flex-col h-full border border-border" data-unique-id="e190f6e6-eee3-44d3-8ab4-3bffcc1f0614" data-file-name="app/page.tsx">
                <div className="mb-6" data-unique-id="485a7d32-2797-418a-9976-d6ebd94b3612" data-file-name="app/page.tsx">
                  <h3 className="text-lg font-medium mb-2" data-unique-id="197fef37-7111-4d10-8be0-66fa060d17a4" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="dfeb9dbf-71ac-4738-bf8b-965d3aab1008" data-file-name="app/page.tsx">Free</span></h3>
                  <div className="text-3xl font-bold" data-unique-id="2657e610-4eb5-49d6-9956-252783cb559c" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="93ea0a95-15b0-40c0-8937-2fcffde172eb" data-file-name="app/page.tsx">$0</span><span className="text-muted-foreground text-sm font-normal" data-unique-id="ab72214d-8408-4232-ab00-65c9f906b9aa" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="90718992-c52d-4799-9e05-72b3eb38608c" data-file-name="app/page.tsx">/month</span></span></div>
                  <p className="text-muted-foreground text-sm mt-3" data-unique-id="93d72675-423c-47c0-b634-0697e7eb8c3c" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="e87c33b2-b923-4099-8717-e5566fce24f1" data-file-name="app/page.tsx">Perfect for getting started</span></p>
                </div>
                <ul className="space-y-3 mb-8" data-unique-id="801392d6-8a4f-43bd-a04a-725aa7ed583a" data-file-name="app/page.tsx">
                  <li className="flex items-start" data-unique-id="d324cf8a-7335-4e88-b700-e143f669c150" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="a929a3ee-c6c5-4a06-9fa0-8b454e0c7308" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="f0338cfb-aba8-4ae7-a874-6e44fb14a37a" data-file-name="app/page.tsx">72h free bookmark storage</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="8f2a0fd0-b4ee-4993-bbe6-dbf906b62ed7" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="b2042d7b-4a2f-40ec-9afb-4a8efd7fa29b" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="de89d81b-eea0-4cf2-b178-7aed99da8a6e" data-file-name="app/page.tsx">2 connected platforms</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="9bd7ab89-2415-45fa-9843-0e27815e60d1" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="ddb0c0eb-e3c3-44cb-b413-5065c7a31c29" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="d35d642a-51cd-4279-8bf0-0034a9c5475d" data-file-name="app/page.tsx">Basic search</span></span>
                  </li>
                </ul>
                <div className="mt-auto" data-unique-id="4ae7a2e7-7a94-4f26-94a3-f3e0b07e89b9" data-file-name="app/page.tsx">
                  <Button className="w-full skoop-button-primary" data-unique-id="14a240c6-3ae6-449c-ab58-1dd86ee0f270" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="27716892-faf8-4022-b219-589bdc3d80df" data-file-name="app/page.tsx">Get Started</span></Button>
                </div>
              </div>

              {/* Pro Plan */}
              <div className="skoop-card p-6 flex flex-col h-full border-2 border-primary relative" data-unique-id="5dcdcf62-0b38-4be2-b08f-de31569327ce" data-file-name="app/page.tsx">
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-sm font-medium rounded-bl-lg rounded-tr-[calc(var(--radius)-1px)]" data-unique-id="6e1b5174-6161-4a58-9455-816ceca402a9" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="e73f148d-374b-49fb-8466-0269e9928a54" data-file-name="app/page.tsx">
                  Popular
                </span></div>
                <div className="mb-6" data-unique-id="b5af1878-6dc9-4cbc-9ee9-134665649827" data-file-name="app/page.tsx">
                  <h3 className="text-lg font-medium mb-2" data-unique-id="da2afebb-af13-4a91-9bf9-e50512b0a875" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="6e6a28d7-b7f9-48bf-9353-06fe2335fc7f" data-file-name="app/page.tsx">Pro</span></h3>
                  <div className="text-3xl font-bold" data-unique-id="00b62d84-4cb2-48f1-8778-72e70d20a8df" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="fb1c69e8-693b-44fc-8e8b-136e88a39912" data-file-name="app/page.tsx">$12</span><span className="text-muted-foreground text-sm font-normal" data-unique-id="473ce353-a839-4470-8001-1afa9bcdf9ed" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="361868da-3a8d-4eb4-acb3-83899c14a65e" data-file-name="app/page.tsx">/month</span></span></div>
                  <p className="text-muted-foreground text-sm mt-3" data-unique-id="8bcae7f8-7da9-48f6-85e0-79d2aafb4e5a" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="f97ea48f-aed1-4f06-a1c1-d5116c4fc5ae" data-file-name="app/page.tsx">For power users</span></p>
                </div>
                <ul className="space-y-3 mb-8" data-unique-id="8bd1d79f-26e5-4e52-98e4-d35cdfb367eb" data-file-name="app/page.tsx">
                  <li className="flex items-start" data-unique-id="e1147fd9-f96f-48ca-9d7b-7bfa71bd71af" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="f7f8a8d1-9824-4e76-8b5d-539a721c846f" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="eeed502e-0350-40b0-b12b-435a23ff7cf4" data-file-name="app/page.tsx">Unlimited saved items</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="f16c960d-f12c-4c1a-abdc-0461e41a8f57" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="0483e6e5-2715-4f32-ab6c-be70dddebebb" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="005a96ca-674a-4f98-8f86-2b84d5c00e58" data-file-name="app/page.tsx">All platforms</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="de7e3e43-f38d-4782-b90c-e6df730c0550" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="5553ce85-67e5-4d64-a8be-d97cf81fd270" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="49ec5aad-b017-4954-9692-69138b4e5b98" data-file-name="app/page.tsx">Advanced semantic search</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="47d16f5a-3b58-43a7-b0db-7320ec2112c7" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="4d361f5d-2ee6-46f0-92e2-496c5ff2e465" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="a2253a56-1459-4329-9750-883c22f92ac4" data-file-name="app/page.tsx">AI summary</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="5c8f4098-17b1-4882-a8be-89da193f2386" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="9d02db95-321d-4ee2-8408-bfa2112ba52e" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="909accd4-ca24-4ccd-8386-8be603892b30" data-file-name="app/page.tsx">Smart collections</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="a0b08cb4-5255-4def-bbdc-58686a85d793" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="fa62455c-83b7-449b-8de7-e434b70a1be3" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="c17e7a18-9834-4a99-a219-eb1083f08522" data-file-name="app/page.tsx">15-minute sync</span></span>
                  </li>
                </ul>
                <div className="mt-auto" data-unique-id="ffa28ea2-919c-423b-84bf-d481f495c679" data-file-name="app/page.tsx">
                  <Button className="w-full skoop-button-accent" data-unique-id="4e3df265-c61c-4b0f-b9f3-3116e060c5ab" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="6605a50e-603b-4559-b00e-8563d3fddc60" data-file-name="app/page.tsx">Choose Pro</span></Button>
                </div>
              </div>

              {/* Power Plan (formerly Team) */}
              <div className="skoop-card p-6 flex flex-col h-full border border-border" data-unique-id="c61e808a-f017-421e-8bb5-bfc53c4bba6a" data-file-name="app/page.tsx">
                <div className="mb-6" data-unique-id="440db5f8-7d62-46cb-8c78-46ef8d634a49" data-file-name="app/page.tsx">
                  <h3 className="text-lg font-medium mb-2" data-unique-id="1724104f-7ac9-43d2-a791-d9de928b840d" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="f60194de-bd74-4a0a-8327-98e04ebb09c6" data-file-name="app/page.tsx">Power</span></h3>
                  <div className="text-3xl font-bold" data-unique-id="8a6061c0-8899-4811-b74c-e7e09063acf2" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="efec1609-977d-4b47-a27b-054e1f7194c8" data-file-name="app/page.tsx">$19</span><span className="text-muted-foreground text-sm font-normal" data-unique-id="cbf260ec-098d-465c-9aea-e060213ef1f2" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="bb50f5ff-66cb-40f5-bd23-8bd8a7a6d050" data-file-name="app/page.tsx">/month</span></span></div>
                  <p className="text-muted-foreground text-sm mt-3" data-unique-id="a1928058-0412-4504-acbc-b8d44c6b3cea" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="61f07250-a506-4edf-9b16-3ae49e43b142" data-file-name="app/page.tsx">Collaborate with your team</span></p>
                </div>
                <ul className="space-y-3 mb-8" data-unique-id="29f19550-2c32-438c-bd50-260a6645b037" data-file-name="app/page.tsx">
                  <li className="flex items-start" data-unique-id="9f4a7b45-3d35-401f-a35f-404195a7f57a" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="9cef6ebd-8784-4d1c-aea3-e914bb12fb04" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="8a26ce2e-f764-4b49-9bab-58a92dfcd9fb" data-file-name="app/page.tsx">Everything in Pro</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="1056ebb8-85c2-4db5-849e-a4952e52c7d9" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="e57c0d71-a4de-4781-8cea-d846624a0b1e" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="f7466514-7ffc-455a-9bec-e3abc522fef2" data-file-name="app/page.tsx">5 team members</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="f0fd50a8-8d97-4bba-b908-e5ec101a9545" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="896298fc-8fa2-4d8f-9970-70a55d8c2cba" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="8462c62a-c840-475c-a1cb-23851a771890" data-file-name="app/page.tsx">Shared collections</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="0fe2f721-3683-4aa6-861a-b7d4d3060fa0" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="4bf00aec-4447-4f00-9c9c-eb9a5e82d5e3" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="1e167d83-d276-451c-8e53-6f56528b01fc" data-file-name="app/page.tsx">Skoop Content columns</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="6c5a9bdb-5b58-4def-8b73-6f41d99ed2bb" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="a1ebbe9b-a2ad-41fc-a0f1-a3237b9b74bb" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="c032d019-ee42-4548-84ab-71d08b364efd" data-file-name="app/page.tsx">Collaboration tools</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="3e501595-8579-4307-84de-05ca52c5607d" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="5f868a95-270a-4d94-baeb-5bd6d114efcb" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="aeddbf00-0aa4-44fa-8486-fb436bcdc279" data-file-name="app/page.tsx">Advanced analytics</span></span>
                  </li>
                </ul>
                <div className="mt-auto" data-unique-id="e8325149-23f1-4005-b12b-18044e6c93a4" data-file-name="app/page.tsx">
                  <Button className="w-full skoop-button-primary" data-unique-id="aa6e6f55-84eb-4242-9a73-0718d14e2ddf" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="38081da4-b242-4dcf-bd18-ee4f5680e828" data-file-name="app/page.tsx">Choose Power</span></Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="skoop-section" data-unique-id="13540a3b-f63d-454d-a5c7-d802a2d9a597" data-file-name="app/page.tsx">
          <div className="skoop-container max-w-4xl" data-unique-id="36b1403b-243f-4d85-b6ae-8efdb218e637" data-file-name="app/page.tsx">
            <div className="skoop-card p-8 md:p-12 text-center" data-unique-id="178daa18-e71c-47aa-87b3-75052d77a9e2" data-file-name="app/page.tsx">
              <h2 className="text-2xl md:text-3xl font-bold mb-4" data-unique-id="e5140901-babe-4950-b453-b05841a79967" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="5ee1017b-aa2b-41b5-9b9d-cba99b97ea8d" data-file-name="app/page.tsx">Ready to organize your digital knowledge?</span></h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto" data-unique-id="7e2f8441-8ce9-48b3-98e9-07dbb9179e99" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="4cd449b1-1f53-489b-9f67-3c4d57438cf6" data-file-name="app/page.tsx">
                Join thousands of developers, designers, and researchers who are using SKOOP to make the most of their saved content.
              </span></p>
              <div className="flex flex-col sm:flex-row justify-center gap-4" data-unique-id="b5d3efae-bb4d-4e1e-9f6a-6ca176a4b035" data-file-name="app/page.tsx">
                <Button className="skoop-button-accent" size="lg" data-unique-id="6fd55613-2555-4516-9e41-0866fa7ff420" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="6baa32e3-2ddb-40b3-83b0-76fbe7185bfe" data-file-name="app/page.tsx">Get Started for Free</span></Button>
                <Button variant="outline" size="lg" data-unique-id="586a9d90-3bc4-4415-b2d9-becbb0fdcc4a" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="df53d00d-cfbe-4899-81c5-bb9021a7f9e8" data-file-name="app/page.tsx">
                  Request Demo
                </span></Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-secondary bg-opacity-30 border-t border-border py-12" data-unique-id="c9be0043-6425-4edd-a4df-8b1300b249b9" data-file-name="app/page.tsx">
        <div className="skoop-container" data-unique-id="9adb949f-5338-4e1b-b4fd-0a38b54d2d8e" data-file-name="app/page.tsx">
          <div className="grid gap-8 md:grid-cols-4" data-unique-id="17d0eec3-f4e3-4c0b-8383-6de57af0bb4f" data-file-name="app/page.tsx">
            <div data-unique-id="e203aa72-87e1-4dff-bd57-a7a6f17701a0" data-file-name="app/page.tsx">
              <div className="text-2xl font-bold text-primary mb-4" data-unique-id="9a82a68e-cfd4-4761-a676-289ea36e8a20" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="902f40a8-175c-4aba-8569-ff8507ca641e" data-file-name="app/page.tsx">SKOOP</span></div>
              <p className="text-muted-foreground text-sm" data-unique-id="7a4ead30-9d15-42a2-b7c2-14a4c66c99b0" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="fb0da947-85de-46b1-aa15-702bc59e07a5" data-file-name="app/page.tsx">
                The all-in-one platform for collecting, searching and rediscovering your saved content.
              </span></p>
            </div>

            <div data-unique-id="2bd33429-c1a5-4ecb-a8b7-516bba6ff799" data-file-name="app/page.tsx">
              <h4 className="font-medium mb-4" data-unique-id="fc669831-f3e7-4e71-b4a6-d2915324c709" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="7973da0b-61c2-4ddf-ac2a-574d79ff07d8" data-file-name="app/page.tsx">Product</span></h4>
              <ul className="space-y-2 text-sm text-muted-foreground" data-unique-id="1edef9a1-e328-44cb-8bee-17f57dd569f2" data-file-name="app/page.tsx">
                <li data-unique-id="ee94e813-e187-4a34-9977-6cde907cc2bf" data-file-name="app/page.tsx"><Link href="#features" className="hover:text-primary transition-colors" data-unique-id="b2cc94a6-cc42-4b51-84cf-471720b2d8af" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="56499cc5-290d-434b-afed-e624e6d34137" data-file-name="app/page.tsx">Features</span></Link></li>
                <li data-unique-id="603b1763-6e78-4218-8ca6-d36c5b82f1d5" data-file-name="app/page.tsx"><Link href="#pricing" className="hover:text-primary transition-colors" data-unique-id="9f1e274e-35aa-41bc-af15-b39e1846d3a0" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="0b0b2066-8e78-4a13-8d9c-204cb747500c" data-file-name="app/page.tsx">Pricing</span></Link></li>
                <li data-unique-id="a575ead9-609d-4e7d-b96c-6730bbd84eac" data-file-name="app/page.tsx"><Link href="/dashboard" className="hover:text-primary transition-colors" data-unique-id="13a8ae91-9fd7-4b7c-9d10-fc5ab20ee706" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="e3b5feee-16bd-41b7-b8b0-8119850a8533" data-file-name="app/page.tsx">Dashboard</span></Link></li>
                <li data-unique-id="e7da45c3-82f8-4949-8541-891f4366d774" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="3aec8774-56b6-4da9-b385-03f8ee75afdf" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="c9665b48-f779-40df-9e69-34c1920a04f7" data-file-name="app/page.tsx">Integrations</span></Link></li>
                <li data-unique-id="d654af9d-dea0-498b-9b2c-93614e7c06c6" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="6fb1beb3-73d7-4f8f-b372-54a3afd9200b" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="1094bd16-2ed8-482e-96f3-76992c963351" data-file-name="app/page.tsx">Changelog</span></Link></li>
              </ul>
            </div>

            <div data-unique-id="cc19c0d1-1859-49db-bda5-4a5585e0ba4d" data-file-name="app/page.tsx">
              <h4 className="font-medium mb-4" data-unique-id="4a6f7845-08a1-4ae7-a6bc-d93606858134" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="4682dfab-9d8a-4b0c-b825-64161af86eb2" data-file-name="app/page.tsx">Resources</span></h4>
              <ul className="space-y-2 text-sm text-muted-foreground" data-unique-id="449a5916-8c4d-466d-9ad4-f431677031b7" data-file-name="app/page.tsx">
                <li data-unique-id="9fdd00fb-5c9d-4727-ade4-793eb84792dc" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="ffebcc0d-683a-462e-9913-3b3da67945a9" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="eb55d0e6-1900-4b0a-96f3-4d6b9de1a28b" data-file-name="app/page.tsx">Documentation</span></Link></li>
                <li data-unique-id="e17c6a7a-ccac-4159-a13e-291b66ea81a0" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="b3dd2919-5c06-41ba-ab1f-f9eecb836b2f" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="6a3b0f33-d5bd-4b81-bf7c-5999ed64ba6f" data-file-name="app/page.tsx">API</span></Link></li>
                <li data-unique-id="f54b8519-977a-4874-972b-1e18d4a044da" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="933c4769-ed68-4086-a86a-7236dc1e57e5" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="9f29ed66-6179-46d2-ab86-c292cdc37360" data-file-name="app/page.tsx">Guides</span></Link></li>
                <li data-unique-id="81bc97a3-d19d-4534-80ce-56bf5fba49aa" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="01460109-af89-4021-850f-0bc4a599bed6" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="519c7a1e-9aeb-4a61-a888-f1fd5ee406de" data-file-name="app/page.tsx">Help Center</span></Link></li>
              </ul>
            </div>

            <div data-unique-id="1fb37ecf-e543-463f-9b10-b733693e61b9" data-file-name="app/page.tsx">
              <h4 className="font-medium mb-4" data-unique-id="43f096d4-cb58-43af-8932-16ed6b9fea5a" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="24d8c890-b1dd-42b4-ba52-a62a2106fcce" data-file-name="app/page.tsx">Company</span></h4>
              <ul className="space-y-2 text-sm text-muted-foreground" data-unique-id="d2bc5b83-bd06-4602-abb1-8a7e22900cfd" data-file-name="app/page.tsx">
                <li data-unique-id="f9524a3c-e2f5-4217-80f6-e4db787a31d1" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="9d22a7c7-270b-4ffa-8a1b-50230a1454d3" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="8af3e2f9-3562-4dc1-8f06-804d6317a8fb" data-file-name="app/page.tsx">About</span></Link></li>
                <li data-unique-id="6bdd65ca-c26b-4786-ad9e-ca0f371feed2" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="0c947cc1-9db3-4de2-b947-afbedb6e4158" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="14eb9bac-c8ff-4d7f-a859-72fa4dbdc487" data-file-name="app/page.tsx">Blog</span></Link></li>
                <li data-unique-id="c6f63fca-6671-43c9-891a-94076c488bb7" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="7e4ecfe3-b6d1-4126-a8ca-39a4a58b8aab" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="58e7e3c0-b9ed-4396-a88d-03b711eeebf7" data-file-name="app/page.tsx">Careers</span></Link></li>
                <li data-unique-id="be8197d1-0609-4809-9721-bd75a8afb472" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="57cad0f7-bab7-4ad8-b870-430205b6704d" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="1bac50c8-34f3-45b4-bc75-90a9e3fbc0f0" data-file-name="app/page.tsx">Contact</span></Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center" data-unique-id="1c12084e-450e-4fc1-832c-cdae7a94c8aa" data-file-name="app/page.tsx">
            <div className="flex items-center" data-unique-id="7d949255-a5a4-4351-970e-f3e202898ad8" data-file-name="app/page.tsx">
              <div className="text-xl logo font-bold text-primary mr-2" data-unique-id="50a98c3c-6f66-47df-9cfc-d6de7beaf4b1" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="fd5052f2-1f94-4ea9-9b1d-b2a29e45dc64" data-file-name="app/page.tsx">SKOOP</span></div>
              <div className="text-sm text-muted-foreground" data-unique-id="adf6d9b9-ac8c-4b83-85b7-25877440def4" data-file-name="app/page.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="4b7cc7fa-d9f2-40d6-a4c3-ba76b52ecaf0" data-file-name="app/page.tsx">
                © </span>{new Date().getFullYear()}<span className="editable-text" data-unique-id="f1352c0b-f161-44e8-a960-e4ee3052b07f" data-file-name="app/page.tsx"> All rights reserved.
              </span></div>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0" data-unique-id="3720f2d3-70cd-4f36-b4f0-bcc1d51fa286" data-file-name="app/page.tsx">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors" data-unique-id="14b7a1a1-c453-4f7d-9a19-c37c76eb0160" data-file-name="app/page.tsx">
                <span className="sr-only" data-unique-id="4cf57b73-5cee-4f16-9eef-9b930139d338" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="853a66f3-aa04-4a0c-ab8e-aed7647ae03e" data-file-name="app/page.tsx">X</span></span>
                <X className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors" data-unique-id="777b84a9-d841-4784-903c-96ebafcc03cb" data-file-name="app/page.tsx">
                <span className="sr-only" data-unique-id="2ec140c4-27a3-4f19-bfb9-ee429b918bf5" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="4b255f51-0900-4083-a94a-c94520179180" data-file-name="app/page.tsx">GitHub</span></span>
                <Github className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>;
}