var mysql = require('mysql');
var async = require('async');
var config={
  host     : '115.29.161.233',
  port     : '3306',
  user     : 'root',
  password : 'xidui',
  database : 'timemanage',
};

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
		if(result!=null)
			response.state=true;
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
	var sql="select * from timemanage.sands as s,timemanage.items as it where it.iditems=s.item and it.user=? and it.name=?";
	var connection = mysql.createConnection(config);
	var data=[req.session.id,req.param('sand')];
	console.log(data);
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
	connection.query("select it.iditems from timemanage.items as it where it.name=?",[req.param('itemname')],function (err,result) {
		var iditems=result[0].iditems;
		console.log(iditems);
		var sql="insert into timemanage.sands(time,datetime,item,comments,iduser) values(?,?,?,?,?)";
		var d=new Date();
		var systime=d.getFullYear()+'-'+d.getMonth()+'-'+d.getDate()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();
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
	connection.query('UPDATE timemanage.items as it SET it.show=0 WHERE it.user=? and it.name=?',[req.session.id,req.param('item')],function (err,result){
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