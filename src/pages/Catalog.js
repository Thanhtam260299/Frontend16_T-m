import { useParams } from "react-router-dom";

import { category as cate } from "../api/tmdbApi";

import PageHeader from "../components/page-header/PageHeader";

import MovieGrid from "../components/movie-grid/MovieGrid";

function Catalog() {
  const { category } = useParams();

  return (
    <>
      <PageHeader>
        {cate.movie.toUpperCase() == category.toUpperCase() ? "Movie" : "tv"}
      </PageHeader>
      <div className="container">
        <div className="section mb-3">
          <MovieGrid category={category} />
        </div>
      </div>
    </>
  );
}

export default Catalog;
