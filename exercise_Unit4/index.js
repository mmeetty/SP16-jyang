var fs = require("fs");
var path = require("path");

// look for the -folder flag and set its next argv to he input file path
if(process.argv.indexOf("-folder") > -1){
    var argIndexFolder = process.argv.indexOf("-folder");
    argIndexFolder = argIndexFolder + 1;
    
    var inputFilePath = process.argv[argIndexFolder];
}

// look for the -output flag and set its next argv to he output file path
if(process.argv.indexOf("-output") > -1){
    var argIndexOutput = process.argv.indexOf("-output");
    argIndexOutput = argIndexOutput + 1;

    var outputFilePath = process.argv[argIndexOutput];
}

// create a list of the file names in the input folder
var listOfFiles = fs.readdirSync(inputFilePath);

// for each file in the folder, append its contents to the output file
var length = listOfFiles.length;
for(var i = 0; i < length; i++){
    fs.appendFileSync(outputFilePath, fs.readFileSync(path.join(inputFilePath, listOfFiles[i])));
}

