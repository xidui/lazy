/**
 * Created by apple on 14-2-25.
 */
lazyctrs.controller('Items', function Items($scope, $http) {
    getItems(0);
    getsand(null,1,1);
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
    function getsand(item,pagenum,bar) {
//		alert(1);
//		alert('pagenum:'+pagenum);
//		alert('totalpages:'+$scope.totalpages);
        if(pagenum==0||pagenum-$scope.totalpages>=1)return;
        if(item!=null)
            $scope.itemname=item;
        $scope.pageindex=pagenum;
//		alert(1.5);
        $http({
            url:'/data/sands',
            method:'post',
            data:{
                sand		:	$scope.itemname,
                pagesize	:	10,
                page		:	pagenum
            }
        }).success(function(data) {
//			alert(2);
                $scope.viewdetail_hide=false;
                $scope.sands=data.result;
                $scope.totalpages=Math.ceil(data.rows/10);
                if(data.rows==0)
                    $scope.totalpages=1;
                if(bar!=1)return;
                //处理分页相关的页面元素
                $scope.pages=[];
                for(var i=0;i<=data.rows/10;i++){
                    $scope.pages.push({pagenum:i+1});
                }
            });
    }
    $scope.getItemsAll =function() {
        $scope.items = null;
        getItems(1);
    };
    $scope.getsand=function(item,pagenum,bar) {
        getsand(item,pagenum,bar);
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
                $scope.items.forEach(function (e) {
                    if(e['name']==$scope.itemname){
                        if(e['sum']==null)
                            e['sum']=$scope.timespend;
                        else
                            e['sum']=e['sum']+$scope.timespend;
                    }
                });
                getsand($scope.itemname,$scope.totalpages,0);
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