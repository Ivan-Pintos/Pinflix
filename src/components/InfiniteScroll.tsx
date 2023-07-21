import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useEffect } from "react";
import { Spinner } from "flowbite-react";
import axios from "axios";

type InfiniteScrollProps = {
  ApiUrl: string;
  originalContent: any[];
  iterationMaxNumber: number;
  setOriginalContent: React.Dispatch<React.SetStateAction<any[]>>;
  resetPageCounter?: boolean;
};

export default ({
  originalContent,
  setOriginalContent,
  ApiUrl,
  iterationMaxNumber,
  resetPageCounter,
}: InfiniteScrollProps) => {
  const [page, setPage] = useState<number>(2);

  useEffect(() => {
    resetPageCounter && setPage(2);
  }, [resetPageCounter]);

  const fetchData = async () => {
    const options = {
      method: "GET",
      url: ApiUrl,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SECRET_TOKEN}`,
      },
      params: {
        page: page,
      },
    };

    const response = await axios.request(options);
    setOriginalContent((prev) => [...prev, ...response.data.results]);
    setPage((prev) => prev + 1);
    return;
  };
  return (
    <InfiniteScroll
      dataLength={originalContent.length}
      next={fetchData}
      hasMore={page <= iterationMaxNumber}
      loader={
        <div className="flex justify-center gap-2">
          <Spinner aria-label="Medium sized spinner " size="md" />
          <span>Loading...</span>
        </div>
      }
      endMessage={<></>}
    >
      {}
    </InfiniteScroll>
  );
};
