const jwt = require('jsonwebtoken');
const KEY = process.env.SECRET_JWT_KEY

const sign = (data) => {
    const token = jwt.sign(data, KEY);

    console.log("TOKEN GENERATED:", token)

    return token;
};

const verify = (token) => {
    try {
        console.log('Token:', token);
        return jwt.verify(token, KEY);
    } catch (error) {
        return null
    }
}

module.exports = { sign, verify };

