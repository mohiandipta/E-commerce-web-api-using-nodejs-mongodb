const express = require('express')
const app = express()


// api will be in http://localhost:3000/api/v1/product
app.get('/', (req, res) => {
    res.send('Hello world')
})


app.listen(3000, () => {
    console.log('Server is running  at http://localhost:3000')
})