'use strict';

/* Controllers */

var lazyctrs = angular.module('lazyctrs', []);

lazyctrs.controller('getUser', function getUser($scope, $http) {
  	$http({
  		url:'/data/user',
  		method:'get'
  	}).success(function(data) {
    	$scope.user = data;
  	});
});

lazyctrs.controller('getItems', function getItems($scope, $http) {
  	$http({
  		url:'/data/items',
  		method:'get'
  	}).success(function(data) {
  	    $scope.items = data.result;
  	});
  	$scope.getsand=function(sand) {
  		$http({
  			url:'/data/sands',
  			method:'post',
  			data:{
  				sand	:	sand
  			}
  		}).success(function(data) {
  			$scope.sands=data.result;
  		});
  	}
});

lazyctrs.controller('login', function login($scope, $http) {
	function checkloginstate($http){
		var res='';
		$http({
			url:'/getloginstate',
			method:'get'
		}).success(function(data) {
		    res=data;
		    if(data.state)
		    	$scope.loginstate='yes';
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
				location="#/view/manage";
				$scope.loginstate='yes';
			}else {
				alert("用户名或密码错误！");
			}
		});
	}
	$scope.loginstate='no';
});

lazyctrs.controller('register', function login($scope, $http) {
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

lazyctrs.controller('tryy', function tryy($scope, $http) {
  	$scope.items = ['settings', 'home', 'other'];
  	$scope.selection = $scope.items[1];
});