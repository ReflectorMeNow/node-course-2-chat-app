const expect = require('expect');
const { generateMessage } = require('./message');

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