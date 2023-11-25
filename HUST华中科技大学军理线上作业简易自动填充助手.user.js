// ==UserScript==
// @name         HUST华中科技大学军理线上作业简易自动填充助手
// @namespace    https://github.com/XiaoLinXiaoZhu/HUST-
// @version      0.1
// @description  hust junli answer auto fulfill
// @author       XLXZ
// @match        http://bookcenter.hustp.com/exercises/detail/*.html
// @grant        none
// @require      https://lib.baomitu.com/jquery/3.6.0/jquery.min.js
// @license MIT
// ==/UserScript==

$('head').append('<link href="https://lib.baomitu.com/layui/2.6.8/css/layui.css" rel="stylesheet" type="text/css" />');
$.getScript("https://lib.baomitu.com/layui/2.6.8/layui.js", function(data, status, jqxhr) {
    layui.use('element', function(){
        var element = layui.element;
    });
    layer.closeAll();
    init();
    window.onhashchange = function() {
        layer.closeAll();
        init();
    };
});

function init() {
    init_answer();
    show();
}


var answer = new Array();

function init_answer() {
    answer[1528] = "B,D,D,C,A,A,B,B,C,C,B,C,A,B,A,A,D,B,D,B,C,C,A,A,A,B,A,B,B,B,ABCDE,ABCD,ACD,BD,ABCD,ABCE,ABCE,AD,ABC,AC,ABC,ABCD,ACD,ABD,AD,BC,ABD,ABCD,ABCD,ABC,ABC,AB,ABCD,ABCD,ABCD,ABCD,ABC,ABC,ABC,ABCD"
    answer[1529] = "C,B,C,A,B,D,A,D,C,A,B,C,D,B,C,ABCDE,ABCD,BCDE,ABDE,ACD,ABCDE,ABDE,ACD,ABCDE,ABCDE,ABCDE,ABCE,ABE,ABDE,ACD"
    answer[1530] = "A,C,D,A,B,A,D,C,B,A,A,C,A,D,C,ABC,ABCD,ABC,ABCD,ABC,ABC,ABCD,ABC,ABCD,ABD,ABC,ABD,ABC,ABC,BCD"
    answer[1531] = "C,D,B,D,B,A,A,A,B,D,A,D,D,B,A,B,C,C,A,B,C,D,B,A,C,B,A,C,D,A,C,ABCE,ABCD,ABCD,ACD,ABCD,ABD,BCD,ABCDE,ABCD,ABCD,AB,ABCD,ABCDE,ABC,ABCD,ABCD,ABCD,ABCD,ABCD,BC,AB,ABCE,BCD,BC,ABC,ABC,BCD,ABCD,ABC"
    answer[1536] = "C,C,D,C,B,A,A,A,A,A,B,A,C,A,A,B,C,D,D,A,B,B,A,A,B,A,B,C,B,B,ABCD,ABC,ABC,ABCDEF,ABC,ABC,ABCD,ABCDE,ABCDE,ABCDEF,ABCDE,ABCDE,ABCD,ABCD,BCD,ACD,ABCD,ABCD,ABC,ABCDE,ABC,ABCDEF,ABCDEF,ABCD,ABCD,ABCD,ABCD,ABCD,ABCDE,ABCD"
    answer[1690] = "C,C,B,A,B,C,B,B,D,C,B,A,A,B,C,D,C,B,A,B,ABC,ABCD,ABC,ABCDE,ABC,ABCDE,ABCD,ABCDE,BCD,ABCD,ABCD,ABCD,ABD,ABCD,ABCDE,ABCD,ABC,ABCD,AB,ABCDE,ABCD,AB,ABCDE,ABC,ABCDEF,ABCD,ABC,ABCDEF,ABC,ABC"
}

var conf = {
    title: "HUST军理助手",
    datalist:{},
    time:1
};
//定义全局变量

function show() {
    layer.open({
        type: 1,
        area: ['200px', '150px'],
        offset: 'rb',
        id: 'msgt',
        closeBtn: 0,
        title: conf.title,
        shade: 0,
        maxmin: true,
        anim: 2,
        content: '<div id="msg"><blockquote class="layui-elem-quote layui-quote-nm"><button type="button" class="layui-btn layui-btn-normal start">点我自动填充答案<button></blockquote></div>'
    });
    $(".start").click(function() {
        start();
    })
}

function start(question_index_l, question_index_r){
    var item_page_id = document.getElementById("exercises_id"); 
    var item_problem_count = parseInt($('.answer_num').length);
    var item_problem_id = document.getElementsByClassName("answer_num");
    var item_problem_type = document.getElementsByClassName("type_title");

    
    // alert(item_problem_count);
    // alert(item_page_id.value);
    // alert(item_problem_id.length);
    // alert(item_problem_type.length);
    if (item_problem_count == 0 || item_page_id.length == 0 || item_problem_id.length == 0 || item_problem_type.length == 0) { alert("页面错误"); return; }

    if (answer[item_page_id.value] == null) { alert("未收录该作业答案"); return; }

    var problem_count = item_problem_count;
    var problem_answer = answer[item_page_id.value].split(",");
    //var problem_id = item_problem_id.value.split(",");
    //var problem_type = item_problem_type.value.split(",");

    if (problem_answer.length != problem_count) { alert("答案与题数不符，请检查"); return; }

    var collection = document.querySelectorAll('[name*="stem"]');

    alert(document.querySelectorAll('[name*="stem"]').length);
    let i = 0;
    let j = 0;
for(;j<problem_answer.length;j++){
    if(problem_answer[j].length == 1){
        for(;i<collection.length;){
            if (collection[i].type == "radio" && collection[i].value == problem_answer[j] ) {
                collection[i].checked = true;
                console.log("Answer %d %s match no.%d %s",j,problem_answer[j],i,collection[i].value);
                i = i + 4;
                i = i - i%4;
                break;
            }
            i++;  
        }
    }
    else{
        let m = 0;
        let a = problem_answer[j].split('');
        for(;m<a.length;m++){
            for(;i<collection.length;){
                if (collection[i].type == "checkbox" && collection[i].value == a[m] ) {
                    collection[i].checked = true;
                    console.log("Answer %d_%d %s match no.%d %s , it is a multiple selection",j,m,a[m],i,collection[i].value);
                    i++;
                    break;
                }
                i++;  
            }
        }
    }
}


    // for (var i = 0; i < Math.min(problem_answer.length, problem_count); i++) {
    //     if (problem_type[i] == '1') {
    //         ajax_answer(i,problem_answer[i]);
    //     } else {
    //         var box = document.getElementsByClassName("multibox"+problem_id[i])
    //         for (var c = 0, it = 0; c < box.length; ++c){
    //             if(problem_answer[i][it] == box[c].value) {
    //                 ++it;
    //                 box[c].checked = true;
    //             }
    //         }
    //         ajax_multi_answer(i,problem_answer[i]);
    //     }
    // }
    
}
