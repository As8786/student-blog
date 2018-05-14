const assert = require('assert')


const express = require('express')
const bodyParser = require("body-parser")
const {MongoClient, ObjectID} = require('mongodb')

const app = express()
app.use(bodyParser.json())

const mongo_url = "mongodb://localhost:27017"
const dataBase = "blog-api"

MongoClient.connect(mongo_url, (err, client) => {
    assert.equal(null, err, 'dataBase is out control')
    const db = client.db(dataBase)

    app.get("/articles", (req, res) => {
        db.collection('articles').find().toArray((err, data) => {
            res.send(data)
        })
    })
    
    app.get("/articles/:id", (req, res) => {
        let id = ObjectID(req.params.id)
        db.collection('articles').findOne({_id:id}, (err, data) => {
            res.send(data)
        })
    })

    app.get("/articles/search/:category", (req,res) => {
        let category = req.params.category
        db.collection('articles').find({category : category}).toArray((err, data) => {
            res.send(data)
        })
    })

    app.get("/articles/user/:user_id", (req, res) => {
        let user_id = req.params.user_id
        db.collection('articles').find({user_id : user_id}).toArray((err, data) => {
            res.send(data)
        })
    })

    app.post("/articles", (req, res) => {
        let new_article = req.body 
        db.collection('articles').insertOne(new_article, (err, data) => {
            res.send('article added')
        })
    })
    
    app.post("/addNewUser", (req, res) => {
        newUser = req.body
        db.collection('users').insertOne(newUser, (err, data) => {
            if(err) {
                res.send("user not added")
            } else {
                console.log(data.ops)
                res.send(data.ops)
            }
        })
    })

    app.post('/articles/:id/comments', (req, res) => {
        let _id = new ObjectID
        let newComment = {_id,...req.body}
        let articleId = ObjectID(req.params.id)
        db.collection('articles').findOneAndUpdate({_id:articleId}, {$push:{comments : newComment}}, (err, data) => {
            res.send('comment added')
        })
    })

    app.get("/users/:email/:password", (req, res) => {
        let password = req.params.password
        let email = req.params.email
        db.collection('users').findOne({email : email, password : password}, (err, data) => {
            if(err) {
                res.send("cant find the requested user")
            }
            if(data === null){
                res.status(204).send("cant find the requested user")
            }    
            else {
                res.send(data) 
            }   
        })
    })

    app.get("/users/:id", (req, res) => {
        let id = ObjectID(req.params.id)
        db.collection('users').findOne({_id:id}, (err, data) => {
            res.send(data)
        })    
    })

    app.put("/users/:id", (req, res) => {
        let newUserInformation = req.body
        let id = ObjectID(req.params.id)
        db.collection('users').findOneAndUpdate({_id:id}, {$set :{...newUserInformation}}, (err, data) => {
            res.send(data.value)
        })
    })

    app.delete("/articles/:id", (req, res) => {
        let id = ObjectID(req.params.id)
        db.collection('articles').findOneAndDelete({_id:id}, (err, data) => {
            res.send(data)
        })
    })
    
    app.put("/articles/:id", (req, res) => {
        let id = ObjectID(req.params.id)
        let updatedArticle = req.body
        db.collection('articles').findOneAndUpdate({_id:id}, {...updatedArticle}, (err, data) => {
            res.send(data.value)
        })
    })


})


app.listen(3001, (err) => {
    assert.equal(null , err,"sercer is out control") 
    console.log("server is on")
})



