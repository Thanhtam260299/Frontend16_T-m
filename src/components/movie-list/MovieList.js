import React, { useEffect, useState } from "react";
import "./MovieList.scss";

import { Swiper, SwiperSlide } from "swiper/react";

import tmdbApi from "../../api/tmdbApi";

import MovieCard from "../movie-card/MovieCard";

function MovieList({ category, type, id }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      let response = null;
      const params = {};

      if (type !== "similar") {
        switch (category) {
          case "movie":
            response = await tmdbApi.getMoviesList(type, { params });
            break;
          default:
            response = await tmdbApi.getTvList(type, { params });
        }
      } else {
        response = await tmdbApi.similar(category, id);
      }
      setData(response.results);
    };

    getData();
  }, []);
  return (
    <div className="movie-list">
      <Swiper
        grabCursor={true}
        spaceBetween={5}
        direction="horizontal"
        slidesPerView={"auto"}
      >
        {data.map((item, i) => (
          <SwiperSlide key={i}>
            <MovieCard item={item} category={category} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default MovieList;
