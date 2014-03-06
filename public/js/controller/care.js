/**
* Created by apple on 14-2-25.
*/
lazyctrs.controller('Care',function Care($scope,$http) {
    $scope.page='view/abc';
    getfriends();
    getfollowers();
    $scope.changepage=function (page) {
        $scope.page=page;
    }
    $scope.searchpeople = function (peoplename) {
        $scope.page = 'view/care/people';
        $http({
            url		:'/data/people',
            method	:'post',
            data	:{
                peoplename		:	peoplename
            }
        }).success(function (data) {
                $scope.peoples = data.people;
            });
    }
    $scope.addpeople = function (careid,hascared) {
        if(hascared){
            alert("您已经关注过"+careid+"了");
            return;
        }
        $http({
            url		:'/add/addCare',
            method	:'post',
            data	:{
                careid		:	careid
            }
        }).success(function (data) {
                if(data.state){
                    getfriends();
                    getfollowers();
                    $scope.peoples.forEach(function (e) {
                        if(e['loginid']==careid){
                            e['hascared']=1;
                        }
                    });
                }
            });
    }
    $scope.delpeople = function (careid){
        $http({
            url		:'/del/delCare',
            method	:'post',
            data	:{
                careid		:	careid
            }
        }).success(function (data) {
                if(data.state){
                    getfriends();
                    getfollowers();
                    $scope.peoples.forEach(function (e) {
                        if(e['loginid']==careid){
                            e['hascared']=0;
                        }
                    });
                }
            });
    }
    $scope.addfensi = function (fensiid,hascared){
        if(hascared==0){
            this.addpeople(fensiid,hascared);
        }else{
            this.delpeople(fensiid,hascared);
        }
    }
    function getfriends(){
        $http({
            url     :'/data/myfriends',
            method  :'post'
        }).success(function (data){
                if(data.state){
                    $scope.friends=data.result;
                }
            });
    }
    function getfollowers(){
        $http({
            url     :'/data/myfollowers',
            method  :'post'
        }).success(function(data){
                if(data.state) {
                    $scope.followers=data.result;
                }
            });
    }
    $scope.viewfollowerpage = function(follower){
        this.viewpeoplepage(follower);
    }
    $scope.viewfriendpage = function(friend){
        this.viewpeoplepage(friend);
    }
    $scope.viewpeoplepage = function(people){
        $scope.page='view/care/peopleitempage';
        $http({
            url     :'/data/peopleitems',
            method  :'post',
            data    :{
                peopleloginid:people
            }
        }).success(function(data){
                if(data.state){
                    $scope.peopleloginid=data.peopleloginid;
                    $scope.peopleitems=data.result;
                }
            });
    }
    $scope.getpeoplesandsbyitem = function(peopleloginid,peopleitemname){
        $http({
            url     :   '/data/peopleitemsands',
            method  :   'post',
            data    :   {
                peopleloginid   :peopleloginid,
                peopleitemname  :peopleitemname
            }
        }).success(function(data){
                if(data.state){
                    $scope.peopleitemsands=data.result;
                }
            });
    }
});