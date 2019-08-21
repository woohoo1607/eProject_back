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
