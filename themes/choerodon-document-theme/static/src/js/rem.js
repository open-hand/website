;
var remWidth = document.documentElement.clientWidth;
(function (win) {
    var doc = win.document;
    var docEl = doc.documentElement;
    var tid;

    function refreshRem() {
        var width = document.documentElement.clientWidth;
        remWidth = width;
        var rem = width / 14.4;
        if(width < 768){
            rem = width / 3.75;
        }
        docEl.style.fontSize = rem + 'px';
    }

    win.addEventListener('resize', function () {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 10);
    }, false);
    win.addEventListener('pageshow', function (e) {
        if (e.persisted) {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 10);
        }
    }, false);

    refreshRem();
})(window);