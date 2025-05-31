import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Send, Link as LinkIcon, Image, File, MessageSquare } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface TelegramBookmarkCardProps {
  bookmark: {
    id: string;
    title: string;
    description?: string | null;
    url: string;
    tags: string[] | null;
    created_at: string;
    metadata?: {
      telegram_message_id?: string;
      message_date?: string;
      has_media?: boolean;
      media_type?: string;
      file_name?: string;
      file_size?: number;
      character_count?: number;
      extracted_url?: string;
    };
  };
  onOpen?: () => void;
  className?: string;
}

export function TelegramBookmarkCard({ bookmark, onOpen, className = '' }: TelegramBookmarkCardProps) {
  const metadata = bookmark.metadata || {};
  const hasMedia = metadata.has_media;
  const hasExtractedUrl = metadata.extracted_url;
  const messageDate = metadata.message_date || bookmark.created_at;
  
  // Truncate description to 2 lines (approximately 120 characters)
  const truncatedDescription = bookmark.description && bookmark.description.length > 120
    ? bookmark.description.substring(0, 120) + '...'
    : bookmark.description;
  
  // Get hostname from URL for display
  const getHostname = (url: string) => {
    try {
      return new URL(url).hostname;
    } catch {
      return url;
    }
  };
  
  // Get media type icon
  const getMediaIcon = () => {
    if (!hasMedia) return null;
    
    const mediaType = metadata.media_type?.toLowerCase() || '';
    
    if (mediaType.includes('photo') || mediaType.includes('image')) {
      return <Image className="h-4 w-4" />;
    }
    if (mediaType.includes('video')) {
      return <File className="h-4 w-4" />; // You might want a video icon
    }
    if (mediaType.includes('document')) {
      return <File className="h-4 w-4" />;
    }
    
    return <File className="h-4 w-4" />;
  };

  return (
    <Card 
      className={`hover:shadow-lg transition-shadow cursor-pointer ${className}`}
      onClick={onOpen}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <div className="flex-shrink-0">
              <Send className="h-5 w-5 text-blue-500" /> {/* TelegramIcon equivalent */}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-sm leading-tight line-clamp-2 break-words">
                {bookmark.title}
              </h3>
              <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                <span>Telegram</span>
                <span>•</span>
                <span>{formatDistanceToNow(new Date(messageDate), { addSuffix: true })}</span>
                {metadata.character_count && (
                  <>
                    <span>•</span>
                    <span>{metadata.character_count} chars</span>
                  </>
                )}
              </div>
            </div>
          </div>
          
          {/* Media indicator */}
          {hasMedia && (
            <div className="flex-shrink-0">
              <Badge variant="secondary" className="text-xs">
                <span className="flex items-center gap-1">
                  {getMediaIcon()}
                  Media
                </span>
              </Badge>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        {/* Description (message text) */}
        {truncatedDescription && (
          <div className="mb-3">
            <p className="text-sm text-muted-foreground line-clamp-2 break-words">
              {truncatedDescription}
            </p>
          </div>
        )}
        
        {/* Extracted URL */}
        {hasExtractedUrl && (
          <div className="mb-3 p-2 bg-muted rounded-md">
            <div className="flex items-center gap-2 text-sm">
              <LinkIcon className="h-4 w-4 text-blue-500 flex-shrink-0" />
              <span className="text-blue-600 hover:text-blue-800 font-medium truncate">
                {getHostname(metadata.extracted_url!)}
              </span>
            </div>
          </div>
        )}
        
        {/* File info */}
        {hasMedia && metadata.file_name && (
          <div className="mb-3 p-2 bg-muted rounded-md">
            <div className="flex items-center gap-2 text-sm">
              {getMediaIcon()}
              <span className="font-medium truncate">{metadata.file_name}</span>
              {metadata.file_size && (
                <span className="text-muted-foreground text-xs">
                  ({(metadata.file_size / 1024 / 1024).toFixed(1)} MB)
                </span>
              )}
            </div>
          </div>
        )}
        
        {/* Tags */}
        {bookmark.tags && bookmark.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {bookmark.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {bookmark.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{bookmark.tags.length - 3} more
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default TelegramBookmarkCard; 