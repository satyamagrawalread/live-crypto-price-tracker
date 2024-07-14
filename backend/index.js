require('dotenv').config();
const express = require('express');
const port = process.env.PORT;

const app = express();
const bodyparser = require('body-parser');
const cors = require('cors')

require('./db');
require('./models/CryptoInfo');

const infoRoutes = require('./routes/infoRoutes');

app.use(express.json());
app.use(cors());
app.use(bodyparser.json());
app.use(infoRoutes);

app.get('/', (req, res) => {
    console.log("Request to home page");
    res.send('This is home page');
})

app.listen(port, (req, res) => {
    console.log(`Server is listening on PORT: http://localhost:${port}`)
})