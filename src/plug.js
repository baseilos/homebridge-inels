const request = require("request");

module.exports = class Plug {

    constructor(id) {
        this.id = id;
    }

    loadState() {
        request.get({
            url: url
        }, (err, response, state) => {
            //TODO handle response status code (success, error...)
            this.state = JSON.parse(state);
            console.log("loadState XXXXXX", this.state.on);
        });
    }

    sendCommand(command, callback) {
        console.log(`http://20.15.10.1/api/devices/${this.id}`);
        console.log(command);
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
                console.log("Error is " + JSON.stringify(error));
                console.log("Response is " + JSON.stringify(response));
                console.log("Body is " + JSON.stringify(body));
                callback();
            });
    }

    setOn(on, callback) {
        console.log(`Setting plug state to ${on}`);
        const command = Object.assign({}, this.state);
        command.on = on? true:false;
        console.log ('I set it to ' + command.on);

        this.sendCommand(command, () => callback());
    }

    getOn(callback, context) {
        console.log('Getting plug state');
        if(!this.state) {
            callback(null, false);
            return;
        }
        console.log (`Current PLUG state from GET ${this.id} ${this.state.on}`);//backtick evaluates string
        callback(null, this.state.on);
    }

}