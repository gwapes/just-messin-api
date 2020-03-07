const decryptor = require('../../decryptors/user-data')

const map = (response) => {
    let mapped = { ...response }

    delete mapped.password
    mapped.email = decryptor.decrypt(response.email)

    return mapped
}

module.exports = { map }