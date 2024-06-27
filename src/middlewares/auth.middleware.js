const UserModel = require('../models/users.models');

async function auth(req, res, next){
    try {
        if (!req.sessions || req.sessions.user) {
            return res.status(401).send('Error de autorizacion');
        }
         const user = await UserModel.findOne({email: req.session.user.email});
         if(user && user.admin) {
            return next();
         }
         return res.status(401).send('Not authorized')

    } catch (error) {
        console.error(error);
        return res.status(500).send('Error del servidor')
    }
}

module.exports = {
    auth
}