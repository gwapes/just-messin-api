describe('user validator tests', () => {
    let validator
    let uv
    
    beforeEach(() => {
        jest.resetModules()
        jest.resetAllMocks()

        jest.mock('../../../src/validators/user/username', () => ({
            validate: jest.fn().mockName('uv.validate')
        }))

        validator = require('../../../src/validators/user/user')
        uv = require('../../../src/validators/user/username')
    })

    it('should successfully validate the user', () => {
        const user = {
            username: 'gwapes'
        }
        uv.validate.mockImplementation((un, res) => {
            return
        })

        const actual = validator.validate(user)

        expect(actual.isValid).toEqual(true)
        expect(actual.messages).toStrictEqual([])
    })
})