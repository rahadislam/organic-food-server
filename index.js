const express = require('express');
const app=express();
const port=process.env.PORT || 5000;

app.get('/',(req,res)=>{
    res.send('welcome organic food server!!!!');
})

app.listen(port,()=>{
    console.log('the organic food server server is running');
})