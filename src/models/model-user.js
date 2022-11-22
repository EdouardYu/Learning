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
        required: [true, 'Veuillez renseigner votre mot de passe.'],
        match: [/^(?=.*[A-ZÆŒ])(?=.*[a-zéàèùâêîôûäëïöüÿçæœ])(?=.*\d)(?=.*[ &#-_^@°+€$£¤%µ*,?;.:!§])([&#-|^@°+€$£¤%µ*,?;.:!§ÆŒéàèùâêîôûäëïöüÿçæœ\w]{8,15})$/, 
            ```Le mot de passe doit contenir entre 8 et 25 caractères et doit posséder au moins une Majuscule,
            une minuscule, un chiffre et un caractère spécial entre : & # - | _ ^ @ ° + € $ £ ¤ % µ * , ? ; . : ! §.```]
    },
}, { versionKey: false });

module.exports = mongoose.model('User', user)
