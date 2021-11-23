/**
 * Knex configuration file.
 *
 * You will not need to make changes to this file.
 */

require('dotenv').config();
const path = require("path");

const {
  DATABASE_URL = "fanny.db.elephantsql.com",
  DATABASE_URL_DEVELOPMENT = "fanny.db.elephantsql.com",
  DATABASE_URL_TEST = "fanny.db.elephantsql.com",
  DATABASE_URL_PREVIEW = "fanny.db.elephantsql.com",
  DEBUG,
} = process.env;

module.exports = {
  development: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: {
      host: DATABASE_URL_DEVELOPMENT,
      database: "gykxorow",
      user: "gykxorow",
      password: "zaa2D_UxEWMmQ6bPEbKYubnFaUiJoEJz"
    },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  test: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: {
      host: DATABASE_URL_TEST,
      database: "dvmzwpcy",
      user: "dvmzwpcy",
      password: "R05Ln5L5_jBzDDTO-sQj0G_t251xr0_v"
    },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  preview: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: {
      host: DATABASE_URL_PREVIEW,
      database: "lvfezugv",
      user: "lvfezugv",
      password: "LyfVWlz8grG3AIGdGjNE8D8oXRUyx82x"
    },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  production: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: {
      host: DATABASE_URL,
      database: "dqrqyweh",
      user: "dqrqyweh",
      password: "1SLw0vgtW6PBTXCZTzDTEG7jxZDXBJp_"
    },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
};
