 jQuery(document).ready(function(){
 	
 	
 	
 	
 	$(".sharing-footer i").mouseover(
 		function(){
 			$(this).attr("class","iconfont icon-player-hover1 pull-right");
 			$(this).attr("class","iconfont icon-player-hover1 pull-right")
 			
 		}
 		
 	)
 	$(".sharing-footer i").mouseout(
 		function(){
 			$(this).attr("class","iconfont icon-player1 pull-right")
 		}
 		
 	)
 	
 	$('.sharing-footer i').on('click', function (e) {
        if (isPC){
            var src = "https://v.qq.com/iframe/player.html?vid="+ $(this).attr('data-src') +"&tiny=0&auto=1";
            $('#tutorial-video iframe').attr("src", src);
            $('#tutorial-video').css("display", "flex");
        } else {
            var src = "https://v.qq.com/x/page/" + $(this).attr('data-src')+".html";
            window.location.href=src;
        }
    })
    $('#tutorial-video').on('click', function (e) {
        if ($(e.target).hasClass("bg") || $(e.target).hasClass("icon-guanbi")) {
            $('#tutorial-video').css("display", "none");
            $('#tutorial-video iframe').attr("src", "");
        }
    })
 	
 	$("#jion-share").click(function(){
 		$(".sign-up").css("display","block")
 	})
 	$("#close-sign").click(function(){
 		$(".sign-up").css("display","none")
 	})
 	$(".sign-up .iconfont").click(function(){
 		$(".sign-up").css("display","none")
 	})
 	
 	
// 	ajax请求

 
 	
 })
 

// 	ajax请求
 
function submsg(){
	var name = $("#namemsg").val()
 	var topic = $("#topicmsg").val()
 	console.log( $("#topicmsg").val())
 	var iphoneNumber= $("#iphoneNumbermsg").val()
 	var description = $("#descriptionmsg").val()

	
	            $.ajax({
            //几个参数需要注意一下
                type: "post",//方法类型
                url: "http://microclass.staging.saas.hand-china.com/topic/apply" ,//url
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({
				  "topic": topic,
				  "description": description,
				  "iphoneNumber": iphoneNumber,
				  "name": name,
				}),
                success: function (result) {
                    console.log(result);//打印服务端返回的数据(调试用)
                    if (result.resultCode == 200) {
                        alert("SUCCESS");
                    }
                    ;
                },
                error : function(e) {
                    console.log(e.responseText)
                }
            });

}
 	

 
 

