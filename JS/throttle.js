// throttle，节流限制事件的频繁触发
// 节流的原理很简单：如果你持续触发事件，每隔一段时间，只执行一次事件
// 两种主流的实现方式，一种是使用时间戳，一种是设置定时器
function throttle(func, wait, options) {
    var timeout, context, args, result;
    var previous = 0;
    // 参数options的属性：leading：false 表示禁用第一次执行，trailing: false 表示禁用停止触发的回调
    if (!options) {
        options = {};
    }
    var later = function () {
        previous = options.leading === false ? 0 : new Date().getTime();
        timeout = null;
        func.apply(context, args);
        if (!timeout) {
            context = args = null;
        }
    };
    var throttled = function () {
        var now = new Date().getTime();
        if (!previous && options.leading === false) {
            previous = now;
        }
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            func.apply(context, args);
            if (!timeout) {
                context = args = null;
            }
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
    };
    throttled.cancel = function () {
        clearTimeout(timeout);
        previous = 0;
        timeout = null;
    };
    return throttled;
}