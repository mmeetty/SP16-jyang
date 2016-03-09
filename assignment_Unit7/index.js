// read the path from argv 
var fs = require('fs');
var colors = require("colors");
var arg = process.argv[2];
var path = arg.toString() + '\\processed';
var logPath = arg.toString() + '\\raw';

// Sort the files by name(year)
//var list = fs.readdir(logPath).sort();
var list = [];
var length;
var yearBase;
fs.readdir(logPath, function (err, result) {
    var i;
    if (err) {
        console.error(err);
        return;
    }
    console.log(colors.green('sorting files...'));
    
    for (i = 0; i < result.length; i++) {
        list[i] = result[i];
    }
    list = list.sort();
    //console.log("callback finished!: " + list);
    length = list.length;
    yearBase = list[0].slice(0, 4);

    //make the processed folder
    fs.exists(path, function (exists) {
        if (!exists) {
            fs.mkdir(path, function (err1) {
                if (err1) {
                    //console.log(err1);
                    return;
                }
                // then make dir for each year
                for (i = 0; i < length; i++) {
                    var fileName = list[i];
                    var year = fileName.slice(0, 4);

                    var yearFolder = path + '\\' + year;
                    //console.log("Year Folder: ", yearFolder);
                    fs.exists(yearFolder, function (exists) {
                        if (!exists) {
                            fs.mkdir(yearFolder, function (err2) {
                                if (err1) {
                                    //console.log(err2);
                                    return;
                                }
                                var listProcessed = []
                                fs.readdir(path, function (err3, countResult) {
                                    if (err3) {
                                        console.error(err3);
                                        return;
                                    }
                                    for (i = 0; i < result.length; i++) {
                                        listProcessed[i] = countResult[i];
                                    }
                                });
                                var lengthProcessed = listProcessed.length;
                                var count = [];
                                for (i = 0; i < lengthProcessed; i++) {
                                    count[i] = 0;
                                }
                                for (i = 0; i < length; i++) {
                                    var fileName = list[i];
                                    var year = fileName.slice(0, 4);
                                    var oldPath = arg + '\\raw\\' + list[i];
                                    var newPath = path + '\\' + year + '\\' + list[i];
                                    fs.rename(oldPath, newPath, function (err4) {
                                        if (err4) {
                                            console.error(err4);
                                            return;
                                        }
                                        var temp = count[year % yearBase];
                                        temp += 1;
                                        count[year % yearBase] = temp;
                                        // For each year's log, print a line
                                        for (i = 0; i < lengthProcessed; i++) {
                                            var yearIndex = listProcessed[i].slice(-4);
                                            console.log(colors.cyan('moved [' + count[i] + '] logs into processed\\' + yearIndex));
                                        }
                                        console.log(colors.green('...finished!'));
                                    });
                                };
                            });
                        }
                    });
                }
            });
        }
    });
});