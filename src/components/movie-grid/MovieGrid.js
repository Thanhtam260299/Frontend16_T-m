import "./movie-grid.scss";

import { useEffect, useState } from "react";

import tmdbApi, {
  category as cate,
  movieType,
  tvType,
} from "../../api/tmdbApi";

import { useParams, useNavigate } from "react-router-dom";

import MovieCard from "../movie-card/MovieCard";
import Button from "../button/Button";

function MovieGrid({ category }) {
  const { keyword } = useParams();
  const [items, setItems] = useState([]);
  const [totalPage, setTotalPage] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getData = async () => {
      let response = null;
      if (keyword === undefined) {
        const params = {};
        switch (category.toUpperCase()) {
          case cate.movie.toUpperCase():
            response = await tmdbApi.getMoviesList(movieType.upcoming, {
              params,
            });
            break;
          default:
            response = await tmdbApi.getTvList(tvType.popular, { params });
        }
      } else {
        const params = {
          query: keyword,
        };
        response = await tmdbApi.search(category, { params });
      }
      setItems(response.results);
      setTotalPage(response.total_pages);
    };

    getData();
  }, [category, keyword]);

  const handleLoadmore = async () => {
    let response = null;
    if (keyword === undefined) {
      const params = {
        page: page + 1,
      };
      switch (category.toUpperCase()) {
        case cate.movie.toUpperCase():
          response = await tmdbApi.getMoviesList(movieType.upcoming, {
            params,
          });
          break;
        default:
          response = await tmdbApi.getTvList(tvType.popular, { params });
      }
    } else {
      const params = {
        page: page + 1,
        query: keyword,
      };
      response = await tmdbApi.search(category, { params });
    }
    setItems([...items, ...response.results]);
    setPage(page + 1);
  };

  return (
    <>
      <div className="section mb-3">
        <MovieSearch category={category} />
      </div>
      <div className="movie-grid">
        {items.map((item, i) => (
          <MovieCard key={i} item={item} category={category} />
        ))}
      </div>
      {page < totalPage ? (
        <div className="movie-grid__loadmore">
          <Button children={"Load more"} outline onclick={handleLoadmore} />
        </div>
      ) : null}
    </>
  );
}

const MovieSearch = ({ category }) => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const handleKeyword = (e) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = () => {
    if (keyword.trim().length > 0) {
      navigate(`/${category}/` + "search/" + keyword);
      setKeyword("");
    }
  };

  useEffect(() => {
    const enterEvent = (e) => {
      e.preventDefault();

      if (e.keyCode === 13) {
        handleSubmit();
      }
    };

    document.addEventListener("keyup", enterEvent);
  }, [keyword, handleSubmit]);

  return (
    <div className="movies-search">
      <input
        value={keyword}
        type={"text"}
        placeholder="Enter keyword"
        onChange={handleKeyword}
      />
      <Button children={"Search"} small onclick={handleSubmit} />
    </div>
  );
};

export default MovieGrid;
