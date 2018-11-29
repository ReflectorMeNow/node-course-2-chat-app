const expect = require('expect');
const { generateMessage,generateLocationMessage } = require('./message');

describe('generateMessage', () => {
	it('should generate the correct message object', () => {
		let from = 'Nikita';
		let text = 'Hi';

		let result = generateMessage(from, text);

		expect(result.from).toBe(from);
		expect(result.text).toBe(text);
		expect(result.createdAt).toBeTruthy();
		expect(typeof result.createdAt).toBe('number');
	});
});

describe('generateLocationMessage', () => {
	it('should generate the correct location object', () => {
		let from = 'Nikita';
		let latitude = 1;
		let long = 2;
		let url = 'https://www.google.com/maps?q=1,2';

		let result = generateLocationMessage(from, latitude, long);

		expect(result.from).toBe(from);
		expect(result.url).toBe(url);
		expect(result.createdAt).toBeTruthy();
		expect(typeof result.createdAt).toBe('number');
	});
});