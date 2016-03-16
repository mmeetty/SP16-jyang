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
var yearList = [];
var yearListIndex = 0;
var count = [];
count[0] = 0;
fs.readdir(logPath, function(err, result) {
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
    //console.log(length)
    yearBase = list[0].slice(0, 4);
    yearList[yearListIndex] = yearBase;
    //console.log(yearList[0]);

    //make the processed folder
    fs.exists(path, function(exists) {
        if (!exists) {
            fs.mkdir(path, function(err1) {
                if (err1) {
                    return;
                }
                // then make dir for each year
                for (i = 0; i < length; i++) {
                    var fileName = list[i];
                    var year = fileName.slice(0, 4);
                    if (year != yearList[yearListIndex]) {
                        yearListIndex += 1;
                        yearList[yearListIndex] = year;
                        count[yearListIndex] = 0;
                    }
                    for(var j = 0; j < yearList.length; j++) {
                        if (year == yearList[j])
                        {
                            count[j] += 1;
                        }
                    }   
                }

                for (i = 0; i < yearList.length; i++) {
                    var yearFolder = path + '\\' + yearList[i];
                    //console.log("Currently the folder path is " + yearFolder);

                    fs.mkdir(yearFolder, function(err2) {
                        if (err2) {
                            //console.log(err2);
                            return;
                        }

                        for (i = 0; i < length; i++) {
                            var fileName = list[i];
                            var year = fileName.slice(0, 4);
                            var oldPath = arg + '\\raw\\' + list[i];
                            var newPath = path + '\\' + year + '\\' + list[i];
                            fs.rename(oldPath, newPath, function(err4) {
                                if (err4) {
                                    //console.error(err4);
                                    return;
                                }
                                count[year % yearBase] += 1;
                            });
                        }

                    });
                }
                // For each year's log, print a line
                for (i = 0; i < yearList.length; i++) {
                    var yearIndex = yearList[i];
                    console.log(colors.cyan('moved [' + count[i] + '] logs into processed\\' + yearIndex));
                }
                console.log(colors.green('...finished!'));
            });
        }
    });
});