const passport = require("passport");

const authenticateAdmin = (req, res, next) => {
    
    passport.authenticate("jwt", (err, user, info)=> {
        console.log("passport.authenticate",err)
        console.log("passport.authenticate",user)
        console.log("passport.authenticate",info)
        if(err){
            return res.status(500).json({
                mensaje: "Error al autenticar el usuario",
                error:err,
                stauts:500
            })
        }
        if(!user){
            return res.status(404).json({
                mensaje: "Usuario no encontrado",
                status:404
            })
        }
        if (user.rol !== "admin"){
        return res.status(401).json({
            mensaje: "Usuario no autorizado, necesitas ser administrador",
            status: 401
        })
    }
    req.user = user
    next()
    })(req, res, next)
}

module.exports = authenticateAdmin