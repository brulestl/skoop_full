import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import Image from "next/image";
import { Search, Github, Twitter, Code as StackOverflow, Bookmark, FolderPlus as Collection, CheckCircle2, ChevronRight, ArrowRight } from "lucide-react";
export default function HomePage() {
  return <div className="min-h-screen flex flex-col" data-unique-id="f0bdf3ce-c142-4141-881b-f5e2137a2a14" data-file-name="app/page.tsx" data-dynamic-text="true">
      {/* Header */}
      <header className="border-b border-border" data-unique-id="2209aad7-1d0e-445a-85e3-bece6b5b55e4" data-file-name="app/page.tsx">
        <div className="skoop-container flex items-center justify-between h-16" data-unique-id="5f97b159-463c-43b4-8bb1-f5771b1e41af" data-file-name="app/page.tsx">
          <div className="flex items-center" data-unique-id="fef0d727-6c42-45c0-a81c-dd76a05bdec1" data-file-name="app/page.tsx">
            <div className="text-2xl font-bold text-primary" data-unique-id="e8abd203-a22b-404b-9ce3-d60da2ff53a7" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="cc5b9c0a-e987-4868-994d-e8550f96ec16" data-file-name="app/page.tsx">SKOOP</span></div>
            <nav className="hidden ml-12 space-x-6 lg:flex" data-unique-id="e0f890df-1aac-403d-b14d-a75538915bab" data-file-name="app/page.tsx">
              <Link href="#features" className="text-foreground hover:text-primary transition-colors" data-unique-id="0147e8fc-eb14-4ae8-a72b-642fc9cfcc54" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="14d0aa17-842a-48e6-9f3f-cb9d813e972e" data-file-name="app/page.tsx">Features</span></Link>
              <Link href="#pricing" className="text-foreground hover:text-primary transition-colors" data-unique-id="1878fbb5-4d74-4a6b-8635-08d5a612597a" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="2a605227-636b-42a0-ae52-e3f09f1ed110" data-file-name="app/page.tsx">Pricing</span></Link>
              <Link href="#faq" className="text-foreground hover:text-primary transition-colors" data-unique-id="2532e041-fea6-4174-945c-086bfc3d10ea" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="77c58055-e935-4fa2-9bde-656c0f612697" data-file-name="app/page.tsx">FAQ</span></Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4" data-unique-id="528ffd5b-8ce4-4591-8ab6-38bae6d81f96" data-file-name="app/page.tsx">
            <ThemeToggle />
            <a href="/dashboard" className="text-foreground hover:text-primary transition-colors" data-unique-id="ee17499d-2384-4d11-aa60-639e5d3c5667" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="7d59213c-cb34-4345-a745-4913fc70fb7b" data-file-name="app/page.tsx">Dashboard</span></a>
            <a href="/login" className="text-foreground hover:text-primary transition-colors" data-unique-id="042ee077-79a9-439f-914c-d9420f4393fe" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="dd38ab89-f14a-4181-bb1b-299d70c0755f" data-file-name="app/page.tsx">Log in</span></a>
            <Button className="skoop-button-accent" data-unique-id="046a9009-5293-4bdb-99a2-a80693a0b86b" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="ae39fb4b-0b32-4e7b-a908-ef715436b043" data-file-name="app/page.tsx">Sign Up Free</span></Button>
          </div>
        </div>
      </header>

      <main className="flex-grow" data-unique-id="2e3e3f3b-bb6e-4c82-aa9e-cce7a9d4e786" data-file-name="app/page.tsx" data-dynamic-text="true">
        {/* Hero Section */}
        <section className="skoop-section bg-gradient-to-b from-background to-secondary/20" data-unique-id="aa75534e-48ee-40a2-8223-1869c7d8b598" data-file-name="app/page.tsx">
          <div className="skoop-container" data-unique-id="b3714e93-2765-4be8-9bf9-0b4f82ddf59a" data-file-name="app/page.tsx" data-dynamic-text="true">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-24 items-center" data-unique-id="98c2af9e-ee49-472d-928a-33f6c52e5837" data-file-name="app/page.tsx">
              <div data-unique-id="279c3eb1-05e7-44dc-9679-8d3b23d731e3" data-file-name="app/page.tsx">
                <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl mb-6" data-unique-id="8189824e-e8d4-4643-a68a-a9c558f64166" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="0f740fd2-7c86-48f5-98c8-b87132d8a15f" data-file-name="app/page.tsx">
                  Collect, search and </span><span className="text-primary" data-unique-id="18f26334-345f-4b18-b689-cc644356d22e" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="8cd29d50-5de4-4929-8496-4e4bde1feecd" data-file-name="app/page.tsx">rediscover</span></span><span className="editable-text" data-unique-id="b72f94ae-2266-441b-a9c2-6fbca41fc2f6" data-file-name="app/page.tsx"> your saved content
                </span></h1>
                <p className="text-lg text-muted-foreground mb-8" data-unique-id="35d2974b-c315-491e-b901-20e295b6a084" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="88ead42a-48af-4503-9c11-02f21c986164" data-file-name="app/page.tsx">
                  One calm space for all your saved tweets, GitHub stars, Reddit posts, and Stack Overflow favorites.
                </span></p>
                <div className="flex flex-col sm:flex-row gap-4" data-unique-id="bf854cb7-289c-404a-a010-91e886811391" data-file-name="app/page.tsx">
                  <Button className="skoop-button-accent" size="lg" data-unique-id="ef6c231f-494e-47f0-9ad2-967d92772626" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="7179ffbd-ebc8-4004-a244-8fecdce20a41" data-file-name="app/page.tsx">Get Started</span></Button>
                  <Button variant="outline" size="lg" className="group" data-unique-id="f704c7fa-4fbe-4562-a588-277f113928e2" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="e0819dcb-69a7-4be0-a473-718cfa6c6d70" data-file-name="app/page.tsx">
                    How It Works
                    </span><ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
                <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground" data-unique-id="f9a8b8bf-848a-4ebc-aaaa-5361ce6ca16c" data-file-name="app/page.tsx">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span data-unique-id="f5b4f6ef-df4a-4be2-976d-4177d708a7cb" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="b24e2f9f-5a3f-4bda-8ae8-d62e5327f4fc" data-file-name="app/page.tsx">No credit card required</span></span>
                </div>
              </div>
              <div className="relative" data-unique-id="cebb2acb-b578-4af5-ba06-b967c0d6710e" data-file-name="app/page.tsx" data-dynamic-text="true">
                <div className="skoop-card overflow-hidden" data-unique-id="98f3bf5f-a22c-4e54-b6f2-615745fa7998" data-file-name="app/page.tsx">
                  <Image src="https://images.unsplash.com/photo-1508921340878-ba53e1f016ec?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3" alt="SKOOP Dashboard" width={600} height={400} className="w-full h-auto rounded-t-[var(--radius)]" data-unique-id="f5ef54ed-d19a-481e-bc03-c18081bc2d8e" data-file-name="app/page.tsx" />
                  <div className="p-6" data-unique-id="835c6e9c-1e29-4244-8c51-9b60058d27be" data-file-name="app/page.tsx">
                    <div className="flex items-center justify-between mb-4" data-unique-id="b5506fb8-a64d-40ef-9153-e15f826b8d18" data-file-name="app/page.tsx">
                      <div className="font-semibold" data-unique-id="a75af089-22d5-4e34-b9dc-31690e1847d0" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="df834e35-bb90-434f-8202-05dc6920d094" data-file-name="app/page.tsx">Recent Saves</span></div>
                      <Search className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="space-y-3" data-unique-id="4b58d359-fd06-434e-8926-5db2f9c47dc3" data-file-name="app/page.tsx" data-dynamic-text="true">
                      {[1, 2, 3].map(i => <div key={i} className="flex items-center gap-3 p-3 rounded-md bg-secondary/50" data-unique-id="82c795fe-526d-45c7-9c0f-759f90ced7e2" data-file-name="app/page.tsx" data-dynamic-text="true">
                          {i === 1 && <Github className="h-5 w-5 text-foreground" />}
                          {i === 2 && <Twitter className="h-5 w-5 text-foreground" />}
                          {i === 3 && <StackOverflow className="h-5 w-5 text-foreground" />}
                          <div className="flex-grow" data-unique-id="0465d137-9569-47fe-99c4-8b7bb4ee7b56" data-file-name="app/page.tsx">
                            <div className="text-sm font-medium truncate" data-unique-id="994009e3-2527-4768-8430-98d82042706e" data-file-name="app/page.tsx" data-dynamic-text="true">
                              {i === 1 && "Interesting open source project for data visualization"}
                              {i === 2 && "Thread: 10 tips for better React performance"}
                              {i === 3 && "How to optimize PostgreSQL queries for large datasets"}
                            </div>
                            <div className="text-xs text-muted-foreground mt-0.5" data-unique-id="bb64eed5-14a3-4f88-8a18-5b79daa1dc7b" data-file-name="app/page.tsx" data-dynamic-text="true">
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
                <div className="absolute -left-8 top-1/2 bg-card p-3 rounded-full shadow-lg border border-border hidden lg:block" data-unique-id="b02d5c4d-3b45-4b79-b304-0114f76c3aff" data-file-name="app/page.tsx">
                  <Github className="h-6 w-6 text-primary" />
                </div>
                <div className="absolute -right-8 bottom-1/3 bg-card p-3 rounded-full shadow-lg border border-border hidden lg:block" data-unique-id="51459d45-649a-404b-9106-2562b2d67175" data-file-name="app/page.tsx">
                  <Twitter className="h-6 w-6 text-accent" />
                </div>
              </div>
            </div>

            {/* Logos */}
            <div className="mt-20" data-unique-id="18b99166-d9e4-4827-a5c5-8a8827458ed4" data-file-name="app/page.tsx">
              <p className="text-center text-sm text-muted-foreground mb-6" data-unique-id="d3f78206-39da-43d3-86a0-b1afd2b82572" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="692a272f-8652-4e10-b292-39969ffdab45" data-file-name="app/page.tsx">
                Connect with your favorite platforms
              </span></p>
              <div className="flex justify-center items-center flex-wrap gap-8 md:gap-12" data-unique-id="5e0c375e-fbc3-4191-9ebe-3fd33a5f4a1f" data-file-name="app/page.tsx">
                <Github className="h-8 w-8 text-muted-foreground" />
                <Twitter className="h-8 w-8 text-muted-foreground" />
                <StackOverflow className="h-8 w-8 text-muted-foreground" />
                <div className="text-muted-foreground text-xl font-semibold" data-unique-id="c42f81dd-a6c3-490b-8e6c-a0d48db53a87" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="74b235ad-a26f-43ab-be97-bc5b8459b501" data-file-name="app/page.tsx">Reddit</span></div>
                <div className="text-muted-foreground text-xl font-semibold" data-unique-id="b3a59eab-bd5c-46c7-8f7b-de6871bde59a" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="a411d7de-3c30-4df8-b377-b91dc141bca8" data-file-name="app/page.tsx">DEV</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="skoop-section" data-unique-id="c59b70bb-c755-4103-91e8-5b987aebd564" data-file-name="app/page.tsx">
          <div className="skoop-container" data-unique-id="9e59357d-d808-4fea-9f09-a41699e32cd2" data-file-name="app/page.tsx">
            <div className="text-center mb-16" data-unique-id="94f87517-1ee8-42ba-98a4-b3e625175e9e" data-file-name="app/page.tsx">
              <h2 className="text-3xl font-bold mb-4" data-unique-id="e14576b7-09cd-40b6-a123-e7108aa0ac93" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="6277e953-eda7-4e2a-aa93-8bb8670b6f7e" data-file-name="app/page.tsx">Finally, a place for all your saved content</span></h2>
              <p className="text-muted-foreground max-w-2xl mx-auto" data-unique-id="ecef506e-104a-4d9d-aa59-0d21e8aa65a2" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="8d80bf4c-7a3a-4429-9bc3-4c014a4736a9" data-file-name="app/page.tsx">
                SKOOP solves the problem of fragmented saves and makes it easy to find what you need when you need it.
              </span></p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3" data-unique-id="3dfa92ff-18e9-429e-8db5-6c7d0b0b376a" data-file-name="app/page.tsx" data-dynamic-text="true">
              {/* Feature 1 */}
              <div className="skoop-card p-6" data-unique-id="589f38e3-74fb-444d-a9cd-cf69fce78e3e" data-file-name="app/page.tsx">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary bg-opacity-10 mb-4" data-unique-id="dcee9278-5727-4bce-8b91-81ca6683b5f5" data-file-name="app/page.tsx">
                  <Bookmark className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3" data-unique-id="ce828f96-9740-4e8a-8d7e-0d7110781966" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="a595c719-41b1-4a50-b4d2-08aebd597c36" data-file-name="app/page.tsx">Unified Collection</span></h3>
                <p className="text-muted-foreground mb-4" data-unique-id="eef94983-ca51-4c26-b516-05f4796809cb" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="d3667fbe-c554-40f5-bdd7-09bc57cbead0" data-file-name="app/page.tsx">
                  Import and sync all your saved content from GitHub, Twitter, Reddit, and Stack Overflow in one place.
                </span></p>
                <div className="pt-4 border-t border-border mt-auto" data-unique-id="645f6ea5-901a-4d35-b9aa-d5dd7f1cbaa1" data-file-name="app/page.tsx">
                  <Link href="#" className="inline-flex items-center text-primary hover:underline" data-unique-id="56acf28f-e9d2-48f8-817f-f376af14bde8" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="c6a70e0d-8c4a-4aca-ae70-21cac97fe57b" data-file-name="app/page.tsx">
                    Learn more </span><ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="skoop-card p-6" data-unique-id="3c81fe64-79e4-40a3-afa2-b50c7c8e6ce7" data-file-name="app/page.tsx">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-accent bg-opacity-10 mb-4" data-unique-id="8c0245ea-ae65-48d1-958e-9ae9d821ea13" data-file-name="app/page.tsx">
                  <Search className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3" data-unique-id="28795b5e-4fd0-4ea6-8131-5980b6ae9a2c" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="e8e69df8-3f57-4d04-9b4d-36f7522af8c5" data-file-name="app/page.tsx">Semantic Search</span></h3>
                <p className="text-muted-foreground mb-4" data-unique-id="ba0b8516-655f-41cb-914f-43d4d663b342" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="f7fb240c-775a-4f98-bd61-ed3c2eaad00e" data-file-name="app/page.tsx">
                  Find what you're looking for with powerful semantic search that understands the meaning behind your queries.
                </span></p>
                <div className="pt-4 border-t border-border mt-auto" data-unique-id="e6b10864-7f3c-4ed7-8fad-eead74329c02" data-file-name="app/page.tsx">
                  <Link href="#" className="inline-flex items-center text-primary hover:underline" data-unique-id="50c06e54-422d-4026-9740-2f6a21a75de2" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="a1fc84b8-51a0-447d-b123-c2c069b53927" data-file-name="app/page.tsx">
                    Learn more </span><ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="skoop-card p-6" data-unique-id="2ab987b1-d457-4b55-a024-c51ff69bc4ac" data-file-name="app/page.tsx">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-destructive bg-opacity-10 mb-4" data-unique-id="f5994548-1cdc-41a8-9ebb-93764977eba2" data-file-name="app/page.tsx">
                  <Collection className="h-6 w-6 text-destructive" />
                </div>
                <h3 className="text-xl font-semibold mb-3" data-unique-id="add67199-3a72-4f6a-9a71-ed7801849052" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="49065a83-4c60-489f-bee3-bdd2202c2328" data-file-name="app/page.tsx">Smart Collections</span></h3>
                <p className="text-muted-foreground mb-4" data-unique-id="6b73328e-6749-43f7-a851-9a21de97931e" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="b0dc3f6a-4dbd-4706-88d3-d76a744f6f0f" data-file-name="app/page.tsx">
                  Organize your content with automated collections that group similar items together and surface the best content.
                </span></p>
                <div className="pt-4 border-t border-border mt-auto" data-unique-id="49d653a6-d54b-467f-ac5a-894426bbb591" data-file-name="app/page.tsx">
                  <Link href="#" className="inline-flex items-center text-primary hover:underline" data-unique-id="783d6efc-302b-43fc-91d9-1487bdd213cd" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="b034c68d-1d50-46c1-9b15-444957f8880c" data-file-name="app/page.tsx">
                    Learn more </span><ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="skoop-section bg-secondary bg-opacity-30" data-unique-id="9c53c1b6-e88f-4199-a93b-47740d93a61a" data-file-name="app/page.tsx">
          <div className="skoop-container" data-unique-id="cedf667a-d618-46c8-ad22-e2e77a70da82" data-file-name="app/page.tsx">
            <div className="text-center mb-16" data-unique-id="79cc53c5-5eb8-4768-a5ed-3d70dcce7b4b" data-file-name="app/page.tsx">
              <h2 className="text-3xl font-bold mb-4" data-unique-id="9217438b-786d-4cfc-96e6-a72b09fbdd5d" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="dfb9a14d-a7ad-4346-b245-e54c68c57321" data-file-name="app/page.tsx">Simple, transparent pricing</span></h2>
              <p className="text-muted-foreground max-w-2xl mx-auto" data-unique-id="49f40a08-f066-4c73-9aa3-868d7f16e1e1" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="9288941e-19ea-4257-9105-b2bdc7bb2671" data-file-name="app/page.tsx">
                Choose the plan that fits your needs. All plans include our core features.
              </span></p>
            </div>

            <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto" data-unique-id="89dbe9b7-7573-4b7b-aaff-6df422949289" data-file-name="app/page.tsx" data-dynamic-text="true">
              {/* Free Plan */}
              <div className="skoop-card p-6 flex flex-col h-full border border-border" data-unique-id="fb72caa2-c2f8-4ef5-a62d-ee8568a88ddd" data-file-name="app/page.tsx">
                <div className="mb-6" data-unique-id="0f9ec17d-4046-48dc-9820-2c945befd5b6" data-file-name="app/page.tsx">
                  <h3 className="text-lg font-medium mb-2" data-unique-id="43d24112-a1d2-4c63-9127-48b71ed4b3ef" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="ba6a8e18-7518-4656-b82c-b9034b723b58" data-file-name="app/page.tsx">Free</span></h3>
                  <div className="text-3xl font-bold" data-unique-id="b49b09c2-d9ca-4821-b03b-df37564cbc32" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="0ede46c3-8fd8-4159-8aa9-b36833091d51" data-file-name="app/page.tsx">$0</span><span className="text-muted-foreground text-sm font-normal" data-unique-id="2a98040e-e60d-4069-8058-b04f86067839" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="cfea0ffd-edfa-4002-852f-2ebf0ffe61db" data-file-name="app/page.tsx">/month</span></span></div>
                  <p className="text-muted-foreground text-sm mt-3" data-unique-id="5e320dc4-b519-488a-bf57-ba11b4cb8986" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="4cdda32f-d523-4252-b375-a6029ab81205" data-file-name="app/page.tsx">Perfect for getting started</span></p>
                </div>
                <ul className="space-y-3 mb-8" data-unique-id="b8ae80a2-769f-4198-ba01-6b50a970b56d" data-file-name="app/page.tsx">
                  <li className="flex items-start" data-unique-id="a2d2aa54-ed90-44c3-b8dc-1cf3b9354be6" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="b6c6831b-a45d-47dc-8690-55822d85cd77" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="160f0dd0-afb4-4620-a829-54bdd5913fff" data-file-name="app/page.tsx">500 saved items</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="ebaf84ae-936f-4065-a0e9-e99a070e6652" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="637de9c1-7849-4fcd-be87-e0235f79aaaf" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="8ccd0ded-5c50-42cd-a2d2-29912e3ad2fb" data-file-name="app/page.tsx">2 connected platforms</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="13dfc891-3c69-42b2-b56f-34c10c3e5c15" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="a79ced55-47d1-4852-ac8c-d4169c641289" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="d44891da-7668-4cd4-a962-c221e6f42399" data-file-name="app/page.tsx">Basic search</span></span>
                  </li>
                </ul>
                <div className="mt-auto" data-unique-id="4594ab34-23b6-4cf4-b181-8f1487da2283" data-file-name="app/page.tsx">
                  <Button className="w-full skoop-button-primary" data-unique-id="b395578a-a8c8-4b09-b6d1-ddf6f6d1a3f4" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="e43721d3-6955-4d51-a95b-2956b6023fc2" data-file-name="app/page.tsx">Get Started</span></Button>
                </div>
              </div>

              {/* Pro Plan */}
              <div className="skoop-card p-6 flex flex-col h-full border-2 border-primary relative" data-unique-id="19371bcf-737e-4228-b7fe-92d0d2a62498" data-file-name="app/page.tsx">
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-sm font-medium rounded-bl-lg rounded-tr-[calc(var(--radius)-1px)]" data-unique-id="2547e0dd-76bb-4c56-a239-8430b5faf906" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="56f4ff29-266b-4aec-961b-ebc4a23723a2" data-file-name="app/page.tsx">
                  Popular
                </span></div>
                <div className="mb-6" data-unique-id="73e8c7d3-a0a4-435e-810d-a1ac4fcb6df4" data-file-name="app/page.tsx">
                  <h3 className="text-lg font-medium mb-2" data-unique-id="f923a3b8-6c87-4300-b6e1-b13804a67870" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="1d93a003-45d2-4037-9a4b-74badd8bff53" data-file-name="app/page.tsx">Pro</span></h3>
                  <div className="text-3xl font-bold" data-unique-id="b550273b-e2ec-40ac-8ce1-26587f0c06f6" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="88252216-df44-4020-b9ab-61dbfb459c90" data-file-name="app/page.tsx">$9</span><span className="text-muted-foreground text-sm font-normal" data-unique-id="cb708b9b-1d87-43c1-ad5f-2fd51898f298" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="19e18b13-22dd-4192-888c-e95bb11239e1" data-file-name="app/page.tsx">/month</span></span></div>
                  <p className="text-muted-foreground text-sm mt-3" data-unique-id="e8974344-6378-43eb-b20a-4b6157e1dcef" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="c62f6d1e-c4a7-4974-92cc-a7b1b7244bb9" data-file-name="app/page.tsx">For power users</span></p>
                </div>
                <ul className="space-y-3 mb-8" data-unique-id="dddc3b27-f72c-445e-ac19-4961acc40c33" data-file-name="app/page.tsx">
                  <li className="flex items-start" data-unique-id="6e30a106-66b3-4ed4-aab2-06a5bc770de0" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="ea544115-9766-45df-bca8-d0ec8b69a24a" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="6ecaa855-f12a-42e9-aced-ce8e1df01910" data-file-name="app/page.tsx">Unlimited saved items</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="44fc316f-22fe-480f-b96c-43b528fbd997" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="dcb992e9-bb2b-4ebe-aa78-8ee8168e44fb" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="00abda27-1e0f-43d7-bffc-ee25142fab55" data-file-name="app/page.tsx">All platforms</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="39c754be-8e41-4b8f-957c-0c4c34e0bfc6" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="b6c04dda-832c-4f33-b5e1-6d53282f86b8" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="23d27255-6f9b-4116-8c22-fcb4ada97b10" data-file-name="app/page.tsx">Advanced semantic search</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="02b897b5-52d5-4d05-bb32-6b72ec319a88" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="81577d66-7e99-405d-a2a8-bfc0ac0ad58f" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="3b9081c7-db33-46dd-a4da-7932f2dfe30e" data-file-name="app/page.tsx">Smart collections</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="2dffb163-8fda-434e-8229-f3a80785cf18" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="6a6ac1a3-3553-46ae-9978-3140586a6206" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="22a9bf91-66b0-43c2-9d6a-c14abce5f40e" data-file-name="app/page.tsx">15-minute sync</span></span>
                  </li>
                </ul>
                <div className="mt-auto" data-unique-id="93a8b0b1-1edb-4143-96f5-6c8a3600b06e" data-file-name="app/page.tsx">
                  <Button className="w-full skoop-button-accent" data-unique-id="8375c26c-734b-4c8d-b5be-ea4e0b12719b" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="3ae83baa-7eea-4e62-b295-ce4f974c4d75" data-file-name="app/page.tsx">Choose Pro</span></Button>
                </div>
              </div>

              {/* Team Plan */}
              <div className="skoop-card p-6 flex flex-col h-full border border-border" data-unique-id="1faca039-7d5b-4592-afee-3934b4f105e2" data-file-name="app/page.tsx">
                <div className="mb-6" data-unique-id="d90ea3d2-48bd-4c07-8978-19be41b532d4" data-file-name="app/page.tsx">
                  <h3 className="text-lg font-medium mb-2" data-unique-id="b60c4374-699f-478e-af06-e7561b8eaa9c" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="b014b0bb-bc91-4bdb-8d91-d185023cabf0" data-file-name="app/page.tsx">Team</span></h3>
                  <div className="text-3xl font-bold" data-unique-id="cd083d87-9764-47f1-a4bc-4c6014e347cd" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="fa18ea3a-d097-4480-8511-0b01709f7717" data-file-name="app/page.tsx">$19</span><span className="text-muted-foreground text-sm font-normal" data-unique-id="c8d2b152-2395-4fcc-abaf-7b64ecb56c9a" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="5a8cac89-2da8-4b78-b282-82071c53ac19" data-file-name="app/page.tsx">/month</span></span></div>
                  <p className="text-muted-foreground text-sm mt-3" data-unique-id="3fb5f7a4-105b-4c7b-b049-58483d6ec5e6" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="72d55a46-556b-4415-a705-5b3fb06bf10f" data-file-name="app/page.tsx">Collaborate with your team</span></p>
                </div>
                <ul className="space-y-3 mb-8" data-unique-id="eea10d47-72ad-4631-8253-8eea8720bd50" data-file-name="app/page.tsx">
                  <li className="flex items-start" data-unique-id="2e57a36c-8808-472e-b769-387c7a09e1e2" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="7ec2b260-d8f1-4ee6-be55-0f1671a62fc4" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="1a76f81a-4e73-49a0-bcd6-3728b25cc911" data-file-name="app/page.tsx">Everything in Pro</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="04b36322-9aca-4fe1-90c7-0ab8ccf41215" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="d53f4ba6-1fff-4e05-8b2a-39b1789af29b" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="75eae60a-87c6-413d-b416-d03acf2ecac9" data-file-name="app/page.tsx">5 team members</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="bbf59bda-706a-46b2-8355-4f1aab91ede9" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="837353c6-9ad7-4fc4-9714-665e1227ff6a" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="da50c2ac-c4b2-485e-9e22-8b23a92e513e" data-file-name="app/page.tsx">Shared collections</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="8be42422-ff98-4fc4-9fb9-3b3a795d0b23" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="ad73c687-4877-41de-900d-c6c245bae933" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="3371995d-c17f-401c-b647-c860f0b00a08" data-file-name="app/page.tsx">Collaboration tools</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="dd4171d1-3dff-4ebe-8366-9548cd0c049b" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="3c349c06-96e5-4163-a5d8-caf9af2b64be" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="edfcdb65-a553-4d9f-9cd2-d3b0093f4f51" data-file-name="app/page.tsx">Advanced analytics</span></span>
                  </li>
                </ul>
                <div className="mt-auto" data-unique-id="900446cc-ec91-4b59-a2a3-d318e7962b96" data-file-name="app/page.tsx">
                  <Button className="w-full skoop-button-primary" data-unique-id="fc43813a-062d-4200-ab8c-3c3a57009589" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="f6dc9bf4-4846-4ce5-aa45-b0ed9dfe7149" data-file-name="app/page.tsx">Choose Team</span></Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="skoop-section" data-unique-id="643a5991-fd4c-4f4a-ab3b-bbc3bc00aa6d" data-file-name="app/page.tsx">
          <div className="skoop-container max-w-4xl" data-unique-id="5c9e6f9f-afa0-41fd-8d65-85ca3dbaa228" data-file-name="app/page.tsx">
            <div className="skoop-card p-8 md:p-12 text-center" data-unique-id="547ce821-5962-49b1-bd51-ca8c2f634ab0" data-file-name="app/page.tsx">
              <h2 className="text-2xl md:text-3xl font-bold mb-4" data-unique-id="29fa00e8-0856-4fb1-aa5b-8c3fd9c88d91" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="569b540c-b368-4767-9a57-2ad4c8340eea" data-file-name="app/page.tsx">Ready to organize your digital knowledge?</span></h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto" data-unique-id="94e9b9e7-372c-4f33-b0ac-666599872855" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="35cc7c5d-e889-4aa6-acd1-fb20542504e4" data-file-name="app/page.tsx">
                Join thousands of developers, designers, and researchers who are using SKOOP to make the most of their saved content.
              </span></p>
              <div className="flex flex-col sm:flex-row justify-center gap-4" data-unique-id="d70ca54a-2abc-4712-8578-beefe46d8edc" data-file-name="app/page.tsx">
                <Button className="skoop-button-accent" size="lg" data-unique-id="f236bdfd-d7fc-4a7c-a263-bbf6f18e54eb" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="d8a4dba4-bc11-4aca-b5b5-0d58f971132d" data-file-name="app/page.tsx">Get Started for Free</span></Button>
                <Button variant="outline" size="lg" data-unique-id="7eb54bd4-866b-410c-9500-ad0b0e054e8a" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="c94f4edd-3b71-45fd-be27-95742dfa99e1" data-file-name="app/page.tsx">
                  Request Demo
                </span></Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-secondary bg-opacity-30 border-t border-border py-12" data-unique-id="1341d02e-aa09-48bc-930a-a4276603e2cc" data-file-name="app/page.tsx">
        <div className="skoop-container" data-unique-id="87bbb25a-9656-4bc7-af6e-7e34c175c532" data-file-name="app/page.tsx">
          <div className="grid gap-8 md:grid-cols-4" data-unique-id="6dfdeac1-e257-4945-a711-0e42e73a4caa" data-file-name="app/page.tsx">
            <div data-unique-id="b67c59a2-5ab9-41f2-85ab-2b0a068f488e" data-file-name="app/page.tsx">
              <div className="text-2xl font-bold text-primary mb-4" data-unique-id="4aa5534e-8ed6-4e61-957b-487cb387827f" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="8e12ea35-a8f9-4c77-9f8a-278be24ad44f" data-file-name="app/page.tsx">SKOOP</span></div>
              <p className="text-muted-foreground text-sm" data-unique-id="9b59dacf-d7e8-4fa3-b985-15d1956bf57a" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="cdd97646-8910-4bd0-84a5-3d504f5cbff9" data-file-name="app/page.tsx">
                The all-in-one platform for collecting, searching and rediscovering your saved content.
              </span></p>
            </div>

            <div data-unique-id="716ad796-71da-4e89-bccb-46dfc2fcb4a4" data-file-name="app/page.tsx">
              <h4 className="font-medium mb-4" data-unique-id="b9252356-067d-4946-980b-1d89296bcd44" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="07819d62-f6f7-4230-93d3-9dfbcf61ff85" data-file-name="app/page.tsx">Product</span></h4>
              <ul className="space-y-2 text-sm text-muted-foreground" data-unique-id="87abb627-0c42-40b2-b63d-d67446c43dc0" data-file-name="app/page.tsx">
                <li data-unique-id="1b9cc401-c874-4f01-b6d2-1aa4604e6265" data-file-name="app/page.tsx"><Link href="#features" className="hover:text-primary transition-colors" data-unique-id="400449a4-9cc7-420c-97ee-e35be0eb3bc8" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="3807fe89-00af-47a2-ab6f-08ceb79bb141" data-file-name="app/page.tsx">Features</span></Link></li>
                <li data-unique-id="7075e355-4f6f-4073-9d9d-211bcac24f55" data-file-name="app/page.tsx"><Link href="#pricing" className="hover:text-primary transition-colors" data-unique-id="b669a44a-9230-48d5-af9f-4d3ba16ad4cc" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="f0d7c6e0-b960-4a9d-acb2-87b2e3f1b109" data-file-name="app/page.tsx">Pricing</span></Link></li>
                <li data-unique-id="c9b10837-e48e-46af-a0d3-93e7fe63320c" data-file-name="app/page.tsx"><Link href="/dashboard" className="hover:text-primary transition-colors" data-unique-id="1f90612f-006e-4ff0-a076-065ee54723ba" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="0bcde172-488d-4c0b-9125-b741747922a3" data-file-name="app/page.tsx">Dashboard</span></Link></li>
                <li data-unique-id="5e8c3d17-0dd5-4707-878b-b87fc0bb9b69" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="1164d7a0-4938-4928-80c9-ee1638f3ca9b" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="4612a88f-209e-418c-a757-71703ed0a6fc" data-file-name="app/page.tsx">Integrations</span></Link></li>
                <li data-unique-id="01cdc146-03fe-4517-be8f-eb9aeb68c4e3" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="5a938328-70c2-434a-a78e-b3f78a8bf77c" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="b292ca24-6f6b-4d0a-9878-9b7d8ed8d962" data-file-name="app/page.tsx">Changelog</span></Link></li>
              </ul>
            </div>

            <div data-unique-id="803d256d-3a62-49e0-b956-11bc53b925f9" data-file-name="app/page.tsx">
              <h4 className="font-medium mb-4" data-unique-id="6a439520-3ab1-42e9-9d14-bbf09eabe75f" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="c32449e9-adfb-44a8-99fa-f59d2433ab96" data-file-name="app/page.tsx">Resources</span></h4>
              <ul className="space-y-2 text-sm text-muted-foreground" data-unique-id="0840c9d1-e861-41c3-82b8-73373c0b21f5" data-file-name="app/page.tsx">
                <li data-unique-id="825aba57-7f5b-44c7-829e-143ae60a39d0" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="0b95de4b-4ddc-4f2e-be64-1026f364fd2a" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="c5fdee60-329b-4039-ada8-7cba495fa9e8" data-file-name="app/page.tsx">Documentation</span></Link></li>
                <li data-unique-id="972e2ae4-af1b-4ad9-8cbf-0c320e779074" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="809fbdf4-aaa4-4331-b06a-d3213ee2ac07" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="de335726-7e30-4f8f-b63d-930cc374ff78" data-file-name="app/page.tsx">API</span></Link></li>
                <li data-unique-id="bb89b8ec-69e0-4aac-a55e-674aeac6acf8" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="5577e3ff-99d0-49f0-aa43-241f95fd9678" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="75d10c40-c2cc-412c-bf05-dd17988608d5" data-file-name="app/page.tsx">Guides</span></Link></li>
                <li data-unique-id="7eac23e7-049d-40f6-8d4e-4f719d9dc06b" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="63322998-8666-44f6-a114-edc2a490fdc9" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="e8427476-6bb5-4d8e-9fe1-ab065db263aa" data-file-name="app/page.tsx">Help Center</span></Link></li>
              </ul>
            </div>

            <div data-unique-id="811fad1d-113f-4c5d-8030-494011e1cd2c" data-file-name="app/page.tsx">
              <h4 className="font-medium mb-4" data-unique-id="eb7d971f-02c1-440d-8719-fbe7860169de" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="c35966cd-fc02-4789-953e-05ca74a0e616" data-file-name="app/page.tsx">Company</span></h4>
              <ul className="space-y-2 text-sm text-muted-foreground" data-unique-id="5eab2311-dc82-4639-8304-eebf9d1dba44" data-file-name="app/page.tsx">
                <li data-unique-id="33c1c372-4669-4df6-a248-1e969b8b9dd8" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="99287b9c-329d-4e71-bb07-91a9ef736e9b" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="9b20b45a-08df-40cd-ac89-ab517520f18b" data-file-name="app/page.tsx">About</span></Link></li>
                <li data-unique-id="ded10f21-006b-4a3a-a977-be0bbfd57285" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="c9c9fd7e-3dd5-4463-a0da-61ae60a2795e" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="573bd016-fd4b-4570-875e-750d4b09ca58" data-file-name="app/page.tsx">Blog</span></Link></li>
                <li data-unique-id="ccee5394-0f84-420f-96d9-018198003219" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="cdeb3289-c997-4313-9f32-0def394ecc1c" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="412433bb-2884-4858-abe3-bb593feea340" data-file-name="app/page.tsx">Careers</span></Link></li>
                <li data-unique-id="a5895a07-90f1-4c27-8309-6db69b96d97c" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="470d801c-a8cd-4bc2-8bb5-cfc1f3c64706" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="9fba4a06-fff7-45ba-8e45-20e8cf236fff" data-file-name="app/page.tsx">Contact</span></Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center" data-unique-id="bca5f391-7e37-4045-83f9-b4b86decea63" data-file-name="app/page.tsx">
            <div className="text-sm text-muted-foreground" data-unique-id="cb2af09e-7ce7-45fc-8668-2b609a6c49e1" data-file-name="app/page.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="6af0fd6c-612e-4ed1-b612-b7176928c1c1" data-file-name="app/page.tsx">
              © </span>{new Date().getFullYear()}<span className="editable-text" data-unique-id="ef7eb2fb-9b22-48ed-b168-8b20061bd32e" data-file-name="app/page.tsx"> SKOOP. All rights reserved.
            </span></div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0" data-unique-id="ebaaf91f-607b-4aeb-8e0a-2d3916087782" data-file-name="app/page.tsx">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors" data-unique-id="915467e8-fa1f-4fdf-954b-a76a723ce083" data-file-name="app/page.tsx">
                <span className="sr-only" data-unique-id="fd3b01cd-7b3f-41f0-9259-77c96cf5a4be" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="1ebcea03-78e5-4afa-891a-d6d1316ca0c1" data-file-name="app/page.tsx">Twitter</span></span>
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors" data-unique-id="4c58d396-8686-43ce-8fd6-aa860fdfab52" data-file-name="app/page.tsx">
                <span className="sr-only" data-unique-id="84949e3a-6656-4e6d-b157-6ebeee150967" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="b1396921-5e94-4df7-93a0-a4be1f6927b7" data-file-name="app/page.tsx">GitHub</span></span>
                <Github className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>;
}