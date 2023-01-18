import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  selectedVideogame,
  removeSelectedVg,
} from "../../redux/actions/actions";
import Loader from "../Loader/Loader";
import SimpleHeader from "../SimpleHeader/SimpleHeader";
import style from "../VideogameDetail/VideogameDetail.module.css";

function VideogameDetail() {
  const selectedVg = useSelector((state) => state.selectedVideogame);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(selectedVideogame(id));
    return () => {
      dispatch(removeSelectedVg());
    };
  }, [dispatch, id]);

  return (
    <div className={style.container}>
      <SimpleHeader />
      {id.length > 8 ? (
        selectedVg.length ? (
          <div className={style.details}>
            <img
              src={selectedVg[0].image}
              alt={selectedVg[0].name}
              className={style.imageDetail}
            />
            <div className={style.info}>
              <h1>{selectedVg[0].name}</h1>
              <h3>Date of release</h3>
              <p>{selectedVg[0].released}</p>
              <h3>Rating</h3>
              <p>⭐ {selectedVg[0].rating}</p>
              <h3>Description</h3>
              <p
                dangerouslySetInnerHTML={{
                  __html: selectedVg[0].description,
                }}
              ></p>
              <h3>Genres</h3>
              <div className={style.genres}>
                {selectedVg[0].genres.map((genre) => {
                  return (
                    <div key={genre} className={style.genre}>
                      {genre}
                    </div>
                  );
                })}
              </div>
              <h3>Available on</h3>
              <div className={style.platforms}>
                {selectedVg[0].platforms.map((platform) => {
                  return (
                    <div key={platform} className={style.platform}>
                      {platform}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <Loader />
        )
      ) : "name" in selectedVg ? (
        <div className={style.details}>
          <img
            src={selectedVg.image}
            alt={selectedVg.name}
            className={style.imageDetail}
          />
          <div className={style.info}>
            <h1>{selectedVg.name}</h1>
            <h3>Date of release</h3>
            <p>{selectedVg.released}</p>
            <h3>Rating</h3>
            <p>⭐ {selectedVg.rating}</p>
            <h3>Description</h3>
            <p dangerouslySetInnerHTML={{ __html: selectedVg.description }}></p>
            <h3>Genres</h3>
            <div className={style.genres}>
              {selectedVg.genres.map((genre) => {
                return (
                  <div key={genre} className={style.genre}>
                    {genre}
                  </div>
                );
              })}
            </div>
            <h3>Available on 🎮 </h3>
            <div className={style.platforms}>
              {selectedVg.platforms.map((platform) => {
                return (
                  <div key={platform} className={style.platform}>
                    {platform}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default VideogameDetail;
