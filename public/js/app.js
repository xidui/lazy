var lazy = angular.module('lazy', [
  	'ngRoute',
  	'lazyctrs'
]);

lazy.config(['$routeProvider',
  	function($routeProvider) {
    	$routeProvider.
      	when('/view/manage', {
        	templateUrl: '/view/manage'
      	}).
      	when('/view/welcome', {
      		templateUrl: '/view/welcome'
      	}).
      	when('/view/register', {
      		templateUrl: '/view/register'
      	}).
      	when('/view/abc', {
      		templateUrl: '/view/abc'
      	}).
      	when('/view/try', {
      		templateUrl: '/view/try'
      	}).
   		otherwise({redirectTo: '/view/welcome'});
}]);