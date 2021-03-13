const mongoose = require('mongoose');


const connectdb = async () => {
    try {
        const result = await mongoose.connect('mongodb+srv://mengmeng:1234' +
            '@cluster0.b7bzc.mongodb.net/project2back', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log(`database is running on ${result.connection.host}`)
    } catch (error) {
        console.log("database connect error")
    }
}
module.exports = connectdb;

