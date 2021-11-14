"use strict";

const events = require("../hub");

function pickup(payload) {
  // daclare new date
  let date = new Date();

  // declare pick up event object
  let pickupEvent = {
    event: "pickup",
    time: `${date.getFullYear()}/${
      date.getMonth() + 1
    }/${date.getDate()} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
    payload: payload,
  };
  console.log("EVENT", pickupEvent);
  console.log(`DRIVER: Picked up ${payload.orderId}`);
  events.emit("in-transit", payload);
}

module.exports = pickup;
