import { MongoClient, Db, Collection } from "mongodb"
import connect from "./connect";
import setupTestData from "./setupTestData"

(async function Tester() {
  const client = await connect();
  const db = client.db("day1ex1")
  const collection = db.collection("inventory")
  const status = await setupTestData(collection)

  const result = collection.find(
    {status:"A"},
    {projection:{item:1, _id:0}}
    ).limit(3);
  const asArray = await result.toArray();
  console.log(asArray);

  //Add your play-around code here
  client.close()
})()
