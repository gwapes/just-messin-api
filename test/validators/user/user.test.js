describe('user validator tests', () => {
    let validator
    
    beforeEach(() => {
        validator = require('../../../src/validators/user/user')
    })

    it('should successfully validate the user', () => {
        const user = {
            username: 'gwapes'
        }

        const actual = validator.validate(user)

        expect(actual.isValid).toEqual(true)
        expect(actual.messages).toStrictEqual([])
    })
})