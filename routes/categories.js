const user = require('../models/category')
const express = require('express')
const router = express.Router()


router.get(`/`, async (req, res) => {
    const categoryList = await Product.find()
    // detecting issues
    if (!categoryList) {
        res.status(500).json({
            success: false
        })
    }
    res.send(categoryList)
})


module.exports = router