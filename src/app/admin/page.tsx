import Link from 'next/link'
import { Send, Users, Settings, BarChart3 } from 'lucide-react'

export default function AdminDashboard() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage SKOOP platform settings and user requests</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Telegram Management */}
        <Link href="/admin/telegram" className="group">
          <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Send className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="ml-3 text-lg font-semibold text-gray-900">Telegram Management</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Manage Telegram session strings, process user requests, and handle MTProto authentication.
            </p>
            <div className="text-sm text-blue-600 group-hover:text-blue-700">
              Manage Telegram →
            </div>
          </div>
        </Link>

        {/* User Management - Coming Soon */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 opacity-60">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Users className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="ml-3 text-lg font-semibold text-gray-500">User Management</h3>
          </div>
          <p className="text-gray-500 mb-4">
            View and manage user accounts, permissions, and activity.
          </p>
          <div className="text-sm text-gray-400">
            Coming Soon
          </div>
        </div>

        {/* Analytics - Coming Soon */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 opacity-60">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-gray-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="ml-3 text-lg font-semibold text-gray-500">Analytics</h3>
          </div>
          <p className="text-gray-500 mb-4">
            View platform usage statistics, user engagement, and performance metrics.
          </p>
          <div className="text-sm text-gray-400">
            Coming Soon
          </div>
        </div>

        {/* System Settings - Coming Soon */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 opacity-60">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Settings className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="ml-3 text-lg font-semibold text-gray-500">System Settings</h3>
          </div>
          <p className="text-gray-500 mb-4">
            Configure platform settings, API keys, and system preferences.
          </p>
          <div className="text-sm text-gray-400">
            Coming Soon
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-8 bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">-</div>
            <div className="text-sm text-gray-600">Total Users</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">-</div>
            <div className="text-sm text-gray-600">Active Connections</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">-</div>
            <div className="text-sm text-gray-600">Pending Requests</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">-</div>
            <div className="text-sm text-gray-600">Total Bookmarks</div>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-4">
          * Statistics will be implemented in future updates
        </p>
      </div>
    </div>
  )
} 