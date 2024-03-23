const generateErrorDetails = (error) => {
    return error.details.map((err) => {
        return {
            message: err.message,
            path: err.path.join('.')
        }
    })
}

module.exports = generateErrorDetails