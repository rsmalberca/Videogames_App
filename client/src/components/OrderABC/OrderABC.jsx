import React from "react";
import { useDispatch } from "react-redux";
import { orderAbc } from "../../redux/actions/actions";
import style from "../OrderABC/OrderABC.module.css";

function OrderABC({ setCurrentPage }) {
  const dispatch = useDispatch();

  const selectInputHandler = (e) => {
    e.preventDefault();
    dispatch(orderAbc(e.target.value));
    setCurrentPage(1);
  };
  return (
    <div className={style.orderABC_container}>
      <label htmlFor="order_by_name">Order by name </label>
      <select
        name="select"
        id="order_by_name"
        defaultValue=""
        onChange={selectInputHandler}
        className={style.order_abc}
      >
        <option value="">Select an option</option>
        <option value="All">All</option>
        <option value="Asc">Ascending</option>
        <option value="Desc">Descending</option>
      </select>
    </div>
  );
}

export default OrderABC;
