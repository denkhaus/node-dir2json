
var fs = require('fs'),
    _ = require("underscore"),
    path = require('path');

module.exports = function dirTree(filename, includeDotFiles) {
    var stats = fs.lstatSync(filename),
        bName = path.basename(filename),
        info = {
            path: filename,
            label: bName
        };

    if (!includeDotFiles &&
        bName.substring(0, 1) == "."){
        return null;
    }

    if (stats.isDirectory()) {
        var childs = fs.readdirSync(filename).map(function(child){
           return dirTree(filename + '/' + child, includeDotFiles);
        });

        childs = _.reject(childs, function(elm){ return elm === null; });
        info.type = "dir";

        if(childs.length > 0){
            info.children = childs;
        }

    } else if( stats.isFile()){
        info.type = "file";
    }

    return info;
};