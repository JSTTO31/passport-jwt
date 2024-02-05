const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')
const destination = path.join(__dirname, '..', '/secret/private-key.pem')
const privateKey = fs.readFileSync(destination, 'utf8')

module.exports = function(user){

    const payload = {
        sub: user._id,
        name: user.name,
        iat: Date.now()
    }

    const token = jwt.sign(payload, privateKey, {algorithm: 'RS256', expiresIn: '1d'})

    return {
        token: 'Bearer ' + token, 
        exprireIn: '1d'
    }
}