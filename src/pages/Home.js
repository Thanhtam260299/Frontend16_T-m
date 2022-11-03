import HeroSlide from "../components/hero-slide/HeroSlide";
import MovieList from "../components/movie-list/MovieList";
import { Link } from "react-router-dom";
import Button from "../components/button/Button";
import { category, movieType, tvType } from "../api/tmdbApi";

function Home() {
  return (
    <div>
      <HeroSlide />
      <div className="container">
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Trending Movie</h2>
            <Link to={"/movie"}>
              <Button children={"View more"} outline small />
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.popular} />
        </div>
      </div>

      <div className="container">
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Top Rate Movie</h2>
            <Link to={"/movie"}>
              <Button children={"View more"} outline small />
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.top_rated} />
        </div>
      </div>

      <div className="container">
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Trending TV</h2>
            <Link to={"/movie"}>
              <Button children={"View more"} outline small />
            </Link>
          </div>
          <MovieList category={category.tv} type={tvType.popular} />
        </div>
      </div>

      <div className="container">
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Top Rate TV</h2>
            <Link to={"/movie"}>
              <Button children={"View more"} outline small />
            </Link>
          </div>
          <MovieList category={category.tv} type={tvType.top_rated} />
        </div>
      </div>
    </div>
  );
}

export default Home;
