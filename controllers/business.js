import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import util from 'util';

module.exports = {
	upload(req, res, next) {
		const form = new formidable.IncomingForm();
		const targetFile = path.join(__dirname, './../upload');
		form.uploadDir = targetFile;
		form.parse(req, function(err, fields, files){
			if(err) {
				res.send({
					code: '6',
					desc: '表单信息错误'
				})
			} else {
				var oldPath = files.file.path
				var newPath = path.join(path.dirname(oldPath), files.file.name)
				fs.rename(oldPath, newPath, function(err) {
					if(err) throw err;
					res.send({
						code: '0',
						desc: '文件上传成功',
						path: newPath
					})
				})
				
			}
		})
	}
}