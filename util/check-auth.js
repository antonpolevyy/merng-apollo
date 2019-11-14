const { AuthenticationError } = require('apollo-server');

const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');


module.exports = (context) => {
    // context = { ... headers }
    // aka by this step context should have many things and 'headers' among them
    const authHeader = context.req.headers.authorization;
    if (authHeader) {
        // in POST request token should be in the header string and look like this
        // "Bearer [token]"
        const token = authHeader.split('Bearer ')[1];
        if(token) {
            try{
                const user = jwt.verify(token, SECRET_KEY);
                return user;
            } catch(err) {
                throw new AuthenticationError('Invalid/Expired token');
            }
        }
        throw new Error('Authentication token must be \'Bearer [token]\'');
    }
    throw new Error('Authorization header must be provided');
}