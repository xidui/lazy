var mysql = require('mysql');
var async = require('async');
var config={
  host     : '115.29.161.233',
  port     : '3306',
  user     : 'root',
  password : 'xidui',
  database : 'timemanage',
};

function getTime(){
	var d=new Date();
	var systime=d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();
	return systime;
}

exports.login = function (req,res) {
	var sql='select u.id,u.loginid from timemanage.users as u where loginid = ? and password = ?';
	var data=[req.param('username'),req.param('password')];
	var connection = mysql.createConnection(config);
	connection.connect();
	connection.query(sql,data,function (err,result) {
		var user=result[0];
		var response={state:false,id:'',loginid:''};
		if(user!=null){
			req.session={id:user.id,loginid:user.loginid};
			response.state=true;
			response.id=user.id;
			response.loginid=user.loginid;
		}
		res.json(response);
	});
	connection.end();
}

exports.select = function (query,data,res) {
	var connection = mysql.createConnection(config);
	connection.connect();
	connection.query(query,data,function(err,result) {
		res.json(result);
	});	
	connection.end();
};

exports.checkusername = function (req,res) {
	var sql='select u.id from timemanage.users as u where loginid = ?';
	var data=[req.param('username')];
	var connection = mysql.createConnection(config);
	connection.connect();
	connection.query(sql,data,function (err,result) {
		var user=result[0];
		var response={state:true}
		if(user!=null){
			response.state=false;
		}
		if(req.param('username')==null)
			response.state=false;
		res.json(response);
	});
	connection.end();
}

exports.register = function (req,res) {
	var sql='insert into timemanage.users(loginid,password,email,gender,school,phone,qq,grade) values(?,?,?,?,?,?,?,?)';
	var data=[
		req.param('username'),
		req.param('password1'),
		req.param('email'),
		req.param('gender')=='male',
		req.param('school'),
		req.param('phone'),
		req.param('qq'),
		req.param('grade')
	];
	var connection = mysql.createConnection(config);
	connection.connect();
	connection.query(sql,data,function (err,result) {
		var response={state:false};
		console.log(result);
		console.log(err);
		if(result!=null){
			console.log('abc');
			response.state=true;
			req.session={id:result.insertId,loginid:req.param('username')};
			response.id=result.insertId;
			response.loginid=req.param('username');			
		}
		res.json(response);
	});
	connection.end();
}

exports.getitems = function (req,res){
	var sql="select it.iditems,it.name,sum(s.time) as sum,it.user from timemanage.items as it left join timemanage.sands as s on it.iditems=s.item where it.user=? and it.show>? group by it.iditems;";
	var connection = mysql.createConnection(config);
	console.log(req.param('showall'));
	var data=[req.session.id,req.param('showall')*-1];
	connection.connect();
	connection.query(sql,data,function (err,result) {
		var response={state:false,result:result};
		console.log(result);
		console.log(err);
		if(result!=null)
			response.state=true;
		res.json(response);
	});
	connection.end();
}

exports.getsands = function (req,res) {
	var connection1 = mysql.createConnection(config);
	var sql="select count(*) as rowscount from timemanage.sands as s,timemanage.items as it where it.iditems=s.item and it.user=?";
	var data = [req.session.id];
	if(req.param('sand')!=null&&req.param('sand')!=''){
		sql="select count(*) as rowscount from timemanage.sands as s,timemanage.items as it where it.iditems=s.item and it.user=? and it.name=?";
		data = [req.session.id,req.param('sand')];
	}
	connection1.connect();
	connection1.query(sql,data,function (err,result1) {
		var sql="select * from timemanage.sands as s,timemanage.items as it where it.iditems=s.item and it.user=? and it.name=? limit ?,?";
		var connection = mysql.createConnection(config);
		var data=[
			req.session.id,
			req.param('sand'),
			(req.param('page')-1)*req.param('pagesize'),
			req.param('pagesize')
		];
		if(req.param('sand')==null||req.param('sand')==''){
			sql="select * from timemanage.sands as s,timemanage.items as it where it.iditems=s.item and it.user=? limit ?,?";
			data=[
				req.session.id,
				(req.param('page')-1)*req.param('pagesize'),
				req.param('pagesize')
			];
		}
		console.log(data);
		connection.connect();
		connection.query(sql,data,function (err,result) {
			var response={
				state	:	false,
				rows	:	result1[0].rowscount,
				result	:	result
			};
			console.log(result);
			console.log(result1);
			console.log(err);
			if(result!=null)
				response.state=true;
			res.json(response);
		});
		connection.end();
	});
	connection1.end();
}

exports.additem = function (req,res) {
	var sql="insert into timemanage.items(name,user) values(?,?)";
	var connection = mysql.createConnection(config);
	var data=[req.param('newitemname'),req.session.id];
	console.log(data);
	connection.connect();
	connection.query(sql,data,function (err,result) {
		var response={state:false,result:result,id:req.session.id,loginid:req.session.loginid};
		console.log(result);
		console.log(err);
		if(result!=null)
			response.state=true;
		console.log(response);
		res.json(response);
	});
	connection.end();
}

