import { MdKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState } from "react";

type OffCanvasProps = {
  title: string;
  options: { text: string; url: string }[];
};

const OffCanvas: React.FC<OffCanvasProps> = ({ title, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <h3
        onClick={handleClick}
        className="cursor-pointer border-b-blue-500 border-b pb-2 px-1 text-lg flex gap-2 items-center hover:text-blue-400"
      >
        {title} <MdKeyboardArrowDown />
      </h3>
      {isOpen && (
        <ul className="flex flex-col gap-1 py-2">
          {options.map((option, index) => (
            <li key={index} className="ml-5 font-lg">
              <Link to={option.url} className="hover:text-blue-400">
                {option.text}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OffCanvas;
