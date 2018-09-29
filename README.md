# Express Starter

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

Express being a micro-framework demands a lot of setup before making it usable. This starter solves this. It comes with Passport for authentication, TypeORM for SQL, basic user model built-in, StandardJS for linting, Pug for templating and Youch for displaying errors. As most web applications are moving towards restful backend and SPA for frontend, this starter doesn't comes with Webpack (Pug is setup only because it can help in making email templates if needed).

If you need StandardJS for VS Code, then launch VS Code's Quick Open using <kbd>Ctrl</kbd> + <kbd>P</kbd>, paste `ext install chenxsan.vscode-standardjs`, and press enter.

_Work in Progress_

TODO:
- [ ] change account -> user in model, entity, route and server.js
- [ ] move logic to controllers
- [ ] use js for typeorm config instead of json and fix passport connection
- [ ] use typescript in project
- [ ] add info to readme about how to use (+db operations) and deploy
- [ ] prettier with js-standard??
- [ ] make index a pug file point to youch error
- [ ] add 404 pug
- [ ] async error handler by decorator (yep ts) or express-async-errors
- [ ] evaluate koajs and https://github.com/adonisjs. Adonis looks promising out of all solutions, but check if its modules are pluggable or not.
- [ ] https://github.com/ekifox/express-powerful-router
- [ ] check if migrations folder creation in necessary

## How to start?
1. You'll need to make `.env` file at root of your project with the following keys and your own values:
```
DB_URI = postgres://username:password@localhost/proj_db
COOKIE_KEYS = cnkjdFB3FRGtrAhtHGyh2fregt3VGK43defrgt25gt3f
PORT = 4000
```
You may need to go to `<project_root>/ormconfig.json` and add `"ssl": true`. If you are on local development database, probably don't. If you are using Heroku Postgres, then you should.

2. Migration: Schema for a simple user is already defined, but that structure of table is not present in the database. We first generate the migrations and then migrate it to database. To do both, use `npm run db:m2`. (Make sure your database (server) is up before running this command.) Also make sure you are happy with the names at `db/models/*.ts` as name of these files actually end up being table names. (TODO myself: check ways to override it, cause model names aren't plural but table names should be)

2. You are all set! Use `npm run dev` to run your Express application.
3. Refer to `<project_root>/routes/user.js` to see all URLs and JSON data that you need to send to create, login, logout, and to check authentication status of a user.

## Description
- `public/`: store your static files like images and fonts and 404, 500 page used in your website, but not user related data like users' profile pic
