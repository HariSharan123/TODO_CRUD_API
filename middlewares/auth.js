const jwt = require('jsonwebtoken');

module.exports = (request, response, next) => {
    try {
        const authHeader = request.get('Authorization');
        if (!authHeader){
            throw new Error("Auth token is required");
        }
        const token = authHeader.split(' ')[1];
        let decodedToken = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);
    
        request.user = decodedToken;
        request.token = token;
    } catch (error) {
        error.statusCode = 500;
        throw error;
    }

    next();
}

