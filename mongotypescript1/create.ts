import { MongoClient, Db, Collection } from "mongodb"
import connect from "./connect";
import setupTestData from "./setupTestData"

(async function Tester() {
  const client = await connect();
  const db = client.db("day1ex1")
  const collection = db.collection("inventory")
  const status = await setupTestData(collection)
  
  const dbEx = db.collection("dbEx");
  await dbEx.insertOne({
    name:"sue",
    action:"sews"
  });
  const all = await dbEx.find({}).toArray();
  console.log(all);

  /* await dbEx.updateOne(
    {name: "sue"},
    {$set:{action:"sells"}}
    );

  await dbEx.deleteOne(
    {action:"sells"}
    ) */

  

  //Add your play-around code here
  client.close()
})()
