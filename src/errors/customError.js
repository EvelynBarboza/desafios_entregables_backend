class CustomError extends Error {
    constructor(errorType, details = '') {
        super(errorType.message);
        this.code = errorType.code;
        this.details= details;
    }
}

module.exports = CustomError;