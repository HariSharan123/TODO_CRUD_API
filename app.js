require('dotenv').config()
const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const mongoose = require("mongoose");

app.use(bodyParser.json())



app.use((request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, AuthorizationToken')
    next()
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

