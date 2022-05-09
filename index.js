const express = require('express');
const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
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

        app.get('/foods/:id',async(req,res)=>{
            const id=req.params.id;
            const query={_id:ObjectId(id)};
            const foods=await foodsCollecton.findOne(query);
            res.send(foods);
        })
        //inser add items db
        app.post('/foods',async(req,res)=>{
            const food=req.body;
            const result=await foodsCollecton.insertOne(food);
            res.send(result);
        })
        //Delete manage items
        app.delete('/foods/:id',async(req,res)=>{
            const id=req.params.id;
            const query={_id:ObjectId(id)};
            const foods=await foodsCollecton.deleteOne(query);
            res.send(foods);
        })
        //update manage items
        app.put('/foods/:id',async(req,res)=>{
            const id=req.params.id;
            const userUpdate=req.body;
            const filter={_id:ObjectId(id)};
            const options={upsert:true};
            const updated={
                $set:{
                    name:userUpdate.name,
                    quantity:userUpdate.quantity,
                    price:userUpdate.price
                }
            }
            const foods=await foodsCollecton.updateOne(filter,updated,options);
            res.send(foods);
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