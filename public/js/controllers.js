'use strict';

/* Controllers */

var lazy = angular.module('lazy', []);

lazy.controller('getUser', function getUser($scope, $http) {
  	$http({
  		url:'/user',
  		method:'get'
  	}).success(function(data) {
    	$scope.user = data;
  	});
});

lazy.controller('getItems', function getItems($scope, $http) {
  	$http({
  		url:'/items',
  		method:'get'
  	}).success(function(data) {
    	$scope.items = data;
  	});
});