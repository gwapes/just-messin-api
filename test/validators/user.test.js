describe('user validator tests', () => {
    let validator
    
    beforeEach(() => {
        validator = require('../../src/validators/user')
    })

    it('should successfully validate the user', () => {
        const user = {
            username: 'gwapes'
        }

        const actual = validator.validate(user)

        expect(actual.isValid).toEqual(true)
        expect(actual.messages).toStrictEqual([])
    })

    it.each(
        [
            ['bad12name!!@', ['Username must be an alpha numeric string.']],
            ['', ['A username must be supplied at account creation.']],
            [null, ['A username must be supplied at account creation.']],
            [undefined, ['A username must be supplied at account creation.']],
            ['1234', ['Username must be between 5 and 25 characters in length.']],
            ['ThereAreTooManyCharactersInMyUsernameProbably', ['Username must be between 5 and 25 characters in length.']]
        ]
    )('should return username: %s as invalid with correct message', (username, expectedMessages) => {
        const user = {
            username: username
        }

        const actual = validator.validate(user)

        expect(actual.isValid).toEqual(false)
        expect(actual.messages).toStrictEqual(expectedMessages)
    })
})