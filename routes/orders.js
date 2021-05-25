const user = require('../models/order')
const express = require('express')
const router = express.Router()


router.get(`/`, async (req, res) => {
    const orderList = await Product.find()
    // detecting issues
    if (!orderList) {
        res.status(500).json({
            success: false
        })
    }
    res.send(orderList)
})



module.exports = router