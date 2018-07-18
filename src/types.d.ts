interface Msg {
    type: string
    date: number
    source: string
    content: any
}

interface Log extends Msg {
    id: number
    userAgent: string
    platform: string
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

interface EventTarget {
    currentSrc: string
    localName: string
}

interface Event {
    reason: string
}
