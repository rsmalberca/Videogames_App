import React from "react";
import { Link } from "react-router-dom";
import style from "../LandingPage/LandingPage.module.css";
import logo from "../../assets/logo_arcadeclub_f.png";
// import photoLP from "../../assets/landingPage_bg.jpg";

function LandingPage() {
  return (
    <div className={style.containerLP}>
      <div className={style.divLP}>
        <img src={logo} alt="arcade_logo" />
        <h1>Video game Collection</h1>
        <Link to={"/home"}>
          <button className={style.landingButton}>Press Start</button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
