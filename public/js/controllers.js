'use strict';

/* Controllers */

var lazy = angular.module('lazy', []);

lazy.controller('getUser', function getUser($scope, $http) {
  	$http({
  		url:'http://127.0.0.1:3000/user',
  		method:'get'
  	}).success(function(data) {
  		alert(data);
    	$scope.user = data;
  	});
  	$http.get('phones.json').success(function(data) {
  		$scope.data=data;
  	});
});
