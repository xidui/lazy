'use strict';

/* Controllers */

var lazyctrs = angular.module('lazyctrs', []);

lazyctrs.controller('getUser', function getUser($scope, $http) {
  	$http({
  		url:'/data/user',
  		method:'get'
  	}).success(function(data) {
    	$scope.user = data;
  	});
});

lazyctrs.controller('Items', function Items($scope, $http) {
	getItems(0);
	function getItems(all) {
		$http({
			url:'/data/items',
			method:'post',
			data:{
				showall	:	all
			}
		}).success(function(data) {
		    $scope.items = data.result;
		});
	};
	$scope.getItemsAll =function() {
		getItems(1);
	};
  	$scope.getsand=function(item) {
  		$http({
  			url:'/data/sands',
  			method:'post',
  			data:{
  				sand	:	item
  			}
  		}).success(function(data) {
  			$scope.viewdetail_hide=false;
  			$scope.sands=data.result;
  			$scope.itemname=item;
  		});
  	};
  	$scope.closedetail=function(){
  		$scope.viewdetail_hide=true;
  	};
  	$scope.addnewitem=function(){
  		$scope.addnewitem_hide=!$scope.addnewitem_hide;
  		if($scope.newitemname==null)return;
  		$http({
  			url:'/add/additem',
  			method:'post',
  			data:{
  				newitemname	:	$scope.newitemname
  			}
  		}).success(function(data) {
  			$scope.addnewitem_hide=true;
  			if(data.state){
  				$scope.items.push({ 
  					iditems: data.result.insertId, 
  					name: $scope.newitemname, 
  					sum: null, 
  					user: data.loginid 
  				});
  			};
  			$scope.newitemname=null;
  		});
  	};
  	$scope.addsand=function(){
  		$scope.addnewsand_hide=!$scope.addnewsand_hide;
  		if($scope.comment==null)return;
  		$http({
  			url:'/add/addsand',
  			method:'post',
  			data:{
  				itemname	:	$scope.itemname,
  				timespend	:	$scope.timespend,
  				comment		:	$scope.comment
  			}
  		}).success(function(data) {
  			if(data.state){
  				$scope.sands.push({ 
  					idsands: null,
  				    time: $scope.timespend,
  				    datetime: data.systime,
  				    item: data.iditems,
  				    comments: $scope.comment,
  				    iduser: data.id,
  				    iditems: data.iditems,
  				    name: $scope.itemname,
  				    user: data.id
  				});
  			}
  			$scope.timespend=null;
  			$scope.comment=null;
  		});	
  	};
  	$scope.hideitem=function(item,del){
  		$http({
  			url:'/modi/hideitem',
  			method:'post',
  			data:{
  				item	:	item,
  				del		:	del
  			}
  		}).success(function(data) {
  			if(data.state){
  				var i=0;
  				$scope.items.forEach(function (e) {
  					if(e['name']==item)
  						$scope.items.splice(i, 1);
  					i++;
  				});
  				$scope.items=null;
  				getItems(0);
  			}
  		});
  	}
  	$scope.viewdetail_hide=true;
  	$scope.addnewitem_hide=true;
  	$scope.addnewsand_hide=true;
});

lazyctrs.controller('login', function login($scope, $http) {
	function checkloginstate($http){
		$http({
			url:'/getloginstate',
			method:'get'
		}).success(function(data) {
		    if(data.state)
		    	$scope.loginstate='yes';
		    $scope.loginid=data.loginid;
		});
	};
	checkloginstate($http);
	$scope.send=function(username,password) {
		$http({
			url:'/login',
			method:'post',
			data:{
				username	:	username,
				password	:	password
			}
		}).success(function(data) {
			if(data.state){
				location="#/view/manage";
				$scope.loginstate='yes';
				$scope.loginid=data.loginid;
			}else {
				alert("用户名或密码错误！");
			}
		});
	}
	$scope.logout=function() {
		$http({
			url:'/logout',
			method:'post'
		}).success(function(data) {
		    if(data.state){
		    	$scope.loginstate='no';
		    	location="#/view/welcome";
		    }
		});
	}
	$scope.loginstate='no';
});

lazyctrs.controller('register', function login($scope, $http) {
	$scope.grade=2013;
	$scope.send=function() {
		if($scope.password1!=$scope.password2){
			alert('两次密码不一致');
			return;
		}
		$http({
			url:'/register',
			method:'post',
			data:{
				username	: 	$scope.username,
				password1	:	$scope.password1,
				password2	:	$scope.password2,
				email		:	$scope.email,
				gender		:   $scope.gender,
				school		:	$scope.school,
				grade		:	$scope.grade,
				phone		:	$scope.phone,
				qq			:	$scope.qq
			}
		}).success(function(data) {
			var s='恭喜注册成功';
			if(!data.state)
				s='抱歉注册失败';
			alert(s);
		});
	}
	$scope.checkusername=function() {
		$http({
			url:'/checkusername',
			method:'post',
			data:{
				username	: 	$scope.username
			}
		}).success(function(data) {
			var s="恭喜你，该用户名可以使用!";
			if(!data.state)
				s="抱歉，请换一个用户名!";
			alert(s);
		});
	}
});

lazyctrs.controller('tryy', function tryy($scope, $http) {
  	$scope.items = ['settings', 'home', 'other'];
  	$scope.selection = $scope.items[1];
});