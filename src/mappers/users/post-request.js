const encryptor = require('../../encryptors/user-data')

const map = (request) => {
    let mapped = { ...request }
    
    mapped.password = encryptor.encrypt(request.password)
    mapped.email = encryptor.encrypt(request.email)

    return mapped
}

module.exports = { map }