jQuery(document).ready(function () {
    // 产品特性点击收缩
    $(".product-head").click(function () {
        $(this).parent(".product-box").children(".product-detail").toggleClass("none block");
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