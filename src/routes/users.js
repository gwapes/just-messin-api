const requestValidator = require('../validators/user/user')
const accountDB = require('../data-access/account-data')
const reqMapper = require('../mappers/users/post-request')
const resMapper = require('../mappers/users/post-response')

const postUser = async (req, res) => {
    try {
        const validation = await requestValidator.validate(req.body)
        if (!validation.isValid) {
            res.status(400)
            res.json({
                errors: validation.messages
            })
        } else {
            let mappedReq = reqMapper.map(req.body)
            let result = await accountDB.saveUser(mappedReq)
            let response = resMapper.map(result)

            res.status(200)
            res.json(response)
        }
    }
    catch(ex) {
        console.error(ex)

        res.status(500)
        res.json({ errors: [ 'Some technical issue occurred during processing.' ]})
    }
}

module.exports = { postUser }