function jsError($: $) {
    window.addEventListener('error', (evt: ErrorEvent) => {
        console.log(evt)
        $.emit({
            type: 'jserr',
            date: new Date().getTime(),
            url: location.href,
            content: evt.message
        })
    })
}
