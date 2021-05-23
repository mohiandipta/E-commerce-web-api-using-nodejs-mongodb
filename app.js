const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')


require('dotenv/config')
const api = process.env.API_URL



//middleware method
app.use(express.json());
app.use(morgan('tiny'))



// api will be in http://localhost:3000/api/v1/product
app.get(`${api}/products`, (req, res) => {
    const products = {
        id: 1,
        name: 'Mobile',
        image: 'Some_url'
    }
    res.send(products)
})

//post data
app.post(`${api}/products`, (req, res) => {
    const newProduct = req.body
    console.log(newProduct)
    res.send(newProduct)
})


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
    .catch(() => {
        console.log('database cant connected')
    })



app.listen(3000, () => {
    console.log(api)
    console.log('Server is running  at http://localhost:3000')
})