
/**
 * Created by Administrator on 2016/9/22.
 * 题目管理的JS
 */

angular.module("app.subject",["ng","ngRoute"])
    .controller("subjectCheckController",["$routeParams","$location","titleService",function($routeParams,$location,titleService){
        titleService.checkSubject($routeParams.id,$routeParams.state,function(data){
            alert(data);

        })
        $location.path("/allSubject/a/0/b/0/c/0/d/0");
    }])
    .controller("delsubjectController",function($location,$routeParams,titleService){
        var flag=confirm("确认删除么？");
        if(flag){
            var id=$routeParams.id;
            titleService.delSubject(id,function(data){
                //alert(data);
            })

        }
        $location.path("/allSubject/a/0/b/0/c/0/d/0");

    })
    .controller("subjectController",function($scope,$location,Type,titleService,$routeParams){
        $scope.subject={
            typeId:1,
            levelId:1,
            departmentId:1,
            topicId:1,
            stem:"",
            fx:"",
            answer:"",//简答题的答案
            choiceContent:[],
            choiceCorrect:[false,false,false,false]
        };
        $scope.submit=function () {
            titleService.saveSubject($scope.subject,function (data) {
                //alert(data)
            })
            var subject={
                typeId:1,
                levelId:1,
                departmentId:1,
                topicId:1,
                stem:"",
                fx:"",
                answer:"",//简答题的答案
                choiceContent:[],
                choiceCorrect:[false,false,false,false]
            };
            angular.copy(subject,$scope.subject);
        }
        $scope.submitAndclose=function () {
            titleService.saveSubject($scope.subject,function (data) {
                //alert(data)
            })
           $location.path("/allSubject/a/0/b/0/c/0/d/0");

        }
        $scope.params=$routeParams;
        //console.log($scope.params);
        $scope.add=function(){
            $location.path("/allAddSubject");
        };
        Type.getAllSubjectType(function(data){
            $scope.Type=data;
            //console.log($scope.tt);
        });
        Type.getAllDepartmentes(function(data){
            $scope.Department=data;
        });
        Type.getAllTopics(function(data){
            $scope.Topics=data;
        });
        Type.getAllSubjectLevel(function(data){
            $scope.Level=data;
        })
        titleService.getAllSubjects($routeParams,function(data){
            $scope.Subjects=data;
            // console.log(data);
            data.forEach(function(item){
                item.choices.forEach(function(choice,index){
                    choice.no=Type.convertTonub(index);

                })
                var answer=[];

                item.choices.forEach(function(choice){
                    if(choice.correct){
                        answer.push( choice.no);
                    }
                })

                item.answer=answer.toString();
            })

        });


    }).
config(function($routeProvider){




})


