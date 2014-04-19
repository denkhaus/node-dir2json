
var dir2json = require("../")
var util = require('util');

var data = dir2json("/home/test/dev/node", false);
console.log(util.inspect(data, false, null));