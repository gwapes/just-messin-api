const requestValidator = require('../validators/user/user')

const postUsers = (req, res) => {
    const validation = requestValidator.validate(req.body)
    if(!validation.isValid){
        res.status(400)
        res.json({
            errors: validation.messages
        })
    } else {
        res.status(200)
        res.json(req.body)
    }
}

module.exports = { postUsers }