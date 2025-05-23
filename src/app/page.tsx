import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import Image from "next/image";
import { Search, Github, Twitter, Code as StackOverflow, Bookmark, FolderPlus as Collection, CheckCircle2, ChevronRight, ArrowRight } from "lucide-react";
export default function HomePage() {
  return <div className="min-h-screen flex flex-col" data-unique-id="5e536d20-89a3-4a65-8611-407a596ae620" data-file-name="app/page.tsx" data-dynamic-text="true">
      {/* Header */}
      <header className="border-b border-border" data-unique-id="8e8b4771-7c2f-4abb-b1f4-aab6bb8fbcaa" data-file-name="app/page.tsx">
        <div className="skoop-container flex items-center justify-between h-16" data-unique-id="a759cf04-4a1f-42ac-9245-eda31d293701" data-file-name="app/page.tsx">
          <div className="flex items-center" data-unique-id="97da532a-9b00-42cf-b456-8da968e75552" data-file-name="app/page.tsx">
            <div className="text-2xl font-bold text-primary" data-unique-id="d64966fa-8d5d-4f0e-ac00-5039aebb9162" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="c6d3d3fe-e85c-4cf0-9c5b-8a12d60264ad" data-file-name="app/page.tsx">SKOOP</span></div>
            <nav className="hidden ml-12 space-x-6 lg:flex" data-unique-id="776203f5-db3f-474c-8230-f43587bd6b51" data-file-name="app/page.tsx">
              <Link href="#features" className="text-foreground hover:text-primary transition-colors" data-unique-id="b89c7946-f0d2-48ea-9da6-c82070e64e9e" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="d4cbe809-0581-4534-8120-7563d2584169" data-file-name="app/page.tsx">Features</span></Link>
              <Link href="#pricing" className="text-foreground hover:text-primary transition-colors" data-unique-id="a08551cf-929a-4e8a-b59f-c6d6f5d9f04f" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="58d181c7-1754-4355-8905-6fcaa982b2bb" data-file-name="app/page.tsx">Pricing</span></Link>
              <Link href="#faq" className="text-foreground hover:text-primary transition-colors" data-unique-id="aaaf964f-9e22-4c0c-853f-8ceac8274d5b" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="a3773eaf-1e4c-4507-9c57-576cce48843d" data-file-name="app/page.tsx">FAQ</span></Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4" data-unique-id="725e5142-077b-414d-99e3-e542ea304023" data-file-name="app/page.tsx">
            <ThemeToggle />
            <a href="/dashboard" className="text-foreground hover:text-primary transition-colors" data-unique-id="4b2fa15c-769e-4120-b533-0eef4d5811c5" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="a586fed4-c739-45bf-9db5-b25d7d112ebc" data-file-name="app/page.tsx">Dashboard</span></a>
            <a href="/login" className="text-foreground hover:text-primary transition-colors" data-unique-id="fa83eb65-395e-4f26-b828-5e3b73778089" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="8fa8ab2f-6ce8-411b-a0e7-ba6eb96d499e" data-file-name="app/page.tsx">Log in</span></a>
            <Button className="skoop-button-accent" data-unique-id="e32d75f0-de3d-45f0-aa0c-e8dd580a7a36" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="be9dfc0a-8dfd-4ce4-a358-f1ccd7d441ee" data-file-name="app/page.tsx">Sign Up Free</span></Button>
          </div>
        </div>
      </header>

      <main className="flex-grow" data-unique-id="20460e96-1efb-47e1-995c-0d7cd2411a96" data-file-name="app/page.tsx" data-dynamic-text="true">
        {/* Hero Section */}
        <section className="skoop-section bg-gradient-to-b from-background to-secondary/20" data-unique-id="c00e2172-bd11-4e2e-b578-899346edbff2" data-file-name="app/page.tsx">
          <div className="skoop-container" data-unique-id="fa4a9176-c03c-403f-a738-0cbd6e0c87d8" data-file-name="app/page.tsx" data-dynamic-text="true">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-24 items-center" data-unique-id="ec0b1cea-126c-4db1-af37-f2f6068cd447" data-file-name="app/page.tsx">
              <div data-unique-id="b6ef1420-8c3d-409c-b82c-2b6f5dd7da91" data-file-name="app/page.tsx">
                <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl mb-6" data-unique-id="23e2d5ab-6659-466b-b77b-10cd1b721b42" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="f070dc11-5a1e-4816-85cc-794d52700703" data-file-name="app/page.tsx">
                  Collect, search and </span><span className="text-primary" data-unique-id="8e2bd638-f5f1-4c74-ad4c-b0ec245d9ddb" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="ca6e5370-6d2d-4b15-b789-fee256d651f8" data-file-name="app/page.tsx">rediscover</span></span><span className="editable-text" data-unique-id="2b148dc0-b234-4ea1-a46a-db6b62f3e539" data-file-name="app/page.tsx"> your saved content
                </span></h1>
                <p className="text-lg text-muted-foreground mb-8" data-unique-id="55de8c81-ad13-4f3f-b9cd-142950bbf238" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="2252d87a-1465-41e7-b713-3d2e8dc8c034" data-file-name="app/page.tsx">
                  One calm space for all your saved tweets, GitHub stars, Reddit posts, and Stack Overflow favorites.
                </span></p>
                <div className="flex flex-col sm:flex-row gap-4" data-unique-id="6c2836f0-22bf-47e1-b130-481e90cce9d6" data-file-name="app/page.tsx">
                  <Button className="skoop-button-accent" size="lg" data-unique-id="b539638f-cc7a-49c7-9e2b-9469e9b83df0" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="9edaa424-5cf6-49e2-8f05-b4214afbb9af" data-file-name="app/page.tsx">Get Started</span></Button>
                  <Button variant="outline" size="lg" className="group" data-unique-id="4354f42e-7825-45f6-a9c9-4015306d9c6e" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="cd3af802-1395-42d8-8403-e7b06c5d7b1b" data-file-name="app/page.tsx">
                    How It Works
                    </span><ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
                <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground" data-unique-id="fa9f5eb4-8c8a-4c64-a969-bfde804772dd" data-file-name="app/page.tsx">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span data-unique-id="b6c8794a-70f3-4ed1-be1a-10f42466aa5a" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="fa4bdf3b-2281-4e16-8574-f23fb863daf4" data-file-name="app/page.tsx">No credit card required</span></span>
                </div>
              </div>
              <div className="relative" data-unique-id="9f55d14a-3610-4bff-88b8-9e9154ee475c" data-file-name="app/page.tsx" data-dynamic-text="true">
                <div className="skoop-card overflow-hidden" data-unique-id="1060cec6-87c9-4ae8-8ea2-a7a522ce32f5" data-file-name="app/page.tsx">
                  <Image src="https://images.unsplash.com/photo-1508921340878-ba53e1f016ec?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3" alt="SKOOP Dashboard" width={600} height={400} className="w-full h-auto rounded-t-[var(--radius)]" data-unique-id="ebc40451-ffed-427a-91a9-fda39e7b122f" data-file-name="app/page.tsx" />
                  <div className="p-6" data-unique-id="3129e132-d0ae-4b25-a499-35bb7bc770d5" data-file-name="app/page.tsx">
                    <div className="flex items-center justify-between mb-4" data-unique-id="e5bc5f7f-50e9-4dbc-acbe-c6ea38eb0645" data-file-name="app/page.tsx">
                      <div className="font-semibold" data-unique-id="ba425755-df06-409c-be72-9f70d7ddcd1c" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="7ac33e98-e46b-452d-90fd-28a852fc5c7b" data-file-name="app/page.tsx">Recent Saves</span></div>
                      <Search className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="space-y-3" data-unique-id="ff9f328e-f41c-407a-a7f5-5e882eefd83a" data-file-name="app/page.tsx" data-dynamic-text="true">
                      {[1, 2, 3].map(i => <div key={i} className="flex items-center gap-3 p-3 rounded-md bg-secondary/50" data-unique-id="64bbc703-b14e-478c-98ed-bda0ccd83ca6" data-file-name="app/page.tsx" data-dynamic-text="true">
                          {i === 1 && <Github className="h-5 w-5 text-foreground" />}
                          {i === 2 && <Twitter className="h-5 w-5 text-foreground" />}
                          {i === 3 && <StackOverflow className="h-5 w-5 text-foreground" />}
                          <div className="flex-grow" data-unique-id="ce4c573c-1ec5-48d7-8832-b827ffcb33b3" data-file-name="app/page.tsx">
                            <div className="text-sm font-medium truncate" data-unique-id="e1d9b90f-f532-4653-a4f4-662ba18a3f5a" data-file-name="app/page.tsx" data-dynamic-text="true">
                              {i === 1 && "Interesting open source project for data visualization"}
                              {i === 2 && "Thread: 10 tips for better React performance"}
                              {i === 3 && "How to optimize PostgreSQL queries for large datasets"}
                            </div>
                            <div className="text-xs text-muted-foreground mt-0.5" data-unique-id="a20f38de-e139-4b9b-9d52-7ff15112f4a1" data-file-name="app/page.tsx" data-dynamic-text="true">
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
                <div className="absolute -left-8 top-1/2 bg-card p-3 rounded-full shadow-lg border border-border hidden lg:block" data-unique-id="99ee704c-c51b-4480-8852-9d3295dee7e4" data-file-name="app/page.tsx">
                  <Github className="h-6 w-6 text-primary" />
                </div>
                <div className="absolute -right-8 bottom-1/3 bg-card p-3 rounded-full shadow-lg border border-border hidden lg:block" data-unique-id="1684b41f-ac4a-4b86-81a5-19a678e31d05" data-file-name="app/page.tsx">
                  <Twitter className="h-6 w-6 text-accent" />
                </div>
              </div>
            </div>

            {/* Logos */}
            <div className="mt-20" data-unique-id="c019ce7e-ab8c-4d3e-9dbd-3f6fd645a5a2" data-file-name="app/page.tsx">
              <p className="text-center text-sm text-muted-foreground mb-6" data-unique-id="b1c53b59-62dd-4914-8d19-2c58f4df46f3" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="e0218a67-f9c5-41e4-9cd9-59bb734cd0fe" data-file-name="app/page.tsx">
                Connect with your favorite platforms
              </span></p>
              <div className="flex justify-center items-center flex-wrap gap-8 md:gap-12" data-unique-id="896479f2-5e74-4d79-ae97-69ce0c6f5104" data-file-name="app/page.tsx">
                <Github className="h-8 w-8 text-muted-foreground" />
                <Twitter className="h-8 w-8 text-muted-foreground" />
                <StackOverflow className="h-8 w-8 text-muted-foreground" />
                <div className="text-muted-foreground text-xl font-semibold" data-unique-id="08382a13-125e-464a-afcc-9d2a9a9ccddf" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="0b99fb05-3cd9-4db0-b0d1-45502f0e8ff3" data-file-name="app/page.tsx">Reddit</span></div>
                <div className="text-muted-foreground text-xl font-semibold" data-unique-id="73a228ab-7456-4cae-b48f-07dda1dd7814" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="5643de77-1985-46e8-b245-534102d9d59d" data-file-name="app/page.tsx">DEV</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="skoop-section" data-unique-id="d7d7a8ea-9c2c-4d50-8869-b6b6de543f11" data-file-name="app/page.tsx">
          <div className="skoop-container" data-unique-id="c54dd010-e3c7-44b0-87ee-9253c2a35eab" data-file-name="app/page.tsx">
            <div className="text-center mb-16" data-unique-id="ec5aaf7e-2784-430f-9745-5bee6f7c4130" data-file-name="app/page.tsx">
              <h2 className="text-3xl font-bold mb-4" data-unique-id="b6353f7a-076a-4431-a39b-12e6d5b33cea" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="91d6a8ab-6a3f-4c5a-b191-b8d76369d0e8" data-file-name="app/page.tsx">Finally, a place for all your saved content</span></h2>
              <p className="text-muted-foreground max-w-2xl mx-auto" data-unique-id="91686d8d-2bb3-4ee7-a15c-0f67db31d848" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="0d24613a-c185-4486-a87f-5d3de471e9ec" data-file-name="app/page.tsx">
                SKOOP solves the problem of fragmented saves and makes it easy to find what you need when you need it.
              </span></p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3" data-unique-id="3583f15a-57e5-450e-9194-37bf08f9c9e1" data-file-name="app/page.tsx" data-dynamic-text="true">
              {/* Feature 1 */}
              <div className="skoop-card p-6" data-unique-id="c5e1dae3-dd35-496f-bb67-0edd21c9699e" data-file-name="app/page.tsx">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary bg-opacity-10 mb-4" data-unique-id="2c8e332d-1405-4b3e-a53c-041bb4369734" data-file-name="app/page.tsx">
                  <Bookmark className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3" data-unique-id="e4250c8a-069e-4d97-99ca-1d135c0179f1" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="adaa8fb4-a0b4-4eb0-ac4d-0a45d13ce34e" data-file-name="app/page.tsx">Unified Collection</span></h3>
                <p className="text-muted-foreground mb-4" data-unique-id="16379d14-a538-4c56-9fe8-ebc649d9cef4" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="580b1461-0a55-45a2-b6b8-d5ea14191c78" data-file-name="app/page.tsx">
                  Import and sync all your saved content from GitHub, Twitter, Reddit, and Stack Overflow in one place.
                </span></p>
                <div className="pt-4 border-t border-border mt-auto" data-unique-id="057cf0ef-7001-4e4a-a1df-3bb0b7ecff7a" data-file-name="app/page.tsx">
                  <Link href="#" className="inline-flex items-center text-primary hover:underline" data-unique-id="f2c6d7c1-e6ce-452d-8147-521ac233311c" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="1a928207-0449-4537-a128-0501887a19c5" data-file-name="app/page.tsx">
                    Learn more </span><ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="skoop-card p-6" data-unique-id="e7e99316-0022-43af-bda7-7d70c44a1556" data-file-name="app/page.tsx">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-accent bg-opacity-10 mb-4" data-unique-id="b93bd5b7-34dc-4a5a-9529-2293d84ae983" data-file-name="app/page.tsx">
                  <Search className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3" data-unique-id="85e00adc-d1f3-498c-a5e8-1e8f611d7fe4" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="50787e5f-30f3-41c4-bc85-d8637207c5b6" data-file-name="app/page.tsx">Semantic Search</span></h3>
                <p className="text-muted-foreground mb-4" data-unique-id="37788516-65c8-4942-a413-0e3b69cf79a4" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="2d0d35cd-3e96-4938-8ec1-63c3de117d75" data-file-name="app/page.tsx">
                  Find what you're looking for with powerful semantic search that understands the meaning behind your queries.
                </span></p>
                <div className="pt-4 border-t border-border mt-auto" data-unique-id="ca388610-f4cd-4726-ac93-f2bc034f7237" data-file-name="app/page.tsx">
                  <Link href="#" className="inline-flex items-center text-primary hover:underline" data-unique-id="47522083-34f5-4551-9e46-4bcca3f4499e" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="c842d92d-b282-4378-8769-4e9519c824df" data-file-name="app/page.tsx">
                    Learn more </span><ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="skoop-card p-6" data-unique-id="9160db9f-6a1d-4a0d-a733-b2533e0c9109" data-file-name="app/page.tsx">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-destructive bg-opacity-10 mb-4" data-unique-id="9fb8ed59-2c18-4219-8a60-cec6d5982f63" data-file-name="app/page.tsx">
                  <Collection className="h-6 w-6 text-destructive" />
                </div>
                <h3 className="text-xl font-semibold mb-3" data-unique-id="bc02e9dd-5532-4c90-87a3-c548e3f025a7" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="9d4ce84b-0c00-4aab-af35-7ee50c84f47b" data-file-name="app/page.tsx">Smart Collections</span></h3>
                <p className="text-muted-foreground mb-4" data-unique-id="7ce46d5c-dc27-41b1-a212-c36d264c1371" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="0561f95c-d56e-4d95-b175-6996577c8759" data-file-name="app/page.tsx">
                  Organize your content with automated collections that group similar items together and surface the best content.
                </span></p>
                <div className="pt-4 border-t border-border mt-auto" data-unique-id="1234f703-858b-4623-8570-c2e7e4a6f2fc" data-file-name="app/page.tsx">
                  <Link href="#" className="inline-flex items-center text-primary hover:underline" data-unique-id="d0393f62-be24-4053-b1ab-f101983e6ff0" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="e575996f-96d5-4106-9f11-2cc2b066c873" data-file-name="app/page.tsx">
                    Learn more </span><ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="skoop-section bg-secondary bg-opacity-30" data-unique-id="8b895cb9-af91-433c-a4bf-7e01b54b470c" data-file-name="app/page.tsx">
          <div className="skoop-container" data-unique-id="6586a211-d29a-4934-bbcb-47f139a97111" data-file-name="app/page.tsx">
            <div className="text-center mb-16" data-unique-id="0103e3ea-33c9-4b43-8e93-205506b2097d" data-file-name="app/page.tsx">
              <h2 className="text-3xl font-bold mb-4" data-unique-id="8ab97513-118f-426d-84b9-c949c87e7b7f" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="b83b39bc-dfe0-465c-8636-e62b05939978" data-file-name="app/page.tsx">Simple, transparent pricing</span></h2>
              <p className="text-muted-foreground max-w-2xl mx-auto" data-unique-id="5af1e560-5937-49b2-9a83-a38c5074ffa8" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="c47984bf-efa0-4c0a-a4f3-573c0fb215c8" data-file-name="app/page.tsx">
                Choose the plan that fits your needs. All plans include our core features.
              </span></p>
            </div>

            <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto" data-unique-id="30778ddd-cd01-4270-bc84-ce357b00a543" data-file-name="app/page.tsx" data-dynamic-text="true">
              {/* Free Plan */}
              <div className="skoop-card p-6 flex flex-col h-full border border-border" data-unique-id="a023496a-e75b-43c0-9cc3-e49b31e80b75" data-file-name="app/page.tsx">
                <div className="mb-6" data-unique-id="9cdfbc89-09af-4034-a555-a6162cc8411e" data-file-name="app/page.tsx">
                  <h3 className="text-lg font-medium mb-2" data-unique-id="633bd3c9-d04c-4dbf-9004-16177499929e" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="85a8c4c9-cb40-46f2-98f1-05db760edf1a" data-file-name="app/page.tsx">Free</span></h3>
                  <div className="text-3xl font-bold" data-unique-id="cc2d2a04-f946-4521-ad0f-3cce021c27e1" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="9b5141f9-e0aa-4c71-a77a-41657d7169de" data-file-name="app/page.tsx">$0</span><span className="text-muted-foreground text-sm font-normal" data-unique-id="c575d4b4-7606-47f5-b463-0316cc880eef" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="ac523cb8-fc3e-47e2-9ab6-7310154e5488" data-file-name="app/page.tsx">/month</span></span></div>
                  <p className="text-muted-foreground text-sm mt-3" data-unique-id="1b3aa690-93b8-44a5-9c64-fa6281554ce5" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="a3877a22-7bb4-4ed3-8a4c-258c07dc78d4" data-file-name="app/page.tsx">Perfect for getting started</span></p>
                </div>
                <ul className="space-y-3 mb-8" data-unique-id="3a3a8130-bf70-4ff2-a026-6b8178629bae" data-file-name="app/page.tsx">
                  <li className="flex items-start" data-unique-id="32e09254-b692-4528-a468-b3c8f5447f7f" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="ecc7e04a-5126-4164-9eef-dc5959076cd3" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="da739085-1822-486f-9531-7c5069079e8e" data-file-name="app/page.tsx">500 saved items</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="77765355-ab29-47b0-9126-3f357ac20941" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="ca72ac6d-4360-4918-ab9a-5d8551508ce3" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="b47381e2-9fe0-42aa-bca7-634fa854be4b" data-file-name="app/page.tsx">2 connected platforms</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="bbac8493-4d44-450b-a28e-337b2e020058" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="5ac1420b-4907-4a7c-8ed9-94e44ffa44c8" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="715b5301-d452-4634-a345-c3c32624cfe9" data-file-name="app/page.tsx">Basic search</span></span>
                  </li>
                </ul>
                <div className="mt-auto" data-unique-id="5daca316-2ecc-402e-91b8-00ee7be984be" data-file-name="app/page.tsx">
                  <Button className="w-full skoop-button-primary" data-unique-id="46b99949-7f2a-4f48-93ad-e1b44ad7b830" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="2ab81a27-a60d-406b-8ea0-7a5d7d5ce39d" data-file-name="app/page.tsx">Get Started</span></Button>
                </div>
              </div>

              {/* Pro Plan */}
              <div className="skoop-card p-6 flex flex-col h-full border-2 border-primary relative" data-unique-id="5a75fe2f-b98a-49a1-958e-c556dbe05c30" data-file-name="app/page.tsx">
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-sm font-medium rounded-bl-lg rounded-tr-[calc(var(--radius)-1px)]" data-unique-id="db567d89-bf93-43ea-bc2e-b17e07ffae2f" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="271efb66-3ae2-44f9-9695-331eb5f6b980" data-file-name="app/page.tsx">
                  Popular
                </span></div>
                <div className="mb-6" data-unique-id="aff0537a-03cf-4329-9c68-258aaa117b89" data-file-name="app/page.tsx">
                  <h3 className="text-lg font-medium mb-2" data-unique-id="9882e0e0-ed92-4408-a996-6123de8e31ac" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="9e1662f0-e114-47c9-ba48-9275c347599e" data-file-name="app/page.tsx">Pro</span></h3>
                  <div className="text-3xl font-bold" data-unique-id="11b30d58-c868-40a2-97c7-3c6711a73a07" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="995b0076-7710-4e4d-a8e6-dd764e12dc9c" data-file-name="app/page.tsx">$9</span><span className="text-muted-foreground text-sm font-normal" data-unique-id="90db49a6-1a43-48f3-8ff3-8c4c341fee9e" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="4d97d0e6-05d3-4b8d-9652-5285044cfcf9" data-file-name="app/page.tsx">/month</span></span></div>
                  <p className="text-muted-foreground text-sm mt-3" data-unique-id="d58c624e-81c1-43db-9cb7-6d209a853d5d" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="c920104d-6c5d-4b25-b949-d3244931eb42" data-file-name="app/page.tsx">For power users</span></p>
                </div>
                <ul className="space-y-3 mb-8" data-unique-id="3538b2ed-3129-4574-914c-23f6722a43ae" data-file-name="app/page.tsx">
                  <li className="flex items-start" data-unique-id="caacffd3-f35e-43c2-baac-edaeda25daf4" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="4a489e50-3eef-43a2-b1b4-122eeda24161" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="1aecdb0d-ca6e-4418-b07c-f68a53c85b55" data-file-name="app/page.tsx">Unlimited saved items</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="983ae033-db38-41d1-b91d-9cab7044c673" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="ba470a46-51f4-41fe-b746-5e0af61da511" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="e7d1a74c-5f44-4c61-b753-4279c7998d9e" data-file-name="app/page.tsx">All platforms</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="ad3ccd5c-54e1-4579-8ebf-c8e5e8852e16" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="873e4536-4c51-4399-b3f4-d82a5cc022c3" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="0976faf6-ad52-44ef-a5b0-71e4beea2930" data-file-name="app/page.tsx">Advanced semantic search</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="2fd40a99-4496-4625-9736-ca7e87058ee8" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="4557da4c-a939-4cf1-8199-25fba97ca294" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="48af2c75-b8e2-4100-8a70-d6679543a091" data-file-name="app/page.tsx">Smart collections</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="a54e855e-cbff-492e-bf15-392b20711bb7" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="0380ce1b-bd4c-4313-bd8f-17781bca6bf9" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="031bbd81-bd0a-4d1c-be34-075657e767d4" data-file-name="app/page.tsx">15-minute sync</span></span>
                  </li>
                </ul>
                <div className="mt-auto" data-unique-id="465c565e-b867-4b48-a5dd-a616b1790eb3" data-file-name="app/page.tsx">
                  <Button className="w-full skoop-button-accent" data-unique-id="a13d3716-bd70-4cff-ad22-32ef52390161" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="2d6aac0e-83cb-4e65-9d76-59778adb9a5f" data-file-name="app/page.tsx">Choose Pro</span></Button>
                </div>
              </div>

              {/* Team Plan */}
              <div className="skoop-card p-6 flex flex-col h-full border border-border" data-unique-id="e3943305-dd98-4781-8fe0-c1b527dc04b9" data-file-name="app/page.tsx">
                <div className="mb-6" data-unique-id="0061f325-baa4-4337-b0cd-f8fd60601334" data-file-name="app/page.tsx">
                  <h3 className="text-lg font-medium mb-2" data-unique-id="47cfbf3e-5f51-4b26-9345-6c6cc8914e87" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="5e364c0d-f581-41a3-b15b-ce56c3fc5325" data-file-name="app/page.tsx">Team</span></h3>
                  <div className="text-3xl font-bold" data-unique-id="1d45e65e-425f-4d77-b3f6-5635be7b2ca5" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="abb2b787-9615-4e10-9135-b5ac07fd93d9" data-file-name="app/page.tsx">$19</span><span className="text-muted-foreground text-sm font-normal" data-unique-id="2c6c826a-7d44-4bbf-9912-092a98537a23" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="bd92735a-7830-4ecc-9877-fe1b4d9f009d" data-file-name="app/page.tsx">/month</span></span></div>
                  <p className="text-muted-foreground text-sm mt-3" data-unique-id="8607a742-7eb5-4cb9-958a-04931c77ea53" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="217f285a-0805-4e35-86f0-982d13b27e5d" data-file-name="app/page.tsx">Collaborate with your team</span></p>
                </div>
                <ul className="space-y-3 mb-8" data-unique-id="565db2bf-22c1-4457-adec-f8587993ac3a" data-file-name="app/page.tsx">
                  <li className="flex items-start" data-unique-id="f2935050-096a-48d3-a9a5-838ee43ef0b3" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="7112012d-372c-457d-bc49-d1983da683cd" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="bea7aab5-710d-44f5-b3ec-002ec106c16a" data-file-name="app/page.tsx">Everything in Pro</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="3ac16177-262d-4633-b4e7-743db10211d8" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="1f3d680d-39b7-4bdc-93c7-7497d971eb8e" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="633e5848-7d00-4c6a-9db9-c4e88920c908" data-file-name="app/page.tsx">5 team members</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="d11c983a-2436-48c3-8d24-0931da5e004f" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="d5ed67f9-4496-4244-a1a8-dadcd80e677a" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="89f6b125-816f-40d9-8bf0-12f5f3a5e834" data-file-name="app/page.tsx">Shared collections</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="e7e2d76e-8a7d-40bb-8adf-b91068de1c80" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="65ff8472-39ac-4367-8a8c-56dcd862c34d" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="83c88fa4-834c-4b04-9bc5-2111d22b893a" data-file-name="app/page.tsx">Collaboration tools</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="fa145fc2-a45d-4211-a1fb-2cdefc8940a9" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="f0d13ba6-7541-46bf-a299-3c16f896435f" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="3bc4f247-fe3f-41d0-b597-c2bcee298a77" data-file-name="app/page.tsx">Advanced analytics</span></span>
                  </li>
                </ul>
                <div className="mt-auto" data-unique-id="9e2d8eb0-e5a1-4b40-85b1-05894db8baff" data-file-name="app/page.tsx">
                  <Button className="w-full skoop-button-primary" data-unique-id="ebd23b9c-3b95-47a5-bb8e-649dcf8696b1" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="aa35a964-99f6-4277-979a-d74798d89eef" data-file-name="app/page.tsx">Choose Team</span></Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="skoop-section" data-unique-id="31701ae6-ff53-49c2-a0ec-63bc43c6a9ec" data-file-name="app/page.tsx">
          <div className="skoop-container max-w-4xl" data-unique-id="7ec602b1-e44a-43db-91fd-387308572d4b" data-file-name="app/page.tsx">
            <div className="skoop-card p-8 md:p-12 text-center" data-unique-id="84d03c32-328e-443b-8b01-52cb95c45d97" data-file-name="app/page.tsx">
              <h2 className="text-2xl md:text-3xl font-bold mb-4" data-unique-id="f23a4fdb-18ba-45db-ba5b-be1764834c36" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="9fd308e6-68fa-4bcc-b1a4-5ce894b97b9a" data-file-name="app/page.tsx">Ready to organize your digital knowledge?</span></h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto" data-unique-id="0a696c90-b92d-4830-a7bf-1aa3e701f6b0" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="b7f1d5d9-499a-4ce3-ac7f-0450038052f5" data-file-name="app/page.tsx">
                Join thousands of developers, designers, and researchers who are using SKOOP to make the most of their saved content.
              </span></p>
              <div className="flex flex-col sm:flex-row justify-center gap-4" data-unique-id="3c8cff9f-d960-4089-b710-7691aace6afc" data-file-name="app/page.tsx">
                <Button className="skoop-button-accent" size="lg" data-unique-id="43c0a322-adda-46e2-98fe-bce7884e1d07" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="e4a91689-60a6-4cbc-b419-2fe42f4512d7" data-file-name="app/page.tsx">Get Started for Free</span></Button>
                <Button variant="outline" size="lg" data-unique-id="5fca3871-f30a-4f82-82af-c26efcb09daa" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="1ec4de6f-bbde-4719-b8d5-76c14698297f" data-file-name="app/page.tsx">
                  Request Demo
                </span></Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-secondary bg-opacity-30 border-t border-border py-12" data-unique-id="ae1f66f3-1870-4e47-9ee6-a9bd55599a4f" data-file-name="app/page.tsx">
        <div className="skoop-container" data-unique-id="b0a67064-f7b5-4f82-8678-bd89759f172a" data-file-name="app/page.tsx">
          <div className="grid gap-8 md:grid-cols-4" data-unique-id="9902eda6-35c4-4e32-9e80-490a5f696e86" data-file-name="app/page.tsx">
            <div data-unique-id="6a643208-61ea-4359-b74b-9d1172f3d86a" data-file-name="app/page.tsx">
              <div className="text-2xl font-bold text-primary mb-4" data-unique-id="af7ebb3c-49f8-48de-9559-d16d1d3fc109" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="c66c1ff5-0279-4a53-952d-f603114ebf29" data-file-name="app/page.tsx">SKOOP</span></div>
              <p className="text-muted-foreground text-sm" data-unique-id="3eecfe54-46da-43fc-a1c3-5b043dacf8c5" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="96fed64e-cb54-4db0-ab7d-c88c9eb2e8ab" data-file-name="app/page.tsx">
                The all-in-one platform for collecting, searching and rediscovering your saved content.
              </span></p>
            </div>

            <div data-unique-id="c5ae02a6-58f0-433d-881f-21b613e26067" data-file-name="app/page.tsx">
              <h4 className="font-medium mb-4" data-unique-id="ddedfc8b-e9c8-44c0-931f-42792f765138" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="4648a614-ee17-455c-9684-09353fccaa03" data-file-name="app/page.tsx">Product</span></h4>
              <ul className="space-y-2 text-sm text-muted-foreground" data-unique-id="8031bd6a-324d-4e8a-ba27-fc6fc121faf0" data-file-name="app/page.tsx">
                <li data-unique-id="b873af2e-9f86-4802-b185-0ec0f5c1aac6" data-file-name="app/page.tsx"><Link href="#features" className="hover:text-primary transition-colors" data-unique-id="ec75eaa8-d9fd-47cc-a1a9-9ed628168ddc" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="36be6905-5874-49a5-82ed-bf14015951b9" data-file-name="app/page.tsx">Features</span></Link></li>
                <li data-unique-id="dd64106c-4c70-4d49-8cb7-3bdf0e3c29c2" data-file-name="app/page.tsx"><Link href="#pricing" className="hover:text-primary transition-colors" data-unique-id="99792eab-6c66-415c-8d15-5e5eb8389128" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="f5508f6d-aaa0-47ca-b7bb-ddbe9539cc89" data-file-name="app/page.tsx">Pricing</span></Link></li>
                <li data-unique-id="79f95478-5b55-4111-a728-78b3f42fc549" data-file-name="app/page.tsx"><Link href="/dashboard" className="hover:text-primary transition-colors" data-unique-id="48a12905-4f89-4b37-b94b-1d1294d6f199" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="a1dbcb93-8f48-4fbc-b616-321185984f62" data-file-name="app/page.tsx">Dashboard</span></Link></li>
                <li data-unique-id="cd712f0f-e06f-464f-b3ff-f87062d18de9" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="a2de3e33-c30a-46db-9223-15390e47d080" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="1e711409-d4e4-40d2-a42c-33f1a418fb8c" data-file-name="app/page.tsx">Integrations</span></Link></li>
                <li data-unique-id="7c8a3d2f-e88a-4ee6-8319-d4b7b3b3e0f8" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="6dc84ec7-5d8e-4b0d-afc3-3d78e6cea3c2" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="207d138e-3c36-446c-8c53-02a3fd92f74e" data-file-name="app/page.tsx">Changelog</span></Link></li>
              </ul>
            </div>

            <div data-unique-id="ce048fa2-c7ad-4063-8b30-1e2497947040" data-file-name="app/page.tsx">
              <h4 className="font-medium mb-4" data-unique-id="256edd8e-9bd0-458b-ab3b-527863933b8f" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="d5fcd153-8d92-4f2f-b587-f1680c7bb273" data-file-name="app/page.tsx">Resources</span></h4>
              <ul className="space-y-2 text-sm text-muted-foreground" data-unique-id="bedadbc1-7615-4d3d-8a61-d9204d72dbed" data-file-name="app/page.tsx">
                <li data-unique-id="5ed1a040-cccf-4ac5-a949-71840a95f17a" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="68d6945b-aa14-41fb-9067-07d368df2ca1" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="36c6c49c-82bb-4fa0-a2d9-87de0e00c30a" data-file-name="app/page.tsx">Documentation</span></Link></li>
                <li data-unique-id="fa7e9c2a-b08d-4c97-a6ef-b398c417a55a" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="07954c2c-19d2-419f-9642-1134bf4e3ddc" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="938be95d-6cce-4331-ada2-85bd6e4b46ee" data-file-name="app/page.tsx">API</span></Link></li>
                <li data-unique-id="7a7ce1d7-2274-49d3-a331-359cd07a8aa0" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="0be5da97-1b12-4916-a47b-efbf17bcfa80" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="d035715c-fd6f-4010-a33f-603261e86409" data-file-name="app/page.tsx">Guides</span></Link></li>
                <li data-unique-id="4c968f6b-86f3-4f54-8a3d-97b3da96fafd" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="458472d3-6512-4e84-8504-4d9a22d438bd" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="8d0e97a7-0fe3-428a-9f5a-72f4e8fbf435" data-file-name="app/page.tsx">Help Center</span></Link></li>
              </ul>
            </div>

            <div data-unique-id="420c6e31-5e5b-42c0-b1bc-86d62101229a" data-file-name="app/page.tsx">
              <h4 className="font-medium mb-4" data-unique-id="19dbe3dd-7005-47c9-9c5f-92aec177a145" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="fd2f7f12-fb21-4205-8aee-c886da66d642" data-file-name="app/page.tsx">Company</span></h4>
              <ul className="space-y-2 text-sm text-muted-foreground" data-unique-id="c6253a41-efec-4cb4-b2e9-2208c443c96c" data-file-name="app/page.tsx">
                <li data-unique-id="0bbf4c34-e1dc-4dd3-8c8a-d34648794d89" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="471f7dee-6f78-42bf-9c23-609432d795da" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="f0e27cc0-947d-4db9-8620-6fb545918c48" data-file-name="app/page.tsx">About</span></Link></li>
                <li data-unique-id="9781154d-5a20-46b6-8c7e-e2ab340b7f7c" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="b637ef05-d9cb-4db6-90a5-777e888401c9" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="575445f7-43a5-4351-941a-863e0a864ed2" data-file-name="app/page.tsx">Blog</span></Link></li>
                <li data-unique-id="b20ef088-c79f-4099-91db-0f39db62b0a8" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="590f874b-9558-4c6d-a30c-3ce070b01dd0" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="b4494de3-7a14-478f-8159-f5d9002ac134" data-file-name="app/page.tsx">Careers</span></Link></li>
                <li data-unique-id="b0a5a11c-ef4e-40fb-918c-b4822818a3b4" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="1604f951-fd00-4039-abd9-de191c39cf0a" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="e150c829-d9b0-4b19-953e-f0a498e21675" data-file-name="app/page.tsx">Contact</span></Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center" data-unique-id="6c3f3c85-5cdf-458b-bbdc-446bde07a2d7" data-file-name="app/page.tsx">
            <div className="text-sm text-muted-foreground" data-unique-id="b846fab4-ace9-4629-8a4d-814c1937c193" data-file-name="app/page.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="0fc9b4c3-9107-4f23-b0cc-c6bafa53dd24" data-file-name="app/page.tsx">
              © </span>{new Date().getFullYear()}<span className="editable-text" data-unique-id="6f927990-b6f5-4548-845e-df3ebb1d6f25" data-file-name="app/page.tsx"> SKOOP. All rights reserved.
            </span></div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0" data-unique-id="4a50e90d-1d45-4314-9bc6-16d09f2b74b8" data-file-name="app/page.tsx">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors" data-unique-id="2ba12f0f-f279-4c32-910a-f8d7fc020457" data-file-name="app/page.tsx">
                <span className="sr-only" data-unique-id="f069cbba-67ee-4b25-9d90-2f20737c52ee" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="f4929b32-a6e7-4e83-82fd-9a6ecc297a8b" data-file-name="app/page.tsx">Twitter</span></span>
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors" data-unique-id="7e647f6c-5fa3-4fd9-9932-2c0683a386d1" data-file-name="app/page.tsx">
                <span className="sr-only" data-unique-id="799e2dd3-ec0f-4ddf-9551-ab00d3718734" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="caf1c34f-103d-4511-886b-527b7d7a8108" data-file-name="app/page.tsx">GitHub</span></span>
                <Github className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>;
}