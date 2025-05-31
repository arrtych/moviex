import { NextResponse } from 'next/server'
import type { Director } from '@/types/director'

export async function GET() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const directors: Director[] = [
    {
      id: 'director-1',
      name: 'Christopher Nolan',
      slug: 'christopher-nolan',
      profileImage: '/placeholder.svg?height=400&width=300',
      biography:
        'Christopher Edward Nolan is a British-American film director, producer, and screenwriter. His films have grossed more than US$5 billion worldwide, and have garnered 11 Academy Awards from 36 nominations.',
      birthDate: '1970-07-30',
      birthPlace: 'London, England, UK',
      popularity: 9.5,
      knownFor: ['Inception', 'The Dark Knight', 'Interstellar', 'Dunkirk'],
      socialMedia: {},
      imdbId: 'nm0634240',
      movieIds: ['1', '3', '21'],
    },
    {
      id: 'director-2',
      name: 'Frank Darabont',
      slug: 'frank-darabont',
      profileImage: '/placeholder.svg?height=400&width=300',
      biography:
        'Frank Árpád Darabont is a French-Hungarian-American film director, screenwriter and producer. He has been nominated for three Academy Awards and a Golden Globe Award.',
      birthDate: '1959-01-28',
      birthPlace: 'Montbéliard, France',
      popularity: 8.7,
      knownFor: ['The Shawshank Redemption', 'The Green Mile', 'The Mist'],
      socialMedia: {},
      imdbId: 'nm0001104',
      movieIds: ['2'],
    },
    {
      id: 'director-3',
      name: 'Quentin Tarantino',
      slug: 'quentin-tarantino',
      profileImage: '/placeholder.svg?height=400&width=300',
      biography:
        'Quentin Jerome Tarantino is an American film director, screenwriter, producer, and actor. His films are characterized by nonlinear storylines, dark humor, stylized violence, extended dialogue, ensemble casts, references to popular culture, alternate history, and neo-noir.',
      birthDate: '1963-03-27',
      birthPlace: 'Knoxville, Tennessee, USA',
      popularity: 9.2,
      knownFor: ['Pulp Fiction', 'Django Unchained', 'Kill Bill', 'Inglourious Basterds'],
      socialMedia: {},
      imdbId: 'nm0000233',
      movieIds: ['4'],
    },
    {
      id: 'director-4',
      name: 'Lana Wachowski',
      slug: 'lana-wachowski',
      profileImage: '/placeholder.svg?height=400&width=300',
      biography:
        'Lana Wachowski is an American film and television director, writer and producer. She is best known for creating The Matrix franchise with her sister Lilly Wachowski.',
      birthDate: '1965-06-21',
      birthPlace: 'Chicago, Illinois, USA',
      popularity: 8.5,
      knownFor: ['The Matrix', 'Cloud Atlas', 'Sense8'],
      socialMedia: {},
      imdbId: 'nm0905154',
      movieIds: ['5'],
    },
    {
      id: 'director-5',
      name: 'Martin Scorsese',
      slug: 'martin-scorsese',
      profileImage: '/placeholder.svg?height=400&width=300',
      biography:
        'Martin Charles Scorsese is an American film director, producer, screenwriter, and actor. One of the major figures of the New Hollywood era, he is widely regarded as one of the most significant and influential directors in film history.',
      birthDate: '1942-11-17',
      birthPlace: 'Queens, New York, USA',
      popularity: 9.4,
      knownFor: ['Goodfellas', 'Taxi Driver', 'The Departed', 'Raging Bull'],
      socialMedia: {},
      imdbId: 'nm0000217',
      movieIds: ['6'],
    },
    {
      id: 'director-6',
      name: 'Vince Gilligan',
      slug: 'vince-gilligan',
      profileImage: '/placeholder.svg?height=400&width=300',
      biography:
        'George Vincent Gilligan Jr. is an American writer, producer, and director. He is known for his television work, specifically as creator, head writer, executive producer, and director of Breaking Bad and its spin-off Better Call Saul.',
      birthDate: '1967-02-10',
      birthPlace: 'Richmond, Virginia, USA',
      popularity: 8.9,
      knownFor: ['Breaking Bad', 'Better Call Saul', 'The X-Files'],
      socialMedia: {},
      imdbId: 'nm0319213',
      movieIds: ['7'],
    },
    {
      id: 'director-7',
      name: 'David Benioff',
      slug: 'david-benioff',
      profileImage: '/placeholder.svg?height=400&width=300',
      biography:
        'David Benioff is an American screenwriter, television producer and writer, and novelist. He is best known as the co-creator and showrunner of the widely acclaimed HBO series Game of Thrones.',
      birthDate: '1970-09-25',
      birthPlace: 'New York City, New York, USA',
      popularity: 8.6,
      knownFor: ['Game of Thrones', 'Troy', 'X-Men Origins: Wolverine'],
      socialMedia: {},
      imdbId: 'nm1125275',
      movieIds: ['8'],
    },
    {
      id: 'director-8',
      name: 'The Duffer Brothers',
      slug: 'the-duffer-brothers',
      profileImage: '/placeholder.svg?height=400&width=300',
      biography:
        'Matt and Ross Duffer, known professionally as the Duffer Brothers, are American film and television writers, directors, and producers. They are best known for creating the science fiction horror series Stranger Things.',
      birthDate: '1984-02-15',
      birthPlace: 'Durham, North Carolina, USA',
      popularity: 8.8,
      knownFor: ['Stranger Things', 'Hidden'],
      socialMedia: {},
      imdbId: 'nm1819972',
      movieIds: ['9'],
    },
    {
      id: 'director-9',
      name: 'Jon Favreau',
      slug: 'jon-favreau',
      profileImage: '/placeholder.svg?height=400&width=300',
      biography:
        'Jonathan Kolia Favreau is an American actor, director, producer and screenwriter. As an actor, he is known for roles in films such as Rudy, Swingers, Very Bad Things, The Break-Up, and Chef. As a filmmaker, he is known for directing films like Elf, Iron Man, and The Jungle Book.',
      birthDate: '1966-10-19',
      birthPlace: 'Queens, New York, USA',
      popularity: 8.7,
      knownFor: ['Iron Man', 'The Mandalorian', 'The Jungle Book', 'Elf'],
      socialMedia: {
        twitter: '@Jon_Favreau',
      },
      imdbId: 'nm0269463',
      movieIds: ['10'],
    },
    {
      id: 'director-10',
      name: 'Francis Ford Coppola',
      slug: 'francis-ford-coppola',
      profileImage: '/placeholder.svg?height=400&width=300',
      biography:
        'Francis Ford Coppola is an American film director, producer, and screenwriter. He is considered one of the major figures of the New Hollywood filmmaking movement of the 1960s and 1970s.',
      birthDate: '1939-04-07',
      birthPlace: 'Detroit, Michigan, USA',
      popularity: 9.3,
      knownFor: ['The Godfather', 'Apocalypse Now', 'The Conversation'],
      socialMedia: {},
      imdbId: 'nm0000338',
      movieIds: ['22'],
    },
  ]

  return NextResponse.json(directors)
}
