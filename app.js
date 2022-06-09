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
    const id = Number(req.params.id)
    console.log(id)
    /* console.log(req.query.id) */
    const book = books.find((book) => book.id === id)
    res.json(book)
})

app.post('/book', (req, res) => {
    const maxId = books.reduce((acc, cur) => {
        if (acc.id > cur.id) {
            return acc.id
        } else {
            return cur.id
        }
    })
    console.log(maxId)
    const book = Object.assign({ id: maxId + 1 }, req.body)
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

app.delete('/book/:id', (req, res) => {
    const index = books.findIndex((book) => book.id === Number(req.params.id))
    const deletedBook = books.splice(index, index === -1 ? 0 : 1) //IF INDEX = -1 DO NOT SPLICE
    res.json(deletedBook)
})

app.listen(port, () => {
    console.log(
        `Express started on http://localhost:${port}` +
            '; press Ctrl-C to terminate.',
    )
})
