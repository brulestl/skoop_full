import React from 'react';
import { Send, MessageSquare, Plus } from 'lucide-react';

interface TelegramEmptyStateProps {
  className?: string;
}

export function TelegramEmptyState({ className = '' }: TelegramEmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}>
      <div className="relative mb-6">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
          <Send className="w-8 h-8 text-blue-500" />
        </div>
        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
          <MessageSquare className="w-3 h-3 text-gray-500" />
        </div>
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        No Telegram bookmarks yet
      </h3>
      
      <p className="text-gray-600 mb-6 max-w-md">
        Save messages in Telegram to see them here. Your saved messages will automatically sync and appear in your dashboard.
      </p>
      
      <div className="space-y-2 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          <span>Save messages in Telegram</span>
        </div>
        <div className="flex items-center gap-2">
          <Send className="w-4 h-4" />
          <span>Click "Sync Telegram" to fetch them</span>
        </div>
      </div>
    </div>
  );
}

export default TelegramEmptyState; 