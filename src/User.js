class User {
	constructor(username, password, age) {
		this.username = username;
		this.password = password;
		this.age = age;
		this.loggedIn = false;
	}

	login(password) {
		if (this.password !== password) {
			throw new Error("Incorrect password");
		}

		this.loggedIn = true;
		console.log(`${this.username} is logged in`);
	}

	logout() {
		this.loggedIn = false;
		console.log(`${this.username} is logged out`);
	}
}

module.exports = User;