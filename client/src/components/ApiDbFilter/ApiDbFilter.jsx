import React from "react";
import { useDispatch } from "react-redux";
import {
  apiDbFilter,
  platformsFilter,
  genresFilter,
  orderAbc,
  orderByRating,
} from "../../redux/actions/actions";
import style from "../ApiDbFilter/ApiDbFilter.module.css";

function ApiDbFilter({ setCurrentPage }) {
  const dispatch = useDispatch();

  const apiDbFilterHandler = (e) => {
    e.preventDefault();
    dispatch(apiDbFilter(""));
    dispatch(apiDbFilter(e.target.value));
    setCurrentPage(1);
    const genreValue = document.getElementById("filter_by_genre").value;
    const platformValue = document.getElementById("filter_by_platform").value;
    const ratingOrder = document.getElementById("order_by_rating").value;
    const nameOrder = document.getElementById("order_by_name").value;
    if (genreValue && platformValue && ratingOrder) {
      dispatch(genresFilter(genreValue));
      dispatch(platformsFilter(platformValue));
      dispatch(orderByRating(ratingOrder));
    } else if (genreValue && platformValue && nameOrder) {
      dispatch(genresFilter(genreValue));
      dispatch(platformsFilter(platformValue));
      dispatch(orderAbc(nameOrder));
    } else if (platformValue && genreValue) {
      dispatch(platformsFilter(platformValue));
      dispatch(genresFilter(genreValue));
    } else if (platformValue && ratingOrder) {
      dispatch(platformsFilter(platformValue));
      dispatch(orderByRating(ratingOrder));
    } else if (platformValue && nameOrder) {
      dispatch(platformsFilter(platformValue));
      dispatch(orderAbc(nameOrder));
    } else if (genreValue && ratingOrder) {
      dispatch(genresFilter(genreValue));
      dispatch(orderByRating(ratingOrder));
    } else if (genreValue && nameOrder) {
      dispatch(genresFilter(genreValue));
      dispatch(orderAbc(nameOrder));
    } else if (genreValue) {
      dispatch(genresFilter(genreValue));
    } else if (platformValue) {
      dispatch(platformsFilter(platformValue));
    } else if (nameOrder) {
      dispatch(orderAbc(nameOrder));
    } else if (ratingOrder) {
      dispatch(orderByRating(ratingOrder));
    }
  };

  return (
    <div className={style.apiDBFilter_container}>
      <label htmlFor="apiDb_filter">Filter by Origin </label>
      <select
        name="select"
        id="apiDb_filter"
        onChange={apiDbFilterHandler}
        className={style.apiDBFilter}
      >
        <option value="">Origin</option>
        <option value="Existing">API</option>
        <option value="Created">Database</option>
      </select>
    </div>
  );
}

export default ApiDbFilter;
