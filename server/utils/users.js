class Users {
	constructor() {
		this.users = [];
	};

	addUser(id, name, room) {
		let user = { id, name, room };
		this.users.push(user);
		return user;
	};

	removeUser(id) {
		let user = this.getUser(id);
		let index = this.users.indexOf(user);
		if (index !== -1)
			this.users.splice(index, 1);
		return user;
	};

	getUser(id) {
		return this.users.filter(user => user.id === id)[0];
	};

	getUserList(room) {
		let result = this.users.filter(user => user.room === room);
		return result.map(user => user.name);
	};
};

module.exports = {
	Users
};