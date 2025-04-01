import { NextResponse } from "next/server";
import type { Movie, MovieLabel } from "@/types/movie";
import { prisma } from "@/lib/db/prisma";
import { handlePrismaError } from "@/lib/db/utils";

// Feature flag to control data source
const USE_STATIC_DATA = process.env.USE_STATIC_DATA === "true";

// Define a set of possible labels
const possibleLabels: MovieLabel[] = [
  { slug: "new", text: "NEW", color: "bg-green-500" },
  { slug: "trending", text: "TRENDING", color: "bg-purple-500" },
  { slug: "top-rated", text: "TOP RATED", color: "bg-yellow-500" },
  { slug: "award-winner", text: "AWARD WINNER", color: "bg-blue-500" },
  { slug: "classic", text: "CLASSIC", color: "bg-red-500" },
  { slug: "must-watch", text: "MUST WATCH", color: "bg-pink-500" },
  { slug: "cult", text: "CULT", color: "bg-indigo-500" },
  { slug: "limited", text: "LIMITED", color: "bg-orange-500" },
];

// Helper function to randomly assign labels to movies
const getRandomLabels = () => {
  const numberOfLabels = Math.floor(Math.random() * 3); // 0 to 2 labels per movie
  const shuffled = [...possibleLabels].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numberOfLabels);
};

