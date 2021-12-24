"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchHtmlSync = void 0;
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var fetchHtmlSync = function (url) {
    var xhr = new XMLHttpRequest();
    try {
        xhr.open('GET', url, false);
        xhr.send();
    }
    catch (err) {
        throw new Error('Failed - ' + err);
    }
    if (xhr.status != 200) {
        throw new Error(xhr.status + ' - ' + xhr.statusText ? xhr.statusText : 'Something is wrong.');
    }
    return xhr.responseText;
};
exports.fetchHtmlSync = fetchHtmlSync;
