const expect = require('expect');
const { Users } = require('./users');


describe('Users', () => {
	let testUsers;
	beforeEach(() => {
		testUsers = new Users();
		testUsers.users = [
			{ id: 1, name: 'Mike', room: 'Node Course' },
			{ id: 2, name: 'Jen', room: 'React Course' },
			{ id: 3, name: 'Julie', room: 'Node Course' }
		];
	});

	it('should add a new user', () => {
		let users = new Users();
		let user = {
			id: '123',
			name: 'Nikita',
			room: 'room1'
		};

		let res = users.addUser(user.id, user.name, user.room);
		expect(users.users).toEqual([user]);
	});

	it('should return names for Node Course', () => {
		let userList = testUsers.getUserList('Node Course');
		expect(userList.length).toBe(2);
	});

	it('should return names for React Course', () => {
		let userList = testUsers.getUserList('React Course');
		expect(userList.length).toBe(1);
	});

	it('should remove a user', () => {
		let user = testUsers.users[0];
		let removedUser = testUsers.removeUser(user.id);
		expect(removedUser.name).toBe(user.name);
		expect(testUsers.users.length).toBe(2);
		expect(testUsers.users.map(u => u.name)).toEqual(['Jen', 'Julie'])
	});

	it('should not remove a user', () => {
		let removedUser = testUsers.removeUser(123);
		expect(removedUser).toBeFalsy();
		expect(testUsers.users.length).toBe(3);
	});

	it('should find a user', () => {
		let user = testUsers.users[0];
		let findedUser = testUsers.getUser(user.id);
		expect(findedUser.name).toBe(user.name);
	});

	it('should not find a user', () => {
		let user = testUsers.getUser(123);
		expect(user).toBeFalsy();
	});
});