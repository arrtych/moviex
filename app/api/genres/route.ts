import { NextResponse } from "next/server"
import type { Genre } from "@/types/genre"

export async function GET() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const genres: Genre[] = [
    {
      id: "genre-1",
      name: "Action",
      slug: "action",
      description:
        "Action films are a genre where physical action takes precedence in the storytelling. The film will often have continuous motion and action including physical stunts, chases, fights, battles, and races.",
      movieIds: ["1", "3", "5", "7", "10", "21", "23", "27"],
      imageUrl: "/placeholder.svg?height=400&width=600",
      popularity: 8,
    },
    {
      id: "genre-2",
      name: "Drama",
      slug: "drama",
      description:
        "Drama films are a genre that relies on the emotional and relational development of realistic characters. While Drama films gain some leeway in this definition and can expand to include comedic elements and other genres, the emotional focus of the film tends to determine its classification as a Drama.",
      movieIds: ["2", "3", "4", "6", "22", "24", "26", "28"],
      imageUrl: "/placeholder.svg?height=400&width=600",
      popularity: 10,
    },
    {
      id: "genre-3",
      name: "Sci-Fi",
      slug: "sci-fi",
      description:
        "Science fiction (sci-fi) is a genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science, such as extraterrestrial lifeforms, alien worlds, extrasensory perception and time travel, along with futuristic elements.",
      movieIds: ["1", "5", "21", "23", "25"],
      imageUrl: "/placeholder.svg?height=400&width=600",
      popularity: 7,
    },
    {
      id: "genre-4",
      name: "Comedy",
      slug: "comedy",
      description:
        "Comedy is a genre of film in which the main emphasis is on humor. These films are designed to make the audience laugh through amusement and most often work by exaggerating characteristics for humorous effect.",
      movieIds: ["4", "28", "29"],
      imageUrl: "/placeholder.svg?height=400&width=600",
      popularity: 6,
    },
    {
      id: "genre-5",
      name: "Thriller",
      slug: "thriller",
      description:
        "Thriller is a genre of fiction, having numerous, often overlapping subgenres. Thrillers are characterized and defined by the moods they elicit, giving viewers heightened feelings of suspense, excitement, surprise, anticipation and anxiety.",
      movieIds: ["1", "3", "26"],
      imageUrl: "/placeholder.svg?height=400&width=600",
      popularity: 5,
    },
    {
      id: "genre-6",
      name: "Horror",
      slug: "horror",
      description:
        "Horror is a genre of speculative fiction which is intended to frighten, scare, disgust, or startle its readers by inducing feelings of horror and terror.",
      movieIds: ["26"],
      imageUrl: "/placeholder.svg?height=400&width=600",
      popularity: 4,
    },
    {
      id: "genre-7",
      name: "Fantasy",
      slug: "fantasy",
      description:
        "Fantasy films are films that belong to the fantasy genre with fantastic themes, usually magic, supernatural events, mythology, folklore, or exotic fantasy worlds.",
      movieIds: ["27"],
      imageUrl: "/placeholder.svg?height=400&width=600",
      popularity: 5,
    },
    {
      id: "genre-8",
      name: "Adventure",
      slug: "adventure",
      description:
        "Adventure films are a genre of film that typically use their action scenes to display and explore exotic locations in an energetic way.",
      movieIds: ["21", "27"],
      imageUrl: "/placeholder.svg?height=400&width=600",
      popularity: 6,
    },
    {
      id: "genre-9",
      name: "Crime",
      slug: "crime",
      description:
        "Crime films, in the broadest sense, is a film genre inspired by and analogous to the crime fiction literary genre. Films of this genre generally involve various aspects of crime and its detection.",
      movieIds: ["3", "4", "6", "26"],
      imageUrl: "/placeholder.svg?height=400&width=600",
      popularity: 7,
    },
    {
      id: "genre-10",
      name: "Biography",
      slug: "biography",
      description:
        "A biographical film, or biopic, is a film that dramatizes the life of a non-fictional or historically-based person or people.",
      movieIds: ["6", "24"],
      imageUrl: "/placeholder.svg?height=400&width=600",
      popularity: 3,
    },
  ]

  return NextResponse.json(genres)
}

