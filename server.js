const express = require("express")
const app = express();

const PORT = 3000;
const mongoose = require('mongoose');


require('dotenv').config()




app.get("/ping",(req,res)=>{
    res.send("pong")
});

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})

const uri = process.env.uri;
mongoose.connect(uri)
.then(()=>{
    console.log('Database has been connected successfully!')
})
.catch((err)=>{
    console.log('Error',err);
})