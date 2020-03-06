describe('password encryptor tests', () => {
    let encryptor
    let c
    let p
    let f

    beforeEach(() => {
        jest.resetModules()
        jest.resetAllMocks()

        jest.mock('crypto', () => ({
            publicEncrypt: jest.fn().mockName('c.publicEncrypt')
        }))
        jest.mock('path', () => ({
            resolve: jest.fn().mockName('p.resolve')
        }))
        jest.mock('fs', () => ({
            readFileSync: jest.fn().mockName('f.readFileSync')
        }))

        encryptor = require('../../src/encryptors/user-data')
        c = require('crypto')
        p = require('path')
        f = require('fs')
    })

    it('should return the encoded encrypted string result', () => {
        p.resolve.mockReturnValue('blah/blah/blah.file')
        f.readFileSync.mockReturnValue('this-is-the-master-key')
        c.publicEncrypt.mockImplementation(() => Buffer.from('lol'))

        let actual = encryptor.encrypt('string-to-encrypt')

        expect(actual).toEqual(btoa('lol'))
    })
})