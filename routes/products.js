const express = require('express')
const { Category } = require('../model/category')
const { Product } = require('../model/product')
const router = express.Router()


// api will be in http://localhost:3000/api/v1/products
// router.get(`/`, async (req, res) => {
//     const productList = await Product.find()
//     res.send(productList)
// })
//get data by ID
router.get(`/:id`, async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (!product) {
        return res.status(500).json({ message: 'the product with the given ID was not found' })
    }
    res.status(200).send(product)
})


//get product by filtering and category
//url will be localhost:3000/pi/v1/products?categories:ID,ID
//query parameter is going always after a question (?) mark
router.get(`/`, async (req, res) => {
    let filter = {}
    if (req.query.categories) {
        filter = { category: req.query.categories.split(',') }
    }

    const productList = await Product.find(filter).populate('category')

    if (!productList) {
        res.status(500).json({ success: false, message: 'filtering can not be done' })
    }
    res.send(productList)
})


//post data by category
router.post(`/`, async (req, res) => {
    //validating category
    let category = await Category.findById(req.body.category)
    if (!category) {
        return res.status(500).send('Invalid category')
    }

    let product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured
    })
    product = await product.save()
    if (!product) {
        return res.status(500).send({ message: 'the product can not be created' })
    }
    res.send(product)
})


//url link will be http://localhost:3000/api/v1/products/(ID)
//delete data by id
router.delete(`/:id`, (req, res) => {
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


//product count
router.get(`/get/count`, async (req, res) => {
    const productCount = await Product.countDocuments((count) => count)
    if (!productCount) {
        return res.status(500).json({ success: false })
    }
    res.status(200).send({ productCount: productCount })
})


//product featured
router.get(`/get/featured`, async (req, res) => {
    const productFeatured = await Product.find({ isFeatured: true })
    if (!productFeatured) {
        return res.status(500).json({ success: false })
    }
    res.status(200).send(productFeatured)
})
//limited featured
router.get('/get/featured/:count', async (req, res) => {
    const count = req.params.count ? req.params.count : 0
    const products = await Product.find({ isFeatured: true }).limit(+count)
    if (!products) {
        res.status(500).json({ success: false })
    }
    res.send(products)
})



module.exports = router