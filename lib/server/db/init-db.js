import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

(async () => {
  const db = await open({
    filename: './post-db.sqlite',
    driver: sqlite3.Database,
  });

  await db.exec(`
  DROP TABLE IF EXISTS posts;

  CREATE TABLE posts (
    id INTEGER PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

    INSERT INTO posts (title, content, author, created_at, updated_at) VALUES
      ('First post', 'This is the content of the first post', 'John Doe', '2023-03-25 12:00:00', '2023-03-25 12:00:00'),
      ('Second post', 'This is the content of the second post', 'Jane Doe', '2023-03-25 13:00:00', '2023-03-25 13:00:00'),
      ('Third post', 'This is the content of the third post', 'Bob Smith', '2023-03-25 14:00:00', '2023-03-25 14:00:00');
  `);

  console.log('Database initialized');
})();
