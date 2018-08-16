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
$("#version").on("click", function () {
    $("#select-menu").toggleClass("none block");
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
    $(this).children('ul').toggleClass("none block");
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

// home
jQuery(document).ready(function () {
    //文档教程播放
    $('#tutorial-img .tutorial').on('click', function (e) {
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
    // 案例hover更换图片
    jQuery('.clients-section .customers a').hover(function (e) {
        $(this).children().children('.title').css("display", "flex");
        $(this).children().children('.content').css("display", "flex");
    }, function (e) {
        $(this).children().children('.title').css("display", "none");
        $(this).children().children('.content').css("display", "none");
    });
});
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
    // 文档页移动端左侧导航栏点击空白-导航收回
    $('.docs-post').on('click', function () {
        if ($('.docs').css('left') == '0px') {
            $('.navbar-left-buttons').children('button').removeClass('open');
            $('.docs').css('left', '-' + $('.docs-menu').css('min-width'));
        }
    })
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
// docsmenu
jQuery(document).ready(function () {
    var wHeight = document.documentElement.clientHeight;//window 
    var dHeight = document.documentElement.offsetHeight;//整个文档高度
    $(window).scroll(function () {
        menuChangeHeight();
    });
    //   文档菜单栏高度动态调整
    function menuChangeHeight() {
        var rem = calRem();
        var marginHeight = parseInt($('.content-post').css('margin-top')) + parseInt($('.content-post').css('margin-bottom'))//正文上下边距
        var navHeight = parseInt($('.navbar').css('height'));//浮动导航栏高度
        var footHeight = parseInt($('#footer').css('height'));//页脚高度
        var contentHeight = parseInt($('.content-post').css('height'));
        var searchHeight = parseInt($('.search').css('height')) + parseInt($('.search').css('margin-top')) + parseInt($('.search').css('margin-bottom')); //搜索框高度

        var menuHeight = wHeight - marginHeight - navHeight - searchHeight;

        //初始化菜单高度
        if (menuHeight > contentHeight) {
            // 若内容区域小于菜单栏高度
            menuHeight = contentHeight;
        }
        $('#article-nav-ul').css({ "max-height": menuHeight / rem + "rem" });

        // 是否触摸到footer
        var menuStopHeight = dHeight - footHeight - wHeight;
        if ($(window).scrollTop() >= menuStopHeight) {
            var menuHeightA = menuHeight;
            menuHeight = menuHeightA - ($(window).scrollTop() - menuStopHeight);
            $('#article-nav-ul').css({ "max-height": menuHeight / rem + "rem" });
        }

        // 当滚动的右侧标题处于隐藏高度内时滚动滚动条显示
        if ($('#article-nav-ul .article-active').length != 0) {
            if ($('#article-nav-ul .article-active').position().top >= parseInt($('#article-nav-ul').css('height'))) {
                $('#article-nav-ul').scrollTop($('#article-nav-ul .article-active').position().top);
            } else if ($('#article-nav-ul .article-active').position().top <= 0) {
                var percentage = $('#article-nav-ul').scrollTop() - $('#article-nav-ul .article-active').height();
                $('#article-nav-ul').scrollTop(percentage);
            }
            if ($(window).scrollTop() <= 0) {
                $('#article-nav-ul').scrollTop(0);
            }
        }
    }
    // 初始化页面菜单栏高度
    menuChangeHeight();
    // 文档页左侧菜单栏收缩图标点击事件
    jQuery('.docs-menu .dd-item.haschildren>div').on('click', function () {
        var thisI = $(this).children("i");
        if (thisI.hasClass('caret-right')) {
            thisI.toggleClass("icon-arrow-up icon-arrow-down")
            thisI.removeClass('caret-right')
            thisI.addClass('caret-down')
        } else {
            thisI.toggleClass("icon-arrow-up icon-arrow-down")
            thisI.removeClass('caret-down')
            thisI.addClass('caret-right')
        }
        $(this).parent().children('ul').toggle();
    });
    // 文档页左侧菜单栏收缩图标点击事件 结束
    jQuery('.docs-menu .dd-item.haschildren>div a').on('click', function () {
        var thisI = $(this).nextAll("i:first");
        if (thisI.hasClass('caret-right')) {
            thisI.toggleClass("icon-arrow-up icon-arrow-down")
            thisI.removeClass('caret-right')
            thisI.addClass('caret-down')
        } else {
            thisI.toggleClass("icon-arrow-up icon-arrow-down")
            thisI.removeClass('caret-down')
            thisI.addClass('caret-right')
        }
        $(this).parent().parent().children('ul').toggle();
    });
    // footer 微信、微博二维码
    jQuery('.wechat').hover(function (e) {
        var wWidth = remWidth;
        if (wWidth >= 768) {
            var rem = calRem();
            var top = $('.wechat').offset().top - parseInt($(".wechat-hover").css("height")) - 20;
            var left = document.documentElement.clientWidth / 2 - parseInt($('.wechat-hover').css("width")) + parseInt($('.wechat').css("margin-left"));
            $('.wechat-hover').css("display", "block").css("top", top / rem + "rem").css("left", left / rem + "rem").fadeIn("fast");
        }
    }, function () {
        var wWidth = remWidth;
        if (wWidth >= 768) {
            $('.wechat-hover').css("display", "none");
        }
    });

    jQuery('.sina').hover(function (e) {
        var wWidth = remWidth;
        if (wWidth >= 768) {
            var rem = calRem();
            var top = $('.sina').offset().top - parseInt($(".sina-hover").css("height")) - 20;
            var left = $('.sina').offset().left - parseInt($('.sina-hover').css("width")) / 2 + parseInt($('.sina').css("width")) / 2;
            $('.sina-hover').css("display", "block").css("top", top / rem + "rem").css("left", left / rem + "rem").fadeIn("fast");
        }
    }, function () {
        var wWidth = remWidth;
        if (wWidth >= 768) {
            $('.sina-hover').css("display", "none");
        }
    });

    // footer 微信移动端动态效果
    $('.wechat').on('touchstart', function () {
        setTimeout(function () {
            stopBodyScroll(true);
            $('.black-big-img img').attr('src', $(".wechat-hover").attr("src"));
            $('.black-big-img').css('display', 'flex');
        }, 300)
    })

    // 社区页面动态效果
    jQuery('.social-img').hover(function (e) {
        var wWidth = remWidth;
        if (wWidth >= 768) {
            if ($(this).attr('data-hover')) {
                $(this).children('img').attr('src', $(this).attr('data-hover-url'));
            }
        }
    }, function () {
        var wWidth = remWidth;
        if (wWidth >= 768) {
            $(this).children('img').attr('src', $(this).attr('data-img-url'));
        }
    });
    // 社区页面移动端动态效果
    var startPointTop, endPointTop;
    $('.social-single').on('touchstart', function () {
        startPointTop = $(window).scrollTop();
    })
    $('.social-single').on('touchend', function () {
        endPointTop = $(window).scrollTop();
        if (startPointTop == endPointTop) {
            if (!$(this).attr('href')) {
                var thisObj = $(this);
                setTimeout(function () {
                    stopBodyScroll(true);
                    var imgSrc = thisObj.find('.social-img').attr('data-hover-url');
                    $('.black-big-img img').attr('src', imgSrc);
                    $('.black-big-img').css('display', 'flex');
                }, 300)
            }
        }
    })

});

/*文档右侧文章标题导航*/
/*导航菜单生成*/
var ahtml = "";
$(document).ready(function () {
    if (document.getElementById("article-nav-ul")) {
        if ($(window).width() >= 768) {
            $(".content-post h2").each(function () {
                ahtml = ahtml + "<li id='id-" + $(this).attr("id") + "' href='#" + $(this).attr("id") + "'><a class='sec' >" + $(this).text() + "</a></li>";
            })
            document.getElementById("article-nav-ul").innerHTML = ahtml;
        }
    }
})

/**
 * 右侧菜单栏滚动效果
 */
$(document).ready(function () {
    $("#article-nav-ul li").click(function (e) {
        $("h1,h2").each(function () {
            $("#id-" + $(this).attr("id")).addClass("article-active");
            $("#id-" + $(this).attr("id")).removeClass("article-active");
        });
        var articlenav = $('.article-menu li');
        $('html, body').animate({
            scrollTop: $('[id="' + $.attr(this, 'href').substr(1) + '"]').offset().top - 87
        }, 500, function () {
            if (!$('#' + e.currentTarget.attributes.id.nodeValue).hasClass("article-active")) {

                for (var i = 0; i < articlenav.length; i++) {
                    articlenav[i].classList.remove("article-active");
                }
                $('#' + e.currentTarget.attributes.id.nodeValue).addClass("article-active");
            }
        });
    });
});

/**
 * 右侧菜单跟随滚动
 */
$(document).ready(function () {
    if ($(window).width() >= 768) {
        var articlenav = $('.article-menu li ');
        $(window).scroll(function () {
            $("h1,h2").each(function () {
                var dis = $(this).offset().top - $(window).scrollTop();
                if (dis < 120) {
                    for (var i = 0; i < articlenav.length; i++) {
                        articlenav[i].classList.remove("article-active");
                    }
                    var currentId = $(this)[0].id;
                    $("#id-" + currentId).addClass("article-active");
                }
            })
        });
    }
})

/**
 * 文档、博客详情图片点击放大
 */
$('.blog-single-body img').on('click', function () {
    if (!$(this).hasClass("n-max")) {
        stopBodyScroll(true);
        $('.black-big-img').css('display', 'flex');
        var imgSrc = $(this).attr('src');
        $('.black-big-img img').attr('src', imgSrc);
    }
    return true;
});
$('.black-big-img').on('click', function () {
    if (!$(this).hasClass("n-max")) {
        $('.black-big-img').css('display', 'none');
        stopBodyScroll(false);
    }
    return true;
});
$('.docs-post img').on('click', function () {
    if (!$(this).hasClass("n-max")) {
        stopBodyScroll(true);
        $('.black-big-img').css('display', 'flex');
        var imgSrc = $(this).attr('src');
        $('.black-big-img img').attr('src', imgSrc);
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

// 博客,文档页内容最小高度设置
(function ($) {
    var wWidth = document.documentElement.clientWidth;
    var wHeight = document.documentElement.clientHeight;//window
    var headerHeight = parseInt($('#navbar').css('height'));//页眉高度
    var footHeight = parseInt($('#footer').css('height'));//页脚高度
    var contentHeight = wHeight - headerHeight - footHeight;

    var rem = calRem();
    $('#content').css("min-height", contentHeight / rem + "rem");

})(jQuery);

// 移动端案例轮播
$(function () {
    var imglength;
    if ($('.customers-mobile').length == 1) { //首页
        imglength = $('.customers-box-mobile').find('.mo-padding').length
        $('.customers-box-mobile').css('width', imglength + '00%');
        if (remWidth < 768) {
            cardBanner('customers-box-mobile')
        }
    } else if ($('.case-studies-content').length == 1) { //案例
        if (remWidth < 768) {
            cardBanner('case-studies-content-box-mobile')
        }
    }
})
function cardBanner(bannerImgBox) {
    var banner_img_box = $("." + bannerImgBox);
    var imglist = banner_img_box.find('.mo-padding');
    var imglength = imglist.length;
    banner_img_box.css('width', imglength + '00%')
    var imgWidth = banner_img_box.find('.mo-padding:first').width();
    var imgLeft = banner_img_box.find('.mo-padding:first').offset().left;
    var num = 0;
    // 初始化手指坐标点
    var startPoint = 0;
    var startEle = 0;
    var startPointLeft = 0;
    var startPointTop = 0;
    var movePointTop = 0;
    var movePointLeft = 0;
    var moveEle = 0;
    //自动变换封装函数
    function auto() {
        autochange = setInterval(function () {
            if (num == imglength - 1) {
                num = 0;
            } else {
                num = num + 1;
            }
            go(num);
        }, 10000)
    }
    //自动变换
    auto();
    /*改变函数 ------ 跳到哪*/
    function go(num) {
        var firstLeft = imgWidth + imgLeft / 2;
        if (num == 1) {
            banner_img_box.animate({
                left: -firstLeft * num
            }, 300)
        } else if (num == imglength - 1) {
            banner_img_box.animate({
                left: -(firstLeft + (imgWidth + imgLeft) * (num - 1) - imgLeft / 2)
            }, 300)
        } else {
            banner_img_box.animate({
                left: -(firstLeft + (imgWidth + imgLeft) * (num - 1))
            }, 300)
        }
    }
    //手指按下
    var isDown = false;
    banner_img_box.on("touchstart", function (e) {
        startPoint = e.changedTouches[0].pageX;
        startEle = banner_img_box.offset().left;
        startPointLeft = e.changedTouches[0].clientX;
        startPointTop = e.changedTouches[0].clientY;
        clearInterval(autochange);
        auto();
        isDown = true;
    });
    //手指滑动
    banner_img_box.on("touchmove", function (e) {
        movePointLeft = e.changedTouches[0].clientX;
        movePointTop = e.changedTouches[0].clientY;
        if (isDown && Math.abs(movePointTop - startPointTop) < Math.abs(movePointLeft - startPointLeft)) {
            isDown = false;
            moveEle = banner_img_box.offset().left;
            // 判断左滑、右滑
            if (movePointLeft < startPointLeft) { //右滑
                num = num + 1;
            } else if (movePointLeft > startPointLeft) {
                num = num - 1;
            }
            num = num > (imglength - 1) ? 0 : num;
            num = num < 0 ? imglength - 1 : num;
            go(num);
            clearInterval(autochange);
            auto();
        } else {
            isDown = false
        }
    });
}
// 博客分享
$('.share-title').on('click', function () {
    if ($('.share-box').hasClass('active')) {
        $('.share-box').removeClass('active')
        setTimeout(function () {
            $('.share-box span').css('display', 'none')
        }, 500)
    } else {
        $('.share-box').addClass('active')
        $('.share-box span').css('display', 'inline-block')
    }
});
var ShareTip = function () { }
//分享到新浪微博
ShareTip.prototype.sharetosina = function (title, url) {
    var sharesinastring = 'http://v.t.sina.com.cn/share/share.php?title=' + title + '&url=' + url + '&content=utf-8&sourceUrl=' + url;
    window.open(sharesinastring, 'newwindow', 'height=400,width=400,top=100,left=100');
}

$('.shareSina').on('click', function () {
    var shareTitle = $('.blog-single-head h1').text();
    var shareContent = $('.blog-single-head h2').text();
    var imgSrc = $(this).attr('data-click-url');
    var share = new ShareTip();
    share.sharetosina(shareTitle + "  " + shareContent, imgSrc);
})

//分享到微信
$('.shareWX').on('click', function () {
    var imgSrc = $(this).attr('data-click-url');
    $('.share-wx-alert').css('display', 'flex');
    //生成二维码
    $("#wxCode").empty().qrcode({
        render: 'canvas', //table方式
        text: imgSrc //任意内容
    });
})
$('.wx-box-close').on('click', function () {
    $('.share-wx-alert').css('display', 'none');
})
$('.share-wx-alert').on('click', function () {
    $('.share-wx-alert').css('display', 'none');
})


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
        var navHeight = $("#navigation").css("height");
    
        $("html, body").animate({ scrollTop: $(decodeURIComponent(window.location.hash)).offset().top - navHeight.split("px")[0] }, 500);
    }
});

// 首页
jQuery(document).ready(function () {
    $(".product-head").click(function () {
        $(this).parent(".product-box").children(".product-detail").toggleClass("none block");
    });
});
// 首页 end