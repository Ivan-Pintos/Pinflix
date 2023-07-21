import { AiOutlineMenu } from "react-icons/ai";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Offcanvas from "./offcanvas/Offcanvas";
import { Genres } from "../../utils";

import testLogo from "../img/LogoPinflix.svg";
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
          <img src={testLogo} alt="" className="h-10" />
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
            title: "Generos",
            content: {
              type: "Options",
              options: genres.map((genre) => ({
                text: genre.name,
                url: `/movies?genre=${genre.id}`,
              })),
            },
          },
          {
            title: "Listado de Peliculas",
            content: {
              type: "link",
              url: "/movies",
            },
          },
          {
            title: "Acerca de este proyecto",
            content: {
              type: "link",
              url: "/about",
            },
          },
          {
            title: "Contacto",
            content: {
              type: "button",
              button: [
                { icon: "github", url: "https://github.com/Ivan-Pintos" },
                {
                  icon: "linkedin",
                  url: "https://www.linkedin.com/in/ivan-pintos/",
                },
                {
                  icon: "mail",
                  copyText: "ivanleonpintos@gmail.com",
                },
              ],
            },
          },
        ]}
        title="Pinflix"
        searchInput={true}
      />
    </div>
  );
};
