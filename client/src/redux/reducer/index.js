import { actionTypes } from "../actions/variables";

const initialState = {
  videogames: [],
  allVideogames: [],
  selectedVideogame: {},
  genres: [],
};

export default function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case actionTypes.GET_VIDEOGAMES:
      return {
        ...state,
        videogames: payload,
        allVideogames: payload,
      };
    case actionTypes.GET_GENRES:
      return {
        ...state,
        genres: payload,
      };
    case actionTypes.GENRES_FILTER:
      let videogames = state.videogames;
      let genresFiltered = videogames.filter((videogame) =>
        videogame.genres?.includes(payload)
      );
      return {
        ...state,
        videogames: payload === "" ? state.allVideogames : genresFiltered,
      };
    case actionTypes.API_DB_FILTER:
      const apiVideogames = state.videogames.filter(
        (videogame) => typeof videogame.id === "number"
      );
      const dbVideogames = state.videogames.filter(
        (videogame) => typeof videogame.id === "string"
      );
      return {
        ...state,
        videogames:
          payload === ""
            ? state.allVideogames
            : payload === "Existing"
            ? apiVideogames
            : dbVideogames,
      };
    case actionTypes.PLATFORMS_FILTER:
      let vgames = state.videogames;
      let platformsFiltered = vgames.filter((videogame) =>
        videogame.platforms.includes(payload)
      );
      return {
        ...state,
        videogames: payload === "" ? state.allVideogames : platformsFiltered,
      };
    case actionTypes.ORDER_ABC:
      let vgOrderedABC = [...state.videogames];
      vgOrderedABC = vgOrderedABC.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return payload === "Asc" ? -1 : 1;
        }
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return payload === "Asc" ? 1 : -1;
        }
        return 0;
      });
      return {
        ...state,
        videogames:
          payload === "All" || payload === ""
            ? state.allVideogames
            : vgOrderedABC,
      };
    case actionTypes.ORDER_BY_RATING:
      let vgOrderedRating = [...state.videogames];
      vgOrderedRating = vgOrderedRating.sort((a, b) => {
        if (a.rating < b.rating) {
          return payload === "Lowest" ? -1 : 1;
        }
        if (a.rating > b.rating) {
          return payload === "Lowest" ? 1 : -1;
        }
        return 0;
      });
      return {
        ...state,
        videogames:
          payload === "All" || payload === ""
            ? state.allVideogames
            : vgOrderedRating,
      };
    case actionTypes.GET_BY_NAME:
      return {
        ...state,
        videogames: payload,
      };
    case actionTypes.SELECTED_VIDEOGAME:
      return {
        ...state,
        selectedVideogame: payload,
      };
    case actionTypes.REMOVE_SELECTED_VIDEOGAME:
      return {
        ...state,
        selectedVideogame: {},
      };
    case actionTypes.CLEAR_SEARCH:
      return {
        ...state,
        videogames: state.allVideogames,
      };
    case actionTypes.HOME:
      let allVg = state.allVideogames;
      return {
        ...state,
        videogames: allVg,
      };
    case actionTypes.CLEAR_HOME:
      return {
        ...state,
        videogames: [],
      };
    case actionTypes.NEW_VIDEOGAME:
      return {
        ...state,
        videogames: state.allVideogames,
      };
    default:
      return state;
  }
}
