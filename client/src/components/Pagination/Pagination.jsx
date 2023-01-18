import React from "react";
import style from "../Pagination/Pagination.module.css";

function Pagination({
  videogamesPerPage,
  totalVideogames,
  paginate,
  currentPage,
}) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalVideogames / videogamesPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className={style.container}>
      <ul className={style.list}>
        {pageNumbers.map((number) => {
          return (
            <li
              className={
                number === currentPage ? style.isActive : style.noActive
              }
              key={number}
            >
              <button onClick={() => paginate(number)}>{number}</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Pagination;
