"use strict";

var request = require("request");

var LightbulbAccessory = function(id, name,platform,homebridge) {
    LightbulbAccessory.super_.call(this, id, name, platform, homebridge);
};

LightbulbAccessory.prototype.getOtherServices = function() {
    var otherService = new this.homebridge.hap.Service.Lightbulb();
    otherService.getCharacteristic(this.homebridge.hap.Characteristic.On)
        .on('set', this.setItemState.bind(this))
        .on('get', this.getItemState.bind(this))
        .setValue(false);
	
    otherService.getCharacteristic(this.homebridge.hap.Characteristic.Brightness)
    	.on('get', this.getBrightness.bind(this))
    	.on('set', this.setBrightness.bind(this))
    	.setValue(20);
	
    otherService.getCharacteristic(this.homebridge.hap.Characteristic.Hue)
    	.on('get', this.getHue.bind(this))
    	.on('set', this.setHue.bind(this))
    	.setValue(0.3);

   return otherService;
};

LightbulbAccessory.prototype.setItemState = function(newValue, callback, context) {
	console.log('Setting item state for id: ' + this.id + ' to ' + newValue);
	callback();
}

LightbulbAccessory.prototype.getItemState = function(callback, context) {
	console.log('Getting item state for id: ' + this.id);
	callback(null, true);
}

LightbulbAccessory.prototype.setBrightness = function(newValue, callback, context) {
	console.log('Setting item brightness for id: ' + this.id + ' to ' + newValue);
	callback();
}

LightbulbAccessory.prototype.getBrightness = function(callback, context) {
	console.log('Getting item brightness for id: ' + this.id);
	callback(null, 30);
}

LightbulbAccessory.prototype.getHue = function(callback, context) {
	console.log('Getting item hue for id: ' + this.id);
	callback(null, 0.3);
} 

LightbulbAccessory.prototype.setHue = function(newValue, callback, context) {
	console.log('Setting item hue for id: ' + this.id + ' to ' + newValue);
	callback();
}

module.exports = LightbulbAccessory;

