const { ping } = require('./ping')
const { postUser } = require('./users')

const setup = (router) => {
    router.get('/ping', ping)
    
    router.post('/users', postUser)
}

module.exports = { setup }