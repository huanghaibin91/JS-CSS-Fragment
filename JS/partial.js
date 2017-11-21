// 偏函数
// 局部应用则是固定一个函数的一个或者多个参数，也就是将一个 n 元函数转换成一个 n - x 元函数
// 即函数先传入固定传入的参数然后返回一个函数，再传入其不一样的参数，返回结果，减少重复参数的输入
var partial = function (fn) {
    var args = [].slice.call(arguments, 1);
    return function () {
        var newArgs = args.concat([].slice.call(arguments));
        return fn.apply(this, newArgs);
    };
}