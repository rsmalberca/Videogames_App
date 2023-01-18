import React from "react";
import style from "../Loader/Loader.module.css";

function Loader() {
  return (
    <div className={style.container}>
      <div className={style.loader}>
        <span></span>
      </div>
    </div>
  );
}

export default Loader;
