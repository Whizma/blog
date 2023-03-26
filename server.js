import app from './lib/server/db/index.js';
import http from 'http';

app.use(function(req,res,next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5174");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Create a new HTTP server.
const server = http.createServer(app);

// Listen for requests on port 3000.
const port = 3000;
server.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
