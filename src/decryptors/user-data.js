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

module.exports = { decrypt }