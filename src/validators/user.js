const common = require('./common')

const validate = (user) => {
    let response = {
        isValid: true,
        messages: []
    }

    validateUsername(user.username, response)

    return response
}

const validateUsername = (username, response) => {
    //TODO check that username is unique

    if(!common.isAlphaNumeric(username)){
        response.isValid = false
        response.messages.push('Username must be an alpha numeric string.')
    }
}

module.exports = { validate }