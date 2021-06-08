const express = require('express')
const { User } = require('../model/user')
const bcrypt = require('bcryptjs')
const router = express.Router();



//api will be in http://localhost:3000/api/v1/categories
//get all data
router.get(`/`, async (req, res) => {
    let userList = await User.find().select('-password') //using select() to get user list excluding password
    res.send(userList)
})

//get data by ID
//url will be in http://localhost:3000/api/v1/categories/ID
router.get('/:id', async (req, res) => {
    let user = await User.findById(req.params.id).select('-password')
    if (!user) {
        return res.status(500).json({ message: 'the user with the given ID was not found' })
    }
    res.status(200).send(user)
})

//put(update) data by ID
router.put('/:id', async (req, res) => {
    let user = await User.findByIdAndUpdate(
        req.params.id,
        {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
        }
    )
    if (!user) {
        return res.status(500).json({ message: 'the user with the given ID was not found' })
    }
    res.status(200).send(user)
})

//post data
router.post('/', async (req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 5), //using bcryptjs to hashing user password//
        isAdmin: req.body.isAdmin,
        phone: req.body.phone,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
    })
    user = await user.save();
    if (!user) {
        console.log('the user can not be created')
    }
    res.send(user);
})


//url link will be http://localhost:3000/api/v1/categories/(ID)
//delete data
router.delete('/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id)
        .then(user => {
            if (user) {
                return res.status(200).json({ success: true, message: 'the user has been deleted!' })
            } else {
                return res.status(404).json({ success: false, message: 'the user not found!' })
            }
        }).catch(err => {
            return res.status(400).json({ success: false, error: err })
        })
})


module.exports = router;