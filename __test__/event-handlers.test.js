"use strict";

const faker = require("faker");
const pickup = require("../handlers/pickup");
const inTransit = require("../handlers/inTransit");
const delivered = require("../handlers/delivered");

describe("EVENT HANDLERS TESTING", () => {
  let consoleSpy;
  let payload = {
    store: faker.company.companyName(),
    orderId: faker.random.uuid(),
    customer: faker.name.findName(),
    address: faker.address.streetAddress(),
  };
  beforeEach(() => {
    consoleSpy = jest.spyOn(console, "log").mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  test("pick up event handler", async () => {
    await pickup(payload);
    expect(consoleSpy).toHaveBeenCalled();
  });

  test("in transit event handler", async () => {
    await inTransit(payload);
    expect(consoleSpy).toHaveBeenCalled();
  });

  test("delivered event handler", async () => {
    await delivered(payload);
    expect(consoleSpy).toHaveBeenCalled();
  });
});
