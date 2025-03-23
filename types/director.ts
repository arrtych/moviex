export interface Director {
  id: string
  name: string
  slug: string
  profileImage: string
  biography: string
  birthDate: string
  birthPlace?: string
  deathDate?: string
  popularity: number
  knownFor: string[] // Notable movies
  socialMedia?: {
    instagram?: string
    twitter?: string
    facebook?: string
  }
  imdbId?: string
  movieIds: string[] // References to movies directed by this person
}

