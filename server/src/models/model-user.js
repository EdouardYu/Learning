const mongoose = require('mongoose');

const user = mongoose.Schema({ 
    _id: {
        type: Number,
        required: true,
        min: 0,
        validate : Number.isInteger
    },
    username: {
        type: String,
        unique: true,
        required: [true, 'Veuillez vous identifier.'],
        minLength: [2, 'Le pseudo doit contenir entre 2 et 20 caractères.'],
        maxLength: [20, 'Le pseudo doit contenir entre 2 et 20 caractères.']
    },
    password: {
        type: String,
        required: [true, 'Veuillez renseigner votre mot de passe.']
    },
}, { versionKey: false });

module.exports = mongoose.model('User', user)
