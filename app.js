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
    const books = []
    db.collection("books")
    .find()
    .forEach(book => books.push(book))
    .then(()=>{
        res.status(200).json(books)
    })
    .catch(error => {
        res.status(500).json({
            error : error
        })
    })
})

