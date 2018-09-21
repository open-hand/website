jQuery(document).ready(function () {
    //教程播放
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
    // 移动端左侧导航栏点击空白-导航收回
    $('.docs-post').on('click', function () {
        if ($('.docs').css('left') == '0px') {
            $('.navbar-left-buttons').children('button').removeClass('open');
            $('.docs').css('left', '-' + $('.docs-menu').css('min-width'));
        }
    })
    var wHeight = document.documentElement.clientHeight;//window 
    var dHeight = document.documentElement.offsetHeight;//整个文档高度
    $(window).scroll(function () {
        menuChangeHeight();
    });
    // docsmenu
    // 菜单栏高度动态调整
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

    /*文档右侧文章标题导航*/
    /*导航菜单生成*/
    var ahtml = "";
    if (document.getElementById("article-nav-ul")) {
        if ($(window).width() >= 768) {
            $(".content-post h2").each(function () {
                ahtml = ahtml + "<li id='id-" + $(this).attr("id") + "' href='#" + $(this).attr("id") + "'><a class='sec' >" + $(this).text() + "</a></li>";
            })
            document.getElementById("article-nav-ul").innerHTML = ahtml;
        }
    }

    /**
     * 右侧菜单栏滚动效果
     */
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

    /**
     * 右侧菜单跟随滚动
     */
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
    /**
     * 详情图片点击放大
     */
    $('.docs-post img').on('click', function () {
        if (!$(this).hasClass("n-max")) {
            stopBodyScroll(true);
            $('.black-big-img').css('display', 'flex');
            var imgSrc = $(this).attr('src');
            $('.black-big-img img').attr('src', imgSrc);
        }
        return true;
    });
});

// UI文档代码块点击事件
$(".code-expand-icon").on("click", function (e) {
    $(this).parent().parents(".code-box").children(".code-box-code").toggleClass("none block");
    
})