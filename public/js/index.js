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

socket.on('newLocationMessage', function (data) {
	let item = $('<li></li>');
	let link = $('<a target="_blank">My current location</a>');
	link.attr('href', data.url);

	item.text(`${data.from}: `);
	item.append(link);
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

let locationBotton = $('#send-location');
locationBotton.on('click', function (e) {
	if (!navigator.geolocation) {
		return alert('Geolocation not supported by your browser.');
	}

	navigator.geolocation.getCurrentPosition(
		(position) => socket.emit('createLocationMessage', { latitude: position.coords.latitude, longitude: position.coords.longitude }),
		(errMessage) => alert('Unable to fetch location')
	);
});