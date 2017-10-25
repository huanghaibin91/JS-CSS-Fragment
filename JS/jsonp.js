// 原生JS封装jsonp
(function (global) {
    var container = document.getElementsByTagName("head")[0];
    // options参数对象包含，url、data对象、callback默认参数response
    function jsonp(options) {
        if (!options || !options.url) {
            return;
        }
        var scriptNode = document.createElement("script"),
            data = options.data || {},
            url = options.url,
            callback = options.callback,
            // 回调函数使用随机串，使每次返回的URL不同，避免返回缓存
            fnName = "jsonp" + parseInt(Math.random() * 10000);
        // 添加回调函数
        data["callback"] = fnName;
        // 拼接url
        var params = [];
        for (var key in data) {
            params.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
        }
        url = url.indexOf("?") > 0 ? (url + "&") : (url + "?");
        url += params.join("&");
        scriptNode.src = url;
        // 传递的是一个匿名的回调函数，要执行的话，暴露为一个全局方法
        global[fnName] = function (ret) {
            callback && callback(ret);
            container.removeChild(scriptNode);
            delete global[fnName];
        }
        // 出错处理
        scriptNode.onerror = function () {
            callback && callback({
                error: "error"
            });
            container.removeChild(scriptNode);
            global[fnName] && delete global[fnName];
        }
        scriptNode.type = "text/javascript";
        container.appendChild(scriptNode)
    }
    global.jsonp = jsonp;
})(this);