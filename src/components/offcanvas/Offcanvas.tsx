import OffcanvasOption from "./OffcanvasOption";
import SearchInput from "../SearchInput";

import { Link } from "react-router-dom";

type OptionsType = {
  type: "Options";
  options: { text: string; url: string }[];
};

type TextType = {
  type: "text";
  text: string;
};
type LinkType = {
  type: "link";
  url: string;
};

type ContentSection = OptionsType | TextType | LinkType;

type Sections = {
  title: string;
  content: ContentSection;
};

type OffCanvasProps = {
  open: boolean;
  sections: Sections[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  searchInput?: { title?: string; placeholder?: string } | boolean;
};
export default ({
  open,
  setOpen,
  sections,
  title,
  searchInput,
}: OffCanvasProps) => {
  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full transition-transform duration-200 ease-in-out transform ${
        open ? "translate-x-0" : "translate-x-full"
      } bg-slate-800 w-full sm:w-72 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-slate-700`}
    >
      {/* Aquí el contenido del OffCanvas */}
      <div className="text-white p-4 flex flex-col gap-5 sm:mt-0 h-full ">
        <div className="flex justify-between items-center mb-10">
          <h1 className=" text-2xl">{title}</h1>
          <button
            onClick={handleToggle}
            className={` text-white text-2xl focus:outline-none`}
          >
            &times;
          </button>
        </div>

        {searchInput && (
          <div className="flex flex-col gap-2">
            {searchInput && typeof searchInput === "object" && (
              <label htmlFor="search">
                {searchInput.title && searchInput.title}
              </label>
            )}

            <SearchInput redirectSearch="/movies" inputId="search" />
          </div>
        )}

        {sections.map((section) => {
          switch (section.content.type) {
            case "Options":
              return (
                <OffcanvasOption
                  title={section.title}
                  options={section.content.options}
                />
              );
            case "link":
              return (
                <Link
                  to={`${section.content.url}`}
                  className="cursor-pointer border-b-blue-500 border-b pb-2 px-1  text-lg"
                >
                  {section.title}
                </Link>
              );

            default:
              return null;
          }
        })}
      </div>
    </div>
  );
};
