var HashMap = require('hashmap');

 class Config {

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

const conf = new Config();

module.exports.getInstance = () => conf;