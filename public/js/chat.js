let socket = io();

function scrollToBottom() {
	let messages = $('#messages');
	let newMessage = messages.children('li:last-child');

	let clientHeight = messages.prop('clientHeight');
	let scrollTop = messages.prop('scrollTop');
	let scrollHeight = messages.prop('scrollHeight');
	let newMessageHeight = newMessage.innerHeight();
	let lastMessageHeight = newMessage.prev().innerHeight();

	if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
		messages.stop().animate({
			scrollTop: scrollHeight
		}, 'slow');
	}
};

socket.on('connect', function () {
	let params = $.deparam(window.location.search);
	socket.emit('join', params, function (err) {
		if (err) {
			alert(err);
			window.location.href = '/';
		} else {
			console.log('No error');
		}
	});
});

socket.on('disconnect', function () {
	console.log('Disconneted from server')
});

socket.on('updateUserList', function (usersNames) {
	let ol = $('<ol></ol>');
	usersNames.forEach((user) => {
		ol.append($('<li></li>').text(user));
	});
	$('#users').html(ol);
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
	scrollToBottom();
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
	scrollToBottom();
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