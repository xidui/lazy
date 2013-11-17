'use strict';

/* Controllers */

var lazyctrs = angular.module('lazyctrs', []);

lazyctrs.controller('getUser', function getUser($scope, $http) {
  	$http({
  		url:'data/user',
  		method:'get'
  	}).success(function(data) {
    	$scope.user = data;
  	});
});

lazyctrs.controller('getItems', function getItems($scope, $http) {
alert($http);
  	$http({
  		url:'data/items',
  		method:'get'
  	}).success(function(data) {
    	$scope.items = data;
  	});
});

lazyctrs.controller('login', function login($scope, $http) {
	$scope.send=function() {
		$http({
			url:'/login',
			method:'post',
			data:{
				username	:	$scope.username,
				password	:	$scope.password
			}
		}).success(function(data) {
			alert(data.state);
		});
	}
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