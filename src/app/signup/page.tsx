import { Suspense } from 'react';
import SignupForm from '@/components/auth/signup-form';
import Link from 'next/link';
export const metadata = {
  title: "Sign Up | SKOOP",
  description: "Create your SKOOP account to collect and organize your digital content"
};
export default function SignupPage() {
  return <div className="min-h-screen flex flex-col" data-unique-id="7be420fe-4903-4d26-992e-77a76845a076" data-file-name="app/signup/page.tsx" data-dynamic-text="true">
      {/* Header */}
      <header className="border-b border-border h-16" data-unique-id="9273303d-9320-4fa9-a2a3-bffc3d9f87c1" data-file-name="app/signup/page.tsx">
        <div className="skoop-container h-full flex items-center" data-unique-id="1c9ffca7-d870-469d-b3a0-3a1ddc9610d9" data-file-name="app/signup/page.tsx">
          <Link href="/" className="logo text-2xl font-bold text-primary" data-unique-id="7afa49bd-dcfa-480b-8fcc-ed0cf2a2a728" data-file-name="app/signup/page.tsx"><span className="editable-text" data-unique-id="6b882655-4596-45bc-9a84-b0b81236135e" data-file-name="app/signup/page.tsx">SKOOP</span></Link>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center py-10" data-unique-id="52193774-2ed5-4061-8955-4f51466a14aa" data-file-name="app/signup/page.tsx">
        <div className="w-full max-w-md" data-unique-id="931dc836-0dc5-47f2-9a4b-407a54905feb" data-file-name="app/signup/page.tsx">
          <div className="text-center mb-8" data-unique-id="e2cfe84b-43ba-4ea0-9c6a-640040c0db4f" data-file-name="app/signup/page.tsx">
            <h1 className="text-3xl font-bold mb-2" data-unique-id="22f20ca4-0ee5-4c05-bcc6-a1e1e087a388" data-file-name="app/signup/page.tsx"><span className="editable-text" data-unique-id="bd910c74-ec5d-4d06-aa14-b90e8ac6f1ed" data-file-name="app/signup/page.tsx">Create your account</span></h1>
            <p className="text-muted-foreground" data-unique-id="2fab6e75-2bcc-465b-83c7-98c32069fe9e" data-file-name="app/signup/page.tsx"><span className="editable-text" data-unique-id="228cca1f-988d-42e6-9029-ade46d041896" data-file-name="app/signup/page.tsx">Join SKOOP to organize your digital knowledge</span></p>
          </div>
          
          <Suspense fallback={<div className="p-8 text-center" data-unique-id="11fb5c2b-84c3-418c-85d3-15eccc0e2695" data-file-name="app/signup/page.tsx"><span className="editable-text" data-unique-id="c0ba52cd-908d-40b9-bdb9-8ed16945a5bd" data-file-name="app/signup/page.tsx">Loading...</span></div>}>
            <SignupForm />
          </Suspense>
        </div>
      </main>

      <footer className="py-6 border-t border-border" data-unique-id="d94ec52f-fdac-4994-b915-b818acebc621" data-file-name="app/signup/page.tsx">
        <div className="skoop-container text-center text-sm text-muted-foreground" data-unique-id="fe06dfe1-1dcc-42d8-8e49-f9619b4ece59" data-file-name="app/signup/page.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="6febc0ae-3732-4e80-9b49-71218b1faad0" data-file-name="app/signup/page.tsx">
          © </span>{new Date().getFullYear()}<span className="editable-text" data-unique-id="be80a495-cf6c-43bd-bdac-24d25a07a768" data-file-name="app/signup/page.tsx"> SKOOP. All rights reserved.
        </span></div>
      </footer>
    </div>;
}