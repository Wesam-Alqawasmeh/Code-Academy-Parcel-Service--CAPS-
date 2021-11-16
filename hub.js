"use strict";

require("dotenv").config();

const pickup = require("./handlers/pickup");
const inTransit = require("./handlers/inTransit");
const delivered = require("./handlers/delivered");

const PORT = process.env.PORT || 3000;

const hub = require("socket.io")(PORT);

const capsSystem = hub.of("/caps");

const messageQueue = {
  pickup: {},
  delivered: {},
};

capsSystem.on("connection", (socket) => {
  console.log("CAPS SYSTEM CONNECTING", socket.id);
  console.log("=====================================");
  socket.on("pickup", (payload) => {
    console.log("Vendor sent to Hub new order");
    console.log("=====================================");
    messageQueue.pickup[payload.orderId] = payload;
    pickup(payload);
    console.log("=====================================");
    // socket.join(payload.store);
    capsSystem.emit("pickup", payload);
  });

  socket.on("received", (payload) => {
    console.log(
      `the ${payload.moduleName} sent for the Hub to delete the order ${payload.payload.orderId}`
    );
    console.log("=====================================");
    if (payload.event === "pickup") {
      delete messageQueue.pickup[payload.payload.orderId];
    }
    if (payload.event === "delivered") {
      delete messageQueue.delivered[payload.payload.orderId];
    }
    console.log(messageQueue);
    console.log("=====================================");
  });

  socket.on("in-transit", (payload) => {
    console.log("The driver sent to the Hub that the ordrer is on the way");
    console.log("=====================================");
    inTransit(payload);
    console.log("=====================================");
    capsSystem.emit("delivered", payload);
  });

  socket.on("delivered", (payload) => {
    delivered(payload);
  });

  socket.on("get_all", (payload) => {
    console.log(`get all of the missing ${payload.event} messages`);
    console.log("=====================================");

    if (payload.event === "pickup") {
      Object.keys(messageQueue.pickup).forEach((orderId) => {
        socket.emit("pickup", messageQueue.pickup[orderId]);
      });
    }
    if (payload.event === "delivered") {
      Object.keys(messageQueue.delivered).forEach((orderId) => {
        socket.emit("delivered", messageQueue.delivered[orderId]);
      });
    }
  });
});
