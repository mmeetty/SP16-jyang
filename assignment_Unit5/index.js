
var fs = require("fs");
var path = require("path");


// logs
    var log4js = require('log4js');

    log4js.configure({
        appenders:[
            {type: 'file', filename: './log.txt', category: 'file-logger'}
        ]
    });

    var logger = log4js.getLogger('file-logger');
    var verbose = false;

    if(process.argv.indexOf("-v") > -1){
        // the -v flag has been include
        verbose = true;
    }

    // verbose is a variable to hold whether the '-v' flag was passed
    if(verbose){
        logger.setLevel("TRACE");
    }else{
        logger.setLevel("INFO");
    }



// -input flag
if (process.argv.indexOf("-input") > -1){
    var argIndex = process.argv.indexOf("-input");
    argIndex = argIndex + 1;
    
    // this grabs the next parameter in our aruments array
    var inputPath = process.argv[argIndex];
}

// - output flag
if(process.argv.indexOf("-output") > -1){
    var argIndex = process.argv.indexOf("-output");
    argIndex = argIndex + 1;
    
    // this grabs the next parameter in our aruments array
    var outputFile = process.argv[argIndex];
}

// Write the header of the file
fs.writeFileSync(outputFile, "*** Overall Statistics ***\n", "utf8");
fs.appendFileSync(outputFile, "CONTRACT | HIGH | LOW | AVERAGE SETTLE | TOTAL TRADING DAYS\n", "utf8");

// run through each file to find the target infos
var fileList = fs.readdirSync(inputPath);
var size = fileList.length;

for (var i = 0; i < size; i++){
    // create filename and read the contents of it for each file in the dir 
    var fileName = fileList[i];
    var filePath = path.join(inputPath, fileName);
    
    var contents = fs.readFileSync(filePath, "utf8");
    var data = JSON.parse(contents);
    
    // append the information to the output file
    // contract name
    fs.appendFileSync(outputFile, data.dataset.dataset_code + " | ", "utf-8");
    // highest high
    var length = data.dataset.data.length;
    var high = data.dataset.data[0][2];
    for (var j = 1; j < length; j++){
        if (high < data.dataset.data[j][2])
        high = data.dataset.data[j][2];
    }
    fs.appendFileSync(outputFile, high.toFixed(2) + " | ", "utf-8");
    
    // lowest low
    var low = data.dataset.data[0][3];
    for (var k = 1; k < length; k++){
        if (low > data.dataset.data[k][3])
            if (data.dataset.data[k][3] != 0)
                low = data.dataset.data[k][3];
    }
    fs.appendFileSync(outputFile, low.toFixed(2) + " | ", "utf-8");
    
    // average
    var sum = 0;
    for (var l = 0; l < length; l++){
        sum += data.dataset.data[l][6];
    }
    var average = sum / length;
    fs.appendFileSync(outputFile, average.toFixed(2) + " | ", "utf-8");
    
    // total trading days
    fs.appendFileSync(outputFile, length + "\n", "utf-8");
       
       
       
    //logs
    //info level
    logger.info("computing stats for: " + fileName);
    // trace level
    for (var index = 0; index < length; index++) {
        logger.trace("processing [" + fileName + "] for date: " + data.dataset.data[index][0]);
    }
    //logger.debug("debuging file: " + fileName);
    //logger.warn("Warning! File " + fileName);
    //logger.error("ERROR found in " + fileName);
}