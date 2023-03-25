import express, { Request, Response } from 'express';
import sqlite3 from "sqlite3";

const app = express();
const port = 3000;
const db = new sqlite3.Database("post-db.sqlite");

// Add a new post to the database
app.post("/posts", (req: Request, res: Response) => {
  const { title, content, author } = req.body;
  const createdAt = new Date();
  const updatedAt = new Date();
  db.run(
    "INSERT INTO posts (title, content, author, created_at, updated_at) VALUES (?, ?, ?, ?, ?)",
    [title, content, author, createdAt, updatedAt],
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
app.put("/posts/:id", (req: Request, res: Response) => {
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
app.delete("/posts/:id", (req: Request, res: Response) => {
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
app.get("/posts", (req: Request, res: Response) => {
  db.all("SELECT * FROM posts", (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.send(rows);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

export default app;
