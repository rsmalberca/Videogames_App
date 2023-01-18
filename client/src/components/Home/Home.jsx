import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSearch,
  getGenres,
  getVideogames,
} from "../../redux/actions/actions";
import Loader from "../Loader/Loader";
import Header from "../Header/Header";
import Pagination from "../Pagination/Pagination";
import style from "../Home/Home.module.css";
import VideogameListing from "../VideogamesListing/VideogameListing";
import { useState } from "react";
import OrderABC from "../OrderABC/OrderABC";
import OrderByRating from "../OrderByRating/OrderByRating";
import GenresFilter from "../GenresFilter/GenresFilter";
import PlatformsFilter from "../PlatformsFilter/PlatformsFilter";
import ApiDbFilter from "../ApiDbFilter/ApiDbFilter";
import Footer from "../Footer/Footer";

function Home() {
  const videogames = useSelector((state) => state.videogames);
  const allVG = useSelector((state) => state.allVideogames);
  const genres = useSelector((state) => state.genres);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [videogamesPerPage] = useState(15);

  useEffect(() => {
    //checks if videogames is empty
    if (!videogames.length) {
      dispatch(getVideogames());
    }
    if (!genres.length) {
      dispatch(getGenres());
    }
  }, [dispatch, videogames, genres]);

  // Get current videogames
  const indexLastVideogame = currentPage * videogamesPerPage;
  const indexFirstVideogame = indexLastVideogame - videogamesPerPage;
  const currentVideogames = videogames.slice(
    indexFirstVideogame,
    indexLastVideogame
  );

  // Change page
  const pageChanger = (pageNumber) => setCurrentPage(pageNumber);

  const clearFilter = () => {
    dispatch(clearSearch());
    document.getElementById("search_by_name").value = "";
    document.getElementById("apiDb_filter").value = "";
    document.getElementById("filter_by_genre").value = "";
    document.getElementById("filter_by_platform").value = "";
    document.getElementById("order_by_name").value = "";
    document.getElementById("order_by_rating").value = "";
    setCurrentPage(1);
  };

  return (
    <div className={style.container}>
      <Header setCurrentPage={setCurrentPage} />

      <div className={style.VGFilters}>
        {videogames.length ? (
          <div className={style.containerFilters}>
            <div className={style.orderers}>
              <OrderABC setCurrentPage={setCurrentPage} />
              <OrderByRating setCurrentPage={setCurrentPage} />
            </div>
            <div>
              <GenresFilter setCurrentPage={setCurrentPage} genres={genres} />
              <PlatformsFilter setCurrentPage={setCurrentPage} />
              <ApiDbFilter setCurrentPage={setCurrentPage} />
            </div>
            <button onClick={clearFilter} className={style.resetButton}>
              Reset filters
            </button>
          </div>
        ) : (
          ""
        )}
        {!videogames.length && allVG.length ? (
          <p className={style.paragraph}>
            Sorry... no video games with those details 💔{" "}
          </p>
        ) : videogames.length ? (
          <div className={style.vgamesContainer}>
            <Pagination
              videogamesPerPage={videogamesPerPage}
              totalVideogames={videogames.length}
              paginate={pageChanger}
              currentPage={currentPage}
            />
            <VideogameListing videogames={currentVideogames} />
          </div>
        ) : (
          <Loader />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
