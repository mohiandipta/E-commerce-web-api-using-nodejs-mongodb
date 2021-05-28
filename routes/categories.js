const express = require('express')
const { Category } = require('../model/category')
const router = express.Router();


//get
router.get(`/`, async (rreq, res) => {
    const categoryList = await Category.find({})
    res.send(categoryList)
})

//post
router.post('/', (res, req) => {
    const category = new Category({
        name: req.body.name,
        image: req.body.image,
        dictributor: req.body.dictributor
    })
    category.save()
        .then((createdProduct) => {
            res.status(201).json(createdCategory)
        })
        .catch((err) => {
            res.status(500).json({
                error: err,
                success: false
            })
        })
})


module.exports = router;