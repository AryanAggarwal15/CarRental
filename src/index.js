var express= require("express")
var bodyParser= require("body-parser")
var mongoose= require("mongoose")

const app=express() //starts express.js

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/mydb');

var db= mongoose.connection;

db.on('error',()=>console.log("Erroe in Connecting to database"));
db.once('open',()=>console.log("Connected to database"));

app.post("/signup",(req,res)=>{
    var name=req.body.name;
    var password=req.body.password;
    var yourMail=req.body.yourMail;

    var data={
        "name":name,
        "password":password,
        "yourMail":yourMail
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("record inserted");
    });

    return res.redirect('index1.html')
})

app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin":'*'
    })
    return res.redirect('index.html')
}).listen(3000);

console.log("listening at port");
