const isAlphaNumeric = (string) => {
    return string.match(/^[0-9a-zA-Z]+$/)
}

module.exports = { isAlphaNumeric }