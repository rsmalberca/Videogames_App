import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  platformsFilter,
  apiDbFilter,
  genresFilter,
  orderAbc,
  orderByRating,
} from "../../redux/actions/actions";
import style from "../PlatformsFilter/PlatformsFilter.module.css";

function PlatformsFilter({ setCurrentPage }) {
  const allVideogames = useSelector((state) => state.allVideogames);
  const dispatch = useDispatch();

  const allPlatforms = [];
  allVideogames.map((videogame) =>
    videogame.platforms?.map((platform) => allPlatforms.push(platform))
  );
  let platforms = [...new Set(allPlatforms)];

  const platformsFilterHandler = (e) => {
    e.preventDefault();
    dispatch(platformsFilter(""));
    dispatch(platformsFilter(e.target.value));
    setCurrentPage(1);

    const apiDbValue = document.getElementById("apiDb_filter").value;
    const genreValue = document.getElementById("filter_by_genre").value;
    const ratingOrder = document.getElementById("order_by_rating").value;
    const nameOrder = document.getElementById("order_by_name").value;
    if (apiDbValue && genreValue && ratingOrder) {
      dispatch(apiDbFilter(apiDbValue));
      dispatch(genresFilter(genreValue));
      dispatch(orderByRating(ratingOrder));
    } else if (apiDbValue && genreValue && nameOrder) {
      dispatch(apiDbFilter(apiDbValue));
      dispatch(genresFilter(genreValue));
      dispatch(orderAbc(nameOrder));
    } else if (genreValue && apiDbValue) {
      dispatch(genresFilter(genreValue));
      dispatch(apiDbFilter(apiDbValue));
    } else if (genreValue && ratingOrder) {
      dispatch(genresFilter(genreValue));
      dispatch(orderByRating(ratingOrder));
    } else if (genreValue && nameOrder) {
      dispatch(genresFilter(genreValue));
      dispatch(orderAbc(nameOrder));
    } else if (apiDbValue && ratingOrder) {
      dispatch(orderByRating(ratingOrder));
      dispatch(apiDbFilter(apiDbValue));
    } else if (apiDbValue && nameOrder) {
      dispatch(orderAbc(nameOrder));
      dispatch(apiDbFilter(apiDbValue));
    } else if (apiDbValue) {
      dispatch(apiDbFilter(apiDbValue));
    } else if (genreValue) {
      dispatch(genresFilter(genreValue));
    } else if (ratingOrder) {
      dispatch(orderByRating(ratingOrder));
    } else if (nameOrder) {
      dispatch(orderAbc(nameOrder));
    }
  };

  return (
    <div className={style.platformFilter_container}>
      <label htmlFor="filter_by_platform">Filter by Platform </label>
      <select
        name="select"
        id="filter_by_platform"
        onChange={platformsFilterHandler}
        className={style.platformFilter}
      >
        <option value="">Platforms</option>
        {platforms &&
          platforms.map((platform) => {
            return (
              <option key={platform} value={platform}>
                {platform}
              </option>
            );
          })}
      </select>
    </div>
  );
}

export default PlatformsFilter;
