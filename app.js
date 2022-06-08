/** @format */

const express = require('express')
const app = express()
const port = 3000
const books = require('./techBooks.json') //Load data into memory; To make data persitent, you usally use a Database e.g. MongoDB

app.use(express.urlencoded({ extended: true })) //If extended is false, you can not post "nested object"

app.get('/book', (req, res) => {
    console.log(books.length)
    res.json(books)
})

app.post('/book', (req, res) => {
    const book = Object.assign({ id: books.length + 1 }, req.body)
    books.push(book)
    res.send('Got a POST request')
})

app.put('/book', (req, res) => {
    res.send('Got a PUT request at /book')
})

app.delete('/book', (req, res) => {
    res.send('Got a DELETE request at /book')
})

app.listen(port, () => {
    console.log(
        `Express started on http://localhost:${port}` +
            '; press Ctrl-C to terminate.',
    )
})
