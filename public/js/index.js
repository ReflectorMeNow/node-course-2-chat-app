let socket = io();
socket.on('connect', function () {
	console.log('Connected to server');
});

socket.on('disconnect', function () {
	console.log('Disconneted from server')
});


socket.on('newMessage', function (data) {
	console.log('New message: ', data);
	let formattedTime = moment(data.createdAt).format('HH:mm')
	let item = $('<li></li>');
	item.text(`${data.from} [${formattedTime}]: ${data.text}`);
	$('#messages').append(item);
});

socket.on('newLocationMessage', function (data) {
	let item = $('<li></li>');
	let link = $('<a target="_blank">My current location</a>');
	link.attr('href', data.url);

	let formattedTime = moment(data.createdAt).format('HH:mm')
	item.text(`${data.from} [${formattedTime}]: `);
	item.append(link);
	$('#messages').append(item);
});

let messageTextBox = $('[name=message]');
$('#message-form').on('submit', function (e) {
	e.preventDefault();
	socket.emit('createMessage', {
		from: 'User',
		text: messageTextBox.val()
	}, function () {
		messageTextBox.val('');
	});
});

let locationBotton = $('#send-location');
locationBotton.on('click', function (e) {
	if (!navigator.geolocation) {
		return alert('Geolocation not supported by your browser.');
	}

	locationBotton.attr('disabled', 'disabled').text('Sending location...');
	navigator.geolocation.getCurrentPosition(
		(position) => {
			locationBotton.removeAttr('disabled').text('Send location');
			socket.emit('createLocationMessage', { latitude: position.coords.latitude, longitude: position.coords.longitude });
		},
		(errMessage) => {
			locationBotton.removeAttr('disabled').text('Send location');
			alert('Unable to fetch location');
		}
	);
});