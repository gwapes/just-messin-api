const map = (response) => {
    let mapped = { ...response }

    delete mapped.password

    return mapped
}

module.exports = { map }