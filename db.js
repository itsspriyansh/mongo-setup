const { MongoClient } = require("mongodb")

let dbConnection

const uri = "mongodb+srv://itsspiryansh:tic9wdKMAaSVF7r6@cluster0.mbi5xxx.mongodb.net/test"


module.exports = {
    connectToDb : (cb) => {
        MongoClient.connect(uri)
        .then (client => {
            dbConnection = client.db()
            return cb()
        })
        .catch (error => {
            console.log (error)
            cb(error)
        })
    },
    getDb : () => dbConnection
}

