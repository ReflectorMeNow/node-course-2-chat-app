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

	socket.emit('newMessage', {
		from: 'Admin',
		text: 'Welcome to the chat app!',
		createdAt: new Date().getTime()
	});

	socket.broadcast.emit('newMessage', {
		from: 'Admin',
		text: 'Admin was joined to the chat app',
		createdAt: new Date().getTime()
	})

	socket.on('createMessage', (message) => {
		console.log('createMessage', message);
		io.emit('newMessage', { ...message, createdAt: new Date().getTime() });
		//socket.broadcast.emit('newMessage', { ...message, createdAt: new Date().getTime() });
	});


	socket.on('disconnect', () => {
		console.log('Client disconnected');
	});
});



server.listen(port, () => {
	console.log(`Listen port ${port}`);
})