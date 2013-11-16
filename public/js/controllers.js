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
			url:'login',
			method:'post',
			data:{username:$scope.username,password:$scope.password}
		}).success(function(data) {
			alert(data.state);
		});
	}
});