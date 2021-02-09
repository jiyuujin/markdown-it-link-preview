import { fetchHtmlSync } from './html'

const { JSDOM } = require('jsdom')

export const fetchOgData = (url) => {
    const ogData: {
        title?: string
        description?: string
        image?: string
        site_name?: string
        url?: string
    } = {}

    try {
        const html = fetchHtmlSync(url)
        const dom = new JSDOM(html)
        const doc = dom.window.document

        const titleSelector = doc.querySelector('title')
        const title = titleSelector != null ? titleSelector.textContent : undefined
        const titleMetaSelector = doc.querySelector('meta[property="og:title"]')
        const titleMeta = titleMetaSelector != null ? titleMetaSelector.content : undefined
        ogData.title = titleMeta ? titleMeta : title

        const descriptionSelector = doc.querySelector('meta[name="description"]')
        const description = descriptionSelector != null ? descriptionSelector.content : undefined
        const descriptionMetaSelector = doc.querySelector('meta[property="og:description"]')
        const descriptionMeta = descriptionMetaSelector != null ? descriptionMetaSelector.content : undefined
        ogData.description = descriptionMeta ? descriptionMeta : description

        const imageMetaSelector = doc.querySelector('meta[property="og:image"]')
        ogData.image = imageMetaSelector != null ? imageMetaSelector.content : undefined

        const siteMetaSelector = doc.querySelector('meta[property="og:site_name"]')
        ogData.site_name = siteMetaSelector != null ? siteMetaSelector.content : undefined

        const urlMetaSelector = doc.querySelector('meta[property="og:url"]')
        const urlMeta = urlMetaSelector != null ? urlMetaSelector.content : undefined
        ogData.url = urlMeta ? urlMeta : url
    } catch (error) {
        console.log(error)
    }

    if (!ogData.title) ogData.title = ''
    if (!ogData.description) ogData.description = ''
    if (!ogData.image) ogData.image = ''
    if (!ogData.site_name) ogData.site_name = ''
    if (!ogData.url) ogData.url = url

    return ogData
}
