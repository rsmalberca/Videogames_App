import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getByName } from "../../redux/actions/actions";
import style from "../SearchBar/SearchBar.module.css";

function SearchBar({ setCurrentPage }) {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  const inputChangeHandler = (e) => {
    e.preventDefault();
    setInput(e.target.value.trim());
  };

  const inputSubmitHandler = (e) => {
    e.preventDefault();
    if (input === "" || input[0] === " ") {
      window.alert("A word is required to initialize the search...");
    } else {
      dispatch(getByName(input));
    }
    setCurrentPage(1);
  };

  const inputEnterHandler = (e) => {
    if (e.code === "Enter" && input !== "" && input[0] !== " ") {
      e.preventDefault();
      dispatch(getByName(input));
    }
    setCurrentPage(1);
  };

  // const clearSearchedGames = () => {
  //   dispatch(clearSearch());
  //   setInput("");
  // };

  return (
    <div className={style.search__bar}>
      <form onSubmit={inputSubmitHandler}>
        <input
          type="text"
          autoComplete="off"
          name="search"
          onChange={inputChangeHandler}
          value={input}
          placeholder="&#x1F50E;&#xFE0E; Search..."
          onKeyDown={inputEnterHandler}
          className={style.input__search}
          id="search_by_name"
        />
        <button className={style.searchButton}>Search</button>
      </form>
      {/* <button
        onClick={clearSearchedGames}
        className={style.clearButton}
        id="clearButton"
      >
        Clear
      </button> */}
    </div>
  );
}

export default SearchBar;
