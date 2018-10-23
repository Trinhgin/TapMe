# Read me then TapMe! #
TapMe was created by Trinh Nguyen aka Gin.  

The purpose of building this game is to accomplish the final individual project. From this project, I will apply the skills that I have obtained from the full-stack website development traineeship into a hands-on experience.

The game is free and for all ages who want to have a simple but relaxing and fun game to play with. By playing the game, it might help the player release some stress and have a good laugh afterwards.

There are many similar games to TapMe; however, my game is different by having a leaderboard that compares the current player's score with the previous ones. Also it has tricky button that moves around unexpectedly so players need to highly alert for it in order to gain the highest score.

## Tech Specifications: ##
TapMe is built with
* __Node.js__ - run-time environment
* __JavaScript__ - main programming language used
* __EJS__ - template engine to render the HTMLs
* __CSS/Bootstraps__ - styling language
* __PostgreSQL__ - OR database system
* __AJAX__ - responsive frontend
* __jQuery__ - library used to implement AJAX
* __Sequelize__ - promise-based ORM for Node.js
* __express__ - web framework for Node.js
* __express-sessions__ - session middleware
* __**React__ - JavaScript library for building user interface. This version will be built when there is enough time

## In order to use: ##
* set up database in postgres

* set up environmental variables in .bash_profile:
   ```
   {
   db: process.env.TAPME,
   user: process.env.POSTGRES_USER,
   password: process.env.POSTGRES_PASSWORD,
   host: process.env.POSTGRES_HOST,
   port: process.env.POSTGRES_PORT
   }
   ```

* next, install required packages/dependencies:
   ```
   $ npm install
    ```

* run the application in node:
   ```
   $ node src/app.js or $ nodemon src/app.js
   ```

## Milestones: ##
* Oct 23: design front-page layout
* Oct 24-27: build functionalities
* Oct 28-29: style front-page
* Oct 30-31: debug
* Nov 1: final touch
* Nov 2: present the project

## Author: ##
 [Trinh](https://www.linkedin.com/in/tutrinhnguyenha/)
