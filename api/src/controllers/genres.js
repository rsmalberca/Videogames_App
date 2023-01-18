const axios = require("axios");
require("dotenv").config({ path: "../../.env" });
const urlAPI = "https://api.rawg.io/api/genres";
const { API_KEY } = process.env;
const { Genre } = require("../db");

// Here we get the video game genres from the API, we store them in the database and then we create an array of objects with all the genres.
const getAllGenres = async () => {
  const apiGenres = await axios.get(`${urlAPI}?key=${API_KEY}`);
  await apiGenres.data?.results.forEach((genre) => {
    Genre.findOrCreate({
      where: {
        name: genre.name,
      },
    });
  });
  const genres = await Genre.findAll();
  const totalGenres = genres.map((genre) => {
    return {
      id: genre.id,
      name: genre.name,
    };
  });
  return totalGenres;
};

module.exports = {
  getAllGenres,
};
