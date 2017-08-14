"use strict";

const setFetchMethod = require("./request.js").setFetchMethod;
const createClient = require("./factory.js").createClient;

createClient.setFetchMethod = setFetchMethod;

module.exports = createClient;
