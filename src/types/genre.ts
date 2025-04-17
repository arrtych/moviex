export interface Genre {
  id: string
  name: string
  slug: string
  description?: string
  movieIds: string[] // References to movies in this genre
  imageUrl?: string
  popularity: number // How many movies are in this genre
}

