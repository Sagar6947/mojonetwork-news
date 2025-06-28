"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bold, Italic, Underline, List, ListOrdered, Link, ImageIcon, Quote, Code, Eye, Edit } from "lucide-react"
import { cn } from "@/lib/utils"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function RichTextEditor({ value, onChange, placeholder, className }: RichTextEditorProps) {
  const [activeTab, setActiveTab] = useState("write")

  const insertText = (before: string, after = "") => {
    const textarea = document.getElementById("content-editor") as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end)

    onChange(newText)

    // Restore cursor position
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length)
    }, 0)
  }

  const formatButtons = [
    { icon: Bold, label: "Bold", action: () => insertText("**", "**") },
    { icon: Italic, label: "Italic", action: () => insertText("*", "*") },
    { icon: Underline, label: "Underline", action: () => insertText("<u>", "</u>") },
    { icon: List, label: "Bullet List", action: () => insertText("\n- ", "") },
    { icon: ListOrdered, label: "Numbered List", action: () => insertText("\n1. ", "") },
    { icon: Link, label: "Link", action: () => insertText("[", "](url)") },
    { icon: ImageIcon, label: "Image", action: () => insertText("![alt text](", ")") },
    { icon: Quote, label: "Quote", action: () => insertText("\n> ", "") },
    { icon: Code, label: "Code", action: () => insertText("`", "`") },
  ]

  const renderPreview = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/<u>(.*?)<\/u>/g, "<u>$1</u>")
      .replace(/`(.*?)`/g, "<code class='bg-gray-100 px-1 rounded'>$1</code>")
      .replace(/^> (.*$)/gm, "<blockquote class='border-l-4 border-gray-300 pl-4 italic'>$1</blockquote>")
      .replace(/^- (.*$)/gm, "<li>$1</li>")
      .replace(/^(\d+)\. (.*$)/gm, "<li>$1. $2</li>")
      .replace(/\[([^\]]+)\]$$([^)]+)$$/g, "<a href='$2' class='text-blue-600 underline'>$1</a>")
      .replace(/!\[([^\]]*)\]$$([^)]+)$$/g, "<img src='$2' alt='$1' class='max-w-full h-auto' />")
      .replace(/\n/g, "<br />")
  }

  return (
    <div className={cn("border rounded-lg", className)}>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between border-b px-3 py-2">
          <div className="flex items-center gap-1">
            {formatButtons.map((button, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                onClick={button.action}
                title={button.label}
                className="h-8 w-8 p-0"
              >
                <button.icon className="h-4 w-4" />
              </Button>
            ))}
          </div>
          <TabsList className="grid w-32 grid-cols-2">
            <TabsTrigger value="write" className="text-xs">
              <Edit className="w-3 h-3 mr-1" />
              Write
            </TabsTrigger>
            <TabsTrigger value="preview" className="text-xs">
              <Eye className="w-3 h-3 mr-1" />
              Preview
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="write" className="m-0">
          <Textarea
            id="content-editor"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="min-h-[400px] border-0 focus-visible:ring-0 resize-none"
          />
        </TabsContent>

        <TabsContent value="preview" className="m-0">
          <div
            className="min-h-[400px] p-3 prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: renderPreview(value) }}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
