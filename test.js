const url = 'https://webneko.dev/'

const linkPreviewPlugin = require('./dist/cjs/index.js')

const md = require('markdown-it')().use(linkPreviewPlugin)
const result = md.render('[@preview](' + url + ')')
console.log(result)
