// API：performance，performance 兼容IE9以上的浏览器
// performance.timing统计页面性能
// performance.getEntriesByType('resource') 统计页面资源性能
// chrome 高版本有 firstPaintTime 接口来获取这个耗时，但大部分浏览器并不支持
// 为什么要监控性能呢？因为对于任何一家互联网公司，性能往往与利益直接相关。
// 有数据调查显示：当Google 延迟 400ms时，搜索量下降 0.59%、Bing 延迟 2s，收入下降 4.3%、Yahoo 延迟 400ms，
// 流量下降 5-9%，所以，很多公司在做用户体验分析时，第一个看的就是性能监控指标，在前端领域，性能无非是以下参考指标：
// 白屏时间； （first Paint Time）——用户从打开页面开始到页面开始有东西呈现为止
// 首屏时间； 用户浏览器首屏内所有内容都呈现出来所花费的时间 (可以考虑用加载最慢的图片的时间点 - timing.navigationStart)
// 用户可交互时间； 用户可以进行正常的点击、输入等操作，默认可以统计domready时间，因为通常会在这时候绑定事件操作
// 总下载时间； 总下载时间——页面所有资源都加载完成并呈现出来所花的时间，即页面 onload 的时间
// DNS 查询时间；
// TCP连接时间；
// HTTP请求响应时间；
export default function perf($: $) {
    // 不存在就玩不了, IE9 以上是可以的
    if (!window.performance && !performance.timing) return
    const loadFunc = window.onload
    window.onload = function() {
        setTimeout(() => {
            const perf = window.performance
            const timing = perf.timing
            const perfInfo = {
                dns: timing.domainLookupEnd - timing.domainLookupStart, // DNS查询耗时
                connect: timing.connectEnd - timing.connectStart, // TCP 链接耗时
                whtite: timing.responseStart - timing.navigationStart, // 白屏时间
                domp: timing.domComplete - timing.domInteractive, // 解析 DOM 的时间，是不是嵌套太深了？
                dom: timing.domContentLoadedEventEnd - timing.navigationStart, // dom 渲染完成时间， 可以视作用户可操作时间
                request: timing.responseEnd - timing.responseStart, // request 请求耗时
                onload: timing.loadEventEnd - timing.navigationStart // 总下载时间, 页面 onload 时间
            }
            $.emit({
                type: 'perf',
                date: Date.now(),
                source: location.href,
                content: perfInfo
            })
        }, 100)
        loadFunc && loadFunc.apply(this, arguments)
    }
}
