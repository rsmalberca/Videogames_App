import React from "react";
import style from "../Videogame/Videogame.module.css";
// import dImage from "../../assets/default_image_pi.jpg";
import { Link } from "react-router-dom";

function Videogame({ name, image, rating, genres, videoGameId, platforms }) {
  return (
    <div className={style.card}>
      <Link to={`/videogame/${videoGameId}`} className={style.linkDetail}>
        <div
          className={
            rating >= 4
              ? style.rating4may
              : rating < 4 && rating > 3.5
              ? style.rating4men
              : style.reallybadrat
          }
        >
          {rating}
        </div>
        <img className={style.img} src={image} alt={name} />
        <div className={style.card_details}>
          <p className={style.text_title}>{name}</p>
          <div className={style.genre_text}>Genres</div>
          <div className={style.genres}>
            {genres.map((genre) => {
              return (
                <div key={genre} className={style.genre}>
                  {genre}
                </div>
              );
            })}
          </div>
          <div className={style.genre_text}>Available on</div>
          <div className={style.genres}>
            {platforms.map((platform) => {
              return (
                <div key={platform} className={style.genre}>
                  {platform}
                </div>
              );
            })}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Videogame;
