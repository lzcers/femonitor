import EHub from './eventHub'
import jsError from './jsError'
import perf from './perf'
import resource from './resource'

const eventHub = new EHub()
eventHub.mount(jsError)
eventHub.mount(perf)
eventHub.mount(resource)
