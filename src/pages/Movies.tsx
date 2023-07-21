import InfiniteScroll from "../components/InfiniteScroll";
import ScrollUpButton from "../components/ScrollUpButton";
import FilterStars from "../components/FilterStars";
import SearchInput from "../components/SearchInput";
import MultiSelect from "../components/MultiSelect";
import MoviesItem from "../components/MovieItem";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import header from "../img/header.jpg";

import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { Movie, Genres } from "../../utils";

type dataObject = {
  total_pages: number;
};
export default () => {
  const [data, setData] = useState<dataObject>({ total_pages: 10 }); // response from axios call
  const [filterRatingValue, setFilterRatingValue] = useState<number>(0);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState<string>("");
  const [queryChange, setQueryChange] = useState<boolean>();
  const [genresSelected, setGenresSelected] = useState<number[]>();
  const [genres, setGenres] = useState<Genres[]>([]);

  useEffect(() => {
    const getGenres = async () => {
      const options = {
        method: "GET",
        url: `${import.meta.env.VITE_API_URL_GENRES}`,
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SECRET_TOKEN}`,
        },
      };

      let response = await axios.request(options);
      setGenres(response.data.genres);
      return;
    };

    getGenres();
  }, []);

  const handleSelectedChange = (selected: any) => {
    setGenresSelected(selected);
  };

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get("search");
  const genre = searchParams.get("genre");
  useEffect(() => {
    search && setQuery(search);
  }, [search]);

  useEffect(() => {
    setQueryChange(true);
    setTimeout(() => {
      setQueryChange(false);
    }, 2000);
  }, [query]);

  useEffect(() => {
    const getFirstMovies = async () => {
      const options = {
        method: "GET",
        url: query.trim()
          ? `${import.meta.env.VITE_API_URL_SEARCH}?query=${query}`
          : genre
          ? `${import.meta.env.VITE_API_URL_DISCOVER}?with_genres=${genre}`
          : `${import.meta.env.VITE_API_URL_DISCOVER}`,
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SECRET_TOKEN}`,
        },
      };

      let response = await axios.request(options);
      query.trim() && setData({ total_pages: response.data.total_pages });
      setMovies(response.data.results);
      return;
    };

    getFirstMovies();
  }, [query]);

  return (
    <>
      <Navbar />
      <Header img={header} />
      <div className="text-slate-200 mx-2 md:mx-10 flex flex-col gap-2 mt-5">
        <section className="flex justify-around items-center flex-col gap-4 sm:flex-row ">
          <FilterStars setFilterRatingValue={setFilterRatingValue} />
          <MultiSelect
            genres={genres}
            onSelectedChange={handleSelectedChange}
          />
          <SearchInput
            ApiUrl={`${import.meta.env.VITE_API_URL_SEARCH}`}
            setResponse={setMovies}
            searchType="onChange"
            inputQuery={query}
            setExternalQuery={setQuery}
            setAllData={setData}
            theme="dark"
          />
        </section>

        <section className="flex flex-col gap-4">
          <h1 className="text-2xl border-b pb-2 border-b-blue-400">
            Peliculas
          </h1>

          <div className="flex flex-wrap">
            {movies.length > 0 &&
            movies.filter((movie) =>
              genresSelected && genresSelected.length > 0
                ? genresSelected.every((genre) =>
                    movie.genre_ids?.includes(genre)
                  ) && movie.vote_average / 2 >= filterRatingValue - 1
                : movie.vote_average / 2 >= filterRatingValue - 1
            )
              ? movies
                  .filter((movie) =>
                    genresSelected && genresSelected.length > 0
                      ? genresSelected.every((genre) =>
                          movie.genre_ids?.includes(genre)
                        ) && movie.vote_average / 2 >= filterRatingValue - 1
                      : movie.vote_average / 2 >= filterRatingValue - 1
                  )
                  .map((movie: Movie) => {
                    return (
                      <MoviesItem movie={movie} key={movie.id} rate={true} />
                    );
                  })
              : "No encontramos ninguna película con las opciones de filtro seleccionadas. Por favor, seleccione otras opciones de filtro."}
          </div>
        </section>
        <ScrollUpButton />
        <InfiniteScroll
          originalContent={movies}
          setOriginalContent={setMovies}
          ApiUrl={
            query.trim()
              ? `${import.meta.env.VITE_API_URL_SEARCH}?query=${query}`
              : genresSelected
              ? `${
                  import.meta.env.VITE_API_URL_DISCOVER
                }?with_genres=${genresSelected.map((genre) => genre + ",")}`
              : `${import.meta.env.VITE_API_URL_DISCOVER}`
          }
          iterationMaxNumber={query.trim() ? data.total_pages : 500}
          resetPageCounter={queryChange}
        />
      </div>
    </>
  );
};
