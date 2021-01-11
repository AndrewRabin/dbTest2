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
    }
);

var testModel = mongoose.model('Test', testSchema);

var testRecord = new testModel(
    {
        first_name: "Willy",
        family_name: "Wong",
        age: 85
  });

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

    for(var resul of results)
    console.log(resul.id);

});
