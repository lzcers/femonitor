interface Msg {
    type: string
    date: number
    source: string
    content: any
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
