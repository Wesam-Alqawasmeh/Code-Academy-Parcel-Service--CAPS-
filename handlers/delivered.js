"use strict";

function delivered(payload) {
  console.log(`DRIVER: delivered up ${payload.orderId}`);
  console.log(`VENDOR: Thank you for delivering ${payload.orderId}`);
  // daclare new date
  let date = new Date();

  // declare delivered event object
  let deliveredEvent = {
    event: "delivered",
    time: `${date.getFullYear()}/${
      date.getMonth() + 1
    }/${date.getDate()} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
    payload: payload,
  };
  console.log("EVENT", deliveredEvent);
}

module.exports = delivered;
