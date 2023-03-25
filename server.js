import app from './lib/server/db/index.js';
import http from 'http';

// Create a new HTTP server.
const server = http.createServer(app);

// Listen for requests on port 3000.
const port = 3000;
server.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
