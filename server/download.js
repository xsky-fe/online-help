const fs = require('fs');
const path = require('path');
const markdownpdf = require("markdown-pdf");
const through2 = require("through2");
const through = require("through")
function loadPaths(dictionary) {
    const links = [];
    return new Promise((resolve, reject) => {
        fs.readFile(`${dictionary}/SUMMARY.md`, (err, data) => {
            if(err) {reject(err)}
            for (let txt of data.toString().split("*")){
                let link = /\((.+)\)/g.exec(txt);
                link && link[1] && links.push(dictionary + '/' + link[1]);
            }
            resolve(links)
        })
    })
}

function preProcessMd () {
    return through(function(data) {
        pageBreak = '\n\n<div style="page-break-before: always;"></div>\n\n'

        this.queue(data + pageBreak)
    })
}

function toPDF(dictionary, bookPath) {
    loadPaths(dictionary).then(cata => {
        markdownpdf({
            preProcessHtml: function () { return through2() },
            remarkable: {
                html: true,
                linkify: true,
            },
            preProcessMd: preProcessMd,
            cssPath: path.resolve(__dirname, '../online-help-cn/styles/pdf.css'),
        }).concat.from(cata).to(bookPath, function name() {
            console.log("done")
        })
    })
}
toPDF(path.resolve(__dirname, "../online-help-cn/"), path.resolve(__dirname, "../online-help-cn/assets/ebook/online-help-cn.pdf"))
toPDF(path.resolve(__dirname, "../online-help-en/"), path.resolve(__dirname, "../online-help-en/assets/ebook/online-help-en.pdf"))