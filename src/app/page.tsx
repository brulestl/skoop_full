import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { AuroraBackground } from "@/components/ui/aurora-background";
import Link from "next/link";
import Image from "next/image";
import { MobileMenu } from "@/components/mobile-menu";
import { Search, Github, Twitter, Code as StackOverflow, Bookmark, FolderPlus as Collection, CheckCircle2, ChevronRight, ArrowRight } from "lucide-react";
import { SummariesDemo } from "@/components/landing/summaries-demo";
import dynamic from 'next/dynamic';

// Dynamically import the ExpandableCard component with client-side only rendering
const ExpandableCard = dynamic(() => import('@/components/landing/expandable-card'), {
  ssr: true,
  loading: () => <div className="w-full max-w-[640px] mx-auto h-[100px] bg-white dark:bg-card rounded-xl border border-[#E5E7EB] dark:border-border animate-pulse" data-unique-id="37099c77-6f50-4b64-a140-fdd55c3644fc" data-file-name="app/page.tsx"></div>
});
export default function HomePage() {
  return <div className="min-h-screen flex flex-col" data-unique-id="d3ed6896-f726-41f2-b2ee-e8fd9d351e2a" data-file-name="app/page.tsx" data-dynamic-text="true">
      {/* Header */}
      <header className="border-b border-border relative z-10" data-unique-id="f4c79f51-79c5-40b7-aa6f-5dfde15a02c5" data-file-name="app/page.tsx">
        <div className="skoop-container flex items-center justify-between h-16" data-unique-id="31eb08f9-6869-43e1-8151-eaf4619040dc" data-file-name="app/page.tsx">
          <div className="flex items-center" data-unique-id="25fc8581-d052-479d-b4d7-b62a42f802a1" data-file-name="app/page.tsx">
            <div className="text-2xl logo font-bold text-primary" data-unique-id="5e66d17c-9aeb-40e5-bfc2-ddbc382cd6a1" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="03324fc4-d24b-4abb-bb7d-d9be5baf68ab" data-file-name="app/page.tsx">SKOOP</span></div>
            <nav className="hidden ml-12 space-x-6 md:flex" data-unique-id="cf61caef-3b33-492c-b398-e6a1634c9b07" data-file-name="app/page.tsx">
              <Link href="#features" className="text-foreground hover:text-primary transition-colors" data-unique-id="e3e9057a-9c84-4094-a4fd-890f64d7dedd" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="3a2916b1-2b12-4adf-841f-205e84b949eb" data-file-name="app/page.tsx">Features</span></Link>
              <Link href="#pricing" className="text-foreground hover:text-primary transition-colors" data-unique-id="3cb0ba56-7971-46ba-8e60-7de7308f4995" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="7377d13a-13ec-43a6-832d-8d4c37bd8dad" data-file-name="app/page.tsx">Pricing</span></Link>
              <Link href="#faq" className="text-foreground hover:text-primary transition-colors" data-unique-id="40235741-5a01-4974-a389-d5b5defe6610" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="aef463d0-39e6-4f22-8582-f0a8be777293" data-file-name="app/page.tsx">FAQ</span></Link>
            </nav>
          </div>
          <div className="flex items-center" data-unique-id="dc220ef0-ab1d-44a8-a857-415e6282a9a9" data-file-name="app/page.tsx">
            <ThemeToggle />
            <div className="hidden md:flex items-center space-x-4 ml-4" data-unique-id="97f9d1eb-70e8-4f32-8e1a-806521359bf4" data-file-name="app/page.tsx">
              <a href="/dashboard" className="text-foreground hover:text-primary transition-colors" data-unique-id="28e918b2-b807-46a0-91df-cd43d1f7e8df" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="50d040bd-de00-4012-b564-0318a34a554d" data-file-name="app/page.tsx">Dashboard</span></a>
              <a href="/login" className="text-foreground hover:text-primary transition-colors" data-unique-id="68cce99c-9fc0-4b0f-ab9a-95a971d66bbb" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="adf96209-3311-4ce4-8a5b-71735b439061" data-file-name="app/page.tsx">Log in</span></a>
              <Button className="skoop-button-accent" data-unique-id="1be87659-9cf5-45f9-a635-4860ed91f6d9" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="a83352cd-8b7c-4b00-a2fc-c3629f0d2af1" data-file-name="app/page.tsx">Sign Up Free</span></Button>
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

      <main className="flex-grow" data-unique-id="aa1cd015-a0d3-4a0f-87b8-eb63bd1d7d36" data-file-name="app/page.tsx" data-dynamic-text="true">
        {/* Hero Section with Aurora Background */}
        <section className="relative overflow-hidden" data-unique-id="cca1dd5f-a1dd-438e-a249-c4a7524d2031" data-file-name="app/page.tsx">
          <AuroraBackground className="absolute inset-0">
            <div className="absolute inset-0 bg-background/40 backdrop-blur-sm" data-unique-id="a136d704-e2cb-4601-8034-0982eb2d3c91" data-file-name="app/page.tsx" />
          </AuroraBackground>
          
          <div className="skoop-section relative z-10" data-unique-id="b0b00434-73d8-4fe0-aced-19ca03fa7817" data-file-name="app/page.tsx">
          <div className="skoop-container" data-unique-id="0db2566d-c4a3-44db-8ba3-7003b25d76c7" data-file-name="app/page.tsx" data-dynamic-text="true">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-24 items-center" data-unique-id="3af56032-ac25-4d45-80a7-449ced35b939" data-file-name="app/page.tsx">
              <div data-unique-id="80b5dfc8-9907-4e8b-a669-6e083137a66b" data-file-name="app/page.tsx">
                <h1 className="text-3xl font-bold leading-tight md:text-5xl lg:text-6xl mb-6 max-w-full break-words" data-unique-id="7f3ca849-fa32-47a4-ae3e-0e8d06e9c198" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="34d9f7f8-b922-4d0a-8568-f782cda5ab1d" data-file-name="app/page.tsx">
                  Collect, search and </span><span className="text-primary" data-unique-id="741eceed-94bf-4275-ac7a-10369dca943d" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="83e0045a-443c-450b-901d-3d8522f5cd52" data-file-name="app/page.tsx">rediscover</span></span><span className="editable-text" data-unique-id="63238518-c92f-412f-b69d-c5990e54e323" data-file-name="app/page.tsx"> your saved content
                </span></h1>
                <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-full" data-unique-id="69847e89-a9b0-4430-9f5b-993f60a53fc5" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="d31e4196-0214-42c3-ae50-269c87cc51b2" data-file-name="app/page.tsx">
                  One calm space for all your saved tweets, GitHub stars, Reddit posts, and Stack Overflow favorites.
                </span></p>
                <div className="flex flex-col sm:flex-row gap-3 w-full max-w-full" data-unique-id="f8e7d2d8-4457-4228-8a01-5f7827c84c75" data-file-name="app/page.tsx">
                  <Button className="skoop-button-accent" size="lg" data-unique-id="63b17b0b-34f7-430b-bea8-b4db3eb95efa" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="c36716a4-a773-4bbc-a44e-9d311a54955f" data-file-name="app/page.tsx">Get Started</span></Button>
                  <Button variant="outline" size="lg" className="group" data-unique-id="ba6bf873-7b4d-4911-a623-ed43a7b777d9" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="d2241066-8a0c-4d0c-8c62-4421a342b139" data-file-name="app/page.tsx">
                    How It Works
                    </span><ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
                <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground" data-unique-id="298d8467-07b7-46b1-aa8b-a4fd45dc76ea" data-file-name="app/page.tsx">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span data-unique-id="9c2dcda6-9462-4b84-8978-b697c4d384a3" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="f72bf2f5-7e68-4f53-b91d-0a83876a8235" data-file-name="app/page.tsx">No credit card required</span></span>
                </div>
              </div>
              <div className="relative" data-unique-id="6a6ba681-8a24-451e-8439-f9a480d1c697" data-file-name="app/page.tsx" data-dynamic-text="true">
                <div className="skoop-card overflow-hidden" data-unique-id="7231daa2-0f3b-4bf6-96fb-93f9e24d0889" data-file-name="app/page.tsx">
                  <Image src="https://images.unsplash.com/photo-1508921340878-ba53e1f016ec?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3" alt="SKOOP Dashboard" width={600} height={400} className="w-full h-auto rounded-t-[var(--radius)]" data-unique-id="f699551a-9e93-4618-86fd-61c370fa02e2" data-file-name="app/page.tsx" />
                  <div className="p-6" data-unique-id="ce3bdb4f-c775-4ae6-882d-dfedda35a381" data-file-name="app/page.tsx">
                    <div className="flex items-center justify-between mb-4" data-unique-id="0aa233c8-5094-474c-97de-81be45280759" data-file-name="app/page.tsx">
                      <div className="font-semibold" data-unique-id="ea33d413-2d0e-4b88-8b95-fcdfb10584d9" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="d46a5445-6eff-4eb8-8808-1647263ab53b" data-file-name="app/page.tsx">Recent Saves</span></div>
                      <Search className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="space-y-3" data-unique-id="4d236935-707b-4176-a32b-b60184d2794b" data-file-name="app/page.tsx" data-dynamic-text="true">
                      {[1, 2, 3].map(i => <div key={i} className="flex items-center gap-3 p-3 rounded-md bg-secondary/50" data-unique-id="076f1bcc-cbb0-496b-9053-472f03b7b620" data-file-name="app/page.tsx" data-dynamic-text="true">
                          {i === 1 && <Github className="h-5 w-5 text-foreground" />}
                          {i === 2 && <Twitter className="h-5 w-5 text-foreground" />}
                          {i === 3 && <StackOverflow className="h-5 w-5 text-foreground" />}
                          <div className="flex-grow" data-unique-id="f3f21cdb-0e84-4344-b7d1-cb93bea01a5c" data-file-name="app/page.tsx">
                            <div className="text-sm font-medium truncate" data-unique-id="92427bcf-fbc6-4121-b739-2b8fe98bffec" data-file-name="app/page.tsx" data-dynamic-text="true">
                              {i === 1 && "Interesting open source project for data visualization"}
                              {i === 2 && "Thread: 10 tips for better React performance"}
                              {i === 3 && "How to optimize PostgreSQL queries for large datasets"}
                            </div>
                            <div className="text-xs text-muted-foreground mt-0.5" data-unique-id="f7f6cb0e-465e-472d-bdf6-ff0afad2cdef" data-file-name="app/page.tsx" data-dynamic-text="true">
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
                <div className="absolute -left-8 top-1/2 bg-card p-3 rounded-full shadow-lg border border-border hidden lg:block" data-unique-id="9b411561-b113-47f3-9611-43066d702862" data-file-name="app/page.tsx">
                  <Github className="h-6 w-6 text-primary" />
                </div>
                <div className="absolute -right-8 bottom-1/3 bg-card p-3 rounded-full shadow-lg border border-border hidden lg:block" data-unique-id="5571584c-4294-44f0-bf86-b7552cb5a608" data-file-name="app/page.tsx">
                  <Twitter className="h-6 w-6 text-accent" />
                </div>
              </div>
            </div>

            {/* Logos */}
            <div className="mt-20" data-unique-id="c6695d62-185a-4d38-a224-9aa6b6bba2bd" data-file-name="app/page.tsx">
              <p className="text-center text-sm text-muted-foreground mb-6" data-unique-id="c2592cc3-e525-4a2e-96e6-feb4da06aadd" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="811a9901-85df-46a9-bc9e-a0e9ac852d06" data-file-name="app/page.tsx">
                Connect with your favorite platforms
              </span></p>
              <div className="flex justify-center items-center flex-wrap gap-8 md:gap-12" data-unique-id="97311be7-984c-4ee2-bc51-1bac7afbc47f" data-file-name="app/page.tsx">
                <Github className="h-8 w-8 text-muted-foreground" />
                <Twitter className="h-8 w-8 text-muted-foreground" />
                <StackOverflow className="h-8 w-8 text-muted-foreground" />
                <div className="text-muted-foreground text-xl font-semibold" data-unique-id="4d79fa86-15e1-40eb-b780-600a4c0f7327" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="e56045fe-2fd9-46c4-9fa7-8c1aaebea77e" data-file-name="app/page.tsx">Reddit</span></div>
                <div className="text-muted-foreground text-xl font-semibold" data-unique-id="a61e9781-d106-4001-b0fa-3b51fc256bf0" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="6442ba80-ec16-4af7-ae99-b900c8653fd4" data-file-name="app/page.tsx">DEV</span></div>
              </div>
            </div>
          </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="skoop-section" data-unique-id="c8bc70e6-75c1-4173-946c-540971c5a7ee" data-file-name="app/page.tsx">
          <div className="skoop-container" data-unique-id="04e1ead1-3d76-4187-90a0-0b5b79224d6d" data-file-name="app/page.tsx">
            <div className="text-center mb-16" data-unique-id="fd0429f2-7724-49c0-9693-3534218b342e" data-file-name="app/page.tsx">
              <h2 className="section-title-sm mb-4" data-unique-id="dfa6dade-bd12-4f49-b162-b0ae353ca9f3" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="cab12349-74cd-48d2-aedc-c424ba166e28" data-file-name="app/page.tsx">Finally, a place for all your saved content</span></h2>
              <p className="text-muted-foreground max-w-2xl mx-auto" data-unique-id="9773c626-a0f4-4890-a76e-7c0803f4aec6" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="a442937b-1022-48dd-8d46-3c23e8a21348" data-file-name="app/page.tsx">
                SKOOP solves the problem of fragmented saves and makes it easy to find what you need when you need it.
              </span></p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3" data-unique-id="26ef0a0a-fcfc-4081-ba38-b9e0686f6406" data-file-name="app/page.tsx" data-dynamic-text="true">
              {/* Feature 1 */}
              <div className="skoop-card p-6" data-unique-id="5a5c8cf6-9f6e-4b49-abf0-6969f69009b4" data-file-name="app/page.tsx">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary bg-opacity-10 mb-4" data-unique-id="bc08ad70-f335-47cf-a5db-926d2738508b" data-file-name="app/page.tsx">
                  <Bookmark className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3" data-unique-id="cb364b93-0914-4aaf-bc27-147e2e06b6d8" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="9e1201e6-0f54-400f-8245-ad94074f99eb" data-file-name="app/page.tsx">Unified Collection</span></h3>
                <p className="text-muted-foreground mb-4" data-unique-id="202b0456-948a-47b0-9117-d72bf922e07c" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="81d76d9f-00ee-46d0-833d-5c1e3387e210" data-file-name="app/page.tsx">
                  Import and sync all your saved content from GitHub, Twitter, Reddit, and Stack Overflow in one place.
                </span></p>
                <div className="pt-4 border-t border-border mt-auto" data-unique-id="d8c35166-16e7-4534-a0de-ae978eaa9f41" data-file-name="app/page.tsx">
                  <Link href="#" className="inline-flex items-center text-primary hover:underline" data-unique-id="d4c95e6c-bb1d-4f5e-b2e5-da7f6cfd64a3" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="49ebc575-d6c9-45e6-b025-1e6976400abe" data-file-name="app/page.tsx">
                    Learn more </span><ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="skoop-card p-6" data-unique-id="bd8b93cb-1e88-4f34-aa70-5d02e49e970e" data-file-name="app/page.tsx">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-accent bg-opacity-10 mb-4" data-unique-id="131e5cbe-172d-4ddd-a592-3743c6cab44d" data-file-name="app/page.tsx">
                  <Search className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3" data-unique-id="1a8a8b34-1e2f-4b64-88f6-390615787592" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="2de24c2c-afe0-4164-a6c0-681bd6524e6b" data-file-name="app/page.tsx">Semantic Search</span></h3>
                <p className="text-muted-foreground mb-4" data-unique-id="169dc947-2a21-4820-9fea-d4fe5aaccaab" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="25ef93ce-a0a2-44bd-8308-ac01986eadd2" data-file-name="app/page.tsx">
                  Find what you're looking for with powerful semantic search that understands the meaning behind your queries.
                </span></p>
                <div className="pt-4 border-t border-border mt-auto" data-unique-id="d4db3b68-ccce-4295-8e27-b7ca36be47c6" data-file-name="app/page.tsx">
                  <Link href="#" className="inline-flex items-center text-primary hover:underline" data-unique-id="683b3ced-a6e7-461a-b2f4-da0d3a7a8395" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="40f5e9ee-5159-4164-a8bc-03043e2a0f99" data-file-name="app/page.tsx">
                    Learn more </span><ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="skoop-card p-6" data-unique-id="43c2cc1b-a178-46a4-8bab-1b103af4f46d" data-file-name="app/page.tsx">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-destructive bg-opacity-10 mb-4" data-unique-id="f8334fd5-7b40-421a-b426-b623a57f115c" data-file-name="app/page.tsx">
                  <Collection className="h-6 w-6 text-destructive" />
                </div>
                <h3 className="text-xl font-semibold mb-3" data-unique-id="c5bd0de9-321f-4f7a-88a7-0b79e1aed821" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="5830b4a0-fc99-495d-8641-465bb445770b" data-file-name="app/page.tsx">Smart Collections</span></h3>
                <p className="text-muted-foreground mb-4" data-unique-id="6fcf58a6-a35b-44a2-b1e6-7f5178974937" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="e528f518-5b77-4fa2-b371-8c843a378ed4" data-file-name="app/page.tsx">
                  Organize your content with automated collections that group similar items together and surface the best content.
                </span></p>
                <div className="pt-4 border-t border-border mt-auto" data-unique-id="c0dcb1b6-ea08-4e2f-b078-6057013affff" data-file-name="app/page.tsx">
                  <Link href="#" className="inline-flex items-center text-primary hover:underline" data-unique-id="b67f9438-6865-4761-9bef-1b0de77ef31d" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="e36bd147-b79f-4bcd-99bf-b7870e76ed39" data-file-name="app/page.tsx">
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
        <section id="pricing" className="skoop-section bg-secondary bg-opacity-30" data-unique-id="6f811a88-e849-4a8b-bdd2-3b4ff9eb8b1d" data-file-name="app/page.tsx">
          <div className="skoop-container" data-unique-id="d53e6610-c4b4-488b-afe5-436a660ab3a8" data-file-name="app/page.tsx">
            <div className="text-center mb-16" data-unique-id="0589aaf0-a6ac-44fe-984f-00e8f0f01d36" data-file-name="app/page.tsx">
              <h2 className="section-title-sm mb-4" data-unique-id="0c009e61-c791-4be6-88f3-fbd6cb50bd47" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="26543da7-b1dc-4a78-b987-ed2510ede71d" data-file-name="app/page.tsx">Simple, transparent pricing</span></h2>
              <p className="text-muted-foreground max-w-2xl mx-auto" data-unique-id="4eb9d97d-a762-43e6-a942-3b0886526726" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="30d67dfd-40a4-4fa2-8df5-78459762d0d3" data-file-name="app/page.tsx">
                Choose the plan that fits your needs. All plans include our core features.
              </span></p>
            </div>

            <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto" data-unique-id="27648b7f-ee0e-425d-94b9-f86eae40adb6" data-file-name="app/page.tsx" data-dynamic-text="true">
              {/* Free Plan */}
              <div className="skoop-card p-6 flex flex-col h-full border border-border" data-unique-id="1687d617-c778-45aa-9043-4d58c450fa53" data-file-name="app/page.tsx">
                <div className="mb-6" data-unique-id="c0f90ffd-b326-4ce6-876f-025578fce4f4" data-file-name="app/page.tsx">
                  <h3 className="text-lg font-medium mb-2" data-unique-id="2291871e-7c63-4e5e-98c7-3c5c392526d6" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="066f6ebf-e1f2-4b40-b15e-5ae644e9f537" data-file-name="app/page.tsx">Free</span></h3>
                  <div className="text-3xl font-bold" data-unique-id="698c84a9-adc3-462f-96a3-5ccc65f203dc" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="393f214f-ff37-4684-b9a2-13867782830a" data-file-name="app/page.tsx">$0</span><span className="text-muted-foreground text-sm font-normal" data-unique-id="771e8219-3038-4964-9f4b-734751c91aa6" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="49b6ff4c-c613-4565-9f55-ad07bb857cb7" data-file-name="app/page.tsx">/month</span></span></div>
                  <p className="text-muted-foreground text-sm mt-3" data-unique-id="c6f7bc84-6fbe-4b3c-9b81-e71ad512b136" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="f028bc6e-626a-463e-a81d-53b3cb20df5b" data-file-name="app/page.tsx">Perfect for getting started</span></p>
                </div>
                <ul className="space-y-3 mb-8" data-unique-id="87d773e4-c5c7-4c1d-99e1-207d7f682a31" data-file-name="app/page.tsx">
                  <li className="flex items-start" data-unique-id="77047aff-42fb-478a-9523-c28efe8abb5a" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="17f64fa0-6ea2-44cf-98cb-5e493c9fff49" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="9ce5708a-247b-4593-bab2-9e1c3be0a5f7" data-file-name="app/page.tsx">72h free bookmark storage</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="800e17b8-6144-458c-979b-33784bcc2b20" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="b24ac894-192f-4f18-a190-be94daa942c4" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="239308fe-b743-4a47-9958-44dc37b551ef" data-file-name="app/page.tsx">2 connected platforms</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="9bf16960-f362-43b0-bbac-701afe583c0b" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="20b9384f-73aa-4292-9a71-bf25a6d1fbcd" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="a99bee15-097d-4188-affb-fbafdb03a1e7" data-file-name="app/page.tsx">Basic search</span></span>
                  </li>
                </ul>
                <div className="mt-auto" data-unique-id="6b45629f-2e0e-4783-afb4-d4022099baa0" data-file-name="app/page.tsx">
                  <Button className="w-full skoop-button-primary" data-unique-id="660c2106-41db-422f-adfe-31bce5d55e2b" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="9579bf2f-954a-4966-a385-947461327cc8" data-file-name="app/page.tsx">Get Started</span></Button>
                </div>
              </div>

              {/* Pro Plan */}
              <div className="skoop-card p-6 flex flex-col h-full border-2 border-primary relative" data-unique-id="f64ea9d3-35ad-4aa3-a2b1-79bacaa27a42" data-file-name="app/page.tsx">
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-sm font-medium rounded-bl-lg rounded-tr-[calc(var(--radius)-1px)]" data-unique-id="c42c4b27-0559-4bd8-bf88-84677723e333" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="609be100-4ea3-4c29-bd20-591a8d0a9f36" data-file-name="app/page.tsx">
                  Popular
                </span></div>
                <div className="mb-6" data-unique-id="bc03a265-3741-4fc1-8702-249eb9e3aedf" data-file-name="app/page.tsx">
                  <h3 className="text-lg font-medium mb-2" data-unique-id="b5c856b4-82ea-401c-8b6f-90f29b97e0d0" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="537d5bc2-4051-429a-8b0f-891a12838a53" data-file-name="app/page.tsx">Pro</span></h3>
                  <div className="text-3xl font-bold" data-unique-id="1cd7bd0d-c164-4ef4-8308-8ebee8cb440f" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="ac00d6bf-faf2-4f92-84e9-d0480663f263" data-file-name="app/page.tsx">$12</span><span className="text-muted-foreground text-sm font-normal" data-unique-id="6b5db42f-5bbc-4c0e-8060-06b0ac0c0d38" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="67a007f5-8e75-46ad-9bdd-2cc2be8c8b85" data-file-name="app/page.tsx">/month</span></span></div>
                  <p className="text-muted-foreground text-sm mt-3" data-unique-id="85d44d5d-f8b8-4c04-b5c7-55f26896f0ba" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="96bd0f3b-5a4c-4330-87ae-f0062778e1c4" data-file-name="app/page.tsx">For power users</span></p>
                </div>
                <ul className="space-y-3 mb-8" data-unique-id="d2d97ae0-2f5d-4e94-a731-93cba84ae3c2" data-file-name="app/page.tsx">
                  <li className="flex items-start" data-unique-id="b8c569ad-0ec1-4488-89ad-75384b035bd1" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="bc3fe645-3cb6-4acd-9ef7-ba8b1dba75df" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="993f6e6d-9eab-47ea-b78d-62ebaf686acd" data-file-name="app/page.tsx">Unlimited saved items</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="5986f535-94d1-4901-82da-d152b6d77517" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="a0af3583-00ae-4b6f-bf63-16fe807a64a3" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="4a12f007-a5ac-47ae-a032-0ae2d41d9fc7" data-file-name="app/page.tsx">All platforms</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="bb16e09f-eae0-4491-bdc7-3b4486b002f0" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="03eba68d-aa86-4b69-ad4e-24c9ca30a3e2" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="8542027d-4c97-4ce4-b3c7-d98a24ff1fe1" data-file-name="app/page.tsx">Advanced semantic search</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="03afdbdd-4061-4152-9e68-9fe113bcc345" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="6b1976a6-4ea2-4e63-90b1-d36ebf9919d9" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="f25e97d2-2453-4782-94be-774595246965" data-file-name="app/page.tsx">AI summary</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="746d34a4-437e-44ec-aa71-26a262673683" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="6cb57323-0f5c-4e13-afad-954469a45861" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="ae1484e1-dcf9-494a-ba05-b0ba21c60f41" data-file-name="app/page.tsx">Smart collections</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="02f2cc1e-0515-41a3-9300-a173b5cbc68b" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="f1672a01-8f3a-4fa7-b739-c22f4b8720d7" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="eb2f2f7b-a6cd-4f95-9249-e10f8c12c2e4" data-file-name="app/page.tsx">15-minute sync</span></span>
                  </li>
                </ul>
                <div className="mt-auto" data-unique-id="84165a88-7ace-4ab7-b92d-9e38264a1b32" data-file-name="app/page.tsx">
                  <Button className="w-full skoop-button-accent" data-unique-id="ef7374a9-a3c6-4171-a0d9-c8764ee42abe" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="53fed6da-b1f1-4e92-b15b-0f2cdb761045" data-file-name="app/page.tsx">Choose Pro</span></Button>
                </div>
              </div>

              {/* Power Plan (formerly Team) */}
              <div className="skoop-card p-6 flex flex-col h-full border border-border" data-unique-id="999654f5-0d1b-423f-a158-29dbe7b47706" data-file-name="app/page.tsx">
                <div className="mb-6" data-unique-id="210207ba-e975-4071-953d-1713af06cac7" data-file-name="app/page.tsx">
                  <h3 className="text-lg font-medium mb-2" data-unique-id="29fdaf62-c063-47eb-a40a-957709e2c72d" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="2b47a973-189f-483f-bba7-42e0e8097613" data-file-name="app/page.tsx">Power</span></h3>
                  <div className="text-3xl font-bold" data-unique-id="f42c58b7-35c2-421d-9668-8b1faea15824" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="bc43bad9-8cd8-48bb-8a59-17ec149d9973" data-file-name="app/page.tsx">$19</span><span className="text-muted-foreground text-sm font-normal" data-unique-id="a869542b-2e3b-4ce4-891b-a4b368d93f5c" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="865f8798-30df-4b08-b917-9aec5fe6f968" data-file-name="app/page.tsx">/month</span></span></div>
                  <p className="text-muted-foreground text-sm mt-3" data-unique-id="e605f062-4669-4eb1-9238-69f4b9ba0687" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="bc0775a7-76eb-487e-9b3a-6931c97e89f3" data-file-name="app/page.tsx">Collaborate with your team</span></p>
                </div>
                <ul className="space-y-3 mb-8" data-unique-id="b1dcb93d-ef44-4aa7-9eea-a485f50403bc" data-file-name="app/page.tsx">
                  <li className="flex items-start" data-unique-id="8b0b8b50-0fe2-4a84-818d-ee23d6a70252" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="928c23a0-38bf-4a4c-b6a6-6ac35cd694ce" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="c25fbc7f-1d8e-41f4-a995-2ddbc8c417ae" data-file-name="app/page.tsx">Everything in Pro</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="403b02dd-0a0c-4778-b1f4-8570a1fd8c4c" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="831cc2a6-d661-41f9-a6b1-1598985a4f54" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="440d444b-93d8-40e3-815e-b8001df7ee1b" data-file-name="app/page.tsx">5 team members</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="4b246a39-2976-4c36-9d62-5dc20836e33c" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="d32fe570-876b-4f41-8069-75773675a30f" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="380ece97-fe5a-4bc1-a985-17a8eb065bba" data-file-name="app/page.tsx">Shared collections</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="7d212686-bf1b-4193-9967-042724c04dfd" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="ea19feaa-34cd-46d2-843e-591e76cb8889" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="1169650e-6bab-4538-9331-02865498f25f" data-file-name="app/page.tsx">Skoop Content columns</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="85d254f6-e5ea-4a33-b798-e31b4c83e145" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="9d2fd4fc-d05e-41a5-98a7-6f4cb01c2071" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="9d0580ee-89e3-404f-adea-0de134afd82b" data-file-name="app/page.tsx">Collaboration tools</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="e1751833-a15e-415d-a6f3-1792acee1879" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="c3964a9e-f26c-437e-a782-ff074c8405cf" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="31fcf648-4768-40e1-9d2a-f78d9e8d83ec" data-file-name="app/page.tsx">Advanced analytics</span></span>
                  </li>
                </ul>
                <div className="mt-auto" data-unique-id="21494547-34de-44a5-818f-9a730c9babf8" data-file-name="app/page.tsx">
                  <Button className="w-full skoop-button-primary" data-unique-id="48ebc864-632a-4530-b378-6103a431236f" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="8afdea4e-f4fb-4d39-88f7-1c28180edfbe" data-file-name="app/page.tsx">Choose Power</span></Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="skoop-section" data-unique-id="cffc6abb-8865-4b7d-83e6-41cdcbc68e60" data-file-name="app/page.tsx">
          <div className="skoop-container max-w-4xl" data-unique-id="b44725a5-b91f-4d55-ad1c-62f67c5bb21d" data-file-name="app/page.tsx">
            <div className="skoop-card p-8 md:p-12 text-center" data-unique-id="2d68f060-371f-4442-9d8d-38a37f94c4a5" data-file-name="app/page.tsx">
              <h2 className="text-2xl md:text-3xl font-bold mb-4" data-unique-id="8641469d-8e95-414d-80eb-b128c3262ef3" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="5015fd84-d4bd-468f-86b4-5054ef30d641" data-file-name="app/page.tsx">Ready to organize your digital knowledge?</span></h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto" data-unique-id="81becff8-4c0f-405e-9a84-9b7599104331" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="609e9d4c-72ca-40f6-a42f-0c63a7847ea2" data-file-name="app/page.tsx">
                Join thousands of developers, designers, and researchers who are using SKOOP to make the most of their saved content.
              </span></p>
              <div className="flex flex-col sm:flex-row justify-center gap-4" data-unique-id="93848c8b-b94d-4150-b995-b6dc607e54f6" data-file-name="app/page.tsx">
                <Button className="skoop-button-accent" size="lg" data-unique-id="3bd33c23-29d4-45ff-8557-caab9c9c0030" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="e1b2091a-fb7a-42d8-9f72-7836b85dd50b" data-file-name="app/page.tsx">Get Started for Free</span></Button>
                <Button variant="outline" size="lg" data-unique-id="cd07273a-8a43-4465-94cb-d01b25e419f3" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="18696eac-0a48-4f77-80de-0b92895b002d" data-file-name="app/page.tsx">
                  Request Demo
                </span></Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-secondary bg-opacity-30 border-t border-border py-12" data-unique-id="00787579-2584-46a1-a45c-08976b535acb" data-file-name="app/page.tsx">
        <div className="skoop-container" data-unique-id="f611de1e-3b35-48b7-8758-6cdc2259a4cc" data-file-name="app/page.tsx">
          <div className="grid gap-8 md:grid-cols-4" data-unique-id="631c922d-4ab0-405e-a6b5-14badbe3a9a2" data-file-name="app/page.tsx">
            <div data-unique-id="613ff965-cd5d-4c00-a368-80fd9a81f068" data-file-name="app/page.tsx">
              <div className="text-2xl font-bold text-primary mb-4" data-unique-id="2aa9ef16-e2c5-4a24-9857-c0cd23a7be79" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="01a0d7f4-ff21-400d-b33c-3527e653d1d2" data-file-name="app/page.tsx">SKOOP</span></div>
              <p className="text-muted-foreground text-sm" data-unique-id="39284cb5-e2b1-4319-87d6-fc3645d4910f" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="80ab5d69-d54c-4dcf-92bd-b15830a4298a" data-file-name="app/page.tsx">
                The all-in-one platform for collecting, searching and rediscovering your saved content.
              </span></p>
            </div>

            <div data-unique-id="375917b9-f307-498f-ac68-6a26ffd228e1" data-file-name="app/page.tsx">
              <h4 className="font-medium mb-4" data-unique-id="86c091f7-8dde-42c3-aff2-b589fab4fb93" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="cbc91062-9826-4baa-a591-8d11d1a6599e" data-file-name="app/page.tsx">Product</span></h4>
              <ul className="space-y-2 text-sm text-muted-foreground" data-unique-id="5bed107d-80e6-451c-b71e-29213441e5ab" data-file-name="app/page.tsx">
                <li data-unique-id="bcecf52f-eb1b-4289-9dc6-271b9a1e7b3b" data-file-name="app/page.tsx"><Link href="#features" className="hover:text-primary transition-colors" data-unique-id="9478abca-5917-446b-b737-9253de62ba7d" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="4a29d465-12a8-4e21-baba-818efa5ed282" data-file-name="app/page.tsx">Features</span></Link></li>
                <li data-unique-id="94b72e6c-b4fe-48b0-98ef-6961fa75e8b9" data-file-name="app/page.tsx"><Link href="#pricing" className="hover:text-primary transition-colors" data-unique-id="cdcc285d-4109-4067-9eec-cc68f20fa228" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="6c009bfb-2f50-4d72-9940-c4fa3868bccb" data-file-name="app/page.tsx">Pricing</span></Link></li>
                <li data-unique-id="7bb79f8c-18bf-439c-a095-4a75a4fab8e7" data-file-name="app/page.tsx"><Link href="/dashboard" className="hover:text-primary transition-colors" data-unique-id="6db2185a-a554-4edc-be5e-4e6ae4b3779f" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="97c830c6-44de-4800-aac1-cced409a14b9" data-file-name="app/page.tsx">Dashboard</span></Link></li>
                <li data-unique-id="476c9e21-0406-4c56-8f33-12b90878d254" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="1f0f6adf-65c6-47c8-8cb4-b4ffbf283c05" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="f5b0a31f-9ac4-47db-b31b-d8c9514041b5" data-file-name="app/page.tsx">Integrations</span></Link></li>
                <li data-unique-id="8bc294e8-de96-46cd-a7ce-2182f554a3f2" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="56bc20ec-9e6d-4d83-ae2f-0ed90a174270" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="5a745608-717e-4058-aaa5-277df6348ba1" data-file-name="app/page.tsx">Changelog</span></Link></li>
              </ul>
            </div>

            <div data-unique-id="5ad638ec-0fd6-472b-8245-3ab67984f4d7" data-file-name="app/page.tsx">
              <h4 className="font-medium mb-4" data-unique-id="69c2657b-7855-4969-83bf-90662a54ca0a" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="724d141d-39ad-4b9a-b5c5-8ae689ee0f15" data-file-name="app/page.tsx">Resources</span></h4>
              <ul className="space-y-2 text-sm text-muted-foreground" data-unique-id="d6bf811f-85ca-48a6-b9a4-848f37dcc68e" data-file-name="app/page.tsx">
                <li data-unique-id="ed09a7be-08bf-4eff-ab0a-291931adce47" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="cc061c29-c757-4ee4-ad26-ad4bfe27ac6d" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="f5ea3754-8ec7-4869-9283-ee136f4b322d" data-file-name="app/page.tsx">Documentation</span></Link></li>
                <li data-unique-id="a0b062f5-ec22-46a8-89b7-39b341c6308a" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="83398b6d-d0a0-4104-b4ff-c2a9fda0ce99" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="8ba2dabf-94e8-4736-be9b-8781c330b68e" data-file-name="app/page.tsx">API</span></Link></li>
                <li data-unique-id="95639eaf-71ca-4275-97d9-81bd05f1d2be" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="75adcc63-162d-4023-ac59-04476734621a" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="306cdcff-6e86-4a1a-93fd-59f9bbe80031" data-file-name="app/page.tsx">Guides</span></Link></li>
                <li data-unique-id="e5d59719-61b2-4bbe-9ea5-21863e330d14" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="7486fb1d-fab4-4dd1-a48f-80d9050a94a5" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="4bb60a22-6bf2-465a-bc98-89ef56700130" data-file-name="app/page.tsx">Help Center</span></Link></li>
              </ul>
            </div>

            <div data-unique-id="35752bbb-d96b-403c-aecf-dec5f181c229" data-file-name="app/page.tsx">
              <h4 className="font-medium mb-4" data-unique-id="7e42731d-3557-4058-831f-ce2eb63311af" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="b047a7ee-6860-4491-aadc-76cdddcffc07" data-file-name="app/page.tsx">Company</span></h4>
              <ul className="space-y-2 text-sm text-muted-foreground" data-unique-id="264e524d-f4b7-4bb3-ae0d-f2646729a870" data-file-name="app/page.tsx">
                <li data-unique-id="de1abd16-9977-48a5-adec-04a6224e3dc8" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="d7390d1c-8a13-4cf1-b4c2-a7966ce61da8" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="2b3928ce-debc-40c1-9bca-0a42ab6a25ff" data-file-name="app/page.tsx">About</span></Link></li>
                <li data-unique-id="c26f74a9-8f0f-4221-bc12-94d9e4e38a34" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="a5bfc0dc-8154-4042-b4bf-e9d2045b9bef" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="2fc332d3-2fe5-4597-9a1a-dd44c6847284" data-file-name="app/page.tsx">Blog</span></Link></li>
                <li data-unique-id="a34bdcda-71f0-41d5-81f9-f6766f10d8c1" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="7449a4c3-71b6-4e3d-a1a3-b7eff26e33f8" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="1d184d37-8ba4-4c92-b7db-b5586d26037d" data-file-name="app/page.tsx">Careers</span></Link></li>
                <li data-unique-id="0f85377d-5422-4fc4-ac2c-9385b2b562a9" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="ddf436b1-3600-410a-a5d1-5ad04b6943ec" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="6c1c8b78-87d3-45df-bf0d-f461380f26bd" data-file-name="app/page.tsx">Contact</span></Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center" data-unique-id="34709b27-28c4-4ad0-b328-e5c61aaff517" data-file-name="app/page.tsx">
            <div className="flex items-center" data-unique-id="cb9618de-78ff-4451-9a15-10f6dfb8128c" data-file-name="app/page.tsx">
              <div className="text-xl logo font-bold text-primary mr-2" data-unique-id="83fcce59-08b6-4d5f-b3ec-f1d4dcd394b9" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="922820a9-568e-4537-9843-8d6dbeace4f4" data-file-name="app/page.tsx">SKOOP</span></div>
              <div className="text-sm text-muted-foreground" data-unique-id="e43051e7-bbab-4fa9-be86-2c35dc82038b" data-file-name="app/page.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="24b1c4d9-8210-4c84-8103-9e86fb53e5ea" data-file-name="app/page.tsx">
                © </span>{new Date().getFullYear()}<span className="editable-text" data-unique-id="efd96a61-7f94-4494-9ca2-fe13a79be3d6" data-file-name="app/page.tsx"> All rights reserved.
              </span></div>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0" data-unique-id="28cadc63-1517-4628-8581-17edc09193ad" data-file-name="app/page.tsx">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors" data-unique-id="d216d2f5-6111-42ca-bdee-681891eeaeb9" data-file-name="app/page.tsx">
                <span className="sr-only" data-unique-id="b50069c3-590f-4b52-bd96-77e3a31b1f2a" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="cbd7b4a1-39d2-493d-8437-947d21db48fe" data-file-name="app/page.tsx">Twitter</span></span>
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors" data-unique-id="a35d2776-a77f-49af-8c2c-a8a9d75b497c" data-file-name="app/page.tsx">
                <span className="sr-only" data-unique-id="108f2f4e-60de-4937-a157-e485fb4c7d83" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="7fb1199a-d019-4759-8a54-874cfb3b8e7d" data-file-name="app/page.tsx">GitHub</span></span>
                <Github className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>;
}