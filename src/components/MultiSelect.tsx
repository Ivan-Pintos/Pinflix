import { AiOutlineCheckSquare, AiFillCheckSquare } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import { Genres } from "../../utils";

type MultiSelectProps = {
  genres: Genres[];
  onSelectedChange?: (selected: number[]) => void;
};

export default ({ genres, onSelectedChange }: MultiSelectProps) => {
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const genre = searchParams.get("genre");

  useEffect(() => {
    genre && setSelectedOptions([Number(genre)]);
  }, [genre]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option: Genres) => {
    if (selectedOptions.find((opt) => opt === option.id)) {
      setSelectedOptions((prev) => prev.filter((opt) => opt !== option.id));
    } else {
      setSelectedOptions((prev) => [...prev, option.id]);
    }
  };

  useEffect(() => {
    onSelectedChange && onSelectedChange(selectedOptions);
  }, [selectedOptions]);

  return (
    <div className="relative w-full sm:w-64 " ref={dropdownRef}>
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className={`cursor-pointer p-2 bg-slate-800  rounded flex justify-between items-center ${
          isOpen && "border-b-0"
        }`}
      >
        <span>Generos</span>
        <MdKeyboardArrowDown />
      </div>
      {isOpen && (
        <div className="absolute flex flex-col gap-2 bg-slate-900   rounded-b p-2 z-10 w-full">
          {genres.map((genre) => (
            <div
              key={genre.id}
              onClick={() => handleOptionClick(genre)}
              className="cursor-pointer flex justify-between border-b-2 border-b-slate-400 pb-2"
            >
              <span>{genre.name}</span>
              {selectedOptions.find((opt) => opt === genre.id) ? (
                <AiFillCheckSquare />
              ) : (
                <AiOutlineCheckSquare />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
