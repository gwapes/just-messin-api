const validate = (email, response) => {
    const emailParts = email.split('@')

    if(emailParts.length !== 2){
        response.isValid = false
        response.messages.push('Email address must be of correct email address format (e.g. myname@domain.com).')
        return
    }

    validatePersonalInfo(emailParts[0], response)
    validateDomain(emailParts[1], response)
}

const validatePersonalInfo = (personalInfo, response) => {
    if(personalInfo.length > 64){
        response.isValid = false
        response.messages.push('First portion of email address cannot be greater than 64 characters in length.')
    }

    if(!personalInfo.match(/^[^.][0-9a-zA-Z!#$%&'*+\-/=?^_`{|}~.]+[^.]$/)){
        response.isValid = false
        response.messages.push('First portion of email address contains invalid characters.')
    }
}

const validateDomain = (domain, response) => {
    if(domain.length > 253){
        response.isValid = false
        response.messages.push('Second portion of email address cannot be greater than 253 chracters in length.')
    }

    if(!domain.match(/^[0-9a-zA-Z\-.]+$/)){
        response.isValid = false
        response.messages.push('Second portion of email address contains invalid characters.')
    }
}

module.exports = { validate }