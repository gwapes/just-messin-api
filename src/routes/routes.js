const { ping } = require('./ping')
const { postUsers } = require('./users')

const setup = (router) => {
    router.get('/ping', ping)
    
    router.post('/users', postUsers)
}

module.exports = { setup }