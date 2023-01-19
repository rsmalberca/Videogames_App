require("dotenv").config({ path: "../../../.env" });
const express = require("express");
const router = express.Router();
const { Videogame, Genre } = require("../../db");
// const { getAllGenres } = require("../../controllers/genres");

router.post("/", async (req, res) => {
  const { name, description, image, released, rating, genres, platforms } =
    req.body;
  if (!name || !description || !platforms.length) {
    return res
      .status(400)
      .json({ message: "Missing data: Complete all required fields" });
  }
  if (rating < 1.0 || rating > 5.0) {
    return res.status(400).json({ message: "Invalid number" });
  }

  try {
    const newVideogame = await Videogame.create({
      name: name,
      description: description,
      image: image,
      released: released,
      rating: rating,
      platforms: platforms,
    });
    // const genresDb = await getAllGenres();
    genres.forEach(async (genre) => {
      let genreVg = await Genre.findOne({ where: { name: genre } });
      await newVideogame.addGenre(genreVg);
    });

    res
      .status(200)
      .json({ message: "Great!!! The Videogame was created successfully" });
  } catch (error) {
    res.status(404).json({ error, message: "Oops!! - Something went wrong" });
  }
});

module.exports = router;
