const passwordEncryptor = require('../../encryptors/password')

const map = (request) => {
    let mapped = { ...request }
    
    mapped.password = passwordEncryptor.encrypt(request.password)

    return mapped
}

module.exports = { map }