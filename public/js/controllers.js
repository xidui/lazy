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
  	$http({
  		url:'data/items',
  		method:'get'
  	}).success(function(data) {
    	$scope.items = data;
  	});
});