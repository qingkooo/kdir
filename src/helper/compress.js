const path = require('path');
const {createGzip, createDeflate} = require('zlib');
const cfg = require('../config/defaultConfig');

module.exports = (rs, req, res)=>{
	const acceptEncoding = req.headers['accept-encoding'];
	const applyEncoding = acceptEncoding.match(cfg.compressSupport)[0];
	let zipContent = null;

	if(!acceptEncoding || !acceptEncoding.match(cfg.compressSupport)) return rs;
	if(applyEncoding == 'gzip'){
		zipContent = createGzip();
	}else if(applyEncoding == 'deflate'){
		zipContent = createDeflate();
	}

	res.setHeader('Content-Encoding',applyEncoding);
	return rs.pipe(zipContent);
};