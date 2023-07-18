import { AiFillStar } from "react-icons/ai";
import { Movie } from "../../utils.ts";
import { useNavigate } from "react-router-dom";

type MovieProps = {
  movie: Movie;
  rate?: boolean;
};
export default ({ movie, rate }: MovieProps) => {
  const navigate = useNavigate();
  const handleRedirectToMovie = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className=" w-1/2 md:w-1/3 xl:w-1/6  p-1">
      <div
        className="flex flex-col  items-center relative hover:cursor-pointer h-full"
        onClick={handleRedirectToMovie}
      >
        <img
          src={`${import.meta.env.VITE_API_URL_IMG}${movie.poster_path}`}
          alt={`Poster image of ${movie.title} movie`}
          className="h-96 w-full object-cover"
        />
        <div className="bg-slate-900 py-2 px-1 h-20 w-full flex items-center justify-center">
          {movie.title}
        </div>
        {rate && (
          <span className="flex gap-2 items-center px-2 absolute text-yellow-500 right-0 mt-2 mr-2 bg-slate-950">
            <span>{movie.vote_average}</span>
            <AiFillStar />
          </span>
        )}
      </div>
    </div>
  );
};
