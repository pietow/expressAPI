/** @format */

const express = require('express')
const app = express()
const port = 3000
const books = require('./techBooks.json') //Load data into memory; To make data persitent, you usally use a Database e.g. MongoDB

app.get('/', (req, res) => {
    res.json(books)
})

app.post('/', (req, res) => {
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
