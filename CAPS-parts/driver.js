"use strict";

const io = require("socket.io-client");
const host = "http://localhost:3000";
const capsConnection = io.connect(`${host}/caps`);

capsConnection.on("pickup", (payload) => {
  console.log(`DRIVER: Picked up ${payload.orderId}`);
  capsConnection.emit("in-transit", payload);
});

capsConnection.on("delivered", (payload) => {
  console.log(`DRIVER: delivered up ${payload.orderId}`);
});
