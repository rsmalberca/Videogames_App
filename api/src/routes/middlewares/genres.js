require("dotenv").config({ path: "../../../.env" });
const express = require("express");
const router = express.Router();
const { getAllGenres } = require("../../controllers/genres");

router.get("/", async (req, res) => {
  try {
    const genres = await getAllGenres();
    res.status(200).json(genres);
  } catch (error) {
    res.status(404).json({ error, message: "Oops!! - Something went wrong" });
  }
});

module.exports = router;
