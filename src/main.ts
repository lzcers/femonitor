import EHub from './eventHub'
import jsError from './jsError'
import perf from './perf'
import resource from './resource'
import ajaxHook from './ajaxHook'
const eventHub = new EHub()
eventHub.mount(jsError)
eventHub.mount(perf)
eventHub.mount(resource)
eventHub.mount(ajaxHook)
