const MongoClient = require("mongodb").MongoClient;
   
const url = "mongodb://localhost:27017/";
const mongoClient = new MongoClient(url, { useNewUrlParser: true });
 
mongoClient.connect(function(err, client){
      
    const db = client.db("ecp");
    const collection = db.collection("employees");
    
    //collection.createIndex({"name": "text", "surname": "text", "patronymic": "text",
    //"department": "text", "code": 1, "birthday": 1}).then(function(res) {
    //console.log("result");
    //console.log(res);
    //});
    //console.log("ok");
    collection.getIndexes();
        //client.close();
    
    });