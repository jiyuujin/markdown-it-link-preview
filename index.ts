import { fetchOgData } from './lib/og'

const linkPreviewHtml = (ogData) => {
    return (
        '<div class="link-preview">' +
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
        '</div>'
    )
}

const isLinkPreview = (tokens, idx) => {
    const t = tokens[idx + 1]
    if (t.type === 'text' && t.content === '@preview') {
        return true
    } else {
        return false
    }
}

const hideTokensUntilLinkClose = (tokens, idx) => {
    tokens[idx + 1].content = ''
    for (let i = idx + 1; i < tokens.length; i++) {
        tokens[i].hidden = true
        if (tokens[i].type === 'link_close') break
    }
}

const getHref = (tokens, idx) => {
    const hrefIdx = tokens[idx].attrIndex('href')
    return tokens[idx].attrs[hrefIdx][1]
}

const linkPreviewPlugin = (md, options) => {
    const defaultRender = md.renderer.rules.link_open || function (tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options)
    }
    md.renderer.rules.link_open = function(tokens, idx, options, env, self) {
        tokens[idx].attrPush(['loading', 'lazy'])
        if (isLinkPreview(tokens, idx)) {
            hideTokensUntilLinkClose(tokens, idx)
            const url = getHref(tokens, idx)
            const ogData = fetchOgData(url)
            return linkPreviewHtml(ogData)
        }
        return defaultRender(tokens, idx, options, env, self)
    }
}

module.exports = linkPreviewPlugin
