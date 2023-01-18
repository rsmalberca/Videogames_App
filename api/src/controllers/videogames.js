const axios = require("axios");
require("dotenv").config({ path: "../../.env" });
const urlAPI = "https://api.rawg.io/api/games";
const { API_KEY } = process.env;
const limit = 30;
const { Videogame, Genre } = require("../db");

// ------- Get 100 games from the API --------

//here we'll have an array of objects, in which each element is a game.
// with the 'page_size' query we can save one iteration (4 instead of 5), in order to get the first 100 games.

const getApiInfo = async () => {
  const allGames = [];
  let url = `${urlAPI}?key=${API_KEY}&page_size=${limit}`;
  for (let i = 1; i < 5; i++) {
    let gamePage = await axios.get(url);
    gamePage.data?.results.forEach((game) => {
      allGames.push({
        id: game.id,
        name: game.name,
        released: game.released,
        image: game.background_image,
        rating: game.rating,
        platforms: game.platforms.map((elem) => elem.platform.name),
        genres: game.genres.map((elem) => elem.name),
      });
    });
    url = gamePage.data.next;
  }
  //returns an array with all the videogame objects from the RAWG API.
  // console.log(allGames.length);
  return allGames;
};

// getApiInfo();

// ------- Get the info from the 'videogames' database  --------

// In Sequelize, eager loading is mainly done by using the include option on a model finder query (such as findOne, findAll, etc).

const getDbInfo = async () => {
  const gamesDb = await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  const allGames = await gamesDb.map((game) => ({
    id: game.id,
    name: game.name,
    description: game.description,
    image: game.image,
    released: game.released,
    rating: game.rating,
    platforms: game.platforms,
    genres: game.genres.map((elem) => elem.name),
  }));
  //returns an array with all the videogame objects from the database.
  // console.log(allGames);
  return allGames;
  // console.log(gamesDb);
};

// getDbInfo();

// ------- Get all info => API + Database  --------

const getAllInfo = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  //Using the spread operator we "combine" both arrays
  const totalGames = [...apiInfo, ...dbInfo];
  // console.log(totalGames.length);
  return totalGames;
};

// getAllInfo();

// ------- Get a videogame by Id, either from the API or database  --------

const getById = async (id) => {
  if (typeof id === "string" && id.length > 8) {
    const vgDb = await getDbInfo();
    const videogameId = vgDb.filter((elem) => elem.id === id);
    return videogameId;
    //here we are returning an array of a single element (videogame object), that's why he had to adjust the VideogameDetail component...
  } else {
    const apiById = await axios.get(`${urlAPI}/${id}?key=${API_KEY}`);
    const game = apiById.data;
    const gameById = {
      id: game.id,
      name: game.name,
      released: game.released,
      image: game.background_image,
      rating: game.rating,
      description: game.description,
      platforms: game.platforms.map((elem) => elem.platform.name),
      genres: game.genres.map((elem) => elem.name),
    };
    // console.log(gameById);
    return gameById;
  }
};

// getById(1452);

module.exports = {
  getApiInfo,
  getDbInfo,
  getAllInfo,
  getById,
};
