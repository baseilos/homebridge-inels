'use strict';

var Service;
var Characteristic;
var Homebridge;
var Accessory;
var Platform;

var Factory = require('./factory.js');
var Utility = require('./utility.js');

var request = require('request');

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
    console.log("InelsPlatform loaded");
}

InelsPlatform.prototype.accessories = function(callback) {
    console.log('Fantomas');
    var json = JSON.parse('{"itemList": [{"type": "lightbulb"}]}');
    callback(new Factory.Factory(this, Homebridge).parseSitemap(json));
}


