const crypto = require('crypto')
const path = require('path')
const fs = require('fs')

const encrypt = (password) => {
    let keyPath = path.resolve('./public-key.pem')
    let key = fs.readFileSync(keyPath, 'utf8')

    let buffer = Buffer.from(password)

    let encrypted = crypto.publicEncrypt(key, buffer)

    return encrypted.toString('base64')
}

module.exports = { encrypt }