import { Star } from "lucide-react"

interface RatingDisplayProps {
  imdb: number
  kinopoisk: number
  size?: "sm" | "md" | "lg"
}

export default function RatingDisplay({ imdb, kinopoisk, size = "md" }: RatingDisplayProps) {
  const sizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  }

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  }

  return (
    <div className="flex space-x-4">
      <div className={`flex items-center ${sizeClasses[size]}`}>
        <div className="flex items-center bg-gradient-to-r from-yellow-950 to-yellow-900/50 text-yellow-500 px-2 py-1 rounded">
          <span className="font-bold mr-1">IMDb</span>
          <Star className={`fill-yellow-500 text-yellow-500 ${iconSizes[size]} mr-1`} />
          <span>{imdb.toFixed(1)}</span>
        </div>
      </div>

      <div className={`flex items-center ${sizeClasses[size]}`}>
        <div className="flex items-center bg-gradient-to-r from-orange-950 to-orange-900/50 text-orange-500 px-2 py-1 rounded">
          <span className="font-bold mr-1">KP</span>
          <Star className={`fill-orange-500 text-orange-500 ${iconSizes[size]} mr-1`} />
          <span>{kinopoisk.toFixed(1)}</span>
        </div>
      </div>
    </div>
  )
}

