const MongoClient = require("mongodb").MongoClient;
   
const url = "mongodb://localhost:27017/";
const mongoClient = new MongoClient(url, { useNewUrlParser: true });
 
mongoClient.connect(function(err, client){
      
    const db = client.db("ecp");
    const collection = db.collection("employees");
    let employee = [
        {surname: "Волков", name: "Максим", patronymic: "Ігорович", birthday: "16.07.1993",
            department: "Відділ", code: 1234567890, password: "fsdf3252j", fired: false,
            transported: false, expirationDateSertificate: "27.03.2021", keyword:"asd2rsdf", isResponsible: true},
        {surname: "Мірошніченко", name: "Олександр", patronymic: "Григорович", birthday: "20.12.1985",
            department: "Відділ", code: 4829501837, password: "fdsj23rfs", fired: true,
            transported: false, expirationDateSertificate: "27.03.2021", keyword:"j654u4e", isResponsible: false},
        {surname: "Приходько", name: "Анжеліна", patronymic: "Анатоліївна", birthday: "07.07.1989",
            department: "Сектор", code: 3415976548, password: "fjsioj234", fired: false,
            transported: true, expirationDateSertificate: "27.03.2021", keyword:"fdgh3y", isResponsible: false},
        {surname: "Холодний", name: "Євген", patronymic: "Васильович", birthday: "19.03.1991",
            department: "Відділ", code: 5794236578, password: "lasdpk13j", fired: false,
            transported: false, expirationDateSertificate: "27.03.2021", keyword:"hfg435", isResponsible: false}
    ];
    for (i=0; i<employee.length; i++) {

    collection.insertOne(employee[i], function(err, result){
          
        if(err){ 
            return console.log(err);
        }
        console.log(result.ops);
        client.close();
    });
    }
});