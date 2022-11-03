import { useState, useEffect, useRef } from "react";

import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import tmdbApi, { category, movieType } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";

import Modal, { ModalContent } from "../modal/Modal";

import Button from "../button/Button";

import "./hero-slide.scss";
import { useNavigate } from "react-router-dom";

const HeroSlide = () => {
  SwiperCore.use([Autoplay]);

  const [movieItems, setMovieItems] = useState([]);

  useEffect(() => {
    const getMovies = () => {
      const params = { page: 1 };
      tmdbApi
        .getMoviesList(movieType.popular, { params })
        .then((res) => {
          setMovieItems(res.results.slice(8, 13));
        })
        .catch((err) => {
          console.log({ err });
        });
    };
    getMovies();
  }, []);
  return (
    <div className="hero-slide">
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        direction="horizontal"
        autoplay={{ delay: 5000 }}
      >
        {movieItems.map((item, i) => (
          <SwiperSlide key={i}>
            {({ isActive }) => (
              <HeroSlideItem item={item} className={isActive ? "active" : ""} />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      {movieItems.map((item, i) => (
        <TrailerModal key={i} item={item} />
      ))}
    </div>
  );
};

const HeroSlideItem = ({ item, className }) => {
  const navigate = useNavigate();

  const setModalActive = async () => {
    const modal = document.getElementById(`modal_${item.id}`);
    const videos = await tmdbApi.getVideos(category.movie, item.id);
    if (videos.results.length > 0) {
      const videSrc = "https://www.youtube.com/embed/" + videos.results[0].key;
      modal
        .querySelector(".modal__content > iframe")
        .setAttribute("src", videSrc);
    } else {
      modal.querySelector(".modal__content").innerHTML = "No trailer";
    }

    modal.classList.toggle("active");
  };

  return (
    <div
      className={`hero-slide__item ${className}`}
      style={{
        backgroundImage: `url(${apiConfig.originalImage(
          item.backdrop_path || item.poster_path
        )})`,
      }}
    >
      <div className="hero-slide__item__content container">
        <div className="hero-slide__item__content__info">
          <div className="title">{item.title}</div>
          <div className="overview">{item.overview}</div>
          <div className="btns">
            <Button
              children="Watch now"
              onclick={() => navigate("/movie/" + item.id)}
            />
            <Button children="Watch trailer" outline onclick={setModalActive} />
          </div>
        </div>
        <div className="hero-slide__item__content__poster">
          <img src={apiConfig.w500Image(item.poster_path)} alt="" />
        </div>
      </div>
    </div>
  );
};

const TrailerModal = ({ item }) => {
  const iframeRef = useRef(null);

  const onClose = () => {
    return iframeRef.current.setAttribute("src", "");
  };

  return (
    <Modal active={false} id={`modal_${item.id}`}>
      <ModalContent onClose={onClose}>
        <iframe
          ref={iframeRef}
          width="100%"
          height="500px"
          title="trailer"
        ></iframe>
      </ModalContent>
    </Modal>
  );
};

export default HeroSlide;
