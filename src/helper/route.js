const path = require('path');
const fs = require('fs');
const handlebars = require('handlebars');	// 服务器模版
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const tpl = fs.readFileSync(path.join(__dirname,'../template/dir.tpl'),'utf8');	// 自定义模版
const mime = require('./mime.js');	// mime类型值
const compress = require('./compress.js');	// 服务器压缩
const range = require('./range.js');	// 文档内容范围
const cache = require('./cache');	// 缓存

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
			const template = handlebars.compile(tpl);
			const dir = path.relative(cfg.root,filepath);
			const html = template({
				title: path.basename(filepath),
				root: cfg.root,
				files,
				dir: dir ? `/${dir}` : ''
			});
			res.statusCode = 200;
			res.setHeader('Content-Type','text/html');
			res.end(html);
		}
	}catch(err){
		res.statusCode = 404;
		res.setHeader('Content-Type','text/plain');
		res.end(`${filepath} is not File or Directory. \n ${err.toString()}`);
	}
};
