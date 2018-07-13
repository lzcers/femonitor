export default function resource($: $) {
    // 资源加载报错是不会冒泡的，所以 onerror 捕捉不到，需要在捕获阶段处理
    window.addEventListener(
        'error',
        function(err) {
            // 资源加载类错误的 target 不是 window
            if (err.target == window) return
            const errInfo = {
                type: 'resource',
                date: new Date().getTime(),
                source: err.target.currentSrc,
                content: {
                    class: err.target.localName,
                    message: 'load error.'
                }
            }
            $.emit(errInfo)
        },
        true
    )
}
