import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import Image from "next/image";
import { Search, Github, Twitter, Code as StackOverflow, Bookmark, FolderPlus as Collection, CheckCircle2, ChevronRight, ArrowRight } from "lucide-react";
export default function HomePage() {
  return <div className="min-h-screen flex flex-col" data-unique-id="702bfd69-6d72-47a1-a70f-eaae58d73a10" data-file-name="app/page.tsx" data-dynamic-text="true">
      {/* Header */}
      <header className="border-b border-border" data-unique-id="63be3f73-5af9-448c-98ca-dda7a1cf09b1" data-file-name="app/page.tsx">
        <div className="skoop-container flex items-center justify-between h-16" data-unique-id="86edf363-e40c-4c9c-a750-28d278fb5297" data-file-name="app/page.tsx">
          <div className="flex items-center" data-unique-id="e543e585-ff96-426e-a081-2287c1752696" data-file-name="app/page.tsx">
            <div className="text-2xl font-bold text-primary" data-unique-id="76962d7c-16f0-40d9-8949-be142d2fd0d4" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="bbb13d92-48d8-4b7a-944d-968844ebffbc" data-file-name="app/page.tsx">SKOOP</span></div>
            <nav className="hidden ml-12 space-x-6 lg:flex" data-unique-id="f94edbc5-6f90-4e39-b0ac-727518f54dc8" data-file-name="app/page.tsx">
              <Link href="#features" className="text-foreground hover:text-primary transition-colors" data-unique-id="d23052b7-a815-44ea-ae53-7fc650bca482" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="45cdf114-db29-4ed2-9737-980097b56c1e" data-file-name="app/page.tsx">Features</span></Link>
              <Link href="#pricing" className="text-foreground hover:text-primary transition-colors" data-unique-id="bdfb7837-1ded-46ea-8be8-c595da6ebbfb" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="bf921cb5-5a00-45bd-96d4-105597011dfb" data-file-name="app/page.tsx">Pricing</span></Link>
              <Link href="#faq" className="text-foreground hover:text-primary transition-colors" data-unique-id="f8e17d53-4f50-44aa-bebe-e826c39dffe7" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="19d79397-2649-42e3-a157-c2994952ee98" data-file-name="app/page.tsx">FAQ</span></Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4" data-unique-id="31ff2cab-8c07-4bb4-95d3-303e578309fc" data-file-name="app/page.tsx">
            <ThemeToggle />
            <a href="/dashboard" className="text-foreground hover:text-primary transition-colors" data-unique-id="8303d5f3-b318-4c4a-a7be-e65971d11da4" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="786bb585-d754-487f-b2f4-959114fd14ad" data-file-name="app/page.tsx">Dashboard</span></a>
            <a href="/login" className="text-foreground hover:text-primary transition-colors" data-unique-id="683bf08f-7f6a-4974-8faf-b5e8c6840313" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="2cf27d30-8a01-42f2-b19c-158349866072" data-file-name="app/page.tsx">Log in</span></a>
            <Button className="skoop-button-accent" data-unique-id="ee2f5ef3-45b8-41e1-8f53-2d1b73e4a362" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="2f6b7f23-8197-4d4f-96ef-7806c2c254c7" data-file-name="app/page.tsx">Sign Up Free</span></Button>
          </div>
        </div>
      </header>

      <main className="flex-grow" data-unique-id="2d5fd665-5048-45e5-8c30-483ea49cf398" data-file-name="app/page.tsx" data-dynamic-text="true">
        {/* Hero Section */}
        <section className="skoop-section bg-gradient-to-b from-background to-secondary/20" data-unique-id="27c5696a-d036-4eb2-94c9-c16979390644" data-file-name="app/page.tsx">
          <div className="skoop-container" data-unique-id="bc77ff57-f00a-4dc1-a6a8-77ec1850caae" data-file-name="app/page.tsx" data-dynamic-text="true">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-24 items-center" data-unique-id="9263799e-c771-4fdb-8e6f-d660cd32b387" data-file-name="app/page.tsx">
              <div data-unique-id="fe53707d-b276-445c-be04-7db2bbc41ac3" data-file-name="app/page.tsx">
                <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl mb-6" data-unique-id="20616eaf-d32b-4251-9553-55521e2a8b80" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="57655a7b-5dd8-4e4a-a3e9-3448f8264045" data-file-name="app/page.tsx">
                  Collect, search and </span><span className="text-primary" data-unique-id="574a3a93-18bd-4050-9e65-105b1ce7d0b4" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="031d91b2-a894-493a-8cfa-a8a811235c39" data-file-name="app/page.tsx">rediscover</span></span><span className="editable-text" data-unique-id="42033e34-1778-438e-979e-d9c700095995" data-file-name="app/page.tsx"> your saved content
                </span></h1>
                <p className="text-lg text-muted-foreground mb-8" data-unique-id="475de290-2c3b-4735-8b48-8ff0e093408c" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="5794d10e-c97e-4fac-b16a-6b4a97e22ba8" data-file-name="app/page.tsx">
                  One calm space for all your saved tweets, GitHub stars, Reddit posts, and Stack Overflow favorites.
                </span></p>
                <div className="flex flex-col sm:flex-row gap-4" data-unique-id="16664de3-fb58-4068-a4bf-b8f9a03b92e1" data-file-name="app/page.tsx">
                  <Button className="skoop-button-accent" size="lg" data-unique-id="832be485-0403-44e6-8469-c7d1c34011a3" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="3596fe97-14ce-4620-b3a5-9fcb2bcd3da4" data-file-name="app/page.tsx">Get Started</span></Button>
                  <Button variant="outline" size="lg" className="group" data-unique-id="59cc54ec-4e83-4ae4-b9a3-ad7ed121c96b" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="1437979a-1e6b-47a8-8674-806afd461114" data-file-name="app/page.tsx">
                    How It Works
                    </span><ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
                <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground" data-unique-id="c5283a8d-b74a-4a75-b78a-6d57775a47f9" data-file-name="app/page.tsx">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span data-unique-id="069179f6-7852-43a4-b256-492c86b205a2" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="789bc8fc-1dc2-4013-b373-50fc98ba38cb" data-file-name="app/page.tsx">No credit card required</span></span>
                </div>
              </div>
              <div className="relative" data-unique-id="2c6c8d30-85db-43e1-b66c-37fbd44bab8f" data-file-name="app/page.tsx" data-dynamic-text="true">
                <div className="skoop-card overflow-hidden" data-unique-id="800e36a5-7921-45f9-a401-432b344a763f" data-file-name="app/page.tsx">
                  <Image src="https://images.unsplash.com/photo-1508921340878-ba53e1f016ec?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3" alt="SKOOP Dashboard" width={600} height={400} className="w-full h-auto rounded-t-[var(--radius)]" data-unique-id="199e3145-02ca-4ab6-afbf-fc161b750fa5" data-file-name="app/page.tsx" />
                  <div className="p-6" data-unique-id="11011643-1cac-4b53-a2b8-280af7d62ee4" data-file-name="app/page.tsx">
                    <div className="flex items-center justify-between mb-4" data-unique-id="07accff5-51e6-4694-ae25-def7f6ef3da2" data-file-name="app/page.tsx">
                      <div className="font-semibold" data-unique-id="6fe25f02-d0a7-4855-af88-d7d667df4c2c" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="9cd763ba-dc9f-473b-ae86-15851d959443" data-file-name="app/page.tsx">Recent Saves</span></div>
                      <Search className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="space-y-3" data-unique-id="115f2532-d713-431d-9bea-50821a6cd3e3" data-file-name="app/page.tsx" data-dynamic-text="true">
                      {[1, 2, 3].map(i => <div key={i} className="flex items-center gap-3 p-3 rounded-md bg-secondary/50" data-unique-id="5789ce8d-63bd-491a-8cfe-02021b24a4ba" data-file-name="app/page.tsx" data-dynamic-text="true">
                          {i === 1 && <Github className="h-5 w-5 text-foreground" />}
                          {i === 2 && <Twitter className="h-5 w-5 text-foreground" />}
                          {i === 3 && <StackOverflow className="h-5 w-5 text-foreground" />}
                          <div className="flex-grow" data-unique-id="1aa68232-bcae-4ec3-9936-2b218f9205fa" data-file-name="app/page.tsx">
                            <div className="text-sm font-medium truncate" data-unique-id="45662af5-6042-420e-8475-a16cf40d963b" data-file-name="app/page.tsx" data-dynamic-text="true">
                              {i === 1 && "Interesting open source project for data visualization"}
                              {i === 2 && "Thread: 10 tips for better React performance"}
                              {i === 3 && "How to optimize PostgreSQL queries for large datasets"}
                            </div>
                            <div className="text-xs text-muted-foreground mt-0.5" data-unique-id="7de1cd3b-56ee-4169-9d4b-309d0fa36783" data-file-name="app/page.tsx" data-dynamic-text="true">
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
                <div className="absolute -left-8 top-1/2 bg-card p-3 rounded-full shadow-lg border border-border hidden lg:block" data-unique-id="5badc108-e2ab-4617-8476-044b313fa848" data-file-name="app/page.tsx">
                  <Github className="h-6 w-6 text-primary" />
                </div>
                <div className="absolute -right-8 bottom-1/3 bg-card p-3 rounded-full shadow-lg border border-border hidden lg:block" data-unique-id="1a7b9d2b-d8dd-4288-9d19-47a643aaf349" data-file-name="app/page.tsx">
                  <Twitter className="h-6 w-6 text-accent" />
                </div>
              </div>
            </div>

            {/* Logos */}
            <div className="mt-20" data-unique-id="357a7e9a-efbe-4ede-8cff-801fd2a2eac7" data-file-name="app/page.tsx">
              <p className="text-center text-sm text-muted-foreground mb-6" data-unique-id="c4f6dc33-50df-400c-b1ac-ec8253cb50a0" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="b5621610-4631-40b2-bd4a-dcee5222e696" data-file-name="app/page.tsx">
                Connect with your favorite platforms
              </span></p>
              <div className="flex justify-center items-center flex-wrap gap-8 md:gap-12" data-unique-id="92e43dbd-74e8-404c-ae84-0ef6e608df38" data-file-name="app/page.tsx">
                <Github className="h-8 w-8 text-muted-foreground" />
                <Twitter className="h-8 w-8 text-muted-foreground" />
                <StackOverflow className="h-8 w-8 text-muted-foreground" />
                <div className="text-muted-foreground text-xl font-semibold" data-unique-id="e249260d-d2b2-4f95-b8a1-0e24f10ae14d" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="e66de92a-9bbc-43f5-9a1e-eb7542546072" data-file-name="app/page.tsx">Reddit</span></div>
                <div className="text-muted-foreground text-xl font-semibold" data-unique-id="7aa38e4e-b8b8-4f11-97b6-8c47e040eeff" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="c12def55-5293-4f99-902a-21dd96a7cf98" data-file-name="app/page.tsx">DEV</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="skoop-section" data-unique-id="ebc32ca8-7dfe-40cf-8aa6-757482268f5b" data-file-name="app/page.tsx">
          <div className="skoop-container" data-unique-id="ba585d79-911f-477c-95ee-e731e4d4a788" data-file-name="app/page.tsx">
            <div className="text-center mb-16" data-unique-id="0d8b8815-faa2-4015-891e-c98df59a4adf" data-file-name="app/page.tsx">
              <h2 className="text-3xl font-bold mb-4" data-unique-id="35760264-6305-41c6-94db-7f09763965ea" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="e60b6155-c07b-4bdb-831c-8db3c5f20d1f" data-file-name="app/page.tsx">Finally, a place for all your saved content</span></h2>
              <p className="text-muted-foreground max-w-2xl mx-auto" data-unique-id="e71c7eb9-adb2-42f0-985a-c2a47be43607" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="ef49422d-0b55-4c04-8abf-fae1e30ac9fb" data-file-name="app/page.tsx">
                SKOOP solves the problem of fragmented saves and makes it easy to find what you need when you need it.
              </span></p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3" data-unique-id="bb45b2f8-01b8-4cbc-a72c-67b94f740cbf" data-file-name="app/page.tsx" data-dynamic-text="true">
              {/* Feature 1 */}
              <div className="skoop-card p-6" data-unique-id="6b3c1f0b-c1a0-49d7-8ac5-4afe99903f04" data-file-name="app/page.tsx">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary bg-opacity-10 mb-4" data-unique-id="224804b1-b900-4871-a8e7-6c51a858424c" data-file-name="app/page.tsx">
                  <Bookmark className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3" data-unique-id="ebd77c4b-bc6f-409f-85c8-4cf86e83b87c" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="536aaff9-bc05-45ac-9570-f1d936fa695b" data-file-name="app/page.tsx">Unified Collection</span></h3>
                <p className="text-muted-foreground mb-4" data-unique-id="5a9dc12f-ab94-4173-8786-85349ee54fe5" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="e2f8ea6c-b0b3-471d-b0a6-2de43b3ffcb0" data-file-name="app/page.tsx">
                  Import and sync all your saved content from GitHub, Twitter, Reddit, and Stack Overflow in one place.
                </span></p>
                <div className="pt-4 border-t border-border mt-auto" data-unique-id="c696633b-1733-45c1-a67d-b7be90356bd2" data-file-name="app/page.tsx">
                  <Link href="#" className="inline-flex items-center text-primary hover:underline" data-unique-id="91f0d070-c7da-45f8-8ac1-18656d4b4e56" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="c2d7d127-8a0b-4453-b108-a92088e43ede" data-file-name="app/page.tsx">
                    Learn more </span><ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="skoop-card p-6" data-unique-id="42b4d845-038a-44c1-9d69-165a5f4b2baf" data-file-name="app/page.tsx">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-accent bg-opacity-10 mb-4" data-unique-id="e73d11e9-da51-4033-b3b5-bf3795ad5fdb" data-file-name="app/page.tsx">
                  <Search className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3" data-unique-id="7023d35d-c8d2-44fd-b402-bc47da8eb59d" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="13b3d2d3-d770-494b-82dd-6737f09a44b3" data-file-name="app/page.tsx">Semantic Search</span></h3>
                <p className="text-muted-foreground mb-4" data-unique-id="f3b9bad3-a505-4b3e-9f0b-22b36ebd4f37" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="77ceecfb-cce3-4bed-b8d5-5aa7d4b0ab74" data-file-name="app/page.tsx">
                  Find what you're looking for with powerful semantic search that understands the meaning behind your queries.
                </span></p>
                <div className="pt-4 border-t border-border mt-auto" data-unique-id="7aa67b75-354b-4031-a503-517b5378ee2d" data-file-name="app/page.tsx">
                  <Link href="#" className="inline-flex items-center text-primary hover:underline" data-unique-id="53ab1a71-c13d-4d9e-9e2e-df7f1d5c2820" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="db6d2e46-061d-4fd2-b21e-efae23a47757" data-file-name="app/page.tsx">
                    Learn more </span><ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="skoop-card p-6" data-unique-id="92d94f93-5f32-4625-a065-98b81250f516" data-file-name="app/page.tsx">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-destructive bg-opacity-10 mb-4" data-unique-id="ae50ddef-628b-4bed-b909-fc479c419e6e" data-file-name="app/page.tsx">
                  <Collection className="h-6 w-6 text-destructive" />
                </div>
                <h3 className="text-xl font-semibold mb-3" data-unique-id="7f0072c3-ab8f-484b-9275-123072798b02" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="ff3563cf-c832-4487-9576-174857436d52" data-file-name="app/page.tsx">Smart Collections</span></h3>
                <p className="text-muted-foreground mb-4" data-unique-id="b3c68403-fdad-4b1f-8c9e-d33e54f8cedd" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="5530c650-e000-4418-83c8-5afbe7c30e44" data-file-name="app/page.tsx">
                  Organize your content with automated collections that group similar items together and surface the best content.
                </span></p>
                <div className="pt-4 border-t border-border mt-auto" data-unique-id="038dcf58-6a73-4f54-90ac-abdeeb399c04" data-file-name="app/page.tsx">
                  <Link href="#" className="inline-flex items-center text-primary hover:underline" data-unique-id="86fa248a-c2c7-4c91-8d6e-dbe8f99391ff" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="5793af8f-569d-43a0-9a34-bfdfbbdd0cde" data-file-name="app/page.tsx">
                    Learn more </span><ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="skoop-section bg-secondary bg-opacity-30" data-unique-id="f788230e-05ce-4a2c-a1ef-287b0fc7299f" data-file-name="app/page.tsx">
          <div className="skoop-container" data-unique-id="11d6e0a6-3798-42b9-a296-80816e7258b5" data-file-name="app/page.tsx">
            <div className="text-center mb-16" data-unique-id="7bf3cbf2-5366-4a9c-a3da-65e774bd3b55" data-file-name="app/page.tsx">
              <h2 className="text-3xl font-bold mb-4" data-unique-id="460bfe63-2a56-4ec2-b2d7-d878a7a09023" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="9a46be4e-bd75-43da-bcfc-8c53096607fd" data-file-name="app/page.tsx">Simple, transparent pricing</span></h2>
              <p className="text-muted-foreground max-w-2xl mx-auto" data-unique-id="1dbb43de-65b7-4cb7-a439-2a3b75ce4db2" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="3425e616-2cd3-44a6-a2a7-cf334c8c2eb2" data-file-name="app/page.tsx">
                Choose the plan that fits your needs. All plans include our core features.
              </span></p>
            </div>

            <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto" data-unique-id="7aae3cd1-c74e-4a5c-953a-7ec29f6f857c" data-file-name="app/page.tsx" data-dynamic-text="true">
              {/* Free Plan */}
              <div className="skoop-card p-6 flex flex-col h-full border border-border" data-unique-id="0f0da2bb-744b-4bcb-a88e-391e5573fe30" data-file-name="app/page.tsx">
                <div className="mb-6" data-unique-id="8ec023f5-ea62-4775-8f67-721d21621bf0" data-file-name="app/page.tsx">
                  <h3 className="text-lg font-medium mb-2" data-unique-id="a4c57480-1e32-49b7-ba74-0879a82da4db" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="12ca9fcf-d34f-4a4d-981e-11ca56dcb8bd" data-file-name="app/page.tsx">Free</span></h3>
                  <div className="text-3xl font-bold" data-unique-id="7b8afa9e-8758-4a37-8ab5-29980654b6cf" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="55351239-69a5-40ed-8854-0a5d242c5078" data-file-name="app/page.tsx">$0</span><span className="text-muted-foreground text-sm font-normal" data-unique-id="6050a269-c4a1-4620-866c-cda9d1026935" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="e82b98aa-57be-4ff5-8270-281f20ca82c8" data-file-name="app/page.tsx">/month</span></span></div>
                  <p className="text-muted-foreground text-sm mt-3" data-unique-id="bf3dde26-305e-48f2-bd6c-962d44f37ca3" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="849ca351-fc38-4e38-ac5b-3725443d34b6" data-file-name="app/page.tsx">Perfect for getting started</span></p>
                </div>
                <ul className="space-y-3 mb-8" data-unique-id="e4a4b450-61a6-4f57-9a50-cbe8f4409500" data-file-name="app/page.tsx">
                  <li className="flex items-start" data-unique-id="613b8d45-e11f-45c2-a2b6-eb88f99ac414" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="05bf9734-c445-4e58-84ba-79d3437a5afb" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="e9eb97a4-f724-435c-8efb-db8a69cad2fd" data-file-name="app/page.tsx">500 saved items</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="f71c3a43-14fd-4571-b34f-714c0b285716" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="e0cf12ab-0383-4436-9b6d-fa3fe81a3286" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="f850768b-a6de-452b-a045-6e8c83d09397" data-file-name="app/page.tsx">2 connected platforms</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="5bd6b325-dafe-441f-8878-335cc8e6fe09" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="0a660e96-e191-4e4a-b82e-a5176b145a5d" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="bc8cf38f-8e32-4be4-ac02-b2f52d153456" data-file-name="app/page.tsx">Basic search</span></span>
                  </li>
                </ul>
                <div className="mt-auto" data-unique-id="79e5f411-25a0-4a90-ae94-bfef9e7dbc45" data-file-name="app/page.tsx">
                  <Button className="w-full skoop-button-primary" data-unique-id="701b4053-c51e-4e8c-b03d-ac3b81dfdb96" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="63d78283-5d52-4289-ae2e-85c64d696d75" data-file-name="app/page.tsx">Get Started</span></Button>
                </div>
              </div>

              {/* Pro Plan */}
              <div className="skoop-card p-6 flex flex-col h-full border-2 border-primary relative" data-unique-id="a4518390-59e6-41ca-8178-37761ad6cabe" data-file-name="app/page.tsx">
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-sm font-medium rounded-bl-lg rounded-tr-[calc(var(--radius)-1px)]" data-unique-id="5511ea49-1271-4562-96b4-3d10cec0695a" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="ca37b2ac-cc79-4ce7-8e07-cafbe9632959" data-file-name="app/page.tsx">
                  Popular
                </span></div>
                <div className="mb-6" data-unique-id="f0d13291-4c87-43fb-b3fa-f4b0be7ead57" data-file-name="app/page.tsx">
                  <h3 className="text-lg font-medium mb-2" data-unique-id="71a2be9d-a44c-4933-9ce5-9c1d2d0daf30" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="9c816efb-2c5f-4981-be4e-05ee19341434" data-file-name="app/page.tsx">Pro</span></h3>
                  <div className="text-3xl font-bold" data-unique-id="0c264f11-6f42-4703-a36c-f8dc435e4f2f" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="49b99b99-3eed-4922-b1f8-71e69d9121bd" data-file-name="app/page.tsx">$9</span><span className="text-muted-foreground text-sm font-normal" data-unique-id="a2bb0e62-6586-4d9f-8940-77be486ff0df" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="3acfdd0e-747b-4853-adea-83617fd61e74" data-file-name="app/page.tsx">/month</span></span></div>
                  <p className="text-muted-foreground text-sm mt-3" data-unique-id="3313d884-5360-4acb-ab94-4f6581d6d3d6" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="e5abc605-08ac-4df3-a5ac-d8a272947c47" data-file-name="app/page.tsx">For power users</span></p>
                </div>
                <ul className="space-y-3 mb-8" data-unique-id="a1d89f8a-3d5d-468a-a3b2-f3d9af7095ad" data-file-name="app/page.tsx">
                  <li className="flex items-start" data-unique-id="9e10f795-c99c-4cf5-930a-7deb34678a22" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="9924dfd8-d07d-460f-bde0-13ed4b002d78" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="0ebd8810-16ec-45db-8341-775b878277d4" data-file-name="app/page.tsx">Unlimited saved items</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="2c25ed23-9c06-40b8-bb55-5a2e3225130d" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="ed09a057-b0ed-41b0-b4dc-3660f5d717d0" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="32d968a5-9817-4499-9887-8ccf08a9e19e" data-file-name="app/page.tsx">All platforms</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="80f8e63a-4633-435b-89a4-43e5ec0f2583" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="12976b6b-77f5-4031-88fd-6cb81942d401" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="11fc0d3b-9243-4be9-a707-05d5c0e8257b" data-file-name="app/page.tsx">Advanced semantic search</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="3b0a3c89-6f98-4dc1-af5c-d8ebd3c32dce" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="30617f51-42ad-4aab-9c59-7546af94d922" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="ad8425b1-f5e5-4b96-badc-80bdd550a2c7" data-file-name="app/page.tsx">Smart collections</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="e588745f-b147-4850-b7f7-8dd415c2813a" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="7aeed000-a981-431d-8fe0-2a7087b2a614" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="43a444b2-60be-4163-a7a3-c07a238622a1" data-file-name="app/page.tsx">15-minute sync</span></span>
                  </li>
                </ul>
                <div className="mt-auto" data-unique-id="b4231850-19b3-46e4-9c42-78af544f7730" data-file-name="app/page.tsx">
                  <Button className="w-full skoop-button-accent" data-unique-id="f4cc30fd-2078-4817-b7f2-0e3a1ecac049" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="4ff354a5-53a3-4f3e-8163-40a49d53438b" data-file-name="app/page.tsx">Choose Pro</span></Button>
                </div>
              </div>

              {/* Team Plan */}
              <div className="skoop-card p-6 flex flex-col h-full border border-border" data-unique-id="967aab95-90ec-42d4-84f2-a4331d23f17b" data-file-name="app/page.tsx">
                <div className="mb-6" data-unique-id="2618ead6-01da-4736-ab7d-60acd860b0fd" data-file-name="app/page.tsx">
                  <h3 className="text-lg font-medium mb-2" data-unique-id="9568b19e-4104-4e6d-87f1-dfeee2c88451" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="4c0bc3d1-990f-41ba-9757-1e304cbcb4d7" data-file-name="app/page.tsx">Team</span></h3>
                  <div className="text-3xl font-bold" data-unique-id="bc7ff99f-180b-4155-aaa5-d47969af5798" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="02070641-36c2-450d-b7ad-31fd57d145f1" data-file-name="app/page.tsx">$19</span><span className="text-muted-foreground text-sm font-normal" data-unique-id="823c58de-287b-49ea-8ea4-d25f2633360a" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="f93ac3bc-9492-4344-bf7b-b4454cb859a7" data-file-name="app/page.tsx">/month</span></span></div>
                  <p className="text-muted-foreground text-sm mt-3" data-unique-id="b61631db-3950-4cdc-bf6e-72be6376707d" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="7249fc3d-a975-4dd5-b7a4-c4ad5d97e735" data-file-name="app/page.tsx">Collaborate with your team</span></p>
                </div>
                <ul className="space-y-3 mb-8" data-unique-id="a7035019-7c91-4e81-a2bc-14ec581deb74" data-file-name="app/page.tsx">
                  <li className="flex items-start" data-unique-id="f584e43d-97c7-4cda-ab85-e9e873b302d3" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="cc80ab95-06f6-4988-8274-c34f8918a7d1" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="141b65ad-34cc-444c-a51d-370990fb3229" data-file-name="app/page.tsx">Everything in Pro</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="2c277646-b02f-4e54-a3eb-056a8c2b4c9e" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="fb56a157-a2ee-4eb3-a86a-0598ea101916" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="6f14a1c2-ee03-455b-9b83-b4d3c97b05ff" data-file-name="app/page.tsx">5 team members</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="11f05b13-15d0-4a7d-b1ce-65b06f116e2d" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="45560a5c-2bc7-4a86-982c-c21f3ecfa274" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="c8a14d49-266c-4055-90ca-605fa55b52a9" data-file-name="app/page.tsx">Shared collections</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="e75f0484-6ddf-4e80-9a7a-1ad690ef8b5a" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="3d496b0f-1cba-44f6-87d9-3d56cecb5b38" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="17dcf3db-45f7-4143-bd9b-41116c2f7f4f" data-file-name="app/page.tsx">Collaboration tools</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="3c6f9db8-c9bc-44a8-9364-4e99ae0403de" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="e96a1db1-731b-4e88-ae3f-de25c3b15f51" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="f76c5e75-88c3-4160-9b80-a5d42c1ff408" data-file-name="app/page.tsx">Advanced analytics</span></span>
                  </li>
                </ul>
                <div className="mt-auto" data-unique-id="d11f9df6-3ae8-4b8b-980d-26f2c1d1f562" data-file-name="app/page.tsx">
                  <Button className="w-full skoop-button-primary" data-unique-id="a9abe17d-e710-4dce-8561-aa377c8445e9" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="02d313d3-f98f-4270-a7be-36971a928a56" data-file-name="app/page.tsx">Choose Team</span></Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="skoop-section" data-unique-id="c3726e63-7783-44f3-956d-04285aaed377" data-file-name="app/page.tsx">
          <div className="skoop-container max-w-4xl" data-unique-id="1f3579e8-0f64-491a-8f8e-0dcd5556f5f0" data-file-name="app/page.tsx">
            <div className="skoop-card p-8 md:p-12 text-center" data-unique-id="a470f105-fef3-4ab2-916b-5fae63c8933f" data-file-name="app/page.tsx">
              <h2 className="text-2xl md:text-3xl font-bold mb-4" data-unique-id="83c0fbd7-41ad-4ee4-81a8-9056fdf0481c" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="1e622a39-8642-412f-841e-1f23d2160f1d" data-file-name="app/page.tsx">Ready to organize your digital knowledge?</span></h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto" data-unique-id="8274ff7d-94a1-4b3d-bb1a-cc936b7611e4" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="267242b4-8fd5-488b-a80f-f6ea3227929e" data-file-name="app/page.tsx">
                Join thousands of developers, designers, and researchers who are using SKOOP to make the most of their saved content.
              </span></p>
              <div className="flex flex-col sm:flex-row justify-center gap-4" data-unique-id="e80fa574-84d5-4a5a-ab75-75473c3e9fd6" data-file-name="app/page.tsx">
                <Button className="skoop-button-accent" size="lg" data-unique-id="d5821d3b-c970-4fad-b067-bc1ae4303cb8" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="e3ba1419-6861-4e99-9f50-d78e4f8790c9" data-file-name="app/page.tsx">Get Started for Free</span></Button>
                <Button variant="outline" size="lg" data-unique-id="ef8504de-8246-4842-bbba-1ce7ee5a2b06" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="33b67425-d858-4235-888c-6f05b8dee74d" data-file-name="app/page.tsx">
                  Request Demo
                </span></Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-secondary bg-opacity-30 border-t border-border py-12" data-unique-id="dfb52d9a-1d55-4eb2-a013-85c65db8da8a" data-file-name="app/page.tsx">
        <div className="skoop-container" data-unique-id="1afb1063-3d68-43dd-a13b-ebe18b77f541" data-file-name="app/page.tsx">
          <div className="grid gap-8 md:grid-cols-4" data-unique-id="53c8ef3f-3c5d-4a13-a0b6-7086902f2fc2" data-file-name="app/page.tsx">
            <div data-unique-id="c26b348f-cdb2-4d72-8da5-9704254e078a" data-file-name="app/page.tsx">
              <div className="text-2xl font-bold text-primary mb-4" data-unique-id="2ec90e3e-e87f-42c2-8b40-c1c963905272" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="7f0f1608-3c6a-40ac-8869-d7100fdf824d" data-file-name="app/page.tsx">SKOOP</span></div>
              <p className="text-muted-foreground text-sm" data-unique-id="d0c6f6d2-967c-4e3d-9136-490548fc8d9a" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="3f1a6096-25a3-4776-a302-a3ff781cd62a" data-file-name="app/page.tsx">
                The all-in-one platform for collecting, searching and rediscovering your saved content.
              </span></p>
            </div>

            <div data-unique-id="62efeeab-9a21-411b-9565-92a778e22ae1" data-file-name="app/page.tsx">
              <h4 className="font-medium mb-4" data-unique-id="f8305fc6-57b0-4096-97fa-65bd1103c08c" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="bba304dd-8cf6-4041-a7ea-58384f7a2ce3" data-file-name="app/page.tsx">Product</span></h4>
              <ul className="space-y-2 text-sm text-muted-foreground" data-unique-id="e19f8405-b155-4195-97cb-09c03a269511" data-file-name="app/page.tsx">
                <li data-unique-id="a81152fa-eef3-47a9-aafb-e9d909180da0" data-file-name="app/page.tsx"><Link href="#features" className="hover:text-primary transition-colors" data-unique-id="b303047c-250d-40af-a959-07ccf866b8ae" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="7c9037c1-ea57-435a-abe1-46a3960d0159" data-file-name="app/page.tsx">Features</span></Link></li>
                <li data-unique-id="ac3c933d-9dd9-4a99-b1ce-181a50ff107c" data-file-name="app/page.tsx"><Link href="#pricing" className="hover:text-primary transition-colors" data-unique-id="a45d8559-b57f-42f8-b4d7-66c4aa6d5d47" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="a991c569-2210-4aa1-9b2e-85231cd51a22" data-file-name="app/page.tsx">Pricing</span></Link></li>
                <li data-unique-id="b41a83d3-787d-45dd-8759-ead1372b1a35" data-file-name="app/page.tsx"><Link href="/dashboard" className="hover:text-primary transition-colors" data-unique-id="3c5b8526-e126-469d-b960-68d7808b439a" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="072a13c3-c0f0-4064-8785-f4c2d969c531" data-file-name="app/page.tsx">Dashboard</span></Link></li>
                <li data-unique-id="f65b48d6-3838-45a0-b130-35d45b5e24e1" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="2feea306-bce8-4218-bf43-2d0de4283683" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="965b4396-5709-451c-9408-181f3dd3b776" data-file-name="app/page.tsx">Integrations</span></Link></li>
                <li data-unique-id="852ba58e-bbe1-4040-a0a3-e2137ee94bb1" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="37ca03d2-090e-4eb4-93b3-18b468ea0f68" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="f5bb3bcc-6f60-432b-a7df-17500c527dd0" data-file-name="app/page.tsx">Changelog</span></Link></li>
              </ul>
            </div>

            <div data-unique-id="bc4d8a7c-1024-4934-adbb-fc5888f08cf1" data-file-name="app/page.tsx">
              <h4 className="font-medium mb-4" data-unique-id="6e8165f4-6b78-41cd-83a5-4bde75fdde84" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="798b34aa-807d-4afb-8e57-87abe3945a96" data-file-name="app/page.tsx">Resources</span></h4>
              <ul className="space-y-2 text-sm text-muted-foreground" data-unique-id="b90fb78a-28c2-421f-871e-12924727bf3f" data-file-name="app/page.tsx">
                <li data-unique-id="3f55ba3d-2195-4911-812d-039986acf121" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="89acc902-21ae-4f05-89c8-799e87125046" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="a8e761ad-1d16-496f-b53a-f4c3e3d121b0" data-file-name="app/page.tsx">Documentation</span></Link></li>
                <li data-unique-id="6d1c422b-c838-4c63-bbbd-7509e5ce85e1" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="1494ccc8-11ba-4e56-bb02-41747b602d7b" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="c540825a-de29-487b-b08b-28d75f5b753a" data-file-name="app/page.tsx">API</span></Link></li>
                <li data-unique-id="a178927e-3f44-452b-a5ee-dc6d03fa8297" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="5a035d18-19a5-4de7-b026-690fcb12ad32" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="21517b28-5bc6-45e0-8024-0a7a46750f51" data-file-name="app/page.tsx">Guides</span></Link></li>
                <li data-unique-id="5dfb4997-edbe-419e-9a29-23ad53ff9ea3" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="16c799f9-185a-4669-8634-23f939f61570" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="60bfd06a-5a40-4a05-8316-6d9379ac877f" data-file-name="app/page.tsx">Help Center</span></Link></li>
              </ul>
            </div>

            <div data-unique-id="4544a1ff-14b8-40aa-8842-6af5cc140835" data-file-name="app/page.tsx">
              <h4 className="font-medium mb-4" data-unique-id="1785dda8-6919-4731-b956-a3d4453014a3" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="c2750f40-cedd-4213-a607-04ee8ef857e0" data-file-name="app/page.tsx">Company</span></h4>
              <ul className="space-y-2 text-sm text-muted-foreground" data-unique-id="7957ad85-1c41-495f-a173-597d365f9d9a" data-file-name="app/page.tsx">
                <li data-unique-id="826b54ae-6af0-41c1-9320-7eee7685640b" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="e298e1dd-7b70-40a9-af1c-13250e51bf0b" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="65492f2c-3831-4a3d-a05c-b3b88e43a33c" data-file-name="app/page.tsx">About</span></Link></li>
                <li data-unique-id="da04cc95-5402-4a04-a28a-51c457259b3c" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="c924fa50-6f01-48b3-b0ba-1db3b95175ab" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="cf55d6f9-1b13-4498-9264-529d8a26d6b3" data-file-name="app/page.tsx">Blog</span></Link></li>
                <li data-unique-id="79d2b6cc-22a9-4c1c-b207-a4331fc7c480" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="6c4c119e-a38a-48b4-93d1-f08538c48e10" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="a0052563-7d48-4b4e-bdf0-482f39230407" data-file-name="app/page.tsx">Careers</span></Link></li>
                <li data-unique-id="f662b9cf-7819-4d92-b4fc-a75beae37510" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="27bcc7ae-bc4c-4f13-bb28-cbc7375df30d" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="f541c350-d385-4046-bb0a-be502a967875" data-file-name="app/page.tsx">Contact</span></Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center" data-unique-id="aebfe8a7-c1a6-4632-95a9-dc1f9be70a06" data-file-name="app/page.tsx">
            <div className="text-sm text-muted-foreground" data-unique-id="d491c1bd-5eaf-47ce-8c78-752a6628af82" data-file-name="app/page.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="a32acee9-456d-43a5-9139-61b66ac363b8" data-file-name="app/page.tsx">
              © </span>{new Date().getFullYear()}<span className="editable-text" data-unique-id="e7d62f55-4523-43e3-ac7b-a246dc0e8d6a" data-file-name="app/page.tsx"> SKOOP. All rights reserved.
            </span></div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0" data-unique-id="1cf78d2c-a86d-4085-869c-843433fd3429" data-file-name="app/page.tsx">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors" data-unique-id="14ad55ca-cf78-4892-95c9-6b69eb66944f" data-file-name="app/page.tsx">
                <span className="sr-only" data-unique-id="3efa753b-0043-4d6d-a00c-e44f596b5054" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="d4b9a634-aadb-4f93-a27c-be09fc444028" data-file-name="app/page.tsx">Twitter</span></span>
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors" data-unique-id="6a062472-c34e-45e6-9734-c9f3f73a5316" data-file-name="app/page.tsx">
                <span className="sr-only" data-unique-id="0a0fb6f6-9f2a-4dc4-a64a-005ccc18b439" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="ce349166-6a45-4396-8e2b-79866ad9b16b" data-file-name="app/page.tsx">GitHub</span></span>
                <Github className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>;
}