exports.addsand = function (req,res) {
	//find the itemid with itemname first
	var connection = mysql.createConnection(config);
	connection.connect();
	var sql="select it.iditems from timemanage.items as it where it.name=? and it.user=?";
	var data=[
		req.param('itemname'),
		req.session.id
	];
	console.log(data);
	connection.query(sql,data,function (err,result) {
		console.log(result);
		var iditems=result[0].iditems;
		console.log(iditems);
		var sql="insert into timemanage.sands(time,datetime,item,comments,iduser) values(?,?,?,?,?)";
		var d=new Date();
		var systime=d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();
		var data=[
			req.param('timespend'),
			systime,
			result[0].iditems,
			req.param('comment'),
			req.session.id
		];
		var connection2 = mysql.createConnection(config);
		connection2.connect();
		connection2.query(sql,data,function(err,result) {
			var response={
				state:false,
				id:req.session.id,
				loginid:req.session.loginid,
				systime:systime,
				iditem:iditems,
				result:result
			};
			console.log(result);
			console.log(err);
			if(result!=null)
				response.state=true;
			console.log(response);
			res.json(response);
		});
		connection2.end();
	});
	connection.end();
}

exports.hideitem = function (req,res) {
	var connection = mysql.createConnection(config);
	connection.connect();
	connection.query('UPDATE timemanage.items as it SET it.show=? WHERE it.user=? and it.name=?',[req.param('del'),req.session.id,req.param('item')],function (err,result){
		var response = {
			state 	:	false,
			id		:	req.session.id,
			loginid	:	req.session.loginid,
			result	:	result
		};
		console.log(result);
		console.log(err);
		if(result!=null)
			response.state=true;
		res.json(response);
	});
	connection.end();
}

exports.getTasks = function (req,res) {
	var connection = mysql.createConnection(config);
	connection.connect();
	var sql='select t.idtasks as id,t.description,t.state,t.deadline from timemanage.tasks as t where t.user=?';
	data=[req.session.id];
	connection.query(sql,data,function (err,result) {
		var response = {
			state	:	false,
			id		:	req.session.id,
			loginid	:	req.session.loginid,
			result	:	result
		};
		console.log(result);
		if(result!=null)
			response.state=true;
		res.json(response);
	});
	connection.end();
}

exports.addTask = function (req,res) {
	var sql="insert into timemanage.tasks(user,description,state,deadline,createtime) values(?,?,?,?,?)";
	var connection = mysql.createConnection(config);
	var data=[
		req.session.id,
		req.param('description'),
		0,
		req.param('year')+'-'+req.param('month')+'-'+req.param('date'),
		getTime()
	];
	if(req.param('year')==null||req.param('month')==null||req.param('date')==null)
		data[3]=null;
	console.log(data);
	connection.connect();
	connection.query(sql,data,function (err,result) {
		var response={
			state:false,
			id:req.session.id,
			loginid:req.session.loginid,
			result:result
		};
		console.log(result);
		console.log(err);
		if(result!=null)
			response.state=true;
		console.log(response);
		res.json(response);
	});
	connection.end();
}

exports.getTasksands = function (req,res) {
	var sql="select * from timemanage.sands as s,timemanage.tasks as ta where ta.idtasks=s.task and ta.user=? and ta.idtasks=?";
	var connection = mysql.createConnection(config);
	var data=[req.session.id,req.param('idtask')];
	console.log(data);
	connection.connect();
	connection.query(sql,data,function (err,result) {
		var response={
			state:false,
			id:req.session.id,
			loginid:req.session.loginid,
			result:result
		};
		console.log(result);
		console.log(err);
		if(result!=null)
			response.state=true;
		res.json(response);
	});
	connection.end();
}

exports.taskstate = function (req,res) {
	var connection = mysql.createConnection(config);
	connection.connect();
	connection.query('UPDATE timemanage.tasks as ta SET ta.state=? WHERE ta.idtasks=?',[req.param('taskstate'),req.param('idtask')],function (err,result){
		var response = {
			state 	:	false,
			id		:	req.session.id,
			loginid	:	req.session.loginid,
			result	:	result
		};
		console.log(result);
		console.log(err);
		if(result!=null)
			response.state=true;
		res.json(response);
	});
	connection.end();
}

exports.addTasksand = function (req,res) {
	var sql="insert into timemanage.sands(time,datetime,item,comments,iduser,task) values(?,?,?,?,?,?)";
	var connection = mysql.createConnection(config);
	var data=[
		req.param('time'),
		getTime(),
		req.param('item'),
		req.param('comments'),
		req.session.id,
		req.param('task')
	];
	console.log(data);
	connection.connect();
	connection.query(sql,data,function (err,result) {
		var response={
			state:false,
			id:req.session.id,
			loginid:req.session.loginid,
			insertId:result.insertId,
			data	:data
		};
		console.log(result);
		console.log(err);
		if(result!=null)
			response.state=true;
		res.json(response);
	});
	connection.end();
}