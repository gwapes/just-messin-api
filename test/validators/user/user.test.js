describe('user validator tests', () => {
    let validator
    let uv
    let ev
    let pv
    let ex

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
        jest.mock('../../../src/validators/user/existing', () => ({
            validate: jest.fn().mockName('ex.validate')
        }))

        validator = require('../../../src/validators/user/user')
        ev = require('../../../src/validators/user/email')
        pv = require('../../../src/validators/user/password')
        uv = require('../../../src/validators/user/username')
        ex = require('../../../src/validators/user/existing')
    })

    it('should successfully validate the user', async () => {
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
        ex.validate.mockImplementation((p, res) => {
            return Promise.resolve()
        })

        const actual = await validator.validate(user)

        expect(actual.isValid).toEqual(true)
        expect(actual.messages).toStrictEqual([])
    })

    it('should fail validation at username', async () => {
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

        const actual = await validator.validate(user)

        expect(actual.isValid).toEqual(false)
        expect(actual.messages).toStrictEqual(['username failed somehow'])
    })

    it('should fail validation at email', async () => {
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

        const actual = await validator.validate(user)

        expect(actual.isValid).toEqual(false)
        expect(actual.messages).toStrictEqual(['email failed somehow'])
    })

    it('should fail validation at password', async () => {
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

        const actual = await validator.validate(user)

        expect(actual.isValid).toEqual(false)
        expect(actual.messages).toStrictEqual(['password failed somehow'])
    })

    it('should fail validation on existing elements', async () => {
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
        ex.validate.mockImplementation((p, res) => {
            res.isValid = false
            res.messages.push('email exists failed somehow')
            return Promise.resolve()
        })

        const actual = await validator.validate(user)

        expect(actual.isValid).toEqual(false)
        expect(actual.messages).toStrictEqual(['email exists failed somehow'])
    })

    it('should not call existing validations when other scenarios fail', async () => {
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
        ex.validate.mockImplementation((p, res) => {
            return Promise.resolve
        })

        const actual = await validator.validate(user)

        expect(ex.validate).toHaveBeenCalledTimes(0)
    })
})