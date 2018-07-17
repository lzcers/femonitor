$.ajax({
    url: 'http://localhost:8080',
    success: function() {
        console.log('success')
    },
    error: function() {
        console.log('error')
    }
})

$.ajax({
    url: 'http://localhost:8080/abc',
    success: function() {
        console.log('success')
    },
    error: function() {
        console.log('error')
    }
})

fetch('http://localhost:8080/xxx')

!(function() {
    const a = 1
    return (function() {
        console.logg('s')
    })()
})()
