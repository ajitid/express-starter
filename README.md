# Express Starter

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

Express being a micro-framework demands a lot of setup before making it usable. This starter solves this. It comes with Passport for authentication, TypeORM for SQL, basic user model built-in, StandardJS for linting, Pug for templating. As most web applications are moving towards restful backend and SPA for frontend, this starter doesn't comes with Webpack (Pug is setup only because it can help in making email templates if needed).

If you need StandardJS for VS Code, then launch VS Code's Quick Open using <kbd>Ctrl</kbd> + <kbd>P</kbd>, paste `ext install chenxsan.vscode-standardjs`, and press enter.

_Work in Progress_

TODO:
- [ ] use js for typeorm config instead of json and fix passport connection
- [ ] use typescript in project
- [ ] add info to readme about how to use (+db operations) and deploy
- [ ] prettier with js-standard??
- [ ] make index a pug file point to youch error
- [ ] add 404 pug
- [ ] evaluate koajs and https://github.com/adonisjs. Adonis looks promising out of all solutions, but check if its modules are pluggable or not.
- [ ] https://github.com/ekifox/express-powerful-router

## How to start?
1. You'll need to make `.env` file at root of your project with the following keys and your own values:
```
DB_URI = postgres://username:password@localhost/proj_db
COOKIE_KEYS = cnkjdFB3FRGtrAhtHGyh2fregt3VGK43defrgt25gt3f
PORT = 4000
```
2. Migration: Schema for a simple user is already defined, but that structure of table is not present in the database. We first generate the migrations and then migrate it to database. To do both, use `npm run db:m2`. (Make sure your database (server) is running before running this command.)
2. You are all set! Use `npm run dev` to run your Express application.
3. Refer to `<project_root>/routes/user.js` to see all URLs and JSON data that you need to send to create, login, logout, and to check authentication status of a user.
