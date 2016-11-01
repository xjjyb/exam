/**
 * Created by Administrator on 2016/9/28.
 * 试卷的核心模块
 */


angular.module("app.paper",["ng","app.subject"])
    //查询控制器
    .controller("paperListController",["scope",function($scope){

    }])
    //添加控制器
    .controller("paperAddController",["$scope","Type","$routeParams","paperservice","saveService",function($scope,Type,$routeParams,paperservice,saveService){
        Type.getAllDepartmentes(function(data){
            //将全部方向绑定到作用域dps中
            $scope.dps=data;
        });
        //模板

        $scope.pmodel=paperservice.model;
        if($routeParams.id!=0){
        paperservice.Add($routeParams.id);
            paperservice.Addsubjects(angular.copy($routeParams));
            //paperservice.Addsubjects($routeParams);

        }
        $scope.submit=function(){
            saveService.savePaper($scope.pmodel,function(data){
                alert(data);
            })
            var model={
                departmentID:1,//方向
                    title:"",       //试卷标题
                    desc:"",        //描述
                    at:0,               //时间
                    total:0,            //总分
                    scores:[],          //分值
                    subjectIDs:[],     //每个题目的id

                    subjects:[]         //题目信息
            }
            //对model进行重置
            angular.copy(model,paperservice.model);

        }



    }])
    //试卷删除控制器
    .controller("paperDelController",["scope",function($scope){

    }])
    .factory("saveService",function($http,$httpParamSerializer){
        return{
            savePaper:function(params,handle){
                var obj={};
                for(var key in params ){
                    var val=params[key];
                    switch(key){
                        case "departmentID":
                            obj['paper.department.id']=val;
                            break;
                        case "title":
                            obj['paper.title']=val;
                            break;
                        case "desc":
                            obj['paper.description']=val;
                            break;
                        case "total":
                            obj['paper.totalPoints']=val;
                            break;
                        case "at":
                            obj['paper.answerQuestionTime']=val;
                            break;
                        case "scores":
                            obj['scores']=val;
                            break;
                        case "subjectIDs":
                            obj['subjectIds']=val;
                            break;
                    }
                }
                obj=$httpParamSerializer(obj);
                $http.post("http://172.16.0.5:7777/test/exam/manager/saveExamPaper.action",obj,{
                    headers:{
                        "Content-Type":"application/x-www-form-urlencoded"}
                }).success(function (data) {
                    handle(data);
                })
            }
        }
    })
        .factory("paperservice",function(){
            return {
                model:{
                departmentID:1,//方向
                title:"",       //试卷标题
                desc:"",        //描述
                at:0,               //时间
                total:0,            //总分
                scores:[],          //分值
                subjectIDs:[],     //每个题目的id
                subjects:[]         //题目信息
            },
            Add:function(id){
                this.model.subjectIDs.push(id);
            },
            Addsubjects:function(id){
                    this.model.subjects.push(id);
                }
            }
        })
