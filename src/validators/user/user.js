const username = require('./username')

const validate = (user) => {
    let response = {
        isValid: true,
        messages: []
    }

    username.validate(user.username, response)

    return response
}

module.exports = { validate }