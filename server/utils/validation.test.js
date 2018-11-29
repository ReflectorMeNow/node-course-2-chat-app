const { isRealString } = require('./validation');
const expect = require('expect');

describe('isRealString', () => {
	it('should reject non string values',()=>{
		let number = 1;
		let object = {name:'Nikita'};
		let date = new Date();
		expect(isRealString(number)).toBe(false);
		expect(isRealString(object)).toBe(false);
		expect(isRealString(date)).toBe(false);
	});

	it('should reject string with only spaces',()=>{
		let spaces = "                  ";
		expect(isRealString(spaces)).toBe(false);
	});

	it('should allow strings with non-space characters',()=>{
		let it1 = "Some value";
		let it2 = " Some another value     ";
		expect(isRealString(it1)).toBe(true);
		expect(isRealString(it2)).toBe(true);
	});
});