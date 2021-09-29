jQuery(document).ready(function () {

// 典型案例点击切换
  $(".cases-section-content-item").click(function () {
    $('.cases-section-content-item').addClass('normal');
    $(this).removeClass('normal');
    // var items = $('.cases-section-content-item-img');
    // if(items.find("img[src]").length==0){
    //   Array.from(items).forEach(function (item) {
    //     if ($(item).attr("src") !== $(item).attr("data-src1")) {
    //       $(item).attr("src",$(item).attr("data-src1"));
    //     }
    //   });
    // }
    $('.cases-section-detail').removeClass("cases-section-detail-block");
    $('.cases-section-detail').addClass("cases-section-detail-none");
    var t = $(this).attr('id');
    // var img = $('#' + t + '-item-img');
    var detail = $('#' + t + '-detail');
    // if (img) {
    //   img.attr("src",img.attr("data-src2"));
    // }
    if (detail) {
      detail.removeClass("cases-section-detail-none");
      detail.addClass("cases-section-detail-block");
    }
  });
});
