require("dotenv").config({ path: "./.env" });
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const colors = require("colors");

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(process.env.PORT, () => {
    console.log("Listening at port 3001...".blue);
  });
});
