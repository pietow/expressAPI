/** @format */

const express = require('express')
const app = express()
const port = 3000
const books = require('./techBooks.json') //Load data into memory; To make data persistent, you usally use a Database e.g. MongoDB

app.use(express.urlencoded({ extended: true })) //If extended is false, you can not post "nested object"

//SHOW ALL BOOKS
app.get('/book', (req, res) => {
    res.json(books)
})

//SHOW ONE BOOK
app.get('/book/:id', (req, res) => {
    const id = req.params.id
    /* console.log(req.query.id) */
    res.json(books.find((book) => book.id === id))
})

app.post('/book', (req, res) => {
    const book = Object.assign({ id: books.length + 1 }, req.body)
    books.push(book)
    res.json(book)
})

app.patch('/book/:id', (req, res) => {
    console.log(req.body)
    const index = books.findIndex((book) => book.id === Number(req.params.id))
    console.log(index)
    books[index] = { ...books[index], ...req.body }
    res.json(books[index])
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
