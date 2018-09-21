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