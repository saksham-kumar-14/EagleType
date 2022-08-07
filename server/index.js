const express = require("express");
const app = express();
const mongoose = require("mongoose")
const cors = require("cors")
const jwt = require("jsonwebtoken")
const user_model = require("./models/Users");
const highscore_model = require("./models/Highscores")

app.use(express.json())
app.use(cors());

mongoose.connect("mongodb+srv://Saksham:saksham@cluster0.diogi.mongodb.net/EagleType?retryWrites=true&w=majority")


app.get("/",(req,res)=>{
    res.send("HELLO WORLD")
})

app.get("/getUsers" , (req,res)=>{
    user_model.find({}, (err,result)=>{ 
        if(err){
            res.json(err)
        }else{
            res.json(result)
        }
    })
})

app.post("/login" , async (req,res)=>{
    const user = await user_model.findOne({
        email : req.body.email,
        password : req.body.password
    })

    if(user){
        const token = jwt.sign({
            name : user.name,
            email : user.email,
            password : user.password,
            scores : user.scores,
        }, "secret")
        return res.json({ status:"ok" , user:token })
    }else{
        return res.json({ status:404, user:false })
    }
})

app.post("/createUser" , async (req,res)=>{

    const user = req.body;
    const new_user = new user_model(user);
    await new_user.save();

    res.json(user)
})

app.post("/deleteUser" , async (req,res) => {
    
    await user_model.deleteOne(
        {"email" : req.body.email}
    ).then(()=>{
        return res.json({ status:"ok", updated:true })
    }).catch((err)=>{
        console.log(err);
        return res.json({ status:404 , updated:false })
    })
    
})

app.post("/updateUser" , async(req,res)=>{
    await user_model.findOneAndUpdate(
        {"email" : req.body.email},
        {"scores" : req.body.scores}
    )

    res.json({ status:"ok" , updated:true })
})

app.get("/getScores" , (req,res)=>{
    highscore_model.find({} , (err,result)=>{
        if(err){
            res.json(err)
        }else{
            res.json(result)
        }
    })
})

app.post("/updateScores" , async (req,res)=>{
    const score = req.body;
    const new_score = new highscore_model(score)
    await new_score.save();

    res.json(score)
})

app.get("/api/validate_user", async (req,res)=>{
    const user_token = req.headers["user-token"];
    const decoded = jwt.decode(user_token);
    
    try{
        const user = await user_model.findOne({
            email: decoded.email
        });
        if (user) {
            return res.json({
                status:"ok",
                user: user
            })
        }else{
            return res.json({
                status: 404,
                user: false
            })
        }
    }catch{
        return res.json({
            status: 404,
            user:false
        })
    }

})

app.listen(3001, ()=>{
    console.log("Sever is running at http://localhost:3001");
})