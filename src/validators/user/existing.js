const dataAccess = require('../../data-access/account-data')
const encryptor = require('../../encryptors/user-data')

const validate = async (user, response) => {
    if(await usernameExists(user.username)) {
        response.isValid = false
        response.messages.push('Chosen username is already in use. Please select a new unique username.')
    }

    if(await emailExists(user.email)) {
        response.isValid = false
        response.messages.push('Email entered is already registed under a valid account.')
    }
}

const usernameExists = async (username) => {
    const exists = await dataAccess.retrieveUser({ username: username })
    return Boolean(exists)
}

const emailExists = async (email) => {
    const encrypted = encryptor.encrypt(email)
    const exists = await dataAccess.retrieveUser({ email: encrypted })
    return Boolean(exists)
}

module.exports = { validate }