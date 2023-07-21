import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Carousel } from "flowbite-react";
import uniqolor from "uniqolor";
import axios from "axios";

import YoutubeVideo from "../components/YoutubeVideo";
import { Rating } from "react-simple-star-rating";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

import { Movie, languageCodes, MovieVideos } from "../../utils";

export default () => {
  const [movie, setMovie] = useState<Movie>();
  const [movieVideos, setMovieVideos] = useState<MovieVideos>();
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const getMovie = async () => {
      const options = {
        method: "GET",
        url: `${
          import.meta.env.VITE_API_URL_DETAILS_MOVIE
        }${id}?language=es-ES`,
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SECRET_TOKEN}`,
        },
      };

      let response = await axios.request(options);
      return setMovie(response.data);
    };

    getMovie();
  }, []);

  useEffect(() => {
    const getVideos = async () => {
      const options = {
        method: "GET",
        url: `${import.meta.env.VITE_API_URL_DETAILS_MOVIE}${id}/videos`,
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SECRET_TOKEN}`,
        },
      };

      let response = await axios.request(options);
      return setMovieVideos({
        ...response.data,
        results: response.data.results.slice(0, 5),
      });
    };

    getVideos();
  }, [movie]);

  const MovieDuration = (durationtTime: number): string => {
    const hours: number = Math.floor(durationtTime / 60);
    const munutes: number = durationtTime - hours * 60;
    return `${hours}h ${munutes}m`;
  };
  return (
    movie && (
      <>
        <Navbar />
        <>
          <Header
            img={`${import.meta.env.VITE_API_URL_IMG}${movie.backdrop_path}`}
            Title={movie.title}
          />
          <div className="text-slate-200 mx-2  md:mx-10 py-5 flex flex-col md:flex-row-reverse gap-20">
            <div className="flex flex-col w-full md:w-1/3 gap-4 items-center">
              <img
                src={`${import.meta.env.VITE_API_URL_IMG}${movie.poster_path}`}
                alt={`poster de la pelicula ${movie.title}`}
                className="rounded-xl"
              />
              <div className="block md:hidden">
                <Rating
                  size={25}
                  SVGclassName="inline-flex"
                  initialValue={Math.floor(movie.vote_average)}
                  iconsCount={10}
                  readonly
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 w-full md:w-2/3">
              <div className="flex flex-wrap gap-5">
                {movie.genres &&
                  movie.genres.map((genre) => {
                    const { color } = uniqolor(genre.id, {
                      saturation: 80,
                      lightness: [10, 20],
                    });

                    return (
                      <span
                        key={genre.id}
                        className="border rounded-2xl px-2 py-1 font-semibold hover:cursor-pointer hover:brightness-125"
                        style={{ backgroundColor: color }}
                        onClick={() => navigate(`/movies?genre=${genre.id}`)}
                      >
                        {genre.name}
                      </span>
                    );
                  })}
              </div>
              <h2 className="text-2xl font-semibold">Descripción</h2>
              <p>{movie.overview}</p>
              <div className="flex flex-row gap-10 justify-between my-10 lg:w-2/3">
                <div className="flex flex-col gap-4">
                  <div>
                    <h3 className="text-xl font-semibold">Lenguaje original</h3>
                    <span>{languageCodes[movie.original_language]}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Cantidad de votos</h3>
                    <span>{movie.vote_count.toLocaleString("es-ES")}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Recaudación</h3>
                    <span>
                      $ {movie.revenue && movie.revenue.toLocaleString("es-ES")}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div>
                    <h3 className="text-xl font-semibold">
                      Fecha de lanzamiento
                    </h3>
                    <span>{movie.release_date}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Duracion</h3>
                    <span>{movie.runtime && MovieDuration(movie.runtime)}</span>
                  </div>
                  <div className="hidden sm:block">
                    <h3 className="text-xl font-semibold">Rating:</h3>
                    <Rating
                      size={25}
                      SVGclassName="inline-flex"
                      initialValue={Math.floor(movie.vote_average)}
                      iconsCount={10}
                      readonly
                    />
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-2/3 h-80">
                <Carousel slide={false}>
                  {movieVideos?.results.map((result) => (
                    <YoutubeVideo VideoID={result.key} key={result.id} />
                  ))}
                </Carousel>
              </div>
            </div>
          </div>
        </>
      </>
    )
  );
};
