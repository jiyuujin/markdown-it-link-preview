const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

export const fetchHtmlSync = (url) => {
    const xhr = new XMLHttpRequest()

    try {
        xhr.open('GET', url, false)
        xhr.setRequestHeader( 'Cross-Origin-Embedder-Policy', 'require-corp' )
        xhr.setRequestHeader( 'Cross-Origin-Opener-Policy', 'same-origin' )
        xhr.send()
    } catch (err) {
        throw new Error('Failed - ' + err)
    }

    if (xhr.status != 200) {
        throw new Error(
            xhr.status + ' - ' + xhr.statusText ? xhr.statusText : 'Something is wrong.',
        )
    }

    return xhr.responseText
}
