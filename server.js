'use strict';

const fs = require('fs');
const http = require('http');
const debug = require('debug');


const server = http.createServer((req,res) => {


	const filename = req.url === '/' ? 'index.html' : req.url;
 
	fs.readFile(__dirname + '/public/' + filename, (err,data) => {
	
		if (err) {
			res.writeHead(404);
			res.end();
			console.log('err ', err);
			return;
		}

		res.writeHead(200,'OK');
		res.write(data);
		res.end();
	});
});

const port = process.env.PORT || 3000;
server.listen(port);
