var HashMap = require('hashmap');

module.exports = class Config {

    constructor() {
        this.devices = new HashMap();
    }

    storeDevice(deviceId, url){
        this.devices.set(deviceId, url);
        return ;
    }

    retrieveDevice(deviceId){
        return this.devices.get(deviceId);
    }
};