// Requires external modules
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

let db;
exports.db = db;

// Connects to the DB
exports.open = (filePath) =>
  new Promise((resolve, reject) => {
    this.db = new sqlite3.Database(filePath, sqlite3.OPEN_READONLY, (error) => {
      if (error) reject(new Error(`Open error: ${error.message}`));
      else resolve(`${path.basename(filePath, path.extname(filePath))} opened`);
    });
  });

// Reads the first row
exports.get = (query, params) =>
  new Promise((resolve, reject) => {
    this.db.get(query, params, (error, row) => {
      if (error) reject(new Error(`Read error: ${error.message}`));
      else resolve(row);
    });
  });

// Reads all the row
exports.all = (query, params) =>
  new Promise((resolve, reject) => {
    this.db.all(query, params, (error, rows) => {
      if (error) reject(new Error(`Read error: ${error.message}`));
      else resolve(rows);
    });
  });

// Closes the DB
exports.close = () =>
  new Promise((resolve, reject) => {
    this.db.close((error) => {
      if (error) reject(new Error(`Close error: ${error.message}`));
      else resolve(true);
    });
  });
