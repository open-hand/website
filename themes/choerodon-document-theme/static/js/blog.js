/**
 * 详情图片点击放大
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