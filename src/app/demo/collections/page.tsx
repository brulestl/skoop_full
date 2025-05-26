import Collections from '@/components/dashboard/collections';

export default function CollectionsDemoPage() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Collections Demo</h1>
          <p className="text-muted-foreground">
            Test the collections functionality with real database integration.
          </p>
        </div>
        <Collections />
      </div>
    </div>
  );
} 