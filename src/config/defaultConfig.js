module.exports = {
	port:8000,
	hostname:'127.0.0.1',
	root: process.cwd(),	// 命令的根目录
	compressSupport:/\b(gzip|deflate)\b/ig,		// 服务器支持的压缩方式,加单词边界是因为过滤掉gzip5这种
	compressType:/\b(html|js|css|md|txt|json)\b/i,	// 这些文本类需要进行压缩
	// 缓存策略
	cache:{
		maxAge:24*60*60,
		expires:true,
		cacheControl:true,
		lastModified:true,
		etag:true
	}
};