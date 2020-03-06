describe('users post request mapper tests', () => {
    let maopper
    let e

    beforeEach(() => {
        jest.resetModules()
        jest.resetAllMocks()

        jest.mock('../../../src/encryptors/password', () => ({
            encrypt: jest.fn().mockName('e.encrypt')
        }))

        mapper = require('../../../src/mappers/users/postRequest')
        e = require('../../../src/encryptors/password')
    })

    it('should return request object with encrypted password back', () => {
        let request = {
            username: 'user',
            password: 'pass',
            email: 'email'
        }
        let expected = {
            username: 'user',
            password: 'HABBAJABBAFAKEENCRYPTEDVALUE',
            email: 'email'
        }
        e.encrypt.mockReturnValue('HABBAJABBAFAKEENCRYPTEDVALUE')

        let actual = mapper.map(request)

        expect(actual).toStrictEqual(expected)
    })

    it('should return an object that is not the same instance as the request', () => {
        let request = {
            username: 'user',
            password: 'pass',
            email: 'email'
        }
        e.encrypt.mockReturnValue('HABBAJABBAFAKEENCRYPTEDVALUE')

        let actual = mapper.map(request)

        expect(actual).not.toBe(request)
    })
})