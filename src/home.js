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
  "leaderboards",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    score: {
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

app.post("/score", (req, res) => {
  var name = req.body.name;
  var score = req.body.score;
  console.log(req.body);

  //save the new name & score to database
  Leaderboard.create({
    name: name,
    score: score
  })
    .then(playerscore => {
      Leaderboard.findAll({
        order: [["score", "DESC"]],
        limit: 10
      }).then(allscores => {
        console.log(allscores);
        res.send(allscores);
      });
      // var name = req.body.name;
      // req.body.name = {};
      // var score = req.body.score;
      // req.body.score = {};
      // res.send({ name: name, score: score });
    })
    .catch(err => {
      console.error(err);
      res.redirect("/");
    });
});

//get the 10 highest scores from db
// app.get("/", (req, res) => {
//   res.render("/");
// });
// app.post("/", (req, res) => {});

//show to front-end by sending JSON
// app.post("/", (req, res) => {
//   res.send(JSON.stringify([{ name: name, score: score }]));
// });

sequelize.sync();

app.listen(3000, () => {
  console.log("App is running on port 3000");
});
