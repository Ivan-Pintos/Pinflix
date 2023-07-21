import ListLineMoviesItems from "../components/ListLineMoviesItems";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import header from "../img/header.jpg";

import { sortvalue } from "../../utils";

export default () => {
  return (
    <>
      <Navbar />
      <Header img={header} />

      <div className="text-slate-200 mx-2 md:mx-10 flex flex-col">
        <ListLineMoviesItems Title={"Populares"} value={sortvalue.populars} />
        <ListLineMoviesItems
          Title={"Futuros estrenos"}
          value={sortvalue.news}
        />
        <ListLineMoviesItems
          Title={"Mejor puntuación"}
          value={sortvalue.votes}
          rate={true}
        />
      </div>
    </>
  );
};
