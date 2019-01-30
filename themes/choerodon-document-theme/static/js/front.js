//判断是否为PC端
function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");    
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
    }    
    return flag;
}
var isPC = IsPC();


// 导航栏版本选择
$(".navbar-collapse .select").on("click", function () {
	$(this).next(".select-menu").toggleClass("none block");
   
})
// 导航栏版本选择 end
// 移动端导航栏点击隐藏
$("#navbar-collapse-bg").on("click", function (e) {
    if ($(e.target).hasClass("navbar-collapse-bg")) {
        $(".navbar-buttons button").trigger("click");
    }
})
$(".navbar-buttons button").on("click", function () {
    $("#navbar-collapse-bg").toggleClass("none block");
    if ($("#select-menu").hasClass("block")) {
        $("#select-menu").toggleClass("none block");
    }
})
// 移动端导航栏点击隐藏 end
// 导航栏子菜单
jQuery('.navbar-collapse .haschildren').hover(function (e) {
    $(this).children('ul').toggleClass("none block");
}, function (e) {
    $(this).children('ul').removeClass("block");
});
// 导航栏子菜单结束
// 导航栏动态渲染
// 判断滚动结束后渲染导航栏
var topValue = $(window).scrollTop(),// 上次滚动条到顶部的距离  
    interval = null;// 定时器  
document.onscroll = function () {
    if (interval == null)// 未发起时，启动定时器，1秒1执行  

        interval = setInterval("isScrolling()", 100);
    topValue = document.documentElement.scrollTop;
}
function isScrolling() {
    // 判断此刻到顶部的距离是否和1秒前的距离相等  
    if (document.documentElement.scrollTop == topValue) {
        // 首页导航栏变换
        if (navStatusTop) {
            if ($(window).scrollTop() != 0) {
                $('#navbar').removeClass("top-nav");
                $('#navbar').addClass("fixed-nav");
                navStatusTop = false;
            }
        } else {
            if ($(window).scrollTop() == 0 && ("true" != $('.navbar-buttons button').attr("aria-expanded") && $(".navbar-left-buttons button.open").length != 1)) {
                $('#navbar').removeClass("fixed-nav");
                $('#navbar').addClass("top-nav");
                navStatusTop = true;
            }
        }
        clearInterval(interval);
        interval = null;
    }
}
// 初始化页面渲染导航栏
if ($(window).scrollTop() == 0) {
    var navStatusTop = true;
    $('#navbar').removeClass("fixed-nav");
    $('#navbar').addClass("top-nav");
} else {
    var navStatusTop = false;
    $('#navbar').removeClass("top-nav");
    $('#navbar').addClass("fixed-nav");
}
// 导航栏动态渲染结束

// 导航栏
jQuery(document).ready(function () {
    function clickLeftButton() {
        if ($('.navbar-left-buttons').children('button.open').length == 1) {
            $('.navbar-left-buttons').children('button').removeClass('open');
            $('.docs').css('left', '-' + $('.docs-menu').css('min-width'));
        } else {
            $('.navbar-left-buttons').children('button').addClass('open');
            $('.docs').css('left', '0');
        }
    }
    
    // 导航栏点击事件
    jQuery('.navbar-buttons').on('click', function () {
        if ($(".navbar-left-buttons button.open").length == 1) {
            clickLeftButton();
        }

    });
    // 文档页移动端左侧导航栏点击事件
    jQuery('.navbar-left-buttons').on('click', function () {
        if ("true" == $('.navbar-buttons button').attr("aria-expanded")) {
            $('.navbar-buttons button').trigger("click");
        }
        clickLeftButton();
    });
});
function calRem() {
    var wWidth = remWidth;
    var rem = wWidth / 14.4;
    if (wWidth < 768) {
        rem = wWidth / 3.75;
    }
    return rem;
}

jQuery(document).ready(function () {
    // footer 微信、微博二维码
    jQuery('.icon-wechat-footer').hover(function (e) {
        var wWidth = remWidth;
        if (wWidth >= 768) {
            var rem = calRem();
            var hover = $(".wechat-hover");
            var img = hover.children("img");
            var top = $(this).offset().top - parseInt(hover.css("height")) - 20;
            var left = document.documentElement.clientWidth / 2 - parseInt(hover.css("width")) + parseInt($(this).css("margin-left"));
            img.attr("src",img.attr("data-src"));
            hover.css("display", "block").css("top", top / rem + "rem").css("left", left / rem + "rem").fadeIn("fast");
        }
    }, function () {
        var wWidth = remWidth;
        if (wWidth >= 768) {
            $('.wechat-hover').css("display", "none");
        }
    });

    // 二维码图片加载等待
    $('.social .load-img>img').on('load', function() {       
        $(this).parent(".load-img").children("[data-loader='circle']").attr("data-loader","");
    });

    jQuery('.icon-sina-footer').hover(function (e) {
        var wWidth = remWidth;
        if (wWidth >= 768) {
            var rem = calRem();
            var hover = $(".sina-hover");
            var img = hover.children("img");
            var top = $(this).offset().top - parseInt(hover.css("height")) - 20;
            var left = $(this).offset().left - parseInt(hover.css("width")) / 2 + parseInt($(this).css("width")) / 2;
            img.attr("src",img.attr("data-src"));
            hover.css("display", "block").css("top", top / rem + "rem").css("left", left / rem + "rem").fadeIn("fast");
        }
    }, function () {
        var wWidth = remWidth;
        if (wWidth >= 768) {
            $('.sina-hover').css("display", "none");
        }
    });

    // footer 微信移动端动态效果
    $('.icon-wechat-footer').on('touchstart', function () {
        setTimeout(function () {
            stopBodyScroll(true);
            $('.black-big-img img').attr('src', $(".wechat-hover>img").attr("data-src"));
            $('.black-big-img').css('display', 'flex');
        }, 300)
    })

});

/**
 * 详情图片点击放大
 */
$('.black-big-img').on('click', function () {
    if (!$(this).hasClass("n-max")) {
        $('.black-big-img').css('display', 'none');
        stopBodyScroll(false);
    }
    return true;
});
var oldTop = 0;
function stopBodyScroll(isFixed) {
    var bodyEl = document.body;
    if (isFixed) {
        oldTop = $(window).scrollTop();
        bodyEl.style.position = 'fixed';
        bodyEl.style.top = -oldTop + 'px';
    } else {
        bodyEl.style.position = '';
        bodyEl.style.oldTop = '';
        window.scrollTo(0, oldTop); // 回到原先的top
    }
}

// 内容最小高度设置
(function ($) {
    var wWidth = document.documentElement.clientWidth;
    var wHeight = document.documentElement.clientHeight;//window
    var headerHeight = parseInt($('#navbar').css('height'));//页眉高度
    var footHeight = parseInt($('#footer').css('height'));//页脚高度
    var contentHeight = wHeight - headerHeight - footHeight;

    var rem = calRem();
    $('#content').css("min-height", contentHeight / rem + "rem");

})(jQuery);


//中英文切换
jQuery('.navbar .global-language').hover(function (e) {
    $(this).children('.language-list').css("display", "block");
}, function (e) {
    $(this).children('.language-list').css("display", "none");
});
// 中英文切换 结束

// 移除html锚点的移动效果
jQuery(document).ready(function () {
    if (isPC && window.location.hash){
        $(".content-post a").click(function () {
            var navHeight = $("#navigation").css("height");
            $("html, body").animate({ scrollTop: $(decodeURIComponent(window.location.hash)).offset().top - navHeight.split("px")[0] }, 500);
        });
    }
});