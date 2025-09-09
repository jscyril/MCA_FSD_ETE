import express from "express";
import mysql from "mysql2";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database.");
});

// Get all movies
app.get("/movies", (req, res) => {
  db.query("SELECT * FROM movies", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Add a new movie
app.post("/movies", (req, res) => {
  console.log("POST /movies req.body:", req.body);
  if (!req.body || typeof req.body !== "object") {
    return res.status(400).json({ error: "Invalid or missing JSON body" });
  }
  const { title, director, genre, release_year, rating } = req.body;
  if (!title || !director || !genre || !release_year || !rating) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  db.query(
    "INSERT INTO movies SET ?",
    { title, director, genre, release_year, rating },
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ id: result.insertId, ...req.body });
    }
  );
});

// Update an existing movie
app.put("/movies/:id", (req, res) => {
  db.query(
    "UPDATE movies SET ? WHERE id=?",
    [req.body, req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ id: req.params.id, ...req.body });
    }
  );
});

// Delete a movie
app.delete("/movies/:id", (req, res) => {
  db.query("DELETE FROM movies WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ success: true });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
