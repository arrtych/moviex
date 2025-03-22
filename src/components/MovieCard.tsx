import Image from "next/image";
import { IMovie } from "@/app/types/IMovie";

interface MovieCardProps {
  movie: IMovie;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-sm">
      <div className="relative h-[400px]">
        <Image
          src={movie.poster.url}
          alt={movie.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{movie.name}</h2>
        <p className="text-gray-600 mb-2">{movie.alternativeName}</p>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-500">{movie.year}</span>
          <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
            Rating: {movie.rating.kp.toFixed(1)}
          </span>
        </div>
        <p className="text-sm text-gray-700 line-clamp-3">
          {movie.shortDescription || movie.description}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {movie.genres.slice(0, 3).map((genre, index) => (
            <span
              key={index}
              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
            >
              {genre.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
