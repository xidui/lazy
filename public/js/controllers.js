'use strict';

/* Controllers */

var lazy = angular.module('lazy', []);

lazy.controller('getUser', function getUser($scope, $http) {
  	$http({
  		url:'/user',
  		method:'get'
  	}).success(function(data) {
  		alert(data);
    	$scope.user = data;
  	});
  	$http.get('phones.json').success(function(data) {
  		//alert(data);
  		$scope.data=123;
  	});
});
