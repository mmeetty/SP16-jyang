var fs = require('fs');
var path = require('path');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database("C:/Temp/chinook.db");

if (process.argv[2] == '-output') {
    var arg = process.argv[3];
    outPath = arg;

    fs.stat(outPath, function(err, stats) {
        if (err) {
            console.log("Folder " + outPath + " does not exist.");
            fs.mkdir(outPath, function(err1) {
                if (err1) {
                    return;
                }
                console.log("Folder " + outPath + " created.");
            });
        }
        // create the jason files

        var customersql = `
   SELECT *
   FROM   customers
   WHERE  Country = ?
   `;

        db.all(customersql, "USA", function(err2, rows) {
            if (err2) {
                console.error(err2);
                return;
            }
            // write to file
            var customerPath = path.join(outPath, 'customers_usa.json');
            var jsonObj = JSON.stringify(rows);
            fs.writeFile(customerPath, jsonObj, function(err3) {
                if (err3) {
                    return;
                }
                console.log("File " + customerPath + " updated.");
            });
        });
    });

    var invoicesql = `
   SELECT *
   FROM   invoices
   WHERE  InvoiceDate between ? and ?
      `;

    db.all(invoicesql, '2012-12-31', '2014-01-01', function(err4, rows) {
        if (err4) {
            console.error(err3);
            return;
        }
        // write to file
        var invoicePath = path.join(outPath, 'invoices_2013.json');
            var jsonObj = JSON.stringify(rows);
            fs.writeFile(invoicePath, jsonObj, function(err5) {
                if (err5) {
                    return;
                }
                console.log("File " + invoicePath + " updated.");
            });
    });
}