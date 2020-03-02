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

    if(!username){
        response.isValid = false
        response.messages.push('A username must be supplied at account creation.')
        return // we dont want to continue validating if there is no username
    }

    if(!common.isAlphaNumeric(username)){
        response.isValid = false
        response.messages.push('Username must be an alpha numeric string.')
    }

    if(username.length < 5 || username.length > 25){
        response.isValid = false
        response.messages.push('Username must be between 5 and 25 characters in length.')
    }
}

module.exports = { validate }