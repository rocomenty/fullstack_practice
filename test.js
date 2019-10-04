const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://dbUser:WEUjOvj0A8MXsec3@emaily-pdci2.mongodb.net/admin?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  console.log(collection);
  client.close();
});