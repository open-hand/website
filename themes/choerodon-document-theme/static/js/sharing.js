 jQuery(document).ready(function(){
// 	姓名验证
 	 var Name = document.getElementById('namemsg');
 	 Name.onchange = function(){
 	 	var Name_reg =/^([\u4e00-\u9fa5]{1,20}|[a-zA-Z\s]{1,20})$/;
 	 	var name_val = Name.value;
 	 	if(name_val.trim() != ''){
		if(Name_reg.test(name_val)){
		$(".sign-message").eq(0).css('border-bottom','1px solid #979797')
		}else {
		$('#namemsg').val("");
		$('#namemsg').attr('placeholder','请输入正确的姓名');
		$(".sign-message").eq(0).css('border-bottom','1px solid #CC0000');
		
		}
		}else{
			$('#namemsg').val("");
		$('#namemsg').attr('placeholder','内容不能为空');
		$(".sign-message").eq(0).css('border-bottom','1px solid #CC0000');
		}
 	 }
 	
        
 	
// 	手机号码验证
 	
	var iphone = document.getElementById('iphoneNumbermsg');
	
		iphone.onchange = function (){
			
		var regEx = /^\d{8}-\d{1,9}$|^\d{11}-\d{1,9}$|^\d{8}$|^\d{11}$/;
		var tel = iphone.value;
		if(tel.trim() != ''){
		if(regEx.test(tel)){
		$(".sign-message").eq(1).css('border-bottom','1px solid #979797')
		}else{
		
		$('#iphoneNumbermsg').val("");
		$('#iphoneNumbermsg').attr('placeholder','请输入正确的手机号码');
		$(".sign-message").eq(1).css('border-bottom','1px solid #CC0000');
		}
		}else{
			$('#iphoneNumbermsg').val("");
		$('#iphoneNumbermsg').attr('placeholder','内容不能为空');
		$(".sign-message").eq(1).css('border-bottom','1px solid #CC0000');
		}
		};
 	
// 	播放按钮改变
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
// 	视频窗口弹出
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
// 	报名窗口弹出
 	$("#jion-share").click(function(){
 		$(".sign-up").fadeIn(300);
 		$('#namemsg').val("");
 		$('#iphoneNumbermsg').val("");
 		$('#topicmsg').val("");
 		$('#descriptionmsg').val("");
 		$(".sign-message").eq(0).css('border-bottom','1px solid #979797');
 		$(".sign-message").eq(1).css('border-bottom','1px solid #979797');
 		$('#namemsg').attr('placeholder','请输入姓名');
 		$('#iphoneNumbermsg').attr('placeholder','请输入手机号码');
 		
 	})
 	$("#close-sign").click(function(){
 		$(".sign-up").fadeOut(300)
 	})
 	$(".sign-up .iconfont").click(function(){
 		$(".sign-up").fadeOut(300)
 	})
 	
 	
// 	ajax请求

 
 	
 })
 
	 	
// 	ajax请求
 
function submsg(){
	var name = $("#namemsg").val()
 	var topic = $("#topicmsg").val()
 	var iphoneNumber= $("#iphoneNumbermsg").val()
 	var description = $("#descriptionmsg").val()
 	
 	
 	if(name==""||topic==""||iphoneNumber==""||description==""){
 		
 		alert("请输入完整的信息")
 		
 	}else{
 		
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
            alert('报名成功')
 	}
   

}
 	

 
 

