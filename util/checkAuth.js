const jwt = require('jsonwebtoken')
const {AuthenticationError} = require('apollo-server')
const {SECRETKEY} = require('../config')

module.exports = context =>{
    const authHeader = context.req.headers.authorization

    if(authHeader){

        const token = authHeader.split('Bearer ')[1]
        
        if(token){
            try {
                const user = jwt.verify(token, SECRETKEY)
                return user
            } catch (error) {
                throw new AuthenticationError('Invalid/Expired token')
            }
        }

        throw new Error('Authentication token must be \'Bearer [toke]')
    }
    throw new Error('Authorization header must be provided')
}