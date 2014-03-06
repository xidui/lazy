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

lazyctrs.controller('PageNav', function PageNav($scope, $http) {
	$scope.view=location.href.split('/')[5];
  	$scope.changeview = function (view) {
  		$scope.view=view;
  	}
});

lazyctrs.controller('tryy', function tryy($scope, $http) {
  	$scope.items = ['settings', 'home', 'other'];
  	$scope.selection = $scope.items[1];
});

document.write('<script src="js/controller/care.js"></script>');
document.write('<script src="js/controller/task.js"></script>');
document.write('<script src="js/controller/item.js"></script>');
document.write('<script src="js/controller/logandreg.js"></script>');
document.write('<script src="js/controller/newthings.js"></script>');