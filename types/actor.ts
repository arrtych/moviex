export interface Actor {
  id: string
  name: string
  slug: string
  profileImage: string
  biography: string
  birthDate: string
  birthPlace?: string
  deathDate?: string
  height?: number // in cm
  popularity: number
  knownFor: string[]
  socialMedia?: {
    instagram?: string
    twitter?: string
    facebook?: string
  }
  imdbId?: string
  movieIds: string[] // References to movies this actor has appeared in
}

