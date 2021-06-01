const { json } = require('body-parser');
const express = require('express')
const { Category } = require('../model/category')
const router = express.Router();



//api will be in http://localhost:3000/api/v1/categories
//get all data
router.get(`/`, async (req, res) => {
    const categoryList = await Category.find({})
    res.send(categoryList)
})

//get data by ID
//url will be in http://localhost:3000/api/v1/categories/ID
router.get('/:id', async (req, res) => {
    const category = await Category.findById(req.params.id)
    if (!category) {
        return res.status(500).json({ message: 'the category with the given ID was not found' })
    }
    res.status(200).send(category)
})

//put(update) data by ID
router.put('/:id', async (req, res) => {
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color
        }
    )
    if (!category) {
        return res.status(500).json({ message: 'the category with the given ID was not found' })
    }
    res.status(200).send(category)
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


//url link will be http://localhost:3000/api/v1/categories/(ID)
//delete data
router.delete('/:id', (req, res) => {
    Category.findByIdAndRemove(req.params.id)
        .then(category => {
            if (category) {
                return res.status(200).json({ success: true, message: 'the category has been deleted!' })
            } else {
                return res.status(404).json({ success: false, message: 'the category not found!' })
            }
        }).catch(err => {
            return res.status(400), json({ success: false, error: err })
        })
})


module.exports = router;