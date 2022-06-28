'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const book = require('./models/book')

mongoose.connect(process.env.DB_URL);

// add validation to confirm we are wired up to our mongo DB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

app.get('/books', getBook);

async function getBook (request, response, next) {

  try{
    let results = await book.find();
    response.status(200).send(results);
  }catch(err){
    next(err);
  }
}


const app = express();
app.use(cors());

const PORT = process.env.PORT || 3002;

app.get('/test', (request, response) => {
  
  response.send('test request received')

})

app.listen(process.env.PORT, () => console.log(`listening on ${PORT}`));
