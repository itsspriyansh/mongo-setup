const express = require("express")
const { ObjectId } = require("mongodb")
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

app.use(express.json())

app.get("/books", (req, res) => {
    const books = []
    db.collection("books")
    .find()
    .sort({title : 1})
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

app.get("/books/:parameter", (req, res)=>{

    if (!ObjectId.isValid(req.params.parameter)) {
        res.status(500).json({
            error : "book doesn't exist"
        })
    }

    db.collection("books")
    .findOne({_id : ObjectId(req.params.parameter)})
    .then(doc => res.status(200).json(doc))
    .catch(error => res.status(500).json({error : error}))
})

app.post("/books", (req, res)=>{
    const book = req.body
    db.collection("books")
    .insertOne(book)
    .then(doc => {
        res.status(201).json({
            message : "successfully added",
            doc : doc
        })
    })
    .catch(error => {
        res.status(500).json({
            message : "couldn't push to database",
            error : error
        })
    })
})


app.delete("/books/:parameter", (req, res)=>{
    
    if (!ObjectId.isValid(req.params.parameter)) {
        res.status(500).json({
            error : "book doesn't exist"
        })
    }
    
    db.collection("books")
    .deleteOne({_id : ObjectId(req.params.parameter)})
    .then(doc => {
        res.status(200).json({
            message : "successfully deleted",
            doc : doc
        })
    })
    .catch(error => {
        message : "couldn't delete"
        error : error
    })
})


