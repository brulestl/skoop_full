import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { AuroraBackground } from "@/components/ui/aurora-background";
import Link from "next/link";
import Image from "next/image";
import { Search, Github, Twitter, Code as StackOverflow, Bookmark, FolderPlus as Collection, CheckCircle2, ChevronRight, ArrowRight } from "lucide-react";
import dynamic from 'next/dynamic';

// Dynamically import the ExpandableCard component with client-side only rendering
const ExpandableCard = dynamic(() => import('@/components/landing/expandable-card'), {
  ssr: true,
  loading: () => <div className="w-full max-w-[640px] mx-auto h-[100px] bg-white dark:bg-card rounded-xl border border-[#E5E7EB] dark:border-border animate-pulse" data-unique-id="80f8d107-ef46-47b6-bf1b-2ccdcdc5820b" data-file-name="app/page.tsx"></div>
});
export default function HomePage() {
  return <div className="min-h-screen flex flex-col" data-unique-id="869233b4-b26a-47d6-967e-cc5083295163" data-file-name="app/page.tsx" data-dynamic-text="true">
      {/* Header */}
      <header className="border-b border-border relative z-10" data-unique-id="d8242b2a-172e-4bd4-a4a7-161f3e2337c1" data-file-name="app/page.tsx">
        <div className="skoop-container flex items-center justify-between h-16" data-unique-id="e4ac9c2f-7363-4e8a-961f-51f6b30cd150" data-file-name="app/page.tsx">
          <div className="flex items-center" data-unique-id="24160b56-a4f1-4c8e-b296-7ef96580c4e9" data-file-name="app/page.tsx">
            <div className="text-2xl font-bold text-primary" data-unique-id="f8e5cdf2-d64b-492f-957d-ace7f3505d67" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="68669e62-5ea2-475a-944c-16e3726c7204" data-file-name="app/page.tsx">SKOOP</span></div>
            <nav className="hidden ml-12 space-x-6 lg:flex" data-unique-id="6951e934-66ae-4f7a-bc79-33c868f7c11b" data-file-name="app/page.tsx">
              <Link href="#features" className="text-foreground hover:text-primary transition-colors" data-unique-id="2aa5a232-2d9d-4e53-8fa4-b26bfce1e91a" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="a55cbeae-ce7c-4c7e-b07b-1eee86e1cfad" data-file-name="app/page.tsx">Features</span></Link>
              <Link href="#pricing" className="text-foreground hover:text-primary transition-colors" data-unique-id="f12bafc3-df3a-487a-a021-77e58fe45108" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="da321153-4a13-42b8-8c06-fd7ea70a9487" data-file-name="app/page.tsx">Pricing</span></Link>
              <Link href="#faq" className="text-foreground hover:text-primary transition-colors" data-unique-id="a23df8ee-2d0a-4535-a586-10006176b9f9" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="900f43cc-41b3-4b09-b38c-079a51363912" data-file-name="app/page.tsx">FAQ</span></Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4" data-unique-id="dc3fae68-83a8-432f-a23f-e5460974805e" data-file-name="app/page.tsx">
            <ThemeToggle />
            <a href="/dashboard" className="text-foreground hover:text-primary transition-colors" data-unique-id="55241f10-2bc8-4e38-b3ad-50fd0a04a453" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="40c2859f-c61b-40b7-a7a0-4b21ca5eccba" data-file-name="app/page.tsx">Dashboard</span></a>
            <a href="/login" className="text-foreground hover:text-primary transition-colors" data-unique-id="9633295e-f6a1-45ee-9090-aa977e754e25" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="0c560e88-6f9e-4f70-9e84-8a1fdbc5584f" data-file-name="app/page.tsx">Log in</span></a>
            <Button className="skoop-button-accent" data-unique-id="fca2e9ef-610b-4a7b-a428-f5d9b44fb432" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="8644368f-d3d7-453a-ac80-83f87728f87c" data-file-name="app/page.tsx">Sign Up Free</span></Button>
          </div>
        </div>
      </header>

      <main className="flex-grow" data-unique-id="09758c04-5112-417e-80f8-196670b189b6" data-file-name="app/page.tsx" data-dynamic-text="true">
        {/* Hero Section with Aurora Background */}
        <section className="relative overflow-hidden" data-unique-id="de94ba9a-e7ff-4745-bc6c-ec715cfd5177" data-file-name="app/page.tsx">
          <AuroraBackground className="absolute inset-0">
            <div className="absolute inset-0 bg-background/40 backdrop-blur-sm" data-unique-id="72ba1631-af12-4d0b-bbfb-f62cfe325c47" data-file-name="app/page.tsx" />
          </AuroraBackground>
          
          <div className="skoop-section relative z-10" data-unique-id="cb9fed6b-0e9c-4c60-9938-51445a5e0b41" data-file-name="app/page.tsx">
          <div className="skoop-container" data-unique-id="c163239a-1d2a-4a34-81b1-4463624ab0fa" data-file-name="app/page.tsx" data-dynamic-text="true">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-24 items-center" data-unique-id="08524509-e2fb-4f52-a9d8-708d5cda3221" data-file-name="app/page.tsx">
              <div data-unique-id="63a6d95c-e8f2-4e35-a633-33c3b9b5dc91" data-file-name="app/page.tsx">
                <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl mb-6" data-unique-id="e50ca2de-48b9-4905-b06f-af1ed8f58168" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="4fe181da-7fad-4b53-a420-36dcb4e7bdb5" data-file-name="app/page.tsx">
                  Collect, search and </span><span className="text-primary" data-unique-id="818f4418-1bce-4967-8be3-bcf4c685889c" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="3f28cb27-c920-4b37-ba36-b8e52e01938f" data-file-name="app/page.tsx">rediscover</span></span><span className="editable-text" data-unique-id="5b9359ee-9915-4792-b22f-ad370070b72e" data-file-name="app/page.tsx"> your saved content
                </span></h1>
                <p className="text-lg text-muted-foreground mb-8" data-unique-id="5ce9c38a-d472-4ece-b86a-53b7adb944da" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="4aa672e3-2e11-426b-a6d7-112c3c14fda3" data-file-name="app/page.tsx">
                  One calm space for all your saved tweets, GitHub stars, Reddit posts, and Stack Overflow favorites.
                </span></p>
                <div className="flex flex-col sm:flex-row gap-4" data-unique-id="7b65e864-b8b7-4544-a433-66f259524874" data-file-name="app/page.tsx">
                  <Button className="skoop-button-accent" size="lg" data-unique-id="82bf2dc9-7d8b-43d1-913c-c4a1275b00df" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="ab818afa-00a1-4075-a415-801eb605c56b" data-file-name="app/page.tsx">Get Started</span></Button>
                  <Button variant="outline" size="lg" className="group" data-unique-id="def17b3a-51cb-4459-a646-d80202f2f985" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="0a691f98-5a3e-4e20-9e34-83a3f738c3f7" data-file-name="app/page.tsx">
                    How It Works
                    </span><ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
                <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground" data-unique-id="035cb137-b0fa-4ffd-881c-6cc3b4fb36f9" data-file-name="app/page.tsx">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span data-unique-id="3c45e6d0-dbd2-4397-836f-8558030613a2" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="29e295d6-e040-48c9-9c8b-74075ceafc50" data-file-name="app/page.tsx">No credit card required</span></span>
                </div>
              </div>
              <div className="relative" data-unique-id="bf6921fa-694e-41a0-a11d-2fc80da90f16" data-file-name="app/page.tsx" data-dynamic-text="true">
                <div className="skoop-card overflow-hidden" data-unique-id="154453ba-c740-4482-9a68-ee44b849d041" data-file-name="app/page.tsx">
                  <Image src="https://images.unsplash.com/photo-1508921340878-ba53e1f016ec?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3" alt="SKOOP Dashboard" width={600} height={400} className="w-full h-auto rounded-t-[var(--radius)]" data-unique-id="06dd5aab-fe79-492d-95b0-7c6bffdc30f9" data-file-name="app/page.tsx" />
                  <div className="p-6" data-unique-id="84057edf-d1b8-4840-ac66-fa41e732b7b6" data-file-name="app/page.tsx">
                    <div className="flex items-center justify-between mb-4" data-unique-id="f1914702-23b6-43fe-9913-97ab5215b380" data-file-name="app/page.tsx">
                      <div className="font-semibold" data-unique-id="6558868c-5563-4b24-85bc-5a097d42aefb" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="58bb1e3c-7492-45f1-82a1-eb902d8d8463" data-file-name="app/page.tsx">Recent Saves</span></div>
                      <Search className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="space-y-3" data-unique-id="93b11c29-9671-4612-843d-c24a3bfbcd5b" data-file-name="app/page.tsx" data-dynamic-text="true">
                      {[1, 2, 3].map(i => <div key={i} className="flex items-center gap-3 p-3 rounded-md bg-secondary/50" data-unique-id="749c3e27-3cbc-4a6f-ac98-513267cf460f" data-file-name="app/page.tsx" data-dynamic-text="true">
                          {i === 1 && <Github className="h-5 w-5 text-foreground" />}
                          {i === 2 && <Twitter className="h-5 w-5 text-foreground" />}
                          {i === 3 && <StackOverflow className="h-5 w-5 text-foreground" />}
                          <div className="flex-grow" data-unique-id="4f7decc7-2757-418b-8353-30707f7f7c3b" data-file-name="app/page.tsx">
                            <div className="text-sm font-medium truncate" data-unique-id="487613f4-4870-4874-bdd9-a662c7ca5ef1" data-file-name="app/page.tsx" data-dynamic-text="true">
                              {i === 1 && "Interesting open source project for data visualization"}
                              {i === 2 && "Thread: 10 tips for better React performance"}
                              {i === 3 && "How to optimize PostgreSQL queries for large datasets"}
                            </div>
                            <div className="text-xs text-muted-foreground mt-0.5" data-unique-id="ea386340-5509-4b7f-8d91-409bfb1840d4" data-file-name="app/page.tsx" data-dynamic-text="true">
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
                <div className="absolute -left-8 top-1/2 bg-card p-3 rounded-full shadow-lg border border-border hidden lg:block" data-unique-id="b583f7a9-74aa-4b3b-8a1c-e4dd919ac0de" data-file-name="app/page.tsx">
                  <Github className="h-6 w-6 text-primary" />
                </div>
                <div className="absolute -right-8 bottom-1/3 bg-card p-3 rounded-full shadow-lg border border-border hidden lg:block" data-unique-id="b26576dc-ec9c-42ad-8dc0-6b88d1d29716" data-file-name="app/page.tsx">
                  <Twitter className="h-6 w-6 text-accent" />
                </div>
              </div>
            </div>

            {/* Logos */}
            <div className="mt-20" data-unique-id="bf33bfdc-9eee-40ad-a9bd-7b6b7e2d783a" data-file-name="app/page.tsx">
              <p className="text-center text-sm text-muted-foreground mb-6" data-unique-id="6b180fb3-ca3b-4081-a23e-eb2b509125da" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="d6d09a49-56f9-416a-8a61-f84b4d5ac61a" data-file-name="app/page.tsx">
                Connect with your favorite platforms
              </span></p>
              <div className="flex justify-center items-center flex-wrap gap-8 md:gap-12" data-unique-id="fd0bd1c4-41b7-4346-824a-188453977692" data-file-name="app/page.tsx">
                <Github className="h-8 w-8 text-muted-foreground" />
                <Twitter className="h-8 w-8 text-muted-foreground" />
                <StackOverflow className="h-8 w-8 text-muted-foreground" />
                <div className="text-muted-foreground text-xl font-semibold" data-unique-id="4dac0c1e-ac84-4b27-8f37-724c20d69080" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="326c0b61-1551-4e7d-9d3f-8040412059b1" data-file-name="app/page.tsx">Reddit</span></div>
                <div className="text-muted-foreground text-xl font-semibold" data-unique-id="44becdd1-d8b3-4ae2-955d-d6257929e068" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="ee0ade16-8207-45d9-bc4d-c9033c6dc869" data-file-name="app/page.tsx">DEV</span></div>
              </div>
            </div>
          </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="skoop-section" data-unique-id="c0b6d284-99b4-4c1a-96e4-85ad9cf229f7" data-file-name="app/page.tsx">
          <div className="skoop-container" data-unique-id="ab7b927e-2757-4b75-92f7-100cae82a39f" data-file-name="app/page.tsx">
            <div className="text-center mb-16" data-unique-id="5b60c860-5516-41c8-bd0a-49606323ea04" data-file-name="app/page.tsx">
              <h2 className="text-3xl font-bold mb-4" data-unique-id="69e8d955-ed32-41d2-a5c0-902ebfbbec3d" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="397ed54d-c023-456d-8045-e04d03f1d90f" data-file-name="app/page.tsx">Finally, a place for all your saved content</span></h2>
              <p className="text-muted-foreground max-w-2xl mx-auto" data-unique-id="c947699d-5053-475c-960b-a70079df2710" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="98b15f99-780c-4213-bc3b-392b0d624b2a" data-file-name="app/page.tsx">
                SKOOP solves the problem of fragmented saves and makes it easy to find what you need when you need it.
              </span></p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3" data-unique-id="d4fc7bba-09a7-48f8-b22e-b8fb08a3baa8" data-file-name="app/page.tsx" data-dynamic-text="true">
              {/* Feature 1 */}
              <div className="skoop-card p-6" data-unique-id="d0a23c4c-8b93-402c-8d39-1b7597026696" data-file-name="app/page.tsx">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary bg-opacity-10 mb-4" data-unique-id="f2c71c3f-df77-4d63-9bb7-2871ac9d5793" data-file-name="app/page.tsx">
                  <Bookmark className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3" data-unique-id="ca5eccc7-904b-48c1-b616-3172cfcc2807" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="ca4bc10a-31ba-4e44-bff3-fa85abfceda2" data-file-name="app/page.tsx">Unified Collection</span></h3>
                <p className="text-muted-foreground mb-4" data-unique-id="c54090fd-f297-46e6-9915-c5cb3858ddd9" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="804d242f-cb1e-42d2-b7de-c1f8686287f2" data-file-name="app/page.tsx">
                  Import and sync all your saved content from GitHub, Twitter, Reddit, and Stack Overflow in one place.
                </span></p>
                <div className="pt-4 border-t border-border mt-auto" data-unique-id="31ac2ae6-6509-4155-a654-6d87549c810d" data-file-name="app/page.tsx">
                  <Link href="#" className="inline-flex items-center text-primary hover:underline" data-unique-id="1ab3977e-22e6-4294-89b4-0696e1aa84a0" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="009d7451-9522-41a8-b9b8-0f3bf729b0df" data-file-name="app/page.tsx">
                    Learn more </span><ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="skoop-card p-6" data-unique-id="f91e5b9c-46fc-48fd-9949-01926a8c9879" data-file-name="app/page.tsx">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-accent bg-opacity-10 mb-4" data-unique-id="eaeacfe2-99f1-47f4-a191-8c9abb438870" data-file-name="app/page.tsx">
                  <Search className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3" data-unique-id="d604cb5a-8915-4bdb-88cb-3d304b0c90ce" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="d1962d96-426a-4ab5-89e0-32302b398f68" data-file-name="app/page.tsx">Semantic Search</span></h3>
                <p className="text-muted-foreground mb-4" data-unique-id="383fd0c8-f011-49f6-a1e2-5d5e154145be" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="29bacef0-3eec-457f-a92e-0df18c7864e1" data-file-name="app/page.tsx">
                  Find what you're looking for with powerful semantic search that understands the meaning behind your queries.
                </span></p>
                <div className="pt-4 border-t border-border mt-auto" data-unique-id="0fdf5ac9-5514-4868-b925-0501a157c1d2" data-file-name="app/page.tsx">
                  <Link href="#" className="inline-flex items-center text-primary hover:underline" data-unique-id="9c318c62-566b-4f88-aba1-e0466f315273" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="a50e7006-c97c-468c-a6cb-40eefa6ce144" data-file-name="app/page.tsx">
                    Learn more </span><ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="skoop-card p-6" data-unique-id="6415e3cf-7771-4883-8047-d166d159ce9f" data-file-name="app/page.tsx">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-destructive bg-opacity-10 mb-4" data-unique-id="f5686aeb-af59-4b6f-8754-101a8add3f30" data-file-name="app/page.tsx">
                  <Collection className="h-6 w-6 text-destructive" />
                </div>
                <h3 className="text-xl font-semibold mb-3" data-unique-id="da9b2101-3a39-408a-8adf-29f45ce9c0ef" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="6ba6b9bd-e142-4b4d-b541-8b400b853e64" data-file-name="app/page.tsx">Smart Collections</span></h3>
                <p className="text-muted-foreground mb-4" data-unique-id="837209ed-36f8-4313-9842-a9fba00e96b7" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="c5e2f466-32e0-46f2-981c-3632a35169e9" data-file-name="app/page.tsx">
                  Organize your content with automated collections that group similar items together and surface the best content.
                </span></p>
                <div className="pt-4 border-t border-border mt-auto" data-unique-id="d37a96c1-0d9f-4a77-8418-9bdcecdc55fc" data-file-name="app/page.tsx">
                  <Link href="#" className="inline-flex items-center text-primary hover:underline" data-unique-id="025788ec-9eec-46c0-aeb6-88a29a475835" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="629aefab-4699-4264-a778-e7f92304a2b0" data-file-name="app/page.tsx">
                    Learn more </span><ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Expandable Card Demo Section */}
        <section className="py-20 lg:py-28" style={{
        backgroundColor: '#FCEADE'
      }} data-unique-id="b5a1aa64-d506-4b3a-b1c4-612c63487604" data-file-name="app/page.tsx">
          <div className="skoop-container" data-unique-id="f18b5737-f04d-4f5c-b914-29793bfbcf6d" data-file-name="app/page.tsx">
            <div className="text-center mb-12" data-unique-id="7708a687-176d-49b9-a01d-07d4614947a5" data-file-name="app/page.tsx">
              <h2 className="text-3xl font-bold mb-4" data-unique-id="f401d2f3-a0fb-4a6e-8e39-8185fc14dcfc" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="94d14470-4e57-4fdf-88d6-8d2459069255" data-file-name="app/page.tsx">Experience AI-Powered Summaries</span></h2>
              <p className="text-muted-foreground max-w-2xl mx-auto" data-unique-id="fd0f34a7-2695-410f-8d66-053cc222964c" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="ef308936-3098-4698-ab56-a1102592c0c3" data-file-name="app/page.tsx">
                SKOOP automatically generates concise, intelligent summaries of your saved content.
                Click to expand below and see it in action.
              </span></p>
            </div>
            
            <div className="mx-auto" data-unique-id="2b021963-c94e-4eb5-997c-c16fae42e0fc" data-file-name="app/page.tsx" data-dynamic-text="true">
              {/* Import the ExpandableCard component */}
              <ExpandableCard />
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="skoop-section bg-secondary bg-opacity-30" data-unique-id="88af61e0-7294-48e6-8a99-e309a4ed38a9" data-file-name="app/page.tsx">
          <div className="skoop-container" data-unique-id="10b9663f-3cb1-4b2a-b011-8154830d48d6" data-file-name="app/page.tsx">
            <div className="text-center mb-16" data-unique-id="c53b43e8-4b17-464a-a31b-aa2f26723980" data-file-name="app/page.tsx">
              <h2 className="text-3xl font-bold mb-4" data-unique-id="628dcd07-82d5-4ca8-8ced-33b2e9ef9505" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="bb81a8fc-44ae-43c3-93b9-e55ce8729a7c" data-file-name="app/page.tsx">Simple, transparent pricing</span></h2>
              <p className="text-muted-foreground max-w-2xl mx-auto" data-unique-id="058e0031-5de9-4a5a-8046-1b84b06bbcae" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="af38978a-8a59-4c79-a5d1-6d89d1fa4587" data-file-name="app/page.tsx">
                Choose the plan that fits your needs. All plans include our core features.
              </span></p>
            </div>

            <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto" data-unique-id="3d46de22-f4f9-4749-b0af-c34230d7acdd" data-file-name="app/page.tsx" data-dynamic-text="true">
              {/* Free Plan */}
              <div className="skoop-card p-6 flex flex-col h-full border border-border" data-unique-id="bfc0ef4d-3367-41b6-80e1-9aa8f550093c" data-file-name="app/page.tsx">
                <div className="mb-6" data-unique-id="9e98d268-6e60-4ee8-a4a5-67d4e8aea058" data-file-name="app/page.tsx">
                  <h3 className="text-lg font-medium mb-2" data-unique-id="d6d2c5b2-0344-4514-a9bd-fe0fdd0b9006" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="2036dd03-7746-4da3-8723-579dda0eebf2" data-file-name="app/page.tsx">Free</span></h3>
                  <div className="text-3xl font-bold" data-unique-id="cb5ec69b-cdf0-4463-9615-fa0d6bd05483" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="f8ff8ca1-b2b9-43fc-9c09-32f406315ed5" data-file-name="app/page.tsx">$0</span><span className="text-muted-foreground text-sm font-normal" data-unique-id="902bc91b-7e88-4264-a065-ccc427b2bd11" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="1ae87c10-7b51-4f18-b87c-68ff4662c40d" data-file-name="app/page.tsx">/month</span></span></div>
                  <p className="text-muted-foreground text-sm mt-3" data-unique-id="0cc87363-e4a7-4da7-8ba6-793467d56afe" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="d263b7f5-2755-4c9a-86ad-791444a6f2c4" data-file-name="app/page.tsx">Perfect for getting started</span></p>
                </div>
                <ul className="space-y-3 mb-8" data-unique-id="ce955ced-a934-4f61-b8b1-9a98e784cf21" data-file-name="app/page.tsx">
                  <li className="flex items-start" data-unique-id="fef72c03-16e9-4a13-b3bd-2931704bc8ad" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="24b829d8-e5db-4095-8b77-8e501053b9fa" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="aea0ee43-7b56-420d-92c2-35b459e28f80" data-file-name="app/page.tsx">72h free bookmark storage</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="532916df-e5ea-4aa4-9a49-130aa5d3a7c4" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="fba6b856-fd1c-4263-b029-816e23fc475d" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="2cf5657a-d987-4e6b-be01-392c7810087b" data-file-name="app/page.tsx">2 connected platforms</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="2fcd6c41-72e4-40f5-8fb2-5c891b650eb2" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="c5dadf7b-a839-4e29-856a-91a41d2b0eee" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="41c6dce7-8e9c-4bd4-a998-ae4df5fceb47" data-file-name="app/page.tsx">Basic search</span></span>
                  </li>
                </ul>
                <div className="mt-auto" data-unique-id="e72ed31e-f23d-4596-b5aa-3d1f394c0f2d" data-file-name="app/page.tsx">
                  <Button className="w-full skoop-button-primary" data-unique-id="da5e270f-40b6-424a-bfea-3e9beb229667" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="fc131f30-5e07-4e07-a19b-dfe62b4edd66" data-file-name="app/page.tsx">Get Started</span></Button>
                </div>
              </div>

              {/* Pro Plan */}
              <div className="skoop-card p-6 flex flex-col h-full border-2 border-primary relative" data-unique-id="51538dcc-9db1-453f-aa71-88757b8a823f" data-file-name="app/page.tsx">
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-sm font-medium rounded-bl-lg rounded-tr-[calc(var(--radius)-1px)]" data-unique-id="08a10eec-fe78-4eff-8150-915eae990562" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="d3b97e47-d74e-4615-ac79-f577e4eed573" data-file-name="app/page.tsx">
                  Popular
                </span></div>
                <div className="mb-6" data-unique-id="091aa930-64ad-4fcb-a0d8-6900ad8509bb" data-file-name="app/page.tsx">
                  <h3 className="text-lg font-medium mb-2" data-unique-id="34832d6f-5484-488f-83f9-8ac81f8af2da" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="56aec1d9-9c90-4d9b-bbd2-76a3c7206eb6" data-file-name="app/page.tsx">Pro</span></h3>
                  <div className="text-3xl font-bold" data-unique-id="00edf6e4-0da2-461e-9add-9f87382dfbe5" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="c4e08973-7235-4327-a83c-606ff6b18bcb" data-file-name="app/page.tsx">$12</span><span className="text-muted-foreground text-sm font-normal" data-unique-id="37101e72-9ca6-438a-96f6-82197c1a819f" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="ec8893e9-2f56-41af-8fcd-e756ef4a8666" data-file-name="app/page.tsx">/month</span></span></div>
                  <p className="text-muted-foreground text-sm mt-3" data-unique-id="486f7255-c0c6-482a-ae07-613a76c3eea3" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="be7c460b-860a-4685-bd6b-d00149dfc1d7" data-file-name="app/page.tsx">For power users</span></p>
                </div>
                <ul className="space-y-3 mb-8" data-unique-id="73bac33b-4eb5-4e0e-9769-bc9419d2ff3f" data-file-name="app/page.tsx">
                  <li className="flex items-start" data-unique-id="592eac55-3fde-4667-b548-4d7e8de863a0" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="96529b66-248e-4f5f-a3eb-f438388aba72" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="baf09238-60d1-4cb3-b7c0-06f30910a285" data-file-name="app/page.tsx">Unlimited saved items</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="09145c4f-2a6a-4b49-9d7c-b3040751e278" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="987b561d-36d2-40d6-ac74-21a87438050e" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="f6096dde-34b2-4189-b4af-141dd678aed1" data-file-name="app/page.tsx">All platforms</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="9588f3d6-1b60-4390-b51b-095bea6918e2" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="2a2f67c3-0c52-4035-84a5-6ede375d58be" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="56084467-0043-486d-84d2-529745db1719" data-file-name="app/page.tsx">Advanced semantic search</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="50c5f460-39e1-4787-95fa-1c254ce7b5bc" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="ea999fa4-c5d1-439e-8abb-c1f4eb8220be" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="56021b77-f1b2-4d4e-845c-e9f9943b6160" data-file-name="app/page.tsx">AI summary</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="591f54ee-c17f-41ff-8d81-ce517e579980" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="ad26514f-f0c1-4198-998b-b9966430f332" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="2e4a0428-bffd-41a1-b9d2-4cd10572a5f6" data-file-name="app/page.tsx">Smart collections</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="7b8320a1-1b57-4fc1-992f-7e7966dba205" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="ff5f4dc4-f2fa-42cb-b3fe-7f5d93b5c3ad" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="68093fd9-3792-48ba-a580-cfae7b64cc27" data-file-name="app/page.tsx">15-minute sync</span></span>
                  </li>
                </ul>
                <div className="mt-auto" data-unique-id="8c5a23f9-4965-414f-94de-b151a0f60d62" data-file-name="app/page.tsx">
                  <Button className="w-full skoop-button-accent" data-unique-id="fec723e3-c3bb-4a02-996e-c6845c3e0166" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="f721b7dc-39c7-4a70-8829-b4e4c6ebf3cc" data-file-name="app/page.tsx">Choose Pro</span></Button>
                </div>
              </div>

              {/* Team Plan */}
              <div className="skoop-card p-6 flex flex-col h-full border border-border" data-unique-id="47884a3a-bc0e-430c-82e1-4bc457fb117a" data-file-name="app/page.tsx">
                <div className="mb-6" data-unique-id="dfed1805-6a2c-4e19-bbd2-6dbb57d8fcab" data-file-name="app/page.tsx">
                  <h3 className="text-lg font-medium mb-2" data-unique-id="aaef24eb-a753-40d8-ac16-54e3bb5d81e6" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="d5ba9e96-9cba-4b06-b72a-1fef7ba3fe14" data-file-name="app/page.tsx">Team</span></h3>
                  <div className="text-3xl font-bold" data-unique-id="32d8be4b-0955-4995-87a0-4e06efd02fc2" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="56ae7982-eda4-416d-b58d-8434f799c276" data-file-name="app/page.tsx">$19</span><span className="text-muted-foreground text-sm font-normal" data-unique-id="5b493d07-2af3-4603-a86c-a8bd764d052d" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="f70ca14f-0160-4829-bfe1-dca8007e45e5" data-file-name="app/page.tsx">/month</span></span></div>
                  <p className="text-muted-foreground text-sm mt-3" data-unique-id="734d3696-4f0e-4ba3-9616-b54f28fe9507" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="f83a242e-fbaf-4027-9562-56f44009a3cc" data-file-name="app/page.tsx">Collaborate with your team</span></p>
                </div>
                <ul className="space-y-3 mb-8" data-unique-id="d0d859b4-d91f-4d4e-97bd-04e959dc1942" data-file-name="app/page.tsx">
                  <li className="flex items-start" data-unique-id="3a9897fa-ecfa-49e9-87d5-f67061248c4e" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="3ef66a1c-c401-4f2d-bd8f-5975d8ecee55" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="c6f46873-d219-4315-b5b2-00144a2b951a" data-file-name="app/page.tsx">Everything in Pro</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="2083a67d-6293-4b1e-b6e2-b2f502271471" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="fe25dc31-5565-4788-b41c-395a2201bf27" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="7f53a67e-607c-4e3d-b394-726006f2aad2" data-file-name="app/page.tsx">5 team members</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="73037b89-9534-4ba7-96f2-0d751a7430f9" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="6e6a8585-28d6-49dc-b961-0de7d3298e2d" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="0d7b8bab-0cc5-4341-aa54-18edf8bbea90" data-file-name="app/page.tsx">Shared collections</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="6e07fcbd-6cdb-405a-bd41-0fd11fc4ae88" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="d8db0eea-10d3-4173-85c1-b2771f2a52c5" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="9219832a-b2b8-4896-9337-e047a0e5cbad" data-file-name="app/page.tsx">Collaboration tools</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="89924832-1464-45fe-85d1-df52e2f3261c" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="975fe15f-cec1-4786-a1bf-25fd8b34ef9c" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="6a9e4cbe-d977-41cf-9b0c-79f6152b8ac9" data-file-name="app/page.tsx">Advanced analytics</span></span>
                  </li>
                </ul>
                <div className="mt-auto" data-unique-id="ed682834-0e05-4fcc-be9a-dbd032112640" data-file-name="app/page.tsx">
                  <Button className="w-full skoop-button-primary" data-unique-id="d385dab2-b612-4b5b-9d13-1f7584df2dec" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="82d45d5a-307c-4ffe-abe0-1de5ab93c2f6" data-file-name="app/page.tsx">Choose Team</span></Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="skoop-section" data-unique-id="502a2811-62aa-4903-8657-b08bd2f7d247" data-file-name="app/page.tsx">
          <div className="skoop-container max-w-4xl" data-unique-id="44efc897-0891-4071-823b-e7daee29c78d" data-file-name="app/page.tsx">
            <div className="skoop-card p-8 md:p-12 text-center" data-unique-id="37c3abd6-316c-4ec5-ae16-26500a383dd2" data-file-name="app/page.tsx">
              <h2 className="text-2xl md:text-3xl font-bold mb-4" data-unique-id="b788a5ed-26a6-4dfa-8c69-cd512a39f40e" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="896591c9-1ef3-4352-9edc-44cb8ac7c480" data-file-name="app/page.tsx">Ready to organize your digital knowledge?</span></h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto" data-unique-id="b3946850-2935-4e25-829a-31bd6262e03d" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="89bc8987-8884-4a2b-aa30-41298a3ecd73" data-file-name="app/page.tsx">
                Join thousands of developers, designers, and researchers who are using SKOOP to make the most of their saved content.
              </span></p>
              <div className="flex flex-col sm:flex-row justify-center gap-4" data-unique-id="fa5275c1-11dd-4470-a8a5-490d2ab503a0" data-file-name="app/page.tsx">
                <Button className="skoop-button-accent" size="lg" data-unique-id="2e048159-74bd-4972-a786-f1e82a7b2465" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="33878a8b-d641-4f59-88db-94d1c1371902" data-file-name="app/page.tsx">Get Started for Free</span></Button>
                <Button variant="outline" size="lg" data-unique-id="a101b354-cd4b-455f-b45b-1e9320ce00b6" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="897aa418-9641-4748-b094-c94ba2b60b22" data-file-name="app/page.tsx">
                  Request Demo
                </span></Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-secondary bg-opacity-30 border-t border-border py-12" data-unique-id="8476e9ab-0d56-41ac-8995-cdf157c61685" data-file-name="app/page.tsx">
        <div className="skoop-container" data-unique-id="c34676b2-d2e2-4b1c-8280-2ef74f865700" data-file-name="app/page.tsx">
          <div className="grid gap-8 md:grid-cols-4" data-unique-id="216c76e8-7244-4458-9370-f1a044d8b2b3" data-file-name="app/page.tsx">
            <div data-unique-id="1230905b-b69a-4152-a7c1-9f89c6d5fcef" data-file-name="app/page.tsx">
              <div className="text-2xl font-bold text-primary mb-4" data-unique-id="b6b4b966-cb49-4f3a-9838-658e960be16b" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="e601ebd0-6c0d-4d1f-a2e3-6626e9add80d" data-file-name="app/page.tsx">SKOOP</span></div>
              <p className="text-muted-foreground text-sm" data-unique-id="1fee9146-a38f-4375-83b8-818ec6c4c973" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="62915943-f748-4409-9c5b-ada911fb5f89" data-file-name="app/page.tsx">
                The all-in-one platform for collecting, searching and rediscovering your saved content.
              </span></p>
            </div>

            <div data-unique-id="680f5db6-f032-469c-97d6-a8c5ac8b0141" data-file-name="app/page.tsx">
              <h4 className="font-medium mb-4" data-unique-id="dfa96782-acf5-4d8d-b4c5-e81b0c930153" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="a6d765a7-8765-4f86-9ff9-986cc05fcfb4" data-file-name="app/page.tsx">Product</span></h4>
              <ul className="space-y-2 text-sm text-muted-foreground" data-unique-id="6ef7eb15-daee-47f5-8468-20eaea2435a9" data-file-name="app/page.tsx">
                <li data-unique-id="7a364516-f9e2-487a-962a-0f43c4995500" data-file-name="app/page.tsx"><Link href="#features" className="hover:text-primary transition-colors" data-unique-id="8cbf1c7b-f8f0-4349-bf2f-730a72aabb1b" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="23c01e97-61bf-408a-9d6e-7011c37dd21e" data-file-name="app/page.tsx">Features</span></Link></li>
                <li data-unique-id="9184bf5e-4262-485b-ad40-c728f5d307ac" data-file-name="app/page.tsx"><Link href="#pricing" className="hover:text-primary transition-colors" data-unique-id="97b1ddd5-116b-4a38-a4fc-e022cc2e4b7c" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="50057f92-344e-4587-8a85-2c2e6a6bf862" data-file-name="app/page.tsx">Pricing</span></Link></li>
                <li data-unique-id="dd93c913-0337-41c4-9bee-920fb69dd71c" data-file-name="app/page.tsx"><Link href="/dashboard" className="hover:text-primary transition-colors" data-unique-id="3ed1ba43-c0e7-4cfb-bfd4-f52328f3132d" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="805f99f4-f01c-462f-bb7c-9ea7a276c928" data-file-name="app/page.tsx">Dashboard</span></Link></li>
                <li data-unique-id="69c9ed3c-7a59-4526-8b13-570637db0199" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="bd8c41e0-ef8c-4bf6-bb88-e4dc2c08d944" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="333eb7cb-601c-4f66-baaa-7253c0cfd3aa" data-file-name="app/page.tsx">Integrations</span></Link></li>
                <li data-unique-id="7db41b1b-508c-4dcc-bb76-70d36cbda1be" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="31b9106f-b749-4152-952a-3d92af95b76c" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="379a8eef-899e-4a82-9f11-c6c1089e4e75" data-file-name="app/page.tsx">Changelog</span></Link></li>
              </ul>
            </div>

            <div data-unique-id="0db4c6cb-7eed-461a-ab66-101c1f4ab3f3" data-file-name="app/page.tsx">
              <h4 className="font-medium mb-4" data-unique-id="a165234b-8792-416a-ba83-044cb0aea5b6" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="b53d1ab0-81a8-40a8-824f-43c0468caf9b" data-file-name="app/page.tsx">Resources</span></h4>
              <ul className="space-y-2 text-sm text-muted-foreground" data-unique-id="84db6c2e-6d72-469f-89d6-42a2206c23eb" data-file-name="app/page.tsx">
                <li data-unique-id="dfef7879-7ae9-4c58-b068-7d2e64d38fa2" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="ccafd848-920f-43c5-9345-064d5e59a73f" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="148371fa-45fb-494f-9456-ef57136fa620" data-file-name="app/page.tsx">Documentation</span></Link></li>
                <li data-unique-id="ca17bf96-548b-4e0c-aa42-b76776b3d723" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="70a47055-ca2e-4320-8252-ad8fcda00486" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="aced274b-7113-4d97-b696-d95282410d7a" data-file-name="app/page.tsx">API</span></Link></li>
                <li data-unique-id="d4fcb26c-2baa-4ca3-8704-c3bb253d907d" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="8e6298b2-5254-438a-9609-2c62b1c976d0" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="2bab62d7-08df-4a05-a4f6-50dcd033fe36" data-file-name="app/page.tsx">Guides</span></Link></li>
                <li data-unique-id="73a6eaf6-b457-4747-8c4b-57582ba16e5e" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="008b52f9-0027-4c4e-9870-133e67e2d75e" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="bb5d07fe-be5a-453e-8036-1e7d0f7d798d" data-file-name="app/page.tsx">Help Center</span></Link></li>
              </ul>
            </div>

            <div data-unique-id="66be9303-8d28-4359-81de-6bf56f5f226b" data-file-name="app/page.tsx">
              <h4 className="font-medium mb-4" data-unique-id="76424954-402d-4c88-8895-59636bbf1f6b" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="bc031cbd-66da-4cbc-a7cb-fbc40a6d7759" data-file-name="app/page.tsx">Company</span></h4>
              <ul className="space-y-2 text-sm text-muted-foreground" data-unique-id="1ff50bda-9cb0-47da-85c9-bdc67a63a9f0" data-file-name="app/page.tsx">
                <li data-unique-id="f134d51a-88e4-4f1a-905d-640a7c3b3b7f" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="fadee255-0164-4896-9757-27b47ceb754b" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="0a4e7eb4-6c81-44a3-87f0-24e92935ad6d" data-file-name="app/page.tsx">About</span></Link></li>
                <li data-unique-id="441f20fc-dee5-4344-81eb-044ac6b524b8" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="f3070a45-add7-4976-b72e-c7063a2f1a8d" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="533c422a-4287-4338-bc33-3a0845a38a5d" data-file-name="app/page.tsx">Blog</span></Link></li>
                <li data-unique-id="1e7c3387-f8ed-4843-8607-fd5ff8c38394" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="ed34a828-3dae-48de-a2b5-7db734d12cfb" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="5510921e-7bbe-4e23-a7b7-8b1e5ea0459f" data-file-name="app/page.tsx">Careers</span></Link></li>
                <li data-unique-id="210a24dc-61bc-4086-aafd-4d0629124f45" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="b9cd6aeb-6096-41d8-8709-2bc153e06ffd" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="462930ef-544a-46b9-a2a8-ddd5526a0943" data-file-name="app/page.tsx">Contact</span></Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center" data-unique-id="f7d701f1-5917-4f9c-8d4a-c313d25e4e74" data-file-name="app/page.tsx">
            <div className="text-sm text-muted-foreground" data-unique-id="9ccec6f4-ceaa-45a3-950a-67d0f7a75714" data-file-name="app/page.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="393706f5-8f9e-4190-b2a4-9a220c4acf4c" data-file-name="app/page.tsx">
              © </span>{new Date().getFullYear()}<span className="editable-text" data-unique-id="1ff39678-4f65-4e79-8a1f-975921f6de75" data-file-name="app/page.tsx"> SKOOP. All rights reserved.
            </span></div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0" data-unique-id="03b3e485-592a-4548-a9fd-30ab53bb0abd" data-file-name="app/page.tsx">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors" data-unique-id="633a6449-be05-4b03-bea0-10f6fa9088a5" data-file-name="app/page.tsx">
                <span className="sr-only" data-unique-id="b40cd3b3-c088-4476-acfc-ff31b9dbdd42" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="52b817f6-d13c-4dcd-b962-84ea18d63365" data-file-name="app/page.tsx">Twitter</span></span>
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors" data-unique-id="30484986-1f64-449f-82fc-929e0eda3ef4" data-file-name="app/page.tsx">
                <span className="sr-only" data-unique-id="cd645163-8eac-486c-a053-e2c14c5f0fa5" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="2230e11a-4589-4d0c-a0f8-6abd6413c63d" data-file-name="app/page.tsx">GitHub</span></span>
                <Github className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>;
}