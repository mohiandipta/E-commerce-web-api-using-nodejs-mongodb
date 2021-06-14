const express = require('express')
const { Order } = require('../model/order');
const { OrderItem } = require('../model/OrderItem');
const { User } = require('../model/user')
const router = express.Router();


//api will be in http://localhost:3000/api/v1/orders
//get data
router.get('/', async (req, res) => {
    let orderList = await Order.find()
    res.send(orderList)
})


//get data by ID
//url will be in http://localhost:3000/api/v1/orders/ID
router.get('/:id', async (req, res) => {
    let order = await Order.findById(req.params.id)
    if (!order) {
        return res.status(500).json({ message: 'the order with the given ID was not found' })
    }
    res.status(200).send(order)
})


//post order
router.post('/', async (req, res) => {
    const orderItemsIds = req.body.orderItems.map(async orderItem => {
        newOrderItem = new OrderItem({
            quantity: orderItem.quantity,
            product: orderItem.product
        })

        newOrderItem = await newOrderItem.save()

        return newOrderItem._id
    })
    let order = new Order({
        orderItem: orderItemsIds,
        shippingAddress1: req.body.shippingAddress1,
        shippingAddress2: req.body.shippingAddress2,
        city: req.body.city,
        zip: req.body.city,
        country: req.body.country,
        phone: req.body.phone,
        status: req.body.status,
        totalPrice: req.body.totalPrice,
        user: req.body.user
    })
    order = await order.save()
    if (!order) {
        return res.status(400).send('the order cannot be created')
    }
    res.send(order)
})


//post data by user
router.post('/', async (req, res) => {
    //validating user
    let user = await User.findById(req.body.user)
    if (!user) {
        return res.status(500).send('Invalid user')
    }

    let order = new Order({
        name: req.body.name,
        quantity: req.body.quantity,
        userID: req.body.userID,
        price: req.body.price,
        discount: req.body.discount,
        payment: req.body.payment,
    })
    order = await order.save()
    if (!order) {
        return res.status(500).send({ message: 'the order can not be created' })
    }
    res.send(order)
})


//url link will be http://localhost:3000/api/v1/products/(ID)
//delete data by id
router.delete('/:id', (req, res) => {
    Order.findByIdAndRemove(req.params.id)
        .then(order => {
            if (order) {
                return res.status(200).json({ success: true, message: 'the order has been deleted!' })
            } else {
                return res.status(404).json({ success: false, message: 'the order not found!' })
            }
        }).catch(err => {
            return res.status(400), json({ success: false, error: err })
        })
})


module.exports = router;