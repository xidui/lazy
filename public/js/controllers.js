'use strict';

/* Controllers */

var lazyctrs = angular.module('lazyctrs', []);

//这个controller以后肯定要去掉，太突兀
lazyctrs.controller('getUser', function getUser($scope, $http) {
  	$http({
  		url:'/data/user',
  		method:'get'
  	}).success(function(data) {
    	$scope.user = data;
  	});
});

lazyctrs.controller('Login', function Login($scope, $http) {
	function checkloginstate($http){
		$http({
			url:'/getloginstate',
			method:'get'
		}).success(function(data) {
		    if(data.state)
		    	$scope.loginstate='yes';
		    $scope.loginid=data.loginid;
		});
	};
	checkloginstate($http);
	$scope.send=function(username,password) {
		$http({
			url:'/login',
			method:'post',
			data:{
				username	:	username,
				password	:	password
			}
		}).success(function(data) {
			if(data.state){
				location.reload();
				$scope.loginstate='yes';
				$scope.loginid=data.loginid;
			}else {
				alert("用户名或密码错误！");
			}
//			alert(location);
//			alert(window.location);
			window.location="/#/view/manage"
			location.reload();
		});
	}
	$scope.logout=function() {
		$http({
			url:'/logout',
			method:'post'
		}).success(function(data) {
		    if(data.state){
		    	$scope.loginstate='no';
		    	window.location="/#/view/welcome";
		    }
		    location.reload();
		});
	}
	$scope.loginstate='no';
});

lazyctrs.controller('Register', function Register($scope, $http) {
	$scope.grade=2013;
	$scope.send=function() {
		if($scope.password1!=$scope.password2){
			alert('两次密码不一致');
			return;
		}
		$http({
			url:'/register',
			method:'post',
			data:{
				username	: 	$scope.username,
				password1	:	$scope.password1,
				password2	:	$scope.password2,
				email		:	$scope.email,
				gender		:   $scope.gender,
				school		:	$scope.school,
				grade		:	$scope.grade,
				phone		:	$scope.phone,
				qq			:	$scope.qq
			}
		}).success(function(data) {
			var s='恭喜注册成功';
			if(!data.state)
				s='抱歉注册失败';
			alert(s);
		});
	}
	$scope.checkusername=function() {
		$http({
			url:'/checkusername',
			method:'post',
			data:{
				username	: 	$scope.username
			}
		}).success(function(data) {
			var s="恭喜你，该用户名可以使用!";
			if(!data.state)
				s="抱歉，请换一个用户名!";
			alert(s);
		});
	}
});

lazyctrs.controller('Items', function Items($scope, $http) {
	getItems(0);
	getsand(null);
	function getItems(all) {
		$http({
			url:'/data/items',
			method:'post',
			data:{
				showall	:	all
			}
		}).success(function(data) {
		    $scope.items = data.result;
		});
	};
	function getsand(item) {
		$http({
			url:'/data/sands',
			method:'post',
			data:{
				sand	:	item
			}
		}).success(function(data) {
			$scope.viewdetail_hide=false;
			$scope.sands=data.result;
			$scope.itemname=item;
		});
	}
	$scope.getItemsAll =function() {
		getItems(1);
	};
  	$scope.getsand=function(item) {
  		getsand(item);
  	};
  	$scope.closedetail=function(){
  		$scope.viewdetail_hide=true;
  	};
  	$scope.addnewitem=function(){
  		$scope.addnewitem_hide=!$scope.addnewitem_hide;
  		if($scope.newitemname==null)return;
  		$http({
  			url:'/add/additem',
  			method:'post',
  			data:{
  				newitemname	:	$scope.newitemname
  			}
  		}).success(function(data) {
  			$scope.addnewitem_hide=true;
  			if(data.state){
  				$scope.items.push({ 
  					iditems: data.result.insertId, 
  					name: $scope.newitemname, 
  					sum: null, 
  					user: data.loginid 
  				});
  			};
  			$scope.newitemname=null;
  		});
  	};
  	$scope.addsand=function(){
  		$scope.addnewsand_hide=!$scope.addnewsand_hide;
  		if($scope.comment==null)return;
  		$http({
  			url:'/add/addsand',
  			method:'post',
  			data:{
  				itemname	:	$scope.itemname,
  				timespend	:	$scope.timespend,
  				comment		:	$scope.comment
  			}
  		}).success(function(data) {
  			$scope.items.forEach(function (e) {
  				if(e['name']==$scope.itemname){
  					if(e['sum']==null)
  						e['sum']=$scope.timespend;
  					else
  						e['sum']=e['sum']+$scope.timespend;
  				}
  			});
  			getsand($scope.itemname);
  			$scope.timespend=null;
  			$scope.comment=null;
  		});	
  	};
  	$scope.hideitem=function(item,del){
  		$http({
  			url:'/modi/hideitem',
  			method:'post',
  			data:{
  				item	:	item,
  				del		:	del
  			}
  		}).success(function(data) {
  			if(data.state){
  				var i=0;
  				$scope.items.forEach(function (e) {
  					if(e['name']==item)
  						$scope.items.splice(i, 1);
  					i++;
  				});
  				$scope.items=null;
  				getItems(0);
  			}
  		});
  	}
  	$scope.viewdetail_hide=true;
  	$scope.addnewitem_hide=true;
  	$scope.addnewsand_hide=true;
});

lazyctrs.controller('Tasks',function Tasks($scope, $http) {
	getTasks();
	getItems();
	function getTasks() {
		$http({
			url		:'/data/tasks',
			method	:'post'
		}).success(function(data) {
			data.result.forEach(function(e){
				if(e.state==0)
					e.state='default';
				else if (e.state==1)
					e.state='success';
			});
			$scope.tasks=data.result;
		});
	}
	function getItems() {
		$http({
			url		:'/data/items',
			method	:'post',
			data	:{
				showall	:1
			}
		}).success(function(data) {
			$scope.items=data.result;
		});
	}
	$scope.addTask=function () {
		$http({
			url		:'/add/addTask',
			method	:'post',
			data	:{
				description	:	$scope.description,
				iditem		:	$scope.Item
			}
		}).success(function(data) {
			if(data.state)
				window.location.reload();
		});
	}
});

lazyctrs.controller('tryy', function tryy($scope, $http) {
  	$scope.items = ['settings', 'home', 'other'];
  	$scope.selection = $scope.items[1];
});