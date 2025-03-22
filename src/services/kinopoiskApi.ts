import axios from "axios";
import { IMovie } from "@/app/types/IMovie";

type ApiInstance = ReturnType<typeof axios.create>;

export class KinopoiskAPI {
  private readonly api: ApiInstance;
  private static instance: KinopoiskAPI;

  private constructor() {
    this.api = axios.create({
      baseURL: "https://api.kinopoisk.dev/v1.4",
      headers: {
        accept: "application/json",
        "X-API-KEY": process.env.NEXT_PUBLIC_KINOPOISK_API_KEY || "",
      },
      timeout: 10000,
    });

    // Add response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error("API Error Details:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });

        if (error.response) {
          switch (error.response.status) {
            case 401:
              throw new Error("Unauthorized: Invalid API key");
            case 404:
              throw new Error("Movie not found");
            case 429:
              throw new Error("Too many requests");
            case 500:
              throw new Error(
                error.response.data?.error || "Internal server error"
              );
            default:
              throw new Error(
                `API Error: ${
                  error.response.data?.error || error.message || "Unknown error"
                }`
              );
          }
        }
        if (error.code === "ECONNABORTED") {
          throw new Error("Request timeout - please try again");
        }
        throw new Error(`Network error: ${error.message}`);
      }
    );
  }

  public static getInstance(): KinopoiskAPI {
    if (!KinopoiskAPI.instance) {
      KinopoiskAPI.instance = new KinopoiskAPI();
    }
    return KinopoiskAPI.instance;
  }

  /**
   * Fetches movie details by ID
   * @param id - Kinopoisk movie ID
   * @returns Promise with movie details
   * @throws Error if the request fails
   */
  public async getMovieById(id: number): Promise<IMovie> {
    try {
      console.log(`Fetching movie with ID: ${id}`);
      const response = await this.api.get(`/movie/${id}`);
      return response.data;
    } catch (error) {
      console.error("getMovieById error:", error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Failed to fetch movie details");
    }
  }

  /**
   * Searches for movies by various parameters
   * @param params - Search parameters
   * @returns Promise with search results
   */
  public async searchMovies(
    params: SearchMovieParams
  ): Promise<SearchResponse<IMovie>> {
    try {
      const response = await this.api.get("/movie", {
        params: {
          ...params,
          limit: params.limit || 10,
          page: params.page || 1,
        },
      });
      return response.data;
    } catch (error) {
      console.error("searchMovies error:", error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Failed to search movies");
    }
  }
}

export interface SearchMovieParams {
  query?: string;
  type?: string;
  year?: number;
  rating?: {
    kp?: number;
    imdb?: number;
  };
  actor?: string;
  director?: string;
  genre?: string;
  country?: string;
  page?: number;
  limit?: number;
}

export interface SearchResponse<T> {
  docs: T[];
  total: number;
  limit: number;
  page: number;
  pages: number;
}

// Export singleton instance
export const kinopoiskApi = KinopoiskAPI.getInstance();
