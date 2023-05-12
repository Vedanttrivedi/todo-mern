const express = require("express")
const mongodb = require("mongodb")
const { ObjectId } = mongodb;
const bodyparser = require("body-parser")
const jsonparser = bodyparser.json()
const cors = require("cors")
const path = require("path")

const app = express()

const MongoClient = mongodb.MongoClient;
let database = "notionadb";
let uri = `mongodb://127.0.0.1:27017/${database}`;
let dbinstance, collection;

app.use(cors())
app.use(express.static(path.resolve(__dirname, 'frontend/public')));

async function connectToDb() {
    try {
      dbinstance = await MongoClient.connect(uri);
      collection = dbinstance.db().collection("tasks");
  
      console.log("connected to database");
    } catch (err) {
      console.log("error connecting to database:", err);
    }
  }
  
connectToDb();

app.get("/todos/", async (req, res) => {
    const tasks = await collection.find().toArray();
    res.json(tasks); 
  });
  

app.post("/todos/add/", jsonparser, async (req, res) => {
    console.log("POST DATA RECEIVED " + req.body.text);
  
    const data = {
      text: req.body.text
    };
  
    try {
      const result = await collection.insertOne(data);
      console.log("result " + result.insertedId);
  
      res.write(`document with id ${result.insertedId} added`);
      res.end(); 
    } catch (err) {
      console.log("error inserting document:", err);
    }
  });
  
  app.patch("/todos/update/:tid", jsonparser, async (req, res) => {
    const tid = req.params.tid;
    const newText = req.body.text;
  
    const result = await collection.updateOne(
      { _id: new mongodb.ObjectId(tid) },
      { $set: { text: newText } }
    );
  
    res.write(`Document with id ${tid} updated with text "${newText}"`);
    res.end();
  });
  
  app.delete("/todos/delete/:id", async (req, res) => {
    const id = req.params.id;
    
    try {
      const result = await collection.deleteOne({ _id: new mongodb.ObjectId(id) });
      if (result.deletedCount === 1) {
        console.log("document deleted");
        res.write(`Document with id ${id} deleted`);
        res.end();
      } else {
        res.write(`Document with id ${id} not found`);
        res.end();
      }
    } catch (err) {
      console.log("error deleting document:", err);
    }
  });
  
app.get("/", (req, res) => {
  res.send("connected");
})

app.listen(3000, () => {
  console.log("listening on the port 3000");
})
