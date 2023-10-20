const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
export const fetchHtmlSync = (url, redirectLimit = 5) => {
    if (redirectLimit <= 0) {
        throw new Error('Too many redirects');
    }
    const xhr = new XMLHttpRequest();
    try {
        xhr.open('GET', url, false);
        xhr.followRedirects = true;
        xhr.send();
    }
    catch (err) {
        throw new Error('Failed - ' + err);
    }
    if (xhr.readyState === 4 && (xhr.status === 301 || xhr.status === 302)) {
        const redirectUrl = xhr.getResponseHeader('Location');
        return fetchHtmlSync(redirectUrl, redirectLimit - 1);
    }
    if (xhr.status != 200) {
        throw new Error(xhr.status + ' - ' + xhr.statusText ? xhr.statusText : 'Something is wrong.');
    }
    return xhr.responseText;
};
