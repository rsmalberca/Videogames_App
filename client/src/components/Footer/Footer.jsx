import React from "react";
import style from "../Footer/Footer.module.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className={style.footer}>
      <div>Arcade Club ® | Made & designed with 💚 by Renzo San Martin</div>
      <Link to="/" className={style.gameOver}>
        <button>Game Over</button>
      </Link>
    </div>
  );
}

export default Footer;
