const crypto = require('crypto')
const fs = require('fs')

function generateKey(){
    const {privateKey, publicKey} = crypto.generateKeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
          },
        privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
        },
    })
    
    fs.writeFileSync(__dirname + '/secret/public-key.pem', publicKey)
    fs.writeFileSync(__dirname + '/secret/private-key.pem', privateKey)
}

generateKey()