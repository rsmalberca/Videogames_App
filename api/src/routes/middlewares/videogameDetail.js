require("dotenv").config({ path: "../../../.env" });
const express = require("express");
const router = express.Router();
const { getById } = require("../../controllers/videogames");

// const probando = async (id) => {
//   const dato = await getById(id);
//   console.log(dato);
// };

// probando("f2995dd2-64ca-4161-abad-ed441aac00ec");

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    if (id.includes("-")) {
      const vgDetail = await getById(id);
      res.status(200).json(vgDetail);
    } else {
      const numId = parseInt(id);
      const vgDetail = await getById(numId);
      res.status(200).json(vgDetail);
    }
  } catch (error) {
    res.status(404).json({ error, message: "Video Game ID not found" });
  }
});

module.exports = router;
