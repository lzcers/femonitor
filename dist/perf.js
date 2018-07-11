// API：performance，performance 兼容IE9以上的浏览器
// performance.timing统计页面性能
// performance.getEntriesByType('resource') 统计页面资源性能
// 统计白屏时间: 需要在 head 标签开始和结束处打点
// chrome 高版本有 firstPaintTime 接口来获取这个耗时，但大部分浏览器并不支持
function perf($) {
    const perf = window.performance;
    const timing = perf.timing;
    const points = [
        'navigationStart',
        'unloadEventStart',
        'unloadEventEnd',
        'redirectStart',
        'redirectEnd',
        'fetchStart',
        'domainLookupStart',
        'connectStart',
        'requestStart',
        'responseStart',
        'responseEnd',
        'domLoading',
        'domInteractive',
        'domContentLoadedEventEnd',
        'domComplete',
        'loadEventStart',
        'loadEventEnd'
    ];
    if (perf && timing) {
        var arr = [];
        var navigationStart = timing[points[0]];
        for (var i = 0, l = points.length; i < l; i++)
            arr[i] = timing[points[i]] - navigationStart;
    }
    $.emit({
        type: 'perf',
        date: new Date().getTime(),
        source: location.href,
        content: arr
    });
}
