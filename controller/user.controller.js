/** @format */
'use strict'

const express = require('express')
const router = express.Router()
const users = require('../data/users.json') //Load data into memory; To make data persistent, you usally use a Database e.g. MongoDB

//SHOW ALL USERS
router.get('/', (req, res) => {
    res.json(users)
})

//SHOW ONE USER
router.get('/:id', (req, res) => {
    const user = users.find((user) => user.id === Number(req.params.id))
    res.json(null) //res.json(null) --> Content-Type:application/json
    //res.send(...) // automatically sets the Content-Type
})

module.exports = router
