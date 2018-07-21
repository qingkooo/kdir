/* cli入口 */
const yargs = require('yargs');
const Server = require('./app');

const argv = yargs
	.usage('kdir [options]')
	.option('p', {
		alias: 'port',
		describe: '端口号',
		default: 8000
	})
	.option('h', {
		alias: 'hostname',
		describe: '地址',
		default: '127.0.0.1'
	})
	.option('r', {
		alias: 'root',
		describe: '根目录',
		default: process.cwd()
	})
	.version()
	.alias('v','version')
	.help()
	.argv;

const server = new Server(argv);
server.start(); 