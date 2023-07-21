import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

type searchProps = {
  ApiUrl?: string;
  setResponse?: React.Dispatch<React.SetStateAction<any[]>>;
  searchType?: "onChange" | "onSubmit";
  setAllData?: React.Dispatch<React.SetStateAction<any>>;
  setExternalQuery?: React.Dispatch<React.SetStateAction<string>>;
  redirectSearch?: string;
  inputQuery?: string;
  placeholder?: string;
  inputId?: string;
  theme?: "dark" | "light";
};

export default ({
  ApiUrl,
  setResponse,
  searchType,
  setExternalQuery,
  setAllData,
  redirectSearch,
  inputQuery,
  inputId,
  placeholder,
  theme,
}: searchProps) => {
  const [query, setQuery] = useState<string>("");
  const navigate = useNavigate();

  const handleSearch = async (value: string) => {
    if (value.trim() && !redirectSearch) {
      const options = {
        method: "GET",
        url: ApiUrl,
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SECRET_TOKEN}`,
        },
        params: {
          query: value,
        },
      };

      let response = await axios.request(options);
      setAllData && setAllData({ total_pages: response.data.total_pages }); // possible wrong
      setResponse && setResponse(response.data.results);
      return;
    }
    if (redirectSearch) {
      navigate(`${redirectSearch}?search=${query}`);
    }
  };
  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setExternalQuery && setExternalQuery(event.target.value);
    searchType === "onChange" && handleSearch(event.target.value);
  };

  return (
    <form
      className="flex w-full sm:w-auto items-center h-full"
      onSubmit={(event) => {
        event.preventDefault();
        handleSearch(query);
      }}
    >
      <input
        type="text"
        placeholder={placeholder ? placeholder : "Buscar..."}
        className={`rounded-s-lg h-full outline-0 w-full ${
          theme === "dark"
            ? "bg-slate-800 border-0 text-slate-200"
            : " border-slate-200 bg-slate-100 text-slate-900"
        } `}
        onChange={handleChangeSearch}
        value={inputQuery}
        id={inputId && inputId}
      />
      <button
        className={`p-2 text-xl  h-full rounded-r-lg border ${
          theme === "dark"
            ? "bg-slate-700 text-slate-300 border-slate-700"
            : "bg-slate-200 text-slate-950 border-slate-200"
        }`}
      >
        <AiOutlineSearch />
      </button>
    </form>
  );
};
