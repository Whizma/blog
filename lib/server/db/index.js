import express from 'express';
import sqlite3 from "sqlite3";
import bodyParser from 'body-parser';

const app = express();
const db = new sqlite3.Database("post-db.sqlite");

app.use(bodyParser.json());

app.use(function(req,res,next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Add a new post to the database
app.post("/posts", (req, res) => {
  const { title, content, author } = req.body;
  db.run(
    "INSERT INTO posts (title, content, author) VALUES (?, ?, ?)",
    [title, content, author],
    function (err) {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.send(`Post added with id: ${this.lastID}`);
      }
    }
  );
});

// Update an existing post in the database
app.put("/posts/:id", (req, res) => {
  const { title, content, author } = req.body;
  const updatedAt = new Date();
  db.run(
    "UPDATE posts SET title = ?, content = ?, author = ?, updated_at = ? WHERE id = ?",
    [title, content, author, updatedAt, req.params.id],
    function (err) {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.send(`Post with id ${req.params.id} updated successfully`);
      }
    }
  );
});

// Delete an existing post from the database
app.delete("/posts/:id", (req, res) => {
  db.run(
    "DELETE FROM posts WHERE id = ?",
    req.params.id,
    function (err) {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.send(`Post with id ${req.params.id} deleted successfully`);
      }
    }
  );
});

// Retrieve all posts from the database
app.get("/posts", (req, res) => {
  db.all("SELECT * FROM posts", (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.send(rows);
    }
  });
});

export default app;
