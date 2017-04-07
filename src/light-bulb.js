const request = require("request");
var Util = require("./util");

module.exports = class LightBulb {

    constructor(id, name, services) {
        this.id = id;
        this.name = name;
        this.services = services;
    }


    loadState() {
        request.get({
            url: `http://20.15.10.1/api/devices/${this.id}/state`
        }, (err, response, state) => {
            //TODO handle response status code (success, error...)
            this.state = JSON.parse(state);
            this.hslState = Util.rgbToHsl2(this.state.red, this.state.green, this.state.blue);
        });
    }

    sendCommand(command, callback) {
        console.log (`Printing ${JSON.stringify(command)}`);
        request({
                url: `http://20.15.10.1/api/devices/${this.id}`,
                json: command,
                method: "PUT",
                headers: {
                    'Content-Length': JSON.stringify(command).length,
                    'Content-Type': 'application/json'
                }

            },
            (error, response, body) => {
                console.log(`Response ${JSON.stringify(response)}`);
                callback();
            });
    }

    setOn(on, callback) {
        const command = Object.assign({}, this.state);
        command.brightness = on ? this.state.brightness : 0;
        this.sendCommand(command, () => callback());
    }

    getOn(callback, context) {
        console.log(context);
        if(!this.state) {
            callback(null, 0);
            return;
        }
        callback(null, !!this.state.brightness);
    }

    // TODO: Original zlatko code
    setBrightness(brightness, callback) {
        if(!this.state) return;
        const command = Object.assign({}, this.state);
        command.brightness = brightness;
        this.sendCommand(command, () => callback());
    }

    getBrightness(callback, context) {
        if(!this.state) {
            callback(null, 0);
            return;
        }
        callback(null, this.state.brightness);
    }

    setHue(hue, callback) {

        if(!this.state) return;
        this.hslState.h = hue;

        var newState = Util.hslToRgb2(this.hslState.h,this.hslState.s,this.hslState.l);

        this.state.red = newState.r;
        this.state.green =  newState.g;
        this.state.blue =  newState.b;

        const command = Object.assign({}, this.state);

        this.sendCommand(command, () => callback());
    }

    getHue(callback, context) {
        if(!this.state) {
            callback(null, 0);
            return;
        }
        callback(null, this.hslState.h);
    }

    setSaturation(saturation, callback) {
        this.hslState.s = saturation;
        callback();
    }

    getSaturation(callback, context) {
        if(!this.state) {
            callback(null, 0);
            return;
        }

        callback(null, this.hslState.s);
    }

};