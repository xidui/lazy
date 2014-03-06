/**
 * Created by apple on 14-2-25.
 */
lazyctrs.controller('Tasks',function Tasks($scope, $http) {
    getTasks();
    getItems();
    function getTasks() {
        $http({
            url		:'/data/tasks',
            method	:'post'
        }).success(function(data) {
                $scope.tasks=data.result;
            });
    }
    function getItems() {
        $http({
            url		:'/data/items',
            method	:'post',
            data	:{
                showall	:1
            }
        }).success(function(data) {
                $scope.items=data.result;
            });
    }
    $scope.addTask=function () {
        $http({
            url		:'/add/addTask',
            method	:'post',
            data	:{
                description	:	$scope.description,
                year		:	$scope.year,
                month		:	$scope.month,
                date		:	$scope.date
            }
        }).success(function(data) {
                if(data.state)
                    window.location.reload();
            });
    }
});

lazyctrs.controller('Task',function Task($scope,$http) {
//	$('.form_datetime').datetimepicker({
//	    //language:  'fr',
//	    weekStart: 1,
//	    todayBtn:  1,
//		autoclose: 1,
//		todayHighlight: 1,
//		startView: 2,
//		forceParse: 0,
//	    showMeridian: 1
//	});
    $http({
        url		:'/data/tasksands',
        method	:'post',
        data	:{
            idtask	:	$scope.task.id
        }
    }).success(function (data) {
            $scope.sands=data.result;
        });
    if($scope.task.state==1)
        $scope.confirmed=true;
    $scope.addtasksand=function () {
        $http({
            url		:'/add/addTasksand',
            method	:'post',
            data	:{
                item		:	$scope.iditem,
                comments	:	$scope.comments,
                time		:	$scope.timespend,
                task		:	$scope.task.id
            }
        }).success(function (data) {
                if(data.state){
                    $scope.sands.push({
                        comments	:	data.data[3],
                        datetime	:	data.data[1],
                        time		:	data.data[0],
                        item		:	data.data[2]
                    });
                }
                $scope.comments=null;
                $scope.timespend=null;
                $scope.iditem=null;
            });
    }
    $scope.statechange=function () {
        $scope.task.state=1-$scope.task.state;
        $http({
            url		:'/modi/taskstate',
            method	:'post',
            data	:{
                idtask		:	$scope.task.id,
                taskstate	:	$scope.task.state
            }
        }).success(function (data) {
                /////////
            });
    }
});