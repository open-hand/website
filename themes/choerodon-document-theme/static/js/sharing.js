jQuery(document).ready(function () {
// 	姓名验证
  var Name = document.getElementById('namemsg');
  Name.onchange = function () {
    var Name_reg = /^([\u4e00-\u9fa5]{1,20}|[a-zA-Z\s]{1,20})$/;
    var name_val = Name.value;
    if (name_val.trim() != '') {
      if (Name_reg.test(name_val)) {
        $('.sign-message').eq(0).css('border-bottom', '1px solid #979797');
        $('.err-message').eq(0).css('visibility', 'hidden');
      } else {
        $('.err-message').eq(0).css('visibility', 'visible');
        $('.errmsg').eq(0).val('姓名格式错误');
        $('.sign-message').eq(0).css('border-bottom', '1px solid red');

      }
    } else {
      $('.err-message').eq(0).css('visibility', 'visible');
      $('.errmsg').eq(0).val('内容不能为空');
      $('.sign-message').eq(0).css('border-bottom', '1px solid red');
    }
  };

// 	手机号码验证

  var iphone = document.getElementById('iphoneNumbermsg');

  iphone.onchange = function () {

    var regEx = /^\d{8}-\d{1,9}$|^\d{11}-\d{1,9}$|^\d{8}$|^\d{11}$/;
    var tel = iphone.value;
    if (tel.trim() != '') {
      if (regEx.test(tel)) {
        $('.sign-message').eq(1).css('border-bottom', '1px solid #979797');
        $('.err-message').eq(1).css('visibility', 'hidden');
      } else {
        $('.err-message').eq(1).css('visibility', 'visible');
        $('.errmsg').eq(1).val('请输入正确的手机号码');
        $('.sign-message').eq(1).css('border-bottom', '1px solid red');
      }
    } else {

      $('.err-message').eq(1).css('visibility', 'visible');
      $('.errmsg').eq(1).val('内容不能为空');
      $('.sign-message').eq(1).css('border-bottom', '1px solid red');
    }
  };
//主题不为空验证
  var Topic = document.getElementById('topicmsg');

  Topic.onchange = function () {
    var topicval = Topic.value;
    if (topicval.trim() != '') {
      $('.sign-message').eq(2).css('border-bottom', '1px solid #979797');
      $('.err-message').eq(2).css('visibility', 'hidden');
    } else {

      $('.err-message').eq(2).css('visibility', 'visible');
      $('.errmsg').eq(2).val('内容不能为空');
      $('.sign-message').eq(2).css('border-bottom', '1px solid red');
    }
  };
// 	播放按钮改变
  $('.footer-right i').mouseover(function () {
    $(this).attr('class', 'iconfont icon-player-hover1 pull-right');
    $(this).attr('class', 'iconfont icon-player-hover1 pull-right');
  });
  $('.footer-right i').mouseout(function () {
    $(this).attr('class', 'iconfont icon-player1 pull-right');
  });

// 	报名窗口弹出
  $('#jion-share').click(function () {
    $('.sign-up').fadeIn(300);
    $('#namemsg').val('');
    $('#iphoneNumbermsg').val('');
    $('#topicmsg').val('');
    $('#descriptionmsg').val('');
    $('.sign-message').eq(0).css('border-bottom', '1px solid #979797');
    $('.sign-message').eq(1).css('border-bottom', '1px solid #979797');
    $('.err-message').eq(0).css('visibility', 'hidden');
    $('.err-message').eq(1).css('visibility', 'hidden');

  });

  $('#close-sign').click(function () {
    $('.sign-up').fadeOut(300);
  });
});

function prai(e) {
  console.log($(this));

  $.ajax({

    type: 'post',//方法类型
    url: 'https://share.choerodon.com.cn/video/like/1',//url
    contentType: 'application/json; charset=utf-8',

    success: function (result) {
      console.log(result);//打印服务端返回的数据(调试用)
      if (result.resultCode == 200) {
        alert('SUCCESS');
      }

    },
    error: function (e) {
      console.log(e.responseText);
    },
  });
}

// 	ajax请求

function submsg() {
  var name = $('#namemsg').val();
  var topic = $('#topicmsg').val();
  var iphoneNumber = $('#iphoneNumbermsg').val();
  var description = $('#descriptionmsg').val();

  if (name == '' || topic == '' || iphoneNumber == '' || $('.err-message').eq(0).css('visibility') == 'visible' || $('.err-message').eq(1).css('visibility') == 'visible' || $('.err-message').eq(2).css('visibility') == 'visible') {

    if (name == '') {
      $('.err-message').eq(0).css('visibility', 'visible');
      $('.errmsg').eq(0).val('内容不能为空');
      $('.sign-message').eq(0).css('border-bottom', '1px solid red');
    }
    if (iphoneNumber == '') {
      $('.err-message').eq(1).css('visibility', 'visible');
      $('.errmsg').eq(1).val('内容不能为空');
      $('.sign-message').eq(1).css('border-bottom', '1px solid red');
    }
    if (topic == '') {
      $('.err-message').eq(2).css('visibility', 'visible');
      $('.errmsg').eq(2).val('内容不能为空');
      $('.sign-message').eq(2).css('border-bottom', '1px solid red');
    }

  } else {

    $.ajax({
      type: 'post',//方法类型
      url: 'https://share.choerodon.com.cn/topic/apply',//url
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify({
        'topic': topic,
        'description': description,
        'iphoneNumber': iphoneNumber,
        'name': name,
      }),
      success: function (result) {
        console.log(result);//打印服务端返回的数据(调试用)
        if (result.resultCode == 200) {
          alert('SUCCESS');
        }
        $('.sign-up').fadeOut(100);
        $('.sign-success').fadeIn(500);
        setTimeout(function () {
          $('.sign-success').fadeOut();
        }, 1500);

      },
      error: function (e) {
        console.log(e.responseText);
      },
    });

  }

}
