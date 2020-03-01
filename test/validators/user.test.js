describe('user validator tests', () => {
    let validator
    
    beforeEach(() => {
        validator = require('../../src/validators/user')
    })

    it.each(
        [
            ['bad12name!!@', ['Username must be an alpha numeric string.']]
        ]
    )('should return username as invalid with correct message', (username, expectedMessages) => {
        const user = {
            username: username
        }

        const actual = validator.validate(user)

        expect(actual.isValid).toEqual(false)
        expect(actual.messages).toStrictEqual(expectedMessages)
    })
})