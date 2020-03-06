const passwordEncryptor = require('../../encryptors/user-data')

const map = (request) => {
    let mapped = { ...request }
    
    mapped.password = passwordEncryptor.encrypt(request.password)

    return mapped
}

module.exports = { map }