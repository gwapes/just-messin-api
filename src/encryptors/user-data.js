const crypto = require('crypto')
const fileAccess = require('../common/file-access')

const encrypt = (value) => {
    let key = fileAccess.retrieveFileData('./users.key')
    let iv = fileAccess.retrieveFileData('./users.iv')

    let cipher = crypto.createCipher('aes-256-cbc', key, iv)
    let encrypted = cipher.update(value)
    encrypted = encrypted += cipher.final('hex')

    return encrypted
}

const hash = (password, existingSalt) => {
    let salt = existingSalt ? existingSalt : getSalt()

    var hash = crypto.createHmac('sha512', salt)
    hash.update(password)
    let value = hash.digest('hex')

    return {
        salt: salt,
        hash: value
    }
}

const getSalt = () => {
    let salt = crypto.randomBytes(8).toString('hex').slice(0,16)
    return salt
}

module.exports = { encrypt, hash }