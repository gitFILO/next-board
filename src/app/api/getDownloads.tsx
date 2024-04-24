import { JSDOM } from 'jsdom'


const getDownloads = async () => {
    const res = await fetch('https://www.npmjs.com/package/puppeteer')
    const html = await res.text()

    const dom = new JSDOM(html)
    const docmument = dom.window.document
    const downloads = document.querySelector('._702d723c').textContent

    console.log("downlodas",downloads)
    return ''
}

export default getDownloads