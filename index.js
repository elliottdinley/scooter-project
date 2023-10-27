const Scooter = require("./src/Scooter.js");
const ScooterApp = require("./src/ScooterApp.js");
const User = require("./src/User.js");

// SCOOTER
function testScooter() {
    // rent
    let scooter = new Scooter("Station A");
    let testUser = new User("elliottdinley", "yelnidttoille", 18);
    try {
        console.log("Renting scooter with charge above 20 and not broken:");
        scooter.rent(testUser);
        console.log("Success!\n");
    } catch (error) {
        console.log(error.message);
    }

    scooter = new Scooter("Station A");
    testUser = new User("elliottdinley", "yelnidttoille", 18);
    scooter.charge = 15;
    try {
        console.log("Trying to rent when charge is low:");
        scooter.rent(testUser);
    } catch (error) {
        console.log(error.message);
        console.log("Success!\n");
    }

    scooter = new Scooter("Station A");
    testUser = new User("elliottdinley", "yelnidttoille", 18);
    scooter.charge = 80;
    scooter.isBroken = true;
    try {
        console.log("Trying to rent when scooter is broken:");
        scooter.rent(testUser);
    } catch (error) {
        console.log(error.message);
        console.log("Success!\n");
    }

    // dock
    console.log("Docking the scooter:");
    scooter.dock("Station A");
    console.log(scooter);
    if (scooter.station === "Station A" && scooter.user === null) {
        console.log("Success!\n");
    } else {
        console.log("Fail\n");
    }

    // requestRepair
    console.log("Marking scooter as broken:");
    scooter.isBroken = true;
    scooter.requestRepair();

    setTimeout(() => {
        console.log("Scooter after repair completion:");
        console.log(scooter.isBroken);
        if (!scooter.isBroken) {
            console.log("Success!\n");
        } else {
            console.log("Fail\n");
        }
        testScooterApp();
    }, 5000)

    // recharge
    scooter.charge = 60;
    scooter.recharge().then(() => {
        if (scooter.charge === 100) {
            console.log("Success!\n")
        } else {
            console.log("Fail\n")
        }
    });
}

function testScooterApp() {
    const scooterApp = new ScooterApp();
    
    const user1 = scooterApp.registerUser('user1', 'password1', 20);
    console.log('User registered:', user1);

    const user2 = scooterApp.registerUser('user2', 'password2', 16);
    console.log('User registered:', user2);

    // Test the loginUser and logoutUser functions
    scooterApp.loginUser('user1', 'password1');
    console.log('User logged in:', user1);

    scooterApp.logoutUser('user1');
    console.log('User logged out:', user1);

    // Test the createScooter and dockScooter functions
    const scooter1 = scooterApp.createScooter('Station A');
    console.log('Scooter created:', scooter1);

    scooterApp.dockScooter(scooter1, 'Station B');
    console.log('Scooter docked at Station B:', scooter1);

    // Test the rentScooter function
    scooterApp.createScooter('Station C');
    user1 = scooterApp.registerUser('user1', 'password1', 20);
    scooterApp.dockScooter(scooter1, 'Station A');

    scooterApp.rentScooter(scooter1, user1);
    console.log('Scooter rented by User 1:', scooter1);

    // Test the print function
    console.log('Registered Users:');
    for (const username in scooterApp.registeredUsers) {
        console.log(`Username: ${username}`);
    }

    console.log('Scooter Stations:');
    for (const station in scooterApp.stations) {
        console.log(`${station}: ${scooterApp.stations[station].length} scooters`);
    }
}

testScooter()