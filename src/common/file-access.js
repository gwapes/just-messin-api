const path = require('path')
const fs = require('fs')

const retrieveFileData = (fileName) => {
    let keyPath = path.resolve(`./${fileName}`)
    let key = fs.readFileSync(keyPath, 'utf8')
    return key
}

module.exports = { retrieveFileData }