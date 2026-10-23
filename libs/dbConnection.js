const path = require("node:path");
const sqlite3 = require("sqlite3").verbose();

const dbPath = path.resolve(__dirname, '../database.db');

const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
            console.error("DB Connection fail.");
      } else {
            console.log("DB Connection Success.");
      }
});

module.exports = db;