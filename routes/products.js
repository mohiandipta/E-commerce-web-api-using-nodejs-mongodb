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


//url link will be http://localhost:3000/api/v1/products/(ID)
//delete data
router.delete('/:id', (req, res) => {
    Product.findByIdAndRemove(req.params.id)
        .then(product => {
            if (product) {
                return res.status(200).json({ success: true, message: 'the product has been deleted!' })
            } else {
                return res.status(404).json({ success: false, message: 'the product not found!' })
            }
        }).catch(err => {
            return res.status(400), json({ success: false, error: err })
        })
})


module.exports = router