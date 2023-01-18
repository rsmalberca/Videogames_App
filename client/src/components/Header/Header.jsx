import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import style from "../Header/Header.module.css";
import logo from "../../assets/logo_arcadeclub_f.png";

function Header({ setCurrentPage }) {
  return (
    <div className={style.header}>
      <Link to={"/home"} className={style.link1}>
        <img src={logo} alt="arcade_club_logo" className={style.logo} />
      </Link>
      <SearchBar setCurrentPage={setCurrentPage} />
      <Link to={"/videogame"} className={style.link2}>
        <button className={style.create__button1}>Create Video Game</button>
      </Link>
    </div>
  );
}

export default Header;
