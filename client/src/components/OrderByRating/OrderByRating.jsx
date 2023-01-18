import React from "react";
import { useDispatch } from "react-redux";
import { orderByRating } from "../../redux/actions/actions";
import style from "../OrderByRating/OrderByRating.module.css";

function OrderByRating({ setCurrentPage }) {
  const dispatch = useDispatch();

  const selectInputHandler = (e) => {
    e.preventDefault();
    dispatch(orderByRating(e.target.value));
    setCurrentPage(1);
  };
  return (
    <div className={style.orderRating_container}>
      <label htmlFor="order_by_rating">Order by Popularity </label>
      <select
        name="select"
        id="order_by_rating"
        defaultValue=""
        onChange={selectInputHandler}
        className={style.order_byRating}
      >
        <option value="">Select an option</option>
        <option value="All">All</option>
        <option value="Highest">Highest</option>
        <option value="Lowest">Lowest</option>
      </select>
    </div>
  );
}

export default OrderByRating;
