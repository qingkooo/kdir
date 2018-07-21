/* 若当作依赖使用，这是入口 */

const path = require('path');
const route = require('./helper/route.js');
const cfg = require('./config/defaultConfig.js');
const chalk = require('chalk');
const http = require('http');
const fs = require('fs');
const autoOpen = require('./helper/openUrl');

class Server{
	constructor(config){
		this.conf = Object.assign({},cfg,config);
	}
	start(){
		const server = http.createServer((req,res) => {
			route(req,res, this.conf);
		});

		server.listen(this.conf.port, this.conf.hostname, () => {
			const addr = `http://${this.conf.hostname}:${this.conf.port}`;
			autoOpen(addr);
			console.log(`${chalk.green('server start at')} ${addr}`);
		});
	}
}

module.exports = Server;