"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchOgData = void 0;
var html_1 = require("./html");
var JSDOM = require('jsdom').JSDOM;
var fetchOgData = function (url) {
    var ogData = {};
    try {
        var html = (0, html_1.fetchHtmlSync)(url);
        var dom = new JSDOM(html);
        var doc = dom.window.document;
        var titleSelector = doc.querySelector('title');
        var title = titleSelector != null ? titleSelector.textContent : undefined;
        var titleMetaSelector = doc.querySelector('meta[property="og:title"]');
        var titleMeta = titleMetaSelector != null ? titleMetaSelector.content : undefined;
        ogData.title = titleMeta ? titleMeta : title;
        var descriptionSelector = doc.querySelector('meta[name="description"]');
        var description = descriptionSelector != null ? descriptionSelector.content : undefined;
        var descriptionMetaSelector = doc.querySelector('meta[property="og:description"]');
        var descriptionMeta = descriptionMetaSelector != null ? descriptionMetaSelector.content : undefined;
        ogData.description = descriptionMeta ? descriptionMeta : description;
        var imageMetaSelector = doc.querySelector('meta[property="og:image"]');
        ogData.image = imageMetaSelector != null ? imageMetaSelector.content : undefined;
        var siteMetaSelector = doc.querySelector('meta[property="og:site_name"]');
        ogData.site_name = siteMetaSelector != null ? siteMetaSelector.content : undefined;
        var urlMetaSelector = doc.querySelector('meta[property="og:url"]');
        var urlMeta = urlMetaSelector != null ? urlMetaSelector.content : undefined;
        ogData.url = urlMeta ? urlMeta : url;
    }
    catch (error) {
        console.log(error);
    }
    if (!ogData.title)
        ogData.title = '';
    if (!ogData.description)
        ogData.description = '';
    if (!ogData.image)
        ogData.image = '';
    if (!ogData.site_name)
        ogData.site_name = '';
    if (!ogData.url)
        ogData.url = url;
    return ogData;
};
exports.fetchOgData = fetchOgData;
