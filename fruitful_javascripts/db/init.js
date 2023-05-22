import sqlite3 from "sqlite3";
import fs from "fs";
import csv from "csv-parser";

const db = new sqlite3.Database(
  "/data/fruitful.db",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Connected to the fruitful.db SQLite database.");
    }
  }
);

db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS inventory(id INTEGER PRIMARY KEY, name TEXT, price REAL, stock_level INTEGER, image_url TEXT)",
    (err) => {
      if (err) {
        console.log("Error creating table", err);
        return;
      }
      console.log("Table created successfully");

      fs.createReadStream('./items.csv')
        .pipe(csv())
        .on("data", (row) => {
          db.get("SELECT * FROM inventory WHERE id = ?", [row.id], (err, data) => {
            if (err) {
              console.log("Error checking data", err);
              return;
            }

            // If data doesn't exist, then insert it into the database
            if (!data) {
              db.run(
                "INSERT INTO inventory(id, name, price, stock_level, image_url) VALUES(?, ?, ?, ?, ?)",
                [row.id, row.name, row.price, row.stock_level, row.image_url],
                (err) => {
                  if (err) {
                    console.log("Error inserting data", err);
                    return;
                  }
                }
              );
            }
          });
        })
        .on("end", () => {
          console.log("CSV file successfully processed");
          db.close((err) => {
            if (err) {
              console.error(err.message);
            }
            console.log("Closed the SQLite database connection.");
          });
        });
    }
  );
});
