'use strict';

var Service;
var Characteristic;
var Homebridge;
var Accessory;
var Platform;

var Factory = require('./factory.js');
var Utility = require('./utility.js');

module.exports = function (homebridge) {
    console.log("Homebridge " + homebridge.version + " is running");
    Homebridge = homebridge;
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;
    Accessory = homebridge.platformAccessory;

    Utility.addSupportTo(Factory.AbstractAccessory, Accessory);
    Utility.addSupportTo(Factory.LightbulbAccessory, Factory.AbstractAccessory);

    homebridge.registerPlatform("homebridge-iNels", "iNels", InelsPlatform);
};

function InelsPlatform(log, config, api) {
    this.log = log;
    this.host = config.host;

    log.log("InelsPlatform loaded");
}

InelsPlatform.prototype.accessories = function(callback) {
    var lightbulbAccessory = new Factory.LightbulbAccessory(12345, "RF-RGB-LED-550", this, Homebridge);
    callback([lightbulbAccessory]);
    //console.log(Homebridge);
}

InelsPlatform.prototype.addAccessory = function(accessoryName) {
    console.log("Accessory: " + accessoryName);
}


