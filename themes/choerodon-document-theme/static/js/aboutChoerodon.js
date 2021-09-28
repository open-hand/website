jQuery(document).ready(function () {
  function numAutoPlus(targetEle) {
    // 动画时长(毫秒数)
    // 也可以将需要的参数写在dom上如：[data-XXX]
    let time = $(targetEle).attr('data-time') || 2000;
    // 最终要显示的数字
    let finalNum = $(targetEle).attr('data-value') || 0;
    // 调节器(毫秒数) 改变数字增加速度
    let rate = $(targetEle).attr('data-rate') || 100;
    // 步长
    let step = finalNum / (time / rate);
    // 计数器
    let count = 0;
    // 初始值
    let initNum = 0;
    let timer = setInterval(function() {
      count = count + step;
      if (!count || count >= finalNum) {
        clearInterval(timer);
        count = finalNum
      }
      // t未发生改变的话就直接返回
      // 减少dom操作 提高DOM性能
      let t = Math.floor(count);
      // let t = count.toFixed(1);
      if (t === initNum) return;
      initNum = t;
      $(targetEle).html(initNum);
    }, 30)

  }
  var items = $(".about-choerodon-data-item-value");
  if (items.length) {
    Array.from(items).forEach(function (item) {
      numAutoPlus(item);
    });
  }
});
