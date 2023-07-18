import { Link } from "react-router-dom";

export default () => {
  return (
    <div className="bg-gradient-opacity w-full px-2 md:px-10 text-slate-100 bg-opacity-80 absolute z-10 h-16 flex items-center justify-between">
      <Link to="/" className=" text-xl">
        Pinflix
      </Link>
      <Link
        to="/movies"
        className="bg-slate-800 rounded-md px-3 py-1 hover:bg-slate-900 transition-all"
      >
        Movies
      </Link>
    </div>
  );
};
