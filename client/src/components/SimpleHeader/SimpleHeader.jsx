import React from "react";
import style from "../SimpleHeader/SimpleHeader.module.css";
import logo from "../../assets/logo_arcadeclub_f.png";
import { Link } from "react-router-dom";

function SimpleHeader() {
  return (
    <div className={style.simpleHeader}>
      <Link to={"/home"}>
        <img src={logo} alt="arcade_club_logo" className={style.logo} />
      </Link>
      <Link to={"/home"}>
        <button className={style.backHome}>Back Home</button>{" "}
      </Link>
    </div>
  );
}

export default SimpleHeader;
