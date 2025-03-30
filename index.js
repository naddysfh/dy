const { MongoClient } = require('mongodb');

async function mian(){
// Replace <connection-string> with your Mongodb URI
const uri = "mongodb://localhost:27017"
const client = new MongoClient(uri);

try {
   await client.connect();
   console.log("Connected to Mongodb!");

   const db = client.db("testDB");
   const collection = db.collection("users");

   // Insert a document
   await collection.insertOne({ name:"Naddy", age:22 });

   //Insert a document
   await collection.insertOne({ name: "Naddy", age:22 })
   console.log("Document inserted!");

   //Query the document
   const result = await collection.findOne({ name: "Naddy"})
   console.log("Query result:", result);
 } catch (err) {
   console.error("Error", err);
 } finally {
   await client.close();
 }
}

mian();
