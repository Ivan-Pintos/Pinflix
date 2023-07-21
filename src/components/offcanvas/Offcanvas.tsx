import { AiFillGithub, AiFillLinkedin, AiFillMail } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

import OffcanvasOption from "./OffcanvasOption";
import SearchInput from "../SearchInput";

import "react-toastify/dist/ReactToastify.css";

type OptionsType = {
  type: "Options";
  options: { text: string; url: string }[];
};
type LinkType = {
  type: "link";
  url: string;
};
type TextType = {
  type: "text";
  text: string;
};
type LinkButton = {
  icon: "linkedin" | "github" | "mail";
  url: string;
};
type CopyButton = {
  icon: "mail";
  copyText: string;
};
type ValidButton = LinkButton | CopyButton;

type ContactButtonType = {
  type: "button";
  button: ValidButton[] | ValidButton;
};

type ContentSection = OptionsType | TextType | LinkType | ContactButtonType; //TODO: Create a component for ContactButtonType

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
  const handleCopyClick = async (textToCopy: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      toast(`${textToCopy} copiado correctamente`);
    } catch (err) {
      toast(`El texto ${textToCopy} no se pudo copiar correctamente`);
    }
  };

  return (
    <>
      <ToastContainer
        theme="dark"
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        progressStyle={{ background: "#3F83F8" }}
      />
      <div
        className={`fixed top-0 right-0 h-full transition-transform duration-200 ease-in-out transform ${
          open ? "translate-x-0" : "translate-x-full"
        } bg-slate-800 w-full sm:w-72 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-slate-700`}
      >
        <div className="text-white p-4 flex flex-col gap-5 sm:mt-0 h-full  ">
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
                    className="cursor-pointer border-b-blue-500 border-b pb-2 px-1 text-lg hover:text-blue-400"
                  >
                    {section.title}
                  </Link>
                );
              case "button":
                const buttonContent = section.content as ContactButtonType;
                return (
                  <div>
                    <div className="border-b-blue-500 border-b pb-2 px-1 mb-5 text-lg">
                      {section.title}
                    </div>
                    <div className="flex flex-wrap ml-5 gap-5">
                      {Array.isArray(buttonContent.button) ? (
                        buttonContent.button.map((button) =>
                          "url" in button ? (
                            <Link
                              to={button.url}
                              className="flex gap-2 items-center border-b pb-2 border-b-blue-400  hover:text-blue-400"
                            >
                              {button.icon === "github" && (
                                <>
                                  <span className="text-md">Github</span>
                                  <span className="text-2xl">
                                    <AiFillGithub />
                                  </span>
                                </>
                              )}
                              {button.icon === "linkedin" && (
                                <>
                                  <span className="text-md">Linkedin</span>
                                  <span className="text-2xl">
                                    <AiFillLinkedin />
                                  </span>
                                </>
                              )}
                            </Link>
                          ) : (
                            <button
                              onClick={() => {
                                handleCopyClick(button.copyText);
                              }}
                              className="flex gap-2 items-center border-b pb-2 border-b-blue-400 hover:text-blue-400"
                            >
                              <span className="text-md">Email</span>
                              <span className="text-2xl">
                                <AiFillMail />
                              </span>
                            </button>
                          )
                        )
                      ) : "url" in buttonContent.button ? (
                        <Link
                          to={buttonContent.button.url}
                          className="flex gap-2 items-center border-b pb-2 border-b-blue-400 hover:text-blue-400"
                        >
                          {buttonContent.button.icon === "github" && (
                            <>
                              <span className="text-md">Github</span>
                              <span className="text-2xl">
                                <AiFillGithub />
                              </span>
                            </>
                          )}
                          {buttonContent.button.icon === "linkedin" && (
                            <>
                              <span className="text-md">Linkedin</span>
                              <span className="text-2xl">
                                <AiFillLinkedin />
                              </span>
                            </>
                          )}
                        </Link>
                      ) : (
                        "copyText" in buttonContent.button && (
                          <button
                            onClick={() => {
                              let copyButton =
                                buttonContent.button as CopyButton;
                              handleCopyClick(copyButton.copyText);
                            }}
                            className="flex gap-2 items-center border-b pb-2 border-b-blue-400 hover:text-blue-400"
                          >
                            <span className="text-md">Email</span>
                            <span className="text-2xl">
                              <AiFillMail />
                            </span>
                          </button>
                        )
                      )}
                    </div>
                  </div>
                );
              default:
                return null;
            }
          })}
        </div>
      </div>
    </>
  );
};
