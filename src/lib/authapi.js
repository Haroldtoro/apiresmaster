const jwt = require('jsonwebtoken');
const config = require('../config');
    
    function isAuthInApi (req,res,next){
        const token = req.headers['token'];
        if (!token) {
            return res.status(401).json({
                auth: false,
                message: 'No posee una llave de autentificacion'
            });
        }
        try {
        const decode = jwt.verify(token,config.secret);
        req.userId=decode.id;
        next();
        } catch (error) {
            res.status(401).json({
                auth: false,
                message: 'No posee una llave de autentificacion correcta'
            });
        }
    }

    module.exports = isAuthInApi