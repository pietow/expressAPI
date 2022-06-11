/** @format */
'use strict'

const express = require('express')
const router = express.Router()
const users = require('../data/users.json') //Load data into memory; To make data persistent, you usally use a Database e.g. MongoDB

const SECRET = 'verySECRET'

//SHOW ALL USERS
router.get('/', (req, res) => {
    res.json(users)
})

//SHOW ONE USER
router.get('/:id', (req, res) => {
    const user = users.find((user) => user.id === Number(req.params.id))
    res.json(user) //res.json(null) --> Content-Type:application/json
    //res.send(...) // automatically sets the Content-Type
})

router.post('/login', (req, res) => {
    console.log(req.body)
    const user = users.find(
        (user) =>
            user.namefirst === req.body.namefirst &&
            user.password === req.body.password,
    )
    user.token = user ? SECRET : null
    res.json(user ? user : 'Access denied!')
})

//ACCESS ROUTE ONLY WITH SECRET
router.delete('/:id', (req, res) => {
    const authHeader = req.headers.authorization
    console.log(authHeader)

    try {
        const token = authHeader.split(' ')[1]
        if (token === SECRET) {
            const index = users.findIndex(
                (user) => Number(user.id) === Number(req.params.id),
            )
            const deletedUser = users.splice(index, index === -1 ? 0 : 1)
            res.json(deletedUser)
        } else {
            res.send('wrong token')
        }
    } catch {
        res.send('fail')
    }
})

module.exports = router
