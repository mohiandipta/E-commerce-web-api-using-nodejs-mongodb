const express = require('express')
const router = express.Router()
const { Product } = require('../models/product')


// POST product => DATABSE
// post data
router.post(`/`, (req, res) => {
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock
    })
    product.save()
        .then((createdProduct => {
            res.status(201).json(createdProduct)
        }))
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
router.get(`/`, async (req, res) => {
    const productsList = await Product.find()
    // detecting issues
    if (!productList) {
        res.status(500).json({
            success: false
        })
    }
    res.send(productsList)
})


module.exports = router