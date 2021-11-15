"use strict";

require("dotenv").config();
const PORT = process.env.PORT || 3000;
const io = require("socket.io-client");
const host = `http://localhost:${PORT}`;
const capsConnection = io.connect(`${host}/caps`);

const faker = require("faker");

let payload = {
  store: faker.company.companyName(),
  orderId: faker.random.uuid(),
  customer: faker.name.findName(),
  address: faker.address.streetAddress(),
};

// emit order detector event from all events js file
capsConnection.emit("pickup", payload);

capsConnection.on("delivered", (payload) => {
  console.log(`VENDOR: Thank you for delivering ${payload.orderId}`);
  capsConnection.emit("delivered", payload);
});
