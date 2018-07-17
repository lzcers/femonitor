function xhttpHook($: $) {
    // 记录接口请求开始结束
    let ajaxStartTime = 0,
        ajaxEndTime = 0
    const _realXML = XMLHttpRequest
    XMLHttpRequest = function() {
        this.xhr = new _realXML()
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
                return typeof this.xhr[attr] == 'function'
                    ? this.xhr[attr].bind(this.xhr)
                    : this.xhr[attr]
            }
        }
        function hookSet(attr) {
            if (attr == 'onreadystatechange') {
                return function(fn) {
                    this.xhr.onreadystatechange = function() {
                        switch (this.readyState) {
                            // open() 方法已经调用
                            case 1:
                                ajaxStartTime = new Date().getTime()
                                break
                            // 请求完成
                            case 4:
                                ajaxEndTime = new Date().getTime()
                                break
                        }
                        fn.apply(this, arguments)
                    }
                }
            }
        }
    } as any
}
