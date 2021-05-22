const express = require('express')
const app = express()
const bodyParser = require('body-parser')
require('dotenv/config')

const api = process.env.API_URL


//middleware method
app.use(express.json());



// api will be in http://localhost:3000/api/v1/product
app.get(`${api}/products`, (req, res) => {
    const products = {
        id: 1,
        name: 'Mobile',
        image: 'Some_url'
    }
    res.send(products)
})

app.post(`${api}/products`, (req, res) => {
    const newProduct = req.body
    console.log(newProduct)
    res.send(newProduct)
})


app.listen(3000, () => {
    console.log(api)
    console.log('Server is running  at http://localhost:3000')
})