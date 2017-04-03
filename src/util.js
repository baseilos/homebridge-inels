const parseColor = require('parse-color');

module.exports = class Util {

     static hslToRgb2(h, s, l){
         var result = parseColor(`hsl(${h},${s},${l})`)["rgb"];
         return {
             "r":result[0],
             "g":result[1],
             "b":result[2]
         }
     }

    static rgbToHsl2(r, g, b){
        var result = parseColor(`rgb(${r},${g},${b})`)["hsl"];
        return {
            "h":result[0],
            "s":result[1],
            "l":result[2]
        }
    }
}