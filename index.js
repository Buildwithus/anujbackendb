const express = require('express');
const mongoose = require('mongoose');
const cors=require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const port=process.env.PORT || 4000;
const db = "mongodb+srv://anuj321:anuj321@cluster0.zzudzw1.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(db, { useNewUrlParser: true });

const userShema = new mongoose.Schema({
    imgurL: {
        type: String
    },
    title: {
        type: String
    },
    date: {
        type: String
    },
    content: {
        type: String
    }

});

const User = new mongoose.model('user', userShema);

app.post("/creatblog", function (req, res) {

    const user = new User({
        imgurL: req.body.imgurL,
        title: req.body.title,
        date: req.body.date,
        content: req.body.content
    });
    const result = user.save();
    if (!result) {
        res.send({ message: "Somthing went wrong" })
    } else {
        res.send({ message: "Blog Created Successfully" })
    }

});
app.get("/chech",function(req,res){
    res.send("Check sucessfully")
});

app.get("/home", async (req, res) => {
    const alldata = await User.find({});
    res.send(alldata);
});

app.listen(port, function () {
    console.log("the server is running on port 4000")
});