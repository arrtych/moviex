"use client"

import { useState } from "react"

interface TagCloudProps {
  tags: string[]
  onTagClick?: (tag: string) => void
  selectedTags?: string[]
}

export default function TagCloud({ tags, onTagClick, selectedTags = [] }: TagCloudProps) {
  const [hoveredTag, setHoveredTag] = useState<string | null>(null)

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => {
        const isSelected = selectedTags.includes(tag)
        const isHovered = hoveredTag === tag

        return (
          <button
            key={tag}
            className={`tag transition-all duration-200 ${
              isSelected
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : isHovered
                  ? "bg-secondary/80"
                  : "bg-secondary"
            }`}
            onClick={() => onTagClick?.(tag)}
            onMouseEnter={() => setHoveredTag(tag)}
            onMouseLeave={() => setHoveredTag(null)}
          >
            {tag}
          </button>
        )
      })}
    </div>
  )
}

