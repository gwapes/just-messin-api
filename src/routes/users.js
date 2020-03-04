const requestValidator = require('../validators/user/user')
const accountDB = require('../data-access/accountData')

const postUsers = async (req, res) => {
    const validation = requestValidator.validate(req.body)
    if(!validation.isValid){
        res.status(400)
        res.json({
            errors: validation.messages
        })
    } else {
        let result = await accountDB.saveUsers(req.body)
        console.log(result)
        res.status(200)
        res.json(result)
    }
}

module.exports = { postUsers }