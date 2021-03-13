let path = require('path');
let express = require('express');
let env = require('dotenv');
let morgan = require('morgan');
let connectDB = require('./db/index.js');

let productRoutes = require('./routes/index.js');
let userRoutes = require('./routes/users.js');
let orderRoutes = require('./routes/orders.js');
let uploadRoutes = require('./routes/uploads.js');

env.config()

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) =>
    res.send(process.env.PAYPAL_CLIENT_ID)
)

app.use('/uploads', express.static(path.join(path.resolve(), '/upload')))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(path.resolve(), '/shopping-frontend/build')))

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(path.resolve(), 'shopping-frontend', 'build', 'index.html'))
    )
} else {
    app.get('/', (req, res) => {
        res.send('API is running....')
    })
}


const PORT = process.env.PORT || 5000

app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
)