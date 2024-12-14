"use client"

import * as React from "react"
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface ChatInputProps {
  onSend: (message: string) => void
  onCancelEdit?: () => void
  editMessage?: {
    id: string
    content: string
    sender: string
  } | null
  message: string
  setMessage: (message: string) => void
}

export function ChatInput({ onSend, onCancelEdit, editMessage, message, setMessage }: ChatInputProps) {
  
  React.useEffect(() => {
    if (editMessage) {
      setMessage(editMessage.content)
    }
  }, [editMessage])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      onSend(message)
      setMessage("")
    }
  }

  return (
    <div className="relative w-full">
      {editMessage && (
        <div className="absolute bottom-full left-0 right-0 mb-2 flex items-center gap-2 rounded-lg bg-muted/80 p-2 backdrop-blur-sm">
          <div className="flex-1 text-sm">
            <span className="mr-2 font-medium text-primary">{editMessage.sender}</span>
            <span className="text-muted-foreground">{editMessage.content}</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5 rounded-full"
            onClick={onCancelEdit}
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Cancel edit</span>
          </Button>
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex items-end gap-2">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          className="min-h-[48px] resize-none rounded-lg p-2"
          rows={1}
        />
        <Button type="submit" size="icon" className="shrink-0">
          Send
        </Button>
      </form>
    </div>
  )
}

