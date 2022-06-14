/** @format */

const express = require('express')
const app = express()
const port = 3000
const books = require('./techBook.json')
const BookController = require('./Controller/book.controller.js')
const cors = require('cors')

app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use('/books', BookController)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
