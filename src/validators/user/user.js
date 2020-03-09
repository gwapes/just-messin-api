const username = require('./username')
const email = require('./email')
const password = require('./password')
const existing = require('./existing')

const validate = async (user) => {
    let response = {
        isValid: true,
        messages: []
    }

    username.validate(user.username, response)
    email.validate(user.email, response)
    password.validate(user.password, response)
    
    if(response.isValid) { //existing fields should only exist under valid circumstances (limit unnecessary traffic and queries)
        await existing.validate(user, response)
    }

    return response
}

module.exports = { validate }