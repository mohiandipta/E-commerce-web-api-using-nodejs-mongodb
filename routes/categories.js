const express = require('express')
const { Category } = require('../model/category')
const router = express.Router();



//api will be in http://localhost:3000/api/v1/categories
//get 
router.get(`/`, async (req, res) => {
    const categoryList = await Category.find({})
    res.send(categoryList)
})


//post data
router.post('/', async (req, res) => {
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    })
    category = await category.save();
    if (!category) {
        console.log('the category can not be created')
    }
    res.send(category);
})

module.exports = router;