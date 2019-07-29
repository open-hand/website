jQuery(document).ready(function () {
    // 社区页面 二维码动态效果
    if (isPC){
        jQuery('.social-follow-type').hover(function (e) {
            if ($(this).attr('data-hover')){
                $('#social-code').toggleClass('im-none flex');
                var level = getChildrenIndex(this);
                var top = 42 * (level - 1);
                $('#social-code').css('transform','translateY('+ top / 100 +'rem)');
            }
        }, function () {
            if ($(this).attr('data-hover')){
                $('#social-code').toggleClass('im-none flex');
            }
        });
        jQuery('.social-follow-type-left').hover(function (e) {
            if ($(this).attr('data-hover')){
                $('#wechat-code').toggleClass('im-none flex');
                var level = getChildrenIndex(this);
                var top = 42 * (level - 1);
                $('#wechat-code').css('transform','translateY('+ top / 100 +'rem)');
            }
        }, function () {
            if ($(this).attr('data-hover')){
                $('#wechat-code').toggleClass('im-none flex');
            }
        });
    }

    function getChildrenIndex(ele){
        //IE is simplest and fastest
        if(ele.sourceIndex){
            return ele.sourceIndex - ele.parentNode.sourceIndex - 1;
        }
        //other browsers
            var i=0;
            while(ele = ele.previousElementSibling){
            i++;
        }
        return i;
    }


    // 社区页面移动端动态效果
    var startPointTop, endPointTop;
    $('.social-follow-type').on('touchstart', function () {
        startPointTop = $(window).scrollTop();
    })
    $('.social-follow-type').on('touchend', function () {
        endPointTop = $(window).scrollTop();
        if (startPointTop == endPointTop) {
            if (!$(this).attr('href')) {
                var thisObj = $(this);
                setTimeout(function () {
                    stopBodyScroll(true);
                    var imgSrc = thisObj.attr('data-hover');
                    $('.black-big-img img').attr('src', imgSrc);
                    $('.black-big-img').css('display', 'flex');
                }, 300)
            }
        }
    })
});
