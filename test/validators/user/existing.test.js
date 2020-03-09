describe('existing validator tests', () => {
    let validator
    let da
    let en

    beforeEach(() => {
        jest.resetModules()
        jest.resetAllMocks()

        jest.mock('../../../src/data-access/account-data', () => ({
            retrieveUser: jest.fn().mockName('da.retrieveUser')
        }))
        jest.mock('../../../src/encryptors/user-data', () => ({
            encrypt: jest.fn().mockName('en.encrypt')
        }))

        validator = require('../../../src/validators/user/existing')
        da = require('../../../src/data-access/account-data')
        en = require('../../../src/encryptors/user-data')
    })

    it('should respond with valid as true', async () => {
        let actual = {
            isValid: true,
            messages: []
        }
        let user = {
            username: 'gwapes',
            email: 'gwapes@email.com'
        }
        da.retrieveUser.mockResolvedValue(undefined)
        en.encrypt.mockReturnValue('AdbahdbAIDGjnjnio*!()&*!@)NN01803710')

        await validator.validate(user, actual)

        expect(actual).toStrictEqual({
            isValid: true,
            messages: []
        })
    })

    it('should respond with failed validation when username exists', async () => {
        let actual = {
            isValid: true,
            messages: []
        }
        let expected = {
            isValid: false,
            messages: ['Chosen username is already in use. Please select a new unique username.']
        }
        let user = {
            username: 'gwapes',
            email: 'gwapes@email.com'
        }
        da.retrieveUser.mockImplementationOnce(() => {
            return Promise.resolve({ user: 'exists' })
        })
        da.retrieveUser.mockImplementationOnce(() => {
            return Promise.resolve(null)
        })
        en.encrypt.mockReturnValue('AdbahdbAIDGjnjnio*!()&*!@)NN01803710')

        await validator.validate(user, actual)

        expect(actual).toStrictEqual(expected)
    })

    it('should respond with failed validation when email exists', async () => {
        let actual = {
            isValid: true,
            messages: []
        }
        let expected = {
            isValid: false,
            messages: ['Email entered is already registed under a valid account.']
        }
        let user = {
            username: 'gwapes',
            email: 'gwapes@email.com'
        }
        da.retrieveUser.mockImplementationOnce(() => {
            return Promise.resolve(null)
        })
        da.retrieveUser.mockImplementationOnce(() => {
            return Promise.resolve({ user: 'exists' })
        })
        en.encrypt.mockReturnValue('AdbahdbAIDGjnjnio*!()&*!@)NN01803710')

        await validator.validate(user, actual)

        expect(actual).toStrictEqual(expected)
    })
})