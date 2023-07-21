import { Rating } from "react-simple-star-rating";

type FilterProps = {
  setFilterRatingValue: React.Dispatch<React.SetStateAction<number>>;
};

export default ({ setFilterRatingValue }: FilterProps) => {
  const handleRating = (rate: number) => {
    setFilterRatingValue(rate);
  };

  return (
    <Rating
      onClick={handleRating}
      size={25}
      SVGstyle={{ display: "inline-block" }}
      initialValue={0}
      showTooltip={true}
      tooltipClassName="w-40 text-center bg-slate-800 inline"
      tooltipArray={[
        "Puntuación 0",

        "Puntuación 2",

        "Puntuación 4",

        "Puntuación 6",

        "Puntuación 8",
      ]}
      tooltipDefaultText="Puntuación 0"
    />
  );
};
