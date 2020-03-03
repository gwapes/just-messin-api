describe('users route tests', () => {
    let res
    let users
    let v
    let actual

    beforeEach(() => {
        jest.resetModules()
        jest.resetAllMocks()

        jest.mock('../../src/validators/user/user', () => ({
            validate: jest.fn().mockName('v.validate')
        }))

        users = require('../../src/routes/users')
        v = require('../../src/validators/user/user')

        actual = {}
        res = {
            status: (code) => { actual.status = code },
            json: (body) => { actual.body = body }
        }
    })

    it('should respond with 200 and body of request', () => {
        let req = {
            body: {
                message: 'HUZZAH!'
            }
        }
        v.validate.mockReturnValue({
            isValid: true,
            messages: []
        })

        users.postUsers(req, res)

        expect(actual.status).toEqual(200)
        expect(actual.body).toStrictEqual({ message: 'HUZZAH!' })
    })

    it('should respond with 400 and validation messages', () => {
        let req = {}
        v.validate.mockReturnValue({
            isValid: false,
            messages: [
                'There is probably a problem with the request',
                'You should check it out'
            ]
        })

        users.postUsers(req, res)

        expect(actual.status).toEqual(400)
        expect(actual.body).toStrictEqual({
            errors: [
                'There is probably a problem with the request',
                'You should check it out'
            ]
        })
    })
})