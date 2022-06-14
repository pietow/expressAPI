/** @format */

const express = require('express')
const router = express.Router()
const books = require('../techBook.json')

router.get('/', (req, res) => {
    res.json(book)
})

router.get('/:id', (req, res) => {
    console.log(req.params.id)
    const book = books.find((book) => {
        return book.id === Number(req.params.id)
    })
    res.json(book)
})

router.post('/', (req, res) => {
    console.log(req.body)
    /* const book = Object.assign({ id: books.length + 1 }, req.body) */
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

router.patch('/:id', (req, res) => {
    const index = books.findIndex(
        (book) => Number(book.id) === Number(req.params.id),
    )
    books[index] = { ...books[index], ...req.body }
    res.json(books[index])
})

router.put('/:id', (req, res) => {
    const index = books.findIndex(
        (book) => Number(book.id) === Number(req.params.id),
    )
    books[index] = { id: req.params.id, ...req.body }
    res.json(books[index])
})

router.delete('/:id', (req, res) => {
    const index = books.findIndex(
        (book) => Number(book.id) === Number(req.params.id),
    )
    const deletedBook = books.splice(index, index === -1 ? 0 : 1)
    res.json(deletedBook)
})

module.exports = router
