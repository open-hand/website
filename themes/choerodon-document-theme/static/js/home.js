jQuery(document).ready(function () {
    // 产品特性点击收缩
    $(".product-head").click(function () {
        var detail=$(this).parent(".product-box").children(".product-detail");
        if(detail.find("img[src]").length==0){
            Array.from(detail.find("img[data-src]")).forEach(function (item) {
                $(item).attr("src",$(item).attr("data-src"));
            });
        }
        detail.toggleClass("none block");
    });

    // 案例详情图片加载等待
    $('.product-child>img').on('load', function() {
        $(this).parent(".product-child").children("[data-loader='circle']").attr("data-loader","");
    });

    // 案例hover更换图片
    jQuery('.clients-section .customers a').hover(function (e) {
        $(this).children().children('.title').css("display", "flex");
        $(this).children().children('.content').css("display", "flex");
    }, function (e) {
        $(this).children().children('.title').css("display", "none");
        $(this).children().children('.content').css("display", "none");
    });
});
