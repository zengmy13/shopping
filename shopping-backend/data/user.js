const bcrypt = require("bcryptjs")
const users = [{
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true
},
    {
        name: "meng",
        email: "meng@example.com",
        password: bcrypt.hashSync("123456", 10),
    },
    {
        name: "yi",
        email: "yi@example.com",
        password: bcrypt.hashSync("123456", 10),
    }
]

module.exports = users;