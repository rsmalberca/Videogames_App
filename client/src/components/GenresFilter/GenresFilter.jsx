import React from "react";
import { useDispatch } from "react-redux";
import {
  genresFilter,
  apiDbFilter,
  platformsFilter,
  orderAbc,
  orderByRating,
} from "../../redux/actions/actions";
import style from "../GenresFilter/GenresFilter.module.css";

function GenresFilter({ setCurrentPage, genres }) {
  const dispatch = useDispatch();

  const genresFilterHandler = (e) => {
    e.preventDefault();
    dispatch(genresFilter(""));
    setCurrentPage(1);

    const ApiDbValue = document.getElementById("apiDb_filter").value;
    const platformValue = document.getElementById("filter_by_platform").value;
    const ratingOrder = document.getElementById("order_by_rating").value;
    const nameOrder = document.getElementById("order_by_name").value;

    if (ApiDbValue && platformValue && ratingOrder) {
      dispatch(apiDbFilter(ApiDbValue));
      dispatch(platformsFilter(platformValue));
      dispatch(orderByRating(ratingOrder));
    } else if (ApiDbValue && platformValue && nameOrder) {
      dispatch(apiDbFilter(ApiDbValue));
      dispatch(platformsFilter(platformValue));
      dispatch(orderAbc(nameOrder));
    } else if (ApiDbValue && platformValue) {
      dispatch(apiDbFilter(ApiDbValue));
      dispatch(platformsFilter(platformValue));
    } else if (ApiDbValue && ratingOrder) {
      dispatch(apiDbFilter(ApiDbValue));
      dispatch(orderByRating(ratingOrder));
    } else if (ApiDbValue && nameOrder) {
      dispatch(apiDbFilter(ApiDbValue));
      dispatch(orderAbc(nameOrder));
    } else if (platformValue && ratingOrder) {
      dispatch(platformsFilter(platformValue));
      dispatch(orderByRating(ratingOrder));
    } else if (platformValue && nameOrder) {
      dispatch(platformsFilter(platformValue));
      dispatch(orderAbc(nameOrder));
    } else if (ratingOrder) {
      dispatch(orderByRating(ratingOrder));
    } else if (nameOrder) {
      dispatch(orderAbc(nameOrder));
    } else if (platformValue) {
      dispatch(platformsFilter(platformValue));
    } else if (ApiDbValue) {
      dispatch(apiDbFilter(ApiDbValue));
    }
    dispatch(genresFilter(e.target.value));
  };

  return (
    <div className={style.genreFilter_container}>
      <label htmlFor="filter_by_genre">Filter by Genre </label>
      <select
        name="select"
        id="filter_by_genre"
        onChange={genresFilterHandler}
        className={style.genreFilter}
      >
        <option value="">Genres</option>
        {genres &&
          genres.map((genre) => {
            return (
              <option key={genre.id} value={genre.name}>
                {genre.name}
              </option>
            );
          })}
      </select>
    </div>
  );
}

export default GenresFilter;
