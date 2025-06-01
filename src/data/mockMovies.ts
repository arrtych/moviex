import { MovieDetails } from '@/store/types/movie.types'

export const mockMovies: MovieDetails[] = [
  {
    kinopoiskId: 111543,
    nameRu: 'Темный рыцарь',
    nameOriginal: 'The Dark Knight',
    posterUrl:
      'https://avatars.mds.yandex.net/get-kinopoisk-image/1599028/4057c4b8-8208-4a04-b169-26b0661453e3/300x450',
    coverUrl:
      'https://avatars.mds.yandex.net/get-kinopoisk-image/1599028/4057c4b8-8208-4a04-b169-26b0661453e3/1920x',
    ratingKinopoisk: 8.5,
    ratingImdb: 9.0,
    year: 2008,
    filmLength: 152,
    description:
      'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    shortDescription:
      "Batman faces his most formidable enemy - the Joker. Christopher Nolan's legendary superhero drama",
    ratingMpaa: 'pg13',
    genres: [{ genre: 'Action' }, { genre: 'Crime' }, { genre: 'Drama' }, { genre: 'Thriller' }],
    countries: [{ country: 'USA' }, { country: 'UK' }],
    hasAwards: true,
    facts: [
      'The Dark Knight was the first major feature film to be partially shot in IMAX.',
      'Heath Ledger posthumously won an Academy Award for his role as the Joker.',
    ],
    slogan: 'Why So Serious?',
    type: 'FILM',
    webUrl: 'https://www.kinopoisk.ru/film/111543/',
    budget: {
      value: 185000000,
      currency: 'USD',
    },
    fees: {
      world: {
        value: 1004558444,
        currency: 'USD',
      },
      russia: {
        value: 8589200,
        currency: 'USD',
      },
      usa: {
        value: 534858444,
        currency: 'USD',
      },
    },
  },
  {
    kinopoiskId: 447301,
    nameRu: 'Начало',
    nameOriginal: 'Inception',
    posterUrl:
      'https://avatars.mds.yandex.net/get-kinopoisk-image/1599028/0b76b2a2-d1c7-4f04-a284-80ff7bb709a4/300x450',
    coverUrl:
      'https://avatars.mds.yandex.net/get-kinopoisk-image/1599028/0b76b2a2-d1c7-4f04-a284-80ff7bb709a4/1920x',
    ratingKinopoisk: 8.7,
    ratingImdb: 8.8,
    year: 2010,
    filmLength: 148,
    description:
      'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    shortDescription:
      'Dom Cobb is a skilled thief, the absolute best in the dangerous art of extraction, stealing valuable secrets from deep within the subconscious.',
    ratingMpaa: 'pg13',
    genres: [{ genre: 'Action' }, { genre: 'Sci-Fi' }, { genre: 'Thriller' }],
    countries: [{ country: 'USA' }, { country: 'UK' }],
    hasAwards: true,
    facts: [
      'The film won four Academy Awards for Best Cinematography, Best Visual Effects, Best Sound Mixing, and Best Sound Editing.',
      'Christopher Nolan spent ten years writing the screenplay.',
    ],
    slogan: 'Your mind is the scene of the crime',
    type: 'FILM',
    webUrl: 'https://www.kinopoisk.ru/film/447301/',
    budget: {
      value: 160000000,
      currency: 'USD',
    },
    fees: {
      world: { value: 836836967, currency: 'USD' },
      russia: { value: 21760000, currency: 'USD' },
      usa: { value: 292576195, currency: 'USD' },
    },
  },
  {
    kinopoiskId: 258687,
    nameRu: 'Интерстеллар',
    nameOriginal: 'Interstellar',
    posterUrl:
      'https://avatars.mds.yandex.net/get-kinopoisk-image/1599028/4057c4b8-8208-4a04-b169-26b0661453e3/300x450',
    coverUrl:
      'https://avatars.mds.yandex.net/get-kinopoisk-image/1599028/4057c4b8-8208-4a04-b169-26b0661453e3/1920x',
    ratingKinopoisk: 8.6,
    ratingImdb: 8.6,
    year: 2014,
    filmLength: 169,
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    shortDescription:
      'Epic space adventure from Christopher Nolan about love that transcends space and time',
    ratingMpaa: 'pg13',
    genres: [{ genre: 'Adventure' }, { genre: 'Drama' }, { genre: 'Sci-Fi' }],
    countries: [{ country: 'USA' }, { country: 'UK' }],
    hasAwards: true,
    facts: [
      'The film won the Academy Award for Best Visual Effects.',
      'Real scientific equations about black holes were used in the visual effects.',
    ],
    slogan: 'Mankind was born on Earth. It was never meant to die here.',
    type: 'FILM',
    webUrl: 'https://www.kinopoisk.ru/film/258687/',
    budget: {
      value: 165000000,
      currency: 'USD',
    },
    fees: {
      world: { value: 701729206, currency: 'USD' },
      russia: { value: 24000000, currency: 'USD' },
      usa: { value: 188020017, currency: 'USD' },
    },
  },
  {
    kinopoiskId: 342,
    nameRu: 'Криминальное чтиво',
    nameOriginal: 'Pulp Fiction',
    posterUrl:
      'https://avatars.mds.yandex.net/get-kinopoisk-image/1599028/4057c4b8-8208-4a04-b169-26b0661453e3/300x450',
    coverUrl:
      'https://avatars.mds.yandex.net/get-kinopoisk-image/1599028/4057c4b8-8208-4a04-b169-26b0661453e3/1920x',
    ratingKinopoisk: 8.6,
    ratingImdb: 8.9,
    year: 1994,
    filmLength: 154,
    description:
      'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
    shortDescription: "Quentin Tarantino's masterpiece that redefined modern cinema",
    ratingMpaa: 'r',
    genres: [{ genre: 'Crime' }, { genre: 'Drama' }],
    countries: [{ country: 'USA' }],
    hasAwards: true,
    facts: [
      "Won the Palme d'Or at the 1994 Cannes Film Festival.",
      'The film was nominated for seven Academy Awards, including Best Picture.',
    ],
    slogan: "You won't know the facts until you've seen the fiction.",
    type: 'FILM',
    webUrl: 'https://www.kinopoisk.ru/film/342/',
    budget: {
      value: 8000000,
      currency: 'USD',
    },
    fees: {
      world: { value: 213928762, currency: 'USD' },
      russia: { value: 0, currency: 'USD' },
      usa: { value: 107930000, currency: 'USD' },
    },
  },
  {
    kinopoiskId: 464963,
    nameRu: 'Игра престолов',
    nameOriginal: 'Game of Thrones',
    posterUrl:
      'https://avatars.mds.yandex.net/get-kinopoisk-image/1599028/0b76b2a2-d1c7-4f04-a284-80ff7bb709a4/300x450',
    coverUrl:
      'https://avatars.mds.yandex.net/get-kinopoisk-image/1599028/0b76b2a2-d1c7-4f04-a284-80ff7bb709a4/1920x',
    ratingKinopoisk: 9.0,
    ratingImdb: 9.2,
    year: 2011,
    filmLength: 57,
    description:
      'Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.',
    shortDescription:
      "Epic fantasy series based on George R.R. Martin's novels about power struggles in a mythical kingdom",
    ratingMpaa: 'tv-ma',
    genres: [{ genre: 'Action' }, { genre: 'Adventure' }, { genre: 'Drama' }, { genre: 'Fantasy' }],
    countries: [{ country: 'USA' }, { country: 'UK' }],
    hasAwards: true,
    facts: [
      'The show won a record 59 Emmy Awards.',
      'The series finale was watched by 19.3 million viewers.',
    ],
    slogan: 'Winter is Coming',
    type: 'TV_SERIES',
    webUrl: 'https://www.kinopoisk.ru/series/464963/',
    budget: {
      value: 15000000,
      currency: 'USD',
    },
    fees: {
      world: { value: 0, currency: 'USD' },
      russia: { value: 0, currency: 'USD' },
      usa: { value: 0, currency: 'USD' },
    },
  },
  {
    kinopoiskId: 404900,
    nameRu: 'Во все тяжкие',
    nameOriginal: 'Breaking Bad',
    posterUrl:
      'https://avatars.mds.yandex.net/get-kinopoisk-image/1599028/0b76b2a2-d1c7-4f04-a284-80ff7bb709a4/300x450',
    coverUrl:
      'https://avatars.mds.yandex.net/get-kinopoisk-image/1599028/0b76b2a2-d1c7-4f04-a284-80ff7bb709a4/1920x',
    ratingKinopoisk: 9.1,
    ratingImdb: 9.5,
    year: 2008,
    filmLength: 49,
    description:
      "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family's future.",
    shortDescription:
      'A terminally ill chemistry teacher turns to a life of crime to provide for his family',
    ratingMpaa: 'tv-ma',
    genres: [{ genre: 'Crime' }, { genre: 'Drama' }, { genre: 'Thriller' }],
    countries: [{ country: 'USA' }],
    hasAwards: true,
    facts: [
      'The show won 16 Primetime Emmy Awards.',
      'Vince Gilligan pitched the show as "Mr. Chips becomes Scarface."',
    ],
    slogan: 'All Hail the King',
    type: 'TV_SERIES',
    webUrl: 'https://www.kinopoisk.ru/series/404900/',
    budget: {
      value: 3000000,
      currency: 'USD',
    },
    fees: {
      world: { value: 0, currency: 'USD' },
      russia: { value: 0, currency: 'USD' },
      usa: { value: 0, currency: 'USD' },
    },
  },
]

export const findMovieBySlug = (slug: string): MovieDetails | undefined => {
  return mockMovies.find((movie) => {
    const movieSlug = (movie.nameOriginal || movie.nameRu || '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
    return `${movieSlug}-${movie.kinopoiskId}` === slug
  })
}

export const findMovieById = (id: number): MovieDetails | undefined => {
  return mockMovies.find((movie) => movie.kinopoiskId === id)
}
