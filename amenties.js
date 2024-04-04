var express = require("express");
var router = express.Router();

var app = express();
var MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
/**
 * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
 * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
 */
const uri =
"mongodb+srv://prishajain028:KToDvJsFQ6N5ZC9C@cluster0.0hly0kq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);



const DB_NAME = "hotel";

const COLLECTION_Amenities= "amenties";

router.get("/", async function (req, res) {
  let dbo = await client.db(DB_NAME);
  let data = await dbo
    .collection(COLLECTION_Amenities)
    .find()
    .sort({ name: 1 })
    .toArray();
  console.log("data >> ", data);
  res.json(data);
});

router.post("/", async function (req, res) {
  let dbo = await client.db(DB_NAME);
  var myobj = req.body;
  let data = await dbo.collection(COLLECTION_Amenities).insertOne(myobj);
  console.log(data);

  console.log(req.body);
  const user = req.body;
  res.json({ message: "1 record inserted" });
});

router.get("/:id", async function (req, res) {
  console.log("I am id= " + req.params.id);

  let dbo = await client.db(DB_NAME);
  let data = await dbo
    .collection(COLLECTION_Amenities)
    .find({ _id: new ObjectId("" + req.params.id + "") })
    .toArray();
  console.log("data >> ", data);
  res.json(data[0]);
});

router.put("/:id", async function (req, res) {
  console.log("I am id= " + req.params.id);
  console.log(req.body);
  const user = req.body;

  var myquery = { _id: new ObjectId(req.params.id) };
  var newvalues = { $set: req.body };

  let dbo = await client.db(DB_NAME);
  let data = await dbo
    .collection(COLLECTION_Amenities)
    .updateOne(myquery, newvalues);

  res.json({ message: "1 record inserted" });
});

router.delete("/:id", async function (req, res) {
  console.log("I am id= " + req.params.id);

  
  // Construct the query to delete by ID
  var query = { _id: new ObjectId(req.params.id) };
  const dbo = await client.db(DB_NAME);

  let data = await  dbo.collection(COLLECTION_Amenities).deleteOne(query)

    
    console.log("1 document deleted");
    res.json({ message: "1 document deleted" });
  });

//Routes will go here
module.exports = router;