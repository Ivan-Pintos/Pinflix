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
        "0 Rating",

        "2 Rating",

        "4 Rating",

        "6 Rating",

        "8 Rating",
      ]}
      tooltipDefaultText="0 Rating"
    />
  );
};
