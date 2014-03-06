/**
 * Created by apple on 14-2-27.
 */
lazyctrs.controller('NewThings', function NewThings($scope, $http) {
    $http({
        url		:'/data/newthings',
        method	:'post',
        data	:{
            showself	:	true
        }
    }).success(function (data) {
            if(data.state){
                $scope.things=data.result;
            }
        });
});