const common = require('../common')

const validate = (username, response) => {
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