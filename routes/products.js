const express = require('express')
const { Product } = require('../model/product')
const router = express.Router()


// api will be in http://localhost:3000/api/v1/products
router.get(`/`, async (req, res) => {
    const productList = await Product.find()
    res.send(productList)
})

//post data
router.post(`/`, (req, res) => {
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


module.exports = router