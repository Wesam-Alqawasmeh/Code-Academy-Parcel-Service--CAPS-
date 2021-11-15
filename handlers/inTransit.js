"use strict";

function inTransit(payload) {
  // daclare new date
  let date = new Date();

  // declare in transit event object
  let inTRansitEvent = {
    event: "in-transit",
    time: `${date.getFullYear()}/${
      date.getMonth() + 1
    }/${date.getDate()} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
    payload: payload,
  };
  console.log("EVENT", inTRansitEvent);
  // events.emit("delivered", payload);
}

module.exports = inTransit;
