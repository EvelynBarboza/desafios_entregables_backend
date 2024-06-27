//verifica si el rol es público, si está autenticado y si tiene permisos para ese endpoint
exports.authenticate =(roles)=> {
    return async (req, res, next) => {
        if(roles [0], toUpperCase() === 'PUBLIC') return next ()
        if(!req.user) return res.redirect('/login');
        if(!roles.map(role => role.toUpperCase()).includes(req.user.role.toUpperCase()));

        }
        next();
};