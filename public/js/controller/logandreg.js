/**
 * Created by apple on 14-2-25.
 */
lazyctrs.controller('Login', function Login($scope, $http) {
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
                    $scope.loginstate='yes';
                    $scope.loginid=data.loginid;
                }else {
                    alert("用户名或密码错误！");
                }
                window.location="/#/view/manage"
                location.reload();
            });
    }
    $scope.logout=function() {
        $http({
            url:'/logout',
            method:'post'
        }).success(function(data) {
                if(data.state){
                    $scope.loginstate='no';
                    window.location="/#/view/welcome";
                }
                location.reload();
            });
    }
    $scope.loginstate='no';
});

lazyctrs.controller('Register', function Register($scope, $http) {
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
                if(!date.state){
                    window.location='#/view/manage';
                    window.location.reload();
                }else{
                    alert(s);
                }
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