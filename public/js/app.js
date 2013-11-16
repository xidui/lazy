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