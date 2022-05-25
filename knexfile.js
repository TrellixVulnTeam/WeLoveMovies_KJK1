/**
 * Knex configuration file.
 *
 * You will not need to make changes to this file.
 */

require("dotenv").config();
const path = require("path");
// updating heroku remote
// const { NODE_ENV = "development", DEVELOPMENT_DATABASE_URL, PRODUCTION_DATABASE_URL, } = process.env;
// const URL = NODE_ENV === "production" ? PRODUCTION_DATABASE_URL : DEVELOPMENT_DATABASE_URL;


const {
  DEVELOPMENT_DATABASE_URL="postgres://cmwiwncx:oOfpjh1UXYGeXcfFNjyhLYH85-MvYWbu@heffalump.db.elephantsql.com/cmwiwncx",
  PRODUCTION_DATABASE_URL="postgres://cmwiwncx:oOfpjh1UXYGeXcfFNjyhLYH85-MvYWbu@heffalump.db.elephantsql.com/cmwiwncx",
  DEBUG,
} = process.env;

// const {
//   DATABASE_URL="postgresql://postgres@localhost/postgres",
//   DATABASE_URL_DEVELOPMENT="postgresql://postgres@localhost/postgres",
//   DATABASE_URL_TEST="postgresql://postgres@localhost/postgres",
//   DATABASE_URL_PREVIEW="postgresql://postgres@localhost/postgres",
//   DEBUG,
// } = process.env;

module.exports = {
  development: {
    client: "postgresql",
    connection: DEVELOPMENT_DATABASE_URL,
    pool: { min: 0, max: 5 },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },

  production: {
    client: "postgresql",
    connection: PRODUCTION_DATABASE_URL,
    pool: { min: 0, max: 5 },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },

  test: {
    client: "sqlite3",
    connection: {
      filename: ":memory:",
    },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    useNullAsDefault: true,
  },
};
