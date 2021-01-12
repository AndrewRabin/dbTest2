var  fs = require('fs');

var mongoose = require('mongoose');
var mongoDB = 'mongodb+srv://dbAdmin:dbAdmin@cluster0.e1tui.mongodb.net/dbTest?retryWrites=true&w=majority';
//var client = new MongoClient(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect(mongoDB, { useNewUrlParser: true,
                            useUnifiedTopology: true,
                            useFindAndModify: false });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var Schema = mongoose.Schema;

var testSchema = new Schema(
    {
        first_name: {type: String, required: true, max: 100},
        family_name: {type: String, required: true, max: 100},
        age: {type: Number},
        img: {data: Buffer, contentType: String},
    }
);

var testModel = mongoose.model('Test', testSchema);

var testRecord = new testModel(
    {
        first_name: "Robby",
        family_name: "Kong",
        age: 85
  });

var filePath = 'robot.jpg';
if (fs.existsSync(filePath)) {
    console.log('The path exists.');
    testRecord.img.data = fs.readFileSync(filePath);
    testRecord.img.contentType = 'img/jpg';
}



//   app.use(multer({ dest: './uploads/',
//     rename: function (fieldname, filename) {
//       return filename;
//     },
//    }));

testRecord.save(function (err) {
    if (err) { return next(err); }

    console.log("Success");
});

// the last one is not presented in a list!
testModel.find(function f(err, results){
    if (err) {
        console.log("FIND ERROR");
        return;
    }

    for(var res of results)
    console.log(`${res.first_name} ${res.family_name} (${res.id})`);

});
