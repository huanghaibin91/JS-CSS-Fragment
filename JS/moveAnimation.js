// 简单移动动画
function startMove(element, json, t, fn) {
    var flag = true;
    var timer = null;
    clearInterval(element.timer);
    element.timer = setInterval(function () {
        for (var attr in json) {
            var icur = 0;
            if (attr == "opacity") {
                icur = Math.round(parseFloat(getStyle(element, attr)) * 100);
            } else {
                icur = parseInt(getStyle(element, attr));
            }
            var speed = (json[attr] - icur) / 5;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            if (icur != json[attr]) {
                flag = false;
            }
            if (attr == "opacity") {
                element.style.opacity = (icur + speed) / 100;
                element.style.filter = "alpha(opacity:" + "icur+speed" + ")";
            } else {
                element.style[attr] = icur + speed + "px"; //非标准属性值，后不用点号链接，将属性值放入中括号里
            }
        }
        if (flag) {
            clearInterval(element.timer);
            if (fn) {
                fn();
            }
        }
    }, t)
}