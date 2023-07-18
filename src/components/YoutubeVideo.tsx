import YouTube, { YouTubeProps } from "react-youtube";

type YouTubeVideoProps = {
  VideoID: string;
};
export default ({ VideoID }: YouTubeVideoProps) => {
  const opts: YouTubeProps["opts"] = {
    playerVars: {
      autoplay: 0,
    },
  };
  return (
    <div className="  relative h-full">
      <YouTube
        className="absolute flex items-center justify-center  inset-0 w-full h-full"
        videoId={VideoID}
        opts={opts}
      />
    </div>
  );
};
