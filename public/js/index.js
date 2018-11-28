let socket = io();
socket.on('connect', function () {
	console.log('Connected to server');

	socket.emit('createEmail', {
		to: 'jen@example.com',
		text: 'Hey, this is Nikita',
		createdAt: 123
	});

	socket.emit('createMessage', {
		from: 'client',
		text: 'Hey, I\'m client',
		createdAt: 123
	});
});

socket.on('disconnect', function () {
	console.log('Disconneted from server')
});

socket.on('newEmail', function (data) {
	console.log('New email: ', data);
});

socket.on('newMessage', function (data) {
	console.log('New message: ', data);
});