"use strict";

const events = require("./hub");
require("./event_modules/vendor");
require("./event_modules/driver");

const inTransit = require("./handlers/inTransit");
const delivered = require("./handlers/delivered");

events.on("in-transit", inTransit);
events.on("delivered", delivered);
