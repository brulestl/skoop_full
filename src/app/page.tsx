import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { AuroraBackground } from "@/components/ui/aurora-background";
import Link from "next/link";
import Image from "next/image";
import { Search, Github, Twitter, Code as StackOverflow, Bookmark, FolderPlus as Collection, CheckCircle2, ChevronRight, ArrowRight } from "lucide-react";
export default function HomePage() {
  return <div className="min-h-screen flex flex-col" data-unique-id="211a4b43-66b8-4e3a-b0ec-5cc227328664" data-file-name="app/page.tsx" data-dynamic-text="true">
      {/* Header */}
      <header className="border-b border-border relative z-10" data-unique-id="51517cd9-e3ac-4c47-8445-e2e77020d9c3" data-file-name="app/page.tsx">
        <div className="skoop-container flex items-center justify-between h-16" data-unique-id="82548130-d8fa-4a93-925b-1bbd7306adc9" data-file-name="app/page.tsx">
          <div className="flex items-center" data-unique-id="001105c6-f266-47f5-b221-8eb0799c3851" data-file-name="app/page.tsx">
            <div className="text-2xl font-bold text-primary" data-unique-id="77508e78-4991-415f-8390-b10d0f903a38" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="d1efa393-885e-4ec4-958c-d8aa4fca1c6e" data-file-name="app/page.tsx">SKOOP</span></div>
            <nav className="hidden ml-12 space-x-6 lg:flex" data-unique-id="035cb773-7dd6-41c3-98df-19ff6e1a66b6" data-file-name="app/page.tsx">
              <Link href="#features" className="text-foreground hover:text-primary transition-colors" data-unique-id="90761f66-61b4-4a04-be0b-551d06359c48" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="816ffc5d-d219-4775-95af-e03565a13584" data-file-name="app/page.tsx">Features</span></Link>
              <Link href="#pricing" className="text-foreground hover:text-primary transition-colors" data-unique-id="4595c348-11e5-4dc7-8de4-0bea2fc6d6ec" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="09b8dc69-0156-4b3d-9b18-ec59a53a7f9b" data-file-name="app/page.tsx">Pricing</span></Link>
              <Link href="#faq" className="text-foreground hover:text-primary transition-colors" data-unique-id="80197e6e-f48c-43fd-88ea-dc04e5e0fffe" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="140dc1be-8bea-4668-a2a3-55a2808ea909" data-file-name="app/page.tsx">FAQ</span></Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4" data-unique-id="a7590648-ab42-4bb5-882a-2c6e060ea8bf" data-file-name="app/page.tsx">
            <ThemeToggle />
            <a href="/dashboard" className="text-foreground hover:text-primary transition-colors" data-unique-id="cfb94b53-463f-40ef-907c-cd1f67bea116" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="3c86a85f-18ed-4150-bf3d-a17406064286" data-file-name="app/page.tsx">Dashboard</span></a>
            <a href="/login" className="text-foreground hover:text-primary transition-colors" data-unique-id="e081d00c-3f61-4ea8-a7d0-0a42a74e4f37" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="6c3b6584-8d38-480f-a691-8e92595f6a10" data-file-name="app/page.tsx">Log in</span></a>
            <Button className="skoop-button-accent" data-unique-id="5522f72f-372d-4ddb-be86-a47618e2cbe3" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="d896e705-7efb-453c-b33b-ff8325169981" data-file-name="app/page.tsx">Sign Up Free</span></Button>
          </div>
        </div>
      </header>

      <main className="flex-grow" data-unique-id="581c586a-993a-4598-8cd6-2ed9026d08bc" data-file-name="app/page.tsx" data-dynamic-text="true">
        {/* Hero Section with Aurora Background */}
        <section className="relative overflow-hidden" data-unique-id="eb40c2d9-fea5-435f-8fc0-cfd9508e45b1" data-file-name="app/page.tsx">
          <AuroraBackground className="absolute inset-0">
            <div className="absolute inset-0 bg-background/40 backdrop-blur-sm" data-unique-id="af220064-e376-4ab6-b9d1-0b9e9e2ec517" data-file-name="app/page.tsx" />
          </AuroraBackground>
          
          <div className="skoop-section relative z-10" data-unique-id="81ea50a1-34e5-40c6-9b13-9ce7d64ce1fb" data-file-name="app/page.tsx">
          <div className="skoop-container" data-unique-id="5f5f5aad-2562-4b3e-b26d-13d9467d4c05" data-file-name="app/page.tsx" data-dynamic-text="true">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-24 items-center" data-unique-id="a18ec95c-3c72-4e2d-bc7b-704635bbc169" data-file-name="app/page.tsx">
              <div data-unique-id="fe75765e-938b-47bc-9b80-f3675723ac15" data-file-name="app/page.tsx">
                <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl mb-6" data-unique-id="e38fbf3d-aac4-4145-8517-0f137819ebee" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="042f07b5-fcb3-4cf3-9aa2-f51888217e47" data-file-name="app/page.tsx">
                  Collect, search and </span><span className="text-primary" data-unique-id="e90e8c4b-20af-404f-8f53-480888240779" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="3b7587ad-1dd8-4345-928c-28bd208d5afe" data-file-name="app/page.tsx">rediscover</span></span><span className="editable-text" data-unique-id="6fd7985d-aba8-4852-84cb-0ca270fa122d" data-file-name="app/page.tsx"> your saved content
                </span></h1>
                <p className="text-lg text-muted-foreground mb-8" data-unique-id="bb400499-e0e4-4b37-bb49-31fcdd44d1ad" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="77519556-c720-4081-aa8b-2f06d146c390" data-file-name="app/page.tsx">
                  One calm space for all your saved tweets, GitHub stars, Reddit posts, and Stack Overflow favorites.
                </span></p>
                <div className="flex flex-col sm:flex-row gap-4" data-unique-id="9c1398e6-4d8b-452c-9457-117e4ffd430a" data-file-name="app/page.tsx">
                  <Button className="skoop-button-accent" size="lg" data-unique-id="398a0250-707b-4d2b-b535-f8d5bf38c35c" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="8d34f2d3-fdf0-48e8-9f74-996c855d72bb" data-file-name="app/page.tsx">Get Started</span></Button>
                  <Button variant="outline" size="lg" className="group" data-unique-id="ec0b8926-e94c-4957-a7c9-74ff8f5782b0" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="020484cb-dd76-4bef-b665-a2e7a4a8ae58" data-file-name="app/page.tsx">
                    How It Works
                    </span><ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
                <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground" data-unique-id="ffe55eda-d93d-4186-85de-5fca36bd92c5" data-file-name="app/page.tsx">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span data-unique-id="0e758bf5-41e3-43c2-b972-156a123d8b24" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="d6dd32d8-61ce-40cd-be2a-46b18cab16fc" data-file-name="app/page.tsx">No credit card required</span></span>
                </div>
              </div>
              <div className="relative" data-unique-id="a4e83ffe-ca35-4303-9059-0835d78f50da" data-file-name="app/page.tsx" data-dynamic-text="true">
                <div className="skoop-card overflow-hidden" data-unique-id="7d173ca2-02e5-490c-b8e6-96921382b146" data-file-name="app/page.tsx">
                  <Image src="https://images.unsplash.com/photo-1508921340878-ba53e1f016ec?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3" alt="SKOOP Dashboard" width={600} height={400} className="w-full h-auto rounded-t-[var(--radius)]" data-unique-id="882f1d90-996c-4f8f-ba5e-8474ccd48706" data-file-name="app/page.tsx" />
                  <div className="p-6" data-unique-id="9aa40a93-d954-45b3-9651-24aa5168d516" data-file-name="app/page.tsx">
                    <div className="flex items-center justify-between mb-4" data-unique-id="721f160b-f80f-476d-a581-8559c09d708b" data-file-name="app/page.tsx">
                      <div className="font-semibold" data-unique-id="0201f026-9c99-4667-b716-3e562e23daa1" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="ccbc1084-2a9b-4a65-a20c-440dd08ddace" data-file-name="app/page.tsx">Recent Saves</span></div>
                      <Search className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="space-y-3" data-unique-id="080e3835-19d4-4a63-ba80-bffa47ba2927" data-file-name="app/page.tsx" data-dynamic-text="true">
                      {[1, 2, 3].map(i => <div key={i} className="flex items-center gap-3 p-3 rounded-md bg-secondary/50" data-unique-id="d54f4e39-675f-474b-9bb8-5411e1a5de78" data-file-name="app/page.tsx" data-dynamic-text="true">
                          {i === 1 && <Github className="h-5 w-5 text-foreground" />}
                          {i === 2 && <Twitter className="h-5 w-5 text-foreground" />}
                          {i === 3 && <StackOverflow className="h-5 w-5 text-foreground" />}
                          <div className="flex-grow" data-unique-id="1285ab20-c42f-4013-9131-797d31301089" data-file-name="app/page.tsx">
                            <div className="text-sm font-medium truncate" data-unique-id="ced0ef33-7d52-4fea-aee6-fd7a91e187f5" data-file-name="app/page.tsx" data-dynamic-text="true">
                              {i === 1 && "Interesting open source project for data visualization"}
                              {i === 2 && "Thread: 10 tips for better React performance"}
                              {i === 3 && "How to optimize PostgreSQL queries for large datasets"}
                            </div>
                            <div className="text-xs text-muted-foreground mt-0.5" data-unique-id="df14da47-472d-44ea-a00f-80ebf2ff205b" data-file-name="app/page.tsx" data-dynamic-text="true">
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
                <div className="absolute -left-8 top-1/2 bg-card p-3 rounded-full shadow-lg border border-border hidden lg:block" data-unique-id="72f4a95e-f053-48fd-9c5e-80ff56cda066" data-file-name="app/page.tsx">
                  <Github className="h-6 w-6 text-primary" />
                </div>
                <div className="absolute -right-8 bottom-1/3 bg-card p-3 rounded-full shadow-lg border border-border hidden lg:block" data-unique-id="2ef5e977-a0b8-4902-902b-9f7a5a119bce" data-file-name="app/page.tsx">
                  <Twitter className="h-6 w-6 text-accent" />
                </div>
              </div>
            </div>

            {/* Logos */}
            <div className="mt-20" data-unique-id="74e46bf0-b8a7-42d2-b1b7-63a86db929c4" data-file-name="app/page.tsx">
              <p className="text-center text-sm text-muted-foreground mb-6" data-unique-id="ec4553b2-43a9-45a0-8c64-88d01688278e" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="8c99ee4b-1e0f-40de-ba25-196f0d7ee092" data-file-name="app/page.tsx">
                Connect with your favorite platforms
              </span></p>
              <div className="flex justify-center items-center flex-wrap gap-8 md:gap-12" data-unique-id="c3ebde1d-2154-4ccf-b55a-661063f3c669" data-file-name="app/page.tsx">
                <Github className="h-8 w-8 text-muted-foreground" />
                <Twitter className="h-8 w-8 text-muted-foreground" />
                <StackOverflow className="h-8 w-8 text-muted-foreground" />
                <div className="text-muted-foreground text-xl font-semibold" data-unique-id="23b4b10a-4c0c-4a39-902f-b99cd4f35f99" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="631812c5-d111-4baa-9838-a3b5dfffb0f7" data-file-name="app/page.tsx">Reddit</span></div>
                <div className="text-muted-foreground text-xl font-semibold" data-unique-id="dcaa2dff-b511-4bb2-9e66-6b9f47d2a36c" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="ca078805-a172-4456-a84f-034c14d1b53a" data-file-name="app/page.tsx">DEV</span></div>
              </div>
            </div>
          </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="skoop-section" data-unique-id="90e963a6-5582-44ac-bc52-78eb41dd2e21" data-file-name="app/page.tsx">
          <div className="skoop-container" data-unique-id="858afd46-c32e-4a60-9a4c-8fce6cef26df" data-file-name="app/page.tsx">
            <div className="text-center mb-16" data-unique-id="2e76aab2-7fb7-4562-847d-92d824dd8bbe" data-file-name="app/page.tsx">
              <h2 className="text-3xl font-bold mb-4" data-unique-id="ab7e0eb8-4bf9-4b42-8551-be2ab9532ce6" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="6e84e918-d5b9-49ff-86ce-11e16bd42a79" data-file-name="app/page.tsx">Finally, a place for all your saved content</span></h2>
              <p className="text-muted-foreground max-w-2xl mx-auto" data-unique-id="99bc6d0e-6fb6-4f5f-a2cd-9874888173f6" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="52eee55b-cfb4-46a8-a77e-ce085f761072" data-file-name="app/page.tsx">
                SKOOP solves the problem of fragmented saves and makes it easy to find what you need when you need it.
              </span></p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3" data-unique-id="8bc75495-b93b-4ec2-9614-0134ec29b473" data-file-name="app/page.tsx" data-dynamic-text="true">
              {/* Feature 1 */}
              <div className="skoop-card p-6" data-unique-id="a87d3b41-558f-4c68-9aee-afda69a161f4" data-file-name="app/page.tsx">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary bg-opacity-10 mb-4" data-unique-id="63506cd2-3980-4d6f-a831-c28ee2dbb3d3" data-file-name="app/page.tsx">
                  <Bookmark className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3" data-unique-id="889f7717-47b7-4811-b8cf-babf547388d1" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="1293d33e-2332-4516-bb19-2fc2815d0de3" data-file-name="app/page.tsx">Unified Collection</span></h3>
                <p className="text-muted-foreground mb-4" data-unique-id="3aa4e191-d44e-43b7-9392-a946687e5430" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="fc35eb22-dacc-43cf-b96e-b21ff5972d43" data-file-name="app/page.tsx">
                  Import and sync all your saved content from GitHub, Twitter, Reddit, and Stack Overflow in one place.
                </span></p>
                <div className="pt-4 border-t border-border mt-auto" data-unique-id="cd168d04-6547-4474-8fbb-dc2d9e0081d5" data-file-name="app/page.tsx">
                  <Link href="#" className="inline-flex items-center text-primary hover:underline" data-unique-id="0cc9b38b-b903-4fee-9e8e-7c27c751a2bf" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="260e5092-9a50-4e6d-8fac-6c02723bfb5d" data-file-name="app/page.tsx">
                    Learn more </span><ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="skoop-card p-6" data-unique-id="9239a8bb-cd98-4aed-9f35-ed285f569ee0" data-file-name="app/page.tsx">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-accent bg-opacity-10 mb-4" data-unique-id="9240a296-f06d-4dc5-bba6-f63728a577e9" data-file-name="app/page.tsx">
                  <Search className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3" data-unique-id="d276d068-4970-46d5-8685-5643e13c16ef" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="a27e1159-c6f0-47af-9001-8d3d9f1766f4" data-file-name="app/page.tsx">Semantic Search</span></h3>
                <p className="text-muted-foreground mb-4" data-unique-id="d658dae5-3011-48da-b740-6d6c7469d032" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="ff8901d5-d799-456f-bb31-47e990b96b0f" data-file-name="app/page.tsx">
                  Find what you're looking for with powerful semantic search that understands the meaning behind your queries.
                </span></p>
                <div className="pt-4 border-t border-border mt-auto" data-unique-id="684db1f9-1843-4765-afb8-49769754a6bc" data-file-name="app/page.tsx">
                  <Link href="#" className="inline-flex items-center text-primary hover:underline" data-unique-id="629f5aea-c42a-4435-a1d8-50d45e9c081b" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="d80a31dd-9443-43b7-b004-25c4f8c0e8b3" data-file-name="app/page.tsx">
                    Learn more </span><ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="skoop-card p-6" data-unique-id="c3b539ab-a145-428b-ab58-27d855c1014c" data-file-name="app/page.tsx">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-destructive bg-opacity-10 mb-4" data-unique-id="1cb3965b-11ac-4abc-87d6-6c87a85f9827" data-file-name="app/page.tsx">
                  <Collection className="h-6 w-6 text-destructive" />
                </div>
                <h3 className="text-xl font-semibold mb-3" data-unique-id="5bc44fd1-7b69-421e-bbb9-0639391a25fd" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="3e3eb425-287e-4e93-b660-8703b992a3d8" data-file-name="app/page.tsx">Smart Collections</span></h3>
                <p className="text-muted-foreground mb-4" data-unique-id="d46bd729-32a4-4647-bda0-2806b12ec04c" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="9f5e8d74-8b59-4a71-84ce-463adf2db23a" data-file-name="app/page.tsx">
                  Organize your content with automated collections that group similar items together and surface the best content.
                </span></p>
                <div className="pt-4 border-t border-border mt-auto" data-unique-id="6d827c36-0282-4935-bea0-07ff344e22ee" data-file-name="app/page.tsx">
                  <Link href="#" className="inline-flex items-center text-primary hover:underline" data-unique-id="bdcbc819-947b-44d2-98b3-e7559ca057d1" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="ce91f63d-5782-46aa-b8f7-43166d849d89" data-file-name="app/page.tsx">
                    Learn more </span><ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="skoop-section bg-secondary bg-opacity-30" data-unique-id="0ab66a10-1443-440b-ac88-f0836d8c0937" data-file-name="app/page.tsx">
          <div className="skoop-container" data-unique-id="6c1a9d74-335f-4c90-a47c-7baad5c39ce9" data-file-name="app/page.tsx">
            <div className="text-center mb-16" data-unique-id="b391380b-ebea-438a-b7ce-021930c2bd9a" data-file-name="app/page.tsx">
              <h2 className="text-3xl font-bold mb-4" data-unique-id="90800826-e906-4f7c-bb4a-86dab93f5942" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="40c53118-5400-40d7-a61e-023983fcee6f" data-file-name="app/page.tsx">Simple, transparent pricing</span></h2>
              <p className="text-muted-foreground max-w-2xl mx-auto" data-unique-id="f6a16e83-6c00-437b-ae5b-4853bccfa686" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="bb17ff89-d215-46b6-84be-54e04c4e7cd1" data-file-name="app/page.tsx">
                Choose the plan that fits your needs. All plans include our core features.
              </span></p>
            </div>

            <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto" data-unique-id="3747ad32-0bda-4cc7-bbdf-6dff790b952c" data-file-name="app/page.tsx" data-dynamic-text="true">
              {/* Free Plan */}
              <div className="skoop-card p-6 flex flex-col h-full border border-border" data-unique-id="bda50905-4b43-4a3e-ac94-066d3666f232" data-file-name="app/page.tsx">
                <div className="mb-6" data-unique-id="d4f3773e-0351-450e-8c36-d1f6b68b3cf4" data-file-name="app/page.tsx">
                  <h3 className="text-lg font-medium mb-2" data-unique-id="914d2c3e-b149-45f3-8418-a26eb3087d82" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="e89bc996-28f2-4dbe-895e-e802f66507e1" data-file-name="app/page.tsx">Free</span></h3>
                  <div className="text-3xl font-bold" data-unique-id="5196188d-c1d0-48e6-a255-75f6666d2b28" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="a12afc7f-8ed1-4e79-9cf2-d3d7223edad9" data-file-name="app/page.tsx">$0</span><span className="text-muted-foreground text-sm font-normal" data-unique-id="340457f1-b5e9-4b1b-a42b-0d1be13edc14" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="876e6303-9dc6-4934-bef5-34ddd1b74b7c" data-file-name="app/page.tsx">/month</span></span></div>
                  <p className="text-muted-foreground text-sm mt-3" data-unique-id="bc2f8254-069e-41f8-8e3f-f23b96086aec" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="3b11772b-d85d-4470-bf4e-96d3a7db78e8" data-file-name="app/page.tsx">Perfect for getting started</span></p>
                </div>
                <ul className="space-y-3 mb-8" data-unique-id="71018480-aa2b-4ef5-a89d-02ea5392ff11" data-file-name="app/page.tsx">
                  <li className="flex items-start" data-unique-id="a8ab47bf-12e1-41e2-b5e4-3b96a63cbc99" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="ae2babbd-9a0d-472f-8f83-3ea06ce59a44" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="4b1d3241-54f3-4db0-a57b-8705bbbb5e22" data-file-name="app/page.tsx">500 saved items</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="d8f03df8-361e-4fd1-a443-d6956930bc42" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="7f7df59e-6468-4774-aa48-468c84cbae37" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="247c4d2f-4f4d-4e18-95c5-5f65f130cdf7" data-file-name="app/page.tsx">2 connected platforms</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="57978678-078f-4bce-bac7-35cc1363a00b" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="57be75a8-4d6f-4f7c-9e2c-30d5afbff606" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="c6942574-cfc8-4bc0-b9d7-f7aa82422e53" data-file-name="app/page.tsx">Basic search</span></span>
                  </li>
                </ul>
                <div className="mt-auto" data-unique-id="1d8fbe8d-73c6-43c9-82b2-a6a55537f267" data-file-name="app/page.tsx">
                  <Button className="w-full skoop-button-primary" data-unique-id="eea3839a-3e33-4eea-8bd2-b7fd350be2f5" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="afeb639a-7cb1-4f13-a1d6-66ea51a1e5e1" data-file-name="app/page.tsx">Get Started</span></Button>
                </div>
              </div>

              {/* Pro Plan */}
              <div className="skoop-card p-6 flex flex-col h-full border-2 border-primary relative" data-unique-id="aad57987-2ec6-415a-9da9-93f5cc154d7b" data-file-name="app/page.tsx">
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-sm font-medium rounded-bl-lg rounded-tr-[calc(var(--radius)-1px)]" data-unique-id="bc1e1217-1147-472a-bf32-5309eb04f67a" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="2883405d-df59-4eb0-bd22-f2149fee1529" data-file-name="app/page.tsx">
                  Popular
                </span></div>
                <div className="mb-6" data-unique-id="dda7d580-4951-4c2d-9349-f9212c7c41c8" data-file-name="app/page.tsx">
                  <h3 className="text-lg font-medium mb-2" data-unique-id="e3211682-e4a5-4b52-b612-ce40d4ec869d" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="abdfcef5-51c9-4d7b-a8d4-c4d09b034352" data-file-name="app/page.tsx">Pro</span></h3>
                  <div className="text-3xl font-bold" data-unique-id="e2449f0c-a74e-4fbd-88d1-3633fffe6ba6" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="db0c6e87-0f2a-4d36-a636-daddf08c7acf" data-file-name="app/page.tsx">$9</span><span className="text-muted-foreground text-sm font-normal" data-unique-id="154267ad-10d5-4013-95c3-b3e622cf3e55" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="e9442bea-dded-451b-8875-c80a171256db" data-file-name="app/page.tsx">/month</span></span></div>
                  <p className="text-muted-foreground text-sm mt-3" data-unique-id="b1a23ef0-dfcc-4e1f-8a66-2fb3cf63bab6" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="5367cc81-d437-4661-9d70-9236bbfcd9a9" data-file-name="app/page.tsx">For power users</span></p>
                </div>
                <ul className="space-y-3 mb-8" data-unique-id="f0fd90be-bc07-459b-a987-4351b0a56a81" data-file-name="app/page.tsx">
                  <li className="flex items-start" data-unique-id="0e45ada8-b541-423e-9d39-bb59569bdd2e" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="0e9ab58b-3192-43a1-b17a-f66fd84ae30a" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="a4a5c337-e06f-4fcd-99f0-a6bbf13b360c" data-file-name="app/page.tsx">Unlimited saved items</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="a51df308-fdb2-4025-b504-315a86b8568e" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="55baca89-b846-41bb-9d86-07836e230205" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="531474de-689c-41a2-bc02-f6694d12952e" data-file-name="app/page.tsx">All platforms</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="a8d7ea03-aa24-4c89-b566-d89c23c92f8f" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="a56a942a-39d8-462f-b7ef-44eddd670a60" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="3953ab06-0a3d-4c07-b2e1-1852f01324de" data-file-name="app/page.tsx">Advanced semantic search</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="ad7ef250-7db1-4227-9e7d-cb970135bcae" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="0c678a2b-8c13-49ec-bd55-fbde3897ce54" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="3abfd903-256f-4519-afc2-c524c76d8034" data-file-name="app/page.tsx">Smart collections</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="e1797bcc-32aa-4ffe-bc64-7001d358487c" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="83b00013-c122-4ce5-a680-0673d7ab9b52" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="828e8f46-9e34-4dac-845b-182fe06eb2d1" data-file-name="app/page.tsx">15-minute sync</span></span>
                  </li>
                </ul>
                <div className="mt-auto" data-unique-id="ed557b33-3880-4c83-80b0-3679644fcd49" data-file-name="app/page.tsx">
                  <Button className="w-full skoop-button-accent" data-unique-id="82b792be-95da-4c64-9027-5142bf29fd9c" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="03b0924f-820b-413f-8887-8ff40ff9469b" data-file-name="app/page.tsx">Choose Pro</span></Button>
                </div>
              </div>

              {/* Team Plan */}
              <div className="skoop-card p-6 flex flex-col h-full border border-border" data-unique-id="0919cd9a-42f0-4037-90e8-a9eff890f06c" data-file-name="app/page.tsx">
                <div className="mb-6" data-unique-id="e27f7f5d-b42f-493c-b649-9c20c5ac882e" data-file-name="app/page.tsx">
                  <h3 className="text-lg font-medium mb-2" data-unique-id="9dbe6962-f3ff-40f1-94b3-aacd154cfcce" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="ee1a4acb-99ad-494e-bb3a-e47639ca8c67" data-file-name="app/page.tsx">Team</span></h3>
                  <div className="text-3xl font-bold" data-unique-id="63a50b44-8b79-48e0-844e-49b39c98d88b" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="293254c2-af4c-47e2-a399-226b51346ad0" data-file-name="app/page.tsx">$19</span><span className="text-muted-foreground text-sm font-normal" data-unique-id="b15bd63b-2ae6-4c3c-90ec-5ca9fab0ad2b" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="4e02f73f-4503-4719-abd3-f3ed0348bc3e" data-file-name="app/page.tsx">/month</span></span></div>
                  <p className="text-muted-foreground text-sm mt-3" data-unique-id="f3a67d2b-1132-4446-affa-211810e33ec1" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="4536be9c-f5a9-46d2-827d-64d604c6e8a5" data-file-name="app/page.tsx">Collaborate with your team</span></p>
                </div>
                <ul className="space-y-3 mb-8" data-unique-id="c21072c2-b9b0-4977-b317-e1ac93fa442f" data-file-name="app/page.tsx">
                  <li className="flex items-start" data-unique-id="e92f80d8-f7f5-4c96-9c47-b785b08d1c4f" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="01a3976d-f8df-4d8d-a585-ee3cd64d75ca" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="8380c77c-37e0-4147-8d81-7c48df5aa40c" data-file-name="app/page.tsx">Everything in Pro</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="5685363a-8d18-412c-98a7-088f5f14d626" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="9ca2d39e-9ad0-4400-b058-0ebb2a683910" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="03ed2859-2df7-4969-80a4-b39f3cd851b4" data-file-name="app/page.tsx">5 team members</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="928900aa-a57a-4f4c-859e-0e7f7a6cde8c" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="63e30971-5617-475f-8e5e-7ffcb74a7a12" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="e0f5f2b0-4ddb-485a-b6a3-04e3f583b9ed" data-file-name="app/page.tsx">Shared collections</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="8b5f9243-c276-4b5b-b6f0-fb36c853342a" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="8e237150-5812-49f6-b9bb-f64894573ef4" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="f67a40e6-ec50-4c38-86fa-1fe9ae4168e1" data-file-name="app/page.tsx">Collaboration tools</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="d655dbe9-c02f-4bb3-8080-505829cfbcb8" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="2d0c2c6f-4fbb-46d0-a457-2b03ce2d1e9a" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="ddea7d95-03b7-4615-b9e0-490f4e9d46b6" data-file-name="app/page.tsx">Advanced analytics</span></span>
                  </li>
                </ul>
                <div className="mt-auto" data-unique-id="731c104c-4a5c-4fa9-9b1d-1255fa31416c" data-file-name="app/page.tsx">
                  <Button className="w-full skoop-button-primary" data-unique-id="4e62d7c5-3faf-43f0-bad4-dd2b96bd1367" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="75a3d6b9-27ac-4efd-ad5f-8105bb846e41" data-file-name="app/page.tsx">Choose Team</span></Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="skoop-section" data-unique-id="6243fe2e-4eeb-463b-9d22-d63a286d6d9c" data-file-name="app/page.tsx">
          <div className="skoop-container max-w-4xl" data-unique-id="cf978ef4-7f51-4b2e-973d-fda532faabcb" data-file-name="app/page.tsx">
            <div className="skoop-card p-8 md:p-12 text-center" data-unique-id="19b2e23a-ca4a-4e47-a7ab-b4eb75f536cd" data-file-name="app/page.tsx">
              <h2 className="text-2xl md:text-3xl font-bold mb-4" data-unique-id="2393fa4d-b1ef-4aaa-acf0-13fbd9e9d96f" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="b29b1816-c33c-40ac-9ca0-5d86648c48a4" data-file-name="app/page.tsx">Ready to organize your digital knowledge?</span></h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto" data-unique-id="8997ead8-6334-437a-b555-5306f5c24cfb" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="43fdce8b-68fe-4f75-8a80-5e5b47c0cfd2" data-file-name="app/page.tsx">
                Join thousands of developers, designers, and researchers who are using SKOOP to make the most of their saved content.
              </span></p>
              <div className="flex flex-col sm:flex-row justify-center gap-4" data-unique-id="9e9528d6-060f-434e-9ab1-782a81bfa6a2" data-file-name="app/page.tsx">
                <Button className="skoop-button-accent" size="lg" data-unique-id="5582a6be-39d7-4e54-ac18-7590d77d0ba1" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="0b6849bf-5078-4e1e-92d4-5bfc096980f9" data-file-name="app/page.tsx">Get Started for Free</span></Button>
                <Button variant="outline" size="lg" data-unique-id="06e69f97-add0-4d36-b7e8-74c8fbd95b3b" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="faf7c712-31d6-436a-826d-ef22fc3e4709" data-file-name="app/page.tsx">
                  Request Demo
                </span></Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-secondary bg-opacity-30 border-t border-border py-12" data-unique-id="309cb080-f6b9-4861-b34a-a08d869045c6" data-file-name="app/page.tsx">
        <div className="skoop-container" data-unique-id="b0477cfa-3fd5-483d-a788-60805ff553ce" data-file-name="app/page.tsx">
          <div className="grid gap-8 md:grid-cols-4" data-unique-id="59500675-ad11-46cc-b004-06a5e6d8b129" data-file-name="app/page.tsx">
            <div data-unique-id="6cd589c1-3bbd-41f5-90ec-6a4563a9a886" data-file-name="app/page.tsx">
              <div className="text-2xl font-bold text-primary mb-4" data-unique-id="1060da4c-ce1a-4dca-b15d-b83ebb57ea46" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="6357d303-a1db-4bfe-91b1-b63d58bc7abc" data-file-name="app/page.tsx">SKOOP</span></div>
              <p className="text-muted-foreground text-sm" data-unique-id="d288c6e0-47e0-48c8-b2da-43a97056f586" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="e69f0fd2-1c70-40a4-b840-ca870a86f21d" data-file-name="app/page.tsx">
                The all-in-one platform for collecting, searching and rediscovering your saved content.
              </span></p>
            </div>

            <div data-unique-id="dfb601d8-ca03-4d5b-8a35-ed62f5499d4a" data-file-name="app/page.tsx">
              <h4 className="font-medium mb-4" data-unique-id="18e9b046-a2c7-43fe-a562-79707565f05c" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="edd437b7-6511-4d93-ab59-e2a3acb06f5c" data-file-name="app/page.tsx">Product</span></h4>
              <ul className="space-y-2 text-sm text-muted-foreground" data-unique-id="70c22cd1-c1b6-491b-b73f-839a254d6076" data-file-name="app/page.tsx">
                <li data-unique-id="d42bdd81-1742-4754-aeb2-772c67a80e3c" data-file-name="app/page.tsx"><Link href="#features" className="hover:text-primary transition-colors" data-unique-id="c4127afb-8e07-475b-8b25-5b743b4c35f0" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="0f6ef0cf-54b3-4c97-baf9-f2f7e44d1fc8" data-file-name="app/page.tsx">Features</span></Link></li>
                <li data-unique-id="489e2ef2-ae0f-4fd0-934c-3df0bc8b1ae2" data-file-name="app/page.tsx"><Link href="#pricing" className="hover:text-primary transition-colors" data-unique-id="af218709-c15b-4c1f-973b-a5f9924d1956" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="89b7b1f5-5d4e-40d9-96e3-30c1aa47af01" data-file-name="app/page.tsx">Pricing</span></Link></li>
                <li data-unique-id="494d7074-dce6-4383-a027-1986bc767efc" data-file-name="app/page.tsx"><Link href="/dashboard" className="hover:text-primary transition-colors" data-unique-id="25eb44bb-db47-4253-8935-28420c377028" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="199678a8-e29f-4f99-b7a7-ad9dd132958e" data-file-name="app/page.tsx">Dashboard</span></Link></li>
                <li data-unique-id="ec844bd6-90a7-45d2-8075-150e6dd8bb68" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="a924c208-7638-446c-820d-5355e6b27793" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="2391eaf6-9c46-484a-bf5c-511d7d6fcde9" data-file-name="app/page.tsx">Integrations</span></Link></li>
                <li data-unique-id="86cd4eef-9aeb-4f87-a50e-23051ae721cf" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="ad81e1ec-69e1-499e-9fc2-6f77a0f0be39" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="36665f6c-2526-4542-949b-9371c852d741" data-file-name="app/page.tsx">Changelog</span></Link></li>
              </ul>
            </div>

            <div data-unique-id="91412f4e-a670-4ae6-b866-b2f0da93fd1a" data-file-name="app/page.tsx">
              <h4 className="font-medium mb-4" data-unique-id="5157c634-a369-40cb-95fe-1562a17f4296" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="5d4040c9-ba23-42b7-8393-9a8787288cd1" data-file-name="app/page.tsx">Resources</span></h4>
              <ul className="space-y-2 text-sm text-muted-foreground" data-unique-id="8b590a07-00de-46f7-aaef-c3ee5a7fd4b8" data-file-name="app/page.tsx">
                <li data-unique-id="50fdaf09-72d0-44a3-ad07-5d7963e01565" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="41a4a8cd-4b25-470c-a79b-b31facc0f9b8" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="c1f846ed-dca4-4f97-8004-bc07a096d73a" data-file-name="app/page.tsx">Documentation</span></Link></li>
                <li data-unique-id="31226376-c894-4fe1-bf18-acbd5dd3084d" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="aa7e08b3-85d9-4b13-89a7-141ef4afaf9b" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="8f5722ba-866c-41bf-bbe9-310bccbc088f" data-file-name="app/page.tsx">API</span></Link></li>
                <li data-unique-id="7bde1b4b-2277-41fd-9de5-95d07cd153af" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="243a299c-205b-41bd-8e5b-88b38e4ca68a" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="183989a4-3686-4ea1-b38c-ec40ec8da020" data-file-name="app/page.tsx">Guides</span></Link></li>
                <li data-unique-id="877f7e25-3395-4143-9b82-3799610829f9" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="ee596e3f-f422-4940-89cc-ab354c856623" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="e429f90d-1577-410c-8cd7-00ef0ab0d691" data-file-name="app/page.tsx">Help Center</span></Link></li>
              </ul>
            </div>

            <div data-unique-id="d37287ff-bf8e-456e-852d-6ae864669236" data-file-name="app/page.tsx">
              <h4 className="font-medium mb-4" data-unique-id="aa55f813-4ac6-4b15-81f6-814a9fa87443" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="58a8adc7-d21a-45f4-93f2-9c1d707ea680" data-file-name="app/page.tsx">Company</span></h4>
              <ul className="space-y-2 text-sm text-muted-foreground" data-unique-id="2ca5c70d-e5fb-4782-ace2-38c6ac923753" data-file-name="app/page.tsx">
                <li data-unique-id="7417833c-2907-4e59-9261-daf75a52e093" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="57a4dd70-0392-4cc9-8e64-5041a6fc7f08" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="3e57b375-74f5-4305-836e-e336a83bd51a" data-file-name="app/page.tsx">About</span></Link></li>
                <li data-unique-id="c13d8a90-4518-418e-9704-f98c11c53721" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="05037d15-67fe-4ccc-803c-23828baa5e58" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="826b5f14-5252-4526-bc78-9a7dee2cc8dc" data-file-name="app/page.tsx">Blog</span></Link></li>
                <li data-unique-id="58b8d789-bc5b-4ff2-bb25-4cd3c7d7d641" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="8337baab-b89f-4d18-ae40-f02fe4219350" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="caad1beb-5213-45f7-a64f-4e7609305b8c" data-file-name="app/page.tsx">Careers</span></Link></li>
                <li data-unique-id="90b342ee-ac92-4f5c-9f6b-00a63e34a0a0" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="1957ded7-502c-46c3-b7c2-57dada7f6c75" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="5a648cb5-aab2-4302-83bf-8b89c25ae0cb" data-file-name="app/page.tsx">Contact</span></Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center" data-unique-id="0142125d-c8ee-416b-b9f0-c2c30df3d600" data-file-name="app/page.tsx">
            <div className="text-sm text-muted-foreground" data-unique-id="deb73803-1f91-45e7-9ae7-3c5b278bc597" data-file-name="app/page.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="e1f0e1fb-62af-479c-8e16-85257b404a8c" data-file-name="app/page.tsx">
              © </span>{new Date().getFullYear()}<span className="editable-text" data-unique-id="702ae8d5-25e7-4b67-a602-2cf31fc90304" data-file-name="app/page.tsx"> SKOOP. All rights reserved.
            </span></div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0" data-unique-id="290a010f-7ffa-4989-bfb7-acb974a51cc9" data-file-name="app/page.tsx">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors" data-unique-id="64b51907-3495-478a-9765-58a15ada8a73" data-file-name="app/page.tsx">
                <span className="sr-only" data-unique-id="db77c044-87f0-4d52-8b20-6a0e5b20e584" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="bbb89f9c-e5d8-4ff7-a752-3aeee7997224" data-file-name="app/page.tsx">Twitter</span></span>
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors" data-unique-id="f19b67cb-f40f-424f-9dd4-af53a30587d8" data-file-name="app/page.tsx">
                <span className="sr-only" data-unique-id="6b87afa1-195b-411f-a297-188579eaae8a" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="c2b302a1-2ed1-4cfe-8fe8-dc39d9fe2d2d" data-file-name="app/page.tsx">GitHub</span></span>
                <Github className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>;
}