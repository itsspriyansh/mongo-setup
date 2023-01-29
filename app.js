const express = require("express")
const { connectToDb, getDb } = require("./db")
const app = express()

const PORT = process.env.PORT || 3000
let db

connectToDb ((error) => {
    if (!error) {
        app.listen(PORT, ()=> {
            console.log(`Listening to port : ${PORT}`)
        })
    }
    db = getDb()
})


app.get("/books", (req, res) => {
    res.json ({
        message : "welcome to the api"
    })
})