export async function GET() {
  try {
    // If using static data, return mock data
    if (USE_STATIC_DATA) {
      // Simulate API delay for consistent behavior
      await new Promise((resolve) => setTimeout(resolve, 300));
      return NextResponse.json(movies);
    }

    // Otherwise, fetch from database
    const dbMovies = await prisma.movie.findMany({
      include: {
        ratings: {
          select: {
            value: true,
          },
        },
      },
    });

    return NextResponse.json(dbMovies);
  } catch (error) {
    console.error("Failed to fetch movies:", error);
    return NextResponse.json(
      { error: "Failed to fetch movies" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Always create in database, even when using static data
    const movie = await prisma.movie.create({
      data: {
        tmdbId: body.tmdbId,
        title: body.title,
        overview: body.overview,
        posterPath: body.posterPath,
        releaseDate: body.releaseDate ? new Date(body.releaseDate) : null,
        voteAverage: body.voteAverage,
      },
    });

    // If using static data, also add to static array for immediate reflection
    if (USE_STATIC_DATA) {
      const newStaticMovie: Movie = {
        id: movie.id,
        title: movie.title,
        slug: movie.tmdbId,
        overview: movie.overview || "",
        releaseDate: movie.releaseDate?.toISOString().split("T")[0] || "",
        genres: [], // Add default or derived values as needed
        duration: 0,
        posterPath: movie.posterPath || "",
        backdropPath: "/placeholder.svg?height=1080&width=1920",
        director: "",
        cast: [],
        ratings: {
          imdb: 0,
          kinopoisk: 0,
        },
        tags: [],
        labels: getRandomLabels(),
        type: "movie",
      };
      movies.unshift(newStaticMovie);
    }

    return NextResponse.json(movie, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Failed to create movie" },
      { status: 500 }
    );
  }
}

// Keep the existing static movies array
const movies: Movie[] = [
  {
    id: "1",
    title: "Inception",
    slug: "inception",
    overview:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    releaseDate: "2010-07-16",
    genres: ["Action", "Sci-Fi", "Thriller"],
    duration: 148,
    posterPath: "/placeholder.svg?height=600&width=400",
    backdropPath: "/placeholder.svg?height=1080&width=1920",
    trailerUrl: "https://www.youtube.com/embed/YoHD9XEInc0",
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
    ratings: {
      imdb: 8.8,
      kinopoisk: 8.7,
    },
    tags: ["dream", "subconscious", "mind-bending"],
    labels: getRandomLabels(),
    type: "movie",
  },
  {
    id: "2",
    title: "The Shawshank Redemption",
    slug: "the-shawshank-redemption",
    overview:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    releaseDate: "1994-09-23",
    genres: ["Drama"],
    duration: 142,
    posterPath: "/placeholder.svg?height=600&width=400",
    backdropPath: "/placeholder.svg?height=1080&width=1920",
    director: "Frank Darabont",
    cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
    ratings: {
      imdb: 9.3,
      kinopoisk: 9.1,
    },
    tags: ["prison", "friendship", "hope"],
    labels: getRandomLabels(),
    type: "movie",
  },
  {
    id: "3",
    title: "The Dark Knight",
    slug: "the-dark-knight",
    overview:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    releaseDate: "2008-07-18",
    genres: ["Action", "Crime", "Drama"],
    duration: 152,
    posterPath: "/placeholder.svg?height=600&width=400",
    backdropPath: "/placeholder.svg?height=1080&width=1920",
    trailerUrl: "https://www.youtube.com/embed/EXeTwQWrcwY",
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    ratings: {
      imdb: 9.0,
      kinopoisk: 8.5,
    },
    tags: ["superhero", "villain", "crime"],
    labels: getRandomLabels(),
    type: "movie",
  },
  {
    id: "4",
    title: "Pulp Fiction",
    slug: "pulp-fiction",
    overview:
      "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    releaseDate: "1994-10-14",
    genres: ["Crime", "Drama"],
    duration: 154,
    posterPath: "/placeholder.svg?height=600&width=400",
    backdropPath: "/placeholder.svg?height=1080&width=1920",
    director: "Quentin Tarantino",
    cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
    ratings: {
      imdb: 8.9,
      kinopoisk: 8.6,
    },
    tags: ["nonlinear", "dialogue", "violence"],
    labels: getRandomLabels(),
    type: "movie",
  },
  {
    id: "5",
    title: "The Matrix",
    slug: "the-matrix",
    overview:
      "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    releaseDate: "1999-03-31",
    genres: ["Action", "Sci-Fi"],
    duration: 136,
    posterPath: "/placeholder.svg?height=600&width=400",
    backdropPath: "/placeholder.svg?height=1080&width=1920",
    trailerUrl: "https://www.youtube.com/embed/vKQi3bBA1y8",
    director: "Lana Wachowski",
    cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
    ratings: {
      imdb: 8.7,
      kinopoisk: 8.5,
    },
    tags: ["virtual reality", "dystopia", "kung fu"],
    labels: getRandomLabels(),
    type: "movie",
  },
  {
    id: "6",
    title: "Goodfellas",
    slug: "goodfellas",
    overview:
      "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito in the Italian-American crime syndicate.",
    releaseDate: "1990-09-12",
    genres: ["Biography", "Crime", "Drama"],
    duration: 146,
    posterPath: "/placeholder.svg?height=600&width=400",
    backdropPath: "/placeholder.svg?height=1080&width=1920",
    director: "Martin Scorsese",
    cast: ["Robert De Niro", "Ray Liotta", "Joe Pesci"],
    ratings: {
      imdb: 8.7,
      kinopoisk: 8.1,
    },
    tags: ["mafia", "true story", "crime"],
    labels: getRandomLabels(),
    type: "movie",
  },
  // Add serial content
  {
    id: "7",
    title: "Breaking Bad",
    slug: "breaking-bad",
    overview:
      "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family's future.",
    releaseDate: "2008-01-20",
    genres: ["Crime", "Drama", "Thriller"],
    duration: 49, // Average episode duration
    posterPath: "/placeholder.svg?height=600&width=400",
    backdropPath: "/placeholder.svg?height=1080&width=1920",
    director: "Vince Gilligan",
    cast: ["Bryan Cranston", "Aaron Paul", "Anna Gunn"],
    ratings: {
      imdb: 9.5,
      kinopoisk: 9.1,
    },
    tags: ["drugs", "transformation", "crime"],
    labels: getRandomLabels(),
    type: "serial",
    seasons: 5,
    episodes: 62,
    lastWatchedEpisode: {
      season: 3,
      episode: 7,
      title: "One Minute",
    },
  },
  {
    id: "8",
    title: "Game of Thrones",
    slug: "game-of-thrones",
    overview:
      "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.",
    releaseDate: "2011-04-17",
    genres: ["Action", "Adventure", "Drama"],
    duration: 57, // Average episode duration
    posterPath: "/placeholder.svg?height=600&width=400",
    backdropPath: "/placeholder.svg?height=1080&width=1920",
    director: "David Benioff",
    cast: ["Emilia Clarke", "Peter Dinklage", "Kit Harington"],
    ratings: {
      imdb: 9.2,
      kinopoisk: 9.0,
    },
    tags: ["fantasy", "politics", "dragons"],
    labels: getRandomLabels(),
    type: "serial",
    seasons: 8,
    episodes: 73,
    lastWatchedEpisode: {
      season: 5,
      episode: 9,
      title: "The Dance of Dragons",
    },
  },
  {
    id: "9",
    title: "Stranger Things",
    slug: "stranger-things",
    overview:
      "When a young boy disappears, his mother, a police chief, and his friends must confront terrifying supernatural forces in order to get him back.",
    releaseDate: "2016-07-15",
    genres: ["Drama", "Fantasy", "Horror"],
    duration: 51, // Average episode duration
    posterPath: "/placeholder.svg?height=600&width=400",
    backdropPath: "/placeholder.svg?height=1080&width=1920",
    director: "The Duffer Brothers",
    cast: ["Millie Bobby Brown", "Finn Wolfhard", "Winona Ryder"],
    ratings: {
      imdb: 8.7,
      kinopoisk: 8.4,
    },
    tags: ["supernatural", "1980s", "mystery"],
    labels: getRandomLabels(),
    type: "serial",
    seasons: 4,
    episodes: 34,
    lastWatchedEpisode: {
      season: 2,
      episode: 5,
      title: "Dig Dug",
    },
  },
  {
    id: "10",
    title: "The Mandalorian",
    slug: "the-mandalorian",
    overview:
      "The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.",
    releaseDate: "2019-11-12",
    genres: ["Action", "Adventure", "Sci-Fi"],
    duration: 40, // Average episode duration
    posterPath: "/placeholder.svg?height=600&width=400",
    backdropPath: "/placeholder.svg?height=1080&width=1920",
    director: "Jon Favreau",
    cast: ["Pedro Pascal", "Carl Weathers", "Giancarlo Esposito"],
    ratings: {
      imdb: 8.7,
      kinopoisk: 8.2,
    },
    tags: ["star wars", "bounty hunter", "space"],
    labels: getRandomLabels(),
    type: "serial",
    seasons: 3,
    episodes: 24,
    lastWatchedEpisode: {
      season: 2,
      episode: 8,
      title: "The Rescue",
    },
  },
  // Additional movies that won't be in the library
  {
    id: "21",
    title: "Interstellar",
    slug: "interstellar",
    overview:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    releaseDate: "2014-11-07",
    genres: ["Adventure", "Drama", "Sci-Fi"],
    duration: 169,
    posterPath: "/placeholder.svg?height=600&width=400",
    backdropPath: "/placeholder.svg?height=1080&width=1920",
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    ratings: {
      imdb: 8.6,
      kinopoisk: 8.6,
    },
    tags: ["space", "time", "relativity"],
    labels: getRandomLabels(),
    type: "movie",
  },
  {
    id: "22",
    title: "The Godfather",
    slug: "the-godfather",
    overview:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    releaseDate: "1972-03-24",
    genres: ["Crime", "Drama"],
    duration: 175,
    posterPath: "/placeholder.svg?height=600&width=400",
    backdropPath: "/placeholder.svg?height=1080&width=1920",
    director: "Francis Ford Coppola",
    cast: ["Marlon Brando", "Al Pacino", "James Caan"],
    ratings: {
      imdb: 9.2,
      kinopoisk: 8.7,
    },
    tags: ["mafia", "family", "power"],
    labels: getRandomLabels(),
    type: "movie",
  },
  {
    id: "23",
    title: "Blade Runner 2049",
    slug: "blade-runner-2049",
    overview:
      "A young blade runner's discovery of a long-buried secret leads him to track down former blade runner Rick Deckard, who's been missing for thirty years.",
    releaseDate: "2017-10-06",
    genres: ["Action", "Drama", "Mystery", "Sci-Fi", "Thriller"],
    duration: 164,
    posterPath: "/placeholder.svg?height=600&width=400",
    backdropPath: "/placeholder.svg?height=1080&width=1920",
    director: "Denis Villeneuve",
    cast: ["Ryan Gosling", "Harrison Ford", "Ana de Armas"],
    ratings: {
      imdb: 8.0,
      kinopoisk: 7.8,
    },
    tags: ["future", "replicant", "dystopia"],
    labels: getRandomLabels(),
    type: "movie",
  },
  {
    id: "24",
    title: "Parasite",
    slug: "parasite",
    overview:
      "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    releaseDate: "2019-05-30",
    genres: ["Comedy", "Drama", "Thriller"],
    duration: 132,
    posterPath: "/placeholder.svg?height=600&width=400",
    backdropPath: "/placeholder.svg?height=1080&width=1920",
    director: "Bong Joon Ho",
    cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong"],
    ratings: {
      imdb: 8.6,
      kinopoisk: 8.0,
    },
    tags: ["class", "social commentary", "twist"],
    labels: getRandomLabels(),
    type: "movie",
  },
  {
    id: "25",
    title: "Dune",
    slug: "dune",
    overview:
      "Feature adaptation of Frank Herbert's science fiction novel, about the son of a noble family entrusted with the protection of the most valuable asset and most vital element in the galaxy.",
    releaseDate: "2021-10-22",
    genres: ["Action", "Adventure", "Drama", "Sci-Fi"],
    duration: 155,
    posterPath: "/placeholder.svg?height=600&width=400",
    backdropPath: "/placeholder.svg?height=1080&width=1920",
    director: "Denis Villeneuve",
    cast: ["Timothée Chalamet", "Rebecca Ferguson", "Zendaya"],
    ratings: {
      imdb: 8.0,
      kinopoisk: 7.7,
    },
    tags: ["desert", "spice", "politics"],
    labels: getRandomLabels(),
    type: "movie",
  },
  {
    id: "26",
    title: "The Silence of the Lambs",
    slug: "the-silence-of-the-lambs",
    overview:
      "A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer, a madman who skins his victims.",
    releaseDate: "1991-02-14",
    genres: ["Crime", "Drama", "Thriller"],
    duration: 118,
    posterPath: "/placeholder.svg?height=600&width=400",
    backdropPath: "/placeholder.svg?height=1080&width=1920",
    director: "Jonathan Demme",
    cast: ["Jodie Foster", "Anthony Hopkins", "Scott Glenn"],
    ratings: {
      imdb: 8.6,
      kinopoisk: 8.3,
    },
    tags: ["serial killer", "fbi", "psychological"],
    labels: getRandomLabels(),
    type: "movie",
  },
  {
    id: "27",
    title: "The Lord of the Rings: The Fellowship of the Ring",
    slug: "the-lord-of-the-rings-the-fellowship-of-the-ring",
    overview:
      "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
    releaseDate: "2001-12-19",
    genres: ["Action", "Adventure", "Drama", "Fantasy"],
    duration: 178,
    posterPath: "/placeholder.svg?height=600&width=400",
    backdropPath: "/placeholder.svg?height=1080&width=1920",
    director: "Peter Jackson",
    cast: ["Elijah Wood", "Ian McKellen", "Orlando Bloom"],
    ratings: {
      imdb: 8.8,
      kinopoisk: 8.6,
    },
    tags: ["fantasy", "quest", "ring"],
    labels: getRandomLabels(),
    type: "movie",
  },
  {
    id: "28",
    title: "Whiplash",
    slug: "whiplash",
    overview:
      "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student's potential.",
    releaseDate: "2014-10-10",
    genres: ["Drama", "Music"],
    duration: 106,
    posterPath: "/placeholder.svg?height=600&width=400",
    backdropPath: "/placeholder.svg?height=1080&width=1920",
    director: "Damien Chazelle",
    cast: ["Miles Teller", "J.K. Simmons", "Melissa Benoist"],
    ratings: {
      imdb: 8.5,
      kinopoisk: 8.3,
    },
    tags: ["music", "jazz", "perfectionism"],
    labels: getRandomLabels(),
    type: "movie",
  },
  {
    id: "29",
    title: "The Queen's Gambit",
    slug: "the-queens-gambit",
    overview:
      "Orphaned at the tender age of nine, prodigious introvert Beth Harmon discovers and masters the game of chess in 1960s USA. But child stardom comes at a price.",
    releaseDate: "2020-10-23",
    genres: ["Drama"],
    duration: 60, // Average episode duration
    posterPath: "/placeholder.svg?height=600&width=400",
    backdropPath: "/placeholder.svg?height=1080&width=1920",
    director: "Scott Frank",
    cast: ["Anya Taylor-Joy", "Chloe Pirrie", "Bill Camp"],
    ratings: {
      imdb: 8.6,
      kinopoisk: 8.4,
    },
    tags: ["chess", "addiction", "prodigy"],
    labels: getRandomLabels(),
    type: "serial",
    seasons: 1,
    episodes: 7,
    lastWatchedEpisode: {
      season: 1,
      episode: 4,
      title: "Middle Game",
    },
  },
  {
    id: "30",
    title: "Chernobyl",
    slug: "chernobyl",
    overview:
      "In April 1986, an explosion at the Chernobyl nuclear power plant in the Union of Soviet Socialist Republics becomes one of the world's worst man-made catastrophes.",
    releaseDate: "2019-05-06",
    genres: ["Drama", "History", "Thriller"],
    duration: 60, // Average episode duration
    posterPath: "/placeholder.svg?height=600&width=400",
    backdropPath: "/placeholder.svg?height=1080&width=1920",
    director: "Craig Mazin",
    cast: ["Jessie Buckley", "Jared Harris", "Stellan Skarsgård"],
    ratings: {
      imdb: 9.4,
      kinopoisk: 8.9,
    },
    tags: ["disaster", "nuclear", "soviet"],
    labels: getRandomLabels(),
    type: "serial",
    seasons: 1,
    episodes: 5,
  },
];
