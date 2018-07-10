class EHub implements EventHub {
    plugins: Map<string, MonitorFunc> = new Map()
    // 运行插件，并把插件存到 plugins 里面
    // todo: 考虑让插件在 web worker 里面跑？
    // todo: 同一个插件不让挂载多次
    // todo: 考虑适用 websockte
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
            console.log('插件加载失败: ' + err)
            return false
        }
        return true
    }
    emit(msg: Msg, from: string): boolean {
        console.log(from)
        console.log(msg)
        return false
    }
}
