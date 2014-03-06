
/*
 * GET home page.
 */
 var fs = require('fs');
 var address='/Users/apple/Documents/github/lazy/upload/';
 var my=require('../database/mysql_api.js');
 var response = {
     state	    :false,
     id		    :'',
     loginid	:'',
     result	    :''
 };
 
 exports.gets = function(app) {
 // get views
 	app.get('/', function (req, res) {
    	res.render('index', { title: 'Express' });
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
   	app.get('/view/task',function (req,res) {
   		if(!req.session.loginid)
   			res.render('partials/register');
   		else
   			res.render('partials/task');
   	});
   	app.get('/view/care',function (req,res) {
   		if(!req.session.loginid)
   			res.render('partials/register');
   		else
   			res.render('partials/care');
   	});
    app.get('/view/newthings',function (req,res) {
        if(!req.session.loginid)
            res.render('partials/register');
        else
            res.render('partials/newthings');
    });
   	app.get('/view/try',function (req,res){
   		res.render('partials/try');
   	});
   	app.get('/view/abc',function (req,res){
   		res.render('partials/abc');
   	});
   	app.get('/view/care/people',function (req,res){
   		res.render('partials/care/people');
   	});
    app.get('/view/care/peopleitempage',function (req,res){
        res.render('partials/care/peopleitempage');
    });
   	
 //get json data
   	app.get('/data/user',function (req,res){
   		if(!req.session.loginid)
   			res.render('partials/welcome');
   		res.json({name : req.session.loginid});
   	});
   	app.get('/getloginstate',function (req,res){
   		var response={
   			state	:	false,
   			loginid	:	''	
   		};
   		if(req.session.loginid){
   			response.state=true;
   			response.loginid=req.session.loginid;
   		}
   		console.log(response);
   		res.json(response);	
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
 		my.login(req,res);
 	});
 	app.post('/logout', function(req, res) {
 		req.session=null;
 		var response={state:true,id:'',loginid:''};
 		res.json(response);
 	});
 	app.post('/register', function(req, res) {
 		my.register(req,res);
 	});
 	app.post('/checkusername', function(req, res) {
 		my.checkusername(req,res);
 	});
 	app.post('/data/items',function (req,res){
 		my.getitems(req,res);
 	});
 	app.post('/data/sands',function (req,res){
 		my.getsands(req,res);
 	});
 	app.post('/data/tasks',function (req,res) {
 		my.getTasks(req,res);
 	});
 	app.post('/data/tasksands',function (req,res) {
 		my.getTasksands(req,res);
 	});
 	app.post('/data/people',function (req,res) {
 		my.searchPeople(req,res);
 	});
    app.post('/data/myfriends',function (req,res){
        var sql="select u.id,c.careid,sum(s.time) as time from timemanage.care as c "+
        "left join timemanage.users as u on u.loginid=c.careid "+
        "left join timemanage.sands as s on s.iduser=u.id "+
        "where c.loginid=? group by u.id";
        var data=[req.session.loginid];
        my.execute(req,res,sql,data,response);
    });
    app.post('/data/peopleitems',function(req,res){
        var sql="select i.name as itemname,sum(s.time) as itemtime from timemanage.items as i " +
            "left join timemanage.sands as s on i.iditems=s.item "+
            "where user=(select id from timemanage.users as u where u.loginid=?) and i.show=1 group by i.name";
        var data=[req.param('peopleloginid')];
        var r=response;
        r.peopleloginid=req.param('peopleloginid');
        my.execute(req,res,sql,data,r);
    });
    app.post('/data/peopleitemsands',function(req,res){
        var sql="SELECT s.comments as comment,s.time as time,s.datetime "+
                "FROM timemanage.sands as s where s.iduser=( "+
                "select id from timemanage.users where loginid=?) "+
                "and s.item in (select iditems from timemanage.items where name=?);";
        var data=[req.param('peopleloginid'),req.param('peopleitemname')];
        var r=response;
        my.execute(req,res,sql,data,r);
    });
    app.post('/data/myfollowers',function(req,res){
        var sql="select c1.loginid,c2.careid is not null as hascared FROM timemanage.care as c1 "+
                "left join timemanage.care as c2 on c1.careid=c2.loginid and c2.careid=c1.loginid "+
                "where c1.careid=?;";
        var data=[req.session.loginid];
        var r=response;
        my.execute(req,res,sql,data,r);
    });
     app.post('/data/newthings',function(req,res){
         var sql="select s.time,s.datetime,s.comments,u.loginid,i.name as item from timemanage.sands as s " +
             "left join timemanage.items as i on i.iditems=s.item " +
             "left join timemanage.users as u on s.iduser=u.id where u.loginid in (" +
             "SELECT distinct u.loginid from timemanage.care as c right join timemanage.users as u on c.careid=u.loginid " +
             "where c.loginid=? or c.careid=?) and i.name is not null order by s.datetime desc limit 0,20;";
         var data=[req.session.loginid,req.session.loginid];
         var r=response;
         my.execute(req,res,sql,data,r);
     });
 	
 	//the operations accociating with db update and insert and delete
 	app.post('/add/additem',function(req,res){
 		my.additem(req,res);
 	});
 	app.post('/add/addsand',function(req,res){
 		my.addsand(req,res);
 	});
 	app.post('/add/addTask',function(req,res){
 		my.addTask(req,res);
 	});
 	app.post('/add/addTasksand',function(req,res){
 		my.addTasksand(req,res);
 	});
 	app.post('/add/addCare',function(req,res){
 		my.addCare(req,res);
 	});
 	app.post('/modi/hideitem',function(req,res){
 		my.hideitem(req,res);
 	});
 	app.post('/modi/taskstate',function (req,res) {
 		my.taskstate(req,res);
 	});
    app.post('/del/delCare',function(req,res){
        var sql="DELETE FROM timemanage.care WHERE loginid=? and careid=?;";
        var data=[req.session.loginid,req.param('careid')];
        var r=response;
        my.execute(req,res,sql,data,r);
    });
 }
