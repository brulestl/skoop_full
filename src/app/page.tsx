import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import Image from "next/image";
import { Search, Github, Twitter, Code as StackOverflow, Bookmark, FolderPlus as Collection, CheckCircle2, ChevronRight, ArrowRight } from "lucide-react";
export default function HomePage() {
  return <div className="min-h-screen flex flex-col" data-unique-id="337d23bc-4ddd-4269-a8d9-e8bde8531d69" data-file-name="app/page.tsx" data-dynamic-text="true">
      {/* Header */}
      <header className="border-b border-border" data-unique-id="bdfe2c23-b170-4624-8106-2be2f8082117" data-file-name="app/page.tsx">
        <div className="skoop-container flex items-center justify-between h-16" data-unique-id="982fccab-83be-40f2-b7a6-09d8bfc618b3" data-file-name="app/page.tsx">
          <div className="flex items-center" data-unique-id="f095fe41-03fa-4da4-9c24-d63b5a0badcf" data-file-name="app/page.tsx">
            <div className="text-2xl font-bold text-primary" data-unique-id="a757f02c-bba7-4e1d-ac3c-2b055c1e50ab" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="c0df15ed-5c0c-4910-9123-df2483eabe5c" data-file-name="app/page.tsx">SKOOP</span></div>
            <nav className="hidden ml-12 space-x-6 lg:flex" data-unique-id="14a790bb-4891-47f5-b774-f5fed5be3625" data-file-name="app/page.tsx">
              <Link href="#features" className="text-foreground hover:text-primary transition-colors" data-unique-id="58cb0d6b-77d1-47ef-a7ad-843d9fd5b89c" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="8d750ce2-b2f2-4fab-a533-4b0e3582cbef" data-file-name="app/page.tsx">Features</span></Link>
              <Link href="#pricing" className="text-foreground hover:text-primary transition-colors" data-unique-id="eca9c3e6-778f-4cef-b035-0159ac2eef11" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="73fa232f-9d4d-4199-b651-8ccb8fa07870" data-file-name="app/page.tsx">Pricing</span></Link>
              <Link href="#faq" className="text-foreground hover:text-primary transition-colors" data-unique-id="35193cec-bd16-443d-94fa-5684687bc113" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="08b9c87b-4832-4840-b8cd-35c426c1a182" data-file-name="app/page.tsx">FAQ</span></Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4" data-unique-id="39ed52a2-fc9e-48ff-b0f7-1c10b7fdeecc" data-file-name="app/page.tsx">
            <ThemeToggle />
            <a href="/login" className="text-foreground hover:text-primary transition-colors" data-unique-id="81381895-b303-49e1-8aa1-f6c13596057b" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="2ccbb9e7-46e7-4cfa-84a5-1dd73a1939b5" data-file-name="app/page.tsx">Log in</span></a>
            <Button className="skoop-button-accent" data-unique-id="a2045bc5-6be7-4344-837e-f294fee0ed91" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="578c54aa-7d21-47be-9a6a-3e2fc48ce738" data-file-name="app/page.tsx">Sign Up Free</span></Button>
          </div>
        </div>
      </header>

      <main className="flex-grow" data-unique-id="3e2b0681-517f-4220-bea6-4639a3d25fd4" data-file-name="app/page.tsx" data-dynamic-text="true">
        {/* Hero Section */}
        <section className="skoop-section bg-gradient-to-b from-background to-secondary/20" data-unique-id="3c4a6f10-54e4-4504-9aa2-c46441fcfcce" data-file-name="app/page.tsx">
          <div className="skoop-container" data-unique-id="a0272057-6d81-45a2-8807-c91b76936b97" data-file-name="app/page.tsx" data-dynamic-text="true">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-24 items-center" data-unique-id="5869e2a0-9a68-4761-9331-5d9e33193227" data-file-name="app/page.tsx">
              <div data-unique-id="e1f2452d-8a2f-4dcc-9564-422ec0297f9a" data-file-name="app/page.tsx">
                <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl mb-6" data-unique-id="44585777-5d18-495b-9df2-11bca6a72012" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="8db7421f-c54b-441c-9a1b-aaf2a60da33a" data-file-name="app/page.tsx">
                  Collect, search and </span><span className="text-primary" data-unique-id="a3d74ded-a5a0-4fa3-9513-7fda1d04fc93" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="948a5391-143f-4acc-bd08-5182bdaee03c" data-file-name="app/page.tsx">rediscover</span></span><span className="editable-text" data-unique-id="0c837ce5-d9c6-40e3-9687-595285d1299e" data-file-name="app/page.tsx"> your saved content
                </span></h1>
                <p className="text-lg text-muted-foreground mb-8" data-unique-id="0a0058cc-ba9b-4b5c-bf68-04f368c4b2e6" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="44c8edcd-4586-4063-a6a0-92742353632f" data-file-name="app/page.tsx">
                  One calm space for all your saved tweets, GitHub stars, Reddit posts, and Stack Overflow favorites.
                </span></p>
                <div className="flex flex-col sm:flex-row gap-4" data-unique-id="e61a5619-b3aa-4eb7-aba1-e031bb710144" data-file-name="app/page.tsx">
                  <Button className="skoop-button-accent" size="lg" data-unique-id="c152f313-4a93-45d3-bc28-d53f7c83de62" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="591c3d82-2053-4ada-af64-0423a3b4c103" data-file-name="app/page.tsx">Get Started</span></Button>
                  <Button variant="outline" size="lg" className="group" data-unique-id="775dd59b-b011-4159-8c1e-4c87817639ea" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="c56e93fa-efa8-4980-97a1-107df754ee82" data-file-name="app/page.tsx">
                    How It Works
                    </span><ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
                <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground" data-unique-id="42d3ce10-3571-451f-b9f5-a4d6b6408827" data-file-name="app/page.tsx">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span data-unique-id="59d1f666-35dd-44b7-9388-ed67365f3b68" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="1bcdf645-63b6-40ae-8509-ea5785ee6ab7" data-file-name="app/page.tsx">No credit card required</span></span>
                </div>
              </div>
              <div className="relative" data-unique-id="6a21f188-228c-4883-b6db-90815ab0c60b" data-file-name="app/page.tsx" data-dynamic-text="true">
                <div className="skoop-card overflow-hidden" data-unique-id="50743b64-4a8a-425c-a871-99b18fc99330" data-file-name="app/page.tsx">
                  <Image src="https://images.unsplash.com/photo-1508921340878-ba53e1f016ec?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3" alt="SKOOP Dashboard" width={600} height={400} className="w-full h-auto rounded-t-[var(--radius)]" data-unique-id="5665789a-7c1f-4de0-9938-8eef834f8420" data-file-name="app/page.tsx" />
                  <div className="p-6" data-unique-id="1ea082b5-77c8-4257-b2bf-3efd09ee7bcd" data-file-name="app/page.tsx">
                    <div className="flex items-center justify-between mb-4" data-unique-id="75b4ce1a-5d11-4db3-8e2d-37b38da60d0a" data-file-name="app/page.tsx">
                      <div className="font-semibold" data-unique-id="fe55cd55-4d98-4ea2-974f-85463801d241" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="38ccb40f-0ba0-44c5-a553-e18319df67b7" data-file-name="app/page.tsx">Recent Saves</span></div>
                      <Search className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="space-y-3" data-unique-id="6ee4e677-3186-40c1-aa2a-bf66d2eb73ca" data-file-name="app/page.tsx" data-dynamic-text="true">
                      {[1, 2, 3].map(i => <div key={i} className="flex items-center gap-3 p-3 rounded-md bg-secondary/50" data-unique-id="96042b22-0a01-414f-93bf-f07fe8c3042d" data-file-name="app/page.tsx" data-dynamic-text="true">
                          {i === 1 && <Github className="h-5 w-5 text-foreground" />}
                          {i === 2 && <Twitter className="h-5 w-5 text-foreground" />}
                          {i === 3 && <StackOverflow className="h-5 w-5 text-foreground" />}
                          <div className="flex-grow" data-unique-id="9d8cb861-f2e8-4f46-930b-04319622f234" data-file-name="app/page.tsx">
                            <div className="text-sm font-medium truncate" data-unique-id="14972c78-a379-441b-999a-1a1aa8f7323c" data-file-name="app/page.tsx" data-dynamic-text="true">
                              {i === 1 && "Interesting open source project for data visualization"}
                              {i === 2 && "Thread: 10 tips for better React performance"}
                              {i === 3 && "How to optimize PostgreSQL queries for large datasets"}
                            </div>
                            <div className="text-xs text-muted-foreground mt-0.5" data-unique-id="16d4b4f4-1c4c-472a-a18b-98b852ae1895" data-file-name="app/page.tsx" data-dynamic-text="true">
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
                <div className="absolute -left-8 top-1/2 bg-card p-3 rounded-full shadow-lg border border-border hidden lg:block" data-unique-id="b95392d3-7fe3-48ee-9aab-c73a0111005f" data-file-name="app/page.tsx">
                  <Github className="h-6 w-6 text-primary" />
                </div>
                <div className="absolute -right-8 bottom-1/3 bg-card p-3 rounded-full shadow-lg border border-border hidden lg:block" data-unique-id="d6c60cc4-5d80-4dc4-a508-39ac642196f6" data-file-name="app/page.tsx">
                  <Twitter className="h-6 w-6 text-accent" />
                </div>
              </div>
            </div>

            {/* Logos */}
            <div className="mt-20" data-unique-id="06a128c2-ca13-455f-aa77-305640e1d3bb" data-file-name="app/page.tsx">
              <p className="text-center text-sm text-muted-foreground mb-6" data-unique-id="d284e6b0-e261-42bf-ac7e-6b0fa987470b" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="c4ca7880-b74d-4666-9d6d-6ea1880746b8" data-file-name="app/page.tsx">
                Connect with your favorite platforms
              </span></p>
              <div className="flex justify-center items-center flex-wrap gap-8 md:gap-12" data-unique-id="59e1cb8f-4c78-40ac-8458-2e7c03239384" data-file-name="app/page.tsx">
                <Github className="h-8 w-8 text-muted-foreground" />
                <Twitter className="h-8 w-8 text-muted-foreground" />
                <StackOverflow className="h-8 w-8 text-muted-foreground" />
                <div className="text-muted-foreground text-xl font-semibold" data-unique-id="6aaccb3e-d277-4bcd-8260-1a3623d6c275" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="1601f69a-561d-43d5-ad92-ab5747a92aa3" data-file-name="app/page.tsx">Reddit</span></div>
                <div className="text-muted-foreground text-xl font-semibold" data-unique-id="ad9effc8-6019-41e1-92a2-aaec2e52a196" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="bc69dfb3-d89a-454f-9f77-d070b9d91a4d" data-file-name="app/page.tsx">DEV</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="skoop-section" data-unique-id="8921e604-f389-40ae-aeff-c2803f8a49c0" data-file-name="app/page.tsx">
          <div className="skoop-container" data-unique-id="0d1b0e62-bb5e-4d4d-a1ec-7f2c69baef93" data-file-name="app/page.tsx">
            <div className="text-center mb-16" data-unique-id="70c2293f-ecef-4638-b4b6-6d112ef80cd6" data-file-name="app/page.tsx">
              <h2 className="text-3xl font-bold mb-4" data-unique-id="9d1a2d0b-04bd-43e0-80cd-1e11da0b09f2" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="8fd463a4-1c71-4f19-949f-cfdb22c4a5bb" data-file-name="app/page.tsx">Finally, a place for all your saved content</span></h2>
              <p className="text-muted-foreground max-w-2xl mx-auto" data-unique-id="ddd07db8-3074-4e5e-8dea-e4d21bd6bc86" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="13a0e96e-bea4-409f-a2df-37337e435c4e" data-file-name="app/page.tsx">
                SKOOP solves the problem of fragmented saves and makes it easy to find what you need when you need it.
              </span></p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3" data-unique-id="cb3bd09b-283b-49fe-9d7f-beccd3001ac3" data-file-name="app/page.tsx" data-dynamic-text="true">
              {/* Feature 1 */}
              <div className="skoop-card p-6" data-unique-id="8e41a700-8611-492c-949e-8a64d15eee37" data-file-name="app/page.tsx">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary bg-opacity-10 mb-4" data-unique-id="e9dbb364-4832-40d3-9d77-28a1f6363df7" data-file-name="app/page.tsx">
                  <Bookmark className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3" data-unique-id="8ec33948-67da-4f12-bf65-998b6637d84d" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="69608fb2-85bc-40ed-af25-295e64d7866b" data-file-name="app/page.tsx">Unified Collection</span></h3>
                <p className="text-muted-foreground mb-4" data-unique-id="aeeccfe0-a774-4a9b-b2ee-ad655e8f0473" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="7bfc4b71-8431-45ff-86dc-9c9dac0b209d" data-file-name="app/page.tsx">
                  Import and sync all your saved content from GitHub, Twitter, Reddit, and Stack Overflow in one place.
                </span></p>
                <div className="pt-4 border-t border-border mt-auto" data-unique-id="0e56ece9-4ab6-4cd1-bb6f-5fa0eec6792c" data-file-name="app/page.tsx">
                  <Link href="#" className="inline-flex items-center text-primary hover:underline" data-unique-id="65bc2447-5a69-48a1-ae39-047d33055a77" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="0055c546-2a70-444e-a201-985f617cdc1a" data-file-name="app/page.tsx">
                    Learn more </span><ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="skoop-card p-6" data-unique-id="01dc656b-fa18-4f53-9205-673424f27b5d" data-file-name="app/page.tsx">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-accent bg-opacity-10 mb-4" data-unique-id="e71556f7-c985-4856-930a-7c2cf4a4e2bc" data-file-name="app/page.tsx">
                  <Search className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3" data-unique-id="bbc59c69-1b05-4169-b88e-b577282fef23" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="3c2517f4-5f73-451e-8a8d-c187cc645db2" data-file-name="app/page.tsx">Semantic Search</span></h3>
                <p className="text-muted-foreground mb-4" data-unique-id="4ea03b4f-6dba-4f1b-afb1-13ea92b58eda" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="ab3fe7df-1e99-4a17-a044-aec84c319e6c" data-file-name="app/page.tsx">
                  Find what you're looking for with powerful semantic search that understands the meaning behind your queries.
                </span></p>
                <div className="pt-4 border-t border-border mt-auto" data-unique-id="c71160ae-239a-42a3-bb7e-9efbbae8fadb" data-file-name="app/page.tsx">
                  <Link href="#" className="inline-flex items-center text-primary hover:underline" data-unique-id="640bcd9f-4857-4f20-86d5-e410d8608932" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="92380606-1da8-44b2-b23f-05528b785d1d" data-file-name="app/page.tsx">
                    Learn more </span><ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="skoop-card p-6" data-unique-id="eb350c30-7c03-49aa-84fe-6bc42b9495bc" data-file-name="app/page.tsx">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-destructive bg-opacity-10 mb-4" data-unique-id="4fafae1e-ac07-42e3-bacd-185f3391844d" data-file-name="app/page.tsx">
                  <Collection className="h-6 w-6 text-destructive" />
                </div>
                <h3 className="text-xl font-semibold mb-3" data-unique-id="43c529d2-16b4-418a-808e-294081d98275" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="be387f3a-3a4e-4f03-95e9-fa9a49b1f617" data-file-name="app/page.tsx">Smart Collections</span></h3>
                <p className="text-muted-foreground mb-4" data-unique-id="1c6d7b5d-c317-4fd7-b215-29c0f5588423" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="9a5fda14-9156-48ca-9162-ce6f32d41850" data-file-name="app/page.tsx">
                  Organize your content with automated collections that group similar items together and surface the best content.
                </span></p>
                <div className="pt-4 border-t border-border mt-auto" data-unique-id="bffe2ffa-9d5a-4a58-b0f0-d44e44ad4db6" data-file-name="app/page.tsx">
                  <Link href="#" className="inline-flex items-center text-primary hover:underline" data-unique-id="32cf952b-991c-493d-9807-1073e2fd97d6" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="c0f11e6e-4f8c-4ed4-bb6f-3864cf951926" data-file-name="app/page.tsx">
                    Learn more </span><ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="skoop-section bg-secondary bg-opacity-30" data-unique-id="5819af5c-f587-43c0-b374-19f1c5610ad5" data-file-name="app/page.tsx">
          <div className="skoop-container" data-unique-id="17f2a2f5-aa00-4425-a7bf-2271ee322def" data-file-name="app/page.tsx">
            <div className="text-center mb-16" data-unique-id="27f5349d-78ef-4f44-941f-cd9c8d92280a" data-file-name="app/page.tsx">
              <h2 className="text-3xl font-bold mb-4" data-unique-id="01911790-8fb5-44f2-9d00-fb48cf5c231c" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="43d18db7-5cdb-4a21-ba51-22867fb631fb" data-file-name="app/page.tsx">Simple, transparent pricing</span></h2>
              <p className="text-muted-foreground max-w-2xl mx-auto" data-unique-id="5f9a5945-a225-45b7-bbe3-f32351063318" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="ce685b33-d3f2-403f-881f-b3b61a04ef47" data-file-name="app/page.tsx">
                Choose the plan that fits your needs. All plans include our core features.
              </span></p>
            </div>

            <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto" data-unique-id="9cc411aa-094e-458b-ae92-83997c272067" data-file-name="app/page.tsx" data-dynamic-text="true">
              {/* Free Plan */}
              <div className="skoop-card p-6 flex flex-col h-full border border-border" data-unique-id="68d63342-ad9b-4663-98e3-7debbd79380a" data-file-name="app/page.tsx">
                <div className="mb-6" data-unique-id="f5a57c73-6ffa-4b47-9d83-e279dabcf710" data-file-name="app/page.tsx">
                  <h3 className="text-lg font-medium mb-2" data-unique-id="86d59f20-3d9c-4cd1-9c46-c857a5da2725" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="5a67206a-61c1-4993-afd9-3ad5d53f4088" data-file-name="app/page.tsx">Free</span></h3>
                  <div className="text-3xl font-bold" data-unique-id="f2398264-d275-4df4-9131-7250f243f22d" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="de89dffe-d5c8-4462-a9a9-b98757d77b33" data-file-name="app/page.tsx">$0</span><span className="text-muted-foreground text-sm font-normal" data-unique-id="0f7e5336-6d74-4657-9408-f58db06b5ed3" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="d2ce6904-15a7-4fc4-8cec-fe6633214ddf" data-file-name="app/page.tsx">/month</span></span></div>
                  <p className="text-muted-foreground text-sm mt-3" data-unique-id="1348ec6d-6c9a-4418-8ef7-6b2aabf6b9eb" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="f4f53117-ede4-4291-88e6-3b2336886d70" data-file-name="app/page.tsx">Perfect for getting started</span></p>
                </div>
                <ul className="space-y-3 mb-8" data-unique-id="2b775733-e3d0-472a-aeb8-38b580f38c35" data-file-name="app/page.tsx">
                  <li className="flex items-start" data-unique-id="754e1c31-d29c-485b-a93a-ed35c2ac45db" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="795c1fc3-a279-4b46-b11a-e539167bc5e4" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="76961e83-0931-4512-afde-ae2692688651" data-file-name="app/page.tsx">500 saved items</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="4d3b1377-7b31-47e2-bea8-69f7da09fe47" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="df871b2d-2df3-4a4a-8bcc-69400c1b34e4" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="822394ce-a396-4239-9008-1b81bab3fe26" data-file-name="app/page.tsx">2 connected platforms</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="76db186e-ab50-42be-9c59-cb0352366409" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="0e97c705-6462-4de0-83b3-043efba7a750" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="7cf361ed-4be7-4942-b5db-a29caf34ab62" data-file-name="app/page.tsx">Basic search</span></span>
                  </li>
                </ul>
                <div className="mt-auto" data-unique-id="c0a2f777-ccac-4ea0-8b01-7ca7a913313d" data-file-name="app/page.tsx">
                  <Button className="w-full skoop-button-primary" data-unique-id="1544d103-93db-49b5-b944-0321b4638ca0" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="3d4a8349-811d-477c-9757-abd228b60c6a" data-file-name="app/page.tsx">Get Started</span></Button>
                </div>
              </div>

              {/* Pro Plan */}
              <div className="skoop-card p-6 flex flex-col h-full border-2 border-primary relative" data-unique-id="956322e5-201b-439a-9cac-228998735168" data-file-name="app/page.tsx">
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-sm font-medium rounded-bl-lg rounded-tr-[calc(var(--radius)-1px)]" data-unique-id="1326f6ce-507d-41f0-b9e3-c2c8bdc10424" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="b04162d4-63ce-4631-9052-31ffbe9fdc8e" data-file-name="app/page.tsx">
                  Popular
                </span></div>
                <div className="mb-6" data-unique-id="513bb568-d7d1-4d3b-8fd7-1b74ddbe77f6" data-file-name="app/page.tsx">
                  <h3 className="text-lg font-medium mb-2" data-unique-id="bc464d72-6f10-484c-9824-45316a98128c" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="24901aea-58dc-42cf-923b-83eac8360d1a" data-file-name="app/page.tsx">Pro</span></h3>
                  <div className="text-3xl font-bold" data-unique-id="f79e2a53-f4c0-4a1f-a6cf-a4f6b5ad0943" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="efd628e9-d319-4cb2-94a2-999b750fa099" data-file-name="app/page.tsx">$9</span><span className="text-muted-foreground text-sm font-normal" data-unique-id="581b2a8e-39a6-4476-9c3c-ecbc6cbb09af" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="15d2db0f-1c04-4cce-87f0-9ff9b047fcd4" data-file-name="app/page.tsx">/month</span></span></div>
                  <p className="text-muted-foreground text-sm mt-3" data-unique-id="d430e4f3-06d7-4d3c-b182-ddd42ea2727a" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="ff4a19a0-a7a9-45ee-9cf7-d0593dbfe76d" data-file-name="app/page.tsx">For power users</span></p>
                </div>
                <ul className="space-y-3 mb-8" data-unique-id="22fcc7b9-2d8f-46f0-9cd6-54f7323f66c7" data-file-name="app/page.tsx">
                  <li className="flex items-start" data-unique-id="000a947c-ba95-4d8b-80af-a24d56bcf680" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="75dc563f-db0c-4663-855f-a505560930b5" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="9de7c423-c420-4e81-9f68-bf9edc10eb19" data-file-name="app/page.tsx">Unlimited saved items</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="49cd9144-790f-4ac8-816e-7af5244613db" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="24a91ed6-06f0-4d6e-8756-94f9855b0bfd" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="c5b258c4-1cf4-4742-9c41-362e43d0d51e" data-file-name="app/page.tsx">All platforms</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="24ec46fa-7c3c-49ff-bbb3-9cb152ba3e50" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="82be3235-d007-463e-a9cd-12d368ce4f42" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="345b843a-4fc5-48a6-b5ea-e07a644e6cde" data-file-name="app/page.tsx">Advanced semantic search</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="eb0d9dfe-c8b3-4024-84b3-53ea9b178704" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="618eca25-e5fe-4877-925b-07c53e8427f8" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="f91d2371-9608-40c4-b09e-3027a1ee39ae" data-file-name="app/page.tsx">Smart collections</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="05e759c2-0994-44fa-bfab-6e2f8cd5e596" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="eef17831-cd9b-47be-bfbc-a5a150c9a8d0" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="9259b95e-1da3-41dc-ae66-4d6d54cd417f" data-file-name="app/page.tsx">15-minute sync</span></span>
                  </li>
                </ul>
                <div className="mt-auto" data-unique-id="031589f0-ddf6-4041-b348-cf21aeb93d44" data-file-name="app/page.tsx">
                  <Button className="w-full skoop-button-accent" data-unique-id="959a3eca-4a95-4d55-abe3-3264e7ebdba0" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="3281f48b-469b-4579-a135-7e359fd14b17" data-file-name="app/page.tsx">Choose Pro</span></Button>
                </div>
              </div>

              {/* Team Plan */}
              <div className="skoop-card p-6 flex flex-col h-full border border-border" data-unique-id="ee29cf32-a443-4f84-a9c1-9bfac67bd225" data-file-name="app/page.tsx">
                <div className="mb-6" data-unique-id="6ccf72ed-50b1-4683-933e-1ba9b4fec96e" data-file-name="app/page.tsx">
                  <h3 className="text-lg font-medium mb-2" data-unique-id="ef120eb4-9797-4971-9051-b0fb9e2e32d4" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="66af7446-7043-4b84-b3ac-ea344f762008" data-file-name="app/page.tsx">Team</span></h3>
                  <div className="text-3xl font-bold" data-unique-id="6e60f486-ad1c-486b-9c8a-611260a7ac51" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="adee2725-dd44-40e8-8a30-1b4d887bc7f7" data-file-name="app/page.tsx">$19</span><span className="text-muted-foreground text-sm font-normal" data-unique-id="ed73a773-20bb-4fac-bebb-013edc8bbe12" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="4581c785-d4fa-4952-b4c9-1ca0f72981b9" data-file-name="app/page.tsx">/month</span></span></div>
                  <p className="text-muted-foreground text-sm mt-3" data-unique-id="8c01a773-d346-44be-92e5-4c134d2ec03f" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="ec3a26ef-f7e3-4837-a6af-984f1d37a477" data-file-name="app/page.tsx">Collaborate with your team</span></p>
                </div>
                <ul className="space-y-3 mb-8" data-unique-id="d3975475-e350-47ee-95c7-640e2c3e9f46" data-file-name="app/page.tsx">
                  <li className="flex items-start" data-unique-id="1e22c842-0b8b-4160-83f9-e515289c1eca" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="19e98d3c-0e0a-4326-9cb4-e4bfac0276b8" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="ff77fc5e-6947-4853-bccc-1f88b044b7ae" data-file-name="app/page.tsx">Everything in Pro</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="42376df2-09e4-4d76-878c-5bd64c9a416f" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="066245b5-f340-479b-8b68-1609e87188f7" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="a5f3727e-0190-406a-b94c-655e8e5c1580" data-file-name="app/page.tsx">5 team members</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="50aaf32d-0e75-4a2e-a96a-0b638d060604" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="7d39f627-5cd9-4417-8f11-ee1d7d9b3aa9" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="db187e7b-feca-48c7-aa89-fb6d82e8b686" data-file-name="app/page.tsx">Shared collections</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="e542caef-f4af-4c1c-913a-cd4c925a0088" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="64b84dee-bd35-499d-bec0-a7b761d09c93" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="00ae35bc-fb31-456a-af2a-bebc752e067f" data-file-name="app/page.tsx">Collaboration tools</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="ebff2be8-dcbe-443a-a9c1-8aaa7ef1b43f" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="d9b018f4-28c8-4f1e-ab7d-c45203179a3d" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="7d42d954-1652-463f-a92e-f90149863c1a" data-file-name="app/page.tsx">Advanced analytics</span></span>
                  </li>
                </ul>
                <div className="mt-auto" data-unique-id="be3ff7b0-c369-4710-8a3a-03eab54bb7b5" data-file-name="app/page.tsx">
                  <Button className="w-full skoop-button-primary" data-unique-id="6e062a1c-901f-4e2a-9a25-ab855ee8c272" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="aae4d9fe-6e2a-4ae6-8f71-bf3705be3025" data-file-name="app/page.tsx">Choose Team</span></Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="skoop-section" data-unique-id="74d3335d-1de7-4857-a180-b787f1ab5ea5" data-file-name="app/page.tsx">
          <div className="skoop-container max-w-4xl" data-unique-id="b0026ca0-751d-4870-af69-b80e23ca42f3" data-file-name="app/page.tsx">
            <div className="skoop-card p-8 md:p-12 text-center" data-unique-id="363f3988-4472-45ae-8d04-fa27716aa537" data-file-name="app/page.tsx">
              <h2 className="text-2xl md:text-3xl font-bold mb-4" data-unique-id="ff1210f5-c5d1-4fb7-97fd-4e9e50302166" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="f9ee28e3-2223-4f41-8410-c159a54a433c" data-file-name="app/page.tsx">Ready to organize your digital knowledge?</span></h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto" data-unique-id="7aa6d9fb-c8dd-4238-a4b5-3607732bbda7" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="c94ed507-8a5f-435b-9265-fb97b6c8ae00" data-file-name="app/page.tsx">
                Join thousands of developers, designers, and researchers who are using SKOOP to make the most of their saved content.
              </span></p>
              <div className="flex flex-col sm:flex-row justify-center gap-4" data-unique-id="e653ae7d-a196-41cc-9302-03c7bcb72a24" data-file-name="app/page.tsx">
                <Button className="skoop-button-accent" size="lg" data-unique-id="485269b8-61c1-41e4-938a-7dee7df03637" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="1f072a9a-ee1e-45bc-aea5-aacf2373cc8f" data-file-name="app/page.tsx">Get Started for Free</span></Button>
                <Button variant="outline" size="lg" data-unique-id="3866f342-3064-4054-8e92-f374286b7f1c" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="53982261-ce15-4704-85ee-b5d549027fe9" data-file-name="app/page.tsx">
                  Request Demo
                </span></Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-secondary bg-opacity-30 border-t border-border py-12" data-unique-id="6e61dbfc-228c-43bf-971e-e5097a7dc964" data-file-name="app/page.tsx">
        <div className="skoop-container" data-unique-id="ee05e3e8-4a94-43a1-a6cc-63e64b8185ba" data-file-name="app/page.tsx">
          <div className="grid gap-8 md:grid-cols-4" data-unique-id="177ee102-c4f0-4871-9f08-d4444933b410" data-file-name="app/page.tsx">
            <div data-unique-id="913046a3-578e-4c69-8f1a-c3cd39bbe4fb" data-file-name="app/page.tsx">
              <div className="text-2xl font-bold text-primary mb-4" data-unique-id="5b0b815a-39ae-40f9-a35d-1c8b52fdd6b2" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="0d7b2665-07c9-4450-8971-255a7aa8d44f" data-file-name="app/page.tsx">SKOOP</span></div>
              <p className="text-muted-foreground text-sm" data-unique-id="f4a48285-6323-4a83-b189-fdf062581bca" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="e19546dd-f48c-469e-a951-c5bc7dac2ef9" data-file-name="app/page.tsx">
                The all-in-one platform for collecting, searching and rediscovering your saved content.
              </span></p>
            </div>

            <div data-unique-id="df7587dc-c19b-4daf-8813-d14bdcb8301b" data-file-name="app/page.tsx">
              <h4 className="font-medium mb-4" data-unique-id="1dcc9e50-860d-40c2-8df8-db045fbe66ab" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="40f273dc-0816-4f95-b93a-09c9eefbc89f" data-file-name="app/page.tsx">Product</span></h4>
              <ul className="space-y-2 text-sm text-muted-foreground" data-unique-id="a043ee76-3598-41b3-bf06-40d5978e6a34" data-file-name="app/page.tsx">
                <li data-unique-id="380ea887-9a03-4864-98ec-ce3bcc41dace" data-file-name="app/page.tsx"><Link href="#features" className="hover:text-primary transition-colors" data-unique-id="6ec2904f-91e0-4b4e-90fe-cbfd802788d4" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="3ca230e9-48f2-41b3-9baf-4a40a697391e" data-file-name="app/page.tsx">Features</span></Link></li>
                <li data-unique-id="4a642ea6-69fb-4942-94a0-a57b0d4701b4" data-file-name="app/page.tsx"><Link href="#pricing" className="hover:text-primary transition-colors" data-unique-id="c9dbc2fe-67de-41de-b097-da58722a0a76" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="bc213a17-6500-414a-a29e-6d1d4f4733d8" data-file-name="app/page.tsx">Pricing</span></Link></li>
                <li data-unique-id="28e90312-d004-4803-9058-64c255fb6172" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="a4290ee0-a0fe-42a6-ad57-1a520e9059c3" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="637cf634-28b8-4c52-888e-1ec2ac879f19" data-file-name="app/page.tsx">Integrations</span></Link></li>
                <li data-unique-id="7cb36625-70d4-493b-a904-bc3796f81795" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="4740fc3d-6ebd-4da6-a26e-aec0ac98944c" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="f8f5e1b2-cbab-4f77-8199-ac90f81e975c" data-file-name="app/page.tsx">Changelog</span></Link></li>
              </ul>
            </div>

            <div data-unique-id="73c54b44-d259-43de-bacb-92a193f3ae37" data-file-name="app/page.tsx">
              <h4 className="font-medium mb-4" data-unique-id="3beedd9e-4856-426f-be4e-83ce3398beb2" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="5a2aaf9f-cb67-48d5-890f-013636b86565" data-file-name="app/page.tsx">Resources</span></h4>
              <ul className="space-y-2 text-sm text-muted-foreground" data-unique-id="f21c5b2e-9118-4478-9ef3-0a510c442a1d" data-file-name="app/page.tsx">
                <li data-unique-id="c69f8bc3-ff9b-4557-9a31-928722fb3ef2" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="5dc04450-7fe9-45a6-8826-500ac33fd157" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="91bd3007-a046-41c4-8217-f93478d72049" data-file-name="app/page.tsx">Documentation</span></Link></li>
                <li data-unique-id="4a73b822-6bc7-4f24-a112-eaa38a2228df" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="f30f64ad-1f67-4616-9a7c-5f6061cee054" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="6aca1662-5f44-4594-9e43-1265f1dbada7" data-file-name="app/page.tsx">API</span></Link></li>
                <li data-unique-id="a0e00a5b-c34c-49f0-ab11-10900927fc8b" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="a8adf56e-c76a-4701-a794-3cee6fc07ddd" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="7a98534d-6346-4476-a01b-41f088fa2c42" data-file-name="app/page.tsx">Guides</span></Link></li>
                <li data-unique-id="b8f4234a-f250-4982-936c-2749ebce8540" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="19abd730-00cc-47d4-9f1e-29dd1b9aac22" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="3472c9a2-6321-4dba-b5a9-1799ee7ef2b2" data-file-name="app/page.tsx">Help Center</span></Link></li>
              </ul>
            </div>

            <div data-unique-id="369384b3-425d-4dbf-9e18-e9fe4b98c0e0" data-file-name="app/page.tsx">
              <h4 className="font-medium mb-4" data-unique-id="d577d78c-0e94-47bd-8c9b-c9ec5a230fe8" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="e52a8f06-cdff-4b26-bfa2-a6e42e690b2f" data-file-name="app/page.tsx">Company</span></h4>
              <ul className="space-y-2 text-sm text-muted-foreground" data-unique-id="c4197453-a213-4b90-a521-cf5995b0b53d" data-file-name="app/page.tsx">
                <li data-unique-id="6eeb70c3-139a-40c1-a7bc-d31e6f72220d" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="a398389e-c04b-4f82-8523-e56654d72226" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="040e08a6-035f-46b0-b977-c2bbb3c8658a" data-file-name="app/page.tsx">About</span></Link></li>
                <li data-unique-id="9b4228e1-02e2-436b-be90-2555f5cc59be" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="222f9132-bcf9-49d2-bc60-9c8ec129a083" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="03492d1e-1c24-4462-aec5-a7006c06ccbe" data-file-name="app/page.tsx">Blog</span></Link></li>
                <li data-unique-id="224661c8-9472-47f5-bd3e-3a44712a8f02" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="373d969f-97d2-4216-ac8a-1589e99320cf" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="f878cf6c-6e5b-44fa-bfdc-eac19fd19e2c" data-file-name="app/page.tsx">Careers</span></Link></li>
                <li data-unique-id="78ad7ae8-9f7e-4ef0-bb7b-7bee6e0c4e91" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="afaadf49-8446-4a36-a160-0b184630fc3c" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="932d3871-d765-4fa2-bfa8-b2b8be49985d" data-file-name="app/page.tsx">Contact</span></Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center" data-unique-id="8c275d8a-c78a-4acf-9229-e6e77c6d5da7" data-file-name="app/page.tsx">
            <div className="text-sm text-muted-foreground" data-unique-id="6284235c-bd31-4b82-8dd8-d5300e824ec2" data-file-name="app/page.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="a979fd8b-e87b-4ef0-8d4e-d4372e90e23f" data-file-name="app/page.tsx">
              © </span>{new Date().getFullYear()}<span className="editable-text" data-unique-id="2505d3e7-a018-43e6-bf1c-c3e92bb55bed" data-file-name="app/page.tsx"> SKOOP. All rights reserved.
            </span></div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0" data-unique-id="fb3bbea4-62aa-4cea-905e-338972bd9377" data-file-name="app/page.tsx">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors" data-unique-id="e83735f9-b3ef-4be7-bee7-099f2b2a2108" data-file-name="app/page.tsx">
                <span className="sr-only" data-unique-id="8490d64d-6f6a-4bba-a708-bc1f814ba90c" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="db3e8f2b-2a54-403e-b523-ea257ea49c44" data-file-name="app/page.tsx">Twitter</span></span>
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors" data-unique-id="ad689037-8086-430c-b61e-5f94011cb4d8" data-file-name="app/page.tsx">
                <span className="sr-only" data-unique-id="678f7839-bb46-488a-b8c8-9e50454458ad" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="8d348524-c5d0-4694-b6b3-e84e2d1db538" data-file-name="app/page.tsx">GitHub</span></span>
                <Github className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>;
}