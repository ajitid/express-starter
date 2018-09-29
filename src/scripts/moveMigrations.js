const fs = require('fs');
const path = require('path');

// move old migrations b4 creating a new one
const migrationsFolderPath = path.join(__dirname, '..', 'db', 'migrations')
const oldMigrationsFolderPath = path.resolve(migrationsFolderPath, 'old_migrations');

fs
  .readdirSync(migrationsFolderPath)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    // const f = path.basename(file)
    const source = path.resolve(migrationsFolderPath, file);
    const destination = path.resolve(oldMigrationsFolderPath, file)
    fs.rename(source, destination, (err)=>{
      if(err) throw err;
      else console.log(`Successfully moved ${file}`);
    });
  });
