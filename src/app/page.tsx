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
  loading: () => <div className="w-full max-w-[640px] mx-auto h-[100px] bg-white dark:bg-card rounded-xl border border-[#E5E7EB] dark:border-border animate-pulse" data-unique-id="13f3b078-cdce-4b13-b825-ca0b722db91d" data-file-name="app/page.tsx"></div>
});
export default function HomePage() {
  return <div className="min-h-screen flex flex-col" data-unique-id="32741202-6990-4fd0-8dec-3097a67efe28" data-file-name="app/page.tsx" data-dynamic-text="true">
      {/* Header */}
      <header className="border-b border-border relative z-10" data-unique-id="f65ac8b1-27f1-4032-9134-a2ff15a5d2fc" data-file-name="app/page.tsx">
        <div className="skoop-container flex items-center justify-between h-16" data-unique-id="3ed0f2be-3843-4dd6-9e42-fdfbde2bb9ae" data-file-name="app/page.tsx">
          <div className="flex items-center" data-unique-id="85c10777-c225-4577-a2ab-5df525045577" data-file-name="app/page.tsx">
            <div className="text-2xl logo font-bold text-primary" data-unique-id="6ca68c2a-3c90-4848-aa00-eacbf908cd71" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="4af6e760-8315-4d1f-9785-31138e98e7cc" data-file-name="app/page.tsx">SKOOP</span></div>
            <nav className="hidden ml-12 space-x-6 md:flex" data-unique-id="5c2f373f-c528-4e15-ae9f-ba741f28464d" data-file-name="app/page.tsx">
              <Link href="#features" className="text-foreground hover:text-primary transition-colors" data-unique-id="4c304cdd-dff3-44f7-85dd-f078f09b1444" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="df07bc65-9ce2-4aa0-a9d4-55629fde1e3f" data-file-name="app/page.tsx">Features</span></Link>
              <Link href="#pricing" className="text-foreground hover:text-primary transition-colors" data-unique-id="859ca68c-1a71-42fb-9b64-1e3aa905dbf4" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="2b5b1dae-6ade-429c-8379-412029ddde18" data-file-name="app/page.tsx">Pricing</span></Link>
              <Link href="#faq" className="text-foreground hover:text-primary transition-colors" data-unique-id="b7d1dd67-f116-4ff4-befe-72b5136680fa" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="1ff903ea-496d-4baa-92be-3d3bda35cff9" data-file-name="app/page.tsx">FAQ</span></Link>
            </nav>
          </div>
          <div className="flex items-center" data-unique-id="bfb7e4b5-309c-401f-826b-0d543ac6439b" data-file-name="app/page.tsx">
            <ThemeToggle />
            <div className="hidden md:flex items-center space-x-4 ml-4" data-unique-id="c2c55efc-440b-4d10-84b0-9b511c93483c" data-file-name="app/page.tsx">
              <a href="/dashboard" className="text-foreground hover:text-primary transition-colors" data-unique-id="e9dc9472-645b-4681-b598-89a5df409f0b" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="2e7f052e-3922-4d41-9866-b8b8a7a4e7d0" data-file-name="app/page.tsx">Dashboard</span></a>
              <Link href="/login" className="text-foreground hover:text-primary transition-colors" data-unique-id="850ae9d0-47ba-4ad1-a7b6-1fc6176327bc" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="3021a7c8-8458-42ff-a105-e25c9c7fbafa" data-file-name="app/page.tsx">Log in</span></Link>
              <Link href="/signup" data-unique-id="10e371e3-ed17-4b48-8345-adeebf287570" data-file-name="app/page.tsx">
                <Button className="skoop-button-accent" data-unique-id="28afc105-f709-45b6-9788-613204264094" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="a2fad6ee-9627-4422-9271-1b25e7847f06" data-file-name="app/page.tsx">Sign Up Free</span></Button>
              </Link>
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

      <main className="flex-grow" data-unique-id="7b377c61-bf7f-4825-bc47-8907bb3df5df" data-file-name="app/page.tsx" data-dynamic-text="true">
        {/* Hero Section with Aurora Background */}
        <section className="relative overflow-hidden" data-unique-id="f3712ce2-e0cc-4255-8083-a394b4a7d80b" data-file-name="app/page.tsx">
          <AuroraBackground className="absolute inset-0">
            <div className="absolute inset-0 bg-background/40 backdrop-blur-sm" data-unique-id="ef0ceeb5-ea98-4a87-821c-80fdedf83a39" data-file-name="app/page.tsx" />
          </AuroraBackground>
          
          <div className="skoop-section relative z-10" data-unique-id="1b1a8d42-1e65-40e7-8ff8-4bb3926cb282" data-file-name="app/page.tsx">
          <div className="skoop-container" data-unique-id="06284b7a-f0b9-4097-94f0-6460c7145c02" data-file-name="app/page.tsx" data-dynamic-text="true">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-24 items-center" data-unique-id="dfbf8283-5b02-4ea2-8693-561db887c9f3" data-file-name="app/page.tsx">
              <div className="max-w-[100%] px-4 sm:px-0" data-unique-id="4cd8fbeb-9598-4469-85b3-ab58cca0aaa6" data-file-name="app/page.tsx">
                <h1 className="text-3xl font-bold leading-tight md:text-5xl lg:text-6xl mb-6 max-w-full break-words" data-unique-id="a6ad7e34-0a9a-407a-a7fa-ddc4cec6532f" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="9ec9a125-e6e3-442b-bfec-9d98a8e68304" data-file-name="app/page.tsx">
                  Collect, search and </span><span className="text-primary" data-unique-id="8841583d-d939-4fce-9e8f-5c77e3f5d0c5" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="582b0801-5daa-4f53-a39f-a22a6d6ba069" data-file-name="app/page.tsx">rediscover</span></span><span className="editable-text" data-unique-id="dbb6dec6-f94a-4691-9e73-70f34871c119" data-file-name="app/page.tsx"> your saved content
                </span></h1>
                <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-full" data-unique-id="f7b928cb-1eba-4a14-af2b-ef8d5617481a" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="1abba24d-6e21-48a6-a4f4-ef498dcafcbf" data-file-name="app/page.tsx">
                  One calm space for all your saved X posts, GitHub stars, Reddit posts, and Stack Overflow favorites.
                </span></p>
                <div className="flex flex-col sm:flex-row gap-3 w-full max-w-full" data-unique-id="06485a50-842d-4ebc-9615-304bd8001159" data-file-name="app/page.tsx">
                  <Button className="skoop-button-accent" size="lg" data-unique-id="4531939b-4f66-4e6c-b044-decd6d14fc5e" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="e59bf44e-e4ea-47be-9bec-662a78225360" data-file-name="app/page.tsx">Get Started</span></Button>
                  <Button variant="outline" size="lg" className="group" data-unique-id="f0c2e5ea-7b2a-4f77-8d2d-b4222b31bf63" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="9b8326e4-7f57-4947-ad43-3215f146af07" data-file-name="app/page.tsx">
                    How It Works
                    </span><ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
                <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground" data-unique-id="559b2d07-54c6-4515-9c37-abee44a61138" data-file-name="app/page.tsx">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span data-unique-id="d4e3c48e-3686-4f7a-bc90-0a61a9b9c60a" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="3ea753f3-99d0-48ca-9982-3fff1ac75101" data-file-name="app/page.tsx">No credit card required</span></span>
                </div>
              </div>
              <div className="relative" data-unique-id="23814309-ca19-4590-b7cd-f7266b087e30" data-file-name="app/page.tsx" data-dynamic-text="true">
                <div className="skoop-card overflow-hidden" data-unique-id="a831b477-d8ce-4baf-b6a9-2346f58f1d32" data-file-name="app/page.tsx">
                  <Image src="https://images.unsplash.com/photo-1508921340878-ba53e1f016ec?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3" alt="SKOOP Dashboard" width={600} height={400} className="w-full h-auto rounded-t-[var(--radius)]" data-unique-id="be5f87e8-b984-472e-8c5f-f955995ebc7f" data-file-name="app/page.tsx" />
                  <div className="p-6" data-unique-id="0b62042b-b45b-4bcb-bdb8-9142bf97c238" data-file-name="app/page.tsx">
                    <div className="flex items-center justify-between mb-4" data-unique-id="77ddc6c9-cbe8-45e8-9946-ba2efb320818" data-file-name="app/page.tsx">
                      <div className="font-semibold" data-unique-id="622e0968-328f-4389-9fcf-4792eb414a75" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="7847a365-9dba-4d64-9610-27e9d9ca27da" data-file-name="app/page.tsx">Recent Saves</span></div>
                      <Search className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="space-y-3" data-unique-id="799604bb-19b8-485e-9be1-a4888f44c419" data-file-name="app/page.tsx" data-dynamic-text="true">
                      {[1, 2, 3].map(i => <div key={i} className="flex items-center gap-3 p-3 rounded-md bg-secondary/50" data-unique-id="b790732b-7299-47b0-b0f3-15501426c4d6" data-file-name="app/page.tsx" data-dynamic-text="true">
                          {i === 1 && <Github className="h-5 w-5 text-foreground" />}
                          {i === 2 && <X className="h-5 w-5 text-foreground" />}
                          {i === 3 && <StackOverflow className="h-5 w-5 text-foreground" />}
                          <div className="flex-grow" data-unique-id="f91c21b7-5d03-4349-9b85-1c2a85fb97a8" data-file-name="app/page.tsx">
                            <div className="text-sm font-medium truncate" data-unique-id="7d98f3ad-e35a-4f8f-bb26-800075f544fa" data-file-name="app/page.tsx" data-dynamic-text="true">
                              {i === 1 && "Interesting open source project for data visualization"}
                              {i === 2 && "Thread: 10 tips for better React performance"}
                              {i === 3 && "How to optimize PostgreSQL queries for large datasets"}
                            </div>
                            <div className="text-xs text-muted-foreground mt-0.5" data-unique-id="2789b0cb-24e3-467e-8b38-7472caa4bcf1" data-file-name="app/page.tsx" data-dynamic-text="true">
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
                <div className="absolute -left-8 top-1/2 bg-card p-3 rounded-full shadow-lg border border-border hidden lg:block" data-unique-id="34e3e674-d46d-4d2b-a236-889aa1632b7c" data-file-name="app/page.tsx">
                  <Github className="h-6 w-6 text-primary" />
                </div>
                <div className="absolute -right-8 bottom-1/3 bg-card p-3 rounded-full shadow-lg border border-border hidden lg:block" data-unique-id="e6e48bc2-0a78-4afd-bfbc-837f86a114c4" data-file-name="app/page.tsx">
                  <X className="h-6 w-6 text-accent" />
                </div>
              </div>
            </div>

            {/* Logos */}
            <div className="mt-20 px-4 sm:px-0" data-unique-id="17c61473-b7d4-4893-b6a5-8355ada328e9" data-file-name="app/page.tsx">
              <p className="text-center text-sm text-muted-foreground mb-6" data-unique-id="457c8bac-a49e-4a3f-9b5b-cd2a070cc556" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="e6456275-f66d-4ecb-a6e7-0003cca0468a" data-file-name="app/page.tsx">
                Connect with your favorite platforms
              </span></p>
              <div className="flex justify-center items-center flex-wrap gap-8 md:gap-12" data-unique-id="1dc978fe-751b-4276-af15-b2e526560d94" data-file-name="app/page.tsx">
                <Github className="h-8 w-8 text-muted-foreground" />
                <X className="h-8 w-8 text-muted-foreground" />
                <StackOverflow className="h-8 w-8 text-muted-foreground" />
                <div className="text-muted-foreground text-xl font-semibold" data-unique-id="c0ad694b-6359-41ed-9335-a6fb7582165a" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="95517830-7dd7-424f-9d3f-07f846d46f56" data-file-name="app/page.tsx">Reddit</span></div>
                <div className="text-muted-foreground text-xl font-semibold" data-unique-id="71e8d19b-c57b-44e1-8f5b-5aa525e9ac1b" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="af3f05d0-2cc5-40f2-a49a-4f4d693d3cbd" data-file-name="app/page.tsx">DEV</span></div>
              </div>
            </div>
          </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="skoop-section" data-unique-id="587198d8-3a4e-4e78-a9e8-fe3137a10ffa" data-file-name="app/page.tsx">
          <div className="skoop-container" data-unique-id="689eb92b-e61e-486f-9cc7-931da9feb6a8" data-file-name="app/page.tsx">
            <div className="text-center mb-16" data-unique-id="34a650a6-8021-4a31-8c4e-51ac755fadc3" data-file-name="app/page.tsx">
              <h2 className="section-title-sm mb-4" data-unique-id="2b9a1180-089f-436b-a37a-c934a5b7110e" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="28352988-e025-4380-82cd-e1930a5cba0f" data-file-name="app/page.tsx">Finally, a place for all your saved content</span></h2>
              <p className="text-muted-foreground max-w-2xl mx-auto" data-unique-id="d8ae42ca-d131-469a-9bc7-bebe0ab3ac84" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="cc4ed5f6-918b-4813-9ade-b32cfafa8673" data-file-name="app/page.tsx">
                SKOOP solves the problem of fragmented saves and makes it easy to find what you need when you need it.
              </span></p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3" data-unique-id="bb3f309b-0f3c-4063-a3fa-acf3bac1f5ec" data-file-name="app/page.tsx" data-dynamic-text="true">
              {/* Feature 1 */}
              <div className="skoop-card p-6" data-unique-id="4b066a48-62b3-4dbf-8554-565dcdd9547c" data-file-name="app/page.tsx">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary bg-opacity-10 mb-4" data-unique-id="94127026-55bb-49e5-9b68-084cb62df218" data-file-name="app/page.tsx">
                  <Bookmark className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3" data-unique-id="4f1907ea-10f1-45b0-9513-2af9a401490a" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="f80a99d4-a542-409d-8474-41ad959c08d6" data-file-name="app/page.tsx">Unified Collection</span></h3>
                <p className="text-muted-foreground mb-4" data-unique-id="5b038f51-badf-4139-8a67-cefdfe18babb" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="1912b72c-5b6d-449e-b15f-86b1283612a5" data-file-name="app/page.tsx">
                  Import and sync all your saved content from GitHub, Twitter, Reddit, and Stack Overflow in one place.
                </span></p>
                <div className="pt-4 border-t border-border mt-auto" data-unique-id="4d2eff60-957e-4d35-a9ef-0834899b5278" data-file-name="app/page.tsx">
                  <Link href="#" className="inline-flex items-center text-primary hover:underline" data-unique-id="fd856513-4d41-49da-adce-27e99cfbb61b" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="bbafcdd1-8b85-4937-a493-3c0c89538941" data-file-name="app/page.tsx">
                    Learn more </span><ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="skoop-card p-6" data-unique-id="680a4951-3d6d-4b54-b00a-2dfd9a83e053" data-file-name="app/page.tsx">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-accent bg-opacity-10 mb-4" data-unique-id="b619655c-ab85-4b31-8f57-dfce76cae498" data-file-name="app/page.tsx">
                  <Search className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3" data-unique-id="13a77bb0-2814-44bd-a8b2-a588f6365159" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="7a389638-7fc5-4e1b-bb4a-576f8297e287" data-file-name="app/page.tsx">Semantic Search</span></h3>
                <p className="text-muted-foreground mb-4" data-unique-id="65339b87-0ce8-4426-bd23-8fc892abe0a7" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="e2240bf5-a1a4-4963-95df-4d7ecbdd765f" data-file-name="app/page.tsx">
                  Find what you're looking for with powerful semantic search that understands the meaning behind your queries.
                </span></p>
                <div className="pt-4 border-t border-border mt-auto" data-unique-id="7fca1971-d725-4596-85fd-a0bace8ca413" data-file-name="app/page.tsx">
                  <Link href="#" className="inline-flex items-center text-primary hover:underline" data-unique-id="e6ca9d98-2258-4fa8-845e-7c614270328a" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="c7edfd2e-3ce3-48e7-b6b6-c961f93e18f3" data-file-name="app/page.tsx">
                    Learn more </span><ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="skoop-card p-6" data-unique-id="3656f5fe-a69a-4e52-b81e-dca210222595" data-file-name="app/page.tsx">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-destructive bg-opacity-10 mb-4" data-unique-id="3ae6a72f-d866-465c-a88c-19d117313896" data-file-name="app/page.tsx">
                  <Collection className="h-6 w-6 text-destructive" />
                </div>
                <h3 className="text-xl font-semibold mb-3" data-unique-id="60b90922-6efc-4ef0-a9c1-a2b654fdbcbe" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="b3d33146-6e70-4a53-82fb-ac04a9c6e920" data-file-name="app/page.tsx">Smart Collections</span></h3>
                <p className="text-muted-foreground mb-4" data-unique-id="be7ee640-9b8d-47c2-95d1-19676146ac0f" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="154ec97a-fd73-4c3b-bb6e-72e681b60761" data-file-name="app/page.tsx">
                  Organize your content with automated collections that group similar items together and surface the best content.
                </span></p>
                <div className="pt-4 border-t border-border mt-auto" data-unique-id="9681605f-dd8b-4e80-ad99-78feff7ac8d7" data-file-name="app/page.tsx">
                  <Link href="#" className="inline-flex items-center text-primary hover:underline" data-unique-id="ecac6bef-1789-46da-b73b-6e56080d75ae" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="24bf34b2-02a8-4845-b6ba-210979d2fb35" data-file-name="app/page.tsx">
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
        <section id="pricing" className="skoop-section bg-secondary bg-opacity-30" data-unique-id="5175bc50-f6e2-4830-9f03-2cc99a744f5b" data-file-name="app/page.tsx">
          <div className="skoop-container" data-unique-id="ec2e9b17-e930-4cee-8ee1-a78bfa92d7ef" data-file-name="app/page.tsx">
            <div className="text-center mb-16" data-unique-id="873d19c3-bcf9-437f-8e28-cb54a2d35012" data-file-name="app/page.tsx">
              <h2 className="section-title-sm mb-4" data-unique-id="9a5136b9-fc9f-4a93-ba9b-571ab7a68848" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="e1ce3bfc-b94d-4eea-9ff7-3c0ea19032b0" data-file-name="app/page.tsx">Simple, transparent pricing</span></h2>
              <p className="text-muted-foreground max-w-2xl mx-auto" data-unique-id="6d40b194-2ce9-452b-860f-9097889fd234" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="4a44b862-9365-47a4-b85d-26b6737052c1" data-file-name="app/page.tsx">
                Choose the plan that fits your needs. All plans include our core features.
              </span></p>
            </div>

            <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto" data-unique-id="6639db9e-7558-4edb-9141-6d2c15cb68b9" data-file-name="app/page.tsx" data-dynamic-text="true">
              {/* Free Plan */}
              <div className="skoop-card p-6 flex flex-col h-full border border-border" data-unique-id="49c89dbe-776e-449f-a899-1a253675e007" data-file-name="app/page.tsx">
                <div className="mb-6" data-unique-id="6eec8452-7a42-454f-8c1e-77a34e1d81fb" data-file-name="app/page.tsx">
                  <h3 className="text-lg font-medium mb-2" data-unique-id="b3fc5748-862b-4abd-ba5f-c3e53dd1a31d" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="7b7a3a2f-4d34-42fc-a6e3-15da6727deb2" data-file-name="app/page.tsx">Free</span></h3>
                  <div className="text-3xl font-bold" data-unique-id="71e40600-78c9-4237-b057-02060307a6e7" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="2cfe9355-5e08-45f3-87cf-a115cf12e566" data-file-name="app/page.tsx">$0</span><span className="text-muted-foreground text-sm font-normal" data-unique-id="4b79065b-052c-467a-8ff1-66c173a9f278" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="e08bec45-3efb-4f85-9da0-ac31ca04a660" data-file-name="app/page.tsx">/month</span></span></div>
                  <p className="text-muted-foreground text-sm mt-3" data-unique-id="d1be897a-f629-4f78-9a38-9f40a0672b05" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="de88272a-9949-4ca0-8373-b8f1aa9469c5" data-file-name="app/page.tsx">Perfect for getting started</span></p>
                </div>
                <ul className="space-y-3 mb-8" data-unique-id="e07439f2-51ba-4db3-95db-a3d9bf22dfe3" data-file-name="app/page.tsx">
                  <li className="flex items-start" data-unique-id="61b9c780-dff5-478e-98f3-0f1f31e419d3" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="014b8737-427e-4fe3-8aa9-4450a0ccdddd" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="740536c7-8739-4c1d-9804-b2c3dd3f5f61" data-file-name="app/page.tsx">72h free bookmark storage</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="5404c573-530b-4211-a720-6bf59c2ce87e" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="18476657-f891-4dd6-a488-445411b8b35a" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="9074ffce-6ad0-4cd0-88d6-dc3b48df60c5" data-file-name="app/page.tsx">2 connected platforms</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="4383f5f2-8581-4d8f-a1e0-0b9736d040f6" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="8dbd814c-dcec-48a7-a59e-2bdbeec32c4a" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="87dc92b6-214e-454c-9016-6e2abc3a672d" data-file-name="app/page.tsx">Basic search</span></span>
                  </li>
                </ul>
                <div className="mt-auto" data-unique-id="94aef6c1-9c2d-4afa-a38b-2f1aeb256f48" data-file-name="app/page.tsx">
                  <Button className="w-full skoop-button-primary" data-unique-id="1517900d-fdb8-487f-a917-c2936ddc8ff4" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="1ae3a358-8cd7-4952-b319-b26e5dc59688" data-file-name="app/page.tsx">Get Started</span></Button>
                </div>
              </div>

              {/* Pro Plan */}
              <div className="skoop-card p-6 flex flex-col h-full border-2 border-primary relative" data-unique-id="af5b1b4b-0597-466b-ab9d-f37da116bee8" data-file-name="app/page.tsx">
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-sm font-medium rounded-bl-lg rounded-tr-[calc(var(--radius)-1px)]" data-unique-id="e68b7bbb-8b64-483f-b5ad-c0554eacc3cc" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="22327645-347c-410d-b6b5-7131548be4f9" data-file-name="app/page.tsx">
                  Popular
                </span></div>
                <div className="mb-6" data-unique-id="ac18f292-3e69-4dfc-bf17-10d7d7f664d3" data-file-name="app/page.tsx">
                  <h3 className="text-lg font-medium mb-2" data-unique-id="01361d36-14a9-4f70-9070-27ba7773713c" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="1cd2a40d-188d-4ae5-beab-c1e2868b229b" data-file-name="app/page.tsx">Pro</span></h3>
                  <div className="text-3xl font-bold" data-unique-id="57a56b68-e029-4eb7-b4cb-3eb765fe86ec" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="eee6916f-52ed-4903-a3aa-12668d7ebe34" data-file-name="app/page.tsx">$12</span><span className="text-muted-foreground text-sm font-normal" data-unique-id="61d8022e-ee3e-4ef3-ac3e-0d8ac3fda6d4" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="842c5fe8-d43a-4e2a-ae9a-736112ab62d2" data-file-name="app/page.tsx">/month</span></span></div>
                  <p className="text-muted-foreground text-sm mt-3" data-unique-id="df06539e-53fe-428e-bbea-0be1f6a58659" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="e3f665f9-26d8-44b3-b780-fc57e74281ed" data-file-name="app/page.tsx">For power users</span></p>
                </div>
                <ul className="space-y-3 mb-8" data-unique-id="52976810-00d4-4115-a874-6fe7fbfbbd36" data-file-name="app/page.tsx">
                  <li className="flex items-start" data-unique-id="1d81903f-fe73-4704-b4eb-a149d98217d5" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="4d57aece-aea0-42ba-96d3-fa0e535ccd37" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="76a6d16d-8d36-47e0-8ca7-9c84457f3bb6" data-file-name="app/page.tsx">Unlimited saved items</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="b48a4878-bb48-4ff5-936f-c4990b433ba0" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="32ea4e33-5d53-402e-8945-93977f7319fc" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="98214599-aa34-4623-8d7a-7e178f7ff1a6" data-file-name="app/page.tsx">All platforms</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="b1a0b5d9-7547-495e-b47a-bb9cbb84b546" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="2f4bc420-db7f-4a72-8af5-a77f9c5d710d" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="347c4ec0-31ce-4935-875a-dac308f35e90" data-file-name="app/page.tsx">Advanced semantic search</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="8f775ac6-7b30-4672-8d49-f1e66a4101e6" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="b95cacc9-0cd3-4760-ab17-0841f48bf135" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="25b7f496-0130-4fd6-bfba-0aeb4306f696" data-file-name="app/page.tsx">AI summary</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="628a9c18-ec54-4e3b-8ecb-507fe0f9db20" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="0323a8cf-b4b3-49fb-a590-ba5274dcbf53" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="02d5d0be-cd6c-437b-b87b-5af1c35f51ab" data-file-name="app/page.tsx">Smart collections</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="934e073f-2159-4c58-868d-42083e4afc4e" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="d5780fc0-c249-4b66-9d82-c6f4bb5e0a0b" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="611c33c7-bdc7-4e42-91d0-36e63437d05e" data-file-name="app/page.tsx">15-minute sync</span></span>
                  </li>
                </ul>
                <div className="mt-auto" data-unique-id="da3d3647-a60d-42be-add5-756372f2321d" data-file-name="app/page.tsx">
                  <Button className="w-full skoop-button-accent" data-unique-id="da20eb6f-2391-41af-a458-70db64016c48" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="0347e3d0-5cce-4579-a889-3885defa354d" data-file-name="app/page.tsx">Choose Pro</span></Button>
                </div>
              </div>

              {/* Power Plan (formerly Team) */}
              <div className="skoop-card p-6 flex flex-col h-full border border-border" data-unique-id="6f160220-840e-430f-b59b-f0f80d1fb79a" data-file-name="app/page.tsx">
                <div className="mb-6" data-unique-id="d9809add-da09-4333-91b5-7cf44c90c608" data-file-name="app/page.tsx">
                  <h3 className="text-lg font-medium mb-2" data-unique-id="74e82312-60b9-4f4e-abab-a2bf046c9043" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="6f7c18e2-cae2-48d1-b5c0-f7c1e40054a0" data-file-name="app/page.tsx">Power</span></h3>
                  <div className="text-3xl font-bold" data-unique-id="3022d9a8-5dc4-4698-9c85-39997a25af37" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="cfd6404e-6176-4812-8911-cf55b7fc5130" data-file-name="app/page.tsx">$19</span><span className="text-muted-foreground text-sm font-normal" data-unique-id="a871b6b4-313d-45bc-a562-09326c46aa71" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="4ac642d2-8edd-4bfe-a921-84483bfcd1b2" data-file-name="app/page.tsx">/month</span></span></div>
                  <p className="text-muted-foreground text-sm mt-3" data-unique-id="606fe530-81ea-48e3-8592-9473ac9b6e4d" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="718ce024-fbf0-432e-b055-d6907a543350" data-file-name="app/page.tsx">Collaborate with your team</span></p>
                </div>
                <ul className="space-y-3 mb-8" data-unique-id="d1136ff7-a3d1-464a-9ee7-13b15409e7b0" data-file-name="app/page.tsx">
                  <li className="flex items-start" data-unique-id="7d16afbf-e13d-40d2-9ba2-76ac47546a38" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="d307d4db-8755-4d59-be10-f821a8d840e3" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="7e80d6a2-285d-4a12-b1db-057c985fc3d1" data-file-name="app/page.tsx">Everything in Pro</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="71e5c03b-37f9-49bd-8da7-874fd1c972b2" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="5f9d07f2-15e3-4abf-b2ff-b330f49bbde6" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="ce237d18-f3a0-40cd-bdc6-993f4c458c38" data-file-name="app/page.tsx">5 team members</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="86ad4405-53ac-4256-a1dc-052b0486da16" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="0c7e1375-b964-41df-ad29-1680fa1c6474" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="1069c231-9659-453f-a0dc-020fc8872dab" data-file-name="app/page.tsx">Shared collections</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="4137dbb5-1cef-458f-8721-b0f568ffb97a" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="aac4b428-e78c-4e44-be89-1c450e6dbc2f" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="1cc1b043-a435-480b-9dfd-01ef6b49f745" data-file-name="app/page.tsx">Skoop Content columns</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="90fbbe00-3ec4-4d1d-81a6-85a2512bc0c6" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="9fa5ea4c-d493-4faf-b469-3062a9dbb2c5" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="c043e602-a5c2-4042-86a0-5b5d101ac63e" data-file-name="app/page.tsx">Collaboration tools</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="c49471a6-397a-417b-9147-4a4f3b1f2c61" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="a1aada08-3c2f-48bc-96ad-d5a3d7a8765e" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="12f2fad5-d6a2-48d2-b4b3-f3c433c90faf" data-file-name="app/page.tsx">Advanced analytics</span></span>
                  </li>
                </ul>
                <div className="mt-auto" data-unique-id="c93bc248-0372-46bd-a791-5976c5c58fcb" data-file-name="app/page.tsx">
                  <Button className="w-full skoop-button-primary" data-unique-id="b3d0bed3-429d-4e51-b196-385da15d67e5" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="71c0f42a-dcb1-4fe6-819a-bb16d4ab8979" data-file-name="app/page.tsx">Choose Power</span></Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="skoop-section" data-unique-id="f8ee38a8-4842-4d88-9dad-b9da8d2ebae7" data-file-name="app/page.tsx">
          <div className="skoop-container max-w-4xl" data-unique-id="f515188a-7e11-444e-bcf0-aa65f0a85074" data-file-name="app/page.tsx">
            <div className="skoop-card p-8 md:p-12 text-center" data-unique-id="ddc128c4-c6f9-4a5c-9f54-7df0c70d70b3" data-file-name="app/page.tsx">
              <h2 className="text-2xl md:text-3xl font-bold mb-4" data-unique-id="fa1dd5b0-a48a-4390-b7cd-5797a438c885" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="d0c4b174-d840-496b-ae60-4cbb2771d31f" data-file-name="app/page.tsx">Ready to organize your digital knowledge?</span></h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto" data-unique-id="ca67693e-859d-4486-b3d7-a25e7f377270" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="da167525-0bbe-4255-9654-db429861e648" data-file-name="app/page.tsx">
                Join thousands of developers, designers, and researchers who are using SKOOP to make the most of their saved content.
              </span></p>
              <div className="flex flex-col sm:flex-row justify-center gap-4" data-unique-id="aa904322-ab3e-47d1-8774-260839b578ba" data-file-name="app/page.tsx">
                <Button className="skoop-button-accent" size="lg" data-unique-id="7788cd97-a84a-4bda-b935-06b346b1c952" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="64fdca4f-3bca-40f1-8f62-87a3c466634c" data-file-name="app/page.tsx">Get Started for Free</span></Button>
                <Button variant="outline" size="lg" data-unique-id="f6448a2f-21d6-4ba8-85f1-c548db72c9db" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="ad9cd2dd-feaa-4451-ba0b-063a653098c0" data-file-name="app/page.tsx">
                  Request Demo
                </span></Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-secondary bg-opacity-30 border-t border-border py-12" data-unique-id="d4faa033-16e5-4607-8486-64c4710cb010" data-file-name="app/page.tsx">
        <div className="skoop-container" data-unique-id="2e44becb-011d-4eab-85f6-f41039bfe4a6" data-file-name="app/page.tsx">
          <div className="grid gap-8 md:grid-cols-4" data-unique-id="f139c3ff-ef5d-4efb-b66f-e4491c59906f" data-file-name="app/page.tsx">
            <div data-unique-id="e9b449aa-b3a6-41f6-a368-0545656965dc" data-file-name="app/page.tsx">
              <div className="text-2xl font-bold text-primary mb-4" data-unique-id="90be8c94-df00-44f8-9be7-fd48f62476f1" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="6e784c34-0b36-47cf-ac96-d2b310242b59" data-file-name="app/page.tsx">SKOOP</span></div>
              <p className="text-muted-foreground text-sm" data-unique-id="a6ea4d6c-0393-456e-ad19-4013d77bdc9f" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="57605ce8-f041-471c-b1e7-948ebaaa7d52" data-file-name="app/page.tsx">
                The all-in-one platform for collecting, searching and rediscovering your saved content.
              </span></p>
            </div>

            <div data-unique-id="ee374751-ba37-44d7-acc2-b8214d5a6f7e" data-file-name="app/page.tsx">
              <h4 className="font-medium mb-4" data-unique-id="0c1aa0bc-0d9d-40d3-bb80-83bc5800ea19" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="222b5c6a-e167-4dd2-92cb-49be46a4967f" data-file-name="app/page.tsx">Product</span></h4>
              <ul className="space-y-2 text-sm text-muted-foreground" data-unique-id="548f7903-d367-4a36-84cb-947d59f5609a" data-file-name="app/page.tsx">
                <li data-unique-id="77b4a025-de14-4f2b-8a97-b4369658a609" data-file-name="app/page.tsx"><Link href="#features" className="hover:text-primary transition-colors" data-unique-id="6e116c8e-0960-4cb8-bc53-b92ac6d4db51" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="db5fbf91-d6c2-4e62-9031-ab3ff654f2b7" data-file-name="app/page.tsx">Features</span></Link></li>
                <li data-unique-id="8aafe7d1-e745-4fea-9841-9a7bd867139b" data-file-name="app/page.tsx"><Link href="#pricing" className="hover:text-primary transition-colors" data-unique-id="d03f1d3f-35c1-42e3-aff1-791baebffbe2" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="ca105d4b-721f-4004-bcbf-a5720e4461cc" data-file-name="app/page.tsx">Pricing</span></Link></li>
                <li data-unique-id="6200fb49-decd-49d4-bcd2-5dc161edbbdc" data-file-name="app/page.tsx"><Link href="/dashboard" className="hover:text-primary transition-colors" data-unique-id="7af742ce-695d-43d3-a969-8cb0fece4e3b" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="6f4e9c47-5df4-41c9-8658-882b7334ea10" data-file-name="app/page.tsx">Dashboard</span></Link></li>
                <li data-unique-id="350f99c8-0f7d-4b8e-a22d-4caabc04dd52" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="42e345c2-e736-4091-9c4f-eb54323b86e7" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="12b51ed7-6518-4e23-a103-4a341ca2e599" data-file-name="app/page.tsx">Integrations</span></Link></li>
                <li data-unique-id="b3e92973-4574-4eae-966c-5642641bd696" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="7d2d20af-2856-48ae-bba4-435b4ab3babe" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="bbb45ed3-4998-401d-8d4b-6087d1fea527" data-file-name="app/page.tsx">Changelog</span></Link></li>
              </ul>
            </div>

            <div data-unique-id="1ba1cbc3-72ae-4ad2-9455-4637525a1b6a" data-file-name="app/page.tsx">
              <h4 className="font-medium mb-4" data-unique-id="12207cd9-1705-400d-95fe-c0e800b379e6" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="f18059c9-7b1b-4147-986b-ae385c2548a3" data-file-name="app/page.tsx">Resources</span></h4>
              <ul className="space-y-2 text-sm text-muted-foreground" data-unique-id="1f1ae89d-413e-4bac-8039-feea32e36a80" data-file-name="app/page.tsx">
                <li data-unique-id="378bd702-f404-498e-b2c3-1607744387c1" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="945d8595-d125-4af3-855e-8d045951e5c7" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="6a1ba1b4-9417-44e5-a458-61f5f0e6beee" data-file-name="app/page.tsx">Documentation</span></Link></li>
                <li data-unique-id="9ef2d740-72d1-41a4-81e7-3d3064d14d74" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="0179ebe8-1a30-4128-8c30-76bdc4275c76" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="55964113-da1e-4834-87da-6665835d1352" data-file-name="app/page.tsx">API</span></Link></li>
                <li data-unique-id="b6c6d804-819d-4a70-9025-ba33b595beee" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="9db96265-e162-437d-8602-7a73b87fb0da" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="b9eb4986-e8bd-4ffd-aa7c-b038106ffb24" data-file-name="app/page.tsx">Guides</span></Link></li>
                <li data-unique-id="73f82e07-58e0-4744-92cb-943d05b06577" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="855c9ddc-c926-49b1-92ad-f1e7b6f76709" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="65588494-0cc3-4301-b8ed-4c62e48e391f" data-file-name="app/page.tsx">Help Center</span></Link></li>
              </ul>
            </div>

            <div data-unique-id="76eda20a-0ce5-436f-b6f8-802706096bc4" data-file-name="app/page.tsx">
              <h4 className="font-medium mb-4" data-unique-id="eab35ce8-285b-4156-b867-4cb2be004f23" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="12c8bb0d-2867-46ed-8db0-b548c16cfaf9" data-file-name="app/page.tsx">Company</span></h4>
              <ul className="space-y-2 text-sm text-muted-foreground" data-unique-id="4857c64c-f8f3-446d-9770-b20ac58a7604" data-file-name="app/page.tsx">
                <li data-unique-id="681b7599-29fb-47fa-93b2-86cd89cc7af4" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="24b3857e-5a15-4d3c-b872-b6817227c478" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="51720d03-745c-4e52-a299-205bfbcc1a01" data-file-name="app/page.tsx">About</span></Link></li>
                <li data-unique-id="8b17586d-d1fe-4670-aaaa-28b005c24594" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="d0836362-4196-4613-9769-8eca50112945" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="cb2a072a-6ef4-4a47-a0a1-9928edf1145e" data-file-name="app/page.tsx">Blog</span></Link></li>
                <li data-unique-id="b4c2b857-f13c-40d1-9aa2-5d893e02f395" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="4b500b6d-2cb5-427f-b561-41ad329c43c7" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="d8cd3eaf-edc9-418a-8bb2-fc7d09121adc" data-file-name="app/page.tsx">Careers</span></Link></li>
                <li data-unique-id="f343588a-2eb1-4a4d-9cf3-31501fabdacf" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="eacb8f0b-5e8f-4121-81ce-afc4cdd3ad10" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="d5f52af3-8740-4c5c-82c5-4939ae36ba6b" data-file-name="app/page.tsx">Contact</span></Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center" data-unique-id="ccc2f722-d7d7-4046-828b-b65cf05eac0b" data-file-name="app/page.tsx">
            <div className="flex items-center" data-unique-id="b240403b-9a25-45d5-adc3-3e0f8f9f5a78" data-file-name="app/page.tsx">
              <div className="text-xl logo font-bold text-primary mr-2" data-unique-id="b5fc2cca-eb32-4640-ac8f-ead5b587baa1" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="ed486848-eacc-4c1e-ba41-0d40f5078382" data-file-name="app/page.tsx">SKOOP</span></div>
              <div className="text-sm text-muted-foreground" data-unique-id="eab8565b-dd24-4183-9654-76f37169ae27" data-file-name="app/page.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="d23feff7-b43c-4e4d-81e7-b5ebe23345b3" data-file-name="app/page.tsx">
                © </span>{new Date().getFullYear()}<span className="editable-text" data-unique-id="3fdcf6ea-dd07-4828-93b9-aae229b909e7" data-file-name="app/page.tsx"> All rights reserved.
              </span></div>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0" data-unique-id="e64dd9bc-95f0-4da4-9a56-0b9c7da84597" data-file-name="app/page.tsx">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors" data-unique-id="98e9eb17-ba0d-4e83-8332-994178b2c1d1" data-file-name="app/page.tsx">
                <span className="sr-only" data-unique-id="257b6357-e533-4907-a274-96ea6b4b07c1" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="4814c125-51d1-4b5e-b24a-96f5b89a0e30" data-file-name="app/page.tsx">X</span></span>
                <X className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors" data-unique-id="28340231-3863-4e20-aaba-75a42e872f35" data-file-name="app/page.tsx">
                <span className="sr-only" data-unique-id="5ce8d90d-8529-4de3-9098-f8557575b48d" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="1000de48-c88f-45c6-999c-b8e5a1d67cb1" data-file-name="app/page.tsx">GitHub</span></span>
                <Github className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>;
}