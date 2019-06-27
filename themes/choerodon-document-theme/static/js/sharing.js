function IsPC() {
  for (
    var e = navigator.userAgent,
      s = new Array(
        'Android',
        'iPhone',
        'SymbianOS',
        'Windows Phone',
        'iPad',
        'iPod',
      ),
      t = !0,
      o = 0;
    o < s.length;
    o++
  )
    if (0 < e.indexOf(s[o])) {
      t = !1;
      break;
    }
  return t;
}
var isPC = IsPC();
$('.navbar-collapse .select').on('click', function() {
  $(this)
    .next('.select-menu')
    .toggleClass('none block');
}),
  $('#navbar-collapse-bg').on('click', function(e) {
    $(e.target).hasClass('navbar-collapse-bg') &&
      $('.navbar-buttons button').trigger('click');
  }),
  $('.navbar-buttons button').on('click', function() {
    $('#navbar-collapse-bg').toggleClass('none block'),
      $('#select-menu').hasClass('block') &&
        $('#select-menu').toggleClass('none block');
  }),
  jQuery('.navbar-collapse .haschildren').hover(
    function(e) {
      $(this)
        .children('ul')
        .toggleClass('none block');
    },
    function(e) {
      $(this)
        .children('ul')
        .removeClass('block');
    },
  );
var topValue = $(window).scrollTop(),
  interval = null;
function isScrolling() {
  document.documentElement.scrollTop == topValue &&
    (navStatusTop
      ? 0 != $(window).scrollTop() &&
        ($('#navbar').removeClass('top-nav'),
        $('#navbar').addClass('fixed-nav'),
        (navStatusTop = !1))
      : 0 == $(window).scrollTop() &&
        'true' != $('.navbar-buttons button').attr('aria-expanded') &&
        1 != $('.navbar-left-buttons button.open').length &&
        ($('#navbar').removeClass('fixed-nav'),
        $('#navbar').addClass('top-nav'),
        (navStatusTop = !0)),
    clearInterval(interval),
    (interval = null));
}
if (
  ((document.onscroll = function() {
    null == interval && (interval = setInterval('isScrolling()', 100)),
      (topValue = document.documentElement.scrollTop);
  }),
  0 == $(window).scrollTop())
) {
  var navStatusTop = !0;
  $('#navbar').removeClass('fixed-nav'), $('#navbar').addClass('top-nav');
} else {
  navStatusTop = !1;
  $('#navbar').removeClass('top-nav'), $('#navbar').addClass('fixed-nav');
}
function calRem() {
  var e = remWidth,
    s = e / 14.4;
  return e < 768 && (s = e / 3.75), s;
}
jQuery(document).ready(function() {
  function e() {
    1 == $('.navbar-left-buttons').children('button.open').length
      ? ($('.navbar-left-buttons')
          .children('button')
          .removeClass('open'),
        $('.docs').css('left', '-' + $('.docs-menu').css('min-width')))
      : ($('.navbar-left-buttons')
          .children('button')
          .addClass('open'),
        $('.docs').css('left', '0'));
  }
  jQuery('.navbar-buttons').on('click', function() {
    1 == $('.navbar-left-buttons button.open').length && e();
  }),
    jQuery('.navbar-left-buttons').on('click', function() {
      'true' == $('.navbar-buttons button').attr('aria-expanded') &&
        $('.navbar-buttons button').trigger('click'),
        e();
    });
}),
  jQuery(document).ready(function() {
    jQuery('.icon-wechat-footer').hover(
      function(e) {
        if (768 <= remWidth) {
          var s = calRem(),
            t = $('.wechat-hover'),
            o = t.children('img'),
            n = $(this).offset().top - parseInt(t.css('height')) - 20,
            i =
              document.documentElement.clientWidth / 2 -
              parseInt(t.css('width')) +
              2.5 * parseInt($(this).css('margin-left'));
          o.attr('src', o.attr('data-src')),
            t
              .css('display', 'block')
              .css('top', n / s + 'rem')
              .css('left', i / s + 'rem')
              .fadeIn('fast');
        }
      },
      function() {
        768 <= remWidth && $('.wechat-hover').css('display', 'none');
      },
    ),
      $('.social .load-img>img').on('load', function() {
        $(this)
          .parent('.load-img')
          .children("[data-loader='circle']")
          .attr('data-loader', '');
      }),
      jQuery('.icon-sina-footer').hover(
        function(e) {
          if (768 <= remWidth) {
            var s = calRem(),
              t = $('.sina-hover'),
              o = t.children('img'),
              n = $(this).offset().top - parseInt(t.css('height')) - 20,
              i =
                $(this).offset().left -
                parseInt(t.css('width')) / 2 +
                parseInt($(this).css('width')) / 2;
            o.attr('src', o.attr('data-src')),
              t
                .css('display', 'block')
                .css('top', n / s + 'rem')
                .css('left', i / s + 'rem')
                .fadeIn('fast');
          }
        },
        function() {
          768 <= remWidth && $('.sina-hover').css('display', 'none');
        },
      ),
      $('.icon-wechat-footer').on('touchstart', function() {
        setTimeout(function() {
          stopBodyScroll(!0),
            $('.black-big-img img').attr(
              'src',
              $('.wechat-hover>img').attr('data-src'),
            ),
            $('.black-big-img').css('display', 'flex');
        }, 300);
      });
  }),
  $('.black-big-img').on('click', function() {
    return (
      $(this).hasClass('n-max') ||
        ($('.black-big-img').css('display', 'none'), stopBodyScroll(!1)),
      !0
    );
  });
