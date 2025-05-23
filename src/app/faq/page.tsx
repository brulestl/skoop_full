import Link from 'next/link';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Faq } from '@/components/faq';
export const metadata = {
  title: "FAQ | SKOOP",
  description: "Frequently asked questions about using SKOOP to manage your saved content"
};
export default function FaqPage() {
  // FAQ data
  const faqs = [{
    question: "What is SKOOP?",
    answer: "SKOOP is a unified platform that helps you collect, search, and rediscover content you've saved across the internet. It connects with platforms like GitHub, X (formerly Twitter), Reddit, and Stack Overflow to bring all your saved items into one searchable space."
  }, {
    question: "How do I get started with SKOOP?",
    answer: "Getting started is easy! Just sign up for a free account, connect your favorite platforms like GitHub or X, and SKOOP will automatically start importing your saved content. Our AI will organize and summarize your content, making it easy to find and use later."
  }, {
    question: "Is my data safe with SKOOP?",
    answer: "Yes, we take data security seriously. All your data is encrypted, and we never share your information with third parties. You can delete your data at any time, and we offer regular data exports so you always have control over your content."
  }, {
    question: "What platforms does SKOOP integrate with?",
    answer: "Currently, SKOOP integrates with GitHub, X (formerly Twitter), Reddit, and Stack Overflow. We're constantly working on adding new integrations based on user feedback."
  }, {
    question: "How does SKOOP's AI summarization work?",
    answer: "Our AI technology analyzes your saved content and generates concise summaries that capture the key points. This makes it easier to quickly understand and recall information without having to re-read the entire content. You can choose between our default Claude AI or switch to OpenAI for summaries."
  }, {
    question: "What's the difference between the free and paid plans?",
    answer: "The free plan lets you save limited content for up to 72 hours and connect 2 platforms. Paid plans offer unlimited saved items, more integrations, advanced semantic search, AI-powered summaries, smart collections, and more frequent syncing. The Power plan adds team collaboration features."
  }, {
    question: "Can I export my data from SKOOP?",
    answer: "Absolutely! SKOOP makes it easy to export your data in common formats like CSV or JSON. You're never locked in, and you can take your organized content with you anytime."
  }, {
    question: "How often does SKOOP sync with connected platforms?",
    answer: "Free accounts sync once daily, Pro accounts sync every 15 minutes, and Power accounts have continuous syncing. You can also manually trigger a sync anytime you want the latest updates."
  }];
  return <div className="min-h-screen flex flex-col" data-unique-id="e55a1d02-1f18-4ac1-b1bf-2f5e10757113" data-file-name="app/faq/page.tsx" data-dynamic-text="true">
      {/* Header */}
      <header className="border-b border-border relative" data-unique-id="06f5121a-2a5c-4499-8d7a-2b9680c85b53" data-file-name="app/faq/page.tsx">
        <div className="skoop-container flex items-center justify-between h-16" data-unique-id="ca102ce4-5c27-4328-b67f-64b37f0c4c57" data-file-name="app/faq/page.tsx">
          <div className="flex items-center" data-unique-id="2e124f9e-5669-41b6-8f00-6f6b00cb8cf3" data-file-name="app/faq/page.tsx">
            <Link href="/" className="logo text-2xl font-bold text-primary" data-unique-id="670e4c2b-15d4-4ca2-917b-efb59fea36ca" data-file-name="app/faq/page.tsx"><span className="editable-text" data-unique-id="b603fecd-c054-4426-bc32-00083f202c08" data-file-name="app/faq/page.tsx">SKOOP</span></Link>
            <nav className="hidden ml-12 space-x-6 md:flex" data-unique-id="0e7c22e4-376b-40e9-b736-bef631b8d6b7" data-file-name="app/faq/page.tsx">
              <Link href="/#features" className="text-foreground hover:text-primary transition-colors" data-unique-id="5fd82b75-53e0-49e2-addf-d5a66965ec40" data-file-name="app/faq/page.tsx"><span className="editable-text" data-unique-id="789df587-a356-4409-a258-fdc3ab62541f" data-file-name="app/faq/page.tsx">Features</span></Link>
              <Link href="/#pricing" className="text-foreground hover:text-primary transition-colors" data-unique-id="543cc94f-b78a-4245-9c83-794ba7b3bdd9" data-file-name="app/faq/page.tsx"><span className="editable-text" data-unique-id="55799879-39b5-4998-b420-6d9481658fb9" data-file-name="app/faq/page.tsx">Pricing</span></Link>
              <Link href="/faq" className="text-primary font-medium" data-unique-id="f1c19e1e-2165-43ce-9385-bb0a9cbc4da3" data-file-name="app/faq/page.tsx"><span className="editable-text" data-unique-id="40ef388d-7ab0-4a3e-8400-45a7f7841ab3" data-file-name="app/faq/page.tsx">FAQ</span></Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4" data-unique-id="fd97a654-66e2-49f0-a834-9f4e23107c3c" data-file-name="app/faq/page.tsx">
            <Link href="/login" className="text-foreground hover:text-primary transition-colors" data-unique-id="01f709bc-7bfe-4c34-bd41-ce6f6fa23ead" data-file-name="app/faq/page.tsx"><span className="editable-text" data-unique-id="17cf3cc0-4c24-4aa4-95ab-8b51ba20a246" data-file-name="app/faq/page.tsx">Log in</span></Link>
            <Button className="skoop-button-accent" data-unique-id="360ce73f-f051-474c-8e99-7b8b09559987" data-file-name="app/faq/page.tsx"><span className="editable-text" data-unique-id="c2df68c4-1abf-417b-bbe4-a1ed62140c45" data-file-name="app/faq/page.tsx">Sign Up Free</span></Button>
          </div>
        </div>
      </header>

      <main className="flex-grow" data-unique-id="c7ab6193-99b3-40d0-ad28-2d90d315e976" data-file-name="app/faq/page.tsx" data-dynamic-text="true">
        {/* Hero Section */}
        <section className="py-12 bg-secondary bg-opacity-30" data-unique-id="f98422da-92c4-4e2b-96b1-d557fa6f6992" data-file-name="app/faq/page.tsx">
          <div className="skoop-container" data-unique-id="11942d8f-3f94-45ae-ae76-1a18ccf630a1" data-file-name="app/faq/page.tsx">
            <div className="max-w-3xl mx-auto text-center" data-unique-id="12ef112a-34a5-4844-83fb-792211a86e57" data-file-name="app/faq/page.tsx">
              <h1 className="text-3xl font-bold mb-4" data-unique-id="071d9c24-133e-431d-a049-056f1cf04162" data-file-name="app/faq/page.tsx"><span className="editable-text" data-unique-id="01818c05-2d38-47e8-923b-f9f18ad49a14" data-file-name="app/faq/page.tsx">Frequently Asked Questions</span></h1>
              <p className="text-lg text-muted-foreground" data-unique-id="e7919709-618b-4ee3-a414-f3b5515c9f67" data-file-name="app/faq/page.tsx"><span className="editable-text" data-unique-id="52eda845-6b6f-4bc1-8825-105fd01ef066" data-file-name="app/faq/page.tsx">
                Find answers to common questions about SKOOP and how it can help you manage your digital knowledge.
              </span></p>
            </div>
          </div>
        </section>

        {/* FAQ Content Section */}
        <section className="py-16" data-unique-id="d8e54b5c-c237-443c-916a-a82102f1707a" data-file-name="app/faq/page.tsx">
          <div className="skoop-container" data-unique-id="39e063bc-c0a5-4f87-b5a9-f4d717783b76" data-file-name="app/faq/page.tsx">
            <div className="max-w-3xl mx-auto" data-unique-id="4a5c7389-e27f-48f5-bdd0-69b29bde277c" data-file-name="app/faq/page.tsx">
              <Faq items={faqs} />
              
              <div className="mt-16 bg-muted/30 border border-border rounded-lg p-6 text-center" data-unique-id="418024d8-5ee0-4eea-95b0-0098b3517ce8" data-file-name="app/faq/page.tsx">
                <h2 className="text-xl font-semibold mb-2" data-unique-id="e1430d21-4ce6-4fe8-9e1f-e5cd7de1b4af" data-file-name="app/faq/page.tsx"><span className="editable-text" data-unique-id="6d8dfc7b-6c15-4f44-a67e-5f3ccf47bccb" data-file-name="app/faq/page.tsx">Still have questions?</span></h2>
                <p className="text-muted-foreground mb-4" data-unique-id="7d2977e2-8e2c-4401-8be5-5066be83681a" data-file-name="app/faq/page.tsx"><span className="editable-text" data-unique-id="89b10de7-c7f3-4dde-9ef8-d283305660b7" data-file-name="app/faq/page.tsx">
                  Our support team is ready to help you with any other questions you might have.
                </span></p>
                <Button className="skoop-button-primary" data-unique-id="2d37f7e9-d533-45b7-89b7-f988a998bb4c" data-file-name="app/faq/page.tsx"><span className="editable-text" data-unique-id="16c56dda-cbe1-4dcf-81ed-6833faf6ed2e" data-file-name="app/faq/page.tsx">
                  Contact Support
                </span></Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-secondary bg-opacity-30 border-t border-border py-12" data-unique-id="0a39e5db-3761-4486-8f71-a85717ca83cc" data-file-name="app/faq/page.tsx">
        <div className="skoop-container" data-unique-id="4ebf7662-149c-4a6f-be80-99e108abf5b4" data-file-name="app/faq/page.tsx">
          <div className="grid gap-8 md:grid-cols-4" data-unique-id="6cfd7554-5b0a-44af-a0c3-5ce525ccf875" data-file-name="app/faq/page.tsx">
            <div data-unique-id="81a44296-9a44-4523-8e63-7fdc758a0db0" data-file-name="app/faq/page.tsx">
              <div className="text-2xl font-bold text-primary mb-4" data-unique-id="df0d2172-bacb-4e2a-adaa-f86fb16f6eeb" data-file-name="app/faq/page.tsx"><span className="editable-text" data-unique-id="c7f44309-3758-4cdc-813b-c38e47a439c7" data-file-name="app/faq/page.tsx">SKOOP</span></div>
              <p className="text-muted-foreground text-sm" data-unique-id="16d3de4c-3196-498f-9243-e44b25e27db3" data-file-name="app/faq/page.tsx"><span className="editable-text" data-unique-id="578e168a-78f3-4669-82ce-b4ecd3ecca37" data-file-name="app/faq/page.tsx">
                The all-in-one platform for collecting, searching and rediscovering your saved content.
              </span></p>
            </div>

            <div data-unique-id="0fcd33fb-b4b3-49be-afd1-3af8eb387358" data-file-name="app/faq/page.tsx">
              <h4 className="font-medium mb-4" data-unique-id="7bab9b9d-5901-4d8e-8c11-fc782a7638ac" data-file-name="app/faq/page.tsx"><span className="editable-text" data-unique-id="435bf65a-0fe4-4758-b06e-9feb68f33ba8" data-file-name="app/faq/page.tsx">Product</span></h4>
              <ul className="space-y-2 text-sm text-muted-foreground" data-unique-id="3e61cd3a-4e0c-4e88-9d0d-4a6fd8125f98" data-file-name="app/faq/page.tsx">
                <li data-unique-id="7e881b8b-1c1d-4405-85e4-6e0f383a4b99" data-file-name="app/faq/page.tsx"><Link href="/#features" className="hover:text-primary transition-colors" data-unique-id="33084fdd-d63c-40fb-a9c6-26dc79638d1f" data-file-name="app/faq/page.tsx"><span className="editable-text" data-unique-id="2ed78267-e0df-4727-960f-1066a776c6d4" data-file-name="app/faq/page.tsx">Features</span></Link></li>
                <li data-unique-id="de68b6c7-6059-49ac-aa3e-018f0db53a44" data-file-name="app/faq/page.tsx"><Link href="/#pricing" className="hover:text-primary transition-colors" data-unique-id="5a8c44c8-f812-4fe6-b113-a8657c042794" data-file-name="app/faq/page.tsx"><span className="editable-text" data-unique-id="86f880dd-1bf6-4df4-957d-ee5c312ca104" data-file-name="app/faq/page.tsx">Pricing</span></Link></li>
                <li data-unique-id="046f59c6-0a53-4fbd-9c46-30a029283ee8" data-file-name="app/faq/page.tsx"><Link href="/dashboard" className="hover:text-primary transition-colors" data-unique-id="48828d4e-4b26-470e-b8a1-79c8477363cf" data-file-name="app/faq/page.tsx"><span className="editable-text" data-unique-id="6fff00c1-bede-43ab-b80c-6fd08e02e34d" data-file-name="app/faq/page.tsx">Dashboard</span></Link></li>
                <li data-unique-id="f9f53a89-58ec-4838-9d68-2ee32f7af384" data-file-name="app/faq/page.tsx"><Link href="/faq" className="hover:text-primary transition-colors" data-unique-id="b90ddff8-3da1-4a25-b478-fc15f9624076" data-file-name="app/faq/page.tsx"><span className="editable-text" data-unique-id="e0f36834-b349-4287-ba34-be6cb99e4b4f" data-file-name="app/faq/page.tsx">FAQ</span></Link></li>
              </ul>
            </div>

            <div data-unique-id="187cc37b-2c23-4605-b73f-74656c70ead5" data-file-name="app/faq/page.tsx">
              <h4 className="font-medium mb-4" data-unique-id="52f1e8e5-54df-456a-bc47-343d8b5a9d92" data-file-name="app/faq/page.tsx"><span className="editable-text" data-unique-id="d73269da-4b91-42d7-ba31-9349b5f6aa86" data-file-name="app/faq/page.tsx">Legal</span></h4>
              <ul className="space-y-2 text-sm text-muted-foreground" data-unique-id="2231a44e-2254-44d6-93c8-38e64f87de22" data-file-name="app/faq/page.tsx">
                <li data-unique-id="9f66578d-ecce-40fb-9e40-d8b62b39e402" data-file-name="app/faq/page.tsx"><Link href="/privacy" className="hover:text-primary transition-colors" data-unique-id="396875f3-fc56-4858-8195-6651a49d9291" data-file-name="app/faq/page.tsx"><span className="editable-text" data-unique-id="dc9e2124-da82-46fa-91a2-3cfc3a640d98" data-file-name="app/faq/page.tsx">Privacy Policy</span></Link></li>
                <li data-unique-id="fa5869c8-43d9-468f-a6a8-edb6bc532728" data-file-name="app/faq/page.tsx"><Link href="/terms" className="hover:text-primary transition-colors" data-unique-id="1698cbc6-a8ee-4b50-8494-9489d11bc8ab" data-file-name="app/faq/page.tsx"><span className="editable-text" data-unique-id="f36913f0-af55-4a23-9d5e-55f9d29980fa" data-file-name="app/faq/page.tsx">Terms of Service</span></Link></li>
                <li data-unique-id="299f2c8f-8415-4217-bb2f-532f23cc683a" data-file-name="app/faq/page.tsx"><Link href="/cookies" className="hover:text-primary transition-colors" data-unique-id="5e9520a7-4d66-4e0d-af5b-4d663a24bc3f" data-file-name="app/faq/page.tsx"><span className="editable-text" data-unique-id="5b199a19-0421-4c86-8272-c5151d0265de" data-file-name="app/faq/page.tsx">Cookie Policy</span></Link></li>
              </ul>
            </div>

            <div data-unique-id="c8cd7af5-aaa4-46ab-aae5-8e64d1d515a5" data-file-name="app/faq/page.tsx">
              <h4 className="font-medium mb-4" data-unique-id="e0566203-f3e3-430c-90ab-fc95d4b63f6d" data-file-name="app/faq/page.tsx"><span className="editable-text" data-unique-id="b8d779eb-3757-4e67-bbfa-5dc5e128b3b9" data-file-name="app/faq/page.tsx">Company</span></h4>
              <ul className="space-y-2 text-sm text-muted-foreground" data-unique-id="c09475e8-32f6-42f5-a182-15233fb48ea7" data-file-name="app/faq/page.tsx">
                <li data-unique-id="50559ada-4e29-40fc-8ec3-5f0a2fcff786" data-file-name="app/faq/page.tsx"><Link href="/about" className="hover:text-primary transition-colors" data-unique-id="f7655d93-a035-47d1-8955-7ea5918fed9c" data-file-name="app/faq/page.tsx"><span className="editable-text" data-unique-id="da56848c-e35a-4d5e-821f-ec1b04e52fc4" data-file-name="app/faq/page.tsx">About</span></Link></li>
                <li data-unique-id="b51f4b05-7d7d-458a-b2ee-d7e7ac396657" data-file-name="app/faq/page.tsx"><Link href="/contact" className="hover:text-primary transition-colors" data-unique-id="acbf4531-e8b8-422c-a8f6-3e9a1554c196" data-file-name="app/faq/page.tsx"><span className="editable-text" data-unique-id="f41fbe64-5664-4e9a-8a73-3fc0ac24310d" data-file-name="app/faq/page.tsx">Contact</span></Link></li>
                <li data-unique-id="ce887576-5e76-472d-9388-55f88fac1692" data-file-name="app/faq/page.tsx"><Link href="/careers" className="hover:text-primary transition-colors" data-unique-id="32aa5780-9748-4771-8ddc-ffa618e0ae43" data-file-name="app/faq/page.tsx"><span className="editable-text" data-unique-id="f5b935b4-56ba-4bb6-9640-39ec58e687de" data-file-name="app/faq/page.tsx">Careers</span></Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground" data-unique-id="25cc0934-405e-4ddb-afae-fd15e464a60a" data-file-name="app/faq/page.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="e0226f6f-b6e5-489e-9a0f-62f7a00ab320" data-file-name="app/faq/page.tsx">
            © </span>{new Date().getFullYear()}<span className="editable-text" data-unique-id="6979e8be-9450-4efc-8e4c-4ccf9f4f3b46" data-file-name="app/faq/page.tsx"> SKOOP. All rights reserved.
          </span></div>
        </div>
      </footer>
    </div>;
}