describe('users post request mapper tests', () => {
    let mapper
    let e

    beforeEach(() => {
        jest.resetModules()
        jest.resetAllMocks()

        jest.mock('../../../src/encryptors/user-data', () => ({
            encrypt: jest.fn().mockName('e.encrypt')
        }))

        mapper = require('../../../src/mappers/users/post-request')
        e = require('../../../src/encryptors/user-data')
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
            email: 'ADHSDHASDHASHDASHDASHDASHD'
        }
        e.encrypt.mockReturnValueOnce('HABBAJABBAFAKEENCRYPTEDVALUE')
        e.encrypt.mockReturnValueOnce('ADHSDHASDHASHDASHDASHDASHD')

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