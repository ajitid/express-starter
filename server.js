const path = require("path");
const express = require("express");
const cookieSession = require("cookie-session");
const passport = require("passport");
const Youch = require('youch')

if (process.env.NODE_ENV !== "production") {
  const dotenvResult = require("dotenv").config();
  if (dotenvResult.error) {
    throw dotenvResult.error;
  }
}
const PORT = parseInt(process.env.PORT);

const app = express();

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())

app.use(
  cookieSession({
    name: "session",
    keys: [process.env.COOKIE_KEYS],
    maxAge: 15 * 24 * 60 * 60 * 1000
  })
);

require('./db');

app.use(passport.initialize());
app.use(passport.session());
require("./handlers/passport");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
// TODO add sass support, use wes bos and express-generator code

module.exports = app;

// added fn() below to check youch, remove it
app.get("/", (req, res) => fn() || res.send("live!")); // TODO comment this out on adding index.pug
require('./routes')

// youch for error handling
app.use((error, req, res, next) => {
  if (error && process.env.NODE_ENV !== 'production') {
    const youch = new Youch(error, req);

    return youch
      .toHTML()
      .then((html) => {
        res.set('Content-Type', 'text/html');
        return res.send(html);
      })
  }
  next(error);
});


// const authRoute = require("./routes/auth");
// app.use("/user", userRoute);
// TODO ^ use index.js in routes/ to merge routes instead
app.use(express.static(path.join(__dirname, "public")));

const server = app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

server.on("error", err => {
  if (err.syscall !== "listen") throw err;
  switch (err.code) {
    case "EACCES":
      console.error("elevated privileges are required");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`port ${PORT} is already in use`);
      process.exit(1);
      break;
    default:
      throw err;
  }
});
