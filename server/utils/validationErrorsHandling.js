/* eslint-disable node/no-unsupported-features/es-syntax */
const formatErrors = errorMessage => {
    const errors = {}

    const allErrors = errorMessage.substring(errorMessage.indexOf(':') + 1).trim()
    const arrayOfErrors = allErrors.split(',').map(err => err.trim())

    arrayOfErrors.forEach(error => {
        const [key, value] = error.split(':').map(err => err.trim())
        errors[key] = value
    });

    return errors
}

export default formatErrors