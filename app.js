require('dotenv').config()
const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const mongoose = require("mongoose");
const errorHandler = require('./utils/errorHandler');
const routes=require('./routes/api');

app.use(bodyParser.json())



app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, AuthorizationToken')
    next()
})

app.use('/api/v1', routes);
app.use((error, req, res, next) => {
    return res.status(250).json(errorHandler.makeErrorResponse(error))
})


let PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`🚀 Server is running at port ${process.env.PORT} successfully.`);
});

mongoose.connect(process.env.MONGO_URI).then(console.log("connected to mongoDB"))
.catch((err) => { 
    console.log(err) 
});
mongoose.connection.once('open', () => {
    console.log('connected to database');
});

