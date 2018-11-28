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

	socket.emit('newEmail', {
		from: 'mike@example.com',
		text: 'Hey. What is going on?',
		createdAt: 123
	});

	socket.on('createMessage', (message)=>{
		socket.emit('newMessage', message);
	});
	


	socket.on('disconnect', () => {
		console.log('Client disconnected');
	});

	socket.on('createEmail', (newEmail) => {
		console.log('createEmail: ', JSON.stringify(newEmail, undefined, 2));
	});
});



server.listen(port, () => {
	console.log(`Listen port ${port}`);
})