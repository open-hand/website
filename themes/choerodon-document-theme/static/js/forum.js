var communitySite="http://forum.choerodon.io";
var listLength = 7;

Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
  if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};

$(document).ready(function() {
    getData("latest");
});

$("#latest-btn,#hotest-btn").click(function() {
    $("table").remove();
    $("div#error").remove();
    $(this).addClass("choose").siblings().removeClass("choose");
});

$("#latest-btn").click(function() {
    getData("latest");
});

$("#hotest-btn").click(function() {
    getData("top");
});

function getData(source) {
    $("#forum").append("<div class='all-load'></div>");
    var $result=$("<table>");
    var $title=$("<tr style='border-bottom: 2px solid #ddd;'>");
    $title.append("<td class='td1'>用户</td>");
    $title.append("<td class='td2'>主题</td>");
    $title.append("<td class='td3'>回复</td>");
    $title.append("<td class='td4'>浏览</td>");
    $title.append("<td class='td5'>活动</td>");
    $result.append($title);

    $.getJSON(communitySite+"/"+source+".json",function(data){
        if(data){
            $("table").remove();
            $("div#error").remove();
            var users = data.users;
            var topics = data.topic_list.topics;            
            var icon;
            if(topics.length<7){
                listLength = topics.length;
            }else{
                listLength = 7;
            }
            for (var index=0; index < listLength; index++){
                var userId = topics[index].posters[0].user_id;
                for(var i=0; i<users.length; i++){
                    if(users[i].id===userId){
                        icon="http://forum.choerodon.io/"+users[i].avatar_template.replace("{size}", "32");
                    }
                }
                var time=new Date(topics[index].bumped_at).getTime();
                var now=new Date().getTime();
                var active=(now-time)/(60*60*1000);
                if (active >= 24){
                    (active/24<=7) ? active=Math.round(active/24)+"天前" : active=new Date(topics[index].bumped_at).Format("M月d日");
                } else if (active < 1 ){
                    active=Math.round(active*60)+"分钟前"
                }else {
                    active=Math.round(active)+"小时前"
                }
                var $line = $("<tr onclick=window.open('"+communitySite+"/t/"+topics[index].slug+"/"+topics[index].id+"','_self') style='cursor: pointer;'>");
                $result.append($line);
                var reply=Number(topics[index].posts_count)-1;
                $line.append("<td class='td1'><img src='"+icon+"'></td>");
                $line.append("<td class='td2'>"+ topics[index].title +"</td>");
                $line.append("<td class='td3'>"+ reply +" </td>");
                $line.append("<td class='td4'>"+topics[index].views+"</td>");
                $line.append("<td class='td5'>"+active+"</td>");
            }
            $("div.all-load").remove();
            $("#forum").append($result);
        }
    }).fail(function(){
            $("table").remove();
            $("div#error").remove();
            var $error = $("<div id='error' style='margin-top:40px;'>");
            $error.append("<h3 style='font-size:24px;color:#000;letter-spacing:0;line-height:40px;'>很抱歉！</h3><p style='font-size: 16px; color: #4f5d6c; letter-spacing: 0;'>社区暂时走丢，我们正在全力抢救</p>");
            $("div.all-load").remove();
            $(".community-content").append($error);
    })
}