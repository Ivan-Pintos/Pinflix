import { BsArrowUpCircle, BsFillArrowUpCircleFill } from "react-icons/bs";
import { useState } from "react";

export default () => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={scrollToTop}
      className="fixed bottom-10 right-10 text-blue-500 text-4xl bg-slate-950 rounded-full
      "
    >
      {isHovering ? <BsFillArrowUpCircleFill /> : <BsArrowUpCircle />}
    </button>
  );
};
