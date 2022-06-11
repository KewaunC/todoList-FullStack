const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const dbName = 'toDoList'
let db 

app.listen(9000, () => {
  MongoClient.connect(database.url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
      if(error) {
          throw error;
      }
      db = client.db(dbName);
  });
});

const database = require('./database.js'); 

app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('listItems').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {listItems: result})
  })
})

app.post('/listItems', (req, res) => {
  console.log(req.body)
  db.collection('listItems').insertOne({item:req.body.item}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/') 
  })
})

app.delete('/listItems', (req,res) =>{
  
})