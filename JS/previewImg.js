// 网页预览图片

// 使用FileReader()实现
var previewImg = function (event, pos, pro) {
    var info = "",
        files = event.target.files,
        type = "default",
        reader = new FileReader();
    if (/image/.test(files[0].type)) {
        reader.readAsDataURL(files[0]);
        type = "image";
    } else {
        reader.readAsText(files[0]);
        type = "text";
    }
    reader.onerror = function () {
        pos.innerHTML = "不能读取文件，错误代码 " + reader.error.code;
    };
    reader.onprogress = function (event) {
        // progress事件属性，lengthComputable、loaded、total
        if (event.lengthComputable) {
            if (pro) {
                // 进度操作
                pro.innerHTML = event.loaded + "/" + event.total;
            }
        }
    };
    reader.onload = function () {
        var html = "";
        switch (type) {
            case "image":
                // reader完成之后的结果为reader.result，可以作为结果储存传递 
                // 如果要给img设置CSS，使用内联style 
                html = "<img src=\"" + reader.result + "\">";
                break;
            case "text":
                html = reader.result;
                break;
        }
        pos.innerHTML = html;
    };
}

// 使用window.URL.createObjectURL实现
var previewImg2 = function (event, pos, pro) {
    var createObjectURL = function (blob) {
        if (window.URL) {
            return window.URL.createObjectURL(blob);
        } else if (window.webkitURL) {
            return window.webkitURL.createObjectURL(blob);
        } else {
            return null;
        }
    };
    var info = "",
        files = event.target.files,
        url = createObjectURL(files[0]); // 此时生成的链接只能这里用一下这个 URL 的生命周期和创建它的窗口中的document 绑定
    if (url) {
        if (/image/.test(files[0].type)) {
            pos.innerHTML = "<img src=\"" + url + "\">";
        } else {
            pos.innerHTML = "所选文件不是图片";
        }
    } else {
        pos.innerHTML = "浏览器不支持 object URLs.";
    }
}