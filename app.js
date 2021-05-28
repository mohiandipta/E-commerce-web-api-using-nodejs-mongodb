const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const productsRouter = require('./routes/products')
const categoryRouter = require('./routes/categories')


require('dotenv/config')
const api = process.env.API_URL



//middleware method
app.use(express.json());
app.use(morgan('tiny'))

app.use(`${api}/products`, productsRouter)
app.use(`${api}/category`, categoryRouter)

//Model path
const Product = require('./model/product')
const Category = require('./model/category')



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



app.listen(3000, () => {
    console.log(api)
    console.log('Server is running  at http://localhost:3000')
})