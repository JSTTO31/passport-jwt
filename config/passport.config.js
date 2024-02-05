const JWTStragegy = require('passport-jwt').Strategy
const ExtractStragegy = require('passport-jwt').ExtractJwt
const path = require('path')
const User = require('mongoose').model('User')
const bcrypt = require('bcrypt')
const fs = require('fs')

const destination = path.join(__dirname, '..', 'secret/public-key.pem')
const publicKey = fs.readFileSync(destination, 'utf8')


const options = {}
options.jwtFromRequest = ExtractStragegy.fromAuthHeaderAsBearerToken()
options.secretOrKey = publicKey
options.algorithm = ['RS256']

/**
 * Passport Local Strategy Configuration Function
 * 
 * @param {*} passport 
 */

module.exports = function(passport){
    passport.use(new JWTStragegy(options, async (payload, done) => {
        try {
            const user = await User.findById(payload.sub)
            if(!user) return done(null, false)
            
            return done(null, user)
            
        } catch (error) {
            done(error, false)
        }
    }))
}