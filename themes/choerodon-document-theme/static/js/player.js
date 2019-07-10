jQuery(document).ready(function () {
  //教程播放

  console.log('player');
  $('#tutorial-img .tutorial,.footer-right i').on('click', function (e) {
    if (isPC) {
      var src =
        '//player.bilibili.com/player.html?aid=' +
        $(this).attr('data-aid') +
        '&cid=' +
        $(this).attr('data-cid') +
        '&page=1';
      $('#tutorial-video iframe').attr('src', src);
      $('#tutorial-video').css('display', 'flex');
    } else {
      var src = 'https://www.bilibili.com/video/' + $(this).attr('data-src');
      window.location.href = src;
    }
  });
  $('#tutorial-video').on('click', function (e) {
    if ($(e.target).hasClass('bg') || $(e.target).hasClass('icon-guanbi')) {
      $('#tutorial-video').css('display', 'none');
      $('#tutorial-video iframe').attr('src', '');
    }
  });

});
