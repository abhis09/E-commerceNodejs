const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes/index");

const connectionUrl = encodeURI("mongodb+srv://abhi:Abhishek1234@cluster0.0qaew.mongodb.net/NodeDB?retryWrites=true&w=majority");
mongoose.connect(connectionUrl, { useNewUrlParser: true }, function(err, db) {
    if (err) {
        console.log("Error! " + err);
    } else {
        console.log("Connected to DB" + db);
    }
});

app.use(express.json());
app.use(routes);

app.listen(3000, function() {
    console.log('listening on 3000')
});