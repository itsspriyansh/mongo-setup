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

    const page = req.query.p - 1 || 0
    const booksPerPage = 3
    const books = []

    db.collection("books")
    .find()
    .sort({title : 1})
    .skip(page * booksPerPage)
    .limit(booksPerPage)
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


app.patch("/books/:parameter", (req, res) => {

    const data = req.body
    
    if (!ObjectId.isValid(req.params.parameter)) {
        res.status(500).json({
            error : "book doesn't exist"
        })
    }
    
    db.collection("books")
    .updateOne({_id : ObjectId(req.params.parameter)}, {$set : data})
    .then(doc => {
        res.status(200).json({
            message : "successfully updated",
            doc : doc
        })
    })
    .catch(error => {
        message : "couldn't update"
        error : error
    })
})

