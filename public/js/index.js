let socket = io();
socket.on('connect', function () {
	console.log('Connected to server');
});

socket.on('disconnect', function () {
	console.log('Disconneted from server')
});


socket.on('newMessage', function (data) {
	let formattedTime = moment(data.createdAt).format('HH:mm');
	let template = $('#message-template').html();
	let html = Mustache.render(template, {
		text: data.text,
		from: data.from,
		createdAt: formattedTime
	});

	$('#messages').append(html);
});

socket.on('newLocationMessage', function (data) {
	let formattedTime = moment(data.createdAt).format('HH:mm');
	let template = $('#location-template').html();
	let html = Mustache.render(template, {
		from: data.from,
		createdAt: formattedTime,
		url: data.url
	});

	$('#messages').append(html);
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