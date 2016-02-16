
var fs = require("fs");
var colors = require("colors");

function readDir(){
    var files = fs.readdirSync(__dirname);
    var text = "Some text";
    console.log(colors.cyan(files));
    console.log(colors.green(text));
}

exports.readDir = readDir;

/*
or
exports.readDir = function(){
    var files = fs.readdirSync(__dirname);
    console.log(files);
}

*/