import { useEffect, useRef, useState } from "react";
import tmdbApi from "../../api/tmdbApi";

import "../detail.scss";

function ListVideo({ category, id }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const videos = await tmdbApi.getVideos(category, id);
      setData(videos.results.slice(0, 5));
    };

    getData();
  }, [category, id]);

  return (
    <div>
      {data.map((video, index) => (
        <VideoItem key={index} video={video} />
      ))}
    </div>
  );
}

const VideoItem = ({ video }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const height = (iframeRef.current.offsetWidth * 9) / 16 + "px";
    iframeRef.current.setAttribute("height", height);
  }, []);

  return (
    <div className="video">
      <div className="video__title">
        <h2>{video.name}</h2>
      </div>
      <iframe
        src={`https://www.youtube.com/embed/${video.key}`}
        ref={iframeRef}
        width="100%"
        height="100%"
        title="video"
      ></iframe>
    </div>
  );
};

export default ListVideo;
