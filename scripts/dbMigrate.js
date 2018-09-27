if (process.env.NODE_ENV !== "production") {
  const dotenvResult = require("dotenv").config();
  if (dotenvResult.error) {
    throw dotenvResult.error;
  }
}

var exec = require('child_process').exec;
exec(`cd db && node ../node_modules/sequelize-auto-migrations/bin/runmigration`, function(error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
        console.log('exec error: ' + error);
    }
});
