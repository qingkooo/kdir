const path = require('path');
const fs = require('fs');
const promisify = require('util').promisify;
const handlebars = require('handlebars');	// 服务器模版
const tpl = fs.readFileSync(path.resolve('src/template/dir.tpl'),'utf8');	// 自定义模版
const mime = require('./mime.js');	// mime类型值
const compress = require('./compress.js');	// 服务器压缩
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const range = require('./range.js');
const cache = require('./cache');

module.exports = async function (req, res , cfg) {
	const filepath = path.join(cfg.root,req.url);
	try{
		const stats = await stat(filepath);	// 文件信息
		const contentType = mime(filepath);	// mime内容
		if(stats.isFile()){
			let rs = null;

			res.setHeader('Content-Type',contentType);

			// 判断缓存是否有效
			if(cache(stats, req, res)){
				// 如果是缓存内容还有效
				res.statusCode = 304;
				res.end();
				return;
			}
			// 请求部分内容还是全量内容
			const {code, start, end} = range(stats.size,req,res);
			if(code == 200 ){
				res.statusCode = 200;
				rs = fs.createReadStream(filepath);
			}else{
				res.statusCode = 206;
				rs = fs.createReadStream(filepath,{start,end});
			}
			// 压缩类型
			if(filepath.match(cfg.compressType)){
				rs = compress(rs,req,res);
			}
			// 输出内容
			rs.pipe(res);
		}else{
			const files = await readdir(filepath);
			res.statusCode = 200;
			res.setHeader('Content-Type','text/html');
			const template = handlebars.compile(tpl);
			const dir = path.relative(cfg.root,filepath);
			const html = template({
				title: path.basename(filepath),
				files,
				dir: dir ? `/${dir}` : ''
			});
			res.end(html);
		}
	}catch(err){
		console.log('错误：');
		res.statusCode = 404;
		res.setHeader('Content-Type','text/plain');
		res.end(`${filepath} is not File or Directory. \n ${err.toString()}`);
	}
};