const {cache} = require('../config/defaultConfig');

function refreshRes(stats, res){
	const {maxAge, expires, cacheControl, lastModified, etag} = cache;

	if(expires){
		res.setHeader('Expires',(new Date(Date.now()+maxAge*1000).toUTCString()));	// maxAge单位秒
	}
	if(cacheControl){
		res.setHeader('Cache-Control',`public, max-age=${maxAge}`);
	}
	if(lastModified){
		res.setHeader('Last-Modified',stats.mtime.toUTCString());
	}
	if(etag){
		res.setHeader('ETag',`${stats.size}-${stats.mtime}`);
	}
}

// 内容是否新鲜（新鲜true即不发送内容,不新鲜false即发送内容）
module.exports = function isFresh(stats, req, res){
	refreshRes(stats, res);

	const lastModified = req.headers['if-modified-since'];
	const etag = req.headers['if-none-match'];

	// 可能是第一次请求
	if(!lastModified && !etag){
		return false;
	}
	// lastModified不一致
	if(lastModified && lastModified != res.getHeader('Last-Modified')){
		return false;
	}
	// eTag不一致
	if(etag && etag != res.getHeader('ETag')){
		return false;
	}

	return true;
};