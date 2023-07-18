//r
type headerProps = {
  img: string;
  Title?: string;
};
export default ({ img, Title }: headerProps) => {
  return (
    <div className="h-40 md:h-80 bg-slate-900  relative">
      <div className="absolute w-full h-full bg-gradient-to-b from-transparent to-slate-950"></div>
      {img ? (
        <img
          src={img}
          alt="Imagen de encabezado"
          className="w-full h-full object-cover "
        />
      ) : (
        <div className="w-full h-full bg-gray-300 animate-pulse"></div>
      )}
      {Title && (
        <h1 className="text-xl w-full  font-semibold text-slate-100 text-center md:text-left absolute bottom-0 px-10 py-5 bg-opacity-70">
          {Title}
        </h1>
      )}
    </div>
  );
};
