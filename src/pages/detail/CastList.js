import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "../detail.scss";

import apiConfig from "../../api/apiConfig";
import tmdbApi from "../../api/tmdbApi";

function CastList() {
  const [data, setData] = useState([]);
  const { category, id } = useParams();
  useEffect(() => {
    const getData = async () => {
      let response = null;

      response = await tmdbApi.credits(category, id);
      setData(response.cast.slice(0, 5));
    };

    getData();
  }, [category, id]);

  return (
    <>
      {data.map((item, i) => {
        if (item.profile_path === null) {
          return (
            <div key={i} className="cast-item">
              <div className="cast-item__img">
                <img
                  src={
                    "https://image.tmdb.org/t/p/original/k7XZFjcHA2li9AoVJzMgLebvqCy.jpg"
                  }
                  alt=""
                />
              </div>
              <h4 className="cast-item__name">
                {item.name || item.original_name}
              </h4>
            </div>
          );
        } else {
          return (
            <div key={i} className="cast-item">
              <div className="cast-item__img">
                <img src={apiConfig.w500Image(item.profile_path)} alt="" />
              </div>
              <h4 className="cast-item__name">
                {item.name || item.original_name}
              </h4>
            </div>
          );
        }
      })}
    </>
  );
}

export default CastList;
