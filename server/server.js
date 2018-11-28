const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

let app = express();
let server = http.createServer(app);
let publicPath = path.join(__dirname, '..', '/public');
const port = process.env.PORT || 3000;
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('New user connected');

	socket.on('disconnect', () => {
		console.log('Client disconnected');
	});
});



server.listen(port, () => {
	console.log(`Listen port ${port}`);
})