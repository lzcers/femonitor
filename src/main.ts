interface Msg {
    type: string
    date: number
    url: string
    content: string
}

interface $ {
    emit(msg: Msg): boolean
}
interface EventHub {
    mount(monitor: MonitorFunc, name: string): boolean
    emit(msg: Msg, from: string): boolean
}

interface MonitorFunc {
    ($: $): void
}

const mo1 = ($: $) => {
    setInterval(() => {
        $.emit({
            type: 'test',
            date: new Date().getTime(),
            url: 'test',
            content: 'test'
        })
    }, 1000)
}

class EHub implements EventHub {
    plugins: Map<string, MonitorFunc> = new Map()
    // 运行插件，并把插件存到 plugins 里面
    // todo: 考虑让插件在 web worker 里面跑？
    // todo: 同一个插件不让挂载多次
    // todo: 考虑适用 websockte
    mount(monitor: MonitorFunc, name: string): boolean {
        try {
            this.plugins.set(name, monitor)
            monitor({
                emit: (msg: Msg): boolean => this.emit(msg, name)
            })
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

const hub = new EHub()
hub.mount(mo1, 'testPlugin')
hub.mount(mo1, 'xxxPlugin')
