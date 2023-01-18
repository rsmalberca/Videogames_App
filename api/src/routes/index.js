require("dotenv").config({ path: "../../.env" });
const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const videogames = require("./middlewares/videogames");
const videogameDetail = require("./middlewares/videogameDetail");
const videogameCreation = require("./middlewares/createVideogame");
const allGenres = require("./middlewares/genres");

// We get the first 100 games if not name is specified, or the first 15 matched games instead
router.use("/videogames", videogames);
// We get the videogame detail according to the id passed as params
router.use("/videogame", videogameDetail);
// We create a new videoGame and store it in our database
router.use("/videogames", videogameCreation);
// We get all genres
router.use("/genres", allGenres);

module.exports = router;
