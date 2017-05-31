var program = require('commander'),
	package = require("../package.json"),
	fs = require("fs"),
	path = require("path");

	program
	.version(package.version)
	.option("--compose", "compose files");

	program
	.command('compose <spath> <npath>')
	.description('spath:original files path;  npath: new files path')
	.action(function(spath,npath){ 
		require("../index.js")(spath,npath);
	});
	program.parse(process.argv);