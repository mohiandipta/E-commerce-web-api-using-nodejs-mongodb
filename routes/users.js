const user = require('../models/user')
const express = require('express')
const router = express.Router()


router.get(`/`, async (req, res) => {
    const userList = await Product.find()
    // detecting issues
    if (!userList) {
        res.status(500).json({
            success: false
        })
    }
    res.send(userList)
})


module.exports = router