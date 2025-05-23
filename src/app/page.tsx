import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { AuroraBackground } from "@/components/ui/aurora-background";
import Link from "next/link";
import Image from "next/image";
import { Search, Github, Twitter, Code as StackOverflow, Bookmark, FolderPlus as Collection, CheckCircle2, ChevronRight, ArrowRight } from "lucide-react";
export default function HomePage() {
  return <div className="min-h-screen flex flex-col" data-unique-id="7d715bc2-226c-49c1-93ef-ab644f2448ae" data-file-name="app/page.tsx" data-dynamic-text="true">
      {/* Header */}
      <header className="border-b border-border relative z-10" data-unique-id="7c3bc896-14a0-4ab2-a5a9-dfbdbf2b4377" data-file-name="app/page.tsx">
        <div className="skoop-container flex items-center justify-between h-16" data-unique-id="8f27ccfa-310e-47fe-9578-d1047e949911" data-file-name="app/page.tsx">
          <div className="flex items-center" data-unique-id="aa864843-c052-4a22-8749-ec656824bc58" data-file-name="app/page.tsx">
            <div className="text-2xl font-bold text-primary" data-unique-id="ea71f395-513d-4e3c-9ebd-4db9de202c3d" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="4c4a2ff7-a542-4086-8d88-85ecdd3d1e31" data-file-name="app/page.tsx">SKOOP</span></div>
            <nav className="hidden ml-12 space-x-6 lg:flex" data-unique-id="6c4c0a0d-00a6-467f-a68a-e2f75b68e0e6" data-file-name="app/page.tsx">
              <Link href="#features" className="text-foreground hover:text-primary transition-colors" data-unique-id="baee311a-8801-4195-a33d-903049dce385" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="6840293c-33f4-40b8-a321-917f7e8b324d" data-file-name="app/page.tsx">Features</span></Link>
              <Link href="#pricing" className="text-foreground hover:text-primary transition-colors" data-unique-id="3dfe977c-008c-42d1-a212-d3b104b2cc45" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="50363588-0560-4e8b-b847-f9fb890b5f71" data-file-name="app/page.tsx">Pricing</span></Link>
              <Link href="#faq" className="text-foreground hover:text-primary transition-colors" data-unique-id="17c70fd4-584a-4866-8aa8-462e1b4df287" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="cdc5c3fc-748c-4472-b625-8367ef595749" data-file-name="app/page.tsx">FAQ</span></Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4" data-unique-id="3f4540bd-68ca-4fb4-85ab-ac92f10e69af" data-file-name="app/page.tsx">
            <ThemeToggle />
            <a href="/dashboard" className="text-foreground hover:text-primary transition-colors" data-unique-id="dfd0369e-fc47-4c9b-af2f-daba3babd93f" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="eaa3e8be-5cc8-4e8b-9bb6-be5a2c597906" data-file-name="app/page.tsx">Dashboard</span></a>
            <a href="/login" className="text-foreground hover:text-primary transition-colors" data-unique-id="93bb644e-c58b-414b-8a55-4e2ff1f48e8b" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="cb1a73de-81cd-4ea8-b7b5-323de222f5bb" data-file-name="app/page.tsx">Log in</span></a>
            <Button className="skoop-button-accent" data-unique-id="4b124d23-47b7-47a6-a26d-eb9a5fe95c9e" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="a0d4355b-6e86-4ae7-ae12-db96750d4ba2" data-file-name="app/page.tsx">Sign Up Free</span></Button>
          </div>
        </div>
      </header>

      <main className="flex-grow" data-unique-id="45003350-e3f6-4d83-8f44-1ff8e30e5b13" data-file-name="app/page.tsx" data-dynamic-text="true">
        {/* Hero Section with Aurora Background */}
        <section className="relative overflow-hidden" data-unique-id="34115a61-6879-46cd-a06b-2aeb334fe9af" data-file-name="app/page.tsx">
          <AuroraBackground className="absolute inset-0">
            <div className="absolute inset-0 bg-background/40 backdrop-blur-sm" data-unique-id="34917aaf-9f08-4517-95fe-af8d43297838" data-file-name="app/page.tsx" />
          </AuroraBackground>
          
          <div className="skoop-section relative z-10" data-unique-id="fe24aa2f-f9d1-4e85-a3b7-500ad2950943" data-file-name="app/page.tsx">
          <div className="skoop-container" data-unique-id="082436dd-9bb1-47c2-9b54-a08a688aee30" data-file-name="app/page.tsx" data-dynamic-text="true">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-24 items-center" data-unique-id="a520a893-913d-458d-bfd3-f1062ad187c6" data-file-name="app/page.tsx">
              <div data-unique-id="78c973bf-a058-4ee0-997b-94c3ce9055cf" data-file-name="app/page.tsx">
                <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl mb-6" data-unique-id="8d6125a6-749b-4597-9a23-2e85db55602a" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="55c352f0-2e7f-4121-8da9-096606532b3a" data-file-name="app/page.tsx">
                  Collect, search and </span><span className="text-primary" data-unique-id="57491441-0f5e-4cca-99bc-9a717818d366" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="cdafba19-2e2a-4c42-bd4b-d2c9a70488a1" data-file-name="app/page.tsx">rediscover</span></span><span className="editable-text" data-unique-id="49122958-f7ad-459f-adf2-dc578b01bbbd" data-file-name="app/page.tsx"> your saved content
                </span></h1>
                <p className="text-lg text-muted-foreground mb-8" data-unique-id="c143b095-f317-4224-a93e-30354df8264a" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="410a668c-d539-4dc1-b33c-4a39a8c889d2" data-file-name="app/page.tsx">
                  One calm space for all your saved tweets, GitHub stars, Reddit posts, and Stack Overflow favorites.
                </span></p>
                <div className="flex flex-col sm:flex-row gap-4" data-unique-id="b3a1a99c-2366-4aec-8376-498d1a301327" data-file-name="app/page.tsx">
                  <Button className="skoop-button-accent" size="lg" data-unique-id="0008bd23-fcdb-4a40-957f-10440571aefe" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="7e565bb8-d082-4477-8300-46133cbc7a4f" data-file-name="app/page.tsx">Get Started</span></Button>
                  <Button variant="outline" size="lg" className="group" data-unique-id="7d54cf12-955f-4d1e-92dc-07e8a6753ae2" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="bf572ff5-3264-4e20-bf68-63310c4d77e7" data-file-name="app/page.tsx">
                    How It Works
                    </span><ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
                <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground" data-unique-id="e2af5aac-c4d8-480e-ba64-4a8eb98f7263" data-file-name="app/page.tsx">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span data-unique-id="7679daeb-0731-4232-b882-c2f8435b3bbe" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="e2da5319-a43f-4002-9106-83011a0b704c" data-file-name="app/page.tsx">No credit card required</span></span>
                </div>
              </div>
              <div className="relative" data-unique-id="ae4e8918-be8d-43c1-929d-d34d29c8ecc3" data-file-name="app/page.tsx" data-dynamic-text="true">
                <div className="skoop-card overflow-hidden" data-unique-id="c70cf64e-f82d-46f1-8ef4-10330f862ba2" data-file-name="app/page.tsx">
                  <Image src="https://images.unsplash.com/photo-1508921340878-ba53e1f016ec?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3" alt="SKOOP Dashboard" width={600} height={400} className="w-full h-auto rounded-t-[var(--radius)]" data-unique-id="af2d2c55-1c46-4684-b79c-1663b1488bb0" data-file-name="app/page.tsx" />
                  <div className="p-6" data-unique-id="736fe3a9-6bac-459e-b286-2485cb4fcfbc" data-file-name="app/page.tsx">
                    <div className="flex items-center justify-between mb-4" data-unique-id="8ad7c553-d5fa-4764-86cb-5c5bb086c049" data-file-name="app/page.tsx">
                      <div className="font-semibold" data-unique-id="a109f115-7904-41a3-836d-6c93e7067f76" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="3473af2c-a5a2-450a-954c-6f9d553323bd" data-file-name="app/page.tsx">Recent Saves</span></div>
                      <Search className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="space-y-3" data-unique-id="cb1b7542-b16b-406d-8fbc-12d45b6f394e" data-file-name="app/page.tsx" data-dynamic-text="true">
                      {[1, 2, 3].map(i => <div key={i} className="flex items-center gap-3 p-3 rounded-md bg-secondary/50" data-unique-id="1d2d6879-e66b-4b46-9a86-18d65d43d08c" data-file-name="app/page.tsx" data-dynamic-text="true">
                          {i === 1 && <Github className="h-5 w-5 text-foreground" />}
                          {i === 2 && <Twitter className="h-5 w-5 text-foreground" />}
                          {i === 3 && <StackOverflow className="h-5 w-5 text-foreground" />}
                          <div className="flex-grow" data-unique-id="e3c642df-0e8d-4311-bd39-74fe4e0193c4" data-file-name="app/page.tsx">
                            <div className="text-sm font-medium truncate" data-unique-id="ee69bc99-39aa-43c5-ae68-fffc711b3535" data-file-name="app/page.tsx" data-dynamic-text="true">
                              {i === 1 && "Interesting open source project for data visualization"}
                              {i === 2 && "Thread: 10 tips for better React performance"}
                              {i === 3 && "How to optimize PostgreSQL queries for large datasets"}
                            </div>
                            <div className="text-xs text-muted-foreground mt-0.5" data-unique-id="97d2365d-e57b-4230-8458-842ccb25fd88" data-file-name="app/page.tsx" data-dynamic-text="true">
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
                <div className="absolute -left-8 top-1/2 bg-card p-3 rounded-full shadow-lg border border-border hidden lg:block" data-unique-id="2c7905ff-0d6f-489b-bb99-714feed98449" data-file-name="app/page.tsx">
                  <Github className="h-6 w-6 text-primary" />
                </div>
                <div className="absolute -right-8 bottom-1/3 bg-card p-3 rounded-full shadow-lg border border-border hidden lg:block" data-unique-id="efe6995d-2747-48f3-b362-6c8ab4e641d7" data-file-name="app/page.tsx">
                  <Twitter className="h-6 w-6 text-accent" />
                </div>
              </div>
            </div>

            {/* Logos */}
            <div className="mt-20" data-unique-id="74606c45-6956-4947-809d-2b047709e4d8" data-file-name="app/page.tsx">
              <p className="text-center text-sm text-muted-foreground mb-6" data-unique-id="dd4ab2ec-e049-4094-a98b-cd4e3b3fc950" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="de17877d-c99c-41bb-be87-335d1cf56d27" data-file-name="app/page.tsx">
                Connect with your favorite platforms
              </span></p>
              <div className="flex justify-center items-center flex-wrap gap-8 md:gap-12" data-unique-id="7889204a-5eb2-482e-a4b8-1f80b4717c65" data-file-name="app/page.tsx">
                <Github className="h-8 w-8 text-muted-foreground" />
                <Twitter className="h-8 w-8 text-muted-foreground" />
                <StackOverflow className="h-8 w-8 text-muted-foreground" />
                <div className="text-muted-foreground text-xl font-semibold" data-unique-id="51a3a06e-f698-44ba-b9e0-5703bb4469df" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="099e752d-1647-4964-9fd5-840e00a07d49" data-file-name="app/page.tsx">Reddit</span></div>
                <div className="text-muted-foreground text-xl font-semibold" data-unique-id="53866ab4-4f23-4278-930c-d62d59a777c5" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="37887895-1ba8-4748-9c6a-aed3261d119c" data-file-name="app/page.tsx">DEV</span></div>
              </div>
            </div>
          </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="skoop-section" data-unique-id="76d72ba3-d033-42c7-be36-48a39fe3a5a6" data-file-name="app/page.tsx">
          <div className="skoop-container" data-unique-id="22085f98-5177-47e1-b89d-b91ff13b7592" data-file-name="app/page.tsx">
            <div className="text-center mb-16" data-unique-id="d4b5a185-5be3-4449-a9e7-52c18cdcac17" data-file-name="app/page.tsx">
              <h2 className="text-3xl font-bold mb-4" data-unique-id="41f12a60-3621-41a2-851a-a723cfb12c27" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="e90a87f9-e9c3-463d-85fb-e4bd58fca9c7" data-file-name="app/page.tsx">Finally, a place for all your saved content</span></h2>
              <p className="text-muted-foreground max-w-2xl mx-auto" data-unique-id="a2b97a3e-fdd8-407a-a8a6-f63880d6117c" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="e2ee3774-e76d-4d51-ab27-7467b490f9e5" data-file-name="app/page.tsx">
                SKOOP solves the problem of fragmented saves and makes it easy to find what you need when you need it.
              </span></p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3" data-unique-id="57d475cc-30eb-4ba4-b5fc-183143420786" data-file-name="app/page.tsx" data-dynamic-text="true">
              {/* Feature 1 */}
              <div className="skoop-card p-6" data-unique-id="540f0902-69ca-43a6-a8cf-c4114c48a5b6" data-file-name="app/page.tsx">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary bg-opacity-10 mb-4" data-unique-id="06488719-3132-4a2b-951d-8f6dbf0cfb5a" data-file-name="app/page.tsx">
                  <Bookmark className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3" data-unique-id="facbcd0c-8ce0-4621-9b05-460a6138ddf5" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="1acb8ee8-122e-4f44-861c-ca75ea2e0023" data-file-name="app/page.tsx">Unified Collection</span></h3>
                <p className="text-muted-foreground mb-4" data-unique-id="b85b20a7-c354-43e5-9d1f-f4437e59ece9" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="d2e0e04a-5f59-40ca-8edc-5a3d220aa38f" data-file-name="app/page.tsx">
                  Import and sync all your saved content from GitHub, Twitter, Reddit, and Stack Overflow in one place.
                </span></p>
                <div className="pt-4 border-t border-border mt-auto" data-unique-id="826235eb-e54b-4190-b1e0-86a21d8cec06" data-file-name="app/page.tsx">
                  <Link href="#" className="inline-flex items-center text-primary hover:underline" data-unique-id="20e4c505-457a-498c-a226-314a098ff99a" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="54f2c86c-4e28-40bd-8da1-b74f399565a5" data-file-name="app/page.tsx">
                    Learn more </span><ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="skoop-card p-6" data-unique-id="82726bcc-2e08-48cd-86e7-042e260ecc3f" data-file-name="app/page.tsx">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-accent bg-opacity-10 mb-4" data-unique-id="59088252-31dc-45d7-a62a-425ac30f0b5d" data-file-name="app/page.tsx">
                  <Search className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3" data-unique-id="cac6a104-d9ac-44ad-91de-ad474cd19f7b" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="29b21173-3ab8-49ac-8b99-fa1f20682200" data-file-name="app/page.tsx">Semantic Search</span></h3>
                <p className="text-muted-foreground mb-4" data-unique-id="2bc40cfd-e176-4b48-bd9c-d4b22c215de1" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="78e93321-0d90-40e3-b2d9-42111588dbf1" data-file-name="app/page.tsx">
                  Find what you're looking for with powerful semantic search that understands the meaning behind your queries.
                </span></p>
                <div className="pt-4 border-t border-border mt-auto" data-unique-id="58ec72fb-f2a1-41fa-b4f1-9e0c27bd2b89" data-file-name="app/page.tsx">
                  <Link href="#" className="inline-flex items-center text-primary hover:underline" data-unique-id="a2ea6ef6-b671-44b5-bc7f-0549fff57e30" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="57401644-40d4-4b98-a1d0-b3ef95b6f7fb" data-file-name="app/page.tsx">
                    Learn more </span><ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="skoop-card p-6" data-unique-id="7f740baa-ace3-4732-8e10-2517ea482e3c" data-file-name="app/page.tsx">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-destructive bg-opacity-10 mb-4" data-unique-id="3306b039-aaf2-4c72-8ea5-0a56f04051f5" data-file-name="app/page.tsx">
                  <Collection className="h-6 w-6 text-destructive" />
                </div>
                <h3 className="text-xl font-semibold mb-3" data-unique-id="e2878fa1-0452-428d-a5cf-7039debfdc3f" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="26dd65bd-db3b-4e04-8510-d545c401ae89" data-file-name="app/page.tsx">Smart Collections</span></h3>
                <p className="text-muted-foreground mb-4" data-unique-id="cc3c5bfc-78f8-48c3-af4b-87b1ce6a53e2" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="9d8b4488-1b14-453d-b8a8-4131d64db040" data-file-name="app/page.tsx">
                  Organize your content with automated collections that group similar items together and surface the best content.
                </span></p>
                <div className="pt-4 border-t border-border mt-auto" data-unique-id="d58ea480-26f7-4b6c-9a54-77eccae6aa6c" data-file-name="app/page.tsx">
                  <Link href="#" className="inline-flex items-center text-primary hover:underline" data-unique-id="2e9b73a2-c673-4bf4-b86d-1714ba00a265" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="db0610e7-03d6-461b-88da-289f40b6cd86" data-file-name="app/page.tsx">
                    Learn more </span><ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="skoop-section bg-secondary bg-opacity-30" data-unique-id="22ea3a35-b4e6-4c87-aec2-40a653f97c5b" data-file-name="app/page.tsx">
          <div className="skoop-container" data-unique-id="5946a191-e9af-4d7b-93a4-749fcb413734" data-file-name="app/page.tsx">
            <div className="text-center mb-16" data-unique-id="3820df8b-9455-4961-ace3-b87e95b8286a" data-file-name="app/page.tsx">
              <h2 className="text-3xl font-bold mb-4" data-unique-id="e1515b1d-3f7e-4780-9947-bf1cff5ca635" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="f8dc9697-7061-4efd-9c1f-49ad2ce6c186" data-file-name="app/page.tsx">Simple, transparent pricing</span></h2>
              <p className="text-muted-foreground max-w-2xl mx-auto" data-unique-id="b1a0cca9-15a0-428c-8a1a-8fcc29de4083" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="f3622ff3-3fd8-46a0-a2c4-7722716e973f" data-file-name="app/page.tsx">
                Choose the plan that fits your needs. All plans include our core features.
              </span></p>
            </div>

            <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto" data-unique-id="274650b3-2290-4399-aa08-658d166ea293" data-file-name="app/page.tsx" data-dynamic-text="true">
              {/* Free Plan */}
              <div className="skoop-card p-6 flex flex-col h-full border border-border" data-unique-id="c94341a4-ddc4-4467-bb50-140e223827aa" data-file-name="app/page.tsx">
                <div className="mb-6" data-unique-id="ecb435c6-216a-47f1-b350-fb08209d2529" data-file-name="app/page.tsx">
                  <h3 className="text-lg font-medium mb-2" data-unique-id="462c8061-2a46-4176-b96c-e7e69c39e6ce" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="92c9748d-cb6b-4ba2-9e68-7be999b77db5" data-file-name="app/page.tsx">Free</span></h3>
                  <div className="text-3xl font-bold" data-unique-id="4027d829-1135-4604-86f0-725f6742cba5" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="6e736dc0-18a7-4caa-a7fe-c29eeac8ea56" data-file-name="app/page.tsx">$0</span><span className="text-muted-foreground text-sm font-normal" data-unique-id="ae65198f-32ce-416a-9b26-f6dd2e4bdae4" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="570cab51-fc93-48d7-8f4d-6a3a3240794a" data-file-name="app/page.tsx">/month</span></span></div>
                  <p className="text-muted-foreground text-sm mt-3" data-unique-id="4e466925-ae2f-4ba8-a646-5fbc8496519b" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="84f72d6d-f722-41ed-b819-98a42695aa57" data-file-name="app/page.tsx">Perfect for getting started</span></p>
                </div>
                <ul className="space-y-3 mb-8" data-unique-id="d3276e69-2203-417e-98b8-86d3b5e417d5" data-file-name="app/page.tsx">
                  <li className="flex items-start" data-unique-id="1e73dc59-5c25-45fe-a934-f99401532c64" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="985afb83-f80a-454f-b9f7-7b55e5896f38" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="85125946-3a9a-409f-8faa-6573353da15a" data-file-name="app/page.tsx">500 saved items</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="820d7337-2b2b-48e9-858e-bbc1900f5a90" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="e183f37e-6933-4a38-9a9f-feb5a5b0f0eb" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="1d8804b6-59b7-443a-b048-efe6460cb630" data-file-name="app/page.tsx">2 connected platforms</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="293edb0b-5375-4e00-89ef-fc43e2125373" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="3fa6222d-0963-4930-81a0-c94f45674efc" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="16fb7bf7-1c36-4b6e-bd39-8628acf61995" data-file-name="app/page.tsx">Basic search</span></span>
                  </li>
                </ul>
                <div className="mt-auto" data-unique-id="0f8d9619-dc18-44ff-aafb-5862ab7b3303" data-file-name="app/page.tsx">
                  <Button className="w-full skoop-button-primary" data-unique-id="eacb4f5e-e70f-47c9-92f1-4ab5595de6ce" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="e15e7f68-acfc-4ae6-8f56-372623881c72" data-file-name="app/page.tsx">Get Started</span></Button>
                </div>
              </div>

              {/* Pro Plan */}
              <div className="skoop-card p-6 flex flex-col h-full border-2 border-primary relative" data-unique-id="c9324eeb-d36e-4db9-bd2a-1417a81c03d5" data-file-name="app/page.tsx">
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-sm font-medium rounded-bl-lg rounded-tr-[calc(var(--radius)-1px)]" data-unique-id="08286b0a-11b0-4ad6-b9dc-9a24167a7042" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="eab20dfb-80a1-4ff6-80c5-37c583fa033d" data-file-name="app/page.tsx">
                  Popular
                </span></div>
                <div className="mb-6" data-unique-id="4b98635d-9771-4f22-b76f-b03a35670ba9" data-file-name="app/page.tsx">
                  <h3 className="text-lg font-medium mb-2" data-unique-id="f3e228d7-d821-469f-84ab-797e10d5390d" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="929e5d55-10b2-4cba-b7ba-fdf85b1c7eaa" data-file-name="app/page.tsx">Pro</span></h3>
                  <div className="text-3xl font-bold" data-unique-id="f1b19110-480e-4187-92ca-e2bdc4981552" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="5d22a355-0027-4817-915a-833b8aae1635" data-file-name="app/page.tsx">$9</span><span className="text-muted-foreground text-sm font-normal" data-unique-id="0081eda7-f2b4-4014-926e-a7ccab7ab3e3" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="5a721609-f1eb-41b1-a40e-b52cd924c919" data-file-name="app/page.tsx">/month</span></span></div>
                  <p className="text-muted-foreground text-sm mt-3" data-unique-id="e3c2343f-004c-44b5-b26c-bac4c4fe152c" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="31550cf6-d58b-46fa-bde4-898a33da9ebf" data-file-name="app/page.tsx">For power users</span></p>
                </div>
                <ul className="space-y-3 mb-8" data-unique-id="23ee5d62-a53d-4754-9a06-4d4104658d17" data-file-name="app/page.tsx">
                  <li className="flex items-start" data-unique-id="0e84a1d4-0fb4-4b89-8c4f-6c6180615216" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="5d7fb070-bfa4-48b6-9a6c-3d15fb85637c" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="b8607431-ea39-4001-8ccf-11fc5b37b56d" data-file-name="app/page.tsx">Unlimited saved items</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="62e38b1e-8058-4254-a6b2-c53d02a49153" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="e9292e4f-273f-4ccb-a2eb-9f62642988c9" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="82282d8b-7344-414b-b56b-c2cf46427048" data-file-name="app/page.tsx">All platforms</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="893a4454-1640-4989-8e75-55316e98b11a" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="040476c5-2099-42dd-9e0d-370adc729d0d" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="a1c3b006-c055-49e4-838c-8c37f6a905da" data-file-name="app/page.tsx">Advanced semantic search</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="f2e83149-fb5f-4680-b3d1-53f046450f7b" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="6667a71e-8864-4fdf-9a94-acca3f82555b" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="391f04fd-ef96-49a0-926e-ed55464a568d" data-file-name="app/page.tsx">Smart collections</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="cb02f60b-4af9-40b2-b3ab-268b0271062b" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="4402b214-95f5-4902-b397-22f89e339e68" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="66ef7008-ee07-4bc6-8a55-9bfe090138ec" data-file-name="app/page.tsx">15-minute sync</span></span>
                  </li>
                </ul>
                <div className="mt-auto" data-unique-id="b4b37534-c1b8-4fdd-bee7-6754efa2748b" data-file-name="app/page.tsx">
                  <Button className="w-full skoop-button-accent" data-unique-id="915638b0-13c5-4727-94a2-b4369e70b6be" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="f24ee225-ea56-439b-bc52-e7567ba4052b" data-file-name="app/page.tsx">Choose Pro</span></Button>
                </div>
              </div>

              {/* Team Plan */}
              <div className="skoop-card p-6 flex flex-col h-full border border-border" data-unique-id="b4346d16-d97d-4bf2-8100-116dc82db2ad" data-file-name="app/page.tsx">
                <div className="mb-6" data-unique-id="ada2e514-f995-43fd-9163-b7cd902ce85c" data-file-name="app/page.tsx">
                  <h3 className="text-lg font-medium mb-2" data-unique-id="d665e642-0314-4335-a8c0-17ebd8adad09" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="c2522d68-7f67-486f-8b38-515ea7640f6a" data-file-name="app/page.tsx">Team</span></h3>
                  <div className="text-3xl font-bold" data-unique-id="40646458-054f-496a-a8e8-159b118f7500" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="787b9d8b-c14b-4bde-b01b-d1eb7ef464d7" data-file-name="app/page.tsx">$19</span><span className="text-muted-foreground text-sm font-normal" data-unique-id="283ffff5-5e52-49b6-b8f2-c06b9de339cd" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="da76feb4-c00f-416c-96f8-1cc6cd53628e" data-file-name="app/page.tsx">/month</span></span></div>
                  <p className="text-muted-foreground text-sm mt-3" data-unique-id="485c0cec-24d8-4967-92bc-12e4a2fd1092" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="271c33b5-efc7-43e6-840c-d015ded10bd2" data-file-name="app/page.tsx">Collaborate with your team</span></p>
                </div>
                <ul className="space-y-3 mb-8" data-unique-id="026798f1-f84f-4d7b-a642-ae52c9e653f7" data-file-name="app/page.tsx">
                  <li className="flex items-start" data-unique-id="c94c821b-df0a-412c-9fe9-8fac942fa238" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="5aee93c1-e8d0-406d-8d0f-7e3929742f47" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="373c1592-5338-403b-8be7-9aaa29bfa410" data-file-name="app/page.tsx">Everything in Pro</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="02af7c93-a2c2-496b-98b1-4f0d1814ee67" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="948755d3-a55e-4fa5-9ac9-f9a7896e1de9" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="e8dbc91c-db2b-4702-92ea-5023ac91e493" data-file-name="app/page.tsx">5 team members</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="610f9cb4-f60e-4b4b-aba8-27c5f48c55f2" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="9cd72b5f-288b-42ea-8c65-8376f092e1c9" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="ab92edcc-dd9c-44f8-abcc-78dd755ce207" data-file-name="app/page.tsx">Shared collections</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="7fd9ec73-54e0-4135-b7ff-2f357b8a9caa" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="96627f1c-b565-4963-b15c-5a9656a1dd5b" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="610a081b-1616-463b-83ab-f6f799f51a72" data-file-name="app/page.tsx">Collaboration tools</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="3c27269f-9881-4cb5-ae49-9a4be627d424" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="71185a77-5e99-4313-822f-f6db1e932185" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="c24e882a-d9fe-408a-bfb0-ea8ba166ecc0" data-file-name="app/page.tsx">Advanced analytics</span></span>
                  </li>
                </ul>
                <div className="mt-auto" data-unique-id="2b596aef-f75c-44a9-939b-715fca076bb1" data-file-name="app/page.tsx">
                  <Button className="w-full skoop-button-primary" data-unique-id="b527aba9-e324-4051-bea4-d28925ab69d6" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="3d4d419a-bf0d-4083-a60f-30b93920baa8" data-file-name="app/page.tsx">Choose Team</span></Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="skoop-section" data-unique-id="17c92ace-f56f-4cef-a8ae-b0ac176c7cc9" data-file-name="app/page.tsx">
          <div className="skoop-container max-w-4xl" data-unique-id="fb36fda3-fa18-4e47-a167-07d70bb8929b" data-file-name="app/page.tsx">
            <div className="skoop-card p-8 md:p-12 text-center" data-unique-id="a8cf5f70-53e1-4dbf-a1c5-eaed9e592f81" data-file-name="app/page.tsx">
              <h2 className="text-2xl md:text-3xl font-bold mb-4" data-unique-id="97392a8f-e71c-404a-844e-351149b39637" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="76248c38-559e-4a4f-a1c2-6afb91213ae0" data-file-name="app/page.tsx">Ready to organize your digital knowledge?</span></h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto" data-unique-id="d70691d7-a93b-43cf-a093-20fe8dd59d9b" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="ad307fd6-5e94-47e4-8863-7eb03810420d" data-file-name="app/page.tsx">
                Join thousands of developers, designers, and researchers who are using SKOOP to make the most of their saved content.
              </span></p>
              <div className="flex flex-col sm:flex-row justify-center gap-4" data-unique-id="f9432429-45af-478f-ba4b-70755e928bf6" data-file-name="app/page.tsx">
                <Button className="skoop-button-accent" size="lg" data-unique-id="8a034191-a314-49ab-a6ce-29276e84222d" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="05729df3-2a6c-45e4-b68f-71b789207523" data-file-name="app/page.tsx">Get Started for Free</span></Button>
                <Button variant="outline" size="lg" data-unique-id="f29101fc-00ec-4f51-9ab5-40ddc0646860" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="eb99d11f-c833-48ea-8769-ceb0abb8b4a7" data-file-name="app/page.tsx">
                  Request Demo
                </span></Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-secondary bg-opacity-30 border-t border-border py-12" data-unique-id="03068f56-4461-4f3a-ae4f-ed87515f2a2e" data-file-name="app/page.tsx">
        <div className="skoop-container" data-unique-id="939bb5ec-bab9-49e5-a2cc-49e94bde5fdb" data-file-name="app/page.tsx">
          <div className="grid gap-8 md:grid-cols-4" data-unique-id="630d7c57-f165-4a8e-b710-1b24813fa834" data-file-name="app/page.tsx">
            <div data-unique-id="98cb833a-e8cc-4a3b-8ec8-9082ec8175a7" data-file-name="app/page.tsx">
              <div className="text-2xl font-bold text-primary mb-4" data-unique-id="a9189e6f-7d76-4696-9809-ee93f05cb3cd" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="653c001e-4041-4898-9f71-7cd7eef0b091" data-file-name="app/page.tsx">SKOOP</span></div>
              <p className="text-muted-foreground text-sm" data-unique-id="90d174ee-cc02-486f-b7e2-2cd6f2cbeb73" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="20c7ed2c-76c2-47ae-b45e-1db46c1a7760" data-file-name="app/page.tsx">
                The all-in-one platform for collecting, searching and rediscovering your saved content.
              </span></p>
            </div>

            <div data-unique-id="818927e3-972a-4935-bc79-31350e669d2a" data-file-name="app/page.tsx">
              <h4 className="font-medium mb-4" data-unique-id="a26e3f2d-689f-46d3-93ef-43e82a022411" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="e0ffb147-b1f3-4f5c-9c3d-5ed17c3ad573" data-file-name="app/page.tsx">Product</span></h4>
              <ul className="space-y-2 text-sm text-muted-foreground" data-unique-id="1c5e3e2d-7c37-4290-805f-da8af2aaccb7" data-file-name="app/page.tsx">
                <li data-unique-id="1526db9e-0d30-4b58-b85c-0f2f5fec8515" data-file-name="app/page.tsx"><Link href="#features" className="hover:text-primary transition-colors" data-unique-id="062663b6-ac30-4d8d-b966-bd8dbf47dd84" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="0688510c-6ffa-4a2d-90ce-11fe3e5c62a0" data-file-name="app/page.tsx">Features</span></Link></li>
                <li data-unique-id="b02ebd96-c34c-4c77-8a41-d46287603bc1" data-file-name="app/page.tsx"><Link href="#pricing" className="hover:text-primary transition-colors" data-unique-id="b1fec987-12ad-400a-a789-135d876a66ec" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="824e985f-c848-4df7-a755-aa3f61c5d887" data-file-name="app/page.tsx">Pricing</span></Link></li>
                <li data-unique-id="df5c5660-3c93-41e4-976e-09101cc5e0b6" data-file-name="app/page.tsx"><Link href="/dashboard" className="hover:text-primary transition-colors" data-unique-id="3ce02504-2a28-4167-a387-4b76ce3719cf" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="c3060a38-65b5-4f03-ae11-ae25840fe888" data-file-name="app/page.tsx">Dashboard</span></Link></li>
                <li data-unique-id="73baa1de-8062-4685-b317-23b974905482" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="19da146a-bf0f-448e-b357-1d122918d8dd" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="3c76bc66-7864-45c2-b4f1-d2cf13b35132" data-file-name="app/page.tsx">Integrations</span></Link></li>
                <li data-unique-id="39c9886d-aacb-4cbb-8d5b-274f434f26e6" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="d0074d00-0e7f-4e9d-a432-b1f3ea8e6896" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="f2ab2772-5a75-4cfa-b6dc-40628bee2b63" data-file-name="app/page.tsx">Changelog</span></Link></li>
              </ul>
            </div>

            <div data-unique-id="316475d2-99be-40aa-a5e9-212075e27a62" data-file-name="app/page.tsx">
              <h4 className="font-medium mb-4" data-unique-id="7f74300c-91e4-4060-a23e-2ddb2450f43e" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="6e7d25ec-3096-44f6-b6c2-ea7664b33d48" data-file-name="app/page.tsx">Resources</span></h4>
              <ul className="space-y-2 text-sm text-muted-foreground" data-unique-id="75f9d18e-e94c-4031-a486-185a17071c67" data-file-name="app/page.tsx">
                <li data-unique-id="ea61793a-7bb3-4106-8db7-4bfc63d4f2f6" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="70b1f586-44a3-49c4-ab6a-0b2ae9ff4bae" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="9dbf455d-f3b8-4f1e-be38-b402aa79e862" data-file-name="app/page.tsx">Documentation</span></Link></li>
                <li data-unique-id="dfc3b1fb-4cad-4670-bf55-5e16f05729e7" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="8645ee58-b515-4d53-bea0-8b0b098cb03a" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="22a30f81-8285-4883-9d3b-19297d91f293" data-file-name="app/page.tsx">API</span></Link></li>
                <li data-unique-id="35c8ee9f-3f90-4f9a-b5ca-a2551b046c0b" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="b8fd993e-f167-4fb9-8644-65b805c2d47e" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="73df671c-0b76-493a-b187-eb3254e17fe8" data-file-name="app/page.tsx">Guides</span></Link></li>
                <li data-unique-id="87cad502-baa0-4dbf-9933-e31aadd23c2f" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="a141d0c6-02a6-4998-80e2-4619ded6e0ac" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="04e1ae03-d975-4748-9cad-25098e3944c6" data-file-name="app/page.tsx">Help Center</span></Link></li>
              </ul>
            </div>

            <div data-unique-id="ecf016a2-590f-49cf-82c0-c8c371b9fc66" data-file-name="app/page.tsx">
              <h4 className="font-medium mb-4" data-unique-id="4693ae5a-eaa7-47cc-84e5-92b5b9e2f02d" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="a3e2cf6d-86a7-47e4-ac1d-6b2716fc7c2f" data-file-name="app/page.tsx">Company</span></h4>
              <ul className="space-y-2 text-sm text-muted-foreground" data-unique-id="0cdf4918-ab36-41d2-8214-7d91178e523b" data-file-name="app/page.tsx">
                <li data-unique-id="f237ea68-6e8d-4621-adfd-d2e826369c1f" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="b345a0c6-8c56-4a29-a42b-1f3bfcd55f9a" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="98ab7928-baaf-4625-848b-234d4b04c3b6" data-file-name="app/page.tsx">About</span></Link></li>
                <li data-unique-id="11c9ea0e-54e4-4402-ae32-6155ff77ef40" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="7361e275-bb5c-4a16-b143-c7dad4fb149f" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="a754c7ab-f311-411a-9210-fd824b9bf5fe" data-file-name="app/page.tsx">Blog</span></Link></li>
                <li data-unique-id="039b0ad7-370b-45a9-bb51-865fea41ac67" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="a9c9ebf0-1fe7-4ae8-a885-d0e6460be451" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="c084d65e-186c-4ce8-90de-248b19c1d5ad" data-file-name="app/page.tsx">Careers</span></Link></li>
                <li data-unique-id="50a2e3e2-02cc-466b-8c50-78da65ef16bf" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="802756ea-b84d-4fae-986b-4294cc8d8ca9" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="9fa04d73-9ac1-41cb-8cef-d357d94ea2a4" data-file-name="app/page.tsx">Contact</span></Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center" data-unique-id="3a61b992-8b1a-48bd-b4d9-60c851451a9b" data-file-name="app/page.tsx">
            <div className="text-sm text-muted-foreground" data-unique-id="0ef5d48d-5cb1-4bf9-9905-4c9483ba8be8" data-file-name="app/page.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="9bd1db89-919e-41cf-9782-e5bf9fcd66f4" data-file-name="app/page.tsx">
              © </span>{new Date().getFullYear()}<span className="editable-text" data-unique-id="2bdd118b-a00e-43ce-b0df-1bdf4116e50f" data-file-name="app/page.tsx"> SKOOP. All rights reserved.
            </span></div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0" data-unique-id="dd8ecd71-8251-45c2-a7f9-0d2be78a7b38" data-file-name="app/page.tsx">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors" data-unique-id="169e15fb-df80-4b6a-8004-89877acfeeed" data-file-name="app/page.tsx">
                <span className="sr-only" data-unique-id="973cec62-a8a4-4a53-8f26-c1dbe1c2cbc4" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="9d5d7508-ef82-4e98-b76a-19838b3d157b" data-file-name="app/page.tsx">Twitter</span></span>
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors" data-unique-id="ab5ec016-49ce-4533-a54b-74766fcc3963" data-file-name="app/page.tsx">
                <span className="sr-only" data-unique-id="af74a597-6dee-4e45-87bf-860a494f91e5" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="19736a7e-bdc3-4d38-9906-b7e623c24daf" data-file-name="app/page.tsx">GitHub</span></span>
                <Github className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>;
}