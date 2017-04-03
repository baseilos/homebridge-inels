const request = require("request");

module.exports = class LightBulb {

    constructor(id) {
        this.id = id;
    }

    loadState() {
        request.get({
            url: `http://20.15.10.1/api/devices/${this.id}/state`
        }, (err, response, state) => {
            //TODO handle response status code (success, error...)
            this.state = JSON.parse(state);
            console.log("loadState", this.state.brightness);
        });
    }

    sendCommand(command, callback) {
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
                callback();
            });
    }

    setOn(on, callback) {


        const command = Object.assign({}, this.state);
        command.brightness = on ? this.state.brightness : 0;

        console.log("setOn", this.state.brightness);

        this.sendCommand(command, () => callback());
    }

    getOn(callback, context) {
        console.log(context);
        if(!this.state) {
            callback(null, 0);
            return;
        }
        console.log (`Current brightness from GET ${this.id} ${this.state.brightness}`);//backtick evaluates string
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
        console.log (`Current brightness from GET ${this.id} ${this.state.brightness}`);//backtick evaluates string
        callback(null, this.state.brightness);
        //return this.state ? this.state.brightness : 0;
    }

    //getStatus (callback) {
    //    callback(null, true);
    //}

    //setPowerState (value, callback, context) {
    //    callback();
    //}
    //
    //getBrightness (callback) {
    //    callback(null, 50);
    //}

    //setBrightness (value, callback, context) {
    //    callback();
    //}
    //
    //getHue (callback) {
    //    callback(null, 0.5);
    //}
    //
    //setHue (value, callback, context) {
    //    callback();
    //}

};