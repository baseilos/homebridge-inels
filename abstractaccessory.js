'use strict'

var AbstractAccessory = function(id, name, platform, homebridge) {
    this.platform = platform;
    this.homebridge = homebridge;
    this.manufacturer = "iNels";
    this.model = "RF-RGB-LED-550";
    this.name = name;
    this.id = id;

    AbstractAccessory.super_.call(this, this.name, homebridge.hap.uuid.generate(String(this.name)));
}

AbstractAccessory.prototype.getServices = function() {
    return [this.getInformationServices(), this.getOtherServices()];
}

AbstractAccessory.prototype.getOtherServices = function() {
    return null;
}

AbstractAccessory.prototype.getInformationServices = function() {
    var informationService = new this.homebridge.hap.Service.AccessoryInformation();
    informationService.setCharacteristic(this.homebridge.hap.Characteristic.Manufacturer, this.manufacturer)
                      .setCharacteristic(this.homebridge.hap.Characteristic.Model, this.model)
                      .setCharacteristic(this.homebridge.hap.Characteristic.SerialNumber, this.serialNumber)
                      .setCharacteristic(this.homebridge.hap.Characteristic.Name, this.name);
    return informationService;
}

module.exports = AbstractAccessory;
