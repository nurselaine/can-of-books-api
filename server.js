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