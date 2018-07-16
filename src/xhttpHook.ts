function xhttpHook($: $) {
    // 记录接口请求开始结束
    let ajaxStartTime = 0,
        ajaxEndTime = 0
    const _realXML = XMLHttpRequest
    XMLHttpRequest = function() {
        this.xhr = new XMLHttpRequest()
        // 拷贝 XMLHttpRequest 的所有属性
        // 不能用扩展运算符拷贝，因为不会遍历到继承的属性
        for (let attr in this.xhr) {
            this[attr] = this.xhr[attr]
        }
        Object.defineProperty(this, 'onreadystatechange', {
            set: function(fn) {
                this.xhr.onreadystatechange = function() {
                    switch (this.xhr.readyState) {
                        // open() 方法已经调用
                        case 1:
                            console.log('a1')
                            ajaxStartTime = new Date().getTime()
                            break
                        // 请求完成
                        case 4:
                            console.log('a2')
                            ajaxEndTime = new Date().getTime()
                            break
                    }
                    fn.apply(this.xhr, arguments)
                }
            }
        })
    } as any
}
