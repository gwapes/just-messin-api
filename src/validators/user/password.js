const validate = (password, response) => {
    if(!password){
        response.isValid = false
        response.messages.push('Password is a required field for account creation.')
        return //if there is no string, there is nothing to keep validating
    }

    if(password.length < 8){
        response.isValid = false
        response.messages.push('Password must be at least 8 characters in length.')
    }

    if(!password.match(/(?=.*\d)/)){
        response.isValid = false
        response.messages.push('Password must contain at least on numeric character.')
    }

    if(!password.match(/(?=.*[a-z])/)){
        response.isValid = false
        response.messages.push('Password must contain at least one lowercase alphabetic character.')
    }

    if(!password.match(/(?=.*[A-Z])/)){
        response.isValid = false
        response.messages.push('Password must contain at least one uppercase alphabetic character.')
    }

    if(!password.match(/(?=.*\W)/)){
        response.isValid = false
        response.messages.push('Password must contain at least one special character.')
    }
}

module.exports = { validate }