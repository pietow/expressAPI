/** @format */
'use strict'

const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000
const BookController = require('./controller/book.controller')
const UserController = require('./controller/user.controller')

app.use(express.urlencoded({ extended: true })) //If extended is false, you can not post "nested object"
app.use('/', cors())
app.use('/book', BookController)
app.use('/user', UserController)

app.listen(port, () => {
    console.log(
        `Express started on http://localhost:${port}` +
            '; press Ctrl-C to terminate.',
    )
})
