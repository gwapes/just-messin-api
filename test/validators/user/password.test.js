describe('Password validator tests', () => {
    let validator

    beforeEach(() => {
        validator = require('./../../../src/validators/user/password')
    })

    it('should respond that password is valid', () => {
        let actual = {
            isValid: true,
            messages: []
        }

        validator.validate('Good$9%1', actual)

        expect(actual.isValid).toEqual(true)
        expect(actual.messages).toStrictEqual([])
    })

    it.each([
        ['string length', 'Good$9', ['Password must be at least 8 characters in length.']],
        ['decimal character', 'Bad!@#$%', ['Password must contain at least on numeric character.']],
        ['lowercase alpha character', 'BAD123#$%', ['Password must contain at least one lowercase alphabetic character.']],
        ['uppercase alpha character', 'bad12#$%', ['Password must contain at least one uppercase alphabetic character.']],
        ['special character', 'Bad12345', ['Password must contain at least one special character.']],
        ['falsey check', '', ['Password is a required field for account creation.']],
        ['falsey check', null, ['Password is a required field for account creation.']],
        ['falsey check', undefined, ['Password is a required field for account creation.']]
    ])('should fail on %s validation', (n, password, expectedMessage) => {
        let actual = {
            isValid: true,
            messages: []
        }

        validator.validate(password, actual)

        expect(actual.isValid).toEqual(false)
        expect(actual.messages).toStrictEqual(expectedMessage)
    })
})