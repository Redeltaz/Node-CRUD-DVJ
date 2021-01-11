require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const db = require('./database')
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

app.get('/getUsers', (req, res) => {
    db.query('SELECT * FROM users', (err, result) => {
        if (err) throw err;
        res.send(result)
    })
})

app.get('/getUser/:id', (req, res) => {
    db.query(`SELECT * FROM users WHERE id=${req.params.id}`, (err, result) => {
        if (err) throw err;
        res.send(result)
    })
})

app.get('/test', (req, res) => {
    res.send("test")
})

app.post('/createUser', (req, res) => {
    let user = {
        nom: req.body.nom,
        age: req.body.age,
        sexe: req.body.sexe
    }
    db.query(`INSERT INTO users (nom, age, sexe) VALUES ('${user.nom}', ${user.age}, ${user.sexe})`, (err, result) => {
        if (err) throw err;
        res.send(result)
    })
})

app.delete('/deleteUser/:id', (req, res) => {
    db.query(`DELETE FROM users WHERE id=${req.params.id}`, (err, result) => {
        if (err) throw err;
        res.send(result)
    })
})

app.put('/updateUser/:id', (req, res) => {
    let newNom = req.body.nom
    let newAge = req.body.age
    let newSexe = req.body.sexe
    db.query(`UPDATE users SET nom = '${newNom}', age = ${newAge}, sexe = ${newSexe} WHERE id=${req.params.id}`, (err, result) => {
        if (err) throw err;
        res.send(result)
    })
})

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})