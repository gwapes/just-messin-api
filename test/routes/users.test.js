describe('users route tests', () => {
    let res
    let users
    let v
    let db
    let actual

    beforeEach(() => {
        jest.resetModules()
        jest.resetAllMocks()

        jest.mock('../../src/validators/user/user', () => ({
            validate: jest.fn().mockName('v.validate')
        }))
        jest.mock('../../src/data-access/accountData', () => ({
            saveUser: jest.fn().mockName('db.saveUser')
        }))

        users = require('../../src/routes/users')
        v = require('../../src/validators/user/user')
        db = require('../../src/data-access/accountData')

        actual = {}
        res = {
            status: (code) => { actual.status = code },
            json: (body) => { actual.body = body }
        }
    })

    it('should respond with 200 and body of request', async () => {
        let req = {
            body: {
                message: 'HUZZAH!'
            }
        }
        v.validate.mockReturnValue({
            isValid: true,
            messages: []
        })
        db.saveUser.mockResolvedValue({
            message: 'HUZZAH!'
        })

        await users.postUser(req, res)

        expect(actual.status).toEqual(200)
        expect(actual.body).toStrictEqual({ message: 'HUZZAH!' })
    })

    it('should respond with 400 and validation messages', async () => {
        let req = {}
        v.validate.mockReturnValue({
            isValid: false,
            messages: [
                'There is probably a problem with the request',
                'You should check it out'
            ]
        })

        await users.postUser(req, res)

        expect(actual.status).toEqual(400)
        expect(actual.body).toStrictEqual({
            errors: [
                'There is probably a problem with the request',
                'You should check it out'
            ]
        })
    })

    it('should respond with 500 and generic error message', async () => {
        let req = {
            body: {
                message: 'HUZZAH!'
            }
        }
        v.validate.mockReturnValue({
            isValid: true,
            messages: []
        })
        db.saveUser.mockRejectedValue({ ex: 'log this...'})

        await users.postUser(req, res)

        expect(actual.status).toEqual(500)
        expect(actual.body).toStrictEqual({
            errors: [
                'Some technical issue occurred during processing.'
            ]
        })
    })
})