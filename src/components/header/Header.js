import { Link, NavLink } from "react-router-dom";

import "./header.scss";

import Logo from "../../assets/tmovie.png";
import React, { useEffect, useRef } from "react";

const headerNav = [
  { display: "Home", path: "/home" },
  { display: "Movie", path: "/Movie" },
  { display: "TV Series", path: "/tv" },
];

function Header() {
  const headeRef = useRef(null);

  useEffect(() => {
    const shrinkHeader = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        headeRef.current.classList.add("shrink");
      } else {
        headeRef.current.classList.remove("shrink");
      }
    };
    window.addEventListener("scroll", shrinkHeader);
    return () => {
      window.removeEventListener("scroll", shrinkHeader);
    };
  });

  return (
    <div className="header" ref={headeRef}>
      <div className="header__wrap">
        <div className="logo">
          <img src={Logo} />
          <Link to={"/"}>tMovies</Link>
        </div>
        <ul className="header__nav">
          {headerNav.map((e, i) => (
            <NavLink key={i} to={e.path}>
              {e.display}
            </NavLink>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Header;
