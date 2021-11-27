"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var og_1 = require("./lib/og");
var linkPreviewHtml = function (ogData) {
    return ('<div class="link-preview">' +
        '<a href="' + ogData.url + '" target="_blank" rel="noopener noreferrer">' +
        '<div class="link-preview__title">' +
        ogData.title +
        '</div>' +
        '<div class="link-preview__description">' +
        ogData.description +
        '</div>' +
        '<div class="link-preview__url">' +
        ogData.site_name +
        '</div>' +
        '</a>' +
        '<a class="link-preview__image" href="' + ogData.url + '" target="_blank" rel="noopener noreferrer" style="background-image: url(\'' + ogData.image + '\');">' +
        '</a>' +
        '</div>');
};
var isLinkPreview = function (tokens, idx) {
    var t = tokens[idx + 1];
    if (t.type === 'text' && t.content === '@preview') {
        return true;
    }
    else {
        return false;
    }
};
var hideTokensUntilLinkClose = function (tokens, idx) {
    tokens[idx + 1].content = '';
    for (var i = idx + 1; i < tokens.length; i++) {
        tokens[i].hidden = true;
        if (tokens[i].type === 'link_close')
            break;
    }
};
var getHref = function (tokens, idx) {
    var hrefIdx = tokens[idx].attrIndex('href');
    return tokens[idx].attrs[hrefIdx][1];
};
var linkPreviewPlugin = function (md, options) {
    var defaultRender = md.renderer.rules.link_open || function (tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options);
    };
    md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
        tokens[idx].attrPush(['loading', 'lazy']);
        if (isLinkPreview(tokens, idx)) {
            hideTokensUntilLinkClose(tokens, idx);
            var url = getHref(tokens, idx);
            var ogData = (0, og_1.fetchOgData)(url);
            return linkPreviewHtml(ogData);
        }
        return defaultRender(tokens, idx, options, env, self);
    };
};
module.exports = linkPreviewPlugin;
