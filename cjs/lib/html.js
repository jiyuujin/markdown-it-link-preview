"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchHtmlSync = void 0;
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var fetchHtmlSync = function (url, redirectLimit) {
    if (redirectLimit === void 0) { redirectLimit = 5; }
    if (redirectLimit <= 0) {
        throw new Error('Too many redirects');
    }
    var xhr = new XMLHttpRequest();
    try {
        xhr.open('GET', url, false);
        xhr.withCredentials = true;
        xhr.followRedirects = true;
        xhr.send();
    }
    catch (err) {
        throw new Error('Failed - ' + err);
    }
    if (xhr.readyState === 4 && (xhr.status === 301 || xhr.status === 302)) {
        var redirectUrl = xhr.getResponseHeader('Location');
        return (0, exports.fetchHtmlSync)(redirectUrl, redirectLimit - 1);
    }
    if (xhr.status != 200) {
        throw new Error(xhr.status + ' - ' + xhr.statusText ? xhr.statusText : 'Something is wrong.');
    }
    return xhr.responseText;
};
exports.fetchHtmlSync = fetchHtmlSync;
