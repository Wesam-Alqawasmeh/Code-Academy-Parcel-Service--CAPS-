"use strict";

const events = require("../hub");
const faker = require("faker");

setTimeout(() => {
  let payload = {
    store: faker.company.companyName(),
    orderId: faker.random.uuid(),
    customer: faker.name.findName(),
    address: faker.address.streetAddress(),
  };

  // emit order detector event from all events js file
  events.emit("pickup", payload);
}, 2000);
