const LightBulb = require("./light-bulb");

const bulb1 = new LightBulb("53139");
setInterval(() => {
    bulb1.setOn(!bulb1.getOn());
}, 1000);