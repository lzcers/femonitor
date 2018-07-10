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
