import { NextResponse } from 'next/server'
import type { Actor } from '@/types/actor'

export async function GET() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const actors: Actor[] = [
    {
      id: 'actor-1',
      name: 'Leonardo DiCaprio',
      slug: 'leonardo-dicaprio',
      profileImage: '/placeholder.svg?height=400&width=300',
      biography:
        'Leonardo Wilhelm DiCaprio is an American actor, film producer, and environmentalist. He has often played unconventional roles, particularly in biopics and period films.',
      birthDate: '1974-11-11',
      birthPlace: 'Los Angeles, California, USA',
      height: 183,
      popularity: 9.5,
      knownFor: ['Inception', 'Titanic', 'The Revenant', 'The Wolf of Wall Street'],
      socialMedia: {
        instagram: '@leonardodicaprio',
        twitter: '@LeoDiCaprio',
        facebook: 'LeonardoDiCaprio',
      },
      imdbId: 'nm0000138',
      movieIds: ['1', '21'],
    },
    {
      id: 'actor-2',
      name: 'Tom Hanks',
      slug: 'tom-hanks',
      profileImage: '/placeholder.svg?height=400&width=300',
      biography:
        'Thomas Jeffrey Hanks is an American actor and filmmaker. Known for both his comedic and dramatic roles, he is one of the most popular and recognizable film stars worldwide.',
      birthDate: '1956-07-09',
      birthPlace: 'Concord, California, USA',
      height: 183,
      popularity: 9.2,
      knownFor: ['Forrest Gump', 'Saving Private Ryan', 'Cast Away', 'The Green Mile'],
      socialMedia: {
        instagram: '@tomhanks',
        twitter: '@tomhanks',
        facebook: 'TomHanks',
      },
      imdbId: 'nm0000158',
      movieIds: ['2', '22'],
    },
    {
      id: 'actor-3',
      name: 'Meryl Streep',
      slug: 'meryl-streep',
      profileImage: '/placeholder.svg?height=400&width=300',
      biography:
        "Mary Louise 'Meryl' Streep is an American actress. Often described as 'the best actress of her generation', Streep is particularly known for her versatility and accent adaptability.",
      birthDate: '1949-06-22',
      birthPlace: 'Summit, New Jersey, USA',
      height: 168,
      popularity: 9.0,
      knownFor: ['The Devil Wears Prada', "Sophie's Choice", 'The Iron Lady', 'Mamma Mia!'],
      socialMedia: {},
      imdbId: 'nm0000658',
      movieIds: ['3', '23'],
    },
    {
      id: 'actor-4',
      name: 'Denzel Washington',
      slug: 'denzel-washington',
      profileImage: '/placeholder.svg?height=400&width=300',
      biography:
        'Denzel Hayes Washington Jr. is an American actor, director, and producer. He has been described as an actor who reconfigured the concept of classic movie stardom.',
      birthDate: '1954-12-28',
      birthPlace: 'Mount Vernon, New York, USA',
      height: 185,
      popularity: 8.9,
      knownFor: ['Training Day', 'Malcolm X', 'Glory', 'The Equalizer'],
      socialMedia: {},
      imdbId: 'nm0000243',
      movieIds: ['4', '24'],
    },
    {
      id: 'actor-5',
      name: 'Scarlett Johansson',
      slug: 'scarlett-johansson',
      profileImage: '/placeholder.svg?height=400&width=300',
      biography:
        "Scarlett Ingrid Johansson is an American actress. She was the world's highest-paid actress in 2018 and 2019, and has featured multiple times on the Forbes Celebrity 100 list.",
      birthDate: '1984-11-22',
      birthPlace: 'New York City, New York, USA',
      height: 160,
      popularity: 9.1,
      knownFor: ['Lost in Translation', 'The Avengers', 'Marriage Story', 'Her'],
      socialMedia: {
        instagram: '@scarlettjohansson',
      },
      imdbId: 'nm0424060',
      movieIds: ['5', '25'],
    },
    {
      id: 'actor-6',
      name: 'Robert De Niro',
      slug: 'robert-de-niro',
      profileImage: '/placeholder.svg?height=400&width=300',
      biography:
        'Robert Anthony De Niro Jr. is an American actor, producer, and director. He is particularly known for his collaborations with filmmaker Martin Scorsese.',
      birthDate: '1943-08-17',
      birthPlace: 'New York City, New York, USA',
      height: 177,
      popularity: 8.8,
      knownFor: ['Goodfellas', 'Taxi Driver', 'The Godfather Part II', 'Raging Bull'],
      socialMedia: {},
      imdbId: 'nm0000134',
      movieIds: ['6', '26'],
    },
    {
      id: 'actor-7',
      name: 'Brad Pitt',
      slug: 'brad-pitt',
      profileImage: '/placeholder.svg?height=400&width=300',
      biography:
        'William Bradley Pitt is an American actor and film producer. He has received multiple awards, including two Golden Globe Awards and an Academy Award for his acting.',
      birthDate: '1963-12-18',
      birthPlace: 'Shawnee, Oklahoma, USA',
      height: 180,
      popularity: 8.7,
      knownFor: ['Fight Club', 'Once Upon a Time in Hollywood', 'Se7en', 'Inglourious Basterds'],
      socialMedia: {},
      imdbId: 'nm0000093',
      movieIds: ['7', '27'],
    },
    {
      id: 'actor-8',
      name: 'Emma Stone',
      slug: 'emma-stone',
      profileImage: '/placeholder.svg?height=400&width=300',
      biography:
        "Emily Jean 'Emma' Stone is an American actress. She is the recipient of various accolades, including an Academy Award, a British Academy Film Award, and a Golden Globe Award.",
      birthDate: '1988-11-06',
      birthPlace: 'Scottsdale, Arizona, USA',
      height: 168,
      popularity: 8.6,
      knownFor: ['La La Land', 'The Favourite', 'Easy A', 'Birdman'],
      socialMedia: {},
      imdbId: 'nm1297015',
      movieIds: ['8', '28'],
    },
    {
      id: 'actor-9',
      name: 'Morgan Freeman',
      slug: 'morgan-freeman',
      profileImage: '/placeholder.svg?height=400&width=300',
      biography:
        'Morgan Freeman is an American actor, director, and narrator. He has appeared in a range of film genres portraying character roles and is particularly known for his distinctive deep voice.',
      birthDate: '1937-06-01',
      birthPlace: 'Memphis, Tennessee, USA',
      height: 188,
      popularity: 8.9,
      knownFor: ['The Shawshank Redemption', 'Million Dollar Baby', 'Se7en', 'Bruce Almighty'],
      socialMedia: {
        twitter: '@morgan_freeman',
      },
      imdbId: 'nm0000151',
      movieIds: ['2', '9', '29'],
    },
    {
      id: 'actor-10',
      name: 'Jennifer Lawrence',
      slug: 'jennifer-lawrence',
      profileImage: '/placeholder.svg?height=400&width=300',
      biography:
        "Jennifer Shrader Lawrence is an American actress. The world's highest-paid actress in 2015 and 2016, her films have grossed over $6 billion worldwide to date.",
      birthDate: '1990-08-15',
      birthPlace: 'Indian Hills, Kentucky, USA',
      height: 175,
      popularity: 8.5,
      knownFor: ['The Hunger Games', 'Silver Linings Playbook', 'American Hustle', "Winter's Bone"],
      socialMedia: {},
      imdbId: 'nm2225369',
      movieIds: ['10', '30'],
    },
  ]

  return NextResponse.json(actors)
}
