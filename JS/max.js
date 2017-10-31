// 数组最大值
var max1 = function (array) {
    var result = arr[0];
    for (var i = 1; i < arr.length; i++) {
        result =  Math.max(result, arr[i]);
    }
    return result;
}

var max2 = function (array) {
    return array.reduce(function max(prev, next) {
        return Math.max(prev, next);
    });
}

var max3 = function (array) {
    return Math.max.apply(null, array);
    // return Math.max(...array);
}

var max4 = function (array) {
    return array.sort(function(a, b) {
        return a - b;
    })[array.length -  1];
}