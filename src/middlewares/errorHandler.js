const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        code: err.code || 'INTERNAL_SERVER_ERROR',
        message: err.message || 'Ah ocurrido un error inesperado',
        details: err.details || ''
    })
}
module.exports = errorHandler;