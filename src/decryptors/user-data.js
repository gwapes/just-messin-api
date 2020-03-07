const crypto = require('crypto')
const fileAccess = require('../common/file-access')

const decrypt = (encrypted) => {
    let key = fileAccess.retrieveFileData('./users.key')
    let iv = fileAccess.retrieveFileData('./users.iv')

    let decipher = crypto.createDecipher('aes-256-cbc', key, Buffer.from(iv, 'hex'))
    let decrypted = decipher.update(Buffer.from(encrypted, 'hex'))
    decrypted = Buffer.concat([decrypted, decipher.final()])

    return decrypted.toString()
}

const hash = (entered, salt) => {
    var hash = crypto.createHmac('sha512', salt)
    hash.update(entered)
    let result = hash.digest('hex')

    return result
}

module.exports = { decrypt, hash }