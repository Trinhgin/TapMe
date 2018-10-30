const express = require("express");
const app = express();
const Sequelize = require("sequelize");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const fs = require("fs");
const sequelize = new Sequelize(
  process.env.TAPME,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.POSTGRES_HOST,
    dialect: "postgres",
    port: process.env.POSTGRES_PORT,
    default: {
      timestamp: false
    }
  }
);

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const Leaderboard = sequelize.define(
  "tapme",
  {
    playername: {
      type: Sequelize.STRING,
      allowNull: true
    },
    playerscore: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  },
  {
    timestamp: false
  }
);

//Home route
app.get("/", (req, res) => {
  res.render("home");
});

app.post("/", (req, res) => {
  var name = req.body.name;
  var score = req.body.score;
  //save to database

  //get from db

  //show to front-end by sending JSON

  res.send(
    JSON.stringify([
      { name: name, score: score },
      { name: "monnkey", score: 10 },
      { name: "strawberry", score: 0 },
      { name: "duh", score: 3 },
      { name: "em", score: 8 },
      { name: "oi", score: 6 },
      { name: "meow", score: 4 },
      { name: name, score: score },
      { name: name, score: score },
      { name: name, score: score }
    ])
  );
});

sequelize.sync();

app.listen(3000, () => {
  console.log("App is running on port 3000");
});
