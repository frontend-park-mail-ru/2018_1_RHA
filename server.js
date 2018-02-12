'use strict';

const fs= require('fs');
const http=require('http');
const debug = require('debug');
const logger = debug('mylogger');


const server = http.createServer((req,res) => {

	logger(req);
	console.log(req.url);
	const filename = req.url === '/' ? 'index.html' : req.url;
 
	fs.readFile(__dirname+'/public/' + filename, (err,data) => {
	
		if (err) {
			res.writeHead(404);
			res.end();
			console.log('err ', err);
			return;
		}

		console.log(data)
		res.writeHead(200,'OK')
		res.write(data);
		res.end();
	});
});

server.listen(process.env.PORT || 3000);