/*provider("titleService",function(){
 this.url="";
 this.setUrl=function(url){
 this.url=url;
 };
 this.$get=function($http){
 var  self=this;
 return{

 getAllSubjects:function(handle){
 //console.log(self);
 $http.get(self.url).then(function(result){
 console.log(result);
 handle(result.data);
 // console.log(result.data);
 })
 }

 }
 }
 })*/
    .service("titleService",["$http","$httpParamSerializer",function($http,$httpParamSerializer){

        this.checkSubject=function(id,state,handle){
            $http.get("http://172.16.0.5:7777/test/exam/manager/checkSubject.action",{
                params:{
                    'subject.id':id,
                    'subject.checkState':state
            }
            }).success(function(data){
                handle(data);
            })
        }
        this.delSubject=function(id,handle){
            $http.get("http://172.16.0.5:7777/test/exam/manager/delSubject.action",{
                params:{
                    'subject.id':id
            }
            }).success(function(data){
                handle(data);
            })
        }
        this.saveSubject=function(params,handler){
            //处理数据
            var obj = {};
            for(var key in params){
                var val = params[key];
                switch (key){
                    case "typeId":
                        obj['subject.subjectType.id'] = val;
                        break;
                    case "levelId":
                        obj['subject.subjectLevel.id'] = val;
                        break;
                    case "departmentId":
                        obj['subject.department.id'] = val;
                        break;
                    case "topicId":
                        obj['subject.topic.id'] = val;
                        break;
                    case "stem":
                        obj['subject.stem'] = val;
                        break;
                    case "fx":
                        obj['subject.analysis'] = val;
                        break;
                    case "answer":
                        obj['subject.answer'] = val;
                        break;
                    case "choiceContent":
                        obj['choiceContent'] = val;
                        break;
                    case "choiceCorrect":
                        obj['choiceCorrect'] = val;
                        break;
                }
            }
            //对OBJ 对象进行表单格式的序列化操作
            obj=$httpParamSerializer(obj);
            $http.post("http://172.16.0.5:7777/test/exam/manager/saveSubject.action",obj,{
                headers:{
                    "Content-Type":"application/x-www-form-urlencoded"
                }
            }).success(function (data) {
                handler(data);
            });
        }
        this.getAllSubjects=function(params,handle){
            /*$http.get("data/subject.json",{
             params:{
             'subject.subjectType.id':2
             }
             }).success(function(data){handle(data)});*/
            var data={};
            for(var key in params){
                val=params[key];
                if(val!=0){
                    switch(key){
                        case "a":
                            data['subject.subjectType.id']=val;
                            break;
                        case "b":
                            data['subject.department.id']=val;
                            break;
                        case"c":
                            data['subject.topic.id']=val;
                            break;
                        case"d":
                            data['subject.subjectLevel.id']=val;
                            break;

                    }
                }
            }
            //console.log(data);
            $http.get("http://172.16.0.5:7777/test/exam/manager/getAllSubjects.action",{

                params:data
                //params:{ 'subject.subjectLevel.id':3}
            }).success(function(data){
                handle(data);
                //console.log(data);
            })
        }

    }])
    .factory("Type",["$http",function($http){
        return{
            convertTonub:function(index){
                return index==0? "A":(index==1? "B":(index==2? "C":(index==3? "D":"")))
            },
            getAllSubjectType:function(handle){
                $http.get("data/Type.json").success(function(data){handle(data);})
                /*$http.get("http://172.16.0.5:7777/test/exam/manager/getAllSubjectType.action").
                success(function(data){
                    //console.log(data);
                    handle(data);
                })*/
            },
            getAllDepartmentes:function(handle){
                $http.get("data/Departmentes.json").success(function(data){handle(data);})
                /*$http.get("http://172.16.0.5:7777/test/exam/manager/getAllDepartmentes.action").
                success(function(data){
                    //console.log(data);
                    handle(data);
                })*/
            },
            getAllTopics:function(handle){
                $http.get("data/Topics.json").success(function(data){handle(data);})
                /*$http.get("http://172.16.0.5:7777/test/exam/manager/getAllTopics.action").
                success(function(data){
                    //console.log(data);
                    handle(data);
                })*/
            },
            getAllSubjectLevel:function(handle){
                $http.get("data/Level.json").success(function(data){handle(data);})
                /*$http.get("http://172.16.0.5:7777/test/exam/manager/getAllSubjectLevel.action").
                success(function(data){
                    //console.log(data);
                    handle(data);
                })*/
            },


        }
    }])

.filter("selectTopics",function(){
    //input为要过滤的内容，id为方向id
    return function(input,id){
        //console.log(input,id);
        if(input) {
            var result = input.filter(function (item) {
                return item.department.id == id;
                //console.log(item);
            })
            return result;
        }
    }
}).directive("selectOption",function(){
    return {
        restrict:"A",
        link:function(scope,element){
         //console.log(element);
            element.on("change",function(){
                var type=$(this).attr('type');
                var val=$(this).val();
                //console.log(type+'-'+val);

                if(type=='radio'){
                    scope.subject.choiceCorrect=[];
                    for(var i=0;i<4;i++){
                        if(i==val){
                            scope.subject.choiceCorrect.push(true);
                        }else{
                            scope.subject.choiceCorrect.push(false);
                        }
                    }
                }else{

                    for(var i=0;i<4;i++){
                        if(i==val){
                            scope.subject.choiceCorrect[i]=true;
                        }
                    }

                }
                //强制消化
                scope.$digest();
            })


        }
    }
})




