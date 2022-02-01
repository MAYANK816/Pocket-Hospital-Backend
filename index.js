import express from "express";
import mongoose from 'mongoose'
import Cors from 'cors';
import User from './models/user.js'
import oxygenUsers from './models/oxygenCylinder.js'
import needDoctor from './models/needDoctor.js'
import hospitalbeds from './models/hospitalBeds.js'
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
            res.status(403).send(err);
            return;
        }
        if(!user){
            User.create(req.body,function(err,user){
                console.log(req.body);
                if(err){
                    console.log("error found",err);
                    return;
                }
                return res.status(200).redirect('/')
            })
        }
        else{
            return res.status(200).redirect('/');
        }
    });

    
})

app.post('/oxygenCylinderData',function(req,res){
    console.log(req.body);
            oxygenUsers.create(req.body,function(err,user){
                if(err){
                    console.log("error found",err);
                    return;
                }
                return res.redirect('/');
            })
        });
        app.post('/hospitalbeds',function(req,res){
            console.log(req.body);
                    hospitalbeds.create(req.body,function(err,user){
                        if(err){
                            console.log("error found",err);
                            return;
                        }
                        return res.redirect('/');
                    })
                });
                app.post('/needdoctor',function(req,res){
                    console.log(req.body);
                            needDoctor.create(req.body,function(err,user){
                                if(err){
                                    console.log("error found",err);
                                    return;
                                }
                                return res.redirect('/');
                            })
                        });
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