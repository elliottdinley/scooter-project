class Scooter {
	static nextSerial = 1;

	constructor(station) {
		this.station = station;
		this.user = null;
		this.serial = Scooter.nextSerial;
		Scooter.nextSerial++;
		this.charge = 100;
		this.isBroken = false;
	}

	rent(user) {
		if (this.charge > 20 && !this.isBroken) {
			this.station = null;
			this.user = user;
		} else {
			throw new Error(
				this.isBroken
					? "Scooter needs repair"
					: "Scooter needs charge"
			);
		}
	}

	dock(station) {
		this.station = station;
		this.user = null;
	}

	// recharge() {
	//     const chargePerSecond = 10;
	//     const chargeIntervals = setInterval(() => {
	//         if (this.charge < 100) {
	//             this.charge = Math.min(this.charge + chargePerSecond, 100);
	//             console.log(`Scooter charge: ${this.charge}%`);
	//         } else {
	//             clearInterval(chargeIntervals);
	//         }
	//     }, 1000);
	// }

	async recharge() {
		console.log('Starting charge');

		const chargePerSecond = 10;
		const interval = 1000;
		const maxCharge = 100;

		while (this.charge < maxCharge) {
			this.charge += chargePerSecond;
			if (this.charge > maxCharge) {
				this.charge = maxCharge;
			}

			console.log(`Scooter charge: ${this.charge}%`);
			await new Promise(resolve => setTimeout(resolve, interval));
		}

		console.log('Charge complete');
	}

	requestRepair() {
		setTimeout(() => {
			this.isBroken = false;
			console.log("Repair completed");
		}, 5000);
	}
}

module.exports = Scooter;