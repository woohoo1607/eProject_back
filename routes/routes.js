const router = (app, client) => {
    
    app.get("/employees/", function (request, response) {

        const db = client.db("ecp");
        const collection = db.collection("employees");

        let r = {
            
        };
        let isLimit = false;
        let isSkip = false;
        let skip = 0;
        let limit = 10;
        
        if (request.query.name) {
            r.name = request.query.name;
        }
        if (request.query.limit) {
            isLimit = isFinite(request.query.limit);
            if(isLimit) {
               request.query.limit==0 ? limit : limit = Math.ceil(Math.abs(request.query.limit));
               
            }
             
        } 
        
        if (request.query.page) {
            isSkip = isFinite(request.query.page);
            if(isSkip) {
            request.query.page==0 ? skip : skip = Math.ceil(Math.abs(request.query.page))*limit-limit;
                
            }
        }


        let result = () =>
        {
            collection.find(r).skip(skip).limit(limit).toArray().then(function (results) {
                collection.find().count().then (function (cnt) {
                    response.setHeader('Access-Control-Allow-Origin', '*');
                    response.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
                    response.json({employees: results, countAll:cnt});
                });
            }, function (err) {
                console.error('Error!!!', err, err.stack);
            });
        };

        result();

    });

};

module.exports = router;