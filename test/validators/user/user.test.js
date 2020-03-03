describe('user validator tests', () => {
    let validator
    let uv
    let ev
    let pv
    
    beforeEach(() => {
        jest.resetModules()
        jest.resetAllMocks()

        jest.mock('../../../src/validators/user/username', () => ({
            validate: jest.fn().mockName('uv.validate')
        }))
        jest.mock('../../../src/validators/user/email', () => ({
            validate: jest.fn().mockName('ev.validate')
        }))
        jest.mock('../../../src/validators/user/password', () => ({
            validate: jest.fn().mockName('pv.validate')
        }))

        validator = require('../../../src/validators/user/user')
        ev = require('../../../src/validators/user/email')
        pv = require('../../../src/validators/user/password')
        uv = require('../../../src/validators/user/username')
    })

    it('should successfully validate the user', () => {
        const user = {
            username: 'gwapes',
            password: 'password',
            email: 'fake@email.com'
        }
        uv.validate.mockImplementation((un, res) => {
            return
        })
        ev.validate.mockImplementation((e, res) => {
            return
        })
        pv.validate.mockImplementation((p, res) => {
            return
        })

        const actual = validator.validate(user)

        expect(actual.isValid).toEqual(true)
        expect(actual.messages).toStrictEqual([])
    })

    it('should fail validation at username', () => {
        const user = {
            username: 'gwapes',
            password: 'password',
            email: 'fake@email.com'
        }
        uv.validate.mockImplementation((un, res) => {
            res.isValid = false
            res.messages.push('username failed somehow')
        })
        ev.validate.mockImplementation((e, res) => {
            return
        })
        pv.validate.mockImplementation((p, res) => {
            return
        })

        const actual = validator.validate(user)

        expect(actual.isValid).toEqual(false)
        expect(actual.messages).toStrictEqual(['username failed somehow'])
    })

    it('should fail validation at email', () => {
        const user = {
            username: 'gwapes',
            password: 'password',
            email: 'fake@email.com'
        }
        uv.validate.mockImplementation((un, res) => {
            return
        })
        ev.validate.mockImplementation((e, res) => {
            res.isValid = false
            res.messages.push('email failed somehow')
        })
        pv.validate.mockImplementation((p, res) => {
            return
        })

        const actual = validator.validate(user)

        expect(actual.isValid).toEqual(false)
        expect(actual.messages).toStrictEqual(['email failed somehow'])
    })

    it('should fail validation at password', () => {
        const user = {
            username: 'gwapes',
            password: 'password',
            email: 'fake@email.com'
        }
        uv.validate.mockImplementation((un, res) => {
            return
        })
        ev.validate.mockImplementation((e, res) => {
            return
        })
        pv.validate.mockImplementation((p, res) => {
            res.isValid = false
            res.messages.push('password failed somehow')
        })

        const actual = validator.validate(user)

        expect(actual.isValid).toEqual(false)
        expect(actual.messages).toStrictEqual(['password failed somehow'])
    })
})