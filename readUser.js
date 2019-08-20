const fs = require("fs");
const readLine = require("readline");
const file = "../../Декларування/2019/employees.txt";
const code = "utf-8";
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";
const mongoClient = new MongoClient(url, {useNewUrlParser: true});


let rd = readLine.createInterface({
    input: fs.createReadStream(file),
    output: process.stdout,
    console: false
});



var employees = [];


rd.on('line', function (line) {
    let employeeArr = line.split('|');
    let employee = {
        surname: employeeArr[0],
        name: employeeArr[1],
        patronymic: employeeArr[2],
        birthday: employeeArr[8],
        department: employeeArr[3],
        code: Number(employeeArr[5]),
        keyword: employeeArr[4] === "null" ? null : employeeArr[4],
        password: employeeArr[6] === "null" ? null : employeeArr[6],
        fired: employeeArr[9] === "false" ? false : true,
        transported: employeeArr[10] === "false" ? false : true,
        expirationDateSertificate: employeeArr[7] === "null" ? null : employeeArr[7],
        isResponsible: employeeArr[11] === "false" ? false : true
    };
    employees.push(employee);
});
rd.on('close', function () {
    mongoClient.connect(function (err, client) {

        const db = client.db("ecp");
        const collection = db.collection("employees");

        for (i = 0; i < employees.length; i++) {

            collection.insertOne(employees[i], function (err, result) {

                if (err) {
                    return console.log(err);
                }
                console.log(result.ops);
                client.close();
            });
        }
    });
});

/*
 
 mongoClient.connect(function (err, client) {
 
 const db = client.db("ecp");
 const collection = db.collection("employees");
 
 for (i=0; i<employees.length; i++) {
 
 collection.insertOne(employees[i], function(err, result){
 
 if(err){ 
 return console.log(err);
 }
 console.log(result.ops);
 client.close();
 });
 }
 });
 */






//let fileContent = fs.readFileSync(file, code);
//console.log(fileContent);



/*const MongoClient = require("mongodb").MongoClient;
 
 const url = "mongodb://localhost:27017/";
 const mongoClient = new MongoClient(url, { useNewUrlParser: true });
 
 mongoClient.connect(function(err, client){
 
 const db = client.db("ecp");
 const collection = db.collection("employees");
 let employee = [
 {surname: "Волков", name: "Максим", patronymic: "Ігорович", birthday: "16.07.1993",
 department: "Відділ", code: 1234567890, password: "fsdf3252j", fired: false,
 transported: false, expirationDateSertificate: "27.03.2021"},
 {surname: "Мірошніченко", name: "Олександр", patronymic: "Григорович", birthday: "20.12.1985",
 department: "Відділ", code: 4829501837, password: "fdsj23rfs", fired: false,
 transported: false, expirationDateSertificate: "27.03.2021"},
 {surname: "Приходько", name: "Анжеліна", patronymic: "Анатоліївна", birthday: "07.07.1989",
 department: "Сектор", code: 3415976548, password: "fjsioj234", fired: false,
 transported: false, expirationDateSertificate: "27.03.2021"},
 {surname: "Холодний", name: "Євген", patronymic: "Васильович", birthday: "19.03.1991",
 department: "Відділ", code: 5794236578, password: "lasdpk13j", fired: false,
 transported: false, expirationDateSertificate: "27.03.2021"}
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
 */