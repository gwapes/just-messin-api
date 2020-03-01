const isAlphaNumeric = (string) => {
    return string.match(/^[0-9a-z]+$/)
}

module.exports = { isAlphaNumeric }