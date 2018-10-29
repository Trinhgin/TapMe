const express = require("express");
// const cookieParser = require("cookie-parser");
const app = express();
const Sequelize = require("sequelize");
const ejs = require("ejs");

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
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());

const playerTrack = sequelize.define("playertracks", {
  name: Sequelize.STRING,
  value: Sequelize.INTEGER
});

app.get("/", (req, res) => {
  res.render("home");
  // console.log("Cookies: ", req.cookies);
});

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log("App is running on port 3000");
  });
});
