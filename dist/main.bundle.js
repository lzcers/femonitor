!(function(e) {
    var t = {}
    function n(r) {
        if (t[r]) return t[r].exports
        var o = (t[r] = { i: r, l: !1, exports: {} })
        return e[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports
    }
    ;(n.m = e),
        (n.c = t),
        (n.d = function(e, t, r) {
            n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r })
        }),
        (n.r = function(e) {
            'undefined' != typeof Symbol &&
                Symbol.toStringTag &&
                Object.defineProperty(e, Symbol.toStringTag, {
                    value: 'Module'
                }),
                Object.defineProperty(e, '__esModule', { value: !0 })
        }),
        (n.t = function(e, t) {
            if ((1 & t && (e = n(e)), 8 & t)) return e
            if (4 & t && 'object' == typeof e && e && e.__esModule) return e
            var r = Object.create(null)
            if (
                (n.r(r),
                Object.defineProperty(r, 'default', {
                    enumerable: !0,
                    value: e
                }),
                2 & t && 'string' != typeof e)
            )
                for (var o in e)
                    n.d(
                        r,
                        o,
                        function(t) {
                            return e[t]
                        }.bind(null, o)
                    )
            return r
        }),
        (n.n = function(e) {
            var t =
                e && e.__esModule
                    ? function() {
                          return e.default
                      }
                    : function() {
                          return e
                      }
            return n.d(t, 'a', t), t
        }),
        (n.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }),
        (n.p = ''),
        n((n.s = 4))
})([
    function(e, t) {
        Object.defineProperty(t, '__esModule', { value: !0 }),
            (t.default = function(e) {
                window.addEventListener(
                    'error',
                    function(t) {
                        if (t.target != window) {
                            var n = {
                                type: 'resource',
                                date: new Date().getTime(),
                                source: t.target.currentSrc,
                                content: {
                                    class: t.target.localName,
                                    message: 'load error.'
                                }
                            }
                            e.emit(n)
                        }
                    },
                    !0
                )
            })
    },
    function(e, t) {
        Object.defineProperty(t, '__esModule', { value: !0 }),
            (t.default = function(e) {
                if (window.performance || performance.timing) {
                    var t = window.onload
                    window.onload = function() {
                        setTimeout(function() {
                            var t = window.performance.timing,
                                n = {
                                    dns:
                                        t.domainLookupEnd - t.domainLookupStart,
                                    connect: t.connectEnd - t.connectStart,
                                    whtite: t.responseStart - t.navigationStart,
                                    domp: t.domComplete - t.domInteractive,
                                    dom:
                                        t.domContentLoadedEventEnd -
                                        t.navigationStart,
                                    request: t.responseEnd - t.responseStart,
                                    onload: t.loadEventEnd - t.navigationStart
                                }
                            e.emit({
                                type: 'perf',
                                date: new Date().getTime(),
                                source: location.href,
                                content: n
                            })
                        }, 100),
                            t && t.apply(this, arguments)
                    }
                }
            })
    },
    function(e, t) {
        var n =
            (this && this.__assign) ||
            Object.assign ||
            function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in (t = arguments[n]))
                        Object.prototype.hasOwnProperty.call(t, o) &&
                            (e[o] = t[o])
                return e
            }
        Object.defineProperty(t, '__esModule', { value: !0 }),
            (t.default = function(e) {
                var t = window.onerror
                ;(window.onerror = function(r, o, i, a, u) {
                    var c = '',
                        s = { message: r, lineno: i, colno: a }
                    if (u && u.stack) c = u.message + '\n ' + u.stack
                    else if (arguments.callee)
                        for (
                            var l = arguments.callee.caller, d = 3;
                            l &&
                            --d > 0 &&
                            ((c += l.toString() + ','), l !== l.caller);

                        )
                            l = l.caller
                    o &&
                        !(r.toLowerCase().indexOf('script error') > -1) &&
                        Math.random() <= 0.314 &&
                        e.emit({
                            type: 'jsErr',
                            date: new Date().getTime(),
                            source: o,
                            content: n({}, s, { msg: c })
                        }),
                        t && t.apply(this, arguments)
                }),
                    window.addEventListener('unhandledrejection', function(t) {
                        Math.random() <= 0.314 &&
                            e.emit({
                                type: 'unhandledrejection',
                                date: new Date().getTime(),
                                source: window.location.href,
                                content: { reason: t.reason }
                            })
                    })
            })
    },
    function(e, t) {
        var n =
            (this && this.__assign) ||
            Object.assign ||
            function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in (t = arguments[n]))
                        Object.prototype.hasOwnProperty.call(t, o) &&
                            (e[o] = t[o])
                return e
            }
        Object.defineProperty(t, '__esModule', { value: !0 })
        var r = (function() {
            function e() {
                ;(this.logs = []),
                    (this.reportUrl = 'monitor.ftoul.com'),
                    (this.repProcess = null)
            }
            return (
                (e.prototype.mount = function(e) {
                    var t = this
                    try {
                        e({
                            emit: function(e) {
                                return t.emit(e)
                            }
                        })
                    } catch (e) {
                        return console.log('插件加载失败: ' + e), !1
                    }
                    return !0
                }),
                (e.prototype.emit = function(e) {
                    var t = this
                    this.logs.push(
                        n(
                            {
                                id: e.date + Math.floor(1e5 * Math.random()),
                                userAgent: navigator.userAgent || '',
                                lang: navigator.language || ''
                            },
                            e
                        )
                    ),
                        this.repProcess
                            ? (clearTimeout(this.repProcess),
                              (this.repProcess = setTimeout(function() {
                                  return t.reportToServerByImg()
                              }, 500)))
                            : (this.repProcess = setTimeout(function() {
                                  return t.reportToServerByImg()
                              }, 500))
                }),
                (e.prototype.reportToServerByImg = function() {
                    var e = JSON.stringify(this.logs)
                    ;(new Image().src = this.reportUrl + '?m=' + e),
                        (this.logs = [])
                }),
                e
            )
        })()
        t.default = r
    },
    function(e, t, n) {
        var r =
            (this && this.__importDefault) ||
            function(e) {
                return e && e.__esModule ? e : { default: e }
            }
        Object.defineProperty(t, '__esModule', { value: !0 })
        var o = r(n(3)),
            i = r(n(2)),
            a = r(n(1)),
            u = r(n(0)),
            c = new o.default()
        c.mount(i.default), c.mount(a.default), c.mount(u.default)
    }
])
