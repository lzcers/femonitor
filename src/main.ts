class EHub implements EventHub {
    plugins: Map<string, MonitorFunc> = new Map()
    reportUrl: string
    randomIgnore: number = 0.314
    // 运行插件，并把插件存到 plugins 里面
    // todo: 考虑让插件在 web worker 里面跑？
    // todo: 同一个插件不让挂载多次
    mount(monitor: MonitorFunc, name: string): boolean {
        try {
            this.plugins.set(name, monitor)
            // 异步跑去吧，避免堵塞
            setTimeout(
                monitor({
                    emit: (msg: Msg): boolean => this.emit(msg, name)
                }),
                0
            )
        } catch (err) {
            console.log('插件加载失败: ' + name + 'error:' + err)
            return false
        }
        return true
    }
    emit(msg: Msg, from: string): boolean {
        // todo: post / get / img  上报
        // todo: websocket 上报
        // todo: 延后上报，减少请求往返
        // todo: 随机上报、忽略上报, 批量上报（延时上报）
        const id = msg.date + Math.floor(Math.random() * 100000)
        if (window.navigator) {
            const userAgent = navigator.userAgent
            const lang = navigator.language
        }
        return false
    }
    // 随机上报
    randomReport() {
        return Math.random() >= this.randomIgnore ? true : false
    }
}
