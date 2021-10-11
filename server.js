const express = require('express');
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
var url = "mongodb+srv://Jabbaa:123@zadanie-db.wevsr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const app = express();
let db;
let studentCollection;

MongoClient.connect(url, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    db = client.db('zadanie-db')
    studentCollection = db.collection('studenci')
  })
  .catch(console.error)

app.listen(3000, function () {
  console.log('listening on 3000')
})

app.get('/', (req, res) => {
  db.collection('studenci').find().toArray()
    .then(results => {
      console.log(results)
    })
    .catch(error => console.error(error))
  // ...
})

app.use(bodyParser.urlencoded({ extended: true }))


app.post('/student', (req, res) => {

  studentCollection.insertOne(req.body)
    .then(result => {
      res.redirect('/')
      console.log(result)
    })
    .catch(error => console.error(error))
})

