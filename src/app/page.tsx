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
  loading: () => <div className="w-full max-w-[640px] mx-auto h-[100px] bg-white dark:bg-card rounded-xl border border-[#E5E7EB] dark:border-border animate-pulse" data-unique-id="8984cc32-f4f1-470b-8689-c87f88033ed2" data-file-name="app/page.tsx"></div>
});
export default function HomePage() {
  return <div className="min-h-screen flex flex-col" data-unique-id="9154f801-0a42-48d8-a063-5802c61264e1" data-file-name="app/page.tsx" data-dynamic-text="true">
      {/* Header */}
      <header className="border-b border-border relative z-10" data-unique-id="a9817ac0-ecd2-457f-92cd-4703b62cbea8" data-file-name="app/page.tsx">
        <div className="skoop-container flex items-center justify-between h-16" data-unique-id="5308cc73-7a2d-434d-ad47-202802305732" data-file-name="app/page.tsx">
          <div className="flex items-center" data-unique-id="e68b69a8-649e-40db-90ac-7c65bfce24c9" data-file-name="app/page.tsx">
            <div className="text-2xl logo font-bold text-primary" data-unique-id="c63a328f-9351-4b0c-b3f3-80f6e22f91ef" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="908ea1a3-4217-45de-b6b9-a9ceef116a3e" data-file-name="app/page.tsx">SKOOP</span></div>
            <nav className="hidden ml-12 space-x-6 md:flex" data-unique-id="e925fd59-3e5b-4458-b719-0edded4196b1" data-file-name="app/page.tsx">
              <Link href="#features" className="text-foreground hover:text-primary transition-colors" data-unique-id="df4cab60-293d-4cc2-a213-bd5c786315bf" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="8c145772-a3a6-4213-bd8c-23432540faf6" data-file-name="app/page.tsx">Features</span></Link>
              <Link href="#pricing" className="text-foreground hover:text-primary transition-colors" data-unique-id="0145b519-2d6e-4b36-b585-04563114f2e8" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="7c7a5c93-da4f-4fbb-b8ea-5c5ebca78f6a" data-file-name="app/page.tsx">Pricing</span></Link>
              <Link href="#faq" className="text-foreground hover:text-primary transition-colors" data-unique-id="580ee731-f734-4808-9035-83fb74eabc71" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="237f8bbb-8994-44ea-99e5-f9fbfccdf887" data-file-name="app/page.tsx">FAQ</span></Link>
            </nav>
          </div>
          <div className="flex items-center" data-unique-id="004f8e56-47b4-4c2b-9267-e2e0a1c4e3a6" data-file-name="app/page.tsx">
            <ThemeToggle />
            <div className="hidden md:flex items-center space-x-4 ml-4" data-unique-id="fb46d5a8-0073-4e50-9d2b-494278a21b4e" data-file-name="app/page.tsx">
              <a href="/dashboard" className="text-foreground hover:text-primary transition-colors" data-unique-id="68ad3afc-e791-4da4-8373-978ea141f19e" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="1b1f3191-f6e0-4616-8be3-b28c56eecff3" data-file-name="app/page.tsx">Dashboard</span></a>
              <a href="/login" className="text-foreground hover:text-primary transition-colors" data-unique-id="2283da63-640b-45cb-a988-facfc2ae99e2" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="7d0fe83e-1bce-47e1-bcd3-0965ec9d5676" data-file-name="app/page.tsx">Log in</span></a>
              <Button className="skoop-button-accent" data-unique-id="2627d959-ae43-4328-b4cc-dc00fa8e3e85" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="04ddac26-353e-4dda-8172-e186eb3680ae" data-file-name="app/page.tsx">Sign Up Free</span></Button>
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

      <main className="flex-grow" data-unique-id="cfdc3184-4ca5-4647-a9bb-9e80b67dd7b1" data-file-name="app/page.tsx" data-dynamic-text="true">
        {/* Hero Section with Aurora Background */}
        <section className="relative overflow-hidden" data-unique-id="554edbef-3a90-45e8-a7fb-8a8a2b6b9ee3" data-file-name="app/page.tsx">
          <AuroraBackground className="absolute inset-0">
            <div className="absolute inset-0 bg-background/40 backdrop-blur-sm" data-unique-id="e3308333-6356-496d-8bbb-3c8b80f4a768" data-file-name="app/page.tsx" />
          </AuroraBackground>
          
          <div className="skoop-section relative z-10" data-unique-id="8c64e2a3-2303-4f72-a805-39a7785fe0f6" data-file-name="app/page.tsx">
          <div className="skoop-container" data-unique-id="2f69ac9b-7bd9-4b9b-bd00-82a7e4e2925c" data-file-name="app/page.tsx" data-dynamic-text="true">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-24 items-center" data-unique-id="2ff92d88-254c-46b1-b9a3-b8764a0c5e3c" data-file-name="app/page.tsx">
              <div data-unique-id="e6790c3e-4550-4db7-99a0-46fc515a7bf5" data-file-name="app/page.tsx">
                <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl mb-6" data-unique-id="cde4ffdc-a41b-4fdf-89a3-47ffa1d76239" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="ee940752-42cf-4524-994e-6ad6a61a231a" data-file-name="app/page.tsx">
                  Collect, search and </span><span className="text-primary" data-unique-id="d406e3e5-f2f9-4916-9b87-2834edfb9742" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="fe50e3c2-9aa2-42b0-bc1e-bf1c16a6dbd0" data-file-name="app/page.tsx">rediscover</span></span><span className="editable-text" data-unique-id="3935a80f-3bc9-47e5-ae16-d77070101c60" data-file-name="app/page.tsx"> your saved content
                </span></h1>
                <p className="text-lg text-muted-foreground mb-8" data-unique-id="9a9032e1-21d4-47dc-a98c-55879da37e53" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="2765efdd-758c-4fdc-8029-9878b46d44ed" data-file-name="app/page.tsx">
                  One calm space for all your saved tweets, GitHub stars, Reddit posts, and Stack Overflow favorites.
                </span></p>
                <div className="flex flex-col sm:flex-row gap-4" data-unique-id="6f1e09f2-97ee-4ed4-acf9-7dd78b763458" data-file-name="app/page.tsx">
                  <Button className="skoop-button-accent" size="lg" data-unique-id="c771bef1-8712-4165-bccb-0c36e848484c" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="45acb5f0-cd84-4720-ae25-b228bdca6cf4" data-file-name="app/page.tsx">Get Started</span></Button>
                  <Button variant="outline" size="lg" className="group" data-unique-id="d8df33c0-dde4-4fab-82b0-fd5fb3423114" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="b2134e7d-e53a-4ae9-b639-d82f8ccd5a70" data-file-name="app/page.tsx">
                    How It Works
                    </span><ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
                <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground" data-unique-id="696b723c-7c92-4632-af85-3882f147eb46" data-file-name="app/page.tsx">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span data-unique-id="342b8f22-62e8-48b7-a537-5f8a792219bc" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="fb5541f8-2fcd-4ed7-9b45-fc0cade33efa" data-file-name="app/page.tsx">No credit card required</span></span>
                </div>
              </div>
              <div className="relative" data-unique-id="59f9c76e-a017-4297-82a6-ef324250d563" data-file-name="app/page.tsx" data-dynamic-text="true">
                <div className="skoop-card overflow-hidden" data-unique-id="3267c66e-c030-40eb-9cd6-7ae9ae9b2052" data-file-name="app/page.tsx">
                  <Image src="https://images.unsplash.com/photo-1508921340878-ba53e1f016ec?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3" alt="SKOOP Dashboard" width={600} height={400} className="w-full h-auto rounded-t-[var(--radius)]" data-unique-id="a501c058-98a1-466b-a1e3-d52f1bf4a5ce" data-file-name="app/page.tsx" />
                  <div className="p-6" data-unique-id="ccdcd0c7-c17b-4da2-a163-d7354063136f" data-file-name="app/page.tsx">
                    <div className="flex items-center justify-between mb-4" data-unique-id="7db7ae1e-eba2-4304-ba1e-9f634f188f55" data-file-name="app/page.tsx">
                      <div className="font-semibold" data-unique-id="970bfa46-36b9-4453-b9d1-c180bf3b80f8" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="a4ab4aad-7324-4735-bc27-89281d2512fb" data-file-name="app/page.tsx">Recent Saves</span></div>
                      <Search className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="space-y-3" data-unique-id="c2fb8c29-480c-461b-a700-5b8f943798a7" data-file-name="app/page.tsx" data-dynamic-text="true">
                      {[1, 2, 3].map(i => <div key={i} className="flex items-center gap-3 p-3 rounded-md bg-secondary/50" data-unique-id="aef77754-93ed-4593-95b1-282586e7fa06" data-file-name="app/page.tsx" data-dynamic-text="true">
                          {i === 1 && <Github className="h-5 w-5 text-foreground" />}
                          {i === 2 && <Twitter className="h-5 w-5 text-foreground" />}
                          {i === 3 && <StackOverflow className="h-5 w-5 text-foreground" />}
                          <div className="flex-grow" data-unique-id="ff4d6bd5-692c-44d7-85ef-22c8d8e19f36" data-file-name="app/page.tsx">
                            <div className="text-sm font-medium truncate" data-unique-id="5c0b35fc-340e-4c0d-b489-4f046b17e7c7" data-file-name="app/page.tsx" data-dynamic-text="true">
                              {i === 1 && "Interesting open source project for data visualization"}
                              {i === 2 && "Thread: 10 tips for better React performance"}
                              {i === 3 && "How to optimize PostgreSQL queries for large datasets"}
                            </div>
                            <div className="text-xs text-muted-foreground mt-0.5" data-unique-id="7d2ea0fb-6e10-4123-822f-173b2d0e1b09" data-file-name="app/page.tsx" data-dynamic-text="true">
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
                <div className="absolute -left-8 top-1/2 bg-card p-3 rounded-full shadow-lg border border-border hidden lg:block" data-unique-id="420c4a14-3046-4058-87ca-a1bb886481bc" data-file-name="app/page.tsx">
                  <Github className="h-6 w-6 text-primary" />
                </div>
                <div className="absolute -right-8 bottom-1/3 bg-card p-3 rounded-full shadow-lg border border-border hidden lg:block" data-unique-id="77fccfd0-6bfe-4ccb-a206-182248f58fc5" data-file-name="app/page.tsx">
                  <Twitter className="h-6 w-6 text-accent" />
                </div>
              </div>
            </div>

            {/* Logos */}
            <div className="mt-20" data-unique-id="3762fe3a-9c63-4591-a623-e58613e98dbe" data-file-name="app/page.tsx">
              <p className="text-center text-sm text-muted-foreground mb-6" data-unique-id="fced4929-8193-4b24-8a7a-e2f5159ec61e" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="eac044ed-cf86-43d2-88ce-e28eb44bd9bd" data-file-name="app/page.tsx">
                Connect with your favorite platforms
              </span></p>
              <div className="flex justify-center items-center flex-wrap gap-8 md:gap-12" data-unique-id="c86fef43-60be-4461-8f7a-a74a47499b2d" data-file-name="app/page.tsx">
                <Github className="h-8 w-8 text-muted-foreground" />
                <Twitter className="h-8 w-8 text-muted-foreground" />
                <StackOverflow className="h-8 w-8 text-muted-foreground" />
                <div className="text-muted-foreground text-xl font-semibold" data-unique-id="ccd7a7a8-210f-4f6d-8aa5-c5c6cd6245cd" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="2a86278b-4693-4700-ae36-d9f9fa390659" data-file-name="app/page.tsx">Reddit</span></div>
                <div className="text-muted-foreground text-xl font-semibold" data-unique-id="dbd0aa35-6b86-468c-ba9d-56e57e288188" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="a5c7a9ed-beeb-41f6-8a67-ea2e4dd49e18" data-file-name="app/page.tsx">DEV</span></div>
              </div>
            </div>
          </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="skoop-section" data-unique-id="16fe776b-07d8-4410-9efc-19704e833090" data-file-name="app/page.tsx">
          <div className="skoop-container" data-unique-id="41c59ba3-a1ad-4da1-984b-3909b69dad5c" data-file-name="app/page.tsx">
            <div className="text-center mb-16" data-unique-id="c20e772e-886a-4f2d-a281-006a2e663062" data-file-name="app/page.tsx">
              <h2 className="section-title-sm mb-4" data-unique-id="0820c3a9-6138-4776-8aab-162ee3fa7257" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="cf9821b0-cabd-4e88-89a0-1c69f52eddd1" data-file-name="app/page.tsx">Finally, a place for all your saved content</span></h2>
              <p className="text-muted-foreground max-w-2xl mx-auto" data-unique-id="eb803825-f4df-461a-9848-c6e5bddd5e62" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="2b5fb770-b4f0-42a4-9f1c-27e2d9154738" data-file-name="app/page.tsx">
                SKOOP solves the problem of fragmented saves and makes it easy to find what you need when you need it.
              </span></p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3" data-unique-id="31ea2ad2-ae88-427c-ac0f-74ee25fbf6b6" data-file-name="app/page.tsx" data-dynamic-text="true">
              {/* Feature 1 */}
              <div className="skoop-card p-6" data-unique-id="99245d1e-b06e-4644-9e94-56fefeacbe81" data-file-name="app/page.tsx">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary bg-opacity-10 mb-4" data-unique-id="48b1ff66-a536-4277-9790-f17a1c92afff" data-file-name="app/page.tsx">
                  <Bookmark className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3" data-unique-id="3953be6a-3ed4-4e2e-8770-984d69cbd3b2" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="9585bfa5-da6e-41d6-a0af-f85b568ff5aa" data-file-name="app/page.tsx">Unified Collection</span></h3>
                <p className="text-muted-foreground mb-4" data-unique-id="142b87c2-f0ac-4d5a-a6f1-43f96fa6762c" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="40945fbd-1425-46ad-a98c-4643b3df24dd" data-file-name="app/page.tsx">
                  Import and sync all your saved content from GitHub, Twitter, Reddit, and Stack Overflow in one place.
                </span></p>
                <div className="pt-4 border-t border-border mt-auto" data-unique-id="82f6d8d9-7708-45bd-b842-0a8f94e2a971" data-file-name="app/page.tsx">
                  <Link href="#" className="inline-flex items-center text-primary hover:underline" data-unique-id="2e6fdce7-08a8-468e-bb4e-9d460b593300" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="d656b037-73ec-4340-8012-18b48b669f60" data-file-name="app/page.tsx">
                    Learn more </span><ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="skoop-card p-6" data-unique-id="55e68f80-678b-4651-a03e-f89f1529ddc6" data-file-name="app/page.tsx">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-accent bg-opacity-10 mb-4" data-unique-id="00c3fc33-6b76-4fcc-af3e-48a1a15b3e50" data-file-name="app/page.tsx">
                  <Search className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3" data-unique-id="95947281-2740-43ec-9346-bac220651586" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="6672d77a-e93c-4f01-b23e-8b5453c0b759" data-file-name="app/page.tsx">Semantic Search</span></h3>
                <p className="text-muted-foreground mb-4" data-unique-id="cdb7096b-c23e-47a2-83be-67605d920cf4" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="c59182f3-a68c-4327-b0e0-bc8facd8499a" data-file-name="app/page.tsx">
                  Find what you're looking for with powerful semantic search that understands the meaning behind your queries.
                </span></p>
                <div className="pt-4 border-t border-border mt-auto" data-unique-id="16d4a5d5-5cfd-4162-90ca-3c4572964079" data-file-name="app/page.tsx">
                  <Link href="#" className="inline-flex items-center text-primary hover:underline" data-unique-id="04ace0e4-c396-4314-9b4d-99e3458d87ff" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="fb3adc7c-7f55-416d-b27e-9975e48fd58e" data-file-name="app/page.tsx">
                    Learn more </span><ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="skoop-card p-6" data-unique-id="738426bc-2b82-418b-a0fe-d3357a615f78" data-file-name="app/page.tsx">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-destructive bg-opacity-10 mb-4" data-unique-id="4ab8c996-8c33-45d9-ae56-8b432129fb19" data-file-name="app/page.tsx">
                  <Collection className="h-6 w-6 text-destructive" />
                </div>
                <h3 className="text-xl font-semibold mb-3" data-unique-id="b0c50b15-8cb1-4685-93e9-77df4a71542d" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="8c90ed7c-494a-4dff-a121-786d78a509cb" data-file-name="app/page.tsx">Smart Collections</span></h3>
                <p className="text-muted-foreground mb-4" data-unique-id="47311810-6319-46ef-933f-547a71bcd601" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="6092b51a-3038-4344-821f-e8d5baf02a13" data-file-name="app/page.tsx">
                  Organize your content with automated collections that group similar items together and surface the best content.
                </span></p>
                <div className="pt-4 border-t border-border mt-auto" data-unique-id="0282b054-15ef-41f2-91ce-4ae8a3b3d0b3" data-file-name="app/page.tsx">
                  <Link href="#" className="inline-flex items-center text-primary hover:underline" data-unique-id="e08fff25-2a64-4544-980b-43b721c72966" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="8af09db9-aed3-4952-97c4-2ce6d52ea9dc" data-file-name="app/page.tsx">
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
        <section id="pricing" className="skoop-section bg-secondary bg-opacity-30" data-unique-id="e594f1e7-2c8e-4578-a4da-444eeee82ae7" data-file-name="app/page.tsx">
          <div className="skoop-container" data-unique-id="985b3e27-f596-4bfd-b16f-469d8cfefae6" data-file-name="app/page.tsx">
            <div className="text-center mb-16" data-unique-id="2b87083a-d29c-4d2e-ba29-b8020920e0bd" data-file-name="app/page.tsx">
              <h2 className="section-title-sm mb-4" data-unique-id="8f429f78-ba92-4455-b021-bd66acd15df7" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="de2aa1bb-ff45-4dd9-9bed-d0b549947962" data-file-name="app/page.tsx">Simple, transparent pricing</span></h2>
              <p className="text-muted-foreground max-w-2xl mx-auto" data-unique-id="9a3610ed-58d6-44db-9a8b-9a4c77586194" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="a77724a0-887d-441c-b846-c08a19c908b8" data-file-name="app/page.tsx">
                Choose the plan that fits your needs. All plans include our core features.
              </span></p>
            </div>

            <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto" data-unique-id="a18853e4-7337-4432-a29d-5eac91d85ebe" data-file-name="app/page.tsx" data-dynamic-text="true">
              {/* Free Plan */}
              <div className="skoop-card p-6 flex flex-col h-full border border-border" data-unique-id="e6ee776f-de10-4fbb-9a7f-a9b52cbfc6be" data-file-name="app/page.tsx">
                <div className="mb-6" data-unique-id="6a335988-3d09-4d4c-8810-715b72a13d30" data-file-name="app/page.tsx">
                  <h3 className="text-lg font-medium mb-2" data-unique-id="00da6ee3-1a30-4a3d-b961-1612ee06630c" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="27f32d43-1200-478e-a801-f0150097ccfa" data-file-name="app/page.tsx">Free</span></h3>
                  <div className="text-3xl font-bold" data-unique-id="d5c9b6cd-2ca4-42e5-b690-86e9a4c45e8c" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="474b1869-fca4-4c28-b19b-2b1fcc90a2e2" data-file-name="app/page.tsx">$0</span><span className="text-muted-foreground text-sm font-normal" data-unique-id="86e1e8cf-da50-4f41-b13f-de416f327d86" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="41b21a58-4fa9-463e-80e9-adf15aacf64b" data-file-name="app/page.tsx">/month</span></span></div>
                  <p className="text-muted-foreground text-sm mt-3" data-unique-id="09ae3d08-8d67-4992-9e64-99a0ed4cf0dd" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="92be292c-ca90-4dce-a3b3-d04d8d6f5a45" data-file-name="app/page.tsx">Perfect for getting started</span></p>
                </div>
                <ul className="space-y-3 mb-8" data-unique-id="79f8d913-d605-4a1a-ae18-e06e50ebe20b" data-file-name="app/page.tsx">
                  <li className="flex items-start" data-unique-id="28d41f1b-737a-4fa7-aa07-3de8e931bbab" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="921d01be-99b0-41f2-b3a6-ee625b6e0af3" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="3702f55c-1461-4b29-926f-1e8ad1098918" data-file-name="app/page.tsx">72h free bookmark storage</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="915b07b1-23e5-48fb-8862-7eef0308e134" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="fae7e283-c1a7-488e-81cf-05db214d009f" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="91d1f439-1abc-4109-a6d2-564b5a0dc31a" data-file-name="app/page.tsx">2 connected platforms</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="cf1a53f5-f469-4999-b243-7868b6de50ee" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="636fa6b6-aa7e-4bcd-972f-de67e6e9f562" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="83421944-76a8-4675-8aae-6b9d0a7e2cf6" data-file-name="app/page.tsx">Basic search</span></span>
                  </li>
                </ul>
                <div className="mt-auto" data-unique-id="76871bff-a678-4c1c-84dc-b2cbd68a01a2" data-file-name="app/page.tsx">
                  <Button className="w-full skoop-button-primary" data-unique-id="21d8d549-15ab-4d7a-98d0-487e754e970c" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="640f1027-3b9e-4aa6-a038-af340c6fbc5c" data-file-name="app/page.tsx">Get Started</span></Button>
                </div>
              </div>

              {/* Pro Plan */}
              <div className="skoop-card p-6 flex flex-col h-full border-2 border-primary relative" data-unique-id="f84c319d-f89a-4aa3-9043-6b694246b894" data-file-name="app/page.tsx">
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-sm font-medium rounded-bl-lg rounded-tr-[calc(var(--radius)-1px)]" data-unique-id="56a20fc3-341d-4d35-8cc5-05cdfce37c70" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="0ec02e83-096d-43bf-910a-8a042646c56f" data-file-name="app/page.tsx">
                  Popular
                </span></div>
                <div className="mb-6" data-unique-id="1242a3cf-4d16-42d1-b415-269e63aadbc6" data-file-name="app/page.tsx">
                  <h3 className="text-lg font-medium mb-2" data-unique-id="b7d95739-13b5-4057-8b15-8cc2a11e196f" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="de80ac81-a1f9-413e-9e4f-bc09d5d1e487" data-file-name="app/page.tsx">Pro</span></h3>
                  <div className="text-3xl font-bold" data-unique-id="f13ca17b-fbb0-4e3d-9ba4-67ac6b65aae0" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="2a99c533-4079-41c5-bffa-49859ef7c7e0" data-file-name="app/page.tsx">$12</span><span className="text-muted-foreground text-sm font-normal" data-unique-id="b2892792-ea3f-426e-b7ac-1d48528fde6f" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="b0be6563-5f90-4122-8b6d-480161b75600" data-file-name="app/page.tsx">/month</span></span></div>
                  <p className="text-muted-foreground text-sm mt-3" data-unique-id="7094f673-1b25-48b3-9acd-801f062fb8a8" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="313aa4a9-a53f-41fa-8c8a-9b78b34483b9" data-file-name="app/page.tsx">For power users</span></p>
                </div>
                <ul className="space-y-3 mb-8" data-unique-id="eed91d5f-efbf-43fc-8e0d-52bdfa5a6d07" data-file-name="app/page.tsx">
                  <li className="flex items-start" data-unique-id="718b4399-7b9d-48e2-b1fb-0ee642d83136" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="ba5a844a-ca5f-4700-a61b-2e312e75756c" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="f5eb3fec-134c-4f24-a1b3-b8343f0fbfe0" data-file-name="app/page.tsx">Unlimited saved items</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="64604e6d-c290-41c2-8480-c00e9699c03c" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="4016b992-a690-41ce-842a-895e4f99158f" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="6c6ab24f-890c-415d-a403-d0ea9bb986f8" data-file-name="app/page.tsx">All platforms</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="038a7ba9-bed8-4890-825f-721377facf93" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="ee880379-34ab-400a-bf5c-f0ca200e32c5" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="28d9fdcb-5a04-4936-9071-366637484156" data-file-name="app/page.tsx">Advanced semantic search</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="af172d6a-94a1-4cde-b428-814510afa72a" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="d0701b5d-12d1-44f5-9269-f737a0520ec2" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="a17c7545-50d1-49d9-8af9-e60af3ca62c7" data-file-name="app/page.tsx">AI summary</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="9ce3593c-28eb-4e8b-b626-539383cc4e9e" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="8bc7b0e8-cbd0-4282-8eeb-686b7ffcc028" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="0fdafcdd-ba22-4b20-b690-d01c26319fad" data-file-name="app/page.tsx">Smart collections</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="0358cda2-c5cd-4a38-8433-208a71c78e61" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="73458bfa-680a-4a3d-b1ee-0dba5af42abc" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="0e9e06cb-3163-4b2f-b7c4-641a7989625a" data-file-name="app/page.tsx">15-minute sync</span></span>
                  </li>
                </ul>
                <div className="mt-auto" data-unique-id="a85e8e56-be8f-444b-bae0-649e9132b9d4" data-file-name="app/page.tsx">
                  <Button className="w-full skoop-button-accent" data-unique-id="d94e0c66-d71b-432e-a85a-a84c4445c2d4" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="02fcfd29-8d57-455c-ac0c-ad396f814805" data-file-name="app/page.tsx">Choose Pro</span></Button>
                </div>
              </div>

              {/* Power Plan (formerly Team) */}
              <div className="skoop-card p-6 flex flex-col h-full border border-border" data-unique-id="e46daa46-f8ec-4f06-9a1d-6adc6bc88c79" data-file-name="app/page.tsx">
                <div className="mb-6" data-unique-id="9bf1274f-6cd4-4db7-b7fd-a196a3a0a39e" data-file-name="app/page.tsx">
                  <h3 className="text-lg font-medium mb-2" data-unique-id="d6416951-82cb-4e94-aa4e-f35bc51e3ec0" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="d661c6ba-0dd2-4450-a444-6f07b188d261" data-file-name="app/page.tsx">Power</span></h3>
                  <div className="text-3xl font-bold" data-unique-id="e7403c5a-2ed8-48ae-b053-55cb91be3d4f" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="96a789c1-5398-43ee-ac3f-c1e099b56f92" data-file-name="app/page.tsx">$19</span><span className="text-muted-foreground text-sm font-normal" data-unique-id="3e55aa8f-9c14-47bd-9421-d5359d24d892" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="5bea30ba-4a9c-499b-9e5c-8105a8614a7c" data-file-name="app/page.tsx">/month</span></span></div>
                  <p className="text-muted-foreground text-sm mt-3" data-unique-id="144c9931-1cf5-40ca-836e-ee9b287cafbd" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="54008624-8e7d-49ce-824e-a7e5e434ba08" data-file-name="app/page.tsx">Collaborate with your team</span></p>
                </div>
                <ul className="space-y-3 mb-8" data-unique-id="69a8f057-fe0a-4f66-969d-e380ed662305" data-file-name="app/page.tsx">
                  <li className="flex items-start" data-unique-id="44996154-aad3-44b0-98a7-a5b7d3eec3a0" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="a1f5f1c7-ccb4-4a2e-a356-bf65f2d4bd89" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="ae8fd86e-9614-4e7a-8a69-959a514ae328" data-file-name="app/page.tsx">Everything in Pro</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="00314ff5-c609-4157-8209-efab59d8c8c7" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="87a5c48d-09d0-4be8-b53d-a8c44045a860" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="c05086b8-336f-4608-be98-f1c90337f551" data-file-name="app/page.tsx">5 team members</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="cd12a0fa-eee9-40e3-a270-cb4d98410bf4" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="fcffc800-d152-4554-a7d6-c0cca29459ac" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="81a03fad-cc53-4a77-9388-e17629f870d5" data-file-name="app/page.tsx">Shared collections</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="c3381ed9-ed4a-4e25-aebe-0abc0df2b201" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="5add65b5-13de-4722-b9eb-53cef43b62dd" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="21ff9b19-0501-4a12-ad54-ef9cab7f2363" data-file-name="app/page.tsx">Skoop Content columns</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="65ef1452-8a7f-4c28-a374-287c3a1bd8bd" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="87b6a08b-0296-4fef-8a5d-06fe5a9e1c61" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="c6235421-db7c-459d-b031-7407a032001a" data-file-name="app/page.tsx">Collaboration tools</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="020a8e36-b963-4996-8b90-48522660c067" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="54784fbd-1a6d-4716-aca6-2560844a1c96" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="24dd3fa8-ac83-414f-874a-cdcf296acbbd" data-file-name="app/page.tsx">Advanced analytics</span></span>
                  </li>
                </ul>
                <div className="mt-auto" data-unique-id="d3210375-e612-41c9-b906-47da11f5abbd" data-file-name="app/page.tsx">
                  <Button className="w-full skoop-button-primary" data-unique-id="d4cdbe56-9b72-413d-a554-9d920f33998f" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="095b2520-c223-4558-9da8-f9a3f443e28e" data-file-name="app/page.tsx">Choose Power</span></Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="skoop-section" data-unique-id="b9d2b3b5-763c-4e4a-9c99-bf551498f904" data-file-name="app/page.tsx">
          <div className="skoop-container max-w-4xl" data-unique-id="55b70356-cc69-42a0-a33f-310419e0f541" data-file-name="app/page.tsx">
            <div className="skoop-card p-8 md:p-12 text-center" data-unique-id="f379f4f6-3d62-4ea4-8930-275330c8d9b4" data-file-name="app/page.tsx">
              <h2 className="text-2xl md:text-3xl font-bold mb-4" data-unique-id="81cc16ab-c2c5-40c1-8a9a-741b7956020a" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="ce454b97-3f5c-46a4-b8c4-583d3023d988" data-file-name="app/page.tsx">Ready to organize your digital knowledge?</span></h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto" data-unique-id="293ee036-a023-4d0e-b974-2600d5e104b5" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="09fd6e95-cf37-4525-aae3-b518bf8ec6a3" data-file-name="app/page.tsx">
                Join thousands of developers, designers, and researchers who are using SKOOP to make the most of their saved content.
              </span></p>
              <div className="flex flex-col sm:flex-row justify-center gap-4" data-unique-id="6c4e6ac2-65c2-4f66-83e7-e696e05812e7" data-file-name="app/page.tsx">
                <Button className="skoop-button-accent" size="lg" data-unique-id="e04690d1-1158-4fec-bf50-e8f27952acf5" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="88430751-8e53-4918-91e2-e251a0c1cd92" data-file-name="app/page.tsx">Get Started for Free</span></Button>
                <Button variant="outline" size="lg" data-unique-id="86ba5279-739d-47ac-9790-9a65f2e81a68" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="a51b22db-38ed-4cd9-ba7a-d58af0423fa4" data-file-name="app/page.tsx">
                  Request Demo
                </span></Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-secondary bg-opacity-30 border-t border-border py-12" data-unique-id="13fb6ee0-9a19-4915-8dd5-baa5241e5c21" data-file-name="app/page.tsx">
        <div className="skoop-container" data-unique-id="98407de4-41d8-43ac-8386-42b75b49379b" data-file-name="app/page.tsx">
          <div className="grid gap-8 md:grid-cols-4" data-unique-id="665d6b93-bc57-482f-b0c3-bc004831ec4d" data-file-name="app/page.tsx">
            <div data-unique-id="18b80921-5239-411e-a45b-8ba453e78919" data-file-name="app/page.tsx">
              <div className="text-2xl font-bold text-primary mb-4" data-unique-id="e3f68513-2e62-48d0-a2eb-b84b85dbf9dc" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="5dab9113-6beb-475d-ba7e-787f64c1ebe5" data-file-name="app/page.tsx">SKOOP</span></div>
              <p className="text-muted-foreground text-sm" data-unique-id="f8466818-0da4-4867-8ca7-fe4bb78185ed" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="9b045f02-e29e-4bbc-a5d3-e1975295ee44" data-file-name="app/page.tsx">
                The all-in-one platform for collecting, searching and rediscovering your saved content.
              </span></p>
            </div>

            <div data-unique-id="64a8cf0e-ea2f-4c0d-bbc7-82b01a3851ab" data-file-name="app/page.tsx">
              <h4 className="font-medium mb-4" data-unique-id="f76a3aca-0dd4-4aa2-9254-4759d0feb04d" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="5fea4cef-c1bf-4f61-b5d2-ab6693e04d68" data-file-name="app/page.tsx">Product</span></h4>
              <ul className="space-y-2 text-sm text-muted-foreground" data-unique-id="94818586-b9b9-4884-9375-4a826825d02a" data-file-name="app/page.tsx">
                <li data-unique-id="e3781972-04b1-4823-8e73-4d048b41cae9" data-file-name="app/page.tsx"><Link href="#features" className="hover:text-primary transition-colors" data-unique-id="8725e914-0865-47ae-a171-efdc91143333" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="efc5d0de-73f5-4160-9eda-6abfb556b64f" data-file-name="app/page.tsx">Features</span></Link></li>
                <li data-unique-id="5f02c569-8996-4798-b093-f1c23cf70968" data-file-name="app/page.tsx"><Link href="#pricing" className="hover:text-primary transition-colors" data-unique-id="36d171ec-d0dc-4853-a6dc-b09c39f10134" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="aaf41f43-1661-4d7b-93c6-7758cbec921a" data-file-name="app/page.tsx">Pricing</span></Link></li>
                <li data-unique-id="c5cd053a-e8a8-44d0-beb4-a21776a549ba" data-file-name="app/page.tsx"><Link href="/dashboard" className="hover:text-primary transition-colors" data-unique-id="828ae352-a838-4ae0-8175-b241beb29244" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="66998e6a-e713-4d5c-9e9f-60c118a289fd" data-file-name="app/page.tsx">Dashboard</span></Link></li>
                <li data-unique-id="0eb9bd0d-c909-4d3b-90fe-71423a8bb34e" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="f8e581e7-b15c-4d66-bb7e-11e1d704aec4" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="6ea2834d-02c3-4360-ae8a-331462943220" data-file-name="app/page.tsx">Integrations</span></Link></li>
                <li data-unique-id="912ff0c1-2f80-45da-8070-c0a8fcf1c1ab" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="712fe9c5-89d8-481b-b01d-ad772d1c928d" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="372affff-1546-43d4-8785-33a7e40ca764" data-file-name="app/page.tsx">Changelog</span></Link></li>
              </ul>
            </div>

            <div data-unique-id="6794a43d-a22b-469a-8857-863c6e45ac27" data-file-name="app/page.tsx">
              <h4 className="font-medium mb-4" data-unique-id="6573c857-f88d-409f-82da-863078ecd982" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="23b735ec-cd38-4e3f-9bdd-ccdb6a005913" data-file-name="app/page.tsx">Resources</span></h4>
              <ul className="space-y-2 text-sm text-muted-foreground" data-unique-id="529cf3df-d21a-410a-ae9e-5d33b0c7506b" data-file-name="app/page.tsx">
                <li data-unique-id="438898b8-c7e0-4904-88a1-0aeaa7cce432" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="81045ebd-ed6b-483e-a3bb-057c52fe856f" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="31241ddc-92cb-4dd1-81ed-b9adc180e12e" data-file-name="app/page.tsx">Documentation</span></Link></li>
                <li data-unique-id="b8ba6580-ca58-4426-a33c-9800f1fd8f15" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="e3e75218-621a-4dca-90d1-6f8b2912a556" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="3c2fceb6-fc03-4ba5-98d1-133b9996822c" data-file-name="app/page.tsx">API</span></Link></li>
                <li data-unique-id="4e712e89-01b8-4cef-b212-64e10111e97b" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="2d83a492-2801-4e3b-9fc2-148e98e39e5c" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="b75c5aaf-ff8c-4074-8018-13014d12e485" data-file-name="app/page.tsx">Guides</span></Link></li>
                <li data-unique-id="345f03cd-0afd-4df1-bdea-59a7fa12e1c6" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="c9fa98b0-b6d7-4a5a-a35f-17feacac7392" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="2b1dfbbe-49a7-4c78-a4ba-632ec8588b0f" data-file-name="app/page.tsx">Help Center</span></Link></li>
              </ul>
            </div>

            <div data-unique-id="7bbc4155-abf2-4ce1-9a73-c8cfd387ee65" data-file-name="app/page.tsx">
              <h4 className="font-medium mb-4" data-unique-id="27074915-27d3-4266-8a95-f80762ba4230" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="92b731a9-bef4-4218-a017-b0b105395007" data-file-name="app/page.tsx">Company</span></h4>
              <ul className="space-y-2 text-sm text-muted-foreground" data-unique-id="6e0aa436-1e92-4c5d-9b2f-baee2a96fdf0" data-file-name="app/page.tsx">
                <li data-unique-id="faa3471d-a9d1-4afc-8f2c-dd6544f37417" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="479288d6-9790-4c59-a54c-a21a356274cd" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="b0f8b1e4-3a63-4381-b6bd-b066edac4ab2" data-file-name="app/page.tsx">About</span></Link></li>
                <li data-unique-id="2cda422b-2128-4e87-b230-111ec51104ea" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="8a3b84e6-c4e0-42b1-b544-4163350e65b6" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="be54ee1d-d211-432a-9152-c0d239ae9b84" data-file-name="app/page.tsx">Blog</span></Link></li>
                <li data-unique-id="b6f91b39-16b9-44e2-897c-3cf76d9a7cbc" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="5404ebf2-29b6-4f3a-a294-6442cec2d9c0" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="634a17e2-9102-4314-8f58-5349c47c0540" data-file-name="app/page.tsx">Careers</span></Link></li>
                <li data-unique-id="12840b56-8a26-45f1-801f-32ec9a451683" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="507b65f6-f66d-41fe-88f0-0dd8e3637e0d" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="5c12cb0c-7c6c-4eef-b2d5-0658c0b8a8d8" data-file-name="app/page.tsx">Contact</span></Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center" data-unique-id="17c6ebed-28d5-41de-b5b9-bc59f0daa5a9" data-file-name="app/page.tsx">
            <div className="flex items-center" data-unique-id="3a6cc77c-e2ee-41af-bd73-c296f9c91545" data-file-name="app/page.tsx">
              <div className="text-xl logo font-bold text-primary mr-2" data-unique-id="96c5816c-96cf-4d54-8764-0f7547683a10" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="6e554e68-448c-4ff0-8b15-12149e4cfb90" data-file-name="app/page.tsx">SKOOP</span></div>
              <div className="text-sm text-muted-foreground" data-unique-id="1864129d-6cb1-4c7b-8300-50b08ea7857a" data-file-name="app/page.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="170b76c1-7236-48b0-ba14-58b09f596241" data-file-name="app/page.tsx">
                © </span>{new Date().getFullYear()}<span className="editable-text" data-unique-id="db4a742e-3e06-42f6-92b5-429cb3c92f27" data-file-name="app/page.tsx"> All rights reserved.
              </span></div>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0" data-unique-id="b3255a66-2d33-4b6b-b8af-dfa50aa76da5" data-file-name="app/page.tsx">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors" data-unique-id="a78991cc-4a43-433d-a557-5d14eef706de" data-file-name="app/page.tsx">
                <span className="sr-only" data-unique-id="c9a2090b-abde-4aa8-8910-ab5ee421e68e" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="bbe1f46e-0cc8-4057-99cb-06d9d9148a47" data-file-name="app/page.tsx">Twitter</span></span>
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors" data-unique-id="df2eeb08-1847-4952-94eb-455ad1e79cd0" data-file-name="app/page.tsx">
                <span className="sr-only" data-unique-id="50f8f43d-4d16-4d36-9c47-1faf5f1bce43" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="513582ea-75bf-4276-bc2d-3b5785edfe4a" data-file-name="app/page.tsx">GitHub</span></span>
                <Github className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>;
}