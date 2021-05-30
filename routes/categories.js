const express = require('express')
const { Category } = require('../model/category')
const router = express.Router();

//get
router.get(`/`, async (req, res) => {
    const categoryList = await Category.find({})
    res.send(categoryList)
})


module.exports = router;