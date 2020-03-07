describe('users post response mapper tests', () => {
    let mapper
    let d

    beforeEach(() => {
        jest.resetModules()
        jest.resetAllMocks()

        jest.mock('../../../src/decryptors/user-data', () => ({
            decrypt: jest.fn().mockName('d.decrypt')
        }))

        mapper = require('../../../src/mappers/users/post-response')
        d = require('../../../src/decryptors/user-data')
    })

    it('should return the response without the password', () => {
        let response = {
            username: 'user',
            password: {
                hash: 'hashed',
                salt: 'salted'
            },
            email: 'gobbeldygook',
            _id: '1'
        }
        let expected = {
            username: 'user',
            email: 'email',
            _id: '1'
        }
        d.decrypt.mockReturnValue('email')

        let actual = mapper.map(response)

        expect(actual).toStrictEqual(expected)
    })

    it('should return an object that is not the same instance as the original response', () => {
        let response = {
            username: 'user',
            password: {
                hash: 'hashed',
                salt: 'salted'
            },
            email: 'gobbeldygook',
            _id: '1'
        }
        d.decrypt.mockReturnValue('email')

        let actual = mapper.map(response)

        expect(actual).not.toBe(response)
    })
})