var lazy = angular.module('lazy', [
  	'ngRoute',
  	'lazyctrs'
]);

//var care = angular.module('care', [
//	'ngRoute',
//	'carectrs'
//]);

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
      	when('/view/task', {
      		templateUrl: '/view/task'
      	}).
      	when('/view/care', {
      		templateUrl: '/view/care'
      	}).
        when('/view/newthings', {
            templateUrl: '/view/newthings'
        }).
   		otherwise({redirectTo: '/view/welcome'});
}]);