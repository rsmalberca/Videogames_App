import React from "react";
import Videogame from "../Videogame/Videogame";
import style from "../VideogamesListing/VideogameListing.module.css";

function VideogameListing({ videogames }) {
  return (
    <div className={style.videogamesContainer}>
      {videogames?.map((videogame) => {
        return (
          <Videogame
            key={videogame.id}
            name={videogame.name}
            image={videogame.image}
            genres={videogame.genres}
            rating={videogame.rating}
            videoGameId={videogame.id}
            platforms={videogame.platforms}
          />
        );
      })}
    </div>
  );
}

export default VideogameListing;
