export type Movie = {
  adult: number;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: LanguageCode;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  genres?: { id: number; name: string }[];
  revenue?: number;
  runtime?: number;
};
type VideoResult = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
};

export type MovieVideos = {
  id: number;
  results: VideoResult[];
};

export type LanguageCode =
  | "en"
  | "es"
  | "fr"
  | "de"
  | "it"
  | "pt"
  | "ru"
  | "ja"
  | "zh"
  | "ar"
  | "hi"
  | "ko";

export enum sortvalue {
  votes,
  populars,
  news,
}

export const languageCodes: { [key in LanguageCode]?: string } = {
  en: "Inglés",
  es: "Español",
  fr: "Francés",
  de: "Alemán",
  it: "Italiano",
  pt: "Portugués",
  ru: "Ruso",
  ja: "Japonés",
  zh: "Chino",
  ar: "Árabe",
  hi: "Hindi",
  ko: "Coreano",
};
