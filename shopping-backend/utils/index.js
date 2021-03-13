var jwt = require('jsonwebtoken');

var generatetoken = (id) => {
    return jwt.sign({
        id
    }, "ABC123", {
        expiresIn: "30d"
    })
}

module.exports = generatetoken;