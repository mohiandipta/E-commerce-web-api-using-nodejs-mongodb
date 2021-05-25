const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')


// getting value from .env
require('dotenv/config')
const api = process.env.API_URL



// middleware method
app.use(express.json());
app.use(morgan('tiny'))


// routers
const categoriesRoutes = require('./routes/categories')
const ordersRoutes = require('./routes/orders')
const usersRoutes = require('./routes/users')
const productRoutes = require('./routes/products')

app.use(`${api}/products`, categoriesRoutes)
app.use(`${api}/orders`, ordersRoutes)
app.use(`${api}/users`, usersRoutes)
app.use(`${api}/products`, productRoutes)




// mongodb database connection
mongoose.connect(process.env.CONNECTION_STRING,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'eshop-database'
    })
    .then(() => {
        console.log('database connection is ready')
    })
    .catch((err) => {
        console.log('database cant connected')
    })


// server
app.listen(3000, () => {
    console.log(api)
    console.log('Server is running  at http://localhost:3000')
})