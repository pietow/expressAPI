/** @format */

const express = require('express')
const app = express()
const port = 3000
const BookController = require('./controller/book.controller')

app.use(express.urlencoded({ extended: true })) //If extended is false, you can not post "nested object"
app.use('/book', BookController)

app.listen(port, () => {
    console.log(
        `Express started on http://localhost:${port}` +
            '; press Ctrl-C to terminate.',
    )
})
