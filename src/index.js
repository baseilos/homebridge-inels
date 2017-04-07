const LightBulb = require("./light-bulb");
const Plug = require("./plug");
const Conf = require("./config");

let Service;
let Characteristic;
const configMap = Conf.getInstance();

var WebSocketClient = require('websocket').client;

var client = new WebSocketClient();

client.on('connectFailed', function(error) {
    console.log('Error while trying to connect: ' + error.toString());
});

client.on('connect', function(connection) {
    console.log('WebSocket Client Connected');
    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });
    connection.on('close', function() {
        console.log('Connection closed');
    });
    connection.on('message', function(message) {
            console.log("Received: '" + message.utf8Data + "'");
            var device = configMap.retrieveDevice(message.utf8Data.substring(message.utf8Data.lastIndexOf('/') + 1));
            device.services.getCharacteristic(Characteristic.Brightness)
            .setValue(33);
    });

});

client.connect('ws://20.15.10.1/api/ws');

module.exports = (homebridge) => {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;
    homebridge.registerAccessory('homebridge-inels', 'RF-RGB-LED-550', LIGHT_BULB);
    homebridge.registerAccessory('homebridge-inels', 'RFSC-61', PLUG);
};

function PLUG(log, config) {

    console.log(config.name);

    this.services = [];
    const plug = new Plug(config.id, config.name, this.services);
    plug.loadState();

    configMap.storeDevice(plug.id, plug);

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

    const lightBulb = new LightBulb(config.id, config.name, this.services);
    lightBulb.loadState();

    configMap.storeDevice(lightBulb.id, lightBulb);

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