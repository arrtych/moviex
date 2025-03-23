"use client"

import type React from "react"

import { AlertTriangle, CheckCircle, Info, XCircle, Download, Pause, Play, FileText, Save, Trash2 } from "lucide-react"
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast"

export function Toaster() {
  const { toasts } = useToast()

  const getToastIcon = (title?: React.ReactNode, variant?: string) => {
    // Default icons based on variant
    if (variant === "destructive") return <XCircle className="h-5 w-5 text-destructive mr-2" />
    if (variant === "default") return <CheckCircle className="h-5 w-5 text-green-500 mr-2" />

    // Specific icons based on title
    if (typeof title === "string") {
      const titleLower = title.toLowerCase()
      if (titleLower.includes("download")) return <Download className="h-5 w-5 text-blue-500 mr-2" />
      if (titleLower.includes("paused")) return <Pause className="h-5 w-5 text-amber-500 mr-2" />
      if (titleLower.includes("resumed")) return <Play className="h-5 w-5 text-green-500 mr-2" />
      if (titleLower.includes("file")) return <FileText className="h-5 w-5 text-blue-500 mr-2" />
      if (titleLower.includes("saved") || titleLower.includes("settings"))
        return <Save className="h-5 w-5 text-green-500 mr-2" />
      if (titleLower.includes("deleted") || titleLower.includes("removed"))
        return <Trash2 className="h-5 w-5 text-red-500 mr-2" />
      if (titleLower.includes("error")) return <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
    }

    // Default fallback
    return <Info className="h-5 w-5 text-blue-500 mr-2" />
  }

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, variant, ...props }) => (
        <Toast key={id} {...props} variant={variant}>
          <div className="grid gap-1">
            {title && (
              <ToastTitle className="flex items-center">
                {getToastIcon(title, variant)}
                {title}
              </ToastTitle>
            )}
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>
          {action}
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  )
}

