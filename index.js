'use scrict'

const Homebridge, Accessory
const request = require("request");

module.exports = function(homebridge) {
    console.log("Homebridge plugin version '" + homebridge.version + "' is running!");
    homebridge.registerPlatform("homebridge-inels", "inels", InelsPlatform, false);
}

function InelsPlatform(config, log) {
    this.log = log;
    log("InelsPlatform init");
}

InelsPlatform.prototype.accessories = function(callback) {
    this.log("Getting Inels configuration");
}


