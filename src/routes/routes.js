const { ping } = require('./ping')
const { postAnimals } = require('./animals')

const setup = (router) => {
    router.get('/ping', ping)
    
    router.post('/animals', postAnimals)
}

module.exports = { setup }