const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')


require('dotenv/config')
const api = process.env.API_URL



//middleware method
app.use(express.json());
app.use(morgan('tiny'))


// productSchema
const productSchema = mongoose.Schema({
    name: String,
    image: String,
    countInStock: Number
})

const Product = mongoose.model('Product', productSchema)



// POST product => DATABSE
//post data
app.post(`${api}/products`, (req, res) => {
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock
    })
    product.save()
        .then((createdProduct) => {
            res.status(201).json(createdProduct)
        })
        .catch((err) => {
            res.status(500).json({
                error: err,
                success: false
            })
        })
})


// After POST product data
// GET productList FROM DATABASE
// api will be in http://localhost:3000/api/v1/product
app.get(`${api}/products`, async (req, res) => {
    const productsList = await Product.find()
    // detecting issues
    if (!productList) {
        res.status(500).json({
            success: false
        })
    }
    res.send(productsList)
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
    .catch((err) => {
        console.log('database cant connected')
    })



app.listen(3000, () => {
    console.log(api)
    console.log('Server is running  at http://localhost:3000')
})