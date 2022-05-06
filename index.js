const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app=express();
const port=process.env.PORT || 5000;

//environment variable use command
require('dotenv').config();


//middlware use for client site
const cors = require('cors');
app.use(cors());
app.use(express.json());

//mongodb connection
const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD_DB}@cluster0.vkrsm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
    try{
        await client.connect();
        const foodsCollecton = client.db('organicFood').collection('foods');
        console.log("organic db connect");
        //find database all data show server site system 
        app.get('/foods', async (req, res) => {
            const query = {};
            const cursor = foodsCollecton.find(query);
            const foods = await cursor.toArray();
            res.send(foods);
        })
        //inser add items db
        app.post('/foods',async(req,res)=>{
            const food=req.body;
            const result=await foodsCollecton.insertOne(food);
            res.send(result);
        })
    }
    finally{

    }
}
run().catch(console.dir)



app.get('/',(req,res)=>{
    res.send('welcome organic food server!!!!');
})

app.listen(port,()=>{
    console.log('the organic food server server is running');
})