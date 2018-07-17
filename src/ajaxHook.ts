// 覆写 XMLHttpRequest , Fetch 来劫持 ajax 操作
export default function ajaxHook($: $) {
    // 记录接口请求开始结束
    let ajaxStartTime = 0,
        ajaxEndTime = 0,
        ajaxMethod = '',
        ajaxUrl = '',
        ajaxStatus = 0,
        ajaxStatusText = ''
    const _realXML = XMLHttpRequest
    const _fetch = window.fetch
    XMLHttpRequest = function() {
        this.xhr = new _realXML()
        this.xhr.onreadystatechange = hookXHR
        // 拷贝 XMLHttpRequest 的所有属性
        // 不能用扩展运算符拷贝，因为不会遍历到继承的属性
        for (let attr in this.xhr) {
            Object.defineProperty(this, attr, {
                set: hookSet(attr),
                get: hookGet(attr)
            })
        }
        function hookGet(attr) {
            return function() {
                // hook open 方法保存请求 Method, Url
                if (attr == 'open') {
                    return function(...args) {
                        ajaxMethod = args[0]
                        ajaxUrl = args[1]
                        return this.xhr.open.apply(this.xhr, args)
                    }
                }
                return typeof this.xhr[attr] == 'function'
                    ? this.xhr[attr].bind(this.xhr)
                    : this.xhr[attr]
            }
        }
        function hookSet(attr) {
            if (attr == 'onreadystatechange') {
                return function(fn) {
                    this.xhr.onreadystatechange = function() {
                        setTimeout(function() {
                            hookXHR.call(this)
                            fn.apply(this, arguments)
                        }, 0)
                    }
                }
            }
            return function(f) {
                this.xhr[attr] = f
            }
        }
    } as any

    window.fetch = function(...args) {
        ajaxUrl = args[0]
        const options = args[1]
        if (typeof options == 'object') ajaxMethod = options['method']
        else ajaxMethod = 'GET'
        ajaxStartTime = new Date().getTime()
        return _fetch
            .apply(this, args)
            .then(res => {
                ajaxEndTime = new Date().getTime()
                ajaxStatus = res.status
                if (res.status >= 400) errorReport()
                return res
            })
            .catch(err => {
                ajaxStatusText = 'fetch error:' + err
                errorReport()
                return err
            })
    }
    function hookXHR() {
        switch (this.readyState) {
            // open() 方法已经调用
            case 1:
                ajaxStartTime = new Date().getTime()
                break
            // 请求完成
            case 4:
                ajaxEndTime = new Date().getTime()
                ajaxStatus = this.status
                // 超时上报
                timeoutReport()
                if (this.status >= 400) {
                    ajaxStatusText = this.responseText
                    errorReport()
                }
                break
        }
    }
    function timeoutReport() {
        const time = 500
        if (ajaxEndTime - ajaxStartTime > time)
            $.emit({
                type: 'ajaxTimeout',
                date: new Date().getTime(),
                source: window.location.href,
                content: {
                    method: ajaxMethod,
                    url: ajaxUrl,
                    status: ajaxStatus,
                    time: ajaxEndTime - ajaxStartTime
                }
            })
    }
    function errorReport() {
        $.emit({
            type: 'ajaxError',
            date: new Date().getTime(),
            source: window.location.href,
            content: {
                method: ajaxMethod,
                url: ajaxUrl,
                status: ajaxStatus,
                statusText: ajaxStatusText
            }
        })
    }
}