var oldTop = 0;
function stopBodyScroll(e) {
  var s = document.body;
  e
    ? ((oldTop = $(window).scrollTop()),
      (s.style.position = 'fixed'),
      (s.style.top = -oldTop + 'px'))
    : ((s.style.position = ''),
      (s.style.oldTop = ''),
      window.scrollTo(0, oldTop));
}
function prai(e) {
  console.log($(this)),
    $.ajax({
      type: 'post',
      url: 'https://share.choerodon.com.cn/video/like/1',
      contentType: 'application/json; charset=utf-8',
      success: function(e) {
        console.log(e), 200 == e.resultCode && alert('SUCCESS');
      },
      error: function(e) {
        console.log(e.responseText);
      },
    });
}
function submsg() {
  var e = $('#namemsg').val(),
    s = $('#topicmsg').val(),
    t = $('#iphoneNumbermsg').val(),
    o = $('#descriptionmsg').val();
  '' == e ||
  '' == s ||
  '' == t ||
  'visible' ==
    $('.err-message')
      .eq(0)
      .css('visibility') ||
  'visible' ==
    $('.err-message')
      .eq(1)
      .css('visibility') ||
  'visible' ==
    $('.err-message')
      .eq(2)
      .css('visibility')
    ? ('' == e &&
        ($('.err-message')
          .eq(0)
          .css('visibility', 'visible'),
        $('.errmsg')
          .eq(0)
          .val('内容不能为空'),
        $('.sign-message')
          .eq(0)
          .css('border-bottom', '1px solid red')),
      '' == t &&
        ($('.err-message')
          .eq(1)
          .css('visibility', 'visible'),
        $('.errmsg')
          .eq(1)
          .val('内容不能为空'),
        $('.sign-message')
          .eq(1)
          .css('border-bottom', '1px solid red')),
      '' == s &&
        ($('.err-message')
          .eq(2)
          .css('visibility', 'visible'),
        $('.errmsg')
          .eq(2)
          .val('内容不能为空'),
        $('.sign-message')
          .eq(2)
          .css('border-bottom', '1px solid red')))
    : $.ajax({
        type: 'post',
        url: 'https://share.choerodon.com.cn/topic/apply',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({
          topic: s,
          description: o,
          iphoneNumber: t,
          name: e,
        }),
        success: function(e) {
          console.log(e),
            200 == e.resultCode && alert('SUCCESS'),
            $('.sign-up').fadeOut(100),
            $('.sign-success').fadeIn(500),
            setTimeout(function() {
              $('.sign-success').fadeOut();
            }, 1500);
        },
        error: function(e) {
          console.log(e.responseText);
        },
      });
}
!(function(e) {
  document.documentElement.clientWidth;
  var s =
      document.documentElement.clientHeight -
      parseInt(e('#navbar').css('height')) -
      parseInt(e('#footer').css('height')),
    t = calRem();
  e('#content').css('min-height', s / t + 'rem');
})(jQuery),
  jQuery('.navbar .global-language').hover(
    function(e) {
      $(this)
        .children('.language-list')
        .css('display', 'block');
    },
    function(e) {
      $(this)
        .children('.language-list')
        .css('display', 'none');
    },
  ),
  jQuery(document).ready(function() {
    isPC &&
      window.location.hash &&
      $('.content-post a').click(function() {
        var e = $('#navigation').css('height');
        $('html, body').animate(
          {
            scrollTop:
              $(decodeURIComponent(window.location.hash)).offset().top -
              e.split('px')[0],
          },
          500,
        );
      });
  }),
  jQuery(document).ready(function() {
    var s = document.getElementById('namemsg');
    s.onchange = function() {
      var e = s.value;
      '' != e.trim()
        ? /^([\u4e00-\u9fa5]{1,20}|[a-zA-Z\s]{1,20})$/.test(e)
          ? ($('.sign-message')
              .eq(0)
              .css('border-bottom', '1px solid #979797'),
            $('.err-message')
              .eq(0)
              .css('visibility', 'hidden'))
          : ($('.err-message')
              .eq(0)
              .css('visibility', 'visible'),
            $('.errmsg')
              .eq(0)
              .val('姓名格式错误'),
            $('.sign-message')
              .eq(0)
              .css('border-bottom', '1px solid red'))
        : ($('.err-message')
            .eq(0)
            .css('visibility', 'visible'),
          $('.errmsg')
            .eq(0)
            .val('内容不能为空'),
          $('.sign-message')
            .eq(0)
            .css('border-bottom', '1px solid red'));
    };
    var t = document.getElementById('iphoneNumbermsg');
    t.onchange = function() {
      var e = t.value;
      '' != e.trim()
        ? /^\d{8}-\d{1,9}$|^\d{11}-\d{1,9}$|^\d{8}$|^\d{11}$/.test(e)
          ? ($('.sign-message')
              .eq(1)
              .css('border-bottom', '1px solid #979797'),
            $('.err-message')
              .eq(1)
              .css('visibility', 'hidden'))
          : ($('.err-message')
              .eq(1)
              .css('visibility', 'visible'),
            $('.errmsg')
              .eq(1)
              .val('请输入正确的手机号码'),
            $('.sign-message')
              .eq(1)
              .css('border-bottom', '1px solid red'))
        : ($('.err-message')
            .eq(1)
            .css('visibility', 'visible'),
          $('.errmsg')
            .eq(1)
            .val('内容不能为空'),
          $('.sign-message')
            .eq(1)
            .css('border-bottom', '1px solid red'));
    };
    var e = document.getElementById('topicmsg');
    (e.onchange = function() {
      '' != e.value.trim()
        ? ($('.sign-message')
            .eq(2)
            .css('border-bottom', '1px solid #979797'),
          $('.err-message')
            .eq(2)
            .css('visibility', 'hidden'))
        : ($('.err-message')
            .eq(2)
            .css('visibility', 'visible'),
          $('.errmsg')
            .eq(2)
            .val('内容不能为空'),
          $('.sign-message')
            .eq(2)
            .css('border-bottom', '1px solid red'));
    }),
      $('.footer-right i').mouseover(function() {
        $(this).attr('class', 'iconfont icon-player-hover1 pull-right'),
          $(this).attr('class', 'iconfont icon-player-hover1 pull-right');
      }),
      $('.footer-right i').mouseout(function() {
        $(this).attr('class', 'iconfont icon-player1 pull-right');
      }),
      $('.praise i').click(function() {
        $(this).attr('class', 'iconfont icon-praised pull-left add-like');
      }),
      $.ajax({
        type: 'get',
        url: 'https://share.choerodon.com.cn/video/query',
        contentType: 'application/json; charset=utf-8',
        success: function(e) {
          for (var s = 0; s < e.length; s++)
            9999 <= e[s].likeNumber
              ? $('#' + e[s].id).val('9999+')
              : $('#' + e[s].id).val(e[s].likeNumber);
        },
        error: function(e) {
          console.log(e.responseText);
        },
      }),
      $('#jion-share').click(function() {
        $('.sign-up').fadeIn(300),
          $('#namemsg').val(''),
          $('#iphoneNumbermsg').val(''),
          $('#topicmsg').val(''),
          $('#descriptionmsg').val(''),
          $('.sign-message')
            .eq(0)
            .css('border-bottom', '1px solid #979797'),
          $('.sign-message')
            .eq(1)
            .css('border-bottom', '1px solid #979797'),
          $('.err-message')
            .eq(0)
            .css('visibility', 'hidden'),
          $('.err-message')
            .eq(1)
            .css('visibility', 'hidden');
      }),
      $('#close-sign').click(function() {
        $('.sign-up').fadeOut(300);
      });
  }),
  $('.add-like').on('click', function(e) {
    var s = $(this).siblings('.like');
    $.ajax({
      type: 'post',
      url: 'https://share.choerodon.com.cn/video/like/' + s.attr('id'),
      contentType: 'application/json; charset=utf-8',
      success: function(e) {
        9999 <= parseInt(s.val()) || s.val(parseInt(s.val()) + 1);
      },
      error: function(e) {
        console.log(e.responseText);
      },
    });
  }),
  jQuery(document).ready(function() {
    $('#tutorial-img .tutorial,.footer-right i').on('click', function(e) {
      if (isPC) {
        var s =
          '//player.bilibili.com/player.html?aid=' +
          $(this).attr('data-aid') +
          '&cid=' +
          $(this).attr('data-cid') +
          '&page=1';
        $('#tutorial-video iframe').attr('src', s),
          $('#tutorial-video').css('display', 'flex');
      } else {
        s = 'https://www.bilibili.com/video/' + $(this).attr('data-src');
        window.location.href = s;
      }
    }),
      $('#tutorial-video').on('click', function(e) {
        ($(e.target).hasClass('bg') || $(e.target).hasClass('icon-guanbi')) &&
          ($('#tutorial-video').css('display', 'none'),
          $('#tutorial-video iframe').attr('src', ''));
      });
  });
