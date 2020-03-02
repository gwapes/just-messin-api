describe('email validator tests', () => {
    let validator

    beforeEach(()=> {
        validator = require('../../../src/validators/user/email')
    })

    it('response that email is valid', () => {
        let actual = {
            isValid: true,
            messages: []
        }

        validator.validate('6Az!#$%&\'*+-/=?^_`.{|}~@19-Az.part', actual)

        expect(actual.isValid).toEqual(true)
        expect(actual.messages).toStrictEqual([])
    })

    it.each([
        'gwapes',
        'gwapes@fruit@toomuch.com',
    ])('should indicate %s has incorrect @ characters', (email) => {
        let actual = {
            isValid: true,
            messages: []
        }

        validator.validate(email, actual)

        expect(actual.isValid).toEqual(false)
        expect(actual.messages).toStrictEqual(['Email address must be of correct email address format (e.g. myname@domain.com).'])
    })

    it('should fail if first portion of email is longer than 64 characters', () => {
        let actual = {
            isValid: true,
            messages: []
        }

        validator.validate('wehlpmgvkihffgxgvrzzwwdlvtobphgzurrxvmsnqzfyvrackdxdkghicsllegojc@email.com', actual)

        expect(actual.isValid).toEqual(false)
        expect(actual.messages).toStrictEqual(['First portion of email address cannot be greater than 64 characters in length.'])
    })

    it.each([
        '.period@before.com',
        'period.@after.com',
        '>?<][)(@invalid.com'
    ])('should fail validation when first portion of email %s fails regex (invalid characters)', (email) => {
        let actual = {
            isValid: true,
            messages: []
        }

        validator.validate(email, actual)

        expect(actual.isValid).toEqual(false)
        expect(actual.messages).toStrictEqual(['First portion of email address contains invalid characters.'])
    })

    it('should fail if second portion of email is longer than 253 characters', () => {
        let actual = {
            isValid: true,
            messages: []
        }

        validator.validate('gwapes@ihyurnemdnnxahrnhhujwojebxteumqyiwwkiuhnjduuhmpczhprveqzvgziloogajmjmubtowracipgifyypdzilkjsovbjjjeuszkclrmsngjwetaogzbvhaxqnbxtsyczrleoebopwmfiicahmgvmnddohwyrrycwrxctwdwzrjuiekrqwxmxgowdseyizldhuohxvlbapjlwblqeoahqedvkeymxthbzozyozjxfktpecoxsazwxts.com', actual)

        expect(actual.isValid).toEqual(false)
        expect(actual.messages).toStrictEqual(['Second portion of email address cannot be greater than 253 chracters in length.'])
    })

    it('should fail validation with bad characters in second portion of email', () => {
        let actual = {
            isValid: true,
            messages: []
        }

        validator.validate('gwapes@&^Az9!.c0m', actual)

        expect(actual.isValid).toEqual(false)
        expect(actual.messages).toStrictEqual(['Second portion of email address contains invalid characters.'])
    })
})