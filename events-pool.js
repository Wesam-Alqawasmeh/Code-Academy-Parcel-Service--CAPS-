"use strict";

const events = require("./hub");
require("./event_modules/endor");

const pickup = require("./handlers/pickup");
const inTransit = require("./handlers/inTransit");
const delivered = require("./handlers/delivered");

events.on("pickup", pickup);
events.on("in-transit", inTransit);
events.on("delivered", delivered);
