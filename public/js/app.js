var lazy = angular.module('lazy', [
  	'ngRoute',
  	'lazyctrs'
]);

lazy.config(['$routeProvider',
  	function($routeProvider) {
    	$routeProvider.
      	when('/manage', {
        	templateUrl: 'manage'
      	}).
      	when('/welcome', {
      		templateUrl: 'welcome'
      	}).
      	when('/register', {
      		templateUrl: 'register'
      	}).
      	when('/abc', {
      		templateUrl: 'abc'
      	}).
      	when('/try', {
      		templateUrl: 'try'
      	}).
   		otherwise({redirectTo: '/welcome'});
}]);

//var abc = angular.module('abc',[
//	'ngRoute'
//]);
//abc.config(['$routeProvider',
//  	function($routeProvider) {
//    	$routeProvider.
//      	when('/abc', {
//        	templateUrl: 'abc'
//      	}).
//   		otherwise({redirectTo: '/abc'});
//}]);