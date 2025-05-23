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
  loading: () => <div className="w-full max-w-[640px] mx-auto h-[100px] bg-white dark:bg-card rounded-xl border border-[#E5E7EB] dark:border-border animate-pulse" data-unique-id="3ee9caa6-3ce3-4c6e-a1b9-4dc8a3a1a051" data-file-name="app/page.tsx"></div>
});
export default function HomePage() {
  return <div className="min-h-screen flex flex-col" data-unique-id="226714b8-edb8-4b8e-8198-baf251797c60" data-file-name="app/page.tsx" data-dynamic-text="true">
      {/* Header */}
      <header className="border-b border-border relative z-10" data-unique-id="684f913e-e0f1-420d-9ed6-b13f228e2fbc" data-file-name="app/page.tsx">
        <div className="skoop-container flex items-center justify-between h-16" data-unique-id="6f11fed2-67da-4f09-9db9-131dc410c974" data-file-name="app/page.tsx">
          <div className="flex items-center" data-unique-id="e0ce351e-14f1-4ec7-ab48-7cd4191546a6" data-file-name="app/page.tsx">
            <div className="text-2xl font-bold text-primary" data-unique-id="68666bd7-5db8-4a40-9df1-ffe0a753e120" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="a9a3d041-3ed0-46ea-aafd-93511c16568e" data-file-name="app/page.tsx">SKOOP</span></div>
            <nav className="hidden ml-12 space-x-6 lg:flex" data-unique-id="c61b5aa6-1473-4f62-8a93-844086fb38b3" data-file-name="app/page.tsx">
              <Link href="#features" className="text-foreground hover:text-primary transition-colors" data-unique-id="d50f2de8-a56e-43e0-bf4e-6180c8d468e4" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="506eecc5-d5e4-4067-9c61-f25447dfb7fb" data-file-name="app/page.tsx">Features</span></Link>
              <Link href="#pricing" className="text-foreground hover:text-primary transition-colors" data-unique-id="20adceff-32bd-4712-ad82-d5e4e2a92023" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="ec6e98da-328d-46d4-a61a-4911a1c67a7d" data-file-name="app/page.tsx">Pricing</span></Link>
              <Link href="#faq" className="text-foreground hover:text-primary transition-colors" data-unique-id="f60284c0-1d08-48ff-959d-655a8da914d3" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="04b802c6-afab-4c56-8837-b0e7fac9af44" data-file-name="app/page.tsx">FAQ</span></Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4" data-unique-id="ed91b48f-946f-47f7-823f-acfe8e4c4f94" data-file-name="app/page.tsx">
            <ThemeToggle />
            <a href="/dashboard" className="text-foreground hover:text-primary transition-colors" data-unique-id="2dc2126b-6ab7-4a23-bcfa-694e295e3eb7" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="2d9a0aa9-3b37-4450-af03-1fc1801d3d41" data-file-name="app/page.tsx">Dashboard</span></a>
            <a href="/login" className="text-foreground hover:text-primary transition-colors" data-unique-id="3ea8a234-8286-497e-958f-0bc75d0c05ba" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="8cac8b7c-30d4-4097-80b2-7f86ffcb17b7" data-file-name="app/page.tsx">Log in</span></a>
            <Button className="skoop-button-accent" data-unique-id="dd1dca14-bc9d-4d3c-b40c-1083c6f338ff" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="236586d3-a5eb-4161-a16c-aa7b9400aad2" data-file-name="app/page.tsx">Sign Up Free</span></Button>
          </div>
        </div>
      </header>

      <main className="flex-grow" data-unique-id="cb7152b5-8c8c-47ab-86fc-7d87713dadcf" data-file-name="app/page.tsx" data-dynamic-text="true">
        {/* Hero Section with Aurora Background */}
        <section className="relative overflow-hidden" data-unique-id="f8a2f52d-2168-4b8f-9c23-c5ffe794f97f" data-file-name="app/page.tsx">
          <AuroraBackground className="absolute inset-0">
            <div className="absolute inset-0 bg-background/40 backdrop-blur-sm" data-unique-id="4a8db363-1ab4-4a7c-833c-c96be6bc5d99" data-file-name="app/page.tsx" />
          </AuroraBackground>
          
          <div className="skoop-section relative z-10" data-unique-id="b2ebd208-04e4-4033-be65-f992d9f8f0cb" data-file-name="app/page.tsx">
          <div className="skoop-container" data-unique-id="068749a7-5cca-4df6-93a1-589cf1df11f4" data-file-name="app/page.tsx" data-dynamic-text="true">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-24 items-center" data-unique-id="7ef8f513-0500-49e2-b19a-706e537facc6" data-file-name="app/page.tsx">
              <div data-unique-id="f2e1a14d-e019-4a56-a6ee-c8bf53350262" data-file-name="app/page.tsx">
                <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl mb-6" data-unique-id="109a8702-6fb0-4124-a941-7898d8f6da26" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="3702d48b-fe32-4355-97d0-855c76111d66" data-file-name="app/page.tsx">
                  Collect, search and </span><span className="text-primary" data-unique-id="36db07a6-3ff3-403a-b57d-9d8a72aa708a" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="8d4153d6-e9e4-4155-8ca3-d6e557793613" data-file-name="app/page.tsx">rediscover</span></span><span className="editable-text" data-unique-id="04f41642-17be-4cb2-b5a2-4e6e57a0ff23" data-file-name="app/page.tsx"> your saved content
                </span></h1>
                <p className="text-lg text-muted-foreground mb-8" data-unique-id="e875afec-3ca7-4e83-b931-f8bfa1919467" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="2d5785fd-b2a4-49d8-b534-47b0bcf0dde1" data-file-name="app/page.tsx">
                  One calm space for all your saved tweets, GitHub stars, Reddit posts, and Stack Overflow favorites.
                </span></p>
                <div className="flex flex-col sm:flex-row gap-4" data-unique-id="12f4aa14-da57-4021-b436-f3cf2a8ce47a" data-file-name="app/page.tsx">
                  <Button className="skoop-button-accent" size="lg" data-unique-id="7162ca2a-5e12-4582-9e3a-18f03d9c004b" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="c3739155-560c-4959-9e66-530d4bac9840" data-file-name="app/page.tsx">Get Started</span></Button>
                  <Button variant="outline" size="lg" className="group" data-unique-id="23995a17-ccff-47cb-9e30-a31fd68d6e8f" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="875e5441-55a5-4c27-8b14-7f840ed45e52" data-file-name="app/page.tsx">
                    How It Works
                    </span><ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
                <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground" data-unique-id="a5bf4ec5-b2de-45be-bdcc-abf8d51e0eda" data-file-name="app/page.tsx">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span data-unique-id="b9cf8cf9-15dd-46c4-ac8c-d79e04d47d51" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="01b34a5e-0b70-4697-adeb-761d09e12b3e" data-file-name="app/page.tsx">No credit card required</span></span>
                </div>
              </div>
              <div className="relative" data-unique-id="e308670c-9672-438c-ac14-7af1e3b092a0" data-file-name="app/page.tsx" data-dynamic-text="true">
                <div className="skoop-card overflow-hidden" data-unique-id="b8f9bb89-2f9e-4f98-ad0a-60b6c8294966" data-file-name="app/page.tsx">
                  <Image src="https://images.unsplash.com/photo-1508921340878-ba53e1f016ec?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3" alt="SKOOP Dashboard" width={600} height={400} className="w-full h-auto rounded-t-[var(--radius)]" data-unique-id="4efadf4c-2d04-4d47-8661-972ec2850374" data-file-name="app/page.tsx" />
                  <div className="p-6" data-unique-id="1b76d1ac-3adf-4d31-8d59-28ba331361b7" data-file-name="app/page.tsx">
                    <div className="flex items-center justify-between mb-4" data-unique-id="1978f7e4-3d41-49ed-be06-275d05624598" data-file-name="app/page.tsx">
                      <div className="font-semibold" data-unique-id="fa598250-69d0-4505-9243-8dbc10c3ed5e" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="6e34052c-dd9c-4e0f-b020-e83971f595e6" data-file-name="app/page.tsx">Recent Saves</span></div>
                      <Search className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="space-y-3" data-unique-id="30b106fe-dab8-4453-8a8b-dad4632a7a8a" data-file-name="app/page.tsx" data-dynamic-text="true">
                      {[1, 2, 3].map(i => <div key={i} className="flex items-center gap-3 p-3 rounded-md bg-secondary/50" data-unique-id="7d9d868c-a31e-47bf-be72-97b84bf225fd" data-file-name="app/page.tsx" data-dynamic-text="true">
                          {i === 1 && <Github className="h-5 w-5 text-foreground" />}
                          {i === 2 && <Twitter className="h-5 w-5 text-foreground" />}
                          {i === 3 && <StackOverflow className="h-5 w-5 text-foreground" />}
                          <div className="flex-grow" data-unique-id="8c7bb120-1000-41af-acf1-5b38bf6c2440" data-file-name="app/page.tsx">
                            <div className="text-sm font-medium truncate" data-unique-id="13e2c92f-5272-4525-ab4b-c2baf27fff3f" data-file-name="app/page.tsx" data-dynamic-text="true">
                              {i === 1 && "Interesting open source project for data visualization"}
                              {i === 2 && "Thread: 10 tips for better React performance"}
                              {i === 3 && "How to optimize PostgreSQL queries for large datasets"}
                            </div>
                            <div className="text-xs text-muted-foreground mt-0.5" data-unique-id="c944c9c9-b164-4dd0-9e93-d4637de2404e" data-file-name="app/page.tsx" data-dynamic-text="true">
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
                <div className="absolute -left-8 top-1/2 bg-card p-3 rounded-full shadow-lg border border-border hidden lg:block" data-unique-id="c9986830-d26b-4965-9edf-43754bbcf798" data-file-name="app/page.tsx">
                  <Github className="h-6 w-6 text-primary" />
                </div>
                <div className="absolute -right-8 bottom-1/3 bg-card p-3 rounded-full shadow-lg border border-border hidden lg:block" data-unique-id="907fa787-283a-44aa-8811-6c6d8958bf72" data-file-name="app/page.tsx">
                  <Twitter className="h-6 w-6 text-accent" />
                </div>
              </div>
            </div>

            {/* Logos */}
            <div className="mt-20" data-unique-id="ca95d1cc-64bb-4471-a62f-3a1ac6042a49" data-file-name="app/page.tsx">
              <p className="text-center text-sm text-muted-foreground mb-6" data-unique-id="26386851-5ea2-4971-86d5-ad7de6b030c2" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="4c6a045f-566b-4f22-a261-e3ba26a0badd" data-file-name="app/page.tsx">
                Connect with your favorite platforms
              </span></p>
              <div className="flex justify-center items-center flex-wrap gap-8 md:gap-12" data-unique-id="ec34b288-53e0-486f-92fb-60702859ed83" data-file-name="app/page.tsx">
                <Github className="h-8 w-8 text-muted-foreground" />
                <Twitter className="h-8 w-8 text-muted-foreground" />
                <StackOverflow className="h-8 w-8 text-muted-foreground" />
                <div className="text-muted-foreground text-xl font-semibold" data-unique-id="95b74df6-7b9d-4581-90d0-bebaaa748985" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="1ec42efc-cfda-47b7-9775-8afa4bc6082e" data-file-name="app/page.tsx">Reddit</span></div>
                <div className="text-muted-foreground text-xl font-semibold" data-unique-id="35f0883e-298b-448f-99d5-1d9174c52f97" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="8e7936ea-3340-41d0-bf64-f1741f05d8f5" data-file-name="app/page.tsx">DEV</span></div>
              </div>
            </div>
          </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="skoop-section" data-unique-id="0d8349de-95b0-4b24-8ad2-4305f7557cf3" data-file-name="app/page.tsx">
          <div className="skoop-container" data-unique-id="fe7d231c-86a0-4cb0-b6af-b44d21bf4c63" data-file-name="app/page.tsx">
            <div className="text-center mb-16" data-unique-id="03bd5cee-77aa-4967-9bfa-e571a7450a3b" data-file-name="app/page.tsx">
              <h2 className="text-3xl font-bold mb-4" data-unique-id="19ddfe53-b6e0-4ae7-8a45-4dc3ac23bbec" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="f4a61df4-7ee1-4459-9005-e3291c66562b" data-file-name="app/page.tsx">Finally, a place for all your saved content</span></h2>
              <p className="text-muted-foreground max-w-2xl mx-auto" data-unique-id="7c45a9a5-abb4-401a-976f-4251bda0111f" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="ea9702b8-334f-46e9-a73f-db2c8219311f" data-file-name="app/page.tsx">
                SKOOP solves the problem of fragmented saves and makes it easy to find what you need when you need it.
              </span></p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3" data-unique-id="4cc61424-1b91-4706-9e6e-118947ec566a" data-file-name="app/page.tsx" data-dynamic-text="true">
              {/* Feature 1 */}
              <div className="skoop-card p-6" data-unique-id="18d9b079-7448-4109-bb49-e14cf02c6d66" data-file-name="app/page.tsx">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary bg-opacity-10 mb-4" data-unique-id="46d4e273-bf5a-4d64-bb05-4637d988567b" data-file-name="app/page.tsx">
                  <Bookmark className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3" data-unique-id="f1ba133d-3305-49f2-8fa4-f20c65ab8c18" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="1dc45f20-f454-470f-86e5-90800beb87b6" data-file-name="app/page.tsx">Unified Collection</span></h3>
                <p className="text-muted-foreground mb-4" data-unique-id="1867a1e6-682d-4a8b-a8d9-b6d96625f1d7" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="a6e1e3f9-fe24-4c86-ab47-ea5b447479de" data-file-name="app/page.tsx">
                  Import and sync all your saved content from GitHub, Twitter, Reddit, and Stack Overflow in one place.
                </span></p>
                <div className="pt-4 border-t border-border mt-auto" data-unique-id="c49c101a-42b4-4e8b-afa1-01a3d5b7fe68" data-file-name="app/page.tsx">
                  <Link href="#" className="inline-flex items-center text-primary hover:underline" data-unique-id="b341fdd5-edc2-4bd1-aa60-4b8944337a6a" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="56aed5e0-3fe4-43e1-a7ce-20ad6d7efdc4" data-file-name="app/page.tsx">
                    Learn more </span><ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="skoop-card p-6" data-unique-id="e0e19868-75b7-4ef7-b26b-f87c9b9042cd" data-file-name="app/page.tsx">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-accent bg-opacity-10 mb-4" data-unique-id="f02c172e-512a-49f0-91c2-d17306ebf0b1" data-file-name="app/page.tsx">
                  <Search className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3" data-unique-id="c5f4b03c-d6cc-42dd-9e33-347711b2e594" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="2275e596-90f9-49a7-aaa8-1d6ea0a169cf" data-file-name="app/page.tsx">Semantic Search</span></h3>
                <p className="text-muted-foreground mb-4" data-unique-id="86b5a1fd-0567-466d-8699-6ab97ad23cc3" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="70882ce6-7d62-4684-8c2a-770ab85f9a94" data-file-name="app/page.tsx">
                  Find what you're looking for with powerful semantic search that understands the meaning behind your queries.
                </span></p>
                <div className="pt-4 border-t border-border mt-auto" data-unique-id="6e8f1a4d-4406-4419-946a-bbe893f7ed4f" data-file-name="app/page.tsx">
                  <Link href="#" className="inline-flex items-center text-primary hover:underline" data-unique-id="4c3d3911-01cc-4325-8cad-aca7bb71aaa1" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="f0d75e38-8c97-41f4-8442-a2fac14ac5cb" data-file-name="app/page.tsx">
                    Learn more </span><ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="skoop-card p-6" data-unique-id="2a541980-6dbc-466d-a42c-69d5358659ad" data-file-name="app/page.tsx">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-destructive bg-opacity-10 mb-4" data-unique-id="83fc7c78-66ab-4f24-9c22-1b36d110d60d" data-file-name="app/page.tsx">
                  <Collection className="h-6 w-6 text-destructive" />
                </div>
                <h3 className="text-xl font-semibold mb-3" data-unique-id="d857cc1e-f0aa-4ace-8b8f-225657a7fc51" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="0b56aa34-9f64-406e-8e5f-8259dea6f4ce" data-file-name="app/page.tsx">Smart Collections</span></h3>
                <p className="text-muted-foreground mb-4" data-unique-id="31a44da2-0aa1-450c-9c31-b8c1d2745084" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="6f071eda-c205-4d46-a027-ef7dd918e0cf" data-file-name="app/page.tsx">
                  Organize your content with automated collections that group similar items together and surface the best content.
                </span></p>
                <div className="pt-4 border-t border-border mt-auto" data-unique-id="7b4c5cfc-6c78-4029-9701-d6eca9251b2c" data-file-name="app/page.tsx">
                  <Link href="#" className="inline-flex items-center text-primary hover:underline" data-unique-id="5c29435d-8078-4924-ba1e-67b066f541da" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="2487ac7f-2319-4213-93dc-fd6ef285d68d" data-file-name="app/page.tsx">
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
      }} data-unique-id="127ce28c-1050-4c8e-99d0-92e93218b0b5" data-file-name="app/page.tsx">
          <div className="skoop-container" data-unique-id="9e6e58c7-2165-465a-aeec-a1386744e556" data-file-name="app/page.tsx">
            <div className="text-center mb-12" data-unique-id="684043a6-ba0b-47f1-b7b7-74655dfb3227" data-file-name="app/page.tsx">
              <h2 className="text-3xl font-bold mb-4" data-unique-id="1680003e-ffe6-4b41-95b6-33602919be25" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="7081c471-f4c2-413c-be25-c7ff2d59fbde" data-file-name="app/page.tsx">Experience AI-Powered Summaries</span></h2>
              <p className="text-muted-foreground max-w-2xl mx-auto" data-unique-id="9afd3e1e-6ffb-4ddd-98d4-3f715dc8ad5d" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="5409a0e7-0a4d-45fc-832d-4526c4b273db" data-file-name="app/page.tsx">
                SKOOP automatically generates concise, intelligent summaries of your saved content.
                Click to expand below and see it in action.
              </span></p>
            </div>
            
            <div className="mx-auto" data-unique-id="e2da16e2-c81d-4d29-b53e-6b585961c0f6" data-file-name="app/page.tsx" data-dynamic-text="true">
              {/* Import the ExpandableCard component */}
              <ExpandableCard />
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="skoop-section bg-secondary bg-opacity-30" data-unique-id="2d4ac924-d1f6-4634-b362-26efc975af0c" data-file-name="app/page.tsx">
          <div className="skoop-container" data-unique-id="f28eac15-7cbc-4df7-8344-35d6d71cf511" data-file-name="app/page.tsx">
            <div className="text-center mb-16" data-unique-id="041d21d6-fc68-47e7-9755-921d4f090de5" data-file-name="app/page.tsx">
              <h2 className="text-3xl font-bold mb-4" data-unique-id="c88869dc-f95e-4c2a-9b85-f4fc7c1eeb0b" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="ff21e943-b569-4ae8-822f-7fbfeb38c8f9" data-file-name="app/page.tsx">Simple, transparent pricing</span></h2>
              <p className="text-muted-foreground max-w-2xl mx-auto" data-unique-id="ab211cd0-b7d0-4d3d-a2ce-42b7b82296e1" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="b4501129-23b4-4260-acb4-32ed853f97c8" data-file-name="app/page.tsx">
                Choose the plan that fits your needs. All plans include our core features.
              </span></p>
            </div>

            <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto" data-unique-id="419eeaaa-fff7-4693-9adb-3f13ec848c9e" data-file-name="app/page.tsx" data-dynamic-text="true">
              {/* Free Plan */}
              <div className="skoop-card p-6 flex flex-col h-full border border-border" data-unique-id="2ff3037f-ffb0-4db0-81eb-c0e683ac5796" data-file-name="app/page.tsx">
                <div className="mb-6" data-unique-id="1d63c99d-07af-48d5-abe8-8f30334df106" data-file-name="app/page.tsx">
                  <h3 className="text-lg font-medium mb-2" data-unique-id="240911c3-45ac-4262-a875-fee70417fb33" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="dbf64457-c5ed-4217-9042-12f240a0b7a1" data-file-name="app/page.tsx">Free</span></h3>
                  <div className="text-3xl font-bold" data-unique-id="fc69c965-fa13-465b-af74-8d55ca6f62bf" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="dd8520a1-8bbf-45e9-8916-3948d21f446b" data-file-name="app/page.tsx">$0</span><span className="text-muted-foreground text-sm font-normal" data-unique-id="bdfb3788-6321-4ec1-83b3-0f298dc2b46e" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="00648d82-b72a-426b-8070-2311ddb64540" data-file-name="app/page.tsx">/month</span></span></div>
                  <p className="text-muted-foreground text-sm mt-3" data-unique-id="bcb2b777-be93-400e-87b1-5b4b85940cd3" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="a28d9745-2d19-4cff-baf2-e3fb5b95f9d4" data-file-name="app/page.tsx">Perfect for getting started</span></p>
                </div>
                <ul className="space-y-3 mb-8" data-unique-id="642dc90c-f190-41ea-932a-11644e6d1a87" data-file-name="app/page.tsx">
                  <li className="flex items-start" data-unique-id="d7569c0c-460d-46b1-bb5f-025eabd74061" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="086b2f8d-5779-4e2b-b688-6b6b3b850bb9" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="8fb108eb-ecba-406e-b0eb-a2a577137746" data-file-name="app/page.tsx">72h free bookmark storage</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="ea8d6ab4-2333-48a3-8ec4-8282f84a93a1" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="8e0186d2-529b-4d56-a80c-53ba4253d2ac" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="6ef3279c-0e95-4883-ae2e-6f56a8854215" data-file-name="app/page.tsx">2 connected platforms</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="06c8d22d-8738-49e5-9829-6732ba098381" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="70d55fdd-eb30-4805-aef2-1eb3b15b340a" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="12dcd63c-0394-4fb2-9f77-52c3f4865781" data-file-name="app/page.tsx">Basic search</span></span>
                  </li>
                </ul>
                <div className="mt-auto" data-unique-id="cef3af52-f3cd-4a61-b3f4-58dd7f506f37" data-file-name="app/page.tsx">
                  <Button className="w-full skoop-button-primary" data-unique-id="4b8a77b2-a640-4def-b593-8336d59e8ae5" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="12a0563e-d773-4789-a384-5dfa9b5cb6e0" data-file-name="app/page.tsx">Get Started</span></Button>
                </div>
              </div>

              {/* Pro Plan */}
              <div className="skoop-card p-6 flex flex-col h-full border-2 border-primary relative" data-unique-id="e6636a56-bd7a-430b-8ada-bac396455e5c" data-file-name="app/page.tsx">
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-sm font-medium rounded-bl-lg rounded-tr-[calc(var(--radius)-1px)]" data-unique-id="9363e455-7f3b-4118-b6d1-1e1a16e4fa8c" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="048013a6-80a5-49d7-9f2a-63a98163e500" data-file-name="app/page.tsx">
                  Popular
                </span></div>
                <div className="mb-6" data-unique-id="5374e304-3657-4f15-a4dd-674a28e2ca9b" data-file-name="app/page.tsx">
                  <h3 className="text-lg font-medium mb-2" data-unique-id="292375d2-ecf8-45f4-b936-63e6fa95555e" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="22f1c4a5-dba1-47e3-9f55-ebf71fe8bc86" data-file-name="app/page.tsx">Pro</span></h3>
                  <div className="text-3xl font-bold" data-unique-id="583ae8c4-181a-4dc8-a3f3-7d8f6f147e5c" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="571fa7d7-5203-4cb8-b3c2-1da2e4b8c3ba" data-file-name="app/page.tsx">$12</span><span className="text-muted-foreground text-sm font-normal" data-unique-id="9c34e11f-fe7a-4397-b7d0-0bb217bf7f98" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="79b001e0-064a-4121-8a7b-e7ed3c61f448" data-file-name="app/page.tsx">/month</span></span></div>
                  <p className="text-muted-foreground text-sm mt-3" data-unique-id="2e5a3e1f-c488-42bf-8136-c19f94422bcb" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="cc291ab4-8f66-42b2-97c0-b88dc0909c5e" data-file-name="app/page.tsx">For power users</span></p>
                </div>
                <ul className="space-y-3 mb-8" data-unique-id="3bfa2ac7-81c9-4f51-8492-ce7f3a863a8a" data-file-name="app/page.tsx">
                  <li className="flex items-start" data-unique-id="82a47604-4a08-4e2d-b08e-a8bae11a546c" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="f9d157cf-4987-4a58-8b02-5a330bfe2d51" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="a3490635-2bfc-4273-92d7-92b222dc7917" data-file-name="app/page.tsx">Unlimited saved items</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="0bd09ac2-ab7e-4331-9271-905d2e700e88" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="344d84e5-3a5e-4526-979d-e7afdf9982fa" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="ef614f5d-8e2f-435a-a6f7-1e4a13371b61" data-file-name="app/page.tsx">All platforms</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="34e3274f-d0af-40e2-a7fa-753259a24371" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="14b8bde4-7a0f-4dfc-a984-181f89ab4a91" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="39163c37-b349-4538-9faa-31b57e919582" data-file-name="app/page.tsx">Advanced semantic search</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="37679a52-a255-43e3-9a97-b13442edd47b" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="7285f93f-1653-488e-be0a-3b1064acb7b5" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="180355f5-aa0e-4a59-9b8c-0320756d0ab4" data-file-name="app/page.tsx">AI summary</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="e8f1a515-bf6a-44d3-a290-ad90b9d828c8" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="9e387d4f-5545-4d6e-ae6c-d9bd6d25646a" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="76ea363e-5d9d-4b36-8da8-a94cb0de6b74" data-file-name="app/page.tsx">Smart collections</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="8ed66c91-639f-48a8-85bd-10c8179cb6f7" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="a613edcb-6122-4ca7-830b-2d7b2287a267" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="ea0037d8-57bd-45ad-a9c5-55c93a1045f9" data-file-name="app/page.tsx">15-minute sync</span></span>
                  </li>
                </ul>
                <div className="mt-auto" data-unique-id="739f411c-bb3b-4dd1-9aa4-c06192487393" data-file-name="app/page.tsx">
                  <Button className="w-full skoop-button-accent" data-unique-id="c346a911-61be-4f63-8df4-8618c180bcce" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="343f4e7c-257b-4d36-99b6-b380d6c83c01" data-file-name="app/page.tsx">Choose Pro</span></Button>
                </div>
              </div>

              {/* Power Plan (formerly Team) */}
              <div className="skoop-card p-6 flex flex-col h-full border border-border" data-unique-id="b313cc7d-15b8-4108-a784-13c0ea2cd1a1" data-file-name="app/page.tsx">
                <div className="mb-6" data-unique-id="9f964454-b496-46e1-af43-17d92890887a" data-file-name="app/page.tsx">
                  <h3 className="text-lg font-medium mb-2" data-unique-id="ac9e9769-750f-4229-ac75-b6b3ba6bcff2" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="e1ef6451-610f-4c6c-b166-655b6cc45958" data-file-name="app/page.tsx">Power</span></h3>
                  <div className="text-3xl font-bold" data-unique-id="8334adde-9343-4501-8429-0312318906d2" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="b31f1674-5524-4bb8-9d0d-441038e28e9f" data-file-name="app/page.tsx">$19</span><span className="text-muted-foreground text-sm font-normal" data-unique-id="910672cd-25d0-4bc8-af62-b781edc5d6c0" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="07612cf3-55a3-4b59-b5e1-c872716078ae" data-file-name="app/page.tsx">/month</span></span></div>
                  <p className="text-muted-foreground text-sm mt-3" data-unique-id="04b469b6-69b6-4870-8267-b84129b8e09a" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="fd627975-d64a-42ef-bb5f-6d64639293b3" data-file-name="app/page.tsx">Collaborate with your team</span></p>
                </div>
                <ul className="space-y-3 mb-8" data-unique-id="5b69522d-608c-4cd1-abbc-ae9292ab0cca" data-file-name="app/page.tsx">
                  <li className="flex items-start" data-unique-id="72857c48-2ce0-4d0d-8228-18791810828e" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="2a87eaac-5515-4b60-bdb4-8cac4571ff19" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="e09fa892-80f5-43c8-83cf-db244adf0699" data-file-name="app/page.tsx">Everything in Pro</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="bd42af2b-28a5-41a4-8e19-e8b9f35ecfd9" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="ab89c665-5ad1-45b6-94c3-e1dc3df54a58" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="3ad08241-2819-464e-b38e-3ced7f9304c0" data-file-name="app/page.tsx">5 team members</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="dfb823f9-81d9-407d-a33a-6a89a9fe78cd" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="101998b6-db29-4a6a-8be4-fa6419dc1ed6" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="de948e2e-c167-4ec6-ab31-9fa06639fdea" data-file-name="app/page.tsx">Shared collections</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="8338f117-ea2f-4822-ab09-bca5b5ae1e9f" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="ade555e2-15b4-407f-bcdc-9fab4a2a8207" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="efa317da-0070-43ca-90f0-dcd05222194b" data-file-name="app/page.tsx">Skoop Content columns</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="3212147c-c9c2-4e65-8cfb-1279d8c7f91f" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="72f0d8c2-5807-4e7f-804e-8ef795eccfe7" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="1819112d-1c15-4e26-beea-747765af3bac" data-file-name="app/page.tsx">Collaboration tools</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="4035a7f9-34f3-4cdf-87e9-6b308928f106" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="0c7c52f4-b42b-4e45-bcf9-34716abac5a5" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="25f371de-9798-4c2b-b936-77b419b874a9" data-file-name="app/page.tsx">Advanced analytics</span></span>
                  </li>
                </ul>
                <div className="mt-auto" data-unique-id="6fdf8d4e-cf7a-472e-80b8-449d6f994337" data-file-name="app/page.tsx">
                  <Button className="w-full skoop-button-primary" data-unique-id="b3a9810f-96a2-47d7-a2b4-d3c6d4621717" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="829720e7-1032-4f60-a2b3-4f67f7907638" data-file-name="app/page.tsx">Choose Power</span></Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="skoop-section" data-unique-id="cbe5e1ab-ff66-4bf9-9f79-525b1e79f3ed" data-file-name="app/page.tsx">
          <div className="skoop-container max-w-4xl" data-unique-id="716ae3b8-3f9e-4f8c-a190-bb8660fb7ef1" data-file-name="app/page.tsx">
            <div className="skoop-card p-8 md:p-12 text-center" data-unique-id="efee7e1b-65db-48f9-a34f-07da6559c9b0" data-file-name="app/page.tsx">
              <h2 className="text-2xl md:text-3xl font-bold mb-4" data-unique-id="3f6b7ffe-1b41-458b-8313-d376664c8087" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="2372112b-a37a-41c7-a970-66fc49587d8c" data-file-name="app/page.tsx">Ready to organize your digital knowledge?</span></h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto" data-unique-id="7710e5a2-22c8-452a-9bf9-3267e4e6d118" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="af05945d-4192-4b48-8fd6-ebab3241c6ad" data-file-name="app/page.tsx">
                Join thousands of developers, designers, and researchers who are using SKOOP to make the most of their saved content.
              </span></p>
              <div className="flex flex-col sm:flex-row justify-center gap-4" data-unique-id="55b7f608-6394-44e6-a7fe-0cbd8ea0d490" data-file-name="app/page.tsx">
                <Button className="skoop-button-accent" size="lg" data-unique-id="b65b1556-28f6-4e8b-8997-ea7428128b6c" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="b88a7c70-1c02-4ce3-80ab-feddc93b2695" data-file-name="app/page.tsx">Get Started for Free</span></Button>
                <Button variant="outline" size="lg" data-unique-id="f0c0baa0-a6ad-4c93-8f59-6bc0c2ee8e95" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="53310453-52f3-481b-ae6e-d4e9c6aa4b04" data-file-name="app/page.tsx">
                  Request Demo
                </span></Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-secondary bg-opacity-30 border-t border-border py-12" data-unique-id="8eacbf8b-0a98-4ea8-b493-fae3f5f47010" data-file-name="app/page.tsx">
        <div className="skoop-container" data-unique-id="4e40e7c1-ba0e-4a8b-bfc4-e5c6dc49b0a9" data-file-name="app/page.tsx">
          <div className="grid gap-8 md:grid-cols-4" data-unique-id="c07f7782-d246-44d0-9131-555380a069b4" data-file-name="app/page.tsx">
            <div data-unique-id="09074874-fd76-42be-8756-34d677e71383" data-file-name="app/page.tsx">
              <div className="text-2xl font-bold text-primary mb-4" data-unique-id="9cf6accf-1735-4441-86c8-6aa6b19fe0b0" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="3baddf2d-5ff4-4c01-8de0-db0e2c1738d0" data-file-name="app/page.tsx">SKOOP</span></div>
              <p className="text-muted-foreground text-sm" data-unique-id="6799993c-b9a4-4cbb-831a-0e1aa7c3dad0" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="eefeeb89-1373-4c67-b9be-ea430a0b9d41" data-file-name="app/page.tsx">
                The all-in-one platform for collecting, searching and rediscovering your saved content.
              </span></p>
            </div>

            <div data-unique-id="7352180a-dcf4-42db-a18a-2d03ddf903e6" data-file-name="app/page.tsx">
              <h4 className="font-medium mb-4" data-unique-id="5eab9d3f-97fa-416b-ba0f-f69ce82ea5cf" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="3d651c5b-848e-4e75-b098-bd39ddbd1a27" data-file-name="app/page.tsx">Product</span></h4>
              <ul className="space-y-2 text-sm text-muted-foreground" data-unique-id="779e2c50-657f-4035-a08f-d2347b5a784c" data-file-name="app/page.tsx">
                <li data-unique-id="8bbc79e8-6083-45cf-a350-961b0abead73" data-file-name="app/page.tsx"><Link href="#features" className="hover:text-primary transition-colors" data-unique-id="0717f64a-10bf-4cb6-8aee-e2b570e6e501" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="c77f750d-3823-4da5-acc2-9a70c1443639" data-file-name="app/page.tsx">Features</span></Link></li>
                <li data-unique-id="ae0317df-7949-4929-b641-e59bc4ba9994" data-file-name="app/page.tsx"><Link href="#pricing" className="hover:text-primary transition-colors" data-unique-id="427d775a-5536-4ae4-ac92-f84f0a355528" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="7317ac65-7f1c-4894-8bc9-6a6f9c5ced4b" data-file-name="app/page.tsx">Pricing</span></Link></li>
                <li data-unique-id="94f8877e-a3bc-456b-93b8-3ddffb3290e9" data-file-name="app/page.tsx"><Link href="/dashboard" className="hover:text-primary transition-colors" data-unique-id="18610930-1252-44ef-8839-88baa7e8ed1a" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="0b0bb0ea-93d2-4034-a6b5-412f0174e043" data-file-name="app/page.tsx">Dashboard</span></Link></li>
                <li data-unique-id="b2c885a2-b18f-4362-af4a-453c821b3ad0" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="d64f692a-dc86-4be6-a80d-28317090bdee" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="c8180c17-c2cf-4739-9fff-90c76bccdad4" data-file-name="app/page.tsx">Integrations</span></Link></li>
                <li data-unique-id="b72cd96e-d4b6-4e57-b6b0-ac87e69779e8" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="29e5b2aa-6a88-4984-ab98-5c7c37c71bee" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="2932b64d-f14d-4cdb-b6dd-2e73bf65e51e" data-file-name="app/page.tsx">Changelog</span></Link></li>
              </ul>
            </div>

            <div data-unique-id="af0b4073-05b8-4cac-8ef5-f10eee905f44" data-file-name="app/page.tsx">
              <h4 className="font-medium mb-4" data-unique-id="94ef65b8-398b-43b2-8661-51384579de12" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="9c334daa-392b-4786-ac44-4882e3f7055c" data-file-name="app/page.tsx">Resources</span></h4>
              <ul className="space-y-2 text-sm text-muted-foreground" data-unique-id="ad2054fe-dcfb-4bf4-82b1-624a27ecc912" data-file-name="app/page.tsx">
                <li data-unique-id="0055f691-d37a-4206-89f1-46897b88b838" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="88a6c309-4305-42b3-8c0a-8cf0daa756d0" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="c9faf46b-131c-4b7f-83d4-eb4f31ddca8d" data-file-name="app/page.tsx">Documentation</span></Link></li>
                <li data-unique-id="71b3e3f5-fae6-43e9-a14a-654303bc2acd" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="2c162f78-30fb-4e46-9874-4fead2a938d0" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="fc94367b-b4de-47ef-8082-18f071904cbb" data-file-name="app/page.tsx">API</span></Link></li>
                <li data-unique-id="0b836be1-0824-436c-97e9-286fcdc8df89" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="b0e24178-180d-473b-991b-5962f46982be" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="7aa92d47-eb0b-41c2-8f21-f7be541b4d4c" data-file-name="app/page.tsx">Guides</span></Link></li>
                <li data-unique-id="725f26e2-41f7-4485-9c16-ae239af90c57" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="06daeab8-0448-4d32-991b-a820b3145b95" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="7df3692f-252a-4758-a97e-da1470096058" data-file-name="app/page.tsx">Help Center</span></Link></li>
              </ul>
            </div>

            <div data-unique-id="acb643c1-8bde-46c3-acf4-e7a7fdbcb363" data-file-name="app/page.tsx">
              <h4 className="font-medium mb-4" data-unique-id="197c9684-f662-460a-bb77-9e1dd4198fd9" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="3627742a-41cb-4eec-b2a0-636580bf4762" data-file-name="app/page.tsx">Company</span></h4>
              <ul className="space-y-2 text-sm text-muted-foreground" data-unique-id="b09a7f1a-ce60-4a22-9371-a762b74960b2" data-file-name="app/page.tsx">
                <li data-unique-id="e91898c2-a587-4c7b-a793-3f57d9bae6c6" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="145df64f-39a2-44f8-a03a-da8ac4624990" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="97ce61ff-a6fc-400e-b57a-247ae4c275de" data-file-name="app/page.tsx">About</span></Link></li>
                <li data-unique-id="b6db055a-b0b3-4633-ad0e-5489cbf2cb4f" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="c3e15ac5-eb4a-4ce8-a72d-93cfb48d7caf" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="fe1e4200-a2b0-45a1-a9b0-236d2001650a" data-file-name="app/page.tsx">Blog</span></Link></li>
                <li data-unique-id="27a706a8-543d-4d30-8541-d228e7a5d06c" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="4896f370-bff1-46aa-8c1b-03d587a516bc" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="9e3f7622-223f-4db0-90d8-863de46df315" data-file-name="app/page.tsx">Careers</span></Link></li>
                <li data-unique-id="991c7d23-bb5f-4f13-88ae-51446bb4cdeb" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="26fcb3a3-8b7d-4086-b4d4-fd806a3aab89" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="80a05c89-ce37-447e-9f27-f8dcd6ce2ee1" data-file-name="app/page.tsx">Contact</span></Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center" data-unique-id="b6e99f84-826e-4811-9676-006c5058604e" data-file-name="app/page.tsx">
            <div className="text-sm text-muted-foreground" data-unique-id="4485e307-9fa6-4484-be21-0815f98f0104" data-file-name="app/page.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="89cb0477-1d8d-4e64-9f88-0c6c1d04e1e8" data-file-name="app/page.tsx">
              © </span>{new Date().getFullYear()}<span className="editable-text" data-unique-id="9cb65ab6-9965-4dd2-950d-6ab50c09d3a1" data-file-name="app/page.tsx"> SKOOP. All rights reserved.
            </span></div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0" data-unique-id="740d8fa0-056b-4f8e-87dd-2a022a9493cd" data-file-name="app/page.tsx">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors" data-unique-id="f499220d-6710-4122-968c-89581413125f" data-file-name="app/page.tsx">
                <span className="sr-only" data-unique-id="5380079f-4204-4661-85dd-9745fdd78591" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="0669f01a-d75c-466e-bad9-09a39b28a72c" data-file-name="app/page.tsx">Twitter</span></span>
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors" data-unique-id="803e9493-07b5-4639-8973-030f87ad4499" data-file-name="app/page.tsx">
                <span className="sr-only" data-unique-id="ebd7f818-7d8c-4ec4-b2bb-b2615d0e593f" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="86ce9d6a-b05e-47d4-940c-00abfa7a86ae" data-file-name="app/page.tsx">GitHub</span></span>
                <Github className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>;
}