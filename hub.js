"use strict";

require("dotenv").config();

const pickup = require("./handlers/pickup");
const inTransit = require("./handlers/inTransit");
const delivered = require("./handlers/delivered");

const PORT = process.env.PORT || 3000;

const hub = require("socket.io")(PORT);

const capsSystem = hub.of("/caps");

hub.on("connection", (socket) => {
  console.log("CONNECTED", socket.id);
});

capsSystem.on("connection", (socket) => {
  console.log("CAPS SYSTEM CONNECTING", socket.id);

  socket.on("pickup", (payload) => {
    pickup(payload);
    // socket.join(payload.store);
    capsSystem.emit("pickup", payload);
  });

  socket.on("in-transit", (payload) => {
    inTransit(payload);
    capsSystem.emit("delivered", payload);
  });

  socket.on("delivered", (payload) => {
    delivered(payload);
  });
});
