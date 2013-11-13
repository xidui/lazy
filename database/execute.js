var my=require('./mysql_api.js');
my.update();
var result=my.select();
//result.forEach(function(user){  
//    console.log(user.id + ':' + user.username + ':' + user.pw);  
//}); 
//console.log(result);