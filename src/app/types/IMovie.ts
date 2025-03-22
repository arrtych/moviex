
import {
  Rating,
  Votes,
  ExternalId,
  Name,
  Country,
  Genre,
  Person,
  VideoItem,
  Logo,
  Fees,
  Watchability,
  Premiere,
from "@/interfaces/common.interfaces";


// export interface IMovie {
//   id: number;
//   name: string;
//   alternativeName: string;
//   year: number;
//   rating: {
//     kp: number;
//     imdb: number;
//   };
//   poster: {
//     url: string;
//   };
//   genres: Array<{ name: string }>;
//   description: string;
// }




export interface IMovie {
  // Required fields - core movie data
  id: number;
  name: string;
  alternativeName: string;
  type:
    | "movie"
    | "tv-series"
    | "cartoon"
    | "anime"
    | "animated-series"
    | "tv-show";
  year: number;
  description: string;
  movieLength: number;
  rating: Rating;
  votes: Votes;
  poster: Logo;
  backdrop: Logo;
  genres: Genre[];
  countries: Country[];
  persons: Person[];

  // Optional fields
  enName?: string | null;
  externalId?: ExternalId;
  names?: Name[];
  typeNumber?: number;
  shortDescription?: string | null;
  slogan?: string | null;
  status?: string | null;
  isSeries?: boolean;
  totalSeriesLength?: number | null;
  seriesLength?: number | null;
  ratingMpaa?: string | null;
  ageRating?: number | null;
  top10?: number | null;
  top250?: number | null;
  ticketsOnSale?: boolean;
  budget?: {
    value: number;
    currency: string;
  };
  fees?: Fees;
  premiere?: Premiere;
  watchability?: Watchability;
  videos?: {
    trailers?: VideoItem[];
  };
  audience?: Array<{
    count: number;
    country: string;
  }>;
  lists?: string[];
  networks?: string[] | null;
  sequelsAndPrequels?: Array<{
    id: number;
    name: string;
    alternativeName: string;
    enName: string | null;
    type: string;
    poster: Logo;
  }>;

  // Metadata
  createdAt: string;
  updatedAt: string;
  isTmdbChecked?: boolean;
  logo?: Logo;
}

