const express = require("express");
const db = require("./libs/dbConnection");

const app = express();

app.use(express.json());

app.get("/users", (req, res) => {
      const query = "SELECT * FROM users";

      db.all(query, [], (err, rows) => {
            if (err) {
                  return res.status(500).json({ error: err.message });
            }
            return res.json({ data : rows });
      })
})

app.post("/table/users", (req, res) => {
      const query = `
            CREATE TABLE IF NOT EXISTS users (
                  id INTEGER PRIMARY KEY AUTOINCREMENT,
                  first_name TEXT NOT NULL,
                  last_name TEXT,
                  age INTEGER
            );
      `;
      db.run(query, (err) => {
            if (err) {
                  return res.status(500).json({ error: err.message });
            }
            return res.status(201).json({ message: "Table 'users' created successfully" });
      });
});

app.post("/user", (req, res) => {

      const { firstname, lastname, age } = req.body;

      if (!firstname) return res.status(400).json({ error: "firstname is required" });

      const query = `
            INSERT INTO users (first_name, last_name, age)
            VALUES (?, ?, ?)
      `;

      db.run(query, [firstname, lastname, age], (err) => {
            if (err) {
                  return res.status(500).json({ error: err.message });
            }

            return res.status(201).json({
                  message: "User created successfully",
                  userId: this.lastID
            });
      })
})

app.listen(8080, (e) => {
      if (e) {
            throw new Error(e.message);
      }
})