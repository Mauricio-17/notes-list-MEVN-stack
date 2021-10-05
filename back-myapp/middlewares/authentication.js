//@ts-check
const jwt = require('jsonwebtoken')

const verificarAuth = (req, res, next) => {

    const token = req.get('token')
    jwt.verify(token, 'secret', (err, decoded) => {
        if(err) {
            return res.status(401).json({
                message: 'Invalid User'
            })
        }
        req.user = decoded.data
        next()
    })
    
}
const verificarAdmin = (req, res, next) => {
    
    const role = req.user.role
    console.log(role)
    if(role === 'ADMIN'){
        next()
    }else{
        return res.status(401).json({
            message: 'Invalid User'
        })
    }
}

module.exports = {verificarAuth, verificarAdmin}