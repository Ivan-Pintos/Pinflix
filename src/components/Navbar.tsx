import { AiOutlineMenu } from "react-icons/ai";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Offcanvas from "./offcanvas/Offcanvas";
import { Genres } from "../../utils";

export default () => {
  const [openOffcanvas, setOpenOffcanvas] = useState(false);
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
  return (
    <div className="bg-gradient-opacity w-full px-2 md:px-10 text-slate-100 bg-opacity-80 absolute z-10 h-16 ">
      <div className="flex items-center justify-between h-full">
        <Link to="/" className=" text-xl">
          Pinflix
        </Link>
        <button
          onClick={() => setOpenOffcanvas((prev) => !prev)}
          className="font-semibold"
        >
          <AiOutlineMenu />
        </button>
      </div>
      <Offcanvas
        open={openOffcanvas}
        setOpen={setOpenOffcanvas}
        sections={[
          {
            title: "Listado de Peliculas",
            content: {
              type: "link",
              url: "/movies",
            },
          },
          {
            title: "Generos",
            content: {
              type: "Options",
              options: genres.map((genre) => ({
                text: genre.name,
                url: `/movies?genre=${genre.id}`,
              })),
            },
          },
        ]}
        title="Pinflix"
        searchInput={true}
      />
    </div>
  );
};
