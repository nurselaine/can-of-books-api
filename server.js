'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const book = require('./models/book');
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3002;
mongoose.connect(process.env.DB_URL);

// add validation to confirm we are wired up to our mongo DB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

app.get('/books', getBook);

app.post('/books', postBook);

app.delete('/books/:id', deleteObj);

app.put('/books/:id', putBook);

async function getBook(request, response, next) {

  try {
    let results = await book.find();
    response.status(200).send(results);
  } catch (err) {
    next(err);
  }
}

async function postBook(request, response, next) {
  try {
    let createBook = await book.create(request.body);
    response.status(200).send(createBook);
  } catch (error) {
    next(error)
  }
}

async function deleteObj(request, response, next){
  let id = request.params.id;
  console.log(id);
  try {
    await book.findByIdAndDelete(id);
    response.status(200).send('item deleted successfully');
  } catch (error) {
    next(error);
  }
}

async function putBook(request, response, next) {
let id = request.params.id;
let {title, description, genre} = request.body
try {
let updatedBook = await book.findByIdAndUpdate(id,{title, description, genre}, {new: true, overwrite: true});
response.status(200).send(updatedBook)
} catch(error) {
  next(error)
}
}

app.get('/test', (request, response) => {

  response.send('test request received')

})

app.get('/', (request, response) => {
  response.send(`hello ${PORT}`);
})

app.get('*', (request, response) => {
  let errorMessage = `Error 500: Internal Server Error`;
  response.send(new Error(errorMessage, 500));
});

app.listen(process.env.PORT, () => console.log(`listening on ${PORT}`));

class Error {
  constructor(message, code) {
    this.errorMessage = message;
    this.statusCode = code;
  }
}