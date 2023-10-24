const User = require('./User');
const Scooter = require('./Scooter');

class ScooterApp {
	constructor() {
		this.stations = {
			"Station A": [],
			"Station B": [],
			"Station C": [],
		};
		this.registeredUsers = {};
	}

	registerUser(username, password, age) {
		if (this.registeredUsers[username]) {
			throw new Error("Already registed");
		}

		if (age < 18) {
			throw new Error("Too young to register");
		}

		const user = new User(username, password, age);
		console.log("User has been registered");
		this.registeredUsers[username] = user;
		return user;
	}

	loginUser(username, password) {
		const user = this.registeredUsers[username];

		if (!user) {
			throw new Error("Username or password is incorrect");
		}

		user.login(password);
	}

	logoutUser(username) {
		const user = this.registeredUsers[username];

		if (!user) {
			throw new Error(`${username} is not logged in`);
		}

		user.logout();
	}

	createScooter(station) {
		if (!this.stations[station]) {
			throw new Error(`${station} doesn't exist`);
		}

		const newScooter = new Scooter(station);
		console.log(`Created new scooter at ${station}`);
		return scooter
	}

	dockScooter(scooter, station) {
		if (!this.stations[station]) {
			throw new Error(`${station} doesn't exist`);
		}

		if (this.stations[station].includes(scooter)) {
			throw new Error("Scooter is already at the station");
		}

		this.stations[station].push(newScooter);
		console.log(`Scooter is docked at ${station}`);
	}

	rentScooter(scooter, user) {
		for (const station in this.stations) {
			const stationScooters = this.stations[station];
			const scooterIndex = stationScooters.indexOf(scooter);

			if (scooterIndex !== -1) {
				if (scooter.user === null) {
					stationScooters.splice(scooterIndex, 1);
					scooter.rent(user);
					console.log(`${user.username} has rented a scooter from ${station}`)
					return;
				} else {
					throw new Error(`Scooter already rented by ${scooter.user.username}`)
				}
			}
		}
	}

	print() {
		console.log("Registered Users:");

		for (const username in this.registeredUsers) {
			console.log(`Username: ${username}`);
		}

		console.log("Scooter Stations:");

		for (const station in this.stations) {
			console.log(`${station}: ${this.stations[station].length} scooters`);
		}
	}
}

module.exports = ScooterApp;