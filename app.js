//Requiring packages
const express = require("express");
const fs = require("fs");
const app = express();
const Sequelize = require("sequelize");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
