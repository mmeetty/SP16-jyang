
var fs = require('fs');
var colors = require("colors");
var arg = process.argv[2];
var path = arg.toString() + '\\processed';
var logPath = arg.toString() + '\\raw';
var list = fs.readdirSync(logPath).sort();
// Sort the files by name(year)
console.log(colors.green('sorting files...'));
var length = list.length;
var yearBase = list[0].slice(0,4);

// read the path from argv and create the processed folder        
console.log(path);
if (!fs.existsSync(path))
{
    fs.mkdirSync(path);
}

// Make folder for each year
for (var i = 0; i < length; i++)
{
    var fileName = list[i];
    var year = fileName.slice(0,4);

    var yearFolder = path + '\\' + year;
    if (!fs.existsSync(yearFolder))
    {
        fs.mkdirSync(yearFolder);
    }
}

// Count how many years' of data is there and create an array
var listProcessed = fs.readdirSync(path);
var lengthProcessed = listProcessed.length;
var count = [];
for (var i = 0; i < lengthProcessed; i++)
{
    count[i] = 0;
}

// For each file in the dir, parse the year of the file and then
// move it into its corresponding folder
for (var i = 0; i < length; i++)
{
    var fileName = list[i];
    var year = fileName.slice(0,4);
    var oldPath = arg + '\\raw\\' + list[i];
    var newPath = path + '\\' + year + '\\' + list[i];
    fs.renameSync(oldPath, newPath);
    var temp = count[year % yearBase];
    temp += 1;
    count[year % yearBase] = temp;
};

// For each year's log, print a line
for (var i = 0; i < lengthProcessed; i++)
{
    var yearIndex = listProcessed[i].slice(-4);
    console.log(colors.cyan('moved [' + count[i] + '] logs into processed\\' + yearIndex));
}
console.log(colors.green('...finished!'));

