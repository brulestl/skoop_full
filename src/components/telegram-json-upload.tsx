'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Upload, FileText, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

interface TelegramJsonUploadProps {
  onSuccess?: (count: number) => void
}

export function TelegramJsonUpload({ onSuccess }: TelegramJsonUploadProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (!file.name.endsWith('.json')) {
        toast.error('Please select a JSON file')
        return
      }
      setSelectedFile(file)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a file first')
      return
    }

    setIsUploading(true)
    
    try {
      const formData = new FormData()
      formData.append('export', selectedFile)

      const token = localStorage.getItem('supabase.auth.token') || 
                   sessionStorage.getItem('supabase.auth.token') ||
                   document.cookie.split(';').find(c => c.trim().startsWith('sb-'))?.split('=')[1]

      const response = await fetch('/api/upload/telegram-export', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.details || data.error || 'Upload failed')
      }

      toast.success(`Successfully imported ${data.inserted} messages`)
      setIsOpen(false)
      setSelectedFile(null)
      onSuccess?.(data.inserted)

    } catch (error) {
      console.error('Upload error:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to upload file')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Upload className="h-4 w-4" />
          Import JSON Export
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Import Telegram Export
          </DialogTitle>
          <DialogDescription className="text-left">
            Upload a Telegram export JSON file from "Saved Messages". 
            This is useful if you can't provide a session string but have exported your chat history.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="export-file">Select Export File</Label>
            <Input
              id="export-file"
              type="file"
              accept=".json"
              onChange={handleFileSelect}
              disabled={isUploading}
            />
            {selectedFile && (
              <p className="text-sm text-muted-foreground">
                Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
              </p>
            )}
          </div>

          <div className="bg-muted/50 p-3 rounded-lg text-sm">
            <p className="font-medium mb-1">How to export from Telegram:</p>
            <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
              <li>Open Telegram Desktop</li>
              <li>Go to "Saved Messages"</li>
              <li>Click the three dots menu → "Export chat history"</li>
              <li>Choose JSON format and download</li>
              <li>Upload the result.json file here</li>
            </ol>
          </div>

          <div className="flex gap-2 justify-end">
            <Button 
              variant="outline" 
              onClick={() => setIsOpen(false)}
              disabled={isUploading}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleUpload}
              disabled={!selectedFile || isUploading}
              className="gap-2"
            >
              {isUploading && <Loader2 className="h-4 w-4 animate-spin" />}
              {isUploading ? 'Importing...' : 'Import Messages'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

/* TASK 3 ✅ Front-end Upload Flow:
 * - File input with JSON validation
 * - Clear instructions for users
 * - Progress indication during upload
 * - Success/error toast notifications
 * - Calls onSuccess callback for cache invalidation
 */ 