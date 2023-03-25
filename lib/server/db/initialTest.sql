BEGIN TRANSACTION;

INSERT
INTO    posts (title, content, author)
VALUES  ('Title test', '## content test', 'author isak');

END TRANSACTION;