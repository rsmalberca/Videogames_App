require("dotenv").config({ path: "../../../.env" });
const express = require("express");
const router = express.Router();
const { getAllInfo } = require("../../controllers/videogames");

// const probando = async () => {
//   let datos = await getAllInfo();
//   console.log(datos.filter((g) => g.name.toLowerCase().includes("super")));
//   console.log(datos.length);
//   console.log("aqui tus datos, perro");
// };
// probando();

// ------- Get the all games--------
// we can search videogames that match the name passed by query (only the first 15 results...)

router.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const allVg = await getAllInfo();
      const matchedGames = allVg.filter((game) =>
        game.name.toLowerCase().includes(name.toLowerCase())
      );
      if (!matchedGames.length) {
        res.status(404).json({
          message: `There are no video games with the name ${name}`,
        });
      } else {
        res.status(200).json(matchedGames.slice(0, 15));
      }
    } else {
      const allVg = await getAllInfo();
      res.status(200).json(allVg);
    }
  } catch (error) {
    res.status(404).json({ error });
  }
});

module.exports = router;
