let socket = io();
socket.on('connect', function () {
	console.log('Connected to server');
});

socket.on('disconnect', function () {
	console.log('Disconneted from server')
});


socket.on('newMessage', function (data) {
	console.log('New message: ', data);
	let item = $('<li></li>');
	item.text(`${data.from}: ${data.text}`);
	$('#messages').append(item);
});


$('#message-form').on('submit', function (e) {
	e.preventDefault();
	socket.emit('createMessage', {
		from: 'User',
		text: $('[name=message]').val()
	}, function () {

	});
});