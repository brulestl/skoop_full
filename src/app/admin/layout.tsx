import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Panel | SKOOP',
  description: 'Administrative interface for SKOOP platform management',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-gray-900">SKOOP Admin</h1>
            <nav className="flex space-x-4">
              <a 
                href="/admin/telegram" 
                className="text-sm text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-100"
              >
                Telegram
              </a>
              {/* Add more admin sections here as needed */}
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <a 
              href="/dashboard" 
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              ← Back to Dashboard
            </a>
          </div>
        </div>
      </div>
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
} 