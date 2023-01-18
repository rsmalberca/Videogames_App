import { actionTypes } from "./variables";
import axios from "axios";

export function getVideogames() {
  return async (dispatch) => {
    try {
      let allVideogames = await axios.get("/videogames");
      return dispatch({
        type: actionTypes.GET_VIDEOGAMES,
        payload: allVideogames.data,
      });
    } catch (err) {
      console.log("Error: ", err);
    }
  };
}

export function getByName(name) {
  return async (dispatch) => {
    try {
      let gamesByName = await axios.get(`/videogames?name=${name}`);
      return dispatch({
        type: actionTypes.GET_BY_NAME,
        payload: gamesByName.data,
      });
    } catch (err) {
      console.log("Error: ", err);
      alert(`${err.response.data.message}`);
    }
  };
}

export function getGenres() {
  return async (dispatch) => {
    try {
      let allGenres = await axios.get("/genres");
      return dispatch({
        type: actionTypes.GET_GENRES,
        payload: allGenres.data,
      });
    } catch (err) {
      console.log("Error: ", err);
    }
  };
}

export function genresFilter(payload) {
  return {
    type: actionTypes.GENRES_FILTER,
    payload,
  };
}

export function apiDbFilter(payload) {
  return {
    type: actionTypes.API_DB_FILTER,
    payload,
  };
}

export function platformsFilter(payload) {
  return {
    type: actionTypes.PLATFORMS_FILTER,
    payload,
  };
}

export function newVideogame(videogame) {
  return async () => {
    try {
      let newVideogame = await axios.post("/videogames", videogame);
      // console.log(newVideogame);
      alert(newVideogame.data.message);
      return {
        type: actionTypes.NEW_VIDEOGAME,
        payload: newVideogame,
      };
    } catch (error) {
      console.log("Error: ", error);
      alert(`${error.response.data.message}`);
    }
  };
}

export function orderAbc(payload) {
  return {
    type: actionTypes.ORDER_ABC,
    payload,
  };
}

export function orderByRating(payload) {
  return {
    type: actionTypes.ORDER_BY_RATING,
    payload,
  };
}

export function selectedVideogame(id) {
  return async (dispatch) => {
    try {
      let selectedVg = await axios.get(`/videogame/${id}`);
      return dispatch({
        type: actionTypes.SELECTED_VIDEOGAME,
        payload: selectedVg.data,
      });
    } catch (err) {
      console.log("Error: ", err);
      return {
        type: actionTypes.SELECTED_VIDEOGAME,
        payload: { name: "404 Not found", error: err },
      };
    }
  };
}

export function home(payload) {
  return {
    type: actionTypes.HOME,
    payload,
  };
}

export function removeSelectedVg() {
  return {
    type: actionTypes.REMOVE_SELECTED_VIDEOGAME,
  };
}

export function clearSearch() {
  return {
    type: actionTypes.CLEAR_SEARCH,
  };
}

export function clearHome() {
  return {
    type: actionTypes.CLEAR_HOME,
  };
}
