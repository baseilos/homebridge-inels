'use strict';

var Service;
var Characteristic;
var request = require('request');

//Now import the light bulb class here.

module.exports = function (homebridge) {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;
    homebridge.registerAccessory('homebridge-inels', 'iNels', Inels);
};

function Inels(log, config) {
    this.log = log;
    this.name            = config.name             || 'Inels Smart';
    this.type            = config.type;

}

Inels.prototype = {

    getStatus: function (callback) {
        callback(null, true);
    },

    setPowerState: function (value, callback, context) {
        callback();
    },

    getBrightness: function (callback) {
        callback(null, 50);
    },

    setBrightness: function (value, callback, context) {
        callback();
    },

    getHue: function (callback) {
        callback(null, 0.5);
    },

    setHue: function (value, callback, context) {
        callback();
    },



    identify: function (callback) {
        this.log('Identify me Senpai!');
        callback();
    },

    getServices: function () {
        this.services = [];

        let informationService = new Service.AccessoryInformation();
        informationService
            .setCharacteristic(Characteristic.Manufacturer, this.manufacturer)
            .setCharacteristic(Characteristic.Model, this.model);
        this.services.push(informationService);

        let switchService = new Service.Lightbulb(this.name);

        switchService
            .getCharacteristic(Characteristic.On)
            .on('set', this.setPowerState.bind(this))
            .on('get', this.getStatus.bind(this));
;
        switchService
            .getCharacteristic(Characteristic.Brightness)
            .on('get', this.getBrightness.bind(this))
            .on('set', this.setBrightness.bind(this));

        switchService
            .getCharacteristic(Characteristic.Hue)
            .on('get', this.getHue.bind(this))
            .on('set', this.setHue.bind(this));

        switchService
            .getCharacteristic(Characteristic.Saturation)
            .on('get', this.getHue.bind(this))
            .on('set', this.setHue.bind(this));

        this.services.push(switchService);

        return this.services;
    }
};