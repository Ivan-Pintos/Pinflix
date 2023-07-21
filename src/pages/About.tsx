import TechnologyIcon from "../components/TechnologyIcon";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

import TailwindIcon from "../img/Tailwind CSS.svg";
import TypeScriptIcon from "../img/TypeScript.svg";
import ReactIcon from "../img/React.svg";
import ViteIcon from "../img/Vite.js.svg";
import AxiosIcon from "../img/Azios.svg";
import header from "../img/header.jpg";

export default () => {
  const icons = [
    {
      Img: TailwindIcon,
      AltText: "Tailwind CSS icon",
      TechnologyName: "Tailwind CSS",
    },
    {
      Img: TypeScriptIcon,
      AltText: "TypeScript icon",
      TechnologyName: "TypeScript",
    },
    {
      Img: ReactIcon,
      AltText: "React.js icon",
      TechnologyName: "React.js",
    },

    {
      Img: ViteIcon,
      AltText: "Vite.js icon",
      TechnologyName: "Vite.js",
    },
    {
      Img: AxiosIcon,
      AltText: "Axios icon",
      TechnologyName: "Axios",
    },
  ];
  return (
    <>
      <Navbar />
      <Header img={header} />

      <div className="text-slate-200 mx-2 md:mx-10 flex flex-col gap-5 mt-10">
        <h1 className="text-2xl border-b pb-2 border-b-blue-400 font-semibold">
          Acerca de este proyecto
        </h1>
        <div className=" flex flex-col gap-5">
          <p className=" font-lg sm:font-md ">
            Este proyecto es una página web que rediseñé basándome en uno de mis
            proyectos anteriores de{" "}
            <a href="https://ha.dev/" className="underline-offset-2 underline">
              Hack Academy
            </a>
            . Mi objetivo era aprender nuevas tecnologías, como TypeScript y
            Tailwind CSS, para mejorar mis habilidades en el desarrollo web.
          </p>
          <p>
            Gracias a TypeScript, pude desarrollar un código más seguro y
            robusto al detectar errores en tiempo de compilación y Tailwind CSS
            me permitió diseñar una interfaz moderna y atractiva de manera
            eficiente.
          </p>
          <p className="mb-5">
            Durante el desarrollo, utilicé la librería Axios para realizar
            peticiones HTTP a la API{" "}
            <a
              href="https://www.themoviedb.org/"
              className="underline-offset-2 underline"
            >
              The Movie Database
            </a>{" "}
            que proporciona datos actualizados sobre películas y series de
            televisión. Esta API fue una fuente valiosa para obtener información
            detallada sobre las películas
          </p>
        </div>
        <h1 className="text-2xl border-b pb-2 border-b-blue-400 font-semibold">
          Tecnologias
        </h1>
        <div className="flex flex-wrap justify-around">
          {icons.map((icon, index) => (
            <TechnologyIcon
              Img={icon.Img}
              AltText={icon.AltText}
              TechnologyName={icon.TechnologyName}
              key={index}
            />
          ))}
        </div>
      </div>
    </>
  );
};
