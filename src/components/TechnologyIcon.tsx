type TechnologyIconProps = {
  Img: string;
  AltText: string;
  TechnologyName: string;
};

export default ({ Img, AltText, TechnologyName }: TechnologyIconProps) => {
  return (
    <div className="flex flex-col gap-2">
      <img
        src={Img}
        alt={AltText}
        className="h-32 w-32 border-b border-blue-400 pb-5"
      />
      <h2 className="text-center pb-5">{TechnologyName}</h2>
    </div>
  );
};
