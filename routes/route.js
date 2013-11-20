
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
   	app.get('/view/manage',function (req,res){
   		if(!req.session.loginid)
   			res.render('partials/register');
   		else
   			res.render('partials/manage');
   	});
   	app.get('/view/welcome',function (req,res){
   		res.render('partials/welcome');
   	});
   	app.get('/view/register',function (req,res){
   		res.render('partials/register');
   	});
   	app.get('/view/try',function (req,res){
   		res.render('partials/try');
   	});
   	app.get('/view/abc',function (req,res){
   		res.render('partials/abc');
   	});
   	
 //get json data
   	app.get('/data/user',function (req,res){
   		if(!req.session.loginid)
   			res.render('partials/welcome');
   		res.json({name : req.session.loginid});
   	});
   	app.get('/data/items',function (req,res){
   		my.getitems(req,res);
   	});
   	
 //where to put this function? looks like post but get
   	app.post('/data/sands',function (req,res){
   		my.getsands(req,res);
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
 	app.post('/login', function(req, res) {
 		console.log(req.param('username'));
 		console.log(req.param('password'));
 		my.checklogin(req,res);
 	});
 	app.post('/register', function(req, res) {
 		my.register(req,res);
 	});
 	app.post('/checkusername', function(req, res) {
 		my.checkusername(req,res);
 	});
 }