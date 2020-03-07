const crypto = require('crypto')
const path = require('path')
const fs = require('fs')

const encrypt = (value) => {
    let key = getKeyValue('./users.key')
    let iv = getKeyValue('./users.iv')

    let cipher = crypto.createCipher('aes-256-cbc', key, iv)
    let encrypted = cipher.update(value)
    encrypted = encrypted += cipher.final('hex')

    return encrypted
}

const hash = (password) => {
    let salt = getSalt()

    var hash = crypto.createHmac('sha512', salt)
    hash.update(password)
    let value = hash.digest('hex')

    return {
        salt: salt,
        hash: value
    }
}

const getKeyValue = (file) => {
    let keyPath = path.resolve(`./${file}`)
    let key = fs.readFileSync(keyPath, 'utf8')
    return key
}

const getSalt = () => {
    let salt = crypto.randomBytes(8).toString('hex').slice(0,16)
    return salt
}

module.exports = { encrypt, hash }