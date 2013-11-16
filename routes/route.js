
/*
 * GET home page.
 */
 var fs = require('fs');
 var address='/Users/apple/Documents/github/lazy/upload/';
 var my=require('../database/mysql_api.js');
 
 exports.gets = function(app) {
 // get views
 	app.get('/', function (req, res) {
    	res.render('index', { title: 'Express' });
  	});
  	app.get('/success',function (req,res) {
   		res.render('success');
   	});
   	app.get('/manage',function (req,res){
   		//console.log(req.session);
   		if(!req.session.loginid)
   			res.render('partials/register');
   		else
   			res.render('partials/welcome');
   	});
   	app.get('/welcome',function (req,res){
   		res.render('partials/welcome');
   	});
   	app.get('/register',function (req,res){
   		res.render('partials/register');
   	});
   	app.get('/try',function (req,res){
   		res.render('partials/try');
   	});
   	app.get('/abc',function (req,res){
   		res.render('partials/abc');
   	});
   	
 //get json data
   	app.get('/data/user',function (req,res){
   		res.json({name : 'xidui',pw : 123});
   	});
   	app.get('/data/items',function (req,res){
   		my.select('SELECT * FROM items',null,res);
   	});
//   	app.get('/login', function(req, res) {
//   		my.checklogin(req,res);
//   	});
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
 	app.post('/login', function(req, res) {
 		console.log(req.param('username'));
 		console.log(req.param('password'));
 		my.checklogin(req,res);
 	});
 }