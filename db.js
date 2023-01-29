const { MongoClient } = require("mongodb")

let dbConnection

module.exports = {
    connectToDb : (cb) => {
        const { connect } = MongoClient
        connect("mongodb://localhost:27017/bookstore")
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

