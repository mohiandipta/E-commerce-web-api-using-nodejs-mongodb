const express = require('express')
const app = express()
require('dotenv/config')

const api = process.env.API_URL


// api will be in http://localhost:3000/api/v1/product
app.get(api + '/products', (req, res) => {
    res.send('Hello world')
})


app.listen(3000, () => {
    console.log(api)
    console.log('Server is running  at http://localhost:3000')
})