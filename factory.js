"use strict";
var exports = module.exports = {};
exports.AbstractAccessory = require('./abstractaccessory.js');
exports.LightbulbAccessory = require('./lightbulbaccessory.js');

exports.Factory = function(InelsPlatform,homebridge) {
    this.platform = InelsPlatform;
    this.log = this.platform.log;
    this.homebridge = homebridge;
    this.itemList = [];
    this.catList = [];
};

//TODO: we could also get this information from the websocket, avoiding the need of an extra request.

exports.Factory.prototype.sitemapUrl = function () {
    var serverString = this.platform.host;
    var serverPort = this.platform.port;
    if (this.platform.username && this.platform.password) {
        serverString = encodeURIComponent(this.platform.username) + ":" + encodeURIComponent(this.platform.password) + "@" + serverString + ":" + serverPort;
    }

    return this.platform.protocol + "://" + serverString + "/data/LoxApp3.json";
};