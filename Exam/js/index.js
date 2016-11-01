/**
 * Created by Administrator on 2016/9/22.
 * 首页核心JS文件
 */

$(function() {
    //左侧导航的动画效果
    $(".baseUI>li>ul").slideUp();
    $(".baseUI>li>a").off("click");
    $(".baseUI>li>a").on("click",function(){

        $(".baseUI>li>a").next().slideUp();
        $(this).next().slideDown();

    });


    //默认
    $(".baseUI>li>ul").eq(0).slideDown();
    $(".baseUI>li>ul>li>a").eq(0).trigger("click");
    $(".baseUI>li>ul>li").off("click");
    $(".baseUI>li>ul>li").on("click",function(){
    $(".baseUI>li>ul>li").removeClass("current");
    $(this).addClass("current");
    })


})

//核心模块
angular.module("app",["ng","ngRoute","app.subject","app.paper"])
    .controller("mainCtrl",["$scope",function($scope){

        }])
    .config(["$routeProvider",function($routeProvider){
        $routeProvider.when("/allSubject/a/:a/b/:b/c/:c/d/:d",{
            templateUrl:"tpl/subject/subjectList.html",
            controller:"subjectController"
        }).when("/allAddSubject",{
            templateUrl:"tpl/subject/subjectAddTitle.html",
            controller:"subjectController"
        }).when("/delSubject/id/:id",{
            templateUrl:"tpl/subject/subjectList.html",
            controller:"delsubjectController"
        }).when("/SubjectCheck/id/:id/state/:state",{
            templateUrl:"tpl/subject/subjectList.html",
            controller:"subjectCheckController"
        }).when("/PaperList",{
            templateUrl:"tpl/paper/paperManager.html",
            controller:"paperListController"
        }).when("/PaperAdd/id/:id/stem/:stem/type/:type/topic/:topic/level/:level",{
            templateUrl:"tpl/paper/paperAdd.html",
            controller:"paperAddController"
        }).when("/PaperSubjectList",{
            templateUrl:"tpl/paper/subjectList.html",
            controller:"subjectController"
        })
    }])


