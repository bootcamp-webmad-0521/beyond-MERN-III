const mongoose = require('mongoose')

module.exports = {
    isValidIdFormat: id => mongoose.Types.ObjectId.isValid(id),
    handleMongoooseError: err => {
        const errors = []
        if (err instanceof mongoose.Error.ValidationError) {
            Object.values(err.errors).map(elm => errors.push(elm.message))
        } else if (err.code === 11000) {
            errors.push('Registro ya existente en la base de datos')
        }

        return errors
    }
}