interface Msg {
    type: string
    date: number
    source: string
    content: any
}

interface Log extends Msg {
    id: number
    from: string
    userAgent: string
    lang: string
}

interface $ {
    emit(msg: Msg)
}

interface EventHub {
    mount(monitor: MonitorFunc, name: string): boolean
    emit(msg: Msg, from: string)
}

interface MonitorFunc {
    ($: $): void
}

interface Window {
    chrome: any
}
