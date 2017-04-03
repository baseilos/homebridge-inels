const LightBulb = require("./light-bulb");
const Plug = require("./plug");

let Service;
let Characteristic;

module.exports = (homebridge) => {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;
    homebridge.registerAccessory('homebridge-inels', 'RF-RGB-LED-550', LIGHT_BULB);
    homebridge.registerAccessory('homebridge-inels', 'RFSC-61', PLUG);
};

function PLUG(log, config) {

    console.log(config.name);

    this.services = [];
    const plug = new Plug(config.id);
    plug.loadState();

    this.plugService = new Service.Switch(config.name);
    this.plugService
        .getCharacteristic(Characteristic.On)
        .on('set', plug.setOn.bind(plug))
        .on('get', plug.getOn.bind(plug));

    this.services.push(this.plugService);

    this.getServices = () => {
        return this.services;
    }
}

function LIGHT_BULB(log, config) {

    console.log(config.name);

    this.services = [];

    const lightBulb = new LightBulb(config.id);
    lightBulb.loadState();

    this.lightBulbService = new Service.Lightbulb(config.name);
    this.lightBulbService
        .getCharacteristic(Characteristic.On)
        .on('set', lightBulb.setOn.bind(lightBulb))
        .on('get', lightBulb.getOn.bind(lightBulb));

    this.lightBulbService
        .getCharacteristic(Characteristic.Brightness)
        .on('get', lightBulb.getBrightness.bind(lightBulb))
        .on('set', lightBulb.setBrightness.bind(lightBulb));

    this.lightBulbService
        .getCharacteristic(Characteristic.Hue)
        .on('get', lightBulb.getHue.bind(lightBulb))
        .on('set', lightBulb.setHue.bind(lightBulb));

    this.lightBulbService
        .getCharacteristic(Characteristic.Saturation)
        .on('get', lightBulb.getSaturation.bind(lightBulb))
        .on('set', lightBulb.setSaturation.bind(lightBulb));

    this.services.push(this.lightBulbService);

    this.getServices = () => {
        return this.services;
    }

};