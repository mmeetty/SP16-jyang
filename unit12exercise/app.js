var http = require('http');
var fs = require('fs');

var PORT = process.env.pirt || 3000;

function handleRequest(request, response) {
    if (request.url.indexOf("quotes") > -1) {
        fs.readFile('./data/quotes.json',  function(err, data) {
            if (err) {
                console.log(err);
                return;
            }
            response.setHeader('Content-type', 'application/json charset=UTF-8');
            response.end(data);
            return;
        });
    }
    else{
     var re = `
    <html>
    <head></head>
    <body>
        <p>Hello World</p>
    </body>
    </html>
    `;
    response.setHeader('Content-type', 'text/html');
    response.end(re);  
    }
    
}

var server = http.createServer(handleRequest);

server.listen(PORT, function() {
    console.log("Server listening on http://localhost:%s", PORT)
});