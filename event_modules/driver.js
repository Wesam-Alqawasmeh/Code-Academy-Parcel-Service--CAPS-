"use strict";

const events = require("../hub");
const pickup = require("../handlers/pickup");

events.on("pickup", pickup);
