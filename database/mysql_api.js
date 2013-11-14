var mysql = require('mysql');
var config={
  host     : 'localhost',
  port     : '3306',
  user     : 'root',
  password : '',
  database : 'test',
};

exports.select = function (res) {
	var connection = mysql.createConnection(config);
	connection.connect();	
	connection.query('SELECT * FROM user_info', function(err, result){   
	    result;
	    result.forEach(function(user){  
	    	if(user.id==1)
	    		//console.log(user.id + ':' + user.username + ':' + user.pw);  
	    		res.json({name : user.username,pw : user.pw});
	    });
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
