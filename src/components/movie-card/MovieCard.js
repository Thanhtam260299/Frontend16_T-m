import "./movie-card.scss";

import { Link } from "react-router-dom";

import apiConfig from "../../api/apiConfig";

import Button from "../button/Button";

function MovieCard({ item, category }) {
  return (
    <Link to={"/" + category + "/" + item.id}>
      <div
        className="movie-card"
        style={{
          backgroundImage: `url(${apiConfig.w500Image(
            item.poster_path || item.backdrop_path
          )})`,
        }}
      >
        <Button children={<box-icon name="play"></box-icon>} />
      </div>
      <h3 className="title">{item.title || item.name}</h3>
    </Link>
  );
}

export default MovieCard;
