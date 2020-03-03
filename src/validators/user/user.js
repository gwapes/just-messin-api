const username = require('./username')
const email = require('./email')
const password = require('./password')

const validate = (user) => {
    let response = {
        isValid: true,
        messages: []
    }

    username.validate(user.username, response)
    email.validate(user.email, response)
    password.validate(user.password, response)

    return response
}

module.exports = { validate }