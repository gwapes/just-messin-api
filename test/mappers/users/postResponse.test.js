describe('users post response mapper tests', () => {
    let mapper

    beforeEach(() => {
        mapper = require('../../../src/mappers/users/postResponse')
    })

    it('should return the response without the password', () => {
        let response = {
            username: 'user',
            password: 'pass',
            email: 'email',
            _id: '1'
        }
        let expected = {
            username: 'user',
            email: 'email',
            _id: '1'
        }

        let actual = mapper.map(response)

        expect(actual).toStrictEqual(expected)
    })

    it('should return an object that is not the same instance as the original response', () => {
        let response = {
            username: 'user',
            password: 'pass',
            email: 'email',
            _id: '1'
        }

        let actual = mapper.map(response)

        expect(actual).not.toBe(response)
    })
})