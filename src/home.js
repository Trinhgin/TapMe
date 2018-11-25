const express = require("express");
const app = express();
const Sequelize = require("sequelize");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const fs = require("fs");
// const port = process.env.PORT || 5000;
const sequelize = new Sequelize(
  // process.env.DATABASE_URL,
  process.env.TAPME,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: "localhost",
    host: process.env.POSTGRES_HOST,
    dialect: "postgres",
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

  //Save the new name & score to database
  Leaderboard.create({
    name: name,
    score: score
  })
    .then(playerscore => {
      Leaderboard.findAll({
        order: [["score", "DESC"]],
        limit: 10
      }).then(allscores => {
        res.send(allscores);
      });
    })
    .catch(err => {
      console.error(err);
      res.redirect("/");
    });
});

sequelize.sync({ force: true });

app.listen(3000, () => {
  console.log("App is running on port 3000");
});

// app.listen(port, () => {
//   console.log("App is running on port 3000" + port);
// });
