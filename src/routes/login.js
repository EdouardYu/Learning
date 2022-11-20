const User = require('../models/model-user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const privateKey = require('../auth/private_key');

module.exports = (app) => {
    app.post('/api/login', (req, res) => {
        User.findOne({username: req.body.username}).then(user => {
            let message = '';
            if(!user) {
                message = `L\'identifiant (et / ou) le mot de passe (sont / est) inccorect(s).`;
                return res.status(400).json({message});
            }
            bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {
                if(!isPasswordValid) {
                    message = `L\'identifiant (et / ou) le mot de passe (sont / est) inccorect(s).`;
                    return res.status(400).json({message});
                };
                //Génération d'un token jwt
                token = jwt.sign(
                    { user_id: user._id },
                    privateKey,
                    { expiresIn: '24h' }
                );
                message = `Vous avez été connecté avec succès.`;
                return res.json({message, data: user, token});
            }).catch(() => {
                message = 'Erreur 500 : Vous n\'avez pas pu être connecté. Réessayez plus tard.';
                return res.status(500).json({message});
            });
        }).catch(() => {
            message = 'Erreur 500 : Vous n\'avez pas pu être connecté. Réessayez plus tard.';
            return res.status(500).json({message});
        });
    });
}