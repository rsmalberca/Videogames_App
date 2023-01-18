require("dotenv").config({ path: "./.env" });
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const colors = require("colors");
// const { Videogame, Genre } = require("./src/db");

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(3001, () => {
    console.log("Listening at port 3001...".blue); // eslint-disable-line no-console
    // const videogame1 = await Videogame.create({
    //   name: "Super Mario Bros 64",
    //   description: "juego muy bueno y entretenido",
    //   rating: 4.65,
    //   platforms: ["PC", "Xbox", "nintendo"],
    // });
    // const videogame2 = await Videogame.create({
    //   name: "Mortal Kombat Super",
    //   description: "Muy buenos gráficos, muy realista",
    //   rating: 4.2,
    //   platforms: ["PC", "Xbox", "nintendo", "PlayStation"],
    // });
    // const videogame3 = await Videogame.create({
    //   name: "FIFA 22",
    //   description: "El mejor juego de futbol de la historia",
    //   rating: 4.7,
    //   platforms: ["PC", "Xbox", "PlayStation"],
    // });
    // const genre1 = await Genre.create({
    //   name: "Adventure",
    // });
    // const genre2 = await Genre.create({
    //   name: "Action",
    // });
    // const genre3 = await Genre.create({
    //   name: "Fighting",
    // });
    // const genre4 = await Genre.create({
    //   name: "Violence",
    // });
    // const genre5 = await Genre.create({
    //   name: "Sports",
    // });
    // await videogame1.addGenre([genre1, genre2]);
    // await videogame2.addGenre([genre3, genre4]);
    // await videogame3.addGenre([genre5, genre2]);
  });
});
