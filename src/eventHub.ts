export default class EHub implements EventHub {
    logs: Log[] = []
    reportUrl: string = 'monitor.ftoul.com'
    repProcess: number
    // 运行插件，并把插件存到 plugins 里面
    // todo: 同一个插件不让挂载多次
    mount(monitor: MonitorFunc): boolean {
        try {
            monitor({
                emit: (msg: Msg) => this.emit(msg)
            })
        } catch (err) {
            console.log('插件加载失败: ' + err)
            return false
        }
        return true
    }
    emit(msg: Msg) {
        // todo: post / get 上报
        this.logs.push({
            id: msg.date + Math.floor(Math.random() * 100000),
            userAgent: navigator.userAgent || '',
            lang: navigator.language || '',
            ...msg
        })
        // 500ms 延迟，如果期间多次触发就合并上报
        if (this.repProcess) {
            clearTimeout(this.repProcess)
            this.repProcess = setTimeout(() => this.reportToServerByImg(), 500)
        } else {
            this.repProcess = setTimeout(() => this.reportToServerByImg(), 500)
        }
    }
    // 通过图片上报数据（可跨域）
    reportToServerByImg() {
        // todo: 日志太多分片上传
        const error = JSON.stringify(this.logs)
        const img = new Image()
        img.src = this.reportUrl + '?m=' + error
        // 完了清空 logs 队列
        this.logs = []
    }
}
