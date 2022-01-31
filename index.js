import express from "express";
import mongoose from 'mongoose'
import Cors from 'cors';
import User from './models/movie.js'
//App Config
const app=express();
const port=process.env.PORT||8001;

app.use(express.json());
app.use(Cors());

const connectionurl='mongodb+srv://Mayank_admin:6jlPThP9xfBEB8xQ@cluster0.eh1h4.mongodb.net/Users?retryWrites=true&w=majority';

mongoose.connect(connectionurl,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})   .then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

app.get('/',(req,res)=>res.status(200).send("Hello Programmers"));

app.post('/userCreate',function(req,res){
    if(req.body.password != req.body.cpassword){
        console.log("passsword not matched");
        return res.redirect('back');
    }

    User.findOne({email : req.body.email},function(err,user){
        if(err){
            console.log("error found");
            return;
        }
        if(!user){
            User.create(req.body,function(err,user){
                console.log(req.body);
                if(err){
                    console.log("error found",err);
                    return;
                }
                return res.redirect('/')
            })
        }
        else{
            return res.redirect('/');
        }
    });

    
})
app.get('/SignIn',(req,res)=>{
    User.find((err,data)=>{
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(200).send(data);
        }
    })
})

//Listner 
app.listen(port,()=>console.log(`listening :${port}`));