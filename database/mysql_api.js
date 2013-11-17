var mysql = require('mysql');
var async = require('async');
var config={
  host     : '115.29.161.233',
  port     : '3306',
  user     : 'root',
  password : 'xidui',
  database : 'timemanage',
};

exports.checklogin = function (req,res) {
	var sql='select u.id,u.loginid from timemanage.users as u where loginid = ? and password = ?';
	var data=[req.param('username'),req.param('password')];
	var connection = mysql.createConnection(config);
	connection.connect();
	connection.query(sql,data,function (err,result) {
		var user=result[0];
		var response={state:false,id:'',loginid:''}
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
//		result.forEach(function(user){ 
//			if(user.id==1) 
//				res.json({name : user.username,pw : user.pw});
//		});
	});	
	connection.end();
};

exports.update = function (){
	var connection = mysql.createConnection(config);
	connection.connect();
	var data = ['quer', 20];  
	connection.query('UPDATE user_info SET pw = ? WHERE id = ?', data, function(err, result) {  
	}); 
	connection.end();
}

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
//var pool  = mysql.createPool({  
//  host     : 'localhost',  
//  port     : '3306',
//  user     : 'root',  
//  password : '',  
//  database : 'test',  
//  debug    : false,  
//});  
//
//var select = function(connection){  
//    connection.query('SELECT * FROM user_info', function(err, result){  
//        result.forEach(function(user){  
//            console.log(user.id + ':' + user.username + ':' + user.pw);  
//        });  
//    });  
//}; 
//
//pool.getConnection(function(err, connection) {  
//    select(connection);  
//    //update(connection);  
//    //select(connection);  
//    pool.releaseConnection(connection);
//}); 
