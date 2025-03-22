export interface Rating {
  kp: number;
  imdb: number;
  filmCritics: number;
  russianFilmCritics: number;
  await: number | null;
}

export interface Votes {
  kp: number;
  imdb: number;
  filmCritics: number;
  russianFilmCritics: number;
  await: number;
}

export interface ExternalId {
  kpHD?: string;
  imdb?: string;
  tmdb?: number;
}

export interface Name {
  name: string;
  language?: string;
  type?: string | null;
}

export interface Country {
  name: string;
}

export interface Genre {
  name: string;
}

export interface Person {
  id: number;
  photo: string;
  name: string | null;
  enName: string | null;
  description: string | null;
  profession: string;
  enProfession: string;
}

export interface VideoItem {
  url: string;
  name: string;
  site: string;
  type: string;
}

export interface Logo {
  url: string;
  previewUrl: string;
}

export interface Fees {
  world?: {
    value: number;
    currency: string;
  };
  usa?: {
    value: number;
    currency: string;
  };
}

export interface Watchability {
  items?: Array<{
    name: string;
    logo: {
      url: string;
    };
    url: string;
  }>;
}

export interface Premiere {
  country?: string | null;
  world?: string | null;
  russia?: string | null;
  digital?: string | null;
  cinema?: string | null;
  bluray?: string | null;
  dvd?: string | null;
}
