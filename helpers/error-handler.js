function errorHandler(err, req, res, next) {
    if (err.name === 'UnauhtorizedError') {
        // jwt authentication error
        return res.status(401).json({ message: 'The user is not authorized' }) //authentication error handling
    }
    if (err.name === 'ValidationError') {
        // validation error
        return res.status(401).json({ message: err }) //authentication error handling
    }

    // default to 500 server error
    res.status(500).json(err)
}

module.exports = errorHandler;