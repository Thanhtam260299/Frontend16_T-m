import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./detail.scss";

import Button from "../components/button/Button";

import ListVideo from "./detail/ListVideo";

import tmdbApi, { category as cate } from "../api/tmdbApi";
import apiConfig from "../api/apiConfig";

import CastList from "./detail/CastList";
import MovieList from "../components/movie-list/MovieList";

function Detail() {
  const { category, id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      let response = null;
      let param = {};

      response = await tmdbApi.detail(category, id, param);
      window.scrollTo(0, 0);
      setData(response);
    };

    getData();
  }, [category, id]);

  return (
    <>
      <div>
        {data && (
          <>
            <div
              className="banner"
              style={{
                backgroundImage: `url(${apiConfig.originalImage(
                  data.backdrop_path || data.poster_path
                )})`,
              }}
            ></div>
            <div className="mb-3 movie-content container">
              <div className="movie-content__poster">
                <div
                  className="movie-content__poster__img"
                  style={{
                    backgroundImage: `url(${apiConfig.originalImage(
                      data.poster_path || data.backdrop_path
                    )})`,
                  }}
                ></div>
              </div>
              <div className="movie-content__info">
                <div className="title">{data.title || data.name}</div>
                <div className="genre">
                  {data.genres &&
                    data.genres.map((item, index) => (
                      <Button key={index} children={item.name} outline small />
                    ))}
                </div>
                <div className="overview">{data.overview}</div>
                <div className="cast">
                  <div className="section__header">
                    <h2>Cast</h2>
                  </div>
                  <div className="cast-list">
                    <CastList />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="list-video container">
        <div className="section mb-3">
          <ListVideo category={category} id={id} />
        </div>
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Similar</h2>
          </div>
          <MovieList category={category} type="similar" id={id} />
        </div>
      </div>
    </>
  );
}

export default Detail;
