const router = require('express').Router()
const { default: mongoose } = require('mongoose')
const hashPasswordUtil = require('../utils/hashPassword.util')
const User = require('mongoose').model('User')
const bcrypt = require('bcrypt')
const issueJWT = require('../utils/issueJWT')


router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})
        if(!user) return res.send({message: 'Invalid Email address'})
        const match = await bcrypt.compare(password, user.password)
        if(!match) return res.send({message: 'Invalid password!'})

        return res.send({message: 'successfully login!', user, ...issueJWT(user)})
    } catch (error) {
        console.log(error);
        if(error){
            res.status(500).send(error)
        }else{
            res.sendStatus(500)
        }
    }
})

router.post('/register', async (req, res, next) => {
    try {
        const {name, email, password} = req.body
        const hashedPassword = await hashPasswordUtil(password)
        
        const user = await User.create({
            _id: new mongoose.Types.ObjectId(),
            name,
            email,
            password: hashedPassword
        })

        res.status(200).send({
            user, ...issueJWT(user)
        })

        
    } catch (error) {
        console.log(error);
        if(!error){
            res.sendStatus(500)
        }else{
            res.status(422).send(error)
        }
    }
}, )

module.exports = router