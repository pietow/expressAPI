/** @format */

const express = require('express')
const router = express.Router()
const books = require('../data/techBooks.json') //Load data into memory; To make data persistent, you usally use a Database e.g. MongoDB

//SHOW ALL BOOKS
router.get('/', (req, res) => {
    console.log(req.method)
    res.json(books)
})

//SHOW ALL BOOKS
router.get('/query', (req, res) => {
    //ORDER MATTERS!!!
    const book = books.find((book) => book.id === Number(req.query.id))
    res.json(book)
})

//SHOW ONE BOOK
router.get('/:id', (req, res) => {
    const id = Number(req.params.id)
    const book = books.find((book) => book.id === id)
    res.json(book)
})

router.post('/', (req, res) => {
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
    console.log(req.body)
    const index = books.findIndex((book) => book.id === Number(req.params.id))
    console.log(index)
    books[index] = {
        ...books[index],
        title: req.body.title,
        notes: req.body.notes,
    } // PATCH: SINCE ONLY TWO PROPERTIES ARE INCLUDED
    res.json(books[index])
})

router.put('/:id', (req, res) => {
    console.log(req.body)
    const index = books.findIndex((book) => book.id === Number(req.params.id))
    console.log(index)
    books[index] = {
        id: req.params.id,
        ...req.body,
    } // PUT: When using PUT, it is assumed that you are sending the complete entity, and that complete entity replaces any existing entity at that URI.
    res.json(books[index])
})

router.delete('/:id', (req, res) => {
    const index = books.findIndex(
        (book) => Number(book.id) === Number(req.params.id), //!!!!!!!interesting bug; maybe use for showcaseing postman
    )
    const deletedBook = books.splice(index, index === -1 ? 0 : 1) //IF INDEX = -1 DO NOT SPLICE
    res.json(deletedBook)
})

module.exports = router
