const { PORT = 5000 } = process.env;

const app = require("./app");
const knex = require("./db/connection");

knex.migrate.latest()
  .then(() => knex.seed.run())
  .then(() => {
    app.listen(PORT, listener);
  })
  .catch((error) => {
    console.error(error);
    knex.destroy();
 });

function listener() {
  console.log(`Listening on Port ${PORT}!`);
}
