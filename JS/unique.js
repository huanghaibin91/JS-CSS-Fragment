// 数组去重
var unique1 = function (array) {
    var result = [];
    for (var i = 0, len = array.length; i < len; i++) {
        var current = array[i];
        if (res.indexOf(current) === -1) {
            res.push(current)
        }
    }
    return res;
}

var unique2 = function (array) {
    var result = array.filter(function (item, index, array) {
        return array.indexOf(item) === index;
    }); 
    return result;
}

var unique3 = function (array) {
    // return Array.from(new Set(array));
    return [...new Set(array)];
}