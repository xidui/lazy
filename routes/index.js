
/*
 * GET home page.
 */
 var fs = require('fs');
 var address='/Users/apple/Documents/github/lazy/upload/';
 var my=require('../database/mysql_api.js');
 
 exports.gets = function(app) {
 	app.get('/', function (req, res) {
    	res.render('index', { title: 'Express' });
  	});
  	app.get('/success',function (req,res) {
//  		console.log(req.param('abc'));
//  		console.log(req.param('efg'));
//  		console.log(req.query.abc);
   		res.render('success');
   	});
   	app.get('/user',function (req,res){
   		console.log('hahaha');
   		//var data={name : 'wangyue',pw : 123};
   		my.select(res);
   		//res.json(data);
   	});
 };
 
 exports.posts =function(app){
 	app.post('/file-upload', function(req, res) {
 	     // 获得文件的临时路径
 	     var tmp_path = req.files.thumbnail.path;
 	     console.log(tmp_path);
 	     // 指定文件上传后的目录 - 示例为"images"目录。 
 	     var target_path = address + req.files.thumbnail.name;
 	     // 移动文件
 	     fs.rename(tmp_path, target_path, function(err) {
 	     	if (err) throw err;
 	      	// 删除临时文件夹文件, 
 	      	fs.unlink(tmp_path, function() {
 	         	if (err) throw err;
 	         	res.send('File uploaded to: ' + target_path + ' - ' + req.files.thumbnail.size + ' bytes');
 	      	});
 	    });
 	  });
 }