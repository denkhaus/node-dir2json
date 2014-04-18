
var fs = require('fs'),
    path = require('path');

module.exports = function(filename) {
    var stats = fs.lstatSync(filename),
        info = {
            path: filename,
            label: path.basename(filename)
        };

    if (stats.isDirectory()) {
        info.type = "dir";
        info.children = fs.readdirSync(filename).map(function(child) {
            return dirTree(filename + '/' + child);
        });
    } else if( stats.isFile()){
        info.type = "file";
    }

    return info;
};