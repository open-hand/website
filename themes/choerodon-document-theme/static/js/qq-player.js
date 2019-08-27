jQuery(document).ready(function(){
  //教程播放
  $('#tutorial-img .tutorial,.footer-right i').on('click', function (e) {
    if (isPC){
      var src = "https://v.qq.com/txp/iframe/player.html?vid="+ $(this).attr('data-src') +"&tiny=0&auto=1";
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

})