'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3002;

app.get('/test', (request, response) => {
  
  response.send('test request received')

})

app.listen(process.env.PORT, () => console.log(`listening on ${PORT}`));
