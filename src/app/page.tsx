import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { AuroraBackground } from "@/components/ui/aurora-background";
import Link from "next/link";
import Image from "next/image";
import { Search, Github, Twitter, Code as StackOverflow, Bookmark, FolderPlus as Collection, CheckCircle2, ChevronRight, ArrowRight } from "lucide-react";
export default function HomePage() {
  return <div className="min-h-screen flex flex-col" data-unique-id="509c7280-4e4c-43da-b914-7f8a20dab4fd" data-file-name="app/page.tsx" data-dynamic-text="true">
      {/* Header */}
      <header className="border-b border-border relative z-10" data-unique-id="7d25eb6d-5b9e-4883-a2c3-2ac8650f42ba" data-file-name="app/page.tsx">
        <div className="skoop-container flex items-center justify-between h-16" data-unique-id="e87b264c-eeb3-40a6-ae58-401579ab7640" data-file-name="app/page.tsx">
          <div className="flex items-center" data-unique-id="dc402ddb-6076-4399-82bb-7dc678796363" data-file-name="app/page.tsx">
            <div className="text-2xl font-bold text-primary" data-unique-id="09e766dd-8749-4d7e-8096-afd8bbdd5dd9" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="9c2b378f-fffa-4a51-8210-825155b89869" data-file-name="app/page.tsx">SKOOP</span></div>
            <nav className="hidden ml-12 space-x-6 lg:flex" data-unique-id="69049e0f-3aa0-4f67-987d-45a4bb4a4893" data-file-name="app/page.tsx">
              <Link href="#features" className="text-foreground hover:text-primary transition-colors" data-unique-id="c26aa1a9-00ef-48b4-8de0-571123d45927" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="863ca9a4-b165-4c17-8965-93d3e52fe879" data-file-name="app/page.tsx">Features</span></Link>
              <Link href="#pricing" className="text-foreground hover:text-primary transition-colors" data-unique-id="4828941f-21ed-407d-8a4a-084d6817bb93" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="9d763a03-efc4-4dd3-9286-a4379d15e142" data-file-name="app/page.tsx">Pricing</span></Link>
              <Link href="#faq" className="text-foreground hover:text-primary transition-colors" data-unique-id="15412391-d770-4ef0-9364-70ede88a8bdc" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="b248d6dc-7d2a-4883-ab65-fc24865d3236" data-file-name="app/page.tsx">FAQ</span></Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4" data-unique-id="bc74e207-31c1-4c9e-bab8-babd7c5165e8" data-file-name="app/page.tsx">
            <ThemeToggle />
            <a href="/dashboard" className="text-foreground hover:text-primary transition-colors" data-unique-id="36fb3c84-c8a8-4a05-bda9-a179e86add92" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="420151a1-f93a-47c7-9a18-d863b6653b0e" data-file-name="app/page.tsx">Dashboard</span></a>
            <a href="/login" className="text-foreground hover:text-primary transition-colors" data-unique-id="0f32f9fc-a4fb-4f6c-8142-ca59fbab7845" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="988ed5bc-43f3-4f70-bed9-c55ffdbd227f" data-file-name="app/page.tsx">Log in</span></a>
            <Button className="skoop-button-accent" data-unique-id="464bd0b1-6cad-4b4e-ae5e-e95824b0e444" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="1565ea7a-3beb-4de2-89af-aba6257ddf8a" data-file-name="app/page.tsx">Sign Up Free</span></Button>
          </div>
        </div>
      </header>

      <main className="flex-grow" data-unique-id="13eb4990-08d7-44ec-953c-f3baed456d3e" data-file-name="app/page.tsx" data-dynamic-text="true">
        {/* Hero Section with Aurora Background */}
        <section className="relative overflow-hidden" data-unique-id="ef63feca-fe62-46f9-a953-35262501292f" data-file-name="app/page.tsx">
          <AuroraBackground className="absolute inset-0">
            <div className="absolute inset-0 bg-background/40 backdrop-blur-sm" data-unique-id="0a4c9cb7-5034-4ffc-afe9-9cfb5ddf9f81" data-file-name="app/page.tsx" />
          </AuroraBackground>
          
          <div className="skoop-section relative z-10" data-unique-id="195e42c5-5e5d-4501-880e-6e984827bb18" data-file-name="app/page.tsx">
          <div className="skoop-container" data-unique-id="3a5dca9d-1976-4266-aeed-36f368456e1a" data-file-name="app/page.tsx" data-dynamic-text="true">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-24 items-center" data-unique-id="e8ba7139-aa26-422d-9862-3877b34962a5" data-file-name="app/page.tsx">
              <div data-unique-id="0766dc58-66c3-4395-84b8-99f6023ad0a1" data-file-name="app/page.tsx">
                <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl mb-6" data-unique-id="f9a04805-4427-40b7-a2d3-050080980420" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="99828487-7cd9-4813-a826-ea4dc3e6ff15" data-file-name="app/page.tsx">
                  Collect, search and </span><span className="text-primary" data-unique-id="c036e104-d4ef-4e9d-bb44-2cc58f82b84a" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="f4cc1487-a383-414b-a1c0-8ad439dd2daf" data-file-name="app/page.tsx">rediscover</span></span><span className="editable-text" data-unique-id="236c44e4-2b1b-4c6d-b16a-1d7a9f0b93c6" data-file-name="app/page.tsx"> your saved content
                </span></h1>
                <p className="text-lg text-muted-foreground mb-8" data-unique-id="14f46ecc-0a40-4d6e-a2de-196b999922b3" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="14b57b58-5b39-4ecc-b617-a6ebc9c0abc5" data-file-name="app/page.tsx">
                  One calm space for all your saved tweets, GitHub stars, Reddit posts, and Stack Overflow favorites.
                </span></p>
                <div className="flex flex-col sm:flex-row gap-4" data-unique-id="4d1d4772-7a08-4dbf-9b61-6531d8916fca" data-file-name="app/page.tsx">
                  <Button className="skoop-button-accent" size="lg" data-unique-id="af27cae7-51a9-445b-a33f-c111c7758442" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="1bbe265f-eebe-4c9a-a50c-7b6fe16bc2f6" data-file-name="app/page.tsx">Get Started</span></Button>
                  <Button variant="outline" size="lg" className="group" data-unique-id="435bac69-6840-4112-b5c5-343742a18987" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="699f26e3-6845-4d7a-9eaf-0d8d7a2c466a" data-file-name="app/page.tsx">
                    How It Works
                    </span><ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
                <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground" data-unique-id="ec04d6ff-9b06-42e0-9169-b31dd1927e85" data-file-name="app/page.tsx">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span data-unique-id="a25d45cc-c1e2-4731-b4c6-042910b7d688" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="f5a445c2-a5c9-4ab5-8c3c-55b96616cca0" data-file-name="app/page.tsx">No credit card required</span></span>
                </div>
              </div>
              <div className="relative" data-unique-id="44fac2a3-2f3f-448c-86b6-47bcb736b00d" data-file-name="app/page.tsx" data-dynamic-text="true">
                <div className="skoop-card overflow-hidden" data-unique-id="f3b4b0c9-77b9-4dea-b1da-6ee264257b9e" data-file-name="app/page.tsx">
                  <Image src="https://images.unsplash.com/photo-1508921340878-ba53e1f016ec?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3" alt="SKOOP Dashboard" width={600} height={400} className="w-full h-auto rounded-t-[var(--radius)]" data-unique-id="c6a54fd7-f855-4554-ab8f-fe7593f35c67" data-file-name="app/page.tsx" />
                  <div className="p-6" data-unique-id="508c9658-79f3-493d-a6a8-7247a538071b" data-file-name="app/page.tsx">
                    <div className="flex items-center justify-between mb-4" data-unique-id="e37d2f13-2125-4d41-85fa-a8be736f361c" data-file-name="app/page.tsx">
                      <div className="font-semibold" data-unique-id="8692768c-c652-4e81-b332-e1977cc74dc2" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="f4c0e50d-3711-46de-9383-8d62b4cff08a" data-file-name="app/page.tsx">Recent Saves</span></div>
                      <Search className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="space-y-3" data-unique-id="06942774-cf99-4337-bcff-994a05901fed" data-file-name="app/page.tsx" data-dynamic-text="true">
                      {[1, 2, 3].map(i => <div key={i} className="flex items-center gap-3 p-3 rounded-md bg-secondary/50" data-unique-id="da1b3245-f7ec-426b-b0a7-ef6714b375c5" data-file-name="app/page.tsx" data-dynamic-text="true">
                          {i === 1 && <Github className="h-5 w-5 text-foreground" />}
                          {i === 2 && <Twitter className="h-5 w-5 text-foreground" />}
                          {i === 3 && <StackOverflow className="h-5 w-5 text-foreground" />}
                          <div className="flex-grow" data-unique-id="378d2647-181c-4754-a883-6b6bdd96217a" data-file-name="app/page.tsx">
                            <div className="text-sm font-medium truncate" data-unique-id="f4e8e8b0-026e-4e59-9d53-3178ece93770" data-file-name="app/page.tsx" data-dynamic-text="true">
                              {i === 1 && "Interesting open source project for data visualization"}
                              {i === 2 && "Thread: 10 tips for better React performance"}
                              {i === 3 && "How to optimize PostgreSQL queries for large datasets"}
                            </div>
                            <div className="text-xs text-muted-foreground mt-0.5" data-unique-id="8bdb4985-a3a1-4f7a-9f4c-9c1b5fc47e10" data-file-name="app/page.tsx" data-dynamic-text="true">
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
                <div className="absolute -left-8 top-1/2 bg-card p-3 rounded-full shadow-lg border border-border hidden lg:block" data-unique-id="20d10765-37c0-4522-9fc5-de4b01012b64" data-file-name="app/page.tsx">
                  <Github className="h-6 w-6 text-primary" />
                </div>
                <div className="absolute -right-8 bottom-1/3 bg-card p-3 rounded-full shadow-lg border border-border hidden lg:block" data-unique-id="91849473-7744-4f19-a34e-a64e6e482688" data-file-name="app/page.tsx">
                  <Twitter className="h-6 w-6 text-accent" />
                </div>
              </div>
            </div>

            {/* Logos */}
            <div className="mt-20" data-unique-id="4e2d941c-fa4e-4990-baf5-5a98455ef034" data-file-name="app/page.tsx">
              <p className="text-center text-sm text-muted-foreground mb-6" data-unique-id="06253de2-2855-4d6f-bc5b-4baef90dbc57" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="c20ae70d-114c-43a8-a6f0-06855f845e18" data-file-name="app/page.tsx">
                Connect with your favorite platforms
              </span></p>
              <div className="flex justify-center items-center flex-wrap gap-8 md:gap-12" data-unique-id="56d0a723-5685-47f6-a2e4-64e1d2cd9be9" data-file-name="app/page.tsx">
                <Github className="h-8 w-8 text-muted-foreground" />
                <Twitter className="h-8 w-8 text-muted-foreground" />
                <StackOverflow className="h-8 w-8 text-muted-foreground" />
                <div className="text-muted-foreground text-xl font-semibold" data-unique-id="1047044a-a6b5-41b4-b113-10af05accec5" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="c059b342-f681-4ed3-93e0-51920ecde6ff" data-file-name="app/page.tsx">Reddit</span></div>
                <div className="text-muted-foreground text-xl font-semibold" data-unique-id="199f728b-519a-4119-be28-5135a718ee76" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="71230ee6-af3d-41df-8a3b-3dd8bf09b72e" data-file-name="app/page.tsx">DEV</span></div>
              </div>
            </div>
          </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="skoop-section" data-unique-id="f27bb06a-76c1-4b37-925e-fcc61f0bb256" data-file-name="app/page.tsx">
          <div className="skoop-container" data-unique-id="e23af2f3-1f45-417e-a873-e930a20defb4" data-file-name="app/page.tsx">
            <div className="text-center mb-16" data-unique-id="a04f6894-243a-46db-958b-47ec2f3c16bf" data-file-name="app/page.tsx">
              <h2 className="text-3xl font-bold mb-4" data-unique-id="fe46fbd1-6f61-4a8d-b155-212d414ee740" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="d36c16bf-788d-42b7-a587-da3c8fedc9ed" data-file-name="app/page.tsx">Finally, a place for all your saved content</span></h2>
              <p className="text-muted-foreground max-w-2xl mx-auto" data-unique-id="facd6440-a219-42f7-b16d-c692be210de3" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="cdf6638d-f356-469a-803a-d7f0b08174a4" data-file-name="app/page.tsx">
                SKOOP solves the problem of fragmented saves and makes it easy to find what you need when you need it.
              </span></p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3" data-unique-id="03b8008f-d7cf-4332-a1d3-8a9ccebba4de" data-file-name="app/page.tsx" data-dynamic-text="true">
              {/* Feature 1 */}
              <div className="skoop-card p-6" data-unique-id="36a14835-7694-4406-9f61-aea5f624ff15" data-file-name="app/page.tsx">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary bg-opacity-10 mb-4" data-unique-id="a538dca3-2fd9-4057-9c67-5f2caa6726a2" data-file-name="app/page.tsx">
                  <Bookmark className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3" data-unique-id="fdc0b2a9-c6d4-4359-8611-9c61fa470d30" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="4e566d19-4512-4067-9ad1-977bbfdd442c" data-file-name="app/page.tsx">Unified Collection</span></h3>
                <p className="text-muted-foreground mb-4" data-unique-id="e1bf4621-6ca5-4023-8f87-db61ef1d0979" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="39ea87a0-54ce-4237-8c27-83f8b37d7b0c" data-file-name="app/page.tsx">
                  Import and sync all your saved content from GitHub, Twitter, Reddit, and Stack Overflow in one place.
                </span></p>
                <div className="pt-4 border-t border-border mt-auto" data-unique-id="9a5daded-cc72-40ce-add7-e03c16f9e2cc" data-file-name="app/page.tsx">
                  <Link href="#" className="inline-flex items-center text-primary hover:underline" data-unique-id="12ec1807-e569-4dce-a207-10f40ef995ac" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="f45318f6-d6cd-4141-a362-58245f715176" data-file-name="app/page.tsx">
                    Learn more </span><ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="skoop-card p-6" data-unique-id="9d71fe21-5682-4a7e-bdeb-3ac04c9b5a06" data-file-name="app/page.tsx">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-accent bg-opacity-10 mb-4" data-unique-id="9237284b-6053-413d-8057-d7432a30802c" data-file-name="app/page.tsx">
                  <Search className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3" data-unique-id="1b23527b-bb4a-4166-ac82-23da5da56642" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="29db0c24-eb99-46d0-b231-8c3af7edd949" data-file-name="app/page.tsx">Semantic Search</span></h3>
                <p className="text-muted-foreground mb-4" data-unique-id="33f336a7-3bfd-4c22-be90-89ece7fc52e8" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="2b9fafdc-2a8d-458b-b0f6-2a118b7f7bc1" data-file-name="app/page.tsx">
                  Find what you're looking for with powerful semantic search that understands the meaning behind your queries.
                </span></p>
                <div className="pt-4 border-t border-border mt-auto" data-unique-id="fd32b4fa-77c6-4eb8-8fcc-01bba6ae8689" data-file-name="app/page.tsx">
                  <Link href="#" className="inline-flex items-center text-primary hover:underline" data-unique-id="afe58c33-d299-4469-9187-e62e88baaf4b" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="d5b2a968-ee07-4de2-be4c-073b14560a1e" data-file-name="app/page.tsx">
                    Learn more </span><ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="skoop-card p-6" data-unique-id="98c2b96a-958f-4b74-a5e1-5a9a5723579f" data-file-name="app/page.tsx">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-destructive bg-opacity-10 mb-4" data-unique-id="64ac25eb-de2f-44df-92e3-8c5854624fab" data-file-name="app/page.tsx">
                  <Collection className="h-6 w-6 text-destructive" />
                </div>
                <h3 className="text-xl font-semibold mb-3" data-unique-id="4a12dc3b-2053-4c13-b05d-148409e2ea33" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="1cec1094-60c1-4fdb-8b95-349e9847248c" data-file-name="app/page.tsx">Smart Collections</span></h3>
                <p className="text-muted-foreground mb-4" data-unique-id="a0d12b1e-8437-4273-b377-0349d51da59e" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="ef71938a-9c8d-48ff-a0cb-cbe835bfb1a1" data-file-name="app/page.tsx">
                  Organize your content with automated collections that group similar items together and surface the best content.
                </span></p>
                <div className="pt-4 border-t border-border mt-auto" data-unique-id="b3045115-4290-4f1c-97aa-ab5319ef35bc" data-file-name="app/page.tsx">
                  <Link href="#" className="inline-flex items-center text-primary hover:underline" data-unique-id="c583db2c-01ac-423d-81e5-39a9bd41662d" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="76df7a12-6b1b-4247-867a-a148da5a1c31" data-file-name="app/page.tsx">
                    Learn more </span><ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="skoop-section bg-secondary bg-opacity-30" data-unique-id="aed55617-0812-43c2-936d-9c4c37c956d5" data-file-name="app/page.tsx">
          <div className="skoop-container" data-unique-id="b3959b08-74af-4eda-a6ac-91baa7bc74b7" data-file-name="app/page.tsx">
            <div className="text-center mb-16" data-unique-id="c899a2b4-e9d5-4e63-942d-c250cc88fb0d" data-file-name="app/page.tsx">
              <h2 className="text-3xl font-bold mb-4" data-unique-id="b4510215-ad47-426c-8ec0-0e0f6a33d198" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="21305992-3e2f-4710-9875-1c191258d679" data-file-name="app/page.tsx">Simple, transparent pricing</span></h2>
              <p className="text-muted-foreground max-w-2xl mx-auto" data-unique-id="d9c64c67-4c52-42ed-a1c7-d6364652c752" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="08b928d3-b862-42a6-b27e-a2d6d7d783a8" data-file-name="app/page.tsx">
                Choose the plan that fits your needs. All plans include our core features.
              </span></p>
            </div>

            <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto" data-unique-id="457e9e4a-e0e1-4cac-94e3-0194e6cf69b1" data-file-name="app/page.tsx" data-dynamic-text="true">
              {/* Free Plan */}
              <div className="skoop-card p-6 flex flex-col h-full border border-border" data-unique-id="f67dcb37-e802-4993-968f-46d813f6a422" data-file-name="app/page.tsx">
                <div className="mb-6" data-unique-id="d696f53e-0a76-42b4-a21b-0f5771c91f6b" data-file-name="app/page.tsx">
                  <h3 className="text-lg font-medium mb-2" data-unique-id="d7a68342-5942-45ac-b533-30f712a46f04" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="93c90d1c-2d04-4156-8b8d-8852666234ef" data-file-name="app/page.tsx">Free</span></h3>
                  <div className="text-3xl font-bold" data-unique-id="fdfb563e-84cf-4f9b-9a08-b2736cb288dc" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="c59b39f1-5da5-4926-aa05-c772803519b7" data-file-name="app/page.tsx">$0</span><span className="text-muted-foreground text-sm font-normal" data-unique-id="341901c8-c6ec-485c-9148-be066269bc30" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="ce7142e3-aa8c-4771-b0d2-6623e69c8127" data-file-name="app/page.tsx">/month</span></span></div>
                  <p className="text-muted-foreground text-sm mt-3" data-unique-id="c351235a-8262-4519-acad-23f9c7f59dcb" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="82d47fd7-e25a-49cb-9706-878bb7878119" data-file-name="app/page.tsx">Perfect for getting started</span></p>
                </div>
                <ul className="space-y-3 mb-8" data-unique-id="c00243a7-27a4-44da-8c4d-bacb97e270e2" data-file-name="app/page.tsx">
                  <li className="flex items-start" data-unique-id="5de862d7-1e8f-432f-a053-84c895912161" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="d64e562d-bf58-455d-8a52-f4e40dc29ac9" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="4dbaeaa1-ce7a-4d6e-8a8a-ad1b6938e63a" data-file-name="app/page.tsx">500 saved items</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="25efecd4-b9d4-4cd8-a10f-40c960002b59" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="29d5183c-4308-4b18-ab2b-6344d923755e" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="4e111b9c-fac2-4b65-90c6-3dee40718533" data-file-name="app/page.tsx">2 connected platforms</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="15e09764-a5d4-4eda-983f-dfd5d40e2291" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="9a187799-dcfa-434c-9229-c657a61fdfe0" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="37a1d68e-1bad-4f09-9d11-d2d27935609b" data-file-name="app/page.tsx">Basic search</span></span>
                  </li>
                </ul>
                <div className="mt-auto" data-unique-id="1f489f09-c24f-4b72-8d40-87b10128de63" data-file-name="app/page.tsx">
                  <Button className="w-full skoop-button-primary" data-unique-id="614dfdb2-02fc-4ab7-a97d-f5ff55c4a34b" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="133beb10-27a8-41d1-a2fb-d5a1fbfb1fbc" data-file-name="app/page.tsx">Get Started</span></Button>
                </div>
              </div>

              {/* Pro Plan */}
              <div className="skoop-card p-6 flex flex-col h-full border-2 border-primary relative" data-unique-id="e19bdbf0-df85-4d37-a3c2-fa81056f7507" data-file-name="app/page.tsx">
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-sm font-medium rounded-bl-lg rounded-tr-[calc(var(--radius)-1px)]" data-unique-id="8a49ee46-7a18-450b-89fc-ff4f103b5749" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="f9b8a4f8-07bb-42a0-a8a0-ceed7179a391" data-file-name="app/page.tsx">
                  Popular
                </span></div>
                <div className="mb-6" data-unique-id="67624627-0f3c-45f0-aa8e-29aacfefd3a9" data-file-name="app/page.tsx">
                  <h3 className="text-lg font-medium mb-2" data-unique-id="e518b0f3-6509-493b-9238-c29406837d15" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="ffd2bc1a-4d77-453b-800e-ee0e8415a066" data-file-name="app/page.tsx">Pro</span></h3>
                  <div className="text-3xl font-bold" data-unique-id="c6d279ff-bf63-4507-8966-72cbbefee74d" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="af5a36c6-76bb-4753-8885-b52289aa513b" data-file-name="app/page.tsx">$9</span><span className="text-muted-foreground text-sm font-normal" data-unique-id="a3511c24-f7e9-4823-916c-7d462b8690d7" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="c235c2f7-fd85-48d4-9cac-9c8c157bf2bc" data-file-name="app/page.tsx">/month</span></span></div>
                  <p className="text-muted-foreground text-sm mt-3" data-unique-id="b362e3c6-ca13-4e31-a473-0913095500a0" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="e6e6d95c-1e50-40bc-b57b-c8b974e5d367" data-file-name="app/page.tsx">For power users</span></p>
                </div>
                <ul className="space-y-3 mb-8" data-unique-id="8e6d8b3f-a5da-4cac-83e1-ebdbb2ac6db0" data-file-name="app/page.tsx">
                  <li className="flex items-start" data-unique-id="34182663-bb7b-431c-b1bc-ff7fd0521d3d" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="db7e3d24-5fe7-4941-a792-441f98c24ca9" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="50cf80b2-3030-4edb-9af3-4a245783b273" data-file-name="app/page.tsx">Unlimited saved items</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="b02ee0f9-6500-44df-9508-2b3d3e8090f2" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="6d347fb6-a17b-4282-92fe-1e443ce73819" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="5d4fd787-a4ca-4adb-af7c-e2adc6c43f88" data-file-name="app/page.tsx">All platforms</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="34a55f9a-95ac-48f4-85b2-8cfcb3a32900" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="67a5eede-ad42-471b-bf25-80e951fb9d28" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="e84585e4-ecae-4270-bda9-2f3a84c2d151" data-file-name="app/page.tsx">Advanced semantic search</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="0c0360b8-ada1-4d2e-8496-4aebe9ab0283" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="271ad030-583d-453a-a2c7-c9d2e2f3d448" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="e7340017-517e-4637-826d-a76c6806a4b6" data-file-name="app/page.tsx">Smart collections</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="a91cc477-ebfb-4bd8-9791-a052e3570cd3" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="e10c60ac-247b-42c8-8638-ebc65bcc3761" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="d410622f-9c92-4794-98fd-c30b692754ec" data-file-name="app/page.tsx">15-minute sync</span></span>
                  </li>
                </ul>
                <div className="mt-auto" data-unique-id="954e8664-8ff3-4543-934c-656ff1ce7dbd" data-file-name="app/page.tsx">
                  <Button className="w-full skoop-button-accent" data-unique-id="4d097983-bcad-4151-81b2-8b7968efe127" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="41d65ad3-ab65-49e4-acfc-edd22921d251" data-file-name="app/page.tsx">Choose Pro</span></Button>
                </div>
              </div>

              {/* Team Plan */}
              <div className="skoop-card p-6 flex flex-col h-full border border-border" data-unique-id="9db565b6-d943-407e-b86f-be780a48f5b7" data-file-name="app/page.tsx">
                <div className="mb-6" data-unique-id="cd0c4045-0396-448b-88e0-3b4e0781f6e3" data-file-name="app/page.tsx">
                  <h3 className="text-lg font-medium mb-2" data-unique-id="6f5eb9cf-9c6b-4300-b949-9c76aba8c8f5" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="e0696525-7b29-44e0-8e16-28d3bcb4f8a1" data-file-name="app/page.tsx">Team</span></h3>
                  <div className="text-3xl font-bold" data-unique-id="d67751da-2345-422d-80b9-3363ef3d1f21" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="c5bdd3cf-04df-451c-8a2a-1ef54a6041a9" data-file-name="app/page.tsx">$19</span><span className="text-muted-foreground text-sm font-normal" data-unique-id="0a2414e5-53a5-45d8-b7a6-d5724e10c963" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="cb30dc88-1ddc-4178-8390-accb05ffd37c" data-file-name="app/page.tsx">/month</span></span></div>
                  <p className="text-muted-foreground text-sm mt-3" data-unique-id="a6650b1f-31bf-4993-92ef-b0cedc1fc438" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="6468a293-17b6-404d-903a-9e750579010a" data-file-name="app/page.tsx">Collaborate with your team</span></p>
                </div>
                <ul className="space-y-3 mb-8" data-unique-id="87567706-9cc3-4b4c-8292-3f90c7d8ee37" data-file-name="app/page.tsx">
                  <li className="flex items-start" data-unique-id="ef487f25-93ec-4be9-8b55-c724895947d6" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="3334aae5-fc57-46ed-8add-5d6545017dc4" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="0ed9b276-2478-4949-964e-c8577918ca9a" data-file-name="app/page.tsx">Everything in Pro</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="42595a76-3862-434e-bcb9-2e432be3717e" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="11fa9940-3deb-4d97-973a-5d0f264b097c" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="eea1b607-8f84-48e4-992c-4f7f1034314c" data-file-name="app/page.tsx">5 team members</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="a6df768f-a3ce-4ec5-b532-c1922184b5d2" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="ec085b23-a026-4c60-9913-ef40d66d10a2" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="de4e6dc7-131e-4f39-85c5-b833e88b02b2" data-file-name="app/page.tsx">Shared collections</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="bb86af3c-9aa8-4688-9e41-98dc043c9cb4" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="2050f6e2-e965-4225-8d61-02330a718974" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="a7d33832-dd05-4248-910d-dba27a8125e7" data-file-name="app/page.tsx">Collaboration tools</span></span>
                  </li>
                  <li className="flex items-start" data-unique-id="a655c67e-45a7-4dc4-a9da-06a1a8d4d4b4" data-file-name="app/page.tsx">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span data-unique-id="5fe8799f-ccba-4bdb-9d53-805825a9306e" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="05956918-edd8-4df2-b75d-507179b2433f" data-file-name="app/page.tsx">Advanced analytics</span></span>
                  </li>
                </ul>
                <div className="mt-auto" data-unique-id="6453c3e0-fbd6-4603-8db0-f110b52e49a1" data-file-name="app/page.tsx">
                  <Button className="w-full skoop-button-primary" data-unique-id="72fed1c4-1d68-49f7-9e7f-03e659164e41" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="9d29946c-7dbd-4311-a376-0686b5fa18a0" data-file-name="app/page.tsx">Choose Team</span></Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="skoop-section" data-unique-id="c8982097-ca55-43d2-8629-7bdac55f7700" data-file-name="app/page.tsx">
          <div className="skoop-container max-w-4xl" data-unique-id="31af1f1b-f46d-482e-aee6-4e4f9c08d6fc" data-file-name="app/page.tsx">
            <div className="skoop-card p-8 md:p-12 text-center" data-unique-id="19637fcc-c3b0-449d-9478-7cac4aa6e38c" data-file-name="app/page.tsx">
              <h2 className="text-2xl md:text-3xl font-bold mb-4" data-unique-id="4bbe3a29-3db7-48b0-965f-b460476c8475" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="8ab5a1bd-46f3-4ce8-91b8-ba7fbc5af140" data-file-name="app/page.tsx">Ready to organize your digital knowledge?</span></h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto" data-unique-id="0e1b2fee-9742-469d-8554-24b62cec2b38" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="b60cfb91-2e94-437c-aa70-865f1a2ba8c2" data-file-name="app/page.tsx">
                Join thousands of developers, designers, and researchers who are using SKOOP to make the most of their saved content.
              </span></p>
              <div className="flex flex-col sm:flex-row justify-center gap-4" data-unique-id="05cedd36-006c-4df3-ab11-e9b782431ca0" data-file-name="app/page.tsx">
                <Button className="skoop-button-accent" size="lg" data-unique-id="02a3d7a8-fc43-467e-9dad-f9c3e3b84485" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="6d0fcc8f-f2fc-4052-823a-cf1fa65768ca" data-file-name="app/page.tsx">Get Started for Free</span></Button>
                <Button variant="outline" size="lg" data-unique-id="9e2a69c6-6fd8-4e88-b115-1b53b5a4a644" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="3e898824-d2f9-4b5c-84aa-1953ed50efb1" data-file-name="app/page.tsx">
                  Request Demo
                </span></Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-secondary bg-opacity-30 border-t border-border py-12" data-unique-id="37605082-b967-4c05-a860-9b569aa7d68c" data-file-name="app/page.tsx">
        <div className="skoop-container" data-unique-id="80d8eb5c-dae9-47eb-be51-3218be66d061" data-file-name="app/page.tsx">
          <div className="grid gap-8 md:grid-cols-4" data-unique-id="9a97536f-9f1d-4d82-aab6-27896a87a284" data-file-name="app/page.tsx">
            <div data-unique-id="e178fd4e-70f8-44a0-8ae2-a3672128ea87" data-file-name="app/page.tsx">
              <div className="text-2xl font-bold text-primary mb-4" data-unique-id="2e3e0a28-ef16-4e45-97db-0f441f3404b4" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="3ec4d880-d2a0-4d4f-9621-db75af6f8d2b" data-file-name="app/page.tsx">SKOOP</span></div>
              <p className="text-muted-foreground text-sm" data-unique-id="975e100d-e46c-46f9-9bc0-9e9794e3de2b" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="602c1b50-9b88-4e35-b52e-a66afa3f7b05" data-file-name="app/page.tsx">
                The all-in-one platform for collecting, searching and rediscovering your saved content.
              </span></p>
            </div>

            <div data-unique-id="c67f893c-bccc-4602-9d2f-1fcb692b32fb" data-file-name="app/page.tsx">
              <h4 className="font-medium mb-4" data-unique-id="69f49d5c-283a-42ed-a124-c2b633ef646d" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="870dfd42-763e-4b70-9941-deaea952fe4c" data-file-name="app/page.tsx">Product</span></h4>
              <ul className="space-y-2 text-sm text-muted-foreground" data-unique-id="197acb3c-41eb-47a8-8c7f-cfdd79cc27aa" data-file-name="app/page.tsx">
                <li data-unique-id="5351d883-68e4-4369-b924-beb647852f55" data-file-name="app/page.tsx"><Link href="#features" className="hover:text-primary transition-colors" data-unique-id="a26c2316-5191-45ff-954d-e366fa1978ca" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="dd85a881-3434-4457-9fde-c8c407735e4c" data-file-name="app/page.tsx">Features</span></Link></li>
                <li data-unique-id="5a54ae61-37db-4b72-8346-183ed9568534" data-file-name="app/page.tsx"><Link href="#pricing" className="hover:text-primary transition-colors" data-unique-id="2c184410-ab69-4c0e-89c8-a0e564b172c2" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="179189a0-fca5-473f-9ea0-5beeca6548d8" data-file-name="app/page.tsx">Pricing</span></Link></li>
                <li data-unique-id="a8cfaf33-479f-4cdb-9e45-3ec5558685f5" data-file-name="app/page.tsx"><Link href="/dashboard" className="hover:text-primary transition-colors" data-unique-id="60f6d4c8-d0fd-4eb6-9fcb-ad2cc2a2a5cd" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="951497c8-9a14-4398-8ac6-4f83d48c6772" data-file-name="app/page.tsx">Dashboard</span></Link></li>
                <li data-unique-id="fe44dcbb-9d03-4463-a429-48091de43231" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="27d2843c-2348-4db6-9a84-6f4c03b64bd7" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="42438f3e-fd6c-4608-89d7-0366092882c3" data-file-name="app/page.tsx">Integrations</span></Link></li>
                <li data-unique-id="0056e6e7-6bca-4834-a7f6-21e454951813" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="5e63922e-f339-4ca4-afe1-a3c0c95f422a" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="e7f69df3-93e2-45dd-91cb-29da3c89b90d" data-file-name="app/page.tsx">Changelog</span></Link></li>
              </ul>
            </div>

            <div data-unique-id="3e2f4f06-6649-43cb-9a75-18050b3c34fd" data-file-name="app/page.tsx">
              <h4 className="font-medium mb-4" data-unique-id="343e422a-9045-46ac-b8d6-29ff7620469b" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="2e8eb247-6d7c-4e60-bcdf-7e0d1d09054b" data-file-name="app/page.tsx">Resources</span></h4>
              <ul className="space-y-2 text-sm text-muted-foreground" data-unique-id="c832091a-2fda-4a2b-93e5-64797ec10bc1" data-file-name="app/page.tsx">
                <li data-unique-id="559f10e2-26a5-482c-822e-bc5654cb9384" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="2b6f1680-e169-4178-8379-1bd3bcf3a2a5" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="5cd1ff8e-eea4-4032-8df3-f87b236fd0bf" data-file-name="app/page.tsx">Documentation</span></Link></li>
                <li data-unique-id="cafa9997-cf20-427b-bf75-aa6e9412f5d6" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="42d09120-9ba6-4073-99a2-c925610c0c4f" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="c988c374-1bd8-4527-9ebd-2a719835ea04" data-file-name="app/page.tsx">API</span></Link></li>
                <li data-unique-id="ca08c40c-7dc4-41f8-b1ed-71903139f83b" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="66604e48-8a9b-4205-9d30-edb47649d21d" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="2fadb957-3190-4a4d-b9be-76e3b6dfabf9" data-file-name="app/page.tsx">Guides</span></Link></li>
                <li data-unique-id="2962e33b-f39d-47ab-bf14-7f9f6a7f427b" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="6916442c-ddd1-4d67-acd3-943c74821aab" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="cd3819b7-3d8e-4af8-b85d-b12e12a84830" data-file-name="app/page.tsx">Help Center</span></Link></li>
              </ul>
            </div>

            <div data-unique-id="0e2d929e-8164-4a3b-8954-0f1d48afb0db" data-file-name="app/page.tsx">
              <h4 className="font-medium mb-4" data-unique-id="dbd9def1-75e7-45e4-b649-7940837e2237" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="655374f3-3ba0-4cdb-a488-ec5d0a763dc4" data-file-name="app/page.tsx">Company</span></h4>
              <ul className="space-y-2 text-sm text-muted-foreground" data-unique-id="84192259-04d4-4fe0-9168-67177e5fe9b4" data-file-name="app/page.tsx">
                <li data-unique-id="f722536a-96e3-45db-8525-aa59db9943b2" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="5dced395-9ad8-4d8c-a606-722a54e7ed26" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="a2afae6b-2924-47a1-b5d9-6fb368bbcc90" data-file-name="app/page.tsx">About</span></Link></li>
                <li data-unique-id="4f31dfd4-8cfd-4126-9536-94abd0476baa" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="1880d608-28c1-4932-8112-41bedf830712" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="0d03788e-272c-4368-bdb1-353907631bec" data-file-name="app/page.tsx">Blog</span></Link></li>
                <li data-unique-id="167bba8b-8a83-4b03-9230-bfc8b3191a72" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="16b3bffd-e427-4fe7-a7dd-7fdb1f34fdfe" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="f7157c2f-4aea-4866-9386-be4a12f4f643" data-file-name="app/page.tsx">Careers</span></Link></li>
                <li data-unique-id="8a36f61b-79a8-4a7c-a8aa-9388197e8689" data-file-name="app/page.tsx"><Link href="#" className="hover:text-primary transition-colors" data-unique-id="5f8637ce-299b-4455-86ea-7b1cb008674e" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="9695eab4-926b-44fc-8bbf-82a623b5a903" data-file-name="app/page.tsx">Contact</span></Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center" data-unique-id="db43a70b-40ae-4b75-91ab-2f27b218835f" data-file-name="app/page.tsx">
            <div className="text-sm text-muted-foreground" data-unique-id="c1945dc8-c0f5-4790-836d-da3dcd8f783e" data-file-name="app/page.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="0254ddb5-f431-4b30-a759-3eaffd9c0d08" data-file-name="app/page.tsx">
              © </span>{new Date().getFullYear()}<span className="editable-text" data-unique-id="7f2924f8-f659-49a7-93ef-081550ad3b8a" data-file-name="app/page.tsx"> SKOOP. All rights reserved.
            </span></div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0" data-unique-id="9920dc14-907b-4496-82a7-1251ae67b3dc" data-file-name="app/page.tsx">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors" data-unique-id="e757d300-4a89-4f27-8c55-ef9e11dbea3a" data-file-name="app/page.tsx">
                <span className="sr-only" data-unique-id="a218ba01-58a5-4449-9e7f-1a963103637b" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="1c3a8ab7-e2e3-4cb2-919f-ad2e5d0aaed2" data-file-name="app/page.tsx">Twitter</span></span>
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors" data-unique-id="ea735f97-bad1-473d-b316-4c5afb91fc3e" data-file-name="app/page.tsx">
                <span className="sr-only" data-unique-id="cbdd2489-76de-43f3-8750-53f4b6c36bac" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="fb28bdb0-acdf-4833-b45b-61dbef21a177" data-file-name="app/page.tsx">GitHub</span></span>
                <Github className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>;
}