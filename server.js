import polka from 'polka';

const app = polka();

// Define a GET route at /api/hello
app.get('/api/hello', (req, res) => {
  res.end('Hello, world!');
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log(`Server started on http://localhost:3000`);
});
