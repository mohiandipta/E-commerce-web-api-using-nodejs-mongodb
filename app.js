const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')


require('dotenv/config')
const api = process.env.API_URL

//cors
app.use(cors())
app.options('*', cors())


//middleware method
app.use(express.json());
app.use(morgan('tiny'))


//routes
const productsRouter = require('./routes/products')
const categoriesRouter = require('./routes/categories')
const ordersRouter = require('./routes/orders')
const usersRouter = require('./routes/users')

app.use(`${api}/products`, productsRouter)
app.use(`${api}/orders`, ordersRouter)
app.use(`${api}/users`, usersRouter)
app.use(`${api}/categories`, categoriesRouter)


// mongodb database connection
mongoose.connect(process.env.CONNECTION_STRING,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        dbName: 'eshop-database'
    })
    .then(() => {
        console.log('database connection is ready')
    })
    .catch((err) => {
        console.log('database can not be connected')
    })


app.listen(3000, () => {
    console.log(api)
    console.log('Server is running  at http://localhost:3000')
})