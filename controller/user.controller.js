/** @format */

const express = require('express')
const router = express.Router()
const users = require('../data/users.json') //Load data into memory; To make data persistent, you usally use a Database e.g. MongoDB

//SHOW ALL USERS
router.get('/', (req, res) => {
    res.json(books)
